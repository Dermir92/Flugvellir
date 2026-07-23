import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { AIRPORTS, AIRAC_META } from '@/data/airports'
import { formatAiracEffectiveDateEn } from '@/lib/airacMeta'
import MetarCard from '@/components/airport/MetarCard'
import NotamCard from '@/components/airport/NotamCard'
import StatusCard from '@/components/airport/StatusCard'
import { VfrSection } from '@/components/airport/VfrGuide'
import CircuitDiagram from '@/components/airport/CircuitDiagram'
import AlternatesCard from '@/components/airport/AlternatesCard'
import CrosswindCard from '@/components/airport/CrosswindCard'
import ForecastCard from '@/components/airport/ForecastCard'
import SunCard from '@/components/airport/SunCard'
import TrainingOperationsChecker from '@/components/airport/TrainingOperationsChecker'
import type { Airport, FireCat } from '@/types/airport'
import type { AltInfo } from '@/components/airport/AlternatesCard'

function fireCatLabel(fc: string | FireCat | null | undefined): string {
  if (!fc) return 'Fire CAT —'
  if (typeof fc === 'string') return `Fire CAT ${fc}`
  return fc.reduced ? `Fire CAT ${fc.standard}/${fc.reduced}` : `Fire CAT ${fc.standard}`
}

function getAlternates(from: Airport, all: Airport[], count = 3): AltInfo[] {
  const R = 6371
  return all
    .filter(a => a.icao !== from.icao)
    .map(a => {
      const dLat = (a.lat - from.lat) * Math.PI / 180
      const dLng = (a.lng - from.lng) * Math.PI / 180
      const lat1 = from.lat * Math.PI / 180
      const lat2 = a.lat * Math.PI / 180
      const x = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2
      const distNm = Math.round(R * 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x)) * 0.539957)
      return { icao: a.icao, name: a.name, distNm }
    })
    .sort((a, b) => a.distNm - b.distNm)
    .slice(0, count)
}

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

  const svcBadge = a.hours?.service.toLowerCase() === 'atc'  ? 'atc'
                 : a.hours?.service.toLowerCase() === 'afis' ? 'afis' : 'other'
  const alternates = getAlternates(a, AIRPORTS)
  const hasFuel = a.fuel?.avgas || a.fuel?.jet_a1
  const airacEffective = formatAiracEffectiveDateEn(AIRAC_META.effective)

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
        {a.highland && <span className="ap-hdr-badge ap-hdr-badge--highland">Highland</span>}
        {a.airspace && <span className="ap-hdr-badge ap-hdr-badge--airspace">{a.airspace.name} · Class {a.airspace.class}</span>}
        <span className="ap-hdr-region">{a.region} · {a.elevation_ft} ft AMSL</span>
      </header>

      {/* Dashboard */}
      <div className="ap-dashboard">

        {/* ── SIDEBAR ── */}
        <aside className="ap-sidebar">
          <div className="ap-sb-inner">

            {/* Identity */}
            <div className="ap-sb-identity">
              <div className="ap-sb-icao">{a.icao}{a.iata ? ` · ${a.iata}` : ''}</div>
              <div className="ap-sb-name">{a.name}</div>
              <div className="ap-sb-meta">
                <span>{a.region}</span>
                <span>{a.elevation_ft} ft · {a.elevation_m} m AMSL</span>
                {a.lat_dms && <span className="ap-sb-coords">{a.lat_dms} {a.lng_dms}</span>}
              </div>
              <div className="ap-sb-badges">
                <span className={`ap-hdr-badge ap-hdr-badge--${a.type}`}>{typeLabel(a.type)}</span>
                {a.highland && <span className="ap-hdr-badge ap-hdr-badge--highland">Highland</span>}
                {a.airspace && <span className="ap-hdr-badge ap-hdr-badge--airspace">Class {a.airspace.class}</span>}
              </div>
            </div>

            {/* Description */}
            {a.description && (
              <div className="ap-sb-section">
                <p className="ap-sb-desc">{a.description}</p>
              </div>
            )}

            {/* Frequencies */}
            {a.frequencies?.length ? (
              <div className="ap-sb-section">
                <div className="ap-sb-label">Frequencies</div>
                {a.frequencies.map(f => {
                  const role = f.role.toLowerCase()
                  const cls = ['atis','del','gnd','twr','app','dep','afis','unicom','mf'].includes(role) ? role : 'other'
                  return (
                    <div key={f.role + f.freq} className="ap-sb-freq">
                      <span className={`ap-sb-freq-role ap-sb-freq-role--${cls}`}>{f.label ?? f.role}</span>
                      <span className="ap-sb-freq-hz">{f.freq} <span className="ap-sb-freq-unit">MHz</span></span>
                    </div>
                  )
                })}
              </div>
            ) : null}

            {/* Nav aids */}
            {a.nav?.length ? (
              <div className="ap-sb-section">
                <div className="ap-sb-label">Navigation Aids</div>
                {a.nav.map(n => {
                  const unit = n.type.startsWith('NDB') ? 'kHz' : 'MHz'
                  return (
                    <div key={n.ident} className="ap-sb-nav">
                      <span className="ap-sb-nav-type">{n.type}</span>
                      <span className="ap-sb-nav-ident">{n.ident}</span>
                      <span className="ap-sb-nav-freq">{n.freq} {unit}</span>
                    </div>
                  )
                })}
              </div>
            ) : null}

            {/* Operating hours */}
            {a.hours && (
              <div className="ap-sb-section">
                <div className="ap-sb-label">Operating Hours</div>
                <span className={`ap-sb-svc-badge ap-sb-svc-badge--${svcBadge}`}>{a.hours.service}</span>
                <div className="ap-sb-hours-sched">{a.hours.schedule}</div>
                {a.hours.notes && <div className="ap-sb-hours-note">{a.hours.notes}</div>}
              </div>
            )}

            {/* Fuel */}
            {a.fuel && (
              <div className="ap-sb-section">
                <div className="ap-sb-label">Fuel</div>
                <div className="ap-sb-fuel-pills">
                  {[['AVGAS', a.fuel.avgas], ['JET A-1', a.fuel.jet_a1]].map(([label, avail]) => (
                    <span key={String(label)} className={`ap-sb-fuel-pill ap-sb-fuel-pill--${avail ? 'yes' : 'no'}`}>
                      {label}
                    </span>
                  ))}
                </div>
                {!hasFuel && <div className="ap-sb-fuel-none">No fuel on field</div>}
                {a.fuel.supplier && <div className="ap-sb-fuel-note">{a.fuel.supplier}</div>}
                {a.fuel.notes    && <div className="ap-sb-fuel-note">{a.fuel.notes}</div>}
              </div>
            )}

            {/* Services */}
            {a.services && (
              <div className="ap-sb-section">
                <div className="ap-sb-label">Services</div>
                <div className="ap-sb-svc-chips">
                  {[
                    ['Customs',   a.services.customs],
                    ['De-icing',  a.services.deicing],
                    [fireCatLabel(a.services.fire_cat), !!a.services.fire_cat],
                  ].map(([label, val]) => (
                    <span key={String(label)} className={`ap-sb-svc-chip ap-sb-svc-chip--${val ? 'yes' : 'no'}`}>
                      {label}
                    </span>
                  ))}
                </div>
                {a.services.handling && (
                  <div className="ap-sb-svc-note">{a.services.handling}</div>
                )}
                {a.services.ppr && (
                  <div className="ap-sb-ppr">
                    {a.services.ppr_contact && (
                      <div className="ap-sb-ppr-contact">{a.services.ppr_contact}</div>
                    )}
                    {a.services.ppr_phone ? (
                      <a href={`tel:${a.services.ppr_phone.replace(/\s/g,'')}`} className="ap-sb-ppr-phone">
                        {a.services.ppr_phone}
                      </a>
                    ) : (
                      <div className="ap-sb-ppr-contact" style={{fontStyle:'italic'}}>See AIP AD 2.18</div>
                    )}
                  </div>
                )}
                {a.services.slots && (
                  <div className="ap-sb-svc-note"><strong>Slots:</strong> {a.services.slots}</div>
                )}
              </div>
            )}

            {/* Charts */}
            {a.charts_url && (
              <div className="ap-sb-section ap-sb-section--last">
                <a href={a.charts_url} target="_blank" rel="noopener noreferrer" className="ap-sb-charts">
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M3 3h4v1.5H4.5v7h7V10H13v4H3V3Z" fill="currentColor" opacity="0.6"/>
                    <path d="M9 2h5v5l-1.5-1.5L8 10 6 8l4.5-4.5L9 2Z" fill="currentColor"/>
                  </svg>
                  AIP Charts — Isavia eAIP
                </a>
                <div className="ap-sb-airac">
                  <span className="airac-pulse" aria-hidden="true" />
                  AIRAC {AIRAC_META.cycle} · {airacEffective}
                </div>
              </div>
            )}

          </div>
        </aside>

        {/* ── MAIN CONTENT ── */}
        <div className="ap-content">

          {/* Weather status + crosswind — first thing pilots see */}
          <StatusCard airport={a} />

          {/* Daylight times — critical for VFR planning */}
          <SunCard lat={a.lat} lng={a.lng} />

          {/* Pilot notes — core operational content */}
          <VfrSection airport={a} />

          {/* Published training restrictions for the two controlled training airports */}
          {(a.icao === 'BIKF' || a.icao === 'BIRK') && (
            <TrainingOperationsChecker
              icao={a.icao}
              airacCycle={AIRAC_META.cycle}
              airacEffective={airacEffective}
              sourceRoot={AIRAC_META.source_url}
            />
          )}

          {/* Runways */}
          {a.runways?.length > 0 && (
            <div className="ap-section">
              <div className="ap-section-label">Runways</div>
              <div className="runways-grid">
                {a.runways.map(rwy => {
                  const [lo, hi] = rwy.id.split('/')
                  const surfCls = rwy.surface.toLowerCase().includes('gravel') ? 'gravel' : 'asphalt'
                  return (
                    <div key={rwy.id}>
                      <div className="rwy-card">
                        <div className="rwy-visual" aria-hidden="true">
                          <span className="rwy-end-num">{lo}</span>
                          <div className="rwy-strip"><div className="rwy-cl" /></div>
                          <span className="rwy-end-num">{hi || ''}</span>
                        </div>
                        <div className="rwy-info">
                          <div className="rwy-id-label">{rwy.id}</div>
                          <div className="rwy-dims-row">
                            <strong>{rwy.length_m.toLocaleString()} m</strong>
                            <span className="dim-x"> x </span>{rwy.width_m} m
                          </div>
                          <div className="rwy-tags">
                            <span className={`rwy-tag rwy-tag--${surfCls}`}>{rwy.surface}</span>
                            {rwy.pcn && <span className="rwy-tag">PCN {rwy.pcn}</span>}
                          </div>
                          {rwy.notes && <p className="rwy-note">{rwy.notes}</p>}
                        </div>
                      </div>
                      <CircuitDiagram airport={a} runwayId={rwy.id} />
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Crosswind calculator */}
          {a.runways?.length > 0 && (
            <CrosswindCard icao={a.icao} runways={a.runways} />
          )}

          {/* METAR / TAF */}
          <MetarCard icao={a.icao} />
          <ForecastCard icao={a.icao} lat={a.lat} lng={a.lng} />

          {/* Alternates */}
          <AlternatesCard alternates={alternates} />

          {/* Remarks */}
          {a.remarks?.length ? (
            <div className="ap-section">
              <div className="ap-section-label">Remarks</div>
              <ul className="remark-list">
                {a.remarks.map((r, i) => (
                  <li key={i} className="remark-item">
                    <span className="remark-dot" aria-hidden="true" />
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {/* NOTAMs */}
          <NotamCard icao={a.icao} />

        </div>
      </div>

      {/* Footer */}
      <footer className="ap-footer">
        <div className="ap-footer-inner">
          <span className="ap-airac">
            <span className="airac-pulse" aria-hidden="true" />
            AIRAC {AIRAC_META.cycle} · {airacEffective}
          </span>
          <span className="ap-footer-note">
            <a href={AIRAC_META.source_url} target="_blank" rel="noopener noreferrer">Isavia eAIP</a>
            {' · '}Always verify with current NOTAMs before flight
            {' · '}<a href="https://foxel.is" target="_blank" rel="noopener noreferrer">Foxel</a>
            {' · '}<Link href="/skilmalar">Skilmálar</Link>
          </span>
        </div>
      </footer>
    </div>
  )
}
