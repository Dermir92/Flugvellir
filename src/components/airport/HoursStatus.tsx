'use client'
import { useState, useEffect } from 'react'
import type { Hours, DayHours, ScheduleSeason } from '@/types/airport'

function toMins(hhmm: string): number {
  const [h, m] = hhmm.split(':').map(Number)
  return h * 60 + m
}

function getDayHours(
  structured: Record<string, ScheduleSeason>,
  d: Date
): DayHours | null {
  const month = d.getUTCMonth()
  const dow = d.getUTCDay() // 0=Sun … 6=Sat
  for (const season of Object.values(structured)) {
    if (season.months.includes(month)) {
      return season.days[dow] ?? null
    }
  }
  return null
}

type StatusResult =
  | { kind: 'open'; until: string }
  | { kind: 'closed'; opensAt: string; when: 'today' | 'tomorrow' }

function computeStatus(
  structured: Record<string, ScheduleSeason>
): StatusResult | null {
  const now = new Date()
  const cur = now.getUTCHours() * 60 + now.getUTCMinutes()
  const hours = getDayHours(structured, now)
  if (!hours) return null

  const { open, close } = hours
  if (cur >= toMins(open) && cur < toMins(close)) {
    return { kind: 'open', until: close }
  }
  if (cur < toMins(open)) {
    return { kind: 'closed', opensAt: open, when: 'today' }
  }
  const tmr = new Date(now)
  tmr.setUTCDate(tmr.getUTCDate() + 1)
  const tmrHours = getDayHours(structured, tmr)
  if (!tmrHours) return null
  return { kind: 'closed', opensAt: tmrHours.open, when: 'tomorrow' }
}

interface HoursStatusProps {
  hours: Hours
  svcBadge: string
}

export default function HoursStatus({ hours, svcBadge }: HoursStatusProps) {
  const [status, setStatus] = useState<StatusResult | null>(null)
  const [expanded, setExpanded] = useState(false)

  const structured = hours.schedule_structured ?? null

  useEffect(() => {
    if (!structured) return
    setStatus(computeStatus(structured))
    const now = new Date()
    const msToNextMin = (60 - now.getUTCSeconds()) * 1000 - now.getUTCMilliseconds()
    let interval: ReturnType<typeof setInterval>
    const timeout = setTimeout(() => {
      setStatus(computeStatus(structured))
      interval = setInterval(() => setStatus(computeStatus(structured)), 60_000)
    }, msToNextMin)
    return () => { clearTimeout(timeout); clearInterval(interval) }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // No structured data — render the original plain layout
  if (!structured) {
    return (
      <>
        <span className={`ap-sb-svc-badge ap-sb-svc-badge--${svcBadge}`}>{hours.service}</span>
        <div className="ap-sb-hours-sched">{hours.schedule}</div>
        {hours.notes && <div className="ap-sb-hours-note">{hours.notes}</div>}
      </>
    )
  }

  const statusLabel = status === null ? null
    : status.kind === 'open'
    ? `Open until ${status.until}`
    : status.when === 'today'
    ? `Closed · opens at ${status.opensAt}`
    : `Closed · opens tomorrow at ${status.opensAt}`

  return (
    <>
      <div className="ap-sb-hours-top">
        <span className={`ap-sb-svc-badge ap-sb-svc-badge--${svcBadge}`}>{hours.service}</span>
        {statusLabel && (
          <span className={`ap-sb-hours-status ap-sb-hours-status--${status!.kind}`}>
            <span className="ap-sb-hours-dot" aria-hidden="true" />
            {statusLabel}
          </span>
        )}
      </div>
      <button
        type="button"
        className={`ap-sb-hours-toggle${expanded ? ' ap-sb-hours-toggle--open' : ''}`}
        aria-expanded={expanded}
        onClick={() => setExpanded(e => !e)}
      >
        {expanded ? 'Hide hours' : 'See full hours'}
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
          <path d="M2 3.5l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {expanded && (
        <div className="ap-sb-hours-detail">
          <div className="ap-sb-hours-sched">{hours.schedule}</div>
          {hours.notes && <div className="ap-sb-hours-note">{hours.notes}</div>}
        </div>
      )}
    </>
  )
}
