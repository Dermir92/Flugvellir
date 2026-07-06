'use client'

import { useEffect, useState } from 'react'
import { parseWindFromRaw, windDisplayStr } from '@/lib/wind'

interface MetarData {
  rawOb?: string
  obsTime?: number | string
  temp?: number
  dewp?: number
  altim?: number
}

interface TafData {
  rawTAF?: string
}

function fmtTime(iso: number | string | undefined) {
  if (!iso) return '—'
  const d = new Date(typeof iso === 'number' ? iso * 1000 : iso)
  return d.toUTCString().replace(/.*?,\s*/, '').replace(/:\d\d\s*GMT/, 'Z')
}

function windStr(m: MetarData) {
  return windDisplayStr(parseWindFromRaw(m.rawOb ?? ''))
}

function parseClouds(raw: string) {
  if (/CAVOK/i.test(raw)) return 'CAVOK'
  if (/\bNSC\b|\bSKC\b|\bCLR\b/i.test(raw)) return 'Clear'
  const layers = [...raw.matchAll(/\b(FEW|SCT|BKN|OVC)(\d{3})\b/g)]
  if (!layers.length) return ''
  return layers.map(l => {
    const label: Record<string, string> = { FEW: 'Few', SCT: 'Scattered', BKN: 'Broken', OVC: 'Overcast' }
    return `${label[l[1]] ?? l[1]} ${parseInt(l[2], 10) * 100} ft`
  }).join(' · ')
}

function parseVis(raw: string) {
  if (/CAVOK/i.test(raw)) return 'CAVOK'
  if (/\b9999\b/.test(raw)) return '≥10 km'
  const m = raw.match(/\b(\d{4})\b/)
  return m ? `${parseInt(m[1], 10)} m` : ''
}

function parseWx(raw: string) {
  const WX: Record<string, string> = {
    'CAVOK': 'CAVOK', '-DZ': 'Light drizzle', 'DZ': 'Drizzle', '+DZ': 'Heavy drizzle',
    '-RA': 'Light rain', 'RA': 'Rain', '+RA': 'Heavy rain',
    '-SN': 'Light snow', 'SN': 'Snow', '+SN': 'Heavy snow',
    'TS': 'Thunderstorm', 'TSRA': 'Thunderstorm rain',
    'FG': 'Fog', 'BR': 'Mist', 'HZ': 'Haze',
    'SH': 'Showers', '-SHRA': 'Light showers', 'SHRA': 'Showers',
    '-SHSN': 'Light snow showers', 'SHSN': 'Snow showers',
  }
  for (const p of raw.split(' ')) if (WX[p]) return WX[p]
  return ''
}

export default function MetarCard({ icao }: { icao: string }) {
  const [html, setHtml] = useState<string | null>(null)
  const [status, setStatus] = useState<'loading' | 'done' | 'none' | 'error'>('loading')
  const [cachedAt, setCachedAt] = useState<number | null>(null)

  useEffect(() => {
    fetch(`/api/metar/${icao}`)
      .then(async r => {
        const ts = r.headers.get('X-SW-Cached-At')
        if (ts) setCachedAt(Number(ts))
        if (!r.ok) throw new Error('HTTP ' + r.status)
        const { metar: metars, taf: tafs }: { metar: MetarData[], taf: TafData[] } = await r.json()
        const metar = metars[0] ?? null
        const taf   = tafs[0]   ?? null

        if (!metar && !taf) { setStatus('none'); return }

        let out = ''

        if (metar) {
          const raw    = metar.rawOb ?? ''
          const clouds = parseClouds(raw)
          const vis    = parseVis(raw)
          const wx     = parseWx(raw)
          const temp   = metar.temp != null ? `${metar.temp}°C` : '—'
          const dew    = metar.dewp != null ? `${metar.dewp}°C` : '—'
          const qnh    = metar.altim ? `${Math.round(metar.altim)} hPa` : '—'

          out += `<div class="metar-section">
            <div class="metar-raw"><span class="metar-type-tag">METAR</span>${raw}</div>
            <div class="metar-decoded">
              <div class="metar-item"><span class="metar-lbl">Time</span>${fmtTime(metar.obsTime)}</div>
              <div class="metar-item"><span class="metar-lbl">Wind</span>${windStr(metar)}</div>
              ${vis    ? `<div class="metar-item"><span class="metar-lbl">Visibility</span>${vis}</div>` : ''}
              ${wx     ? `<div class="metar-item"><span class="metar-lbl">Weather</span>${wx}</div>` : ''}
              ${clouds ? `<div class="metar-item"><span class="metar-lbl">Cloud</span>${clouds}</div>` : ''}
              <div class="metar-item"><span class="metar-lbl">Temp / Dew</span>${temp} / ${dew}</div>
              <div class="metar-item"><span class="metar-lbl">QNH</span>${qnh}</div>
            </div>
          </div>`
        }

        if (taf) {
          const raw = (taf.rawTAF ?? '').replace(/\s{2,}/g, ' ').trim()
          out += `<div class="metar-section metar-section--taf">
            <div class="metar-raw"><span class="metar-type-tag metar-type-tag--taf">TAF</span>${raw}</div>
          </div>`
        }

        setHtml(out)
        setStatus('done')
      })
      .catch(() => setStatus('error'))
  }, [icao])

  return (
    <div className="ap-card">
      <div className="ap-card-title">
        METAR / TAF
        {cachedAt ? (
          <span className="metar-offline-badge">
            ⚠ Offline · cached {Math.round((Date.now() - cachedAt) / 60000)} min ago
          </span>
        ) : (
          <span className="notam-src">aviationweather.gov</span>
        )}
      </div>
      {status === 'loading' && (
        <div className="metar-loading"><span className="notam-spinner" /> Loading METAR…</div>
      )}
      {status === 'none' && (
        <div className="metar-none">No METAR/TAF published for this station.</div>
      )}
      {status === 'error' && (
        <div className="metar-none">METAR/TAF unavailable.</div>
      )}
      {status === 'done' && html && (
        <div dangerouslySetInnerHTML={{ __html: html }} />
      )}
    </div>
  )
}
