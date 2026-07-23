import assert from 'node:assert/strict'
import { mkdtemp, rm, writeFile } from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import test from 'node:test'

import { parseAiracIssueIndex } from './lib/airac-detector.mjs'
import {
  automationPlanGithubOutputs,
  evaluateAutomationPrSafetyState,
  formatGithubOutputs,
  generateAutomationReport,
  readAutomationPlan,
  reportsEquivalentIgnoringRetrievalTime,
  selectNextAiracComparison,
  writePlan,
} from './lib/airac-automation.mjs'

const baseUrl = 'https://example.test/eaip/'

function discovery({ includeA08 = false, includeA09 = false } = {}) {
  const a08 = includeA08
    ? '<p><a href="A_08-2026_2026_09_03/">03 SEP 2026</a> 24 JUL 2026 AIRAC 08/2026</p>'
    : ''
  const a09 = includeA09
    ? '<p><a href="A_09-2026_2026_10_01/">01 OCT 2026</a> 21 AUG 2026 AIRAC 09/2026</p>'
    : ''

  return parseAiracIssueIndex(`
    <h2>Currently Effective Issue</h2>
    <p><a href="A_06-2026_2026_06_11/">11 JUN 2026</a> 01 MAY 2026 AIRAC 06/2026</p>
    <h2>Next Issues</h2>
    <p><a href="A_07-2026_2026_08_06/">06 AUG 2026</a> 26 JUN 2026 AIRAC 07/2026</p>
    ${a08}
    ${a09}
    <h2>Expired Issues (Archives)</h2>
    <p><a href="A_05-2026_2026_05_14/">14 MAY 2026</a> 03 APR 2026 AIRAC 05/2026</p>
  `, baseUrl)
}

function discoveryWithIssue(overrides) {
  const issues = discovery()
  const issue = {
    ...issues.future[0],
    ...overrides,
  }
  return {
    ...issues,
    future: [issue],
    issues: [issues.current, issue],
  }
}

function actionablePlan(overrides = {}) {
  const plan = selectNextAiracComparison(discovery(), {
    currentUtcDate: '2026-07-22T00:00:00Z',
  })
  return {
    ...plan,
    ...overrides,
  }
}

async function withTempDir(fn) {
  const dir = await mkdtemp(path.join(os.tmpdir(), 'airac-automation-test-'))
  try {
    return await fn(dir)
  } finally {
    await rm(dir, { recursive: true, force: true })
  }
}

test('automation does nothing when no new AIRAC report is needed', () => {
  const plan = selectNextAiracComparison(discovery(), {
    currentUtcDate: '2026-07-22T00:00:00Z',
    existingReportPaths: ['docs/airac-reports/A06-2026-to-A07-2026.md'],
  })

  assert.equal(plan.action, 'none')
})

test('automation keeps a valid no-action plan when generate mode has no report to write', async () => {
  const plan = selectNextAiracComparison(discovery(), {
    currentUtcDate: '2026-07-22T00:00:00Z',
    existingReportPaths: ['docs/airac-reports/A06-2026-to-A07-2026.md'],
  })

  const generated = await generateAutomationReport(plan)

  assert.equal(generated.action, 'none')
  assert.equal(generated.reason, plan.reason)
})

test('automation reads valid actionable plan outputs for the workflow', async () => {
  await withTempDir(async (dir) => {
    const file = path.join(dir, 'plan.json')
    const plan = actionablePlan()
    await writePlan(plan, file)

    const readPlan = await readAutomationPlan(file)
    const outputs = automationPlanGithubOutputs(readPlan)

    assert.deepEqual(outputs, {
      action: 'create-or-update-pr',
      branch: 'automation/airac-A07-2026',
      report: 'docs/airac-reports/A06-2026-to-A07-2026.md',
      title: 'AIRAC 07/2026: review detected aerodrome changes',
    })
    assert.equal(formatGithubOutputs(outputs).includes('action=create-or-update-pr'), true)
  })
})

test('automation rejects a null plan instead of treating it as no action', async () => {
  await withTempDir(async (dir) => {
    const file = path.join(dir, 'plan.json')
    await writeFile(file, 'null\n', 'utf8')

    await assert.rejects(
      () => readAutomationPlan(file),
      /expected a JSON object/
    )
  })
})

test('automation rejects missing plan output with a clear diagnostic', async () => {
  await withTempDir(async (dir) => {
    await assert.rejects(
      () => readAutomationPlan(path.join(dir, 'missing-plan.json')),
      /AIRAC automation plan is missing/
    )
  })
})

test('automation rejects malformed plan output with a clear diagnostic', async () => {
  await withTempDir(async (dir) => {
    const invalidJson = path.join(dir, 'invalid-json.json')
    const invalidShape = path.join(dir, 'invalid-shape.json')
    await writeFile(invalidJson, '{', 'utf8')
    await writeFile(invalidShape, '{"action":"create-or-update-pr"}\n', 'utf8')

    await assert.rejects(
      () => readAutomationPlan(invalidJson),
      /not valid JSON/
    )
    await assert.rejects(
      () => readAutomationPlan(invalidShape),
      /branchName is required/
    )
  })
})

test('automation selects one new published future edition', () => {
  const plan = selectNextAiracComparison(discovery(), {
    currentUtcDate: '2026-07-22T00:00:00Z',
  })

  assert.equal(plan.action, 'create-or-update-pr')
  assert.equal(plan.from.cycle, 'A06/2026')
  assert.equal(plan.to.cycle, 'A07/2026')
  assert.equal(plan.reportPath, 'docs/airac-reports/A06-2026-to-A07-2026.md')
  assert.equal(plan.branchName, 'automation/airac-A07-2026')
})

test('automation handles multiple published future editions without skipping a cycle', () => {
  const first = selectNextAiracComparison(discovery({ includeA08: true }), {
    currentUtcDate: '2026-07-24T00:00:00Z',
  })
  const second = selectNextAiracComparison(discovery({ includeA08: true }), {
    currentUtcDate: '2026-07-24T00:00:00Z',
    existingReportPaths: ['docs/airac-reports/A06-2026-to-A07-2026.md'],
  })

  assert.equal(first.from.cycle, 'A06/2026')
  assert.equal(first.to.cycle, 'A07/2026')
  assert.equal(second.from.cycle, 'A07/2026')
  assert.equal(second.to.cycle, 'A08/2026')
  assert.equal(second.reportPath, 'docs/airac-reports/A07-2026-to-A08-2026.md')
})

test('automation updates an existing draft PR branch instead of planning a duplicate', () => {
  const plan = selectNextAiracComparison(discovery(), {
    currentUtcDate: '2026-07-22T00:00:00Z',
    existingOpenTargetCycles: ['07/2026'],
  })

  assert.equal(plan.action, 'update-existing-pr')
  assert.equal(plan.branchName, 'automation/airac-A07-2026')
})

test('automation report comparison is idempotent apart from retrieval timestamps', () => {
  const first = `# AIRAC change report
Generated: 2026-07-22T10:00:00.000Z
- Retrieved from source at: 2026-07-22T10:00:01.000Z / 2026-07-22T10:00:02.000Z
+ 17 | 1500 | NIL
`
  const second = `# AIRAC change report
Generated: 2026-07-23T10:00:00.000Z
- Retrieved from source at: 2026-07-23T10:00:01.000Z / 2026-07-23T10:00:02.000Z
+ 17 | 1500 | NIL
`

  assert.equal(reportsEquivalentIgnoringRetrievalTime(first, second), true)
})

test('automation fails clearly on malformed eAIP discovery markup', () => {
  assert.throws(() => {
    parseAiracIssueIndex(`
      <h2>Currently Effective Issue</h2>
      <p>11 JUN 2026 01 MAY 2026 AIRAC 06/2026</p>
    `, baseUrl)
  }, /Could not find "Next Issues"/)
})

test('automation never treats future AIRAC as currently effective', () => {
  const issues = discovery({ includeA08: true })
  const plan = selectNextAiracComparison(issues, {
    currentUtcDate: '2026-07-22T00:00:00Z',
  })

  assert.equal(issues.current.cycle, 'A06/2026')
  assert.equal(issues.future.map((issue) => issue.cycle).includes('A07/2026'), true)
  assert.equal(plan.from.cycle, 'A06/2026')
  assert.equal(plan.to.currentlyEffective, false)
})

test('automation selects the correct consecutive comparison after an existing report', () => {
  const plan = selectNextAiracComparison(discovery({ includeA08: true, includeA09: true }), {
    currentUtcDate: '2026-08-21T00:00:00Z',
    existingReportPaths: [
      'docs/airac-reports/A06-2026-to-A07-2026.md',
      'docs/airac-reports/A07-2026-to-A08-2026.md',
    ],
  })

  assert.equal(plan.from.cycle, 'A08/2026')
  assert.equal(plan.to.cycle, 'A09/2026')
  assert.equal(plan.reportPath, 'docs/airac-reports/A08-2026-to-A09-2026.md')
})

test('automation ignores an accessible edition before its official publication date', () => {
  const plan = selectNextAiracComparison(discovery({ includeA08: true }), {
    currentUtcDate: '2026-07-22T00:00:00Z',
    existingReportPaths: ['docs/airac-reports/A06-2026-to-A07-2026.md'],
  })

  assert.equal(plan.action, 'none')
  assert.deepEqual(plan.publishedFutureCycles, ['A07/2026'])
  assert.equal(plan.publishedFutureCycles.includes('A08/2026'), false)
})

test('automation treats an edition as eligible on its UTC publication date', () => {
  const plan = selectNextAiracComparison(discovery({ includeA08: true }), {
    currentUtcDate: '2026-07-24T00:00:00Z',
    existingReportPaths: ['docs/airac-reports/A06-2026-to-A07-2026.md'],
  })

  assert.equal(plan.from.cycle, 'A07/2026')
  assert.equal(plan.to.cycle, 'A08/2026')
  assert.equal(plan.reportPath, 'docs/airac-reports/A07-2026-to-A08-2026.md')
})

test('automation keeps a published future-effective edition eligible but not effective', () => {
  const issues = discovery()
  const plan = selectNextAiracComparison(issues, {
    currentUtcDate: '2026-06-26T00:00:00Z',
  })

  assert.equal(issues.current.cycle, 'A06/2026')
  assert.equal(plan.to.cycle, 'A07/2026')
  assert.equal(plan.to.future, true)
  assert.equal(plan.to.currentlyEffective, false)
})

test('automation fails safely when publication date is missing or malformed', () => {
  assert.throws(() => {
    selectNextAiracComparison(discoveryWithIssue({ publicationDateIso: null }), {
      currentUtcDate: '2026-07-22T00:00:00Z',
    })
  }, /missing publicationDateIso/)

  assert.throws(() => {
    selectNextAiracComparison(discoveryWithIssue({ publicationDateIso: '2026-07' }), {
      currentUtcDate: '2026-07-22T00:00:00Z',
    })
  }, /malformed publicationDateIso/)

  assert.throws(() => {
    selectNextAiracComparison(discoveryWithIssue({ publicationDateIso: '2026-02-31' }), {
      currentUtcDate: '2026-07-22T00:00:00Z',
    })
  }, /ambiguous publicationDateIso/)
})

test('automation selects the earliest eligible consecutive comparison with multiple future editions', () => {
  const first = selectNextAiracComparison(discovery({ includeA08: true, includeA09: true }), {
    currentUtcDate: '2026-08-21T00:00:00Z',
    existingReportPaths: ['docs/airac-reports/A06-2026-to-A07-2026.md'],
  })
  const second = selectNextAiracComparison(discovery({ includeA08: true, includeA09: true }), {
    currentUtcDate: '2026-08-21T00:00:00Z',
    existingReportPaths: [
      'docs/airac-reports/A06-2026-to-A07-2026.md',
      'docs/airac-reports/A07-2026-to-A08-2026.md',
    ],
  })

  assert.equal(first.from.cycle, 'A07/2026')
  assert.equal(first.to.cycle, 'A08/2026')
  assert.equal(second.from.cycle, 'A08/2026')
  assert.equal(second.to.cycle, 'A09/2026')
})

test('automation blocks before push when an existing open PR is not a draft', () => {
  const decision = evaluateAutomationPrSafetyState({
    hasOpenPr: true,
    openPrIsDraft: false,
    branchExists: true,
    sameReport: false,
  })

  assert.equal(decision.action, 'fail-non-draft-pr')
  assert.equal(decision.mayPush, false)
  assert.equal(decision.shouldCreateOrUpdatePr, false)
})

test('automation recreates a draft PR when a branch exists but no open PR reviews it', () => {
  const decision = evaluateAutomationPrSafetyState({
    hasOpenPr: false,
    branchExists: true,
    sameReport: true,
  })

  assert.equal(decision.action, 'create-draft-pr-from-existing-branch')
  assert.equal(decision.mayPush, false)
  assert.equal(decision.shouldCreateOrUpdatePr, true)
})

test('automation leaves an unchanged report with an open draft PR as a no-op', () => {
  const decision = evaluateAutomationPrSafetyState({
    hasOpenPr: true,
    openPrIsDraft: true,
    branchExists: true,
    sameReport: true,
  })

  assert.equal(decision.action, 'noop-open-draft-same-report')
  assert.equal(decision.mayPush, false)
  assert.equal(decision.shouldCreateOrUpdatePr, false)
})

test('automation updates only an open draft PR when the report changed', () => {
  const decision = evaluateAutomationPrSafetyState({
    hasOpenPr: true,
    openPrIsDraft: true,
    branchExists: true,
    sameReport: false,
  })

  assert.equal(decision.action, 'update-open-draft-pr')
  assert.equal(decision.mayPush, true)
  assert.equal(decision.shouldCreateOrUpdatePr, true)
})
