'use client'

import dynamic from 'next/dynamic'
import type { Airport } from '@/types/airport'

const MiniMapInner = dynamic(() => import('./MiniMapInner'), {
  ssr: false,
  loading: () => <div className="ap-mini-map" style={{ background: '#0e1420' }} />,
})

export default function MiniMap({ airport }: { airport: Airport }) {
  return <MiniMapInner airport={airport} />
}
