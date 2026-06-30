'use client'

import { useEffect, useState } from 'react'
import type { Airport } from '@/types/airport'
import { parseWindFromRaw, windDisplayStr } from '@/lib/wind'
import { getFlightCat, type FlightCat } from '@/lib/metar'

function fmtVis(raw: string): string {
  if (/CAVOK/i.test(raw)) return 'CAVOK'
  if (/\b9999\b/.test(raw)) return '>=10 km'
  const m = raw.match(/\b(\d{4})\b/)
  return m ? `${parseInt(m[1], 10)} m` : '--'
}

function fmtCloud(raw: string): string {
  if (/CAVOK/i.test(raw)) return 'CAVOK'
  if (/\bNSC\b|\bSKC\b|\bCLR\b/i.test(raw)) return 'Clear'
  const layers = [...raw.matchAll(/\b(FEW|SCT|BKN|OVC)(\d{3})\b/g)]
  if (!layers.length) return '--'
  const abbr: Record<string, string> = { FEW: 'FEW', SCT: 'SCT', BKN: 'BKN', OVC: 'OVC' }
  return layers.map(l => `${abbr[l[1]]} ${parseInt(l[2], 10) * 100} ft`).join(' | ')
}

function rwyHeadingDeg(rwyNum: string): number {
  return (parseInt(rwyNum, 10) * 10) % 360
}

interface WindRow {
  end: string
  headwind: number
  crosswind: number
  preferred: boolean
}

function computeWindRows(runways: Airport['runways'], wdir: number, wspd: number): WindRow[] {
  const ends: { end: string; hdg: number }[] = []
  for (const rwy of runways ?? []) {
    const parts = rwy.id.split('/')
    ends.push({ end: parts[0], hdg: rwyHeadingDeg(parts[0]) })
    if (parts[1]) ends.push({ end: parts[1], hdg: rwyHeadingDeg(parts[1]) })
  }
  if (!ends.length) return []

  const rows = ends.map(e => {
    const diff = ((wdir - e.hdg) * Math.PI) / 180
    const headwind  = wspd * Math.cos(diff)
    const crosswind = Math.abs(wspd * Math.sin(diff))
    return { end: e.end, headwind, crosswind, preferred: false }
  })

  const bestHw = Math.max(...rows.map(r => r.headwind))
  rows.forEach(r => { r.preferred = Math.abs(r.headwind - bestHw) < 0.01 })
  return rows
}

export default function StatusCard({ airport }: { airport: Airport }) {
  const [raw,    setRaw]    = useState('')
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    fetch(`/api/metar/${airport.icao}`)
      .then(async r => {
        if (!r.ok) throw new Error()
        const { metar: metars } = await r.json()
        const m = metars?.[0] ?? null
        if (m?.rawOb) setRaw(m.rawOb)
        setLoaded(true)
      })
      .catch(() => setLoaded(true))
  }, [airport.icao])

  const cat = loaded && raw ? getFlightCat(raw) : null

  const catLabel: Record<string, string> = { VFR: 'VFR', MVFR: 'MVFR', IFR: 'IFR', LIFR: 'LIFR' }
  const catCls:   Record<string, string> = { VFR: 'status-cat--vfr', MVFR: 'status-cat--mvfr', IFR: 'status-cat--ifr', LIFR: 'status-cat--lifr' }

  const parsedWind = loaded && raw ? parseWindFromRaw(raw) : null
  const windDisplay = windDisplayStr(parsedWind)

  let windRows: WindRow[] = []
  if (parsedWind && typeof parsedWind.dir === 'number' && parsedWind.spd > 0) {
    windRows = computeWindRows(airport.runways, parsedWind.dir, parsedWind.spd)
  }

  return (
    <div className="status-card">
      <div className="status-header">
        <span className="status-title">{airport.icao} STATUS</span>
        {!loaded && <span className="status-loading-text">Loading…</span>}
        {loaded && cat && (
          <span className={`status-cat ${catCls[cat]}`}>{catLabel[cat]}</span>
        )}
        {loaded && !raw && (
          <span className="status-no-metar">No METAR</span>
        )}
      </div>

      {loaded && raw && (
        <div className="status-met-row">
          <div className="status-met-cell">
            <span className="status-met-lbl">Wind</span>
            <span className="status-met-val">{windDisplay}</span>
          </div>
          <div className="status-met-cell">
            <span className="status-met-lbl">Visibility</span>
            <span className="status-met-val">{fmtVis(raw)}</span>
          </div>
          <div className="status-met-cell">
            <span className="status-met-lbl">Cloud</span>
            <span className="status-met-val">{fmtCloud(raw)}</span>
          </div>
        </div>
      )}

      {windRows.length > 0 && (
        <div className="status-rwy-rows">
          {windRows.map(row => (
            <div key={row.end} className={`status-rwy-row${row.preferred ? ' status-rwy-row--pref' : ''}`}>
              <span className="status-rwy-num">RWY {row.end}</span>
              <span className="status-rwy-comp">
                {row.headwind >= 0
                  ? <><strong>{Math.round(row.headwind)} kt</strong> <span className="status-comp-lbl">headwind</span></>
                  : <><strong>{Math.round(Math.abs(row.headwind))} kt</strong> <span className="status-comp-lbl status-comp-lbl--tail">tailwind</span></>
                }
              </span>
              <span className="status-rwy-xw">
                <strong>{Math.round(row.crosswind)} kt</strong> <span className="status-comp-lbl">crosswind</span>
              </span>
              {row.preferred && windRows.length > 1 && (
                <span className="status-pref-badge">PREFERRED</span>
              )}
            </div>
          ))}
        </div>
      )}

    </div>
  )
}
