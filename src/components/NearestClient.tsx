'use client'

import { useState, useCallback } from 'react'
import Link from 'next/link'
import s from './NearestClient.module.css'
import { distanceNm, bearingDeg, cardinal } from '@/lib/geo'
import type { Airport } from '@/types/airport'

const FREQ_PRIORITY = ['TWR', 'AFIS', 'MF', 'APP', 'RADIO', 'CTAF']

function primaryFreq(a: Airport): string | null {
  if (!a.frequencies?.length) return null
  for (const role of FREQ_PRIORITY) {
    const f = a.frequencies.find(f => f.role.toUpperCase() === role)
    if (f) return `${f.role} ${f.freq}`
  }
  return `${a.frequencies[0].role} ${a.frequencies[0].freq}`
}

function longestRunway(a: Airport) {
  if (!a.runways.length) return null
  return a.runways.reduce((b, r) => r.length_m > b.length_m ? r : b)
}

function fuelLabel(a: Airport): string {
  if (!a.fuel) return '—'
  const types = [a.fuel.avgas && 'AVGAS', a.fuel.jet_a1 && 'JET A-1'].filter(Boolean) as string[]
  return types.length ? types.join(' · ') : 'None'
}

function typeLabel(type: Airport['type']): string {
  return type === 'international' ? 'International' : type === 'regional' ? 'Regional' : 'Airfield'
}

interface Row { airport: Airport; distNm: number; bearing: number }
interface Props { airports: Airport[] }

export default function NearestClient({ airports }: Props) {
  const [phase, setPhase] = useState<'idle' | 'locating' | 'error' | 'ready'>('idle')
  const [errMsg, setErrMsg] = useState('')
  const [rows, setRows] = useState<Row[]>([])

  const locate = useCallback(() => {
    if (!('geolocation' in navigator)) {
      setErrMsg('Geolocation is not supported in this browser.')
      setPhase('error')
      return
    }
    setPhase('locating')
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude: lat, longitude: lng } }) => {
        const sorted = airports
          .map(a => ({
            airport: a,
            distNm: distanceNm(lat, lng, a.lat, a.lng),
            bearing: bearingDeg(lat, lng, a.lat, a.lng),
          }))
          .sort((a, b) => a.distNm - b.distNm)
          .slice(0, 15)
        setRows(sorted)
        setPhase('ready')
      },
      err => { setErrMsg(err.message); setPhase('error') },
      { enableHighAccuracy: true, timeout: 12000 }
    )
  }, [airports])

  return (
    <div className="airport-page">

      <header className="ap-page-header">
        <Link href="/" className="ap-back-link">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Map
        </Link>
        <span className="ap-header-sep">/</span>
        <span className="ap-hdr-icao">NEAREST</span>
        <span className="ap-hdr-name">Nearest Airports</span>
      </header>

      <div className={s.page}>

        {(phase === 'idle' || phase === 'error') && (
          <div className={s.locate}>
            <div className={s.locateIcon}>{phase === 'error' ? '⚠' : '◎'}</div>
            <p className={s.locateTitle}>
              {phase === 'error' ? 'Location unavailable' : 'Find nearest airports'}
            </p>
            <p className={s.locateSub}>
              {phase === 'error'
                ? (errMsg || 'Could not get your position. Check location permissions and try again.')
                : 'Sorted by distance from your current position, with runway, fuel, and frequency.'}
            </p>
            <button className={s.locateBtn} onClick={locate}>
              {phase === 'error' ? 'Try again' : 'Use my location'}
            </button>
          </div>
        )}

        {phase === 'locating' && (
          <div className={s.locate}>
            <div className={`${s.locateIcon} ${s.locateIconPulse}`}>◎</div>
            <p className={s.locateTitle}>Locating…</p>
            <p className={s.locateSub}>Waiting for GPS fix.</p>
          </div>
        )}

        {phase === 'ready' && (
          <div>
            <div className={s.resultsHdr}>
              <span>15 nearest airports</span>
              <button className={s.relocate} onClick={locate}>Re-locate</button>
            </div>
            <div className={s.list} role="list">
              {rows.map(({ airport: a, distNm, bearing }, i) => {
                const rwy = longestRunway(a)
                const freq = primaryFreq(a)
                const bear = Math.round(bearing)
                return (
                  <Link key={a.icao} href={`/airport/${a.icao}`} className={s.row} role="listitem">
                    <div className={s.rank} aria-hidden="true">{i + 1}</div>
                    <div className={s.dist}>
                      <span className={s.distVal}>{distNm.toFixed(1)}</span>
                      <span className={s.distUnit}>NM</span>
                    </div>
                    <div className={s.bearing}>
                      <span className={s.bearVal}>{String(bear).padStart(3, '0')}°</span>
                      <span className={s.bearCard}>{cardinal(bearing)}</span>
                    </div>
                    <div className={s.main}>
                      <div className={s.identity}>
                        <span className={s.icao}>{a.icao}</span>
                        <span className={s.name}>{a.name}</span>
                        <span className={`ap-hdr-badge ap-hdr-badge--${a.type}`}>{typeLabel(a.type)}</span>
                        {a.highland && <span className="ap-hdr-badge ap-hdr-badge--highland">Highland</span>}
                      </div>
                      <div className={s.details}>
                        {rwy && <span className={s.detail}>{rwy.length_m} m · {rwy.surface}</span>}
                        <span className={s.detail}>{fuelLabel(a)}</span>
                        {freq && <span className={`${s.detail} ${s.detailFreq}`}>{freq} MHz</span>}
                      </div>
                    </div>
                    <div className={s.arrow} aria-hidden="true">›</div>
                  </Link>
                )
              })}
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
