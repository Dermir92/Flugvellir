'use client'

import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import { useCallback, useRef, useState } from 'react'
import { AIRPORTS, AIRAC_META } from '@/data/airports'

const LeafletMap = dynamic(() => import('./LeafletMap'), {
  ssr: false,
  loading: () => <div className="map-container" style={{ background: '#0e1420' }} />,
})

const TRANSLATIONS = {
  en: {
    tagline:     'Icelandic airports in one place',
    international: 'International',
    regional:    'Regional',
    airfield:    'Airfield',
    airac:       'AIRAC',
    effective:   'Effective',
    data_source: 'Data:',
    disclaimer:  'Verify with NOTAMs before flight',
    placeholder: 'BIKF, Akureyri…',
    search_label: 'Search airports',
    link_eaip:      'eAIP',
    link_weather:   'Weather',
    link_notam:     'NOTAMs',
    link_ga_guides: 'Pilot Guides',
    link_training:  'Training',
  },
  is: {
    tagline:     'Íslenzkir flugvellir á einum stað',
    international: 'Alþjóðlegur',
    regional:    'Svæðisbundinn',
    airfield:    'Flugbraut',
    airac:       'AIRAC',
    effective:   'Í gildi frá',
    data_source: 'Gögn:',
    disclaimer:  'Staðfestu með NOTAMum fyrir flug',
    placeholder: 'BIKF, Akureyri…',
    search_label: 'Leita að flugvöllum',
    link_eaip:      'eAIP',
    link_weather:   'Veður',
    link_notam:     'NOTAMs',
    link_ga_guides: 'Leiðbeiningar fyrir einkaflugmenn',
    link_training:  'Flugnám',
  },
} as const

type Lang = keyof typeof TRANSLATIONS

export default function MapPageClient() {
  const router = useRouter()
  const [lang, setLang] = useState<Lang>('en')
  const [query, setQuery] = useState('')
  const [activeIdx, setActiveIdx] = useState(-1)
  const inputRef        = useRef<HTMLInputElement>(null)
  const overlayInputRef = useRef<HTMLInputElement>(null)

  const t = (k: keyof (typeof TRANSLATIONS)['en']) => TRANSLATIONS[lang][k]

  const results = query.trim()
    ? AIRPORTS.filter(ap =>
        ap.icao.toLowerCase().includes(query.toLowerCase()) ||
        ap.name.toLowerCase().includes(query.toLowerCase()) ||
        ap.name_is.toLowerCase().includes(query.toLowerCase()) ||
        ap.city.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 6)
    : []

  const navigate = useCallback((icao: string) => {
    router.push('/airport/' + icao)
  }, [router])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!results.length) return
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIdx(i => (i + 1) % results.length)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIdx(i => (i - 1 + results.length) % results.length)
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (activeIdx >= 0 && results[activeIdx]) navigate(results[activeIdx].icao)
    } else if (e.key === 'Escape') {
      setQuery('')
      inputRef.current?.blur()
    }
  }

  return (
    <div className="map-page">
      {/* Header */}
      <header className="map-header">
        <div className="header-inner">
          <div className="header-brand">
            <span className="brand-name">Flugvellir</span>
            <span className="brand-sep">—</span>
            <span className="brand-tagline">{t('tagline')}</span>
          </div>
          <nav className="header-links" aria-label="External resources">
            <a className="header-link" href="https://eaip.isavia.is/" target="_blank" rel="noopener noreferrer">{t('link_eaip')}</a>
            <span className="header-link-dot" aria-hidden="true">·</span>
            <a className="header-link" href="https://www.vedur.is/vedur/flugvedur/" target="_blank" rel="noopener noreferrer">{t('link_weather')}</a>
            <span className="header-link-dot" aria-hidden="true">·</span>
            <a className="header-link" href="https://www.avians.is/en/c-preflight-information/notam" target="_blank" rel="noopener noreferrer">{t('link_notam')}</a>
            <span className="header-link-dot" aria-hidden="true">·</span>
            <a className="header-link" href="https://island.is/leidbeiningarefni-fyrir-einkaflug" target="_blank" rel="noopener noreferrer">{t('link_ga_guides')}</a>
            <span className="header-link-dot" aria-hidden="true">·</span>
            <a className="header-link" href="https://island.is/s/samgongustofa/flugnam-og-skirteini" target="_blank" rel="noopener noreferrer">{t('link_training')}</a>
          </nav>
          <div className="header-controls">
            <div className="search-wrap">
              <input
                ref={inputRef}
                type="search"
                className="search-input"
                placeholder={t('placeholder')}
                aria-label={t('search_label')}
                autoComplete="off"
                spellCheck={false}
                value={query}
                onChange={e => { setQuery(e.target.value); setActiveIdx(-1) }}
                onKeyDown={handleKeyDown}
                onBlur={() => setTimeout(() => setQuery(''), 150)}
              />
              <svg className="search-icon" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <circle cx="6.5" cy="6.5" r="4.5" stroke="currentColor" strokeWidth="1.5"/>
                <line x1="10.5" y1="10.5" x2="14" y2="14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              {results.length > 0 && (
                <div className="search-results is-visible" role="listbox" aria-label="Airport suggestions">
                  {results.map((ap, i) => (
                    <button
                      key={ap.icao}
                      className={`search-result-item${i === activeIdx ? ' is-active' : ''}`}
                      role="option"
                      onMouseDown={() => navigate(ap.icao)}
                    >
                      <span className="search-result-icao">{ap.icao}</span>
                      <span className="search-result-name">{ap.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button
              className="lang-btn"
              aria-label="Toggle language"
              onClick={() => setLang(l => l === 'en' ? 'is' : 'en')}
            >
              {lang === 'en' ? 'IS' : 'EN'}
            </button>
          </div>
        </div>
      </header>

      {/* Map */}
      <main className="map-area">
        <LeafletMap onAirportClick={navigate} />

        {/* Floating hero overlay — desktop only */}
        <div className="map-overlay" style={{
          position: 'absolute', top: 20, left: 20, zIndex: 900,
          width: 288,
          background: 'rgba(10,30,48,0.90)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid rgba(126,207,245,0.2)',
          borderRadius: 12,
          padding: '20px 20px 18px',
          boxShadow: '0 8px 32px rgba(10,30,48,0.45)',
        }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 800, color: '#fff', marginBottom: 3 }}>
            Flugvellir
          </div>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#7ecff5', marginBottom: 4 }}>
            Plan your flight in Iceland
          </div>
          <p style={{ fontSize: 11, color: '#7099b8', marginBottom: 14, lineHeight: 1.45, margin: '0 0 14px' }}>
            Airports · Weather · NOTAMs · Pilot notes
          </p>
          <div style={{ position: 'relative' }}>
            <input
              ref={overlayInputRef}
              type="search"
              style={{
                width: '100%', boxSizing: 'border-box',
                background: 'rgba(30,90,138,0.35)',
                border: '1px solid rgba(126,207,245,0.3)',
                borderRadius: 8,
                padding: '10px 36px 10px 14px',
                fontSize: 14, color: '#fff', outline: 'none',
              }}
              placeholder={t('placeholder')}
              aria-label={t('search_label')}
              autoComplete="off"
              spellCheck={false}
              value={query}
              onChange={e => { setQuery(e.target.value); setActiveIdx(-1) }}
              onKeyDown={handleKeyDown}
              onBlur={() => setTimeout(() => setQuery(''), 150)}
            />
            <svg style={{ position: 'absolute', right: 11, top: '50%', transform: 'translateY(-50%)', width: 15, height: 15, color: '#7099b8', pointerEvents: 'none' }} viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <circle cx="6.5" cy="6.5" r="4.5" stroke="currentColor" strokeWidth="1.5"/>
              <line x1="10.5" y1="10.5" x2="14" y2="14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            {results.length > 0 && (
              <div className="search-results is-visible" style={{ position: 'absolute', top: 'calc(100% + 4px)', left: 0, right: 0, zIndex: 910 }} role="listbox">
                {results.map((ap, i) => (
                  <button
                    key={ap.icao}
                    className={`search-result-item${i === activeIdx ? ' is-active' : ''}`}
                    role="option"
                    onMouseDown={() => navigate(ap.icao)}
                  >
                    <span className="search-result-icao">{ap.icao}</span>
                    <span className="search-result-name">{ap.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="map-legend" aria-hidden="true">
          <div className="legend-item">
            <span className="legend-dot legend-dot--international" />
            <span className="legend-label">{t('international')}</span>
          </div>
          <div className="legend-item">
            <span className="legend-dot legend-dot--regional" />
            <span className="legend-label">{t('regional')}</span>
          </div>
          <div className="legend-item">
            <span className="legend-dot legend-dot--small" />
            <span className="legend-label">{t('airfield')}</span>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="map-footer">
        <div className="footer-inner">
          <span className="airac-badge">
            <span className="airac-pulse" aria-hidden="true" />
            {t('airac')} {AIRAC_META.cycle}
            <span className="airac-sep">·</span>
            {t('effective')} {AIRAC_META.effective}
          </span>
          <span className="footer-mid">
            {t('data_source')}{' '}
            <a href={AIRAC_META.source_url} target="_blank" rel="noopener noreferrer">
              Isavia eAIP
            </a>
            <span className="footer-sep"> · </span>
            {t('disclaimer')}
          </span>
          <span className="footer-credit">
            <a href="https://foxel.is" target="_blank" rel="noopener noreferrer">Foxel</a>
            <span className="footer-sep"> · </span>
            <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">© OpenStreetMap</a>
          </span>
        </div>
      </footer>
    </div>
  )
}
