'use client'

import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'
import { AIRPORTS, AIRAC_META } from '@/data/airports'
import s from './MapPageClient.module.css'

const LeafletMap = dynamic(() => import('./LeafletMap'), {
  ssr: false,
  loading: () => <div className="map-container" style={{ background: '#0e1420' }} />,
})

const TYPE_COLORS: Record<string, string> = {
  international: '#e05545',
  regional:      '#7ecff5',
  small:         '#2a9050',
}

const CAT_CLASS: Record<string, string> = {
  VFR:  s.catVfr,
  MVFR: s.catMvfr,
  IFR:  s.catIfr,
  LIFR: s.catLifr,
}

const ALL_TYPES = ['international', 'regional', 'small'] as const
type AirportType = typeof ALL_TYPES[number]

const SORTED_AIRPORTS = [...AIRPORTS].sort((a, b) => {
  const order: Record<string, number> = { international: 0, regional: 1, small: 2 }
  const ta = order[a.type] ?? 3
  const tb = order[b.type] ?? 3
  return ta !== tb ? ta - tb : a.icao.localeCompare(b.icao)
})

const TRANSLATIONS = {
  en: {
    international: 'International',
    regional:      'Regional',
    airfield:      'Airfield',
    conditions:    'Current Conditions',
    recent:        'Recent',
    placeholder:   'BIKF, Akureyri…',
    search_label:  'Search airports',
    airac:         'AIRAC',
    effective:     'Effective',
    link_eaip:     'eAIP',
    link_weather:  'Weather',
    link_notam:    'NOTAMs',
    link_guides:   'Pilot Guides',
    open_sidebar:  'Open sidebar',
    close_sidebar: 'Close sidebar',
    switch_lang:   'Switch to Icelandic',
  },
  is: {
    international: 'Alþjóðlegur',
    regional:      'Svæðisbundinn',
    airfield:      'Flugbraut',
    conditions:    'Ástand núna',
    recent:        'Nýlegar',
    placeholder:   'BIKF, Akureyri…',
    search_label:  'Leita að flugvöllum',
    airac:         'AIRAC',
    effective:     'Í gildi frá',
    link_eaip:     'eAIP',
    link_weather:  'Veður',
    link_notam:    'NOTAMs',
    link_guides:   'Leiðbeiningar',
    open_sidebar:  'Opna hliðarspjald',
    close_sidebar: 'Loka hliðarspjaldi',
    switch_lang:   'Switch to English',
  },
} as const

type Lang = keyof typeof TRANSLATIONS

export default function MapPageClient() {
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)

  const [lang, setLang]                   = useState<Lang>('en')
  const [query, setQuery]                 = useState('')
  const [activeIdx, setActiveIdx]         = useState(-1)
  const [sidebarOpen, setSidebarOpen]     = useState(true)
  const [activeFilters, setActiveFilters] = useState<Set<AirportType>>(new Set(ALL_TYPES))
  const [catData, setCatData]             = useState<Record<string, string>>({})
  const [catLoading, setCatLoading]       = useState(true)
  const [recentIcaos, setRecentIcaos]     = useState<string[]>([])

  const t = (k: keyof (typeof TRANSLATIONS)['en']) => TRANSLATIONS[lang][k]

  // Initialise from localStorage (runs client-side only)
  useEffect(() => {
    if (window.matchMedia('(max-width: 900px)').matches) {
      setSidebarOpen(false)
    } else {
      if (localStorage.getItem('hp_sidebar') === 'closed') setSidebarOpen(false)
    }

    try {
      const saved = JSON.parse(localStorage.getItem('hp_recents') ?? '[]')
      if (Array.isArray(saved)) setRecentIcaos((saved as string[]).slice(0, 5))
    } catch {}

    try {
      const saved = JSON.parse(localStorage.getItem('hp_filters') ?? 'null')
      if (Array.isArray(saved) && saved.length > 0) {
        const valid = (saved as string[]).filter((x): x is AirportType =>
          (ALL_TYPES as readonly string[]).includes(x)
        )
        if (valid.length > 0) setActiveFilters(new Set(valid))
      }
    } catch {}
  }, [])

  // Batch METAR fetch for conditions list
  const fetchConditions = useCallback(() => {
    const ids = AIRPORTS.map(ap => ap.icao).join(',')
    fetch(`/api/metar/batch?ids=${ids}`)
      .then(r => r.json())
      .then(({ metar }: { metar: Array<{ icaoId?: string; stationId?: string; fltCat?: string; fltcat?: string }> }) => {
        const cats: Record<string, string> = {}
        for (const m of metar ?? []) {
          const id = (m.icaoId ?? m.stationId ?? '').toUpperCase()
          const cat = m.fltCat ?? m.fltcat
          if (id && cat && !cats[id]) cats[id] = cat
        }
        setCatData(cats)
        setCatLoading(false)
      })
      .catch(() => setCatLoading(false))
  }, [])

  useEffect(() => {
    fetchConditions()
    const timer = setInterval(fetchConditions, 5 * 60 * 1000)
    return () => clearInterval(timer)
  }, [fetchConditions])

  // Sidebar toggle — persist desktop preference
  const toggleSidebar = useCallback(() => {
    setSidebarOpen(prev => {
      const next = !prev
      if (!window.matchMedia('(max-width: 900px)').matches) {
        localStorage.setItem('hp_sidebar', next ? 'open' : 'closed')
      }
      return next
    })
  }, [])

  // Filter toggle — keep at least one active, persist
  const toggleFilter = useCallback((type: AirportType) => {
    setActiveFilters(prev => {
      const next = new Set(prev)
      if (next.has(type)) {
        if (next.size > 1) next.delete(type)
      } else {
        next.add(type)
      }
      localStorage.setItem('hp_filters', JSON.stringify([...next]))
      return next
    })
  }, [])

  // Navigate + update recent airports
  const navigate = useCallback((icao: string) => {
    setRecentIcaos(prev => {
      const next = [icao, ...prev.filter(x => x !== icao)].slice(0, 5)
      localStorage.setItem('hp_recents', JSON.stringify(next))
      return next
    })
    if (window.matchMedia('(max-width: 900px)').matches) setSidebarOpen(false)
    router.push('/airport/' + icao)
  }, [router])

  // Search autocomplete results
  const results = query.trim()
    ? AIRPORTS.filter(ap =>
        ap.icao.toLowerCase().includes(query.toLowerCase()) ||
        ap.name.toLowerCase().includes(query.toLowerCase()) ||
        ap.name_is.toLowerCase().includes(query.toLowerCase()) ||
        ap.city.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 6)
    : []

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!results.length) return
    if (e.key === 'ArrowDown') {
      e.preventDefault(); setActiveIdx(i => (i + 1) % results.length)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault(); setActiveIdx(i => (i - 1 + results.length) % results.length)
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (activeIdx >= 0 && results[activeIdx]) navigate(results[activeIdx].icao)
    } else if (e.key === 'Escape') {
      setQuery(''); inputRef.current?.blur()
    }
  }

  // Airports shown in conditions list (filtered by type + search)
  const conditionAirports = SORTED_AIRPORTS.filter(ap => {
    if (!activeFilters.has(ap.type as AirportType)) return false
    if (!query.trim()) return true
    const q = query.toLowerCase()
    return (
      ap.icao.toLowerCase().includes(q) ||
      ap.name.toLowerCase().includes(q) ||
      ap.name_is.toLowerCase().includes(q) ||
      ap.city.toLowerCase().includes(q)
    )
  })

  // Recent airport data objects (preserving order)
  const recentAirports = recentIcaos
    .map(icao => AIRPORTS.find(ap => ap.icao === icao))
    .filter((ap): ap is (typeof AIRPORTS)[number] => !!ap)

  // Dim filtered-out map markers via CSS injection. Targets .airport-marker--{type} classes
  // defined in LeafletMap.tsx divIcon html — update here if those class names ever change.
  const dimCSS = ALL_TYPES
    .filter(t => !activeFilters.has(t))
    .map(t => `.airport-marker--${t} { opacity: 0.1 !important; pointer-events: none !important; transition: opacity 0.2s ease !important; }`)
    .join('\n')

  return (
    <>
      {dimCSS && <style dangerouslySetInnerHTML={{ __html: dimCSS }} />}

      <div className="map-page">

        {/* ====== SIDEBAR ====== */}
        <aside
          className={`${s.sidebar} ${sidebarOpen ? s.sidebarOpen : s.sidebarHidden}`}
          aria-label="Navigation sidebar"
        >
          <div className={s.sbInner}>

            {/* Nav bar */}
            <div className={s.sbNav}>
              <span className={s.sbLogo}>Flugvellir</span>
              <button
                className={s.langBtn}
                aria-label={t('switch_lang')}
                title={t('switch_lang')}
                onClick={() => setLang(l => l === 'en' ? 'is' : 'en')}
              >
                <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.2"/>
                  <ellipse cx="6" cy="6" rx="2.2" ry="5" stroke="currentColor" strokeWidth="1.2"/>
                  <line x1="1" y1="6" x2="11" y2="6" stroke="currentColor" strokeWidth="1.2"/>
                </svg>
                {lang === 'en' ? 'IS' : 'EN'}
              </button>
            </div>

            {/* Search */}
            <div className={s.sbSearch}>
              <div className={s.sbSearchWrap}>
                <input
                  ref={inputRef}
                  type="search"
                  className={s.sbInput}
                  placeholder={t('placeholder')}
                  aria-label={t('search_label')}
                  autoComplete="off"
                  spellCheck={false}
                  value={query}
                  onChange={e => { setQuery(e.target.value); setActiveIdx(-1) }}
                  onKeyDown={handleKeyDown}
                  onBlur={() => setTimeout(() => { setQuery(''); setActiveIdx(-1) }, 150)}
                />
                <svg className={s.sbSearchIcon} viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <circle cx="6.5" cy="6.5" r="4.5" stroke="currentColor" strokeWidth="1.5"/>
                  <line x1="10.5" y1="10.5" x2="14" y2="14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                {results.length > 0 && (
                  <div className={`search-results is-visible ${s.sbDropdown}`} role="listbox">
                    {results.map((ap, i) => (
                      <button
                        key={ap.icao}
                        className={`search-result-item${i === activeIdx ? ' is-active' : ''}`}
                        role="option"
                        onMouseDown={() => navigate(ap.icao)}
                      >
                        <span className="search-result-icao">{ap.icao}</span>
                        <span className="search-result-name">{lang === 'is' ? ap.name_is : ap.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Filter pills */}
            <div className={s.sbFilters}>
              {ALL_TYPES.map(type => (
                <button
                  key={type}
                  className={`${s.filterPill} ${activeFilters.has(type) ? s.filterPillActive : ''}`}
                  onClick={() => toggleFilter(type)}
                  aria-pressed={activeFilters.has(type)}
                >
                  <span className={s.filterDot} style={{ background: TYPE_COLORS[type] }} />
                  {type === 'international' ? t('international') : type === 'regional' ? t('regional') : t('airfield')}
                </button>
              ))}
            </div>

            {/* Conditions list — grows to fill remaining sidebar height */}
            <div className={`${s.sbSection} ${s.sbSectionGrow}`}>
              <div className={s.sbSectionLabel}>{t('conditions')}</div>
              <div className={s.sbConditions}>
                {conditionAirports.map(ap => {
                  const cat = catData[ap.icao]
                  return (
                    <button key={ap.icao} className={s.condRow} onClick={() => navigate(ap.icao)}>
                      <span className={s.condIcao}>{ap.icao}</span>
                      <span className={s.condName}>{lang === 'is' ? ap.name_is : ap.name}</span>
                      {catLoading ? (
                        <span className={s.condCatSkeleton} />
                      ) : cat ? (
                        <span className={`${s.condCat} ${CAT_CLASS[cat] ?? s.catNone}`}>{cat}</span>
                      ) : (
                        <span className={`${s.condCat} ${s.catNone}`}>—</span>
                      )}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Recent airports */}
            {recentAirports.length > 0 && (
              <div className={s.sbSection}>
                <div className={s.sbSectionLabel}>{t('recent')}</div>
                {recentAirports.map(ap => (
                  <button key={ap.icao} className={s.recentRow} onClick={() => navigate(ap.icao)}>
                    <span className={s.recentIcao}>{ap.icao}</span>
                    <span className={s.recentName}>{lang === 'is' ? ap.name_is : ap.name}</span>
                  </button>
                ))}
              </div>
            )}

            {/* Footer */}
            <footer className={s.sbFooter}>
              <div className={s.sbFooterAirac}>
                <span className="airac-pulse" aria-hidden="true" />
                {t('airac')} {AIRAC_META.cycle}
                <span style={{ color: '#3a6888' }}>·</span>
                {t('effective')} {AIRAC_META.effective}
              </div>
              <div className={s.sbFooterLinks}>
                <a href={AIRAC_META.source_url} target="_blank" rel="noopener noreferrer">{t('link_eaip')}</a>
                <a href="https://www.vedur.is/vedur/flugvedur/" target="_blank" rel="noopener noreferrer">{t('link_weather')}</a>
                <a href="https://www.avians.is/en/c-preflight-information/notam" target="_blank" rel="noopener noreferrer">{t('link_notam')}</a>
                <a href="https://island.is/leidbeiningarefni-fyrir-einkaflug" target="_blank" rel="noopener noreferrer">{t('link_guides')}</a>
              </div>
              <div className={s.sbFooterCredit}>
                <a href="https://foxel.is" target="_blank" rel="noopener noreferrer">Foxel</a>
                <span style={{ color: '#3a4a58' }}> · </span>
                <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">© OpenStreetMap</a>
              </div>
            </footer>

          </div>
        </aside>

        {/* Mobile backdrop — closes drawer on tap */}
        {sidebarOpen && (
          <div className={s.backdrop} onClick={() => setSidebarOpen(false)} aria-hidden="true" />
        )}

        {/* ====== MAP AREA ====== */}
        <main className="map-area">

          {/* Collapse / expand tab */}
          <button
            className={s.collapseBtn}
            onClick={toggleSidebar}
            aria-label={sidebarOpen ? t('close_sidebar') : t('open_sidebar')}
            title={sidebarOpen ? t('close_sidebar') : t('open_sidebar')}
          >
            {sidebarOpen ? '‹' : '›'}
          </button>

          <LeafletMap onAirportClick={navigate} />

          {/* Legend */}
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

      </div>
    </>
  )
}
