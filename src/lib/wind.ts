export interface ParsedWind {
  dir: number | 'VRB'
  spd: number
  gust?: number
}

/**
 * Extract wind from a raw METAR string instead of trusting the pre-decoded
 * wdir/wspd fields from aviationweather.gov, which can differ from the
 * transmitted text (e.g. 140° decoded vs 150° in rawOb).
 */
export function parseWindFromRaw(raw: string): ParsedWind | null {
  if (!raw) return null
  // 00000KT = calm
  if (/\b00000KT\b/.test(raw)) return { dir: 0, spd: 0 }
  const m = raw.match(/\b(VRB|\d{3})(\d{2,3})(?:G(\d{2,3}))?KT\b/)
  if (!m) return null
  return {
    dir: m[1] === 'VRB' ? 'VRB' : parseInt(m[1], 10),
    spd: parseInt(m[2], 10),
    gust: m[3] !== undefined ? parseInt(m[3], 10) : undefined,
  }
}

export function windDisplayStr(w: ParsedWind | null): string {
  if (!w) return '--'
  if (w.dir === 0 && w.spd === 0) return 'Calm'
  if (w.dir === 'VRB') return `VRB ${w.spd} kt${w.gust ? ` G${w.gust} kt` : ''}`
  const base = `${String(w.dir).padStart(3, '0')}° / ${w.spd} kt`
  return w.gust ? `${base} G${w.gust} kt` : base
}
