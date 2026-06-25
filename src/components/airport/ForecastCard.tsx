'use client'

import { useEffect, useState } from 'react'

interface Props {
  icao: string
  lat: number
  lng: number
}

interface DayForecast {
  date: string       // e.g. "Mon 23"
  hi: number
  lo: number
  wind: number       // kt
  windDir: string    // e.g. "SW"
  precip: number     // mm
  desc: string
}

function wmoDesc(code: number): string {
  if (code === 0)            return 'Clear'
  if (code <= 2)             return 'Partly cloudy'
  if (code === 3)            return 'Overcast'
  if (code <= 49)            return 'Fog'
  if (code <= 57)            return 'Drizzle'
  if (code <= 67)            return 'Rain'
  if (code <= 77)            return 'Snow'
  if (code <= 82)            return 'Showers'
  if (code <= 86)            return 'Snow showers'
  return 'Thunderstorm'
}

function degToCompass(deg: number): string {
  const dirs = ['N','NE','E','SE','S','SW','W','NW']
  return dirs[Math.round(deg / 45) % 8]
}

function msToKt(ms: number): number {
  return Math.round(ms * 1.94384)
}

function formatDate(iso: string): string {
  const d = new Date(iso + 'T12:00:00Z')
  return d.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short', timeZone: 'UTC' })
}

export default function ForecastCard({ icao, lat, lng }: Props) {
  const [days, setDays]       = useState<DayForecast[] | null>(null)
  const [status, setStatus]   = useState<'idle' | 'loading' | 'shown' | 'hidden'>('idle')

  useEffect(() => {
    setStatus('loading')

    // Check METAR first — if station data exists, stay hidden
    fetch(`/api/metar/${icao}`)
      .then(r => r.json())
      .then(async ({ metar }) => {
        if (metar?.[0]) { setStatus('hidden'); return }

        // No METAR — fetch Open-Meteo forecast
        const url = new URL('https://api.open-meteo.com/v1/forecast')
        url.searchParams.set('latitude',  String(lat))
        url.searchParams.set('longitude', String(lng))
        url.searchParams.set('daily',     [
          'temperature_2m_max',
          'temperature_2m_min',
          'precipitation_sum',
          'windspeed_10m_max',
          'winddirection_10m_dominant',
          'weathercode',
        ].join(','))
        url.searchParams.set('forecast_days', '3')
        url.searchParams.set('timezone',      'UTC')
        url.searchParams.set('wind_speed_unit', 'ms')

        const res  = await fetch(url.toString())
        const data = await res.json()
        const d    = data.daily

        const result: DayForecast[] = d.time.slice(0, 3).map((iso: string, i: number) => ({
          date:    formatDate(iso),
          hi:      Math.round(d.temperature_2m_max[i]),
          lo:      Math.round(d.temperature_2m_min[i]),
          wind:    msToKt(d.windspeed_10m_max[i]),
          windDir: degToCompass(d.winddirection_10m_dominant[i]),
          precip:  Math.round(d.precipitation_sum[i] * 10) / 10,
          desc:    wmoDesc(d.weathercode[i]),
        }))

        setDays(result)
        setStatus('shown')
      })
      .catch(() => setStatus('hidden'))
  }, [icao, lat, lng])

  if (status === 'hidden' || status === 'idle') return null

  return (
    <div className="ap-card">
      <div className="ap-card-title">
        3-Day Forecast
        <span className="fc-no-station">Forecast only — no METAR station</span>
        {status === 'loading' && <span className="notam-spinner" style={{ marginLeft: 4 }} />}
      </div>

      {status === 'shown' && days && (
        <div className="fc-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
          {days.map((d, i) => (
            <div key={d.date} className={`fc-day${i === 0 ? ' fc-day--today' : ''}`} style={{ display: 'flex', flexDirection: 'column', gap: 4, padding: '16px 14px 14px', borderRight: i < 2 ? '1px solid var(--card-border)' : 'none' }}>
              <div className="fc-date">{d.date}</div>
              <div className="fc-desc">{d.desc}</div>
              <div className="fc-temps">
                <span className="fc-hi">{d.hi}°</span>
                <span className="fc-sep">/</span>
                <span className="fc-lo">{d.lo}°</span>
              </div>
              <div className="fc-wind">{d.windDir} {d.wind} kt</div>
              {d.precip > 0 && (
                <div className="fc-precip">{d.precip} mm</div>
              )}
            </div>
          ))}
        </div>
      )}

      <div className="fc-source">
        Source: <a href="https://open-meteo.com" target="_blank" rel="noopener noreferrer">Open-Meteo</a>
        {' · '}Not aviation-grade — verify with official MET before flight
      </div>
    </div>
  )
}
