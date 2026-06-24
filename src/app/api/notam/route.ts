import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const icao = req.nextUrl.searchParams.get('icao')?.toUpperCase()
  if (!icao) return NextResponse.json({ error: 'Missing icao' }, { status: 400 })

  const r = await fetch('https://www.avians.is/api/rss', {
    next: { revalidate: 300 },
  })

  if (!r.ok) return NextResponse.json({ error: 'Upstream error' }, { status: 502 })

  const xml = await r.text()
  return new NextResponse(xml, {
    headers: { 'Content-Type': 'application/xml' },
  })
}
