export type FlightCat = 'VFR' | 'MVFR' | 'IFR' | 'LIFR' | null

function parseCeiling(raw: string): number | null {
  if (/CAVOK/i.test(raw)) return null
  if (/\bNSC\b|\bSKC\b|\bCLR\b/i.test(raw)) return null
  const layers = [...raw.matchAll(/\b(BKN|OVC)(\d{3})\b/g)]
  if (!layers.length) return null
  return Math.min(...layers.map(l => parseInt(l[2], 10) * 100))
}

function parseVisM(raw: string): number {
  if (/CAVOK/i.test(raw)) return 99999
  if (/\b9999\b/.test(raw)) return 99999
  const m = raw.match(/\b(\d{4})\b/)
  return m ? parseInt(m[1], 10) : 99999
}

export function getFlightCat(raw: string): FlightCat {
  if (!raw) return null
  const ceiling = parseCeiling(raw)
  const visMile = parseVisM(raw) / 1609.34
  if ((ceiling !== null && ceiling < 500)  || visMile < 1) return 'LIFR'
  if ((ceiling !== null && ceiling < 1000) || visMile < 3) return 'IFR'
  if ((ceiling !== null && ceiling <= 3000) || visMile <= 5) return 'MVFR'
  return 'VFR'
}
