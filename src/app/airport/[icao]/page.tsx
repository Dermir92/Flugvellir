import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { AIRPORTS, AIRAC_META } from '@/data/airports'
import MetarCard from '@/components/airport/MetarCard'
import NotamCard from '@/components/airport/NotamCard'
import StatusCard from '@/components/airport/StatusCard'
import { VfrSection } from '@/components/airport/VfrGuide'
import CircuitDiagram from '@/components/airport/CircuitDiagram'
import AlternatesCard from '@/components/airport/AlternatesCard'
import CrosswindCard from '@/components/airport/CrosswindCard'
import ForecastCard from '@/components/airport/ForecastCard'
import type { Airport } from '@/types/airport'
import type { AltInfo } from '@/components/airport/AlternatesCard'

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

      {/* Status card — full width, first thing pilots see */}
      <div className="ap-status-wrap">
        <StatusCard airport={a} />
      </div>

      {/* Two-column body */}
      <div className="ap-body-grid">

        {/* ── LEFT COLUMN: operational ── */}
        <div className="ap-col">

          {/* Runways */}
          {a.runways?.length > 0 && (
            <div className="ap-card">
              <div className="ap-card-title">Runways</div>
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

          {/* Crosswind calculator — live wind from METAR, manual override for planning */}
          {a.runways?.length > 0 && (
            <CrosswindCard icao={a.icao} runways={a.runways} />
          )}

          {/* Pilot Notes — inline, first-class */}
          <VfrSection airport={a} />

          {/* Remarks — operational knowledge, belongs with pilot notes */}
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

          {/* NOTAMs */}
          <NotamCard icao={a.icao} />

        </div>

        {/* ── RIGHT COLUMN: reference ── */}
        <div className="ap-col">

          {/* METAR / TAF — always shown; ForecastCard self-hides when METAR exists */}
          <MetarCard icao={a.icao} />
          <ForecastCard icao={a.icao} lat={a.lat} lng={a.lng} />

          {/* Alternates — nearest airports with live conditions */}
          <AlternatesCard alternates={alternates} />

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
                    [`Fire Cat. ${a.services.fire_cat || '--'}`, !!a.services.fire_cat],
                  ].map(([label, val]) => (
                    <div key={String(label)} className="svc-item">
                      <span className={`svc-check svc-check--${val ? 'yes' : 'no'}`}>{val ? 'v' : '--'}</span>
                      {label}
                    </div>
                  ))}
                </div>
                {a.services.slots    && <div className="svc-extra"><strong>Slots:</strong> {a.services.slots}</div>}
                {a.services.handling && <div className="svc-extra"><strong>Handling:</strong> {a.services.handling}</div>}
                {a.services.ppr && (
                  <div className="svc-ppr-row">
                    <span className="svc-ppr-label">PPR</span>
                    {a.services.ppr_phone ? (
                      <span className="svc-ppr-info">
                        {a.services.ppr_contact && <span className="svc-ppr-contact">{a.services.ppr_contact} · </span>}
                        <a href={`tel:${a.services.ppr_phone.replace(/\s/g, '')}`} className="svc-ppr-phone">
                          {a.services.ppr_phone}
                        </a>
                      </span>
                    ) : (
                      <span className="svc-ppr-info svc-ppr-info--unpublished">
                        Contact operator — see AIP AD 2.18
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}


        </div>
      </div>

      {/* Charts link */}
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
