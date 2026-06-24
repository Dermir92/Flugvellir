'use client'

import { useEffect, useRef, useState } from 'react'
import 'leaflet/dist/leaflet.css'
import { AIRPORTS } from '@/data/airports'

const MAP_CENTER: [number, number] = [64.9, -18.5]
const MAP_ZOOM = 6

const MARKER_CONFIGS = {
  international: { size: 30, color: '#bf3c2a' },
  regional:      { size: 22, color: '#c8923a' },
  small:         { size: 14, color: '#4a7a5a' },
} as const

// Approximate bounds for the Vedur.is Iceland radar composite image.
// The image uses stereographic projection so this is a Mercator approximation —
// accurate enough for a weather overlay at this scale.
const RADAR_BOUNDS: [[number, number], [number, number]] = [[61.0, -29.0], [67.8, -11.0]]

function radarUrl() {
  return `https://brunnur.vedur.is/myndir/listi/radar_COMP_iceland-comp-cappi_dBZ.png?t=${Date.now()}`
}

function makeMarkerSvg(type: keyof typeof MARKER_CONFIGS, icao: string) {
  const cfg = MARKER_CONFIGS[type] || MARKER_CONFIGS.small
  const { size, color } = cfg
  const r = size / 2
  const svg = `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
    <circle cx="${r}" cy="${r}" r="${r - 1.5}" fill="${color}" stroke="rgba(255,255,255,0.5)" stroke-width="1.5"/>
  </svg>`
  return { svg, size, r }
}

interface Props {
  onAirportClick: (icao: string) => void
}

export default function LeafletMap({ onAirportClick }: Props) {
  const containerRef   = useRef<HTMLDivElement>(null)
  const mapRef         = useRef<import('leaflet').Map | null>(null)
  const radarLayerRef  = useRef<import('leaflet').ImageOverlay | null>(null)
  const radarTimerRef  = useRef<ReturnType<typeof setInterval> | null>(null)
  const [radarOn, setRadarOn] = useState(false)

  // Toggle radar overlay on/off
  useEffect(() => {
    if (!mapRef.current) return
    import('leaflet').then(({ default: L }) => {
      if (!mapRef.current) return
      if (radarOn) {
        const layer = L.imageOverlay(radarUrl(), RADAR_BOUNDS, { opacity: 0.75, zIndex: 200 })
        layer.addTo(mapRef.current)
        // Clip the legend panel on the right side of the Vedur.is composite image
        const applyClip = () => {
          const el = layer.getElement()
          if (el) el.style.clipPath = 'inset(0 30% 0 0)'
        }
        layer.on('load', applyClip)
        applyClip()
        radarLayerRef.current = layer
        // Refresh every 5 minutes to match Vedur.is update cycle
        radarTimerRef.current = setInterval(() => {
          radarLayerRef.current?.setUrl(radarUrl())
        }, 5 * 60 * 1000)
      } else {
        radarLayerRef.current?.remove()
        radarLayerRef.current = null
        if (radarTimerRef.current) { clearInterval(radarTimerRef.current); radarTimerRef.current = null }
      }
    })
  }, [radarOn])

  // Build Leaflet map
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return

    import('leaflet').then(({ default: L }) => {
      if (!containerRef.current || mapRef.current) return

      const map = L.map(containerRef.current, {
        center: MAP_CENTER,
        zoom: MAP_ZOOM,
        minZoom: 5,
        maxZoom: 13,
        zoomControl: false,
        attributionControl: true,
      })

      mapRef.current = map

      L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data: © <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, SRTM | Style: © <a href="https://opentopomap.org">OpenTopoMap</a> (CC-BY-SA)',
        subdomains: 'abc',
        maxZoom: 13,
      }).addTo(map)

      L.control.zoom({ position: 'bottomleft' }).addTo(map)

      AIRPORTS.forEach(ap => {
        const type = ap.type as keyof typeof MARKER_CONFIGS
        const { svg, size, r } = makeMarkerSvg(type, ap.icao)

        const icon = L.divIcon({
          html: `<div class="airport-marker airport-marker--${ap.type}" data-icao="${ap.icao}">${svg}</div>`,
          iconSize:   [size, size],
          iconAnchor: [r, r],
          className:  '',
        })

        const marker = L.marker([ap.lat, ap.lng], { icon })

        const tooltipHtml = `<span class="tooltip-icao">${ap.icao}</span>${ap.name}`
        marker.bindTooltip(tooltipHtml, {
          direction: 'top',
          offset: [0, -(ap.type === 'international' ? 16 : ap.type === 'regional' ? 12 : 9)],
          className: 'ap-tooltip',
          permanent: false,
        })

        marker.on('click', () => onAirportClick(ap.icao))
        marker.addTo(map)
      })
    })

    return () => {
      if (radarTimerRef.current) { clearInterval(radarTimerRef.current); radarTimerRef.current = null }
      mapRef.current?.remove()
      mapRef.current = null
    }
  }, [onAirportClick])

  return (
    <>
      <div ref={containerRef} className="map-container" />
      <button
        className={`radar-toggle${radarOn ? ' is-active' : ''}`}
        onClick={() => setRadarOn(v => !v)}
        aria-pressed={radarOn}
        title={radarOn ? 'Hide radar' : 'Show precipitation radar (Veðurstofa Íslands)'}
      >
        <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
          <circle cx="6.5" cy="6.5" r="2" stroke="currentColor" strokeWidth="1.3"/>
          <path d="M6.5 1v1.5M6.5 10.5V12M1 6.5h1.5M10.5 6.5H12" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
          <path d="M3 3l1.1 1.1M8.9 8.9L10 10M10 3 8.9 4.1M4.1 8.9 3 10" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/>
        </svg>
        Radar
      </button>
    </>
  )
}
