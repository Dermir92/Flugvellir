import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const ids = req.nextUrl.searchParams.get('ids') ?? ''
  if (!ids) return NextResponse.json({ metar: [] })

  const url = `https://aviationweather.gov/api/data/metar?ids=${encodeURIComponent(ids)}&format=json&hours=3`

  // Promise.race keeps Next.js data cache intact — AbortController signal bypasses it
  const fetchP = fetch(url, { next: { revalidate: 300 } })
  const timeoutP = new Promise<never>((_, reject) =>
    setTimeout(() => reject(new Error('timeout')), 6000)
  )

  try {
    const res = await Promise.race([fetchP, timeoutP])
    const metar = res.ok ? await res.json().catch(() => []) : []
    return NextResponse.json({ metar })
  } catch {
    // Timeout or network failure — sidebar degrades to — badges, no visible error
    return NextResponse.json({ metar: [] })
  }
}
