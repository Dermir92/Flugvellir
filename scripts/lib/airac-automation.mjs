import { readdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

import {
  compareSnapshots,
  discoverAiracIssues,
  downloadEditionSnapshot,
  getFlugvellirIcaos,
  renderMarkdownReport,
  writeMarkdownReport,
} from './airac-detector.mjs'

export const AUTOMATION_REPORT_DIR = 'docs/airac-reports'

export function cycleSlug(cycle) {
  return cycle.replace(/^A/i, '').replace('/', '-')
}

export function reportFilename(fromEdition, toEdition) {
  return `A${cycleSlug(fromEdition.cycle)}-to-A${cycleSlug(toEdition.cycle)}.md`
}

export function reportPath(fromEdition, toEdition) {
  return path.join(AUTOMATION_REPORT_DIR, reportFilename(fromEdition, toEdition)).replace(/\\/g, '/')
}

export function automationBranchName(toEdition) {
  return `automation/airac-A${cycleSlug(toEdition.cycle)}`
}

export function automationPrTitle(toEdition) {
  return `AIRAC ${toEdition.cycle.replace(/^A/i, '')}: review detected aerodrome changes`
}

export async function listTrackedReportPaths(reportDir = AUTOMATION_REPORT_DIR) {
  try {
    const entries = await readdir(reportDir, { withFileTypes: true })
    return entries
      .filter((entry) => entry.isFile() && entry.name.endsWith('.md'))
      .map((entry) => path.join(reportDir, entry.name).replace(/\\/g, '/'))
  } catch (error) {
    if (error.code === 'ENOENT') return []
    throw error
  }
}

export function selectNextAiracComparison(discovery, options = {}) {
  const existingReportPaths = new Set(options.existingReportPaths ?? [])
  const existingOpenTargetCycles = new Set((options.existingOpenTargetCycles ?? []).map(normalizeCycle))
  const currentUtcDateIso = utcDateOnly(options.currentUtcDate ?? new Date())
  validateDiscovery(discovery)

  const orderedEligible = discovery.issues
    .filter((issue) => isAiracEditionEligibleForAutomation(issue, currentUtcDateIso))
    .sort((left, right) => left.effectiveDateIso.localeCompare(right.effectiveDateIso))

  const futureTargets = orderedEligible.filter((issue) => issue.future)
  for (const target of futureTargets) {
    const targetIndex = orderedEligible.findIndex((issue) => normalizeCycle(issue.cycle) === normalizeCycle(target.cycle))
    const previous = orderedEligible[targetIndex - 1]
    if (!previous) {
      throw new Error(`Cannot compare ${target.cycle}: no immediately preceding published AIRAC edition was found.`)
    }

    const outputPath = reportPath(previous, target)
    if (existingReportPaths.has(outputPath)) continue

    return {
      action: existingOpenTargetCycles.has(normalizeCycle(target.cycle)) ? 'update-existing-pr' : 'create-or-update-pr',
      reason: `Published future AIRAC ${target.cycle} needs comparison with ${previous.cycle}.`,
      from: previous,
      to: target,
      reportPath: outputPath,
      branchName: automationBranchName(target),
      prTitle: automationPrTitle(target),
      prBody: automationPrBody(previous, target, outputPath),
    }
  }

  return {
    action: 'none',
    reason: 'No officially published future AIRAC edition needs a new tracked comparison report.',
    current: discovery.current,
    publishedFutureCycles: futureTargets.map((issue) => issue.cycle),
  }
}

export function isAiracEditionEligibleForAutomation(issue, currentUtcDate = new Date()) {
  const currentUtcDateIso = utcDateOnly(currentUtcDate)
  const publicationDateIso = requireValidIsoDate(issue.publicationDateIso, issue, 'publicationDateIso')
  return Boolean(issue.sourceUrl) && publicationDateIso <= currentUtcDateIso
}

export function utcDateOnly(value = new Date()) {
  const date = value instanceof Date ? value : new Date(value)
  if (Number.isNaN(date.getTime())) {
    throw new Error(`AIRAC automation current UTC date is invalid: ${value}`)
  }
  return date.toISOString().slice(0, 10)
}

export async function buildAutomationPlan(options = {}) {
  const {
    indexUrl,
    fetcher,
    existingReportPaths = await listTrackedReportPaths(),
    existingOpenTargetCycles = [],
  } = options
  const discovery = await discoverAiracIssues(indexUrl, fetcher)
  return selectNextAiracComparison(discovery, { existingReportPaths, existingOpenTargetCycles })
}

export async function generateAutomationReport(plan, options = {}) {
  if (!plan || plan.action === 'none') return null

  const icaos = options.icaos ?? getFlugvellirIcaos()
  const fetcher = options.fetcher
  const fromSnapshot = await downloadEditionSnapshot(plan.from, { icaos, fetcher })
  const toSnapshot = await downloadEditionSnapshot(plan.to, { icaos, fetcher })
  const comparison = compareSnapshots(fromSnapshot, toSnapshot)
  const changed = comparison.airports.filter((airport) => airport.status !== 'unchanged')
  const markdown = addAutomationReviewWarnings(renderMarkdownReport(comparison), changed)

  await writeMarkdownReport(markdown, plan.reportPath)

  return {
    ...plan,
    checkedAerodromes: comparison.airports.length,
    changedAerodromes: changed.map((airport) => airport.icao),
    changedAerodromeCount: changed.length,
  }
}

export function addAutomationReviewWarnings(markdown, changedAirports = []) {
  const changedIcaos = changedAirports.map((airport) => airport.icao)
  const warningLines = [
    '## Automation Review Warnings',
    '',
    '- Generated, unofficial review material only. Not operational guidance.',
    '- Any changed AIP wording may be safety-sensitive until a qualified human review says otherwise.',
    '- Manually review runway designators, declared distances, ATS/frequency changes, operating hours, fuel/service availability, procedures, obstacles, warnings and chart references.',
    '- Do not update Flugvellir airport data from this report alone; official AIP, NOTAM, meteorological, briefing and ATC sources remain authoritative.',
  ]

  if (changedIcaos.length > 0) {
    warningLines.push(`- Changed aerodromes requiring review: ${changedIcaos.join(', ')}.`)
  }

  return markdown.replace(/\n## Changes\n/, `\n${warningLines.join('\n')}\n\n## Changes\n`)
}

export function reportsEquivalentIgnoringRetrievalTime(left, right) {
  return stableReportText(left) === stableReportText(right)
}

export function evaluateAutomationPrSafetyState(state) {
  const {
    hasOpenPr = false,
    openPrIsDraft = false,
    branchExists = false,
    sameReport = false,
  } = state

  if (hasOpenPr && !openPrIsDraft) {
    return {
      action: 'fail-non-draft-pr',
      mayPush: false,
      shouldCreateOrUpdatePr: false,
      reason: 'An open automation PR exists but is not a draft; refusing to modify its branch.',
    }
  }

  if (hasOpenPr && openPrIsDraft && sameReport) {
    return {
      action: 'noop-open-draft-same-report',
      mayPush: false,
      shouldCreateOrUpdatePr: false,
      reason: 'An open draft automation PR already has the same report content.',
    }
  }

  if (hasOpenPr && openPrIsDraft) {
    return {
      action: 'update-open-draft-pr',
      mayPush: true,
      shouldCreateOrUpdatePr: true,
      reason: 'An open draft automation PR exists and the report changed.',
    }
  }

  if (branchExists && sameReport) {
    return {
      action: 'create-draft-pr-from-existing-branch',
      mayPush: false,
      shouldCreateOrUpdatePr: true,
      reason: 'The automation branch already has the report but no open PR is reviewing it.',
    }
  }

  return {
    action: 'push-and-create-draft-pr',
    mayPush: true,
    shouldCreateOrUpdatePr: true,
    reason: 'No open automation PR is reviewing the generated report.',
  }
}

export async function reportsEquivalentFiles(leftPath, rightPath) {
  const [left, right] = await Promise.all([
    readFile(leftPath, 'utf8'),
    readFile(rightPath, 'utf8'),
  ])
  return reportsEquivalentIgnoringRetrievalTime(left, right)
}

export async function writePlan(plan, planOutputPath) {
  if (!planOutputPath) return
  await writeFile(planOutputPath, `${JSON.stringify(plan, null, 2)}\n`, 'utf8')
}

function stableReportText(markdown) {
  return markdown
    .replace(/^Generated: .+$/gm, 'Generated: <ignored>')
    .replace(/^- Retrieved from source at: .+$/gm, '- Retrieved from source at: <ignored>')
    .trim()
}

function validateDiscovery(discovery) {
  if (!discovery?.current) {
    throw new Error('AIRAC discovery did not identify a currently effective edition.')
  }

  if (!Array.isArray(discovery.issues) || discovery.issues.length === 0) {
    throw new Error('AIRAC discovery returned no issues.')
  }

  const currentIssues = discovery.issues.filter((issue) => issue.currentlyEffective)
  if (currentIssues.length !== 1) {
    throw new Error(`AIRAC discovery is ambiguous: expected one current issue, found ${currentIssues.length}.`)
  }

  for (const issue of discovery.issues) {
    for (const field of ['cycle', 'effectiveDate', 'effectiveDateIso', 'publicationDate', 'publicationDateIso']) {
      if (!issue[field]) {
        throw new Error(`AIRAC discovery is incomplete: ${issue.cycle ?? '(unknown)'} is missing ${field}.`)
      }
    }
    requireValidIsoDate(issue.publicationDateIso, issue, 'publicationDateIso')
    requireValidIsoDate(issue.effectiveDateIso, issue, 'effectiveDateIso')
  }
}

function requireValidIsoDate(value, issue, field) {
  if (!value) {
    throw new Error(`AIRAC discovery is incomplete: ${issue?.cycle ?? '(unknown)'} is missing ${field}.`)
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    throw new Error(`AIRAC discovery has malformed ${field} for ${issue?.cycle ?? '(unknown)'}: ${value}`)
  }

  const date = new Date(`${value}T00:00:00.000Z`)
  if (Number.isNaN(date.getTime()) || date.toISOString().slice(0, 10) !== value) {
    throw new Error(`AIRAC discovery has ambiguous ${field} for ${issue?.cycle ?? '(unknown)'}: ${value}`)
  }

  return value
}

function normalizeCycle(cycle) {
  return cycle.replace(/^A/i, '').toUpperCase()
}

function automationPrBody(fromEdition, toEdition, outputPath) {
  return `This draft PR was generated by the AIRAC daily automation.

It adds a generated, unofficial, review-only comparison report:

- Report: \`${outputPath}\`
- From: ${fromEdition.cycle}, effective ${fromEdition.effectiveDate}, published ${fromEdition.publicationDate}
- To: ${toEdition.cycle}, effective ${toEdition.effectiveDate}, published ${toEdition.publicationDate}

What to review manually:

- Read the changed aerodrome sections in the report.
- Decide whether any changes affect Flugvellir's simplified airport data.
- Check official AIP, NOTAM, meteorological, briefing and ATC sources before making operational decisions.
- Keep any data updates in a separate human-reviewed change.

What this automation does not do:

- It does not modify airport data or AIRAC metadata.
- It does not change operational rules or touch-and-go/training restriction logic.
- It does not publish changes to the live site.
- It never marks this PR ready for review, approves it or merges it.`
}
