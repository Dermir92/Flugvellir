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
    tagline:     'Íslenzkir flugvellir á einum stað',
    international: 'International',
    regional:    'Regional',
    airfield:    'Airfield',
    airac:       'AIRAC',
    effective:   'Effective',
    data_source: 'Data:',
    disclaimer:  'Verify with NOTAMs before flight',
    placeholder: 'BIKF, Akureyri…',
    search_label: 'Search airports',
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
  },
} as const

type Lang = keyof typeof TRANSLATIONS

export default function MapPageClient() {
  const router = useRouter()
  const [lang, setLang] = useState<Lang>('en')
  const [query, setQuery] = useState('')
  const [activeIdx, setActiveIdx] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)

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
            <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">
              © OpenStreetMap
            </a>
          </span>
        </div>
      </footer>
    </div>
  )
}
