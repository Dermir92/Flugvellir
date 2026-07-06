import type { Metadata } from 'next'
import { AIRPORTS } from '@/data/airports'
import NearestClient from '@/components/NearestClient'

export const metadata: Metadata = {
  title: 'Nearest Airports — Flugvellir',
  description: 'Find the nearest Icelandic airport to your current position, sorted by distance with runway, fuel, and frequency.',
}

export default function NearestPage() {
  return <NearestClient airports={AIRPORTS} />
}
