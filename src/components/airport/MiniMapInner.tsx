'use client'

import { useEffect, useRef } from 'react'
import 'leaflet/dist/leaflet.css'
import type { Airport } from '@/types/airport'

const TYPE_COLORS = {
  international: '#c85040',
  regional:      '#5a9db4',
  small:         '#7a9e6a',
}

export default function MiniMapInner({ airport }: { airport: Airport }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<import('leaflet').Map | null>(null)

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return

    import('leaflet').then(({ default: L }) => {
      if (!containerRef.current || mapRef.current) return

      const map = L.map(containerRef.current, {
        center:             [airport.lat, airport.lng],
        zoom:               11,
        zoomControl:        false,
        attributionControl: true,
        dragging:           false,
        scrollWheelZoom:    false,
        doubleClickZoom:    false,
        boxZoom:            false,
        keyboard:           false,
      })

      mapRef.current = map

      L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data: © <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, SRTM | Style: © <a href="https://opentopomap.org">OpenTopoMap</a> (CC-BY-SA)',
        subdomains: 'abc',
        maxZoom: 14,
      }).addTo(map)

      const color = TYPE_COLORS[airport.type] || TYPE_COLORS.small
      const size  = 20
      const r     = size / 2

      const icon = L.divIcon({
        html: `<div style="width:${size}px;height:${size}px;">
          <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
            <circle cx="${r}" cy="${r}" r="${r - 1.5}" fill="${color}" stroke="white" stroke-width="2"/>
          </svg>
        </div>`,
        iconSize:   [size, size],
        iconAnchor: [r, r],
        className:  '',
      })

      L.marker([airport.lat, airport.lng], { icon }).addTo(map)
    })

    return () => {
      mapRef.current?.remove()
      mapRef.current = null
    }
  }, [airport])

  return <div ref={containerRef} className="ap-mini-map" />
}
