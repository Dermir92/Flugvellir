import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import {
  compareSnapshots,
  downloadEditionSnapshot,
  findAerodromePageUrls,
  normalizeAerodromeHtml,
  parseAiracIssueIndex,
  renderMarkdownReport,
} from './lib/airac-detector.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const fixtureRoot = path.join(__dirname, 'fixtures', 'airac')
const fixtureBaseUrl = 'https://example.test/eaip/'

async function fixture(name) {
  return readFile(path.join(fixtureRoot, name), 'utf8')
}

async function fixtureFetch(url) {
  const parsed = new URL(url)
  const pathname = decodeURIComponent(parsed.pathname)

  if (pathname.endsWith('/A_06-2026_2026_06_11/eAIP/menu.html')) return fixture('menu-06.html')
  if (pathname.endsWith('/A_07-2026_2026_08_06/eAIP/menu.html')) return fixture('menu-07.html')

  const icao = ['BIRK', 'BIHN', 'BIHU'].find((code) => pathname.includes(code))
  if (icao && pathname.includes('/A_06-2026_2026_06_11/')) return fixture(`A_06-2026_2026_06_11/${icao}.html`)
  if (icao && pathname.includes('/A_07-2026_2026_08_06/')) return fixture(`A_07-2026_2026_08_06/${icao}.html`)

  throw new Error(`Unexpected fixture fetch: ${url}`)
}

test('parses current, published future, and unpublished future AIRAC issues', async () => {
  const result = parseAiracIssueIndex(await fixture('index.html'), fixtureBaseUrl)

  assert.equal(result.current.cycle, 'A06/2026')
  assert.equal(result.current.currentlyEffective, true)
  assert.equal(result.current.sourceUrl, 'https://example.test/eaip/A_06-2026_2026_06_11/')
  assert.equal(result.future[0].cycle, 'A07/2026')
  assert.equal(result.future[0].published, true)
  assert.equal(result.future[1].cycle, 'A09/2026')
  assert.equal(result.future[1].published, false)
})

test('finds only main English aerodrome pages for requested ICAOs', async () => {
  const pageMap = findAerodromePageUrls(await fixture('menu-06.html'), `${fixtureBaseUrl}A_06-2026_2026_06_11/`, ['BIRK', 'BIHN'])

  assert.equal(pageMap.size, 2)
  assert.match(pageMap.get('BIRK'), /BI-AD%20BIRK%20REYKJAVIK.*%201-en-GB\.html$/)
  assert.equal([...pageMap.keys()].includes('BIHU'), false)
})

test('normalization ignores generated ids, scripts, chrome, and whitespace', () => {
  const first = normalizeAerodromeHtml(`
    <html><head><script>Date.now()</script></head><body>
      <div id="floatingMenu">Show or hide Amendments</div>
      <table><tr id="1"><td>ATS</td><td>118.100 MHZ</td></tr></table>
    </body></html>
  `)
  const second = normalizeAerodromeHtml(`
    <html><head><script>new Date()</script></head><body>
      <div id="floatingMenu">Show or hide Amendments</div>
      <table><tr id="999999"><td> ATS </td><td>118.100   MHZ</td></tr></table>
    </body></html>
  `)

  assert.deepEqual(second.lines, first.lines)
})

test('normalization keeps effective AIRAC amendment text and excludes deleted text', async () => {
  const normalized = normalizeAerodromeHtml(await fixture('amendment-markup-a07.html')).text

  assert.match(normalized, /BIHN runway designators \| 17 \/ 35/)
  assert.doesNotMatch(normalized, /18\s+17/)
  assert.doesNotMatch(normalized, /36\s+35/)
  assert.match(normalized, /BIHN magnetic variation \| 7° W/)
  assert.doesNotMatch(normalized, /9°\s+7° W/)
  assert.match(normalized, /BINF runway designators \| 07 \/ 25/)
  assert.doesNotMatch(normalized, /08\s+07/)
  assert.doesNotMatch(normalized, /26\s+25/)
  assert.match(normalized, /Request service with a minimum 2 hour notice/)
  assert.doesNotMatch(normalized, /1\s+2 hour notice/)
  assert.match(normalized, /BIHU fire category \| NIL/)
  assert.doesNotMatch(normalized, /NIL CAT III/)
  assert.match(normalized, /Ordinary text \| Must remain untouched/)
})

test('fixture comparison reports known BIHN, BIHU, and BIRK material changes', async () => {
  const issues = parseAiracIssueIndex(await fixture('index.html'), fixtureBaseUrl)
  const icaos = ['BIHN', 'BIHU', 'BIRK']
  const fromSnapshot = await downloadEditionSnapshot(issues.current, { icaos, fetcher: fixtureFetch })
  const toSnapshot = await downloadEditionSnapshot(issues.future[0], { icaos, fetcher: fixtureFetch })
  const comparison = compareSnapshots(fromSnapshot, toSnapshot)
  const changed = comparison.airports.filter((airport) => airport.status === 'changed').map((airport) => airport.icao).sort()
  const markdown = renderMarkdownReport(comparison)

  assert.deepEqual(changed, ['BIHN', 'BIHU', 'BIRK'])
  assert.match(markdown, /BIHN/)
  assert.match(markdown, /119\.100 MHZ/)
  assert.match(markdown, /BIHU/)
  assert.match(markdown, /Category \| 4/)
  assert.match(markdown, /BIRK/)
  assert.match(markdown, /specifically approved by ATC/)
})
