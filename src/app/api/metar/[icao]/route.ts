import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ icao: string }> }
) {
  const { icao } = await params
  const id = icao.toUpperCase()

  const [mr, tr] = await Promise.all([
    fetch(`https://aviationweather.gov/api/data/metar?ids=${id}&format=json&hours=3`, {
      next: { revalidate: 300 },
    }),
    fetch(`https://aviationweather.gov/api/data/taf?ids=${id}&format=json`, {
      next: { revalidate: 300 },
    }),
  ])

  const metar = mr.ok ? await mr.json().catch(() => []) : []
  const taf   = tr.ok ? await tr.json().catch(() => []) : []

  return NextResponse.json({ metar, taf })
}
