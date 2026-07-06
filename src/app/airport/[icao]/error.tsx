'use client'

import Link from 'next/link'
import { useEffect } from 'react'

export default function AirportError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('[AirportError]', error)
  }, [error])

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
        <span className="ap-hdr-name" style={{ color: 'var(--dark-text-dim)' }}>Something went wrong</span>
      </header>

      <div style={{
        maxWidth: '480px',
        margin: '0 auto',
        padding: '80px 24px 48px',
        textAlign: 'center',
      }}>
        <div style={{
          fontSize: '40px',
          marginBottom: '16px',
          opacity: 0.6,
        }}>⚠</div>

        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: '24px',
          fontWeight: 700,
          color: 'var(--navy)',
          marginBottom: '12px',
          letterSpacing: '0.02em',
        }}>
          Airport page failed to load
        </h1>

        <p style={{ fontSize: '15px', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '32px' }}>
          Live weather data or another service may be temporarily unavailable.
          Try reloading — static airport data should return immediately.
        </p>

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={reset}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'var(--navy)',
              color: 'var(--white)',
              padding: '12px 24px',
              borderRadius: '8px',
              fontWeight: 600,
              fontSize: '14px',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Try again
          </button>

          <Link href="/" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'transparent',
            color: 'var(--navy)',
            padding: '12px 24px',
            borderRadius: '8px',
            fontWeight: 600,
            fontSize: '14px',
            border: '1px solid var(--card-border)',
            textDecoration: 'none',
          }}>
            Back to map
          </Link>
        </div>
      </div>
    </div>
  )
}
