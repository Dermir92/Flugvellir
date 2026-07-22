import { readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

import {
  buildAutomationPlan,
  generateAutomationReport,
  reportsEquivalentFiles,
  writePlan,
} from './lib/airac-automation.mjs'
import { DEFAULT_INDEX_URL, isCliEntry } from './lib/airac-detector.mjs'

function parseArgs(argv) {
  const args = {
    indexUrl: DEFAULT_INDEX_URL,
    generate: false,
    dryRun: false,
    json: false,
    planOutput: null,
    reportsEquivalent: null,
    prBodyFromPlan: null,
  }

  for (let index = 0; index < argv.length; index++) {
    const arg = argv[index]
    if (arg === '--index-url') args.indexUrl = argv[++index]
    else if (arg === '--generate') args.generate = true
    else if (arg === '--dry-run') args.dryRun = true
    else if (arg === '--json') args.json = true
    else if (arg === '--plan-output') args.planOutput = argv[++index]
    else if (arg === '--reports-equivalent') args.reportsEquivalent = [argv[++index], argv[++index]]
    else if (arg === '--pr-body-from-plan') args.prBodyFromPlan = argv[++index]
    else if (arg === '--help') args.help = true
    else throw new Error(`Unknown argument: ${arg}`)
  }

  return args
}

function printHelp() {
  console.log(`Usage: node scripts/airac-automation.mjs [--dry-run] [--generate] [--plan-output FILE] [--json]

Plans the next AIRAC automation action from tracked reports and the official eAIP index.

Examples:
  npm run airac:automation:dry-run
  node scripts/airac-automation.mjs --generate --plan-output .airac-plan.json
  node scripts/airac-automation.mjs --reports-equivalent old.md new.md
`)
}

function printPlain(plan) {
  if (plan.action === 'none') {
    console.log(`No AIRAC automation action: ${plan.reason}`)
    return
  }

  console.log(`${plan.action}: ${plan.reason}`)
  console.log(`Report: ${plan.reportPath}`)
  console.log(`Branch: ${plan.branchName}`)
  console.log(`Title: ${plan.prTitle}`)
}

async function main() {
  const args = parseArgs(process.argv.slice(2))
  if (args.help) {
    printHelp()
    return
  }

  if (args.reportsEquivalent) {
    const equivalent = await reportsEquivalentFiles(args.reportsEquivalent[0], args.reportsEquivalent[1])
    process.exit(equivalent ? 0 : 1)
  }

  if (args.prBodyFromPlan) {
    const plan = JSON.parse(await readFile(args.prBodyFromPlan, 'utf8'))
    console.log(plan.prBody ?? '')
    return
  }

  const plan = await buildAutomationPlan({ indexUrl: args.indexUrl })
  const outputPlan = args.generate && !args.dryRun
    ? await generateAutomationReport(plan)
    : plan

  await writePlan(outputPlan, args.planOutput)

  if (args.json) console.log(JSON.stringify(outputPlan, null, 2))
  else printPlain(outputPlan)
}

if (isCliEntry(import.meta.url)) {
  main().catch((error) => {
    const script = path.basename(fileURLToPath(import.meta.url))
    console.error(`${script} failed: ${error.message}`)
    process.exit(1)
  })
}
