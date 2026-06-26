import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const ids = req.nextUrl.searchParams.get('ids') ?? ''
  if (!ids) return NextResponse.json({ metar: [] })

  const url = `https://aviationweather.gov/api/data/metar?ids=${encodeURIComponent(ids)}&format=json&hours=3`

  try {
    const res = await fetch(url, { next: { revalidate: 300 } })
    const metar = res.ok ? await res.json().catch(() => []) : []
    return NextResponse.json({ metar })
  } catch {
    return NextResponse.json({ metar: [] })
  }
}
