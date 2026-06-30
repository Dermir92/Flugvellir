'use client'

import { useState, useMemo } from 'react'
import * as SunCalc from 'suncalc'

interface Props {
  lat: number
  lng: number
}

// suncalc types say Date but returns null at extreme latitudes — cast accordingly
type MaybeDate = Date | null

function isValid(d: MaybeDate): d is Date {
  return d !== null && !isNaN(d.getTime())
}

function fmtUtc(d: MaybeDate): string {
  if (!isValid(d)) return '--:--'
  return `${String(d.getUTCHours()).padStart(2, '0')}:${String(d.getUTCMinutes()).padStart(2, '0')}`
}

function dayLengthStr(rise: MaybeDate, set: MaybeDate): string {
  if (!isValid(rise) || !isValid(set)) return ''
  const mins = Math.round((set.getTime() - rise.getTime()) / 60000)
  const h = Math.floor(mins / 60)
  const m = mins % 60
  return h > 0 ? `${h}h ${m}min` : `${m}min`
}

export default function SunCard({ lat, lng }: Props) {
  const [dateStr, setDateStr] = useState(() => {
    const now = new Date()
    const y = now.getUTCFullYear()
    const mo = String(now.getUTCMonth() + 1).padStart(2, '0')
    const d = String(now.getUTCDate()).padStart(2, '0')
    return `${y}-${mo}-${d}`
  })

  const { times, special, length } = useMemo(() => {
    const [y, mo, d] = dateStr.split('-').map(Number)
    const date = new Date(Date.UTC(y, mo - 1, d, 12, 0, 0))
    const t = SunCalc.getTimes(date, lat, lng) as Record<string, MaybeDate>

    const sunRiseOk = isValid(t.sunrise)
    const sunSetOk  = isValid(t.sunset)

    let special: 'midnight-sun' | 'polar-night' | null = null
    if (!sunRiseOk || !sunSetOk) {
      const noonPos = SunCalc.getPosition(isValid(t.solarNoon) ? t.solarNoon : date, lat, lng)
      special = noonPos.altitude > 0 ? 'midnight-sun' : 'polar-night'
    }

    const length = special ? '' : dayLengthStr(t.sunrise, t.sunset)
    return { times: t, special, length }
  }, [dateStr, lat, lng])

  const showDawn = isValid(times.dawn)
  const showDusk = isValid(times.dusk)

  return (
    <div className="ap-card sun-card">
      <div className="ap-card-title">
        Daylight
        <span className="sun-utc-note">UTC = local in Iceland</span>
        <input
          type="date"
          className="sun-date-input"
          value={dateStr}
          onChange={e => { if (e.target.value) setDateStr(e.target.value) }}
          aria-label="Date"
        />
      </div>

      <div className="sun-body">
        {special && (
          <div className={`sun-special sun-special--${special}`}>
            {special === 'midnight-sun'
              ? 'Midnight sun — the sun does not set on this date'
              : 'Polar night — the sun does not rise on this date'}
          </div>
        )}

        <div className="sun-times">
          {showDawn && (
            <div className="sun-col sun-col--twilight">
              <span className="sun-col-lbl">Civil dawn</span>
              <span className="sun-col-val">{fmtUtc(times.dawn)}</span>
              <span className="sun-col-sub">UTC</span>
            </div>
          )}
          <div className="sun-col sun-col--rise">
            <span className="sun-col-lbl">Sunrise</span>
            <span className="sun-col-val">{special ? '—' : fmtUtc(times.sunrise)}</span>
            {!special && <span className="sun-col-sub">UTC</span>}
          </div>
          <div className="sun-col sun-col--set">
            <span className="sun-col-lbl">Sunset</span>
            <span className="sun-col-val">{special ? '—' : fmtUtc(times.sunset)}</span>
            {!special && <span className="sun-col-sub">UTC</span>}
          </div>
          {showDusk && (
            <div className="sun-col sun-col--twilight">
              <span className="sun-col-lbl">Civil dusk</span>
              <span className="sun-col-val">{fmtUtc(times.dusk)}</span>
              <span className="sun-col-sub">UTC</span>
            </div>
          )}
        </div>

        {length && (
          <div className="sun-daylength">
            <span className="sun-daylength-lbl">Day length</span>
            <span className="sun-daylength-val">{length}</span>
          </div>
        )}
      </div>
    </div>
  )
}
