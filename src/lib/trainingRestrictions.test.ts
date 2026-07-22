import assert from 'node:assert/strict'
import test from 'node:test'
import { evaluateTrainingOperation, type TrainingRestrictionInput } from './trainingRestrictions.ts'

function check(overrides: Partial<TrainingRestrictionInput>) {
  return evaluateTrainingOperation({
    icao: 'BIKF',
    date: '2026-01-12',
    time: '12:00',
    activity: 'touch-and-go',
    bikfRunway: 'unknown',
    ...overrides,
  })
}

test('BIKF applies winter peak restrictions', () => {
  assert.equal(check({ time: '07:00' }).status, 'blocked')
  assert.equal(check({ time: '10:00' }).status, 'caution')
})

test('BIKF applies summer restriction across midnight', () => {
  assert.equal(check({ date: '2026-07-17', time: '00:00' }).status, 'blocked')
  assert.equal(check({ date: '2026-07-17', time: '22:30' }).status, 'caution')
})

test('BIKF blocks runway 10/28 during the night restriction', () => {
  assert.equal(check({ date: '2026-07-17', time: '22:30', bikfRunway: '10-28' }).status, 'blocked')
  assert.equal(check({ date: '2026-07-17', time: '22:30', bikfRunway: '01-19' }).status, 'caution')
})

test('BIRK allows a qualifying single-engine aircraft in the winter weekday window', () => {
  assert.equal(check({
    icao: 'BIRK',
    date: '2026-01-12',
    time: '12:00',
    birkAircraft: 'single-under-220',
    ceilingFtMsl: 2500,
  }).status, 'caution')
})

test('BIRK uses the later winter weekend window', () => {
  assert.equal(check({
    icao: 'BIRK',
    date: '2026-01-10',
    time: '10:30',
    birkAircraft: 'single-under-220',
  }).status, 'blocked')
  assert.equal(check({
    icao: 'BIRK',
    date: '2026-01-10',
    time: '11:30',
    birkAircraft: 'single-under-220',
  }).status, 'caution')
})

test('BIRK blocks summer weekends and ineligible aircraft', () => {
  assert.equal(check({
    icao: 'BIRK',
    date: '2026-07-18',
    time: '12:00',
    birkAircraft: 'single-under-220',
  }).status, 'blocked')
  assert.equal(check({
    icao: 'BIRK',
    date: '2026-07-17',
    time: '12:00',
    birkAircraft: 'single-220-plus',
  }).status, 'blocked')
})

test('BIRK blocks a low ceiling and special holidays', () => {
  assert.equal(check({
    icao: 'BIRK',
    date: '2026-01-12',
    time: '12:00',
    birkAircraft: 'single-under-220',
    ceilingFtMsl: 1900,
  }).status, 'blocked')
  assert.equal(check({
    icao: 'BIRK',
    date: '2026-01-12',
    time: '12:00',
    birkAircraft: 'single-under-220',
    dayKind: 'special-holiday',
  }).status, 'blocked')
})
