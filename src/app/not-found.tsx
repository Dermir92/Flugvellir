'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function NotFound() {
  const [icao, setIcao] = useState<string | null>(null)

  useEffect(() => {
    const parts = window.location.pathname.split('/')
    const candidate = parts[parts.length - 1]?.toUpperCase()
    if (/^[A-Z]{4}$/.test(candidate)) setIcao(candidate)
  }, [])

  return (
    <div style={{ background: 'var(--page-bg)', minHeight: '100vh', fontFamily: 'var(--font-body)' }}>
      <header className="ap-page-header">
        <Link href="/" className="ap-back-link">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Map
        </Link>
        <span className="ap-header-sep">/</span>
        <span className="ap-hdr-name" style={{ color: 'var(--dark-text-dim)' }}>Not found</span>
      </header>

      <div style={{
        maxWidth: '480px',
        margin: '0 auto',
        padding: '80px 24px 48px',
        textAlign: 'center',
      }}>
        <div style={{
          fontFamily: 'var(--font-display)',
          fontSize: '72px',
          fontWeight: 700,
          color: 'var(--navy)',
          lineHeight: 1,
          letterSpacing: '0.04em',
          marginBottom: '8px',
          opacity: 0.18,
        }}>404</div>

        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: '28px',
          fontWeight: 700,
          color: 'var(--navy)',
          marginBottom: '12px',
          letterSpacing: '0.02em',
        }}>
          {icao ? `${icao} — Airport not found` : 'Page not found'}
        </h1>

        <p style={{ fontSize: '15px', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '32px' }}>
          {icao
            ? `There is no airport with the ICAO code ${icao} in our database. Check the code and try again, or browse the map.`
            : 'The page you were looking for doesn\'t exist. Head back to the map to find an airport.'}
        </p>

        <Link href="/" style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          background: 'var(--navy)',
          color: 'var(--white)',
          padding: '12px 24px',
          borderRadius: '8px',
          fontWeight: 600,
          fontSize: '14px',
          textDecoration: 'none',
        }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Back to map
        </Link>
      </div>
    </div>
  )
}
