import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { AIRPORTS, AIRAC_META } from '@/data/airports'
import MiniMap from '@/components/airport/MiniMap'
import MetarCard from '@/components/airport/MetarCard'
import WeatherCard from '@/components/airport/WeatherCard'
import NotamCard from '@/components/airport/NotamCard'
import { VfrButton } from '@/components/airport/VfrGuide'
import type { Airport } from '@/types/airport'

export async function generateStaticParams() {
  return AIRPORTS.map(a => ({ icao: a.icao }))
}

export async function generateMetadata(props: PageProps<'/airport/[icao]'>): Promise<Metadata> {
  const { icao } = await props.params
  const a = AIRPORTS.find(ap => ap.icao === icao.toUpperCase())
  if (!a) return { title: 'Airport not found' }
  return {
    title: `${a.icao} — ${a.name} · Flugvellir`,
    description: a.description
      || `${a.name} (${a.icao}) — ${a.type} airport in ${a.region}, Iceland. Elevation ${a.elevation_ft} ft AMSL.`,
    openGraph: {
      title: `${a.icao} — ${a.name}`,
      description: a.description || `${a.type} airport in ${a.region}, Iceland.`,
    },
  }
}

function typeLabel(type: Airport['type']) {
  return type === 'international' ? 'International'
       : type === 'regional'      ? 'Regional'
       : 'Airfield'
}

export default async function AirportPage(props: PageProps<'/airport/[icao]'>) {
  const { icao } = await props.params
  const a = AIRPORTS.find(ap => ap.icao === icao.toUpperCase())
  if (!a) notFound()

  const rwyList    = (a.runways || []).map(r => r.id).join(' / ')
  const rwyLengths = (a.runways || []).map(r => `${r.length_m.toLocaleString()} m`).join(' · ')
  const freqCount  = (a.frequencies || []).length
  const svcBadge   = a.hours?.service.toLowerCase() === 'atc' ? 'atc'
                   : a.hours?.service.toLowerCase() === 'afis' ? 'afis' : 'other'

  return (
    <div className="airport-page">
      {/* Sticky header */}
      <header className="ap-page-header">
        <Link href="/" className="ap-back-link">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Map
        </Link>
        <span className="ap-header-sep">/</span>
        <span className="ap-hdr-icao">{a.icao}</span>
        <span className="ap-hdr-name">{a.name}</span>
        <span className={`ap-hdr-badge ap-hdr-badge--${a.type}`}>{typeLabel(a.type)}</span>
        <VfrButton airport={a} variant="header" />
      </header>

      {/* Hero */}
      <section className="ap-hero">
        <div className="ap-hero-inner">
          <div className="ap-hero-text">
            <div className="ap-hero-badges">
              <span className="ap-hero-icao">{a.icao}</span>
              {a.iata && <span className="ap-hero-iata">{a.iata}</span>}
            </div>
            <h1 className="ap-hero-name">{a.name}</h1>
            <p className="ap-hero-region">{a.region} · Iceland · {a.elevation_ft} ft AMSL</p>
            {a.description && <p className="ap-hero-desc">{a.description}</p>}
            <VfrButton airport={a} variant="hero" />
          </div>
          <div className="ap-hero-map-wrap">
            <MiniMap airport={a} />
            <div className="ap-mini-map-label">{a.lat_dms}  {a.lng_dms}</div>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="ap-stats-strip">
        <div className="ap-stats-inner">
          <div className="ap-stat">
            <span className="ap-stat-label">Elevation</span>
            <span className="ap-stat-value">{a.elevation_ft.toLocaleString()} ft</span>
            <span className="ap-stat-sub">{a.elevation_m} m AMSL</span>
          </div>
          <div className="ap-stat">
            <span className="ap-stat-label">Runways</span>
            <span className="ap-stat-value">{rwyList || '—'}</span>
            <span className="ap-stat-sub">{rwyLengths || '—'}</span>
          </div>
          <div className="ap-stat">
            <span className="ap-stat-label">Type</span>
            <span className="ap-stat-value">{typeLabel(a.type)}</span>
            <span className="ap-stat-sub">{a.hours?.service ?? '—'}</span>
          </div>
          <div className="ap-stat">
            <span className="ap-stat-label">Frequencies</span>
            <span className="ap-stat-value">{freqCount}</span>
            <span className="ap-stat-sub">{(a.frequencies || []).map(f => f.role).join(', ') || '—'}</span>
          </div>
          {a.fuel && (
            <div className="ap-stat">
              <span className="ap-stat-label">Fuel</span>
              <span className="ap-stat-value">
                {[a.fuel.avgas && 'AVGAS', a.fuel.jet_a1 && 'JET A-1'].filter(Boolean).join(' · ') || 'None'}
              </span>
              <span className="ap-stat-sub">{a.fuel.supplier || '—'}</span>
            </div>
          )}
        </div>
      </section>

      {/* Main content */}
      <main className="ap-main">
        {/* METAR/TAF — client */}
        <MetarCard icao={a.icao} />

        {/* Weather — client */}
        <WeatherCard lat={a.lat} lng={a.lng} />

        {/* Runways */}
        {a.runways?.length > 0 && (
          <div className="ap-card">
            <div className="ap-card-title">Runways</div>
            <div className="runways-grid">
              {a.runways.map(rwy => {
                const [lo, hi] = rwy.id.split('/')
                const surfCls = rwy.surface.toLowerCase().includes('gravel') ? 'gravel' : 'asphalt'
                return (
                  <div key={rwy.id} className="rwy-card">
                    <div className="rwy-visual" aria-hidden="true">
                      <span className="rwy-end-num">{lo}</span>
                      <div className="rwy-strip"><div className="rwy-cl" /></div>
                      <span className="rwy-end-num">{hi || ''}</span>
                    </div>
                    <div className="rwy-info">
                      <div className="rwy-id-label">{rwy.id}</div>
                      <div className="rwy-dims-row">
                        <strong>{rwy.length_m.toLocaleString()} m</strong>
                        <span className="dim-x"> × </span>{rwy.width_m} m
                      </div>
                      <div className="rwy-tags">
                        <span className={`rwy-tag rwy-tag--${surfCls}`}>{rwy.surface}</span>
                        {rwy.pcn && <span className="rwy-tag">PCN {rwy.pcn}</span>}
                      </div>
                      {rwy.notes && <p className="rwy-note">{rwy.notes}</p>}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Frequencies */}
        {a.frequencies?.length ? (
          <div className="ap-card">
            <div className="ap-card-title">Frequencies</div>
            <div className="freq-list">
              {a.frequencies.map(f => {
                const role = f.role.toLowerCase()
                const cls  = ['atis','del','gnd','twr','app','dep','afis','unicom','mf'].includes(role) ? role : 'other'
                return (
                  <div key={f.role + f.freq} className="freq-item">
                    <span className={`freq-role freq-role--${cls}`}>{f.role}</span>
                    <span className="freq-hz">{f.freq} MHz</span>
                  </div>
                )
              })}
            </div>
          </div>
        ) : null}

        {/* Nav aids */}
        {a.nav?.length ? (
          <div className="ap-card">
            <div className="ap-card-title">Navigation Aids</div>
            <div className="nav-list">
              {a.nav.map(n => {
                const unit = n.type.startsWith('NDB') ? 'kHz' : 'MHz'
                return (
                  <div key={n.ident} className="nav-item">
                    <span className="nav-type-tag">{n.type}</span>
                    <span className="nav-ident">{n.ident}</span>
                    <span className="nav-freq-val">{n.freq} {unit}</span>
                    {n.notes && <span className="nav-note">{n.notes}</span>}
                  </div>
                )
              })}
            </div>
          </div>
        ) : null}

        {/* Hours */}
        {a.hours && (
          <div className="ap-card">
            <div className="ap-card-title">Operating Hours</div>
            <div className="hours-body">
              <div className="hours-row">
                <span className={`hours-svc-badge hours-svc-badge--${svcBadge}`}>{a.hours.service}</span>
                <div>
                  <div className="hours-schedule">{a.hours.schedule}</div>
                  {a.hours.notes && <div className="hours-notes">{a.hours.notes}</div>}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Fuel */}
        {a.fuel && (
          <div className="ap-card">
            <div className="ap-card-title">Fuel</div>
            <div className="fuel-body">
              <div className="fuel-pills">
                {[['AVGAS', a.fuel.avgas], ['JET A-1', a.fuel.jet_a1]].map(([label, avail]) => (
                  <div key={String(label)} className={`fuel-pill fuel-pill--${avail ? 'yes' : 'no'}`}>
                    <span className={`fuel-dot fuel-dot--${avail ? 'yes' : 'no'}`} />
                    {label}
                  </div>
                ))}
              </div>
              {a.fuel.notes    && <div className="fuel-supplier">{a.fuel.notes}</div>}
              {a.fuel.supplier && <div className="fuel-supplier">{a.fuel.supplier}</div>}
            </div>
          </div>
        )}

        {/* Services */}
        {a.services && (
          <div className="ap-card">
            <div className="ap-card-title">Handling &amp; Services</div>
            <div className="services-body">
              <div className="services-grid">
                {[
                  ['Customs', a.services.customs],
                  ['De-icing', a.services.deicing],
                  [`Fire Cat. ${a.services.fire_cat || '—'}`, !!a.services.fire_cat],
                ].map(([label, val]) => (
                  <div key={String(label)} className="svc-item">
                    <span className={`svc-check svc-check--${val ? 'yes' : 'no'}`}>{val ? '✓' : '—'}</span>
                    {label}
                  </div>
                ))}
              </div>
              {a.services.slots    && <div className="svc-extra"><strong>Slots:</strong> {a.services.slots}</div>}
              {a.services.handling && <div className="svc-extra"><strong>Handling:</strong> {a.services.handling}</div>}
            </div>
          </div>
        )}

        {/* Remarks */}
        {a.remarks?.length ? (
          <div className="ap-card">
            <div className="ap-card-title">Remarks</div>
            <div className="remarks-body">
              <ul className="remark-list">
                {a.remarks.map((r, i) => (
                  <li key={i} className="remark-item">
                    <span className="remark-dot" aria-hidden="true" />
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : null}

        {/* NOTAMs — client */}
        <NotamCard icao={a.icao} />

        {/* Charts */}
        {a.charts_url && (
          <div className="ap-charts-wrap">
            <a href={a.charts_url} target="_blank" rel="noopener noreferrer" className="ap-charts-btn">
              <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 3h4v1.5H4.5v7h7V10H13v4H3V3Z" fill="currentColor" opacity="0.6"/>
                <path d="M9 2h5v5l-1.5-1.5L8 10 6 8l4.5-4.5L9 2Z" fill="currentColor"/>
              </svg>
              View AIP Charts — {a.icao} on Isavia eAIP
            </a>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="ap-footer">
        <div className="ap-footer-inner">
          <span className="ap-airac">
            <span className="airac-pulse" aria-hidden="true" />
            AIRAC {AIRAC_META.cycle} · {AIRAC_META.effective}
          </span>
          <span className="ap-footer-note">
            <a href={AIRAC_META.source_url} target="_blank" rel="noopener noreferrer">Isavia eAIP</a>
            {' · '}Always verify with current NOTAMs before flight
            {' · '}<a href="https://foxel.is" target="_blank" rel="noopener noreferrer">Foxel</a>
          </span>
        </div>
      </footer>
    </div>
  )
}
