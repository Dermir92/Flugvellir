import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const ids = req.nextUrl.searchParams.get('ids') ?? ''
  if (!ids) return NextResponse.json({ metar: [] })

  const url = `https://aviationweather.gov/api/data/metar?ids=${encodeURIComponent(ids)}&format=json&hours=3`

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 6000)

  try {
    const res = await fetch(url, { signal: controller.signal, next: { revalidate: 300 } })
    const metar = res.ok ? await res.json().catch(() => []) : []
    return NextResponse.json({ metar })
  } catch {
    // Timeout or network failure — sidebar degrades to — badges, no visible error
    return NextResponse.json({ metar: [] })
  } finally {
    clearTimeout(timeout)
  }
}
