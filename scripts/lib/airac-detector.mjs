import { createHash } from 'node:crypto'
import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { AIRPORTS } from '../../src/data/airports.js'

export const DEFAULT_INDEX_URL = 'https://eaip.isavia.is/'
export const DEFAULT_OUTPUT_DIR = 'airac-output'

const MONTHS = new Map([
  ['JAN', '01'],
  ['FEB', '02'],
  ['MAR', '03'],
  ['APR', '04'],
  ['MAY', '05'],
  ['JUN', '06'],
  ['JUL', '07'],
  ['AUG', '08'],
  ['SEP', '09'],
  ['OCT', '10'],
  ['NOV', '11'],
  ['DEC', '12'],
])

export class AiracParseError extends Error {
  constructor(message) {
    super(message)
    this.name = 'AiracParseError'
  }
}

export function getFlugvellirIcaos() {
  return AIRPORTS.map((airport) => airport.icao).sort()
}

export async function fetchText(url) {
  const response = await fetch(url, {
    headers: {
      'user-agent': 'Flugvellir AIRAC change detector (+https://github.com/Dermir92/Flugvellir)',
    },
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: HTTP ${response.status}`)
  }

  return response.text()
}

export async function discoverAiracIssues(indexUrl = DEFAULT_INDEX_URL, fetcher = fetchText) {
  const html = await fetcher(indexUrl)
  return parseAiracIssueIndex(html, indexUrl)
}

export function parseAiracIssueIndex(html, indexUrl = DEFAULT_INDEX_URL) {
  const sections = [
    ['current', 'Currently Effective Issue'],
    ['future', 'Next Issues'],
    ['expired', 'Expired Issues'],
  ]

  const issues = []
  for (const [kind, heading] of sections) {
    const sectionHtml = sectionAfterHeading(html, heading)
    if (!sectionHtml) {
      if (kind === 'current' || kind === 'future') {
        throw new AiracParseError(`Could not find "${heading}" in eAIP issue index.`)
      }
      continue
    }

    for (const row of parseIssueRows(sectionHtml, indexUrl)) {
      issues.push({
        ...row,
        kind,
        currentlyEffective: kind === 'current',
        future: kind === 'future',
        published: Boolean(row.sourceUrl),
      })
    }
  }

  const current = issues.filter((issue) => issue.currentlyEffective)
  if (current.length !== 1) {
    throw new AiracParseError(`Expected exactly one currently effective AIRAC issue, found ${current.length}.`)
  }

  return {
    retrievedAt: new Date().toISOString(),
    indexUrl,
    current: current[0],
    future: issues.filter((issue) => issue.kind === 'future'),
    expired: issues.filter((issue) => issue.kind === 'expired'),
    issues,
  }
}

function sectionAfterHeading(html, heading) {
  const headingPattern = new RegExp(`<h[1-6][^>]*>\\s*${escapeRegExp(heading)}\\s*<\\/h[1-6]>`, 'i')
  const match = headingPattern.exec(html)
  if (!match) return null

  const start = match.index + match[0].length
  const rest = html.slice(start)
  const nextHeading = /<h[1-6][^>]*>/i.exec(rest)
  return nextHeading ? rest.slice(0, nextHeading.index) : rest
}

function parseIssueRows(sectionHtml, indexUrl) {
  const text = htmlToPlainText(sectionHtml)
  const issuePattern = /(\d{2}\s+[A-Z]{3}\s+\d{4})\s+(\d{2}\s+[A-Z]{3}\s+\d{4})\s+AIRAC\s+(\d{2}\/\d{4})/g
  const rows = []
  let match

  while ((match = issuePattern.exec(text)) !== null) {
    const [, effective, publication, cycle] = match
    const href = findIssueHref(sectionHtml, effective)
    rows.push({
      cycle: `A${cycle}`,
      effectiveDate: effective,
      effectiveDateIso: parseAiracDate(effective),
      publicationDate: publication,
      publicationDateIso: parseAiracDate(publication),
      sourceUrl: href ? new URL(href, indexUrl).toString() : null,
    })
  }

  return rows
}

function findIssueHref(sectionHtml, effectiveDate) {
  const anchorPattern = /<a\b[^>]*href=['"]([^'"]+)['"][^>]*>([\s\S]*?)<\/a>/gi
  let match

  while ((match = anchorPattern.exec(sectionHtml)) !== null) {
    const [, href, labelHtml] = match
    if (htmlToPlainText(labelHtml).includes(effectiveDate)) {
      return href
    }
  }

  return null
}

export function parseAiracDate(value) {
  const match = /^(\d{2})\s+([A-Z]{3})\s+(\d{4})$/.exec(value.trim().toUpperCase())
  if (!match) throw new AiracParseError(`Could not parse AIRAC date "${value}".`)

  const [, day, monthName, year] = match
  const month = MONTHS.get(monthName)
  if (!month) throw new AiracParseError(`Unknown AIRAC month "${monthName}" in "${value}".`)

  return `${year}-${month}-${day}`
}

export function resolveEdition(issues, reference) {
  if (!reference || reference === 'current') {
    return issues.current
  }

  if (reference === 'next') {
    return issues.future.find((issue) => issue.published)
  }

  const normalized = reference.trim().toUpperCase()
  return issues.issues.find((issue) => {
    return issue.cycle.toUpperCase() === normalized ||
      issue.sourceUrl?.toUpperCase() === normalized ||
      issue.sourceUrl?.toUpperCase().includes(normalized.replace('/', '-'))
  })
}

export async function downloadEditionSnapshot(edition, options = {}) {
  const {
    icaos = getFlugvellirIcaos(),
    fetcher = fetchText,
  } = options

  if (!edition?.sourceUrl) {
    throw new AiracParseError(`AIRAC ${edition?.cycle ?? '(unknown)'} does not have a published source URL.`)
  }

  const menuUrl = new URL('eAIP/menu.html', edition.sourceUrl).toString()
  const menuHtml = await fetcher(menuUrl)
  const pageMap = findAerodromePageUrls(menuHtml, edition.sourceUrl, icaos)
  const pages = []

  for (const icao of icaos) {
    const pageUrl = pageMap.get(icao)
    if (!pageUrl) {
      throw new AiracParseError(`Could not find eAIP main English aerodrome page for ${icao} in ${menuUrl}.`)
    }

    const html = await fetcher(pageUrl)
    const normalized = normalizeAerodromeHtml(html)
    pages.push({
      icao,
      sourceUrl: pageUrl,
      retrievedAt: new Date().toISOString(),
      hash: hashLines(normalized.lines),
      normalized,
    })
  }

  return {
    edition,
    menuUrl,
    retrievedAt: new Date().toISOString(),
    pages,
  }
}

export function findAerodromePageUrls(menuHtml, editionUrl, icaos) {
  const wanted = new Set(icaos)
  const pageMap = new Map()
  const anchorPattern = /<a\b[^>]*href=['"]([^'"]+)['"][^>]*>([\s\S]*?)<\/a>/gi
  let match

  while ((match = anchorPattern.exec(menuHtml)) !== null) {
    const [, href, labelHtml] = match
    const hrefNoFragment = href.split('#')[0]
    const label = htmlToPlainText(labelHtml)
    const icao = [...wanted].find((code) => {
      return (hrefNoFragment.includes(` ${code} `) || label.includes(code)) &&
        /(?:BI-AD|BI-LS)\s+/i.test(hrefNoFragment) &&
        / 1-en-GB\.html$/i.test(hrefNoFragment)
    })

    if (icao && !pageMap.has(icao)) {
      pageMap.set(icao, new URL(`eAIP/${encodeURIPath(hrefNoFragment)}`, editionUrl).toString())
    }
  }

  return pageMap
}

function encodeURIPath(value) {
  return value.split('/').map((part) => encodeURIComponent(decodeHtmlEntities(part))).join('/')
}

export function normalizeAerodromeHtml(html) {
  let text = html
    .replace(/\r?\n/g, ' ')
    .replace(/<head\b[\s\S]*?<\/head>/gi, ' ')
    .replace(/<script\b[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style\b[\s\S]*?<\/style>/gi, ' ')
    .replace(/<div\b[^>]*id=['"]floatingMenu['"][\s\S]*?<\/div>/gi, ' ')
    .replace(/<iframe\b[\s\S]*?<\/iframe>/gi, ' ')
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<(br|hr)\b[^>]*>/gi, ' ')
    .replace(/<\/(tr|p|div|table|h[1-6]|li)>/gi, '\n')
    .replace(/<\/(td|th)>/gi, ' | ')
    .replace(/<[^>]+>/g, ' ')

  text = decodeHtmlEntities(text)
    .normalize('NFKC')
    .replace(/\u00a0/g, ' ')
    .replace(/[ \t\f\v]+/g, ' ')
    .replace(/\r\n?/g, '\n')

  const lines = text
    .split('\n')
    .map((line) => line.replace(/\s+\|/g, ' |').replace(/\|\s+/g, '| ').trim())
    .filter(Boolean)
    .filter((line) => !isIgnoredNormalizedLine(line))

  return {
    lines: dedupeAdjacent(lines),
    text: dedupeAdjacent(lines).join('\n'),
  }
}

function isIgnoredNormalizedLine(line) {
  return [
    /^show or hide amendments$/i,
    /^iframe$/i,
    /^include file$/i,
  ].some((pattern) => pattern.test(line))
}

function dedupeAdjacent(lines) {
  const result = []
  for (const line of lines) {
    if (result[result.length - 1] !== line) result.push(line)
  }
  return result
}

export function compareSnapshots(fromSnapshot, toSnapshot) {
  const toByIcao = new Map(toSnapshot.pages.map((page) => [page.icao, page]))
  const airportReports = []

  for (const fromPage of fromSnapshot.pages) {
    const toPage = toByIcao.get(fromPage.icao)
    if (!toPage) {
      airportReports.push({
        icao: fromPage.icao,
        status: 'removed',
        fromPage,
        toPage: null,
        hunks: [],
      })
      continue
    }

    const hunks = diffLines(fromPage.normalized.lines, toPage.normalized.lines)
    airportReports.push({
      icao: fromPage.icao,
      status: hunks.length ? 'changed' : 'unchanged',
      fromPage,
      toPage,
      hunks,
    })
  }

  const fromIcaos = new Set(fromSnapshot.pages.map((page) => page.icao))
  for (const toPage of toSnapshot.pages) {
    if (!fromIcaos.has(toPage.icao)) {
      airportReports.push({
        icao: toPage.icao,
        status: 'added',
        fromPage: null,
        toPage,
        hunks: [],
      })
    }
  }

  return {
    from: fromSnapshot.edition,
    to: toSnapshot.edition,
    generatedAt: new Date().toISOString(),
    airports: airportReports,
  }
}

export function renderMarkdownReport(comparison, options = {}) {
  const maxLinesPerAirport = options.maxLinesPerAirport ?? 120
  const changed = comparison.airports.filter((airport) => airport.status !== 'unchanged')
  const unchanged = comparison.airports.length - changed.length
  const lines = [
    `# AIRAC change report: ${comparison.from.cycle} to ${comparison.to.cycle}`,
    '',
    `Generated: ${comparison.generatedAt}`,
    '',
    '> Review aid only. Official AIP, NOTAM and briefing sources remain authoritative.',
    '',
    '## Editions',
    '',
    '| Role | AIRAC | Effective | Published | Source |',
    '| --- | --- | --- | --- | --- |',
    `| From | ${comparison.from.cycle} | ${comparison.from.effectiveDate} | ${comparison.from.publicationDate} | ${comparison.from.sourceUrl ?? 'unpublished'} |`,
    `| To | ${comparison.to.cycle} | ${comparison.to.effectiveDate} | ${comparison.to.publicationDate} | ${comparison.to.sourceUrl ?? 'unpublished'} |`,
    '',
    '## Summary',
    '',
    `- Checked ${comparison.airports.length} Flugvellir aerodrome pages.`,
    `- Changed pages: ${changed.length}.`,
    `- Unchanged pages: ${unchanged}.`,
  ]

  if (changed.length > 0) {
    lines.push(`- Changed ICAOs: ${changed.map((airport) => airport.icao).join(', ')}.`)
  }

  lines.push('', '## Changes', '')

  if (changed.length === 0) {
    lines.push('No normalized aerodrome text changes were detected.', '')
  }

  for (const airport of changed) {
    lines.push(`### ${airport.icao}`, '')

    if (airport.status === 'added') {
      lines.push('- Page added in target edition.', `- Source: ${airport.toPage.sourceUrl}`, '')
      continue
    }

    if (airport.status === 'removed') {
      lines.push('- Page removed from target edition.', `- Previous source: ${airport.fromPage.sourceUrl}`, '')
      continue
    }

    lines.push(`- From: ${airport.fromPage.sourceUrl}`)
    lines.push(`- To: ${airport.toPage.sourceUrl}`)
    lines.push(`- Retrieved from source at: ${airport.fromPage.retrievedAt} / ${airport.toPage.retrievedAt}`)
    lines.push('', '```diff')

    const diffLinesForAirport = airport.hunks.flatMap((hunk) => hunk.lines)
    for (const diffLine of diffLinesForAirport.slice(0, maxLinesPerAirport)) {
      lines.push(`${diffLine.type === 'added' ? '+' : '-'} ${diffLine.value}`)
    }

    if (diffLinesForAirport.length > maxLinesPerAirport) {
      lines.push(`... ${diffLinesForAirport.length - maxLinesPerAirport} more normalized changed lines omitted ...`)
    }

    lines.push('```', '')
  }

  return `${lines.join('\n').trimEnd()}\n`
}

export async function writeMarkdownReport(markdown, outputPath) {
  await mkdir(path.dirname(outputPath), { recursive: true })
  await writeFile(outputPath, markdown, 'utf8')
  return outputPath
}

export function defaultReportPath(fromEdition, toEdition, cwd = process.cwd()) {
  const filename = `airac-change-report-${slug(fromEdition.cycle)}-to-${slug(toEdition.cycle)}.md`
  return path.join(cwd, DEFAULT_OUTPUT_DIR, filename)
}

function diffLines(fromLines, toLines) {
  const m = fromLines.length
  const n = toLines.length
  const table = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0))

  for (let i = m - 1; i >= 0; i--) {
    for (let j = n - 1; j >= 0; j--) {
      table[i][j] = fromLines[i] === toLines[j]
        ? table[i + 1][j + 1] + 1
        : Math.max(table[i + 1][j], table[i][j + 1])
    }
  }

  const changes = []
  let i = 0
  let j = 0

  while (i < m && j < n) {
    if (fromLines[i] === toLines[j]) {
      i++
      j++
    } else if (table[i + 1][j] >= table[i][j + 1]) {
      changes.push({ type: 'removed', value: fromLines[i] })
      i++
    } else {
      changes.push({ type: 'added', value: toLines[j] })
      j++
    }
  }

  while (i < m) changes.push({ type: 'removed', value: fromLines[i++] })
  while (j < n) changes.push({ type: 'added', value: toLines[j++] })

  return changes.length ? [{ lines: changes }] : []
}

function htmlToPlainText(html) {
  return decodeHtmlEntities(html.replace(/<[^>]+>/g, ' '))
    .replace(/\u00a0/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function decodeHtmlEntities(value) {
  return value
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCodePoint(Number.parseInt(code, 16)))
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .replace(/&apos;/gi, "'")
}

function hashLines(lines) {
  return createHash('sha256').update(lines.join('\n')).digest('hex')
}

function slug(value) {
  return value.replace(/[^A-Z0-9]+/gi, '-').replace(/^-|-$/g, '')
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

export function isCliEntry(importMetaUrl) {
  return process.argv[1] && fileURLToPath(importMetaUrl) === path.resolve(process.argv[1])
}
