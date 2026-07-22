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

export function formatAiracEffectiveDateIs(effectiveIso: string): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(effectiveIso)
  if (!match) throw new Error(`Invalid AIRAC effective date: ${effectiveIso}`)

  const [, year, month, day] = match
  const date = new Date(Date.UTC(Number(year), Number(month) - 1, Number(day)))
  if (Number.isNaN(date.getTime()) || date.toISOString().slice(0, 10) !== effectiveIso) {
    throw new Error(`Invalid AIRAC effective date: ${effectiveIso}`)
  }

  return `${Number(day)}. ${ICELANDIC_MONTHS[Number(month) - 1]} ${year}`
}

export function airacStatusLabelsIs(meta: AiracMeta) {
  return {
    cycle: `AIRAC ${meta.cycle}`,
    effective: `Gildir frá ${formatAiracEffectiveDateIs(meta.effective)}`,
  }
}
