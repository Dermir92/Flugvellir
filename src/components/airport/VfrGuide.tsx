'use client'

import { useEffect, useRef, useState } from 'react'
import type { Airport, FireCat, TandGStructured } from '@/types/airport'
import { AIRAC_META } from '@/data/airports'
import { formatAiracEffectiveDateIs } from '@/lib/airacMeta'

// VFR pilots call TWR first, then AFIS at non-ATC fields, then MF/CTAF at uncontrolled
const VFR_CALL_PRIORITY = ['TWR', 'AFIS', 'MF', 'CTAF', 'APP']

const HAZARD_ICON: Record<string, string> = { bird: '🐦', volcanic: '🌋', military: '⚠', terrain: '⛰' }
const HAZARD_COLOR: Record<string, string> = { bird: 'var(--hazard-bird)', volcanic: 'var(--hazard-volcanic)', military: 'var(--gold)', terrain: 'var(--hazard-terrain)' }

function VfrContent({ airport }: { airport: Airport }) {
  const a = airport
  const p = a.pilot_notes || {}
  const svc    = (a.hours?.service || '').toLowerCase()
  const isAtc  = svc === 'atc'
  const isAfis = svc === 'afis'

  // --- Circuit ---
  let circuitBody: React.ReactNode
  if (p.circuit_note) {
    circuitBody = <p className="vfr-card-text">{p.circuit_note}</p>
  } else if (p.circuit_alt_ft != null && p.circuit_dir != null) {
    circuitBody = (
      <>
        <div className="vfr-circuit-row">
          <div className="vfr-circuit-chip">{p.circuit_dir}-hand</div>
          <div className="vfr-circuit-alt">{(p.circuit_alt_ft as number).toLocaleString()} ft</div>
        </div>
        <p className="vfr-card-sub">Confirm in current AIP charts before flight.</p>
      </>
    )
  } else if (p.circuit_alt_ft === null && p.circuit_dir === null) {
    circuitBody = <p className="vfr-card-text">No standard traffic circuit established. Check AIP and NOTAMs before arrival.</p>
  } else {
    circuitBody = <p className="vfr-card-text">Circuit information not on record. Check current AIP charts.</p>
  }

  // --- T&G ---
  const tgHasCustom = !!p.t_and_g
  const tgIsStructured = tgHasCustom && typeof p.t_and_g === 'object'
  const tgStatus = tgHasCustom
    ? (isAtc ? 'ATC — SEE BELOW' : isAfis ? 'AFIS — SEE BELOW' : 'RESTRICTED')
    : isAtc ? 'REQUEST ATC' : isAfis ? 'ANNOUNCE' : 'PERMITTED'
  const tgStatusCls = tgHasCustom && !isAtc && !isAfis
    ? 'vfr-tg-chip--restricted'
    : isAtc ? 'vfr-tg-chip--atc' : isAfis ? 'vfr-tg-chip--afis' : 'vfr-tg-chip--open'
  const tgPlainText = !tgHasCustom
    ? (isAtc
        ? 'Request touch-and-go clearance from ATC at your initial radio call. ATC will advise based on traffic.'
        : isAfis
          ? 'Announce touch-and-go intentions on the AFIS frequency. AFIS will advise on known traffic.'
          : 'No ATC. Announce all intentions on the MF. Touch and go is generally permitted for VFR flights at uncontrolled airfields.')
    : typeof p.t_and_g === 'string' ? p.t_and_g : null

  // --- Runway notes ---
  const rwyNotes = (a.runways || []).filter(r => r.notes)

  // --- Tips ---
  const tips = (p.tips && p.tips.length) ? p.tips : (a.remarks || []).slice(0, 3)

  // --- Quick-reference row ---
  const freqs = a.frequencies || []
  const primaryFreq =
    VFR_CALL_PRIORITY.map(role => freqs.find(f => f.role.toUpperCase() === role)).find(Boolean) ??
    freqs.find(f => !/^atis$/i.test(f.role))
  const fuel = a.fuel
    ? [a.fuel.avgas && 'AVGAS', a.fuel.jet_a1 && 'JET A-1'].filter(Boolean).join(' · ') || 'None'
    : 'Unknown'
  const fuelHours = a.fuel?.hours ?? null
  const fc = a.services?.fire_cat
  const firecat = fc
    ? typeof fc === 'string'
      ? `CAT ${fc}`
      : fc.reduced ? `CAT ${fc.standard} / ${fc.reduced}` : `CAT ${fc.standard}`
    : '—'
  const firecatNote = fc && typeof fc === 'object' ? (fc as FireCat).note ?? null : null
  const freqLabel = primaryFreq ? `${primaryFreq.role} ${primaryFreq.freq} MHz` : '—'
  const chartsUrl = `${AIRAC_META.source_url}html/eAIP/IS-AD-2.${a.icao}-en-GB.html`

  return (
    <div className="vfr-cards">
      <div className="vfr-card">
        <div className="vfr-card-label">Circuit</div>
        {circuitBody}
      </div>

      {p.entry && (
        <div className="vfr-card">
          <div className="vfr-card-label">
            Entry
            <a
              href={chartsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="vfr-charts-link"
              title="Open AD-2 charts in eAIP"
            >
              AD-2 Charts ↗
            </a>
          </div>
          <p className="vfr-card-text">{p.entry}</p>
        </div>
      )}

      {p.departure && p.departure.length > 0 && (
        <div className="vfr-card">
          <div className="vfr-card-label">Departure</div>
          <ul className="vfr-card-list">
            {p.departure.map((d, i) => <li key={i}>{d}</li>)}
          </ul>
        </div>
      )}

      {p.traffic && (
        <div className="vfr-card">
          <div className="vfr-card-label">Radio</div>
          <p className="vfr-card-text">{p.traffic}</p>
        </div>
      )}

      <div className="vfr-card">
        <div className="vfr-card-label">Touch &amp; Go</div>
        <div className={`vfr-tg-chip ${tgStatusCls}`}>{tgStatus}</div>
        {tgIsStructured ? (() => {
          const tg = p.t_and_g as TandGStructured
          return (
            <>
              {tg.intro && <p className="vfr-tg-intro">{tg.intro}</p>}
              <table className="vfr-tg-table">
                <thead>
                  <tr>
                    <th>Season</th>
                    <th>Days</th>
                    <th>Hours (local)</th>
                  </tr>
                </thead>
                <tbody>
                  {tg.rows.map((row, i) => {
                    const isNo = /not permitted/i.test(row.hours)
                    return (
                      <tr key={i}>
                        <td>{row.period}</td>
                        <td>{row.days}</td>
                        <td className={`tg-hours${isNo ? ' tg-hours--no' : ''}`}>{row.hours}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
              {tg.notes && tg.notes.length > 0 && (
                <ul className="vfr-card-list">
                  {tg.notes.map((n, i) => <li key={i}>{n}</li>)}
                </ul>
              )}
            </>
          )
        })() : (
          <p className="vfr-card-text">{tgPlainText}</p>
        )}
      </div>

      {rwyNotes.length > 0 && (
        <div className="vfr-card">
          <div className="vfr-card-label">Runway Notes</div>
          <ul className="vfr-card-list">
            {rwyNotes.map((r, i) => (
              <li key={i}><strong>RWY {r.id}:</strong> {r.notes}</li>
            ))}
          </ul>
        </div>
      )}

      {tips.length > 0 && (
        <div className="vfr-card">
          <div className="vfr-card-label">Local Tips</div>
          <ul className="vfr-card-list">
            {tips.map((tip, i) => <li key={i}>{tip}</li>)}
          </ul>
        </div>
      )}

      <div className="vfr-section vfr-section--meta">
        <div className="vfr-meta-row">
          <span className="vfr-meta-lbl">First call</span>
          <span>{freqLabel}</span>
        </div>
        <div className="vfr-meta-row">
          <span className="vfr-meta-lbl">Fuel</span>
          <span className="vfr-meta-val">
            <span>{fuel}</span>
            {fuelHours && <span className="vfr-meta-note">{fuelHours}</span>}
          </span>
        </div>
        <div className="vfr-meta-row">
          <span className="vfr-meta-lbl">Fire CAT</span>
          <span className="vfr-meta-val">
            <span>{firecat}</span>
            {firecatNote && <span className="vfr-meta-note">{firecatNote}</span>}
          </span>
        </div>
      </div>

      <div className="vfr-disclaimer">
        <strong>Always verify with current AIP charts, NOTAMs, and MET before flight.</strong>{' '}
        This guide is for orientation only and does not replace official pre-flight planning.
      </div>
    </div>
  )
}

export function VfrSection({ airport }: { airport: Airport }) {
  const hasHazards = (airport.hazards?.length ?? 0) > 0
  if (!airport.pilot_notes && !hasHazards && !airport.highland) return null
  const airacEffective = formatAiracEffectiveDateIs(AIRAC_META.effective)
  return (
    <div className="ap-card ap-card--pilot-notes">
      <div className="ap-card-title">
        Pilot Notes
        <a
          href={AIRAC_META.source_url}
          target="_blank"
          rel="noopener noreferrer"
          className="notam-src"
          style={{ textDecoration: 'none' }}
          title={`Isavia eAIP — effective ${airacEffective}`}
        >
          eAIP {AIRAC_META.cycle}
        </a>
      </div>
      {airport.highland && (
        <div style={{
          display: 'flex', alignItems: 'flex-start', gap: '10px',
          background: 'transparent', border: '1px solid rgba(200,140,80,0.5)',
          borderRadius: '6px', padding: '11px 14px', marginBottom: '10px',
          fontSize: '12.5px', color: 'var(--caution-soft)', lineHeight: '1.5', fontWeight: 600
        }}>
          <span style={{ fontSize: '13px', flexShrink: 0, marginTop: '1px' }}>⚠</span>
          <span>Highland airfield — density altitude, rapidly changing weather, and limited rescue services. Confirm conditions before departure.</span>
        </div>
      )}
      {hasHazards && (
        <div style={{ padding: '14px 18px 0', marginBottom: '0' }}>
          <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.08em', color: 'var(--dark-text-dim)', textTransform: 'uppercase', marginBottom: '8px' }}>Hazards</div>
          {airport.hazards!.map((h, i) => (
            <div key={i} style={{
              display: 'flex', gap: '10px', alignItems: 'flex-start',
              padding: '7px 0',
              borderTop: i > 0 ? '1px solid rgba(255,255,255,0.05)' : 'none'
            }}>
              <span style={{ fontSize: '14px', flexShrink: 0, marginTop: '1px' }}>{HAZARD_ICON[h.type] ?? '⚠'}</span>
              <div>
                <div style={{ fontSize: '12px', color: HAZARD_COLOR[h.type] ?? 'var(--hazard-default)', fontWeight: 500, lineHeight: 1.4 }}>{h.description}</div>
                {h.season && <div style={{ fontSize: '11px', color: 'var(--dark-text-dim)', marginTop: '3px' }}>{h.season}</div>}
              </div>
            </div>
          ))}
        </div>
      )}
      {airport.pilot_notes && (
        <div className="vfr-inline-body">
          <VfrContent airport={airport} />
        </div>
      )}
    </div>
  )
}

export function VfrButton({ airport, variant }: { airport: Airport; variant: 'header' | 'hero' }) {
  const [open, setOpen] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const closeRef   = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return
    closeRef.current?.focus()
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('keydown', handler)
    document.body.classList.add('vfr-modal-open')
    return () => {
      document.removeEventListener('keydown', handler)
      document.body.classList.remove('vfr-modal-open')
      triggerRef.current?.focus()
    }
  }, [open])

  if (!airport.pilot_notes) return null

  const btn = variant === 'header'
    ? (
      <button ref={triggerRef} className="ap-hdr-vfr-btn" onClick={() => setOpen(true)}>
        VFR Pilot Guide
      </button>
    )
    : (
      <button ref={triggerRef} className="vfr-guide-btn" onClick={() => setOpen(true)}>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.3"/>
          <line x1="7" y1="6" x2="7" y2="10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
          <circle cx="7" cy="4.2" r="0.7" fill="currentColor"/>
        </svg>
        VFR Pilot Guide
      </button>
    )

  return (
    <>
      {btn}
      {open && (
        <div
          className="vfr-modal-overlay"
          onClick={e => { if (e.target === e.currentTarget) setOpen(false) }}
        >
          <div className="vfr-modal" role="dialog" aria-modal="true" aria-label="VFR Pilot Guide">
            <div className="vfr-modal-header">
              <div>
                <div className="vfr-modal-title">VFR Pilot Guide</div>
                <div className="vfr-modal-subtitle">{airport.icao} · {airport.name}</div>
              </div>
              <button ref={closeRef} className="vfr-close-btn" aria-label="Close" onClick={() => setOpen(false)}>✕</button>
            </div>
            <div className="vfr-modal-body">
              <VfrContent airport={airport} />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
