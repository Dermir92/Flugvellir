import type { AiracMeta } from '@/types/airport'

const ICELANDIC_MONTHS = [
  'janúar',
  'febrúar',
  'mars',
  'apríl',
  'maí',
  'júní',
  'júlí',
  'ágúst',
  'september',
  'október',
  'nóvember',
  'desember',
]

const ENGLISH_MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

type AiracDisplayLanguage = 'en' | 'is'

export function parseAiracEffectiveDate(effectiveIso: string) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(effectiveIso)
  if (!match) throw new Error(`Invalid AIRAC effective date: ${effectiveIso}`)

  const [, year, month, day] = match
  const date = new Date(Date.UTC(Number(year), Number(month) - 1, Number(day)))
  if (Number.isNaN(date.getTime()) || date.toISOString().slice(0, 10) !== effectiveIso) {
    throw new Error(`Invalid AIRAC effective date: ${effectiveIso}`)
  }

  return {
    year,
    monthIndex: Number(month) - 1,
    day: Number(day),
  }
}

export function formatAiracEffectiveDate(effectiveIso: string, lang: AiracDisplayLanguage): string {
  const { year, monthIndex, day } = parseAiracEffectiveDate(effectiveIso)
  if (lang === 'is') return `${day}. ${ICELANDIC_MONTHS[monthIndex]} ${year}`
  return `${day} ${ENGLISH_MONTHS[monthIndex]} ${year}`
}

export function formatAiracEffectiveDateIs(effectiveIso: string): string {
  const { year, monthIndex, day } = parseAiracEffectiveDate(effectiveIso)
  return `${day}. ${ICELANDIC_MONTHS[monthIndex]} ${year}`
}

export function formatAiracEffectiveDateEn(effectiveIso: string): string {
  const { year, monthIndex, day } = parseAiracEffectiveDate(effectiveIso)
  return `${day} ${ENGLISH_MONTHS[monthIndex]} ${year}`
}

export function airacStatusLabels(meta: AiracMeta, lang: AiracDisplayLanguage) {
  return {
    cycle: `AIRAC ${meta.cycle}`,
    effective: lang === 'is'
      ? `Gildir frá ${formatAiracEffectiveDate(meta.effective, 'is')}`
      : `Effective ${formatAiracEffectiveDate(meta.effective, 'en')}`,
  }
}

export function airacStatusLabelsIs(meta: AiracMeta) {
  return airacStatusLabels(meta, 'is')
}
