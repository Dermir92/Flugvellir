'use client'

import { useEffect, useState } from 'react'
import type { Runway } from '@/types/airport'
import { parseWindFromRaw } from '@/lib/wind'

interface Props {
  icao: string
  runways: Runway[]
}

type Source = 'loading' | 'live' | 'manual' | 'vrb' | 'unavailable'

interface Wind {
  dir: number
  speed: number
  gust?: number
  source: Source
}

function parseEndId(s: string): number {
  const n = parseInt(s, 10)
  return n === 36 ? 360 : n * 10
}

function xwCalc(windDir: number, windSpd: number, rwHeading: number) {
  const rad = ((windDir - rwHeading) * Math.PI) / 180
  return {
    headwind: Math.round(windSpd * Math.cos(rad)),
    crosswind: Math.round(Math.abs(windSpd * Math.sin(rad))),
  }
}

function xwColor(xw: number, limit: number): string {
  if (xw > limit)        return 'xw-limit'
  if (xw > limit * 0.75) return 'xw-caution'
  if (xw > limit * 0.5)  return 'xw-warn'
  return 'xw-ok'
}

const XW_LIMITS = [10, 12, 15, 20, 25]

export default function CrosswindCard({ icao, runways }: Props) {
  const [liveWind, setLiveWind] = useState<Wind>({ dir: 0, speed: 0, source: 'loading' })
  const [manual, setManual]     = useState(false)
  const [manDir, setManDir]     = useState('270')
  const [manSpd, setManSpd]     = useState('15')
  const [limit, setLimit]       = useState(15)

  useEffect(() => {
    fetch(`/api/metar/${icao}`)
      .then(r => r.json())
      .then(({ metar }) => {
        const raw = metar?.[0]?.rawOb ?? ''
        const w = parseWindFromRaw(raw)
        if (!w) { setLiveWind(wv => ({ ...wv, source: 'unavailable' })); return }
        if (w.dir === 'VRB') { setLiveWind({ dir: 0, speed: w.spd, gust: w.gust, source: 'vrb' }); return }
        if (w.spd === 0)     { setLiveWind(wv => ({ ...wv, source: 'unavailable' })); return }
        setLiveWind({ dir: w.dir as number, speed: w.spd, gust: w.gust, source: 'live' })
      })
      .catch(() => setLiveWind(wv => ({ ...wv, source: 'unavailable' })))
  }, [icao])

  const active: Wind | null = (() => {
    if (manual) {
      const d = parseInt(manDir, 10)
      const s = parseInt(manSpd, 10)
      if (!isNaN(d) && !isNaN(s) && d >= 0 && d <= 360 && s >= 0)
        return { dir: d % 360 || 360, speed: s, source: 'manual' }
      return null
    }
    return liveWind.source === 'live' ? liveWind : null
  })()

  // Collect all runway ends and compute components
  interface EndResult {
    label: string
    heading: number
    headwind: number
    crosswind: number
    runwayKey: string
    gust?: number
  }

  const ends: EndResult[] = runways.flatMap(rwy => {
    const parts = rwy.id.split('/')
    return parts.map(p => {
      const heading = parseEndId(p)
      if (!active) return { label: p, heading, headwind: 0, crosswind: 0, runwayKey: rwy.id }
      const { headwind, crosswind } = xwCalc(active.dir, active.speed, heading)
      return { label: p, heading, headwind, crosswind, runwayKey: rwy.id, gust: active.gust }
    })
  })

  // Best end per runway = most headwind (least tailwind)
  const bestPerRwy = new Map<string, string>()
  runways.forEach(rwy => {
    const parts = rwy.id.split('/')
    if (parts.length < 2) { bestPerRwy.set(rwy.id, parts[0]); return }
    if (!active) return
    const [a, b] = parts
    const ha = xwCalc(active.dir, active.speed, parseEndId(a)).headwind
    const hb = xwCalc(active.dir, active.speed, parseEndId(b)).headwind
    bestPerRwy.set(rwy.id, ha >= hb ? a : b)
  })

  return (
    <div className="ap-card">
      <div className="ap-card-title">
        Crosswind Calculator
        {liveWind.source === 'loading' && (
          <span className="notam-spinner" style={{ marginLeft: 2 }} />
        )}
        {liveWind.source === 'live' && !manual && (
          <span className="xw-live-badge">
            <span className="xw-live-dot" />
            Live · {String(liveWind.dir).padStart(3, '0')}°/{liveWind.speed} kt
            {liveWind.gust ? ` G${liveWind.gust}` : ''}
          </span>
        )}
        {liveWind.source === 'vrb' && !manual && (
          <span className="xw-live-badge xw-live-badge--vrb">VRB {liveWind.speed} kt</span>
        )}
        {manual && (
          <span className="xw-live-badge xw-live-badge--manual">Manual</span>
        )}
        <label className="xw-limit-label" aria-label="Crosswind limit">
          Limit
          <select
            className="xw-limit-select"
            value={limit}
            onChange={e => setLimit(Number(e.target.value))}
          >
            {XW_LIMITS.map(l => (
              <option key={l} value={l}>{l} kt</option>
            ))}
          </select>
        </label>
        <button
          className="xw-toggle-btn"
          onClick={() => setManual(m => !m)}
          aria-pressed={manual}
        >
          {manual ? 'Use live' : 'Manual'}
        </button>
      </div>

      {manual && (
        <div className="xw-manual-row">
          <label className="xw-input-group">
            <span className="xw-input-lbl">Wind direction</span>
            <div className="xw-input-wrap">
              <input
                className="xw-input"
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={3}
                value={manDir}
                onChange={e => setManDir(e.target.value.replace(/\D/g, ''))}
                aria-label="Wind direction in degrees"
              />
              <span className="xw-input-unit">°</span>
            </div>
          </label>
          <label className="xw-input-group">
            <span className="xw-input-lbl">Speed</span>
            <div className="xw-input-wrap">
              <input
                className="xw-input"
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={2}
                value={manSpd}
                onChange={e => setManSpd(e.target.value.replace(/\D/g, ''))}
                aria-label="Wind speed in knots"
              />
              <span className="xw-input-unit">kt</span>
            </div>
          </label>
        </div>
      )}

      {liveWind.source === 'vrb' && !manual && (
        <div className="xw-vrb-note">
          Wind is variable — crosswind calculation not available. Use manual override for planning.
        </div>
      )}

      {liveWind.source === 'unavailable' && !manual && (
        <div className="xw-vrb-note">
          No live wind data. Use manual override for planning.
        </div>
      )}

      {active && (
        <div className="xw-table">
          <div className="xw-hdr-row">
            <div className="xw-col-rwy">Runway</div>
            <div className="xw-col-hdg">Hdg</div>
            <div className="xw-col-hw">Headwind</div>
            <div className="xw-col-xw">Crosswind</div>
          </div>
          {ends.map(e => {
            const isBest = bestPerRwy.get(e.runwayKey) === e.label
            const tailwind = e.headwind < 0
            const hwAbs = Math.abs(e.headwind)
            // Scale bars to 1.5× the limit so the limit line sits at 67% of the track
            const barMax = Math.max(limit * 1.5, 20)
            const hwPct  = Math.min(hwAbs / barMax, 1) * 100
            const xwPct  = Math.min(e.crosswind / barMax, 1) * 100
            const limitPct = Math.min(limit / barMax, 1) * 100

            // gust crosswind
            const gustXw = e.gust ? Math.round(Math.abs(e.gust * Math.sin(((active.dir - e.heading) * Math.PI) / 180))) : undefined

            return (
              <div key={`${e.runwayKey}-${e.label}`} className={`xw-row${isBest ? ' xw-row--best' : ''}`}>
                <div className="xw-col-rwy">
                  <span className="xw-rwy-label">RWY {e.label}</span>
                  {isBest && active.speed > 0 && <span className="xw-best-star" title="Preferred end">★</span>}
                </div>
                <div className="xw-col-hdg xw-hdg-val">{e.heading}°</div>
                <div className="xw-col-hw">
                  <div className="xw-bar-row">
                    <span className={`xw-hw-val${tailwind ? ' xw-hw-val--tail' : ''}`}>
                      {tailwind ? `↓ ${hwAbs} TW` : hwAbs === 0 ? '—' : `↑ ${hwAbs} HW`}
                    </span>
                    <div className="xw-bar-track">
                      <div
                        className={`xw-bar-fill${tailwind ? ' xw-bar-fill--tail' : ' xw-bar-fill--head'}`}
                        style={{ width: `${hwPct}%` }}
                      />
                    </div>
                  </div>
                </div>
                <div className="xw-col-xw">
                  <div className="xw-bar-row">
                    <span className={`xw-xw-val xw-xw-val--${xwColor(e.crosswind, limit)}`}>
                      {e.crosswind} kt
                      {gustXw != null && gustXw !== e.crosswind && (
                        <span className="xw-gust-xw"> G{gustXw}</span>
                      )}
                    </span>
                    <div className="xw-bar-track">
                      <div
                        className={`xw-bar-fill xw-bar-fill--xw xw-bar-fill--${xwColor(e.crosswind, limit)}`}
                        style={{ width: `${xwPct}%` }}
                      />
                      <div className="xw-bar-limit" style={{ left: `${limitPct}%` }} />
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
