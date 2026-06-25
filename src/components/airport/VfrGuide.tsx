'use client'

import { useEffect, useState } from 'react'
import type { Airport } from '@/types/airport'

function buildVfrContent(a: Airport): string {
  const p    = a.pilot_notes || {}
  const svc  = (a.hours?.service || '').toLowerCase()
  const isAtc  = svc === 'atc'
  const isAfis = svc === 'afis'

  // --- Circuit ---
  let circuitHtml = ''
  if (p.circuit_note) {
    circuitHtml = `<p class="vfr-text">${p.circuit_note}</p>`
  } else if (p.circuit_alt_ft && p.circuit_dir) {
    circuitHtml = `<p class="vfr-text">${p.circuit_dir}-hand pattern at <strong>${p.circuit_alt_ft.toLocaleString()} ft</strong>. Confirm in current AIP charts.</p>`
  } else if (p.circuit_alt_ft === null && p.circuit_dir === null) {
    circuitHtml = `<p class="vfr-text">No standard traffic circuit established at this airfield. Check AIP and NOTAMs before arrival.</p>`
  } else {
    circuitHtml = `<p class="vfr-text">Circuit information not available in this record. Check current AIP charts before flight.</p>`
  }

  // --- Radio Procedures ---
  const radioHtml = p.traffic
    ? `<div class="vfr-section">
        <div class="vfr-section-title">Radio Procedures</div>
        <p class="vfr-text">${p.traffic}</p>
        ${p.sample_call ? `<div class="vfr-sample-call"><span class="vfr-sample-lbl">Sample call:</span> ${p.sample_call}</div>` : ''}
       </div>`
    : ''

  // --- Touch & Go ---
  const tgText = p.t_and_g
    ? p.t_and_g
    : isAtc
      ? 'Request touch-and-go clearance from ATC at your initial radio call. ATC will advise based on traffic.'
      : isAfis
        ? 'Announce touch-and-go intentions on the AFIS frequency. AFIS will advise on known traffic.'
        : 'No ATC — announce all intentions on the MF. Touch and go is generally permitted for VFR flights at uncontrolled airfields.'

  // --- Runway surface notes ---
  const rwyNotes = (a.runways || []).filter(r => r.notes)
  const rwyNotesHtml = rwyNotes.length
    ? `<div class="vfr-section">
        <div class="vfr-section-title">Runway Surface Notes</div>
        <ul class="vfr-tips">${rwyNotes.map(r => `<li><strong>RWY ${r.id}:</strong> ${r.notes}</li>`).join('')}</ul>
       </div>`
    : ''

  // --- Hazards / Tips ---
  const tips = (p.tips && p.tips.length) ? p.tips : (a.remarks || []).slice(0, 3)
  const tipsHtml = tips.length
    ? `<ul class="vfr-tips">${tips.map(t => `<li>${t}</li>`).join('')}</ul>`
    : ''

  // --- Quick-reference row ---
  const primaryFreq = (a.frequencies || []).find(f => !/^atis$/i.test(f.role))
  const fuel = a.fuel
    ? [a.fuel.avgas && 'AVGAS', a.fuel.jet_a1 && 'JET A-1'].filter(Boolean).join(' · ') || 'None'
    : 'Unknown'
  const firecat  = a.services?.fire_cat ? `CAT ${a.services.fire_cat}` : '—'
  const freqLabel = primaryFreq ? `${primaryFreq.role} ${primaryFreq.freq} MHz` : '—'

  return `
    <div class="vfr-section">
      <div class="vfr-section-title">Traffic Circuit</div>
      ${circuitHtml}
    </div>
    ${radioHtml}
    <div class="vfr-section">
      <div class="vfr-section-title">Touch &amp; Go</div>
      <p class="vfr-text">${tgText}</p>
    </div>
    ${rwyNotesHtml}
    ${tipsHtml ? `<div class="vfr-section"><div class="vfr-section-title">Local Hazards &amp; Tips</div>${tipsHtml}</div>` : ''}
    <div class="vfr-section vfr-section--meta">
      <div class="vfr-meta-row"><span class="vfr-meta-lbl">Primary freq</span><span>${freqLabel}</span></div>
      <div class="vfr-meta-row"><span class="vfr-meta-lbl">Fuel</span><span>${fuel}</span></div>
      <div class="vfr-meta-row"><span class="vfr-meta-lbl">Fire CAT</span><span>${firecat}</span></div>
    </div>
    <div class="vfr-disclaimer">
      <strong>Always verify with current AIP charts, NOTAMs, and MET before flight.</strong>
      This guide is for orientation only and does not replace official pre-flight planning.
    </div>
  `
}

const HAZARD_ICON: Record<string, string> = { bird: '🐦', volcanic: '🌋', military: '⚠', terrain: '⛰' }
const HAZARD_COLOR: Record<string, string> = { bird: '#a8d8a8', volcanic: '#f0a060', military: '#f0c84a', terrain: '#e08060' }

export function VfrSection({ airport }: { airport: Airport }) {
  const hasHazards = (airport.hazards?.length ?? 0) > 0
  if (!airport.pilot_notes && !hasHazards && !airport.highland) return null
  return (
    <div className="ap-card ap-card--pilot-notes">
      <div className="ap-card-title">
        Pilot Notes
        <span className="notam-src">AIP-sourced</span>
      </div>
      {airport.highland && (
        <div style={{
          display: 'flex', alignItems: 'flex-start', gap: '10px',
          background: 'transparent', border: '1px solid rgba(240,180,60,0.6)',
          borderRadius: '6px', padding: '11px 14px', marginBottom: '10px',
          fontSize: '12.5px', color: '#f0c84a', lineHeight: '1.5', fontWeight: 600
        }}>
          <span style={{ fontSize: '13px', flexShrink: 0, marginTop: '1px' }}>⚠</span>
          <span>Highland airfield — density altitude, rapidly changing weather, and limited rescue services. Confirm conditions before departure.</span>
        </div>
      )}
      {hasHazards && (
        <div style={{ padding: '14px 18px 0', marginBottom: '0' }}>
          <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.08em', color: '#7099b8', textTransform: 'uppercase', marginBottom: '8px' }}>Hazards</div>
          {airport.hazards!.map((h, i) => (
            <div key={i} style={{
              display: 'flex', gap: '10px', alignItems: 'flex-start',
              padding: '7px 0',
              borderTop: i > 0 ? '1px solid rgba(255,255,255,0.05)' : 'none'
            }}>
              <span style={{ fontSize: '14px', flexShrink: 0, marginTop: '1px' }}>{HAZARD_ICON[h.type] ?? '⚠'}</span>
              <div>
                <div style={{ fontSize: '12px', color: HAZARD_COLOR[h.type] ?? '#c8e0f0', fontWeight: 500, lineHeight: 1.4 }}>{h.description}</div>
                {h.season && <div style={{ fontSize: '11px', color: '#7099b8', marginTop: '3px' }}>{h.season}</div>}
              </div>
            </div>
          ))}
        </div>
      )}
      {airport.pilot_notes && (
        <div
          className="vfr-inline-body"
          dangerouslySetInnerHTML={{ __html: buildVfrContent(airport) }}
        />
      )}
    </div>
  )
}

export function VfrButton({ airport, variant }: { airport: Airport; variant: 'header' | 'hero' }) {
  const [open, setOpen] = useState(false)

  if (!airport.pilot_notes) return null

  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('keydown', handler)
    document.body.classList.add('vfr-modal-open')
    return () => {
      document.removeEventListener('keydown', handler)
      document.body.classList.remove('vfr-modal-open')
    }
  }, [open])

  const btn = variant === 'header'
    ? (
      <button className="ap-hdr-vfr-btn" onClick={() => setOpen(true)}>
        VFR Pilot Guide
      </button>
    )
    : (
      <button className="vfr-guide-btn" onClick={() => setOpen(true)}>
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
              <button className="vfr-close-btn" aria-label="Close" onClick={() => setOpen(false)}>✕</button>
            </div>
            <div
              className="vfr-modal-body"
              dangerouslySetInnerHTML={{ __html: buildVfrContent(airport) }}
            />
          </div>
        </div>
      )}
    </>
  )
}
