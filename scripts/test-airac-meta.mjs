import assert from 'node:assert/strict'
import test from 'node:test'

import { validateAiracMeta } from './lib/airac-meta-validation.mjs'
import { AIRAC_META } from '../src/data/airac-meta.js'

const validCurrentMeta = {
  cycle: 'A06/2026',
  effective: '2026-06-11',
  next: '06 AUG 2026',
  next_iso: '2026-08-06',
  source_url: 'https://eaip.isavia.is/A_06-2026_2026_06_11/',
}

test('current AIRAC metadata is internally consistent', () => {
  assert.deepEqual(validateAiracMeta(AIRAC_META), [])
  assert.deepEqual(AIRAC_META, validCurrentMeta)
})

test('AIRAC metadata accepts a matching future cycle and source URL when explicitly chosen', () => {
  assert.deepEqual(validateAiracMeta({
    cycle: 'A07/2026',
    effective: '2026-08-06',
    next: '03 SEP 2026',
    next_iso: '2026-09-03',
    source_url: 'https://eaip.isavia.is/A_07-2026_2026_08_06/',
  }), [])
})

test('AIRAC metadata rejects a source URL for the wrong cycle', () => {
  const issues = validateAiracMeta({
    ...validCurrentMeta,
    source_url: 'https://eaip.isavia.is/A_07-2026_2026_06_11/',
  })

  assert.equal(issues.some((issue) => issue.path === 'source_url'), true)
})

test('AIRAC metadata rejects a source URL for the wrong effective date', () => {
  const issues = validateAiracMeta({
    ...validCurrentMeta,
    source_url: 'https://eaip.isavia.is/A_06-2026_2026_08_06/',
  })

  assert.equal(issues.some((issue) => issue.path === 'source_url'), true)
})

test('AIRAC metadata rejects malformed cycle and effective date values', () => {
  const issues = validateAiracMeta({
    ...validCurrentMeta,
    cycle: '07/2026',
    effective: '2026-06-31',
  })

  assert.equal(issues.some((issue) => issue.path === 'cycle'), true)
  assert.equal(issues.some((issue) => issue.path === 'effective'), true)
})
