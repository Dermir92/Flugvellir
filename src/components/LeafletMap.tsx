'use client'

import { useEffect, useRef } from 'react'
import 'leaflet/dist/leaflet.css'
import { AIRPORTS, AIRAC_META } from '@/data/airports'

const MAP_CENTER: [number, number] = [64.9, -18.5]
const MAP_ZOOM = 6

const MARKER_CONFIGS = {
  international: { size: 30, color: '#c05040' },
  regional:      { size: 22, color: '#2c6a82' },
  small:         { size: 14, color: '#3e4a3a' },
} as const

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
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<import('leaflet').Map | null>(null)

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
      mapRef.current?.remove()
      mapRef.current = null
    }
  }, [onAirportClick])

  return <div ref={containerRef} className="map-container" />
}
