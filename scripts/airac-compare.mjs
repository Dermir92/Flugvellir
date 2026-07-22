import path from 'node:path'

import {
  DEFAULT_INDEX_URL,
  compareSnapshots,
  defaultReportPath,
  discoverAiracIssues,
  downloadEditionSnapshot,
  getFlugvellirIcaos,
  isCliEntry,
  renderMarkdownReport,
  resolveEdition,
  writeMarkdownReport,
} from './lib/airac-detector.mjs'

function parseArgs(argv) {
  const args = {
    indexUrl: DEFAULT_INDEX_URL,
    from: 'current',
    to: 'next',
    icaos: null,
    output: null,
    maxLinesPerAirport: 120,
  }

  for (let index = 0; index < argv.length; index++) {
    const arg = argv[index]
    if (arg === '--index-url') args.indexUrl = argv[++index]
    else if (arg === '--from') args.from = argv[++index]
    else if (arg === '--to') args.to = argv[++index]
    else if (arg === '--icao' || arg === '--icaos') args.icaos = argv[++index].split(',').map((code) => code.trim().toUpperCase()).filter(Boolean)
    else if (arg === '--output') args.output = argv[++index]
    else if (arg === '--max-lines-per-airport') args.maxLinesPerAirport = Number(argv[++index])
    else if (arg === '--help') args.help = true
    else throw new Error(`Unknown argument: ${arg}`)
  }

  return args
}

function printHelp() {
  console.log(`Usage: npm run airac:compare -- [--from A06/2026] [--to A07/2026] [--icao BIRK,BIHN] [--output FILE]

Defaults to comparing the currently effective eAIP issue with the first published future issue.
The detector downloads only the main English aerodrome pages for ICAOs present in Flugvellir data.
`)
}

async function main() {
  const args = parseArgs(process.argv.slice(2))
  if (args.help) {
    printHelp()
    return
  }

  const issues = await discoverAiracIssues(args.indexUrl)
  const fromEdition = resolveEdition(issues, args.from)
  const toEdition = resolveEdition(issues, args.to)

  if (!fromEdition) throw new Error(`Could not resolve --from AIRAC reference "${args.from}".`)
  if (!toEdition) throw new Error(`Could not resolve --to AIRAC reference "${args.to}".`)
  if (!fromEdition.sourceUrl) throw new Error(`${fromEdition.cycle} is not published and cannot be compared.`)
  if (!toEdition.sourceUrl) throw new Error(`${toEdition.cycle} is not published and cannot be compared.`)

  const icaos = args.icaos ?? getFlugvellirIcaos()
  const fromSnapshot = await downloadEditionSnapshot(fromEdition, { icaos })
  const toSnapshot = await downloadEditionSnapshot(toEdition, { icaos })
  const comparison = compareSnapshots(fromSnapshot, toSnapshot)
  const markdown = renderMarkdownReport(comparison, { maxLinesPerAirport: args.maxLinesPerAirport })
  const outputPath = args.output
    ? path.resolve(args.output)
    : defaultReportPath(fromEdition, toEdition)

  await writeMarkdownReport(markdown, outputPath)

  const changed = comparison.airports.filter((airport) => airport.status !== 'unchanged')
  console.log(`Compared ${fromEdition.cycle} to ${toEdition.cycle}.`)
  console.log(`Checked ${comparison.airports.length} Flugvellir aerodrome pages.`)
  console.log(`Changed pages: ${changed.length}${changed.length ? ` (${changed.map((airport) => airport.icao).join(', ')})` : ''}.`)
  console.log(`Report written to ${outputPath}.`)
}

if (isCliEntry(import.meta.url)) {
  main().catch((error) => {
    console.error(`AIRAC comparison failed: ${error.message}`)
    process.exit(1)
  })
}
