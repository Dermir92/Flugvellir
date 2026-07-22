import {
  DEFAULT_INDEX_URL,
  discoverAiracIssues,
  isCliEntry,
} from './lib/airac-detector.mjs'

function parseArgs(argv) {
  const args = {
    indexUrl: DEFAULT_INDEX_URL,
    json: false,
  }

  for (let index = 0; index < argv.length; index++) {
    const arg = argv[index]
    if (arg === '--index-url') args.indexUrl = argv[++index]
    else if (arg === '--json') args.json = true
    else if (arg === '--help') args.help = true
    else throw new Error(`Unknown argument: ${arg}`)
  }

  return args
}

function printHelp() {
  console.log(`Usage: npm run airac:discover -- [--index-url URL] [--json]

Discovers the currently effective AIRAC issue and published future issues from the eAIP index.
`)
}

function printIssues(result) {
  console.log(`# eAIP AIRAC issues`)
  console.log(`Retrieved: ${result.retrievedAt}`)
  console.log(`Index: ${result.indexUrl}`)
  console.log('')
  console.log('| Status | AIRAC | Effective | Published | Source |')
  console.log('| --- | --- | --- | --- | --- |')

  for (const issue of result.issues) {
    const status = issue.currentlyEffective ? 'current effective' : issue.future ? 'future' : 'expired'
    console.log(`| ${status} | ${issue.cycle} | ${issue.effectiveDate} | ${issue.publicationDate} | ${issue.sourceUrl ?? 'not published'} |`)
  }
}

async function main() {
  const args = parseArgs(process.argv.slice(2))
  if (args.help) {
    printHelp()
    return
  }

  const result = await discoverAiracIssues(args.indexUrl)
  if (args.json) console.log(JSON.stringify(result, null, 2))
  else printIssues(result)
}

if (isCliEntry(import.meta.url)) {
  main().catch((error) => {
    console.error(`AIRAC discovery failed: ${error.message}`)
    process.exit(1)
  })
}
