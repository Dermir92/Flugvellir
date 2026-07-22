'use client'

import { useEffect, useRef } from 'react'
import 'leaflet/dist/leaflet.css'
import { AIRPORTS } from '@/data/airports'

// Consumed by MapPageClient's CSS injection for filter dimming — keep in sync
export const MARKER_CLASS_PREFIX = 'airport-marker--'

const MAP_CENTER: [number, number] = [64.9, -18.5]
const MAP_ZOOM = 6

// Hex, not var(--token): these are interpolated into SVG presentation attributes
// (fill=/stroke=), which don't parse var(). Values mirror --volcanic, --glacier, --white.
const MARKER_CONFIGS = {
  international: { size: 30, color: '#e05545', stroke: '#7ecff5' },
  regional:      { size: 22, color: '#7ecff5', stroke: '#7ecff5' },
  small:         { size: 16, color: '#1a1a1a', stroke: '#ffffff' },
}

function makeMarkerSvg(type: keyof typeof MARKER_CONFIGS, icao: string) {
  const cfg = MARKER_CONFIGS[type] || MARKER_CONFIGS.small
  const { size, color, stroke } = cfg
  const r = size / 2
  const svg = `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
    <circle cx="${r}" cy="${r}" r="${r - 1.5}" fill="${color}" stroke="${stroke}" stroke-width="2"/>
  </svg>`
  return { svg, size, r }
}

function fixUtf8(str: string): string {
  try { return decodeURIComponent(escape(str)) } catch { return str }
}

interface Props {
  onAirportClick: (icao: string) => void
}

export default function LeafletMap({ onAirportClick }: Props) {
  const containerRef   = useRef<HTMLDivElement>(null)
  const mapRef         = useRef<import('leaflet').Map | null>(null)
  const onClickRef     = useRef(onAirportClick)

  // Keep ref current without triggering map rebuild
  useEffect(() => { onClickRef.current = onAirportClick }, [onAirportClick])

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
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>, SRTM | Style: © <a href="https://opentopomap.org">OpenTopoMap</a> (CC-BY-SA)',
        subdomains: 'abc',
        maxZoom: 13,
      }).addTo(map)

      L.control.zoom({ position: 'bottomleft' }).addTo(map)

      AIRPORTS.forEach(ap => {
        const type = ap.type as keyof typeof MARKER_CONFIGS
        const { svg, size, r } = makeMarkerSvg(type, ap.icao)

        // airport-marker--{type} class is targeted by MapPageClient dimCSS injection for filter dimming
        const icon = L.divIcon({
          html: `<div class="airport-marker airport-marker--${ap.type}" data-icao="${ap.icao}">${svg}</div>`,
          iconSize:   [size, size],
          iconAnchor: [r, r],
          className:  '',
        })

        const marker = L.marker([ap.lat, ap.lng], { icon })

        const tooltipHtml = `<span class="tooltip-icao">${ap.icao}</span>${fixUtf8(ap.name)}`
        marker.bindTooltip(tooltipHtml, {
          direction: 'top',
          offset: [0, -(ap.type === 'international' ? 16 : ap.type === 'regional' ? 12 : 9)],
          className: 'ap-tooltip',
          permanent: false,
        })

        marker.on('click', () => onClickRef.current(ap.icao))
        marker.addTo(map)
      })
    })

    return () => {
      mapRef.current?.remove()
      mapRef.current = null
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps — onAirportClick is accessed via onClickRef

  return <div ref={containerRef} className="map-container" />
}
