'use client'

import { useEffect, useState } from 'react'

const ICONS: Record<number, string> = {
  0: '☀️', 1: '🌤️', 2: '⛅', 3: '☁️',
  45: '🌫️', 48: '🌫️',
  51: '🌦️', 53: '🌦️', 55: '🌧️',
  61: '🌧️', 63: '🌧️', 65: '🌧️',
  71: '🌨️', 73: '🌨️', 75: '❄️', 77: '❄️',
  80: '🌦️', 81: '🌦️', 82: '🌧️',
  85: '🌨️', 86: '🌨️',
  95: '⛈️',  96: '⛈️', 99: '⛈️',
}

const DESC: Record<number, string> = {
  0: 'Clear', 1: 'Mainly clear', 2: 'Partly cloudy', 3: 'Overcast',
  45: 'Fog', 48: 'Freezing fog',
  51: 'Light drizzle', 53: 'Drizzle', 55: 'Heavy drizzle',
  61: 'Light rain', 63: 'Rain', 65: 'Heavy rain',
  71: 'Light snow', 73: 'Snow', 75: 'Heavy snow', 77: 'Snow grains',
  80: 'Showers', 81: 'Showers', 82: 'Heavy showers',
  85: 'Snow showers', 86: 'Heavy snow showers',
  95: 'Thunderstorm', 96: 'Thunderstorm', 99: 'Thunderstorm',
}

const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

function compass(deg: number) {
  return ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'][Math.round(deg / 45) % 8]
}

interface DailyData {
  time: string[]
  weathercode: number[]
  temperature_2m_max: number[]
  temperature_2m_min: number[]
  windspeed_10m_max: number[]
  winddirection_10m_dominant: number[]
  precipitation_sum: number[]
  precipitation_probability_max: number[]
}

export default function WeatherCard({ lat, lng }: { lat: number; lng: number }) {
  const [html, setHtml] = useState<string | null>(null)
  const [status, setStatus] = useState<'loading' | 'done' | 'error'>('loading')

  useEffect(() => {
    const params = new URLSearchParams({
      latitude:  String(lat),
      longitude: String(lng),
      daily: 'weathercode,temperature_2m_max,temperature_2m_min,windspeed_10m_max,winddirection_10m_dominant,precipitation_sum,precipitation_probability_max',
      wind_speed_unit: 'kn',
      timezone: 'Atlantic/Reykjavik',
      forecast_days: '5',
    })

    fetch(`https://api.open-meteo.com/v1/forecast?${params}`)
      .then(r => { if (!r.ok) throw new Error(); return r.json() })
      .then((json: { daily: DailyData }) => {
        const d = json.daily
        const cards = d.time.map((t, i) => {
          const date  = new Date(t + 'T12:00:00Z')
          const label = i === 0 ? 'Today' : DAY_NAMES[date.getUTCDay()]
          const code  = d.weathercode[i]
          const icon  = ICONS[code] ?? '🌡️'
          const desc  = DESC[code] ?? ''
          const hi    = Math.round(d.temperature_2m_max[i])
          const lo    = Math.round(d.temperature_2m_min[i])
          const wind  = Math.round(d.windspeed_10m_max[i])
          const wdir  = compass(d.winddirection_10m_dominant[i])
          const mm    = (d.precipitation_sum[i] ?? 0).toFixed(1)
          const prob  = d.precipitation_probability_max[i]
          const windCls = wind >= 34 ? 'wx-wind--gale' : wind >= 17 ? 'wx-wind--fresh' : ''
          return `<div class="wx-day">
            <div class="wx-day-name">${label}</div>
            <div class="wx-day-date">${date.toLocaleDateString('en-GB', { month: 'short', day: 'numeric', timeZone: 'UTC' })}</div>
            <div class="wx-icon" title="${desc}">${icon}</div>
            <div class="wx-desc">${desc}</div>
            <div class="wx-temps"><span class="wx-hi">${hi}°</span><span class="wx-sep">/</span><span class="wx-lo">${lo}°</span></div>
            <div class="wx-wind ${windCls}">${wdir} ${wind} kt</div>
            <div class="wx-precip">${mm} mm${prob != null ? ` · ${prob}%` : ''}</div>
          </div>`
        }).join('')
        setHtml(`<div class="wx-grid">${cards}</div>
          <div class="wx-source">Veðurspá · <a href="https://vedur.is" target="_blank" rel="noopener">vedur.is</a> / Open-Meteo (ECMWF) · updated hourly</div>`)
        setStatus('done')
      })
      .catch(() => setStatus('error'))
  }, [lat, lng])

  return (
    <div className="ap-card">
      <div className="ap-card-title">Weather Forecast</div>
      {status === 'loading' && (
        <div className="wx-loading"><span className="wx-spinner" /> Loading forecast…</div>
      )}
      {status === 'error' && (
        <div className="wx-error">
          Forecast unavailable — check{' '}
          <a href="https://vedur.is" target="_blank" rel="noopener">vedur.is</a>
        </div>
      )}
      {status === 'done' && html && (
        <div dangerouslySetInnerHTML={{ __html: html }} />
      )}
    </div>
  )
}
