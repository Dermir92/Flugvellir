'use client'

import { useEffect, useState } from 'react'

interface NotamItem {
  notamNum: string
  category: string
  validity: string
  pubDate: string
  body: string
  link: string
  raw: string
}

function escapeHtml(str: string) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

export default function NotamCard({ icao }: { icao: string }) {
  const [items, setItems]   = useState<NotamItem[]>([])
  const [status, setStatus] = useState<'loading' | 'empty' | 'done' | 'error'>('loading')
  const [open, setOpen]     = useState<Record<number, boolean>>({})

  useEffect(() => {
    fetch(`/api/notam?icao=${icao}`)
      .then(r => { if (!r.ok) throw new Error('HTTP ' + r.status); return r.text() })
      .then(xml => {
        const doc   = new DOMParser().parseFromString(xml, 'text/xml')
        const nodes = Array.from(doc.querySelectorAll('item'))

        const mine = nodes.filter(item => {
          const link = item.querySelector('link')?.textContent || ''
          if (link.includes('"airport_code":"' + icao + '"')) return true
          const desc = item.querySelector('description')?.textContent || ''
          return new RegExp('\\bA\\)\\s[^\\n]*\\b' + icao + '\\b').test(desc)
        })

        const parsed: NotamItem[] = mine.map(item => {
          const titleRaw = item.querySelector('title')?.textContent?.trim() || ''
          const desc     = item.querySelector('description')?.textContent?.trim() || ''
          const link     = item.querySelector('link')?.textContent?.trim() || ''
          const pubRaw   = item.querySelector('pubDate')?.textContent?.trim() || ''

          const dashIdx  = titleRaw.indexOf(' - ')
          const notamNum = dashIdx > -1 ? titleRaw.slice(0, dashIdx) : titleRaw
          const category = dashIdx > -1 ? titleRaw.slice(dashIdx + 3) : ''

          const pubDate = pubRaw
            ? new Date(pubRaw).toLocaleDateString('en-GB', {
                day: '2-digit', month: 'short', year: 'numeric',
                hour: '2-digit', minute: '2-digit', timeZone: 'UTC',
              }) + ' UTC'
            : ''

          const bMatch    = desc.match(/\bB\)\s*([^\n]+)/)
          const cMatch    = desc.match(/\bC\)\s*([^\n]+)/)
          const eMatch    = desc.match(/\bE\)\s*([\s\S]+?)(?:\nF\)|\nG\)|\)$|$)/)
          const validity  = bMatch ? `${bMatch[1].trim()}${cMatch ? ' – ' + cMatch[1].trim() : ''}` : ''

          return { notamNum, category, validity, pubDate, body: eMatch ? eMatch[1].trim() : desc, link, raw: desc }
        })

        setItems(parsed)
        setStatus(parsed.length ? 'done' : 'empty')
      })
      .catch(() => setStatus('error'))
  }, [icao])

  return (
    <div className="ap-card">
      <div className="ap-card-title">
        NOTAMs
        <span className="notam-src">via avians.is</span>
      </div>
      <div className="notam-body">
        {status === 'loading' && (
          <div className="notam-loading"><span className="notam-spinner" /> Fetching active NOTAMs…</div>
        )}
        {status === 'empty' && (
          <div className="notam-empty">
            <span className="notam-empty-icon">✓</span>
            No active NOTAMs for {icao}
            <a href="https://www.avians.is/en/c-preflight-information/notam" target="_blank" rel="noopener noreferrer" className="notam-verify-link">
              Verify on avians.is
            </a>
          </div>
        )}
        {status === 'error' && (
          <div className="notam-fallback">
            <p>Could not load NOTAMs automatically.</p>
            <a href="https://www.avians.is/en/c-preflight-information/notam" target="_blank" rel="noopener noreferrer" className="notam-ext-link">
              View all NOTAMs on avians.is →
            </a>
          </div>
        )}
        {status === 'done' && (
          <>
            <div className="notam-count">{items.length} active NOTAM{items.length > 1 ? 's' : ''}</div>
            <div className="notam-list">
              {items.map((item, idx) => (
                <div key={idx} className="notam-item">
                  <div
                    className="notam-item-head"
                    onClick={() => setOpen(o => ({ ...o, [idx]: !o[idx] }))}
                  >
                    <div className="notam-item-left">
                      <span className="notam-num">{item.notamNum}</span>
                      {item.category && <span className="notam-cat">{item.category}</span>}
                    </div>
                    <div className="notam-item-right">
                      {(item.validity || item.pubDate) && (
                        <span className="notam-validity">{item.validity || item.pubDate}</span>
                      )}
                      <span className="notam-chevron">{open[idx] ? '▴' : '▾'}</span>
                    </div>
                  </div>
                  {open[idx] && (
                    <div className="notam-body-text">
                      <pre className="notam-pre">{item.raw}</pre>
                      {item.link && (
                        <a href={item.link} target="_blank" rel="noopener noreferrer" className="notam-pdf-link">
                          Download PDF
                        </a>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
