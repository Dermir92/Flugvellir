import assert from 'node:assert/strict'
import test from 'node:test'

import { parseAiracIssueIndex } from './lib/airac-detector.mjs'
import {
  evaluateAutomationPrSafetyState,
  reportsEquivalentIgnoringRetrievalTime,
  selectNextAiracComparison,
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

test('automation does nothing when no new AIRAC report is needed', () => {
  const plan = selectNextAiracComparison(discovery(), {
    existingReportPaths: ['docs/airac-reports/A06-2026-to-A07-2026.md'],
  })

  assert.equal(plan.action, 'none')
})

test('automation selects one new published future edition', () => {
  const plan = selectNextAiracComparison(discovery())

  assert.equal(plan.action, 'create-or-update-pr')
  assert.equal(plan.from.cycle, 'A06/2026')
  assert.equal(plan.to.cycle, 'A07/2026')
  assert.equal(plan.reportPath, 'docs/airac-reports/A06-2026-to-A07-2026.md')
  assert.equal(plan.branchName, 'automation/airac-A07-2026')
})

test('automation handles multiple published future editions without skipping a cycle', () => {
  const first = selectNextAiracComparison(discovery({ includeA08: true }))
  const second = selectNextAiracComparison(discovery({ includeA08: true }), {
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
  const plan = selectNextAiracComparison(issues)

  assert.equal(issues.current.cycle, 'A06/2026')
  assert.equal(issues.future.map((issue) => issue.cycle).includes('A07/2026'), true)
  assert.equal(plan.from.cycle, 'A06/2026')
  assert.equal(plan.to.currentlyEffective, false)
})

test('automation selects the correct consecutive comparison after an existing report', () => {
  const plan = selectNextAiracComparison(discovery({ includeA08: true, includeA09: true }), {
    existingReportPaths: [
      'docs/airac-reports/A06-2026-to-A07-2026.md',
      'docs/airac-reports/A07-2026-to-A08-2026.md',
    ],
  })

  assert.equal(plan.from.cycle, 'A08/2026')
  assert.equal(plan.to.cycle, 'A09/2026')
  assert.equal(plan.reportPath, 'docs/airac-reports/A08-2026-to-A09-2026.md')
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
