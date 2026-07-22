export type TrainingAirport = 'BIKF' | 'BIRK'
export type TrainingActivity = 'touch-and-go' | 'low-approach'
export type BikfRunway = 'unknown' | '01-19' | '10-28'
export type BirkAircraft = '' | 'single-under-220' | 'single-220-plus' | 'multi'
export type DayKind = 'normal' | 'public-holiday' | 'special-holiday'

export interface TrainingRestrictionInput {
  icao: TrainingAirport
  date: string
  time: string
  activity: TrainingActivity
  bikfRunway?: BikfRunway
  birkAircraft?: BirkAircraft
  dayKind?: DayKind
  ceilingFtMsl?: number | null
}

export interface TrainingRestrictionResult {
  status: 'incomplete' | 'blocked' | 'caution'
  title: string
  summary: string
  reasons: string[]
  caveats: string[]
  aipReference: string
}

interface ParsedDateTime {
  month: number
  day: number
  weekday: number
  minutes: number
}

function parseDateTime(date: string, time: string): ParsedDateTime | null {
  const dateMatch = /^(\d{4})-(\d{2})-(\d{2})$/.exec(date)
  const timeMatch = /^(\d{2}):(\d{2})$/.exec(time)
  if (!dateMatch || !timeMatch) return null

  const year = Number(dateMatch[1])
  const month = Number(dateMatch[2])
  const day = Number(dateMatch[3])
  const hour = Number(timeMatch[1])
  const minute = Number(timeMatch[2])
  if (hour > 23 || minute > 59) return null

  const parsed = new Date(Date.UTC(year, month - 1, day))
  if (
    parsed.getUTCFullYear() !== year ||
    parsed.getUTCMonth() !== month - 1 ||
    parsed.getUTCDate() !== day
  ) return null

  return {
    month,
    day,
    weekday: parsed.getUTCDay(),
    minutes: hour * 60 + minute,
  }
}

function inRange(minutes: number, start: number, end: number): boolean {
  if (start < end) return minutes >= start && minutes < end
  return minutes >= start || minutes < end
}

function isBetweenMonthDays(
  month: number,
  day: number,
  startMonth: number,
  startDay: number,
  endMonth: number,
  endDay: number,
): boolean {
  const value = month * 100 + day
  return value >= startMonth * 100 + startDay && value <= endMonth * 100 + endDay
}

function incomplete(aipReference: string, summary = 'Choose the required details to run the check.'): TrainingRestrictionResult {
  return {
    status: 'incomplete',
    title: 'More information needed',
    summary,
    reasons: [],
    caveats: [],
    aipReference,
  }
}

function evaluateBikf(input: TrainingRestrictionInput, parsed: ParsedDateTime): TrainingRestrictionResult {
  const reasons: string[] = []
  const caveats = [
    'ATC may restrict training flights without notice because of traffic.',
    'Training flights are prohibited while low-visibility procedures (LVP) are in force.',
    'Check current NOTAMs and obtain ATC clearance before the operation.',
  ]
  const isSummer = isBetweenMonthDays(parsed.month, parsed.day, 5, 16, 9, 18)
  const restrictedRanges = isSummer
    ? [[360, 660], [870, 1080], [1410, 30]] as const
    : [[360, 540], [870, 1050]] as const

  if (restrictedRanges.some(([start, end]) => inRange(parsed.minutes, start, end))) {
    reasons.push(
      isSummer
        ? 'From 16 May through 18 September, training touch-and-goes and low approaches are not permitted 06:00–11:00, 14:30–18:00 or 23:30–00:30.'
        : 'From 19 September through 15 May, training touch-and-goes and low approaches are not permitted 06:00–09:00 or 14:30–17:30.',
    )
  }

  const runwayNightRestriction = inRange(parsed.minutes, 22 * 60, 7 * 60)
  if (input.bikfRunway === '10-28' && runwayNightRestriction) {
    reasons.push('Touch-and-goes and low approaches below 250 ft MSL are not accepted on runway 10/28 between 22:00 and 07:00.')
  } else if (input.bikfRunway === 'unknown' && runwayNightRestriction) {
    caveats.unshift('Runway 10/28 cannot be used for this operation between 22:00 and 07:00; select a runway if known.')
  }

  if (reasons.length > 0) {
    return {
      status: 'blocked',
      title: 'Not permitted under the published AIP rules',
      summary: 'The planned operation conflicts with a published BIKF restriction.',
      reasons,
      caveats,
      aipReference: 'BIKF AD 2.20.8 / AD 2.21',
    }
  }

  return {
    status: 'caution',
    title: 'No published schedule conflict detected',
    summary: 'This is not an ATC clearance. Dynamic restrictions may still prevent the operation.',
    reasons: [],
    caveats,
    aipReference: 'BIKF AD 2.20.8 / AD 2.21',
  }
}

function evaluateBirk(input: TrainingRestrictionInput, parsed: ParsedDateTime): TrainingRestrictionResult {
  if (!input.birkAircraft) {
    return incomplete('BIRK AD 2.20.4', 'Choose the aircraft category to run the BIRK check.')
  }

  const reasons: string[] = []
  const caveats = [
    'Reykjavík Tower may always restrict touch-and-goes, and no more than three aircraft may conduct them at once.',
    'Flight training has priority for landing exercises.',
    'Check current NOTAMs and obtain ATC clearance before the operation.',
  ]

  if (input.birkAircraft === 'multi') {
    reasons.push('Touch-and-goes by multi-engine aircraft are prohibited at BIRK.')
  }
  if (input.birkAircraft === 'single-220-plus') {
    reasons.push('Touch-and-goes by aircraft with an engine rated at 220 hp or more are prohibited at BIRK.')
  }

  const dayKind = input.dayKind ?? 'normal'
  if (dayKind === 'special-holiday') {
    reasons.push('Touch-and-goes are not permitted on special holidays, including major holidays.')
  }

  const isSummer = isBetweenMonthDays(parsed.month, parsed.day, 4, 16, 9, 15)
  const isWeekend = parsed.weekday === 0 || parsed.weekday === 6
  const usesWeekendWindow = !isSummer && (isWeekend || dayKind === 'public-holiday')
  const isNormalWeekday = !isWeekend && dayKind === 'normal'
  let scheduleAllowed = false

  if (isSummer) {
    scheduleAllowed = isNormalWeekday && inRange(parsed.minutes, 10 * 60, 17 * 60)
    if (!scheduleAllowed) {
      reasons.push('From 16 April through 15 September, touch-and-goes are permitted only Monday–Friday, 10:00–17:00.')
    }
  } else if (usesWeekendWindow) {
    scheduleAllowed = inRange(parsed.minutes, 11 * 60, 16 * 60)
    if (!scheduleAllowed) {
      reasons.push('From 16 September through 15 April, the weekend/public-holiday window is 11:00–16:00.')
    }
  } else {
    scheduleAllowed = isNormalWeekday && inRange(parsed.minutes, 10 * 60, 17 * 60)
    if (!scheduleAllowed) {
      reasons.push('From 16 September through 15 April, the Monday–Friday window is 10:00–17:00.')
    }
  }

  if (input.ceilingFtMsl != null && input.ceilingFtMsl < 2000) {
    reasons.push('The published minimum ceiling for touch-and-goes is 2,000 ft MSL.')
  } else if (input.ceilingFtMsl == null) {
    caveats.unshift('Ceiling was not entered; BIRK requires at least 2,000 ft MSL for touch-and-goes.')
  }

  if (reasons.length > 0) {
    return {
      status: 'blocked',
      title: 'Not permitted under the published AIP rules',
      summary: 'The planned touch-and-go operation conflicts with a published BIRK restriction.',
      reasons,
      caveats,
      aipReference: 'BIRK AD 2.20.4',
    }
  }

  return {
    status: 'caution',
    title: 'No published schedule conflict detected',
    summary: 'This is not an ATC clearance. Weather, traffic or other dynamic restrictions may still prevent the operation.',
    reasons: [],
    caveats,
    aipReference: 'BIRK AD 2.20.4',
  }
}

export function evaluateTrainingOperation(input: TrainingRestrictionInput): TrainingRestrictionResult {
  const aipReference = input.icao === 'BIKF' ? 'BIKF AD 2.20.8 / AD 2.21' : 'BIRK AD 2.20.4'
  const parsed = parseDateTime(input.date, input.time)
  if (!parsed) return incomplete(aipReference)

  return input.icao === 'BIKF'
    ? evaluateBikf(input, parsed)
    : evaluateBirk(input, parsed)
}
