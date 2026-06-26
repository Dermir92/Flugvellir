'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

export interface AltInfo {
  icao: string
  name: string
  distNm: number
}

type Cat = 'VFR' | 'MVFR' | 'IFR' | 'LIFR' | 'none'

function parseCeiling(raw: string): number | null {
  if (/CAVOK/i.test(raw) || /\bNSC\b|\bSKC\b|\bCLR\b/i.test(raw)) return null
  const layers = [...raw.matchAll(/\b(BKN|OVC)(\d{3})\b/g)]
  return layers.length ? Math.min(...layers.map(l => parseInt(l[2], 10) * 100)) : null
}

function getFlightCat(raw: string): Cat {
  if (!raw) return 'none'
  const ceiling = parseCeiling(raw)
  const visRaw = /CAVOK/i.test(raw) || /\b9999\b/.test(raw)
    ? 99999
    : parseInt(raw.match(/\b(\d{4})\b/)?.[1] ?? '99999', 10)
  const visMi = visRaw / 1609.34
  if ((ceiling !== null && ceiling < 500) || visMi < 1) return 'LIFR'
  if ((ceiling !== null && ceiling < 1000) || visMi < 3) return 'IFR'
  if ((ceiling !== null && ceiling <= 3000) || visMi <= 5) return 'MVFR'
  return 'VFR'
}

const CAT_STYLE: Record<Cat, React.CSSProperties> = {
  VFR:  { background: '#00c47a', color: '#003d22' },  /* 5.43:1 AA */
  MVFR: { background: '#b8b000', color: '#2d2d00' },  /* 6.22:1 AA */
  IFR:  { background: '#b83020', color: '#fff' },      /* 6.03:1 AA */
  LIFR: { background: '#c00030', color: '#fff' },      /* 6.39:1 AA */
  none: { background: 'rgba(100,140,180,0.25)', color: '#7099b8' },
}

export default function AlternatesCard({ alternates }: { alternates: AltInfo[] }) {
  const [cats, setCats] = useState<Record<string, Cat>>({})

  useEffect(() => {
    Promise.all(
      alternates.map(alt =>
        fetch(`/api/metar/${alt.icao}`)
          .then(r => (r.ok ? r.json() : null))
          .then(d => {
            const raw: string = d?.metar?.[0]?.rawOb ?? ''
            return [alt.icao, raw ? getFlightCat(raw) : 'none'] as [string, Cat]
          })
          .catch(() => [alt.icao, 'none'] as [string, Cat])
      )
    ).then(results => setCats(Object.fromEntries(results)))
  }, [alternates])

  return (
    <div className="ap-card">
      <div className="ap-card-title">Alternates</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {alternates.map(alt => {
          const cat: Cat = cats[alt.icao] ?? 'none'
          const loaded = alt.icao in cats
          return (
            <Link
              key={alt.icao}
              href={`/airport/${alt.icao}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '9px 4px',
                borderBottom: '1px solid rgba(126,207,245,0.08)',
                textDecoration: 'none',
                color: 'inherit',
                borderRadius: 4,
                transition: 'background 0.15s',
              }}
              className="alt-row-link"
            >
              {/* Flight category badge */}
              <div style={{
                ...CAT_STYLE[cat],
                minWidth: 44,
                textAlign: 'center',
                fontSize: 11,
                fontWeight: 800,
                letterSpacing: '0.04em',
                padding: '3px 6px',
                borderRadius: 5,
                fontFamily: 'var(--font-mono, monospace)',
                opacity: loaded ? 1 : 0.5,
              }}>
                {loaded ? (cat === 'none' ? '—' : cat) : '…'}
              </div>

              {/* Airport name */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <span style={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: '#0f2a45',
                  marginRight: 7,
                }}>
                  {alt.icao}
                </span>
                <span style={{
                  fontSize: 12,
                  color: '#4a7a9a',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}>
                  {alt.name}
                </span>
              </div>

              {/* Distance */}
              <div style={{
                fontSize: 12,
                fontWeight: 600,
                color: '#7099b8',
                whiteSpace: 'nowrap',
              }}>
                {alt.distNm} NM
              </div>

              {/* Navigation indicator */}
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true" style={{ flexShrink: 0, color: '#9ab8cc' }}>
                <path d="M3 1.5l4 3.5-4 3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          )
        })}
      </div>
      <div style={{ fontSize: 10, color: '#9ab8cc', marginTop: 8 }}>
        Live conditions · click to open
      </div>
    </div>
  )
}
