'use client'

import { useState } from 'react'
import {
  evaluateTrainingOperation,
  type BikfRunway,
  type BirkAircraft,
  type DayKind,
  type TrainingActivity,
  type TrainingAirport,
} from '@/lib/trainingRestrictions'

interface Props {
  icao: TrainingAirport
  airacCycle: string
  airacEffective: string
  sourceRoot: string
}

function sourceUrl(icao: TrainingAirport, root: string): string {
  const file = icao === 'BIKF'
    ? 'BI-AD%20BIKF%20KEFLAV%C3%8DK%20-%20KEFLAVIK%201-is-IS.html#AD-BIKF-KEFLAV%C3%8DK---KEFLAVIK-1'
    : 'BI-AD%20BIRK%20REYKJAV%C3%8DK%20-%20REYKJAVIK%201-is-IS.html#AD-BIRK-REYKJAV%C3%8DK---REYKJAVIK-1'
  return `${root}eAIP/${file}`
}

export default function TrainingOperationsChecker({ icao, airacCycle, airacEffective, sourceRoot }: Props) {
  const [planning, setPlanning] = useState<'' | 'yes' | 'no'>('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [activity, setActivity] = useState<TrainingActivity>('touch-and-go')
  const [bikfRunway, setBikfRunway] = useState<BikfRunway>('unknown')
  const [birkAircraft, setBirkAircraft] = useState<BirkAircraft>('')
  const [dayKind, setDayKind] = useState<DayKind>('normal')
  const [ceiling, setCeiling] = useState('')

  const startCheck = () => {
    const now = new Date()
    if (!date) setDate(now.toISOString().slice(0, 10))
    if (!time) setTime(now.toISOString().slice(11, 16))
    setPlanning('yes')
  }

  const result = evaluateTrainingOperation({
    icao,
    date,
    time,
    activity,
    bikfRunway,
    birkAircraft,
    dayKind,
    ceilingFtMsl: ceiling === '' ? null : Number(ceiling),
  })

  const question = icao === 'BIKF'
    ? 'Are you planning touch-and-goes or a low approach?'
    : 'Are you planning touch-and-goes?'

  return (
    <section className="ap-section training-check" aria-labelledby="training-check-title">
      <div className="ap-section-label">Training operations check</div>
      <div className="training-check-body">
        <div className="training-check-intro">
          <h2 id="training-check-title">{question}</h2>
          <p>Check the planned UTC time against the published {icao} AIP restrictions.</p>
        </div>

        <div className="training-choice" role="group" aria-label={question}>
          <button
            type="button"
            className={`training-choice-btn ${planning === 'yes' ? 'training-choice-btn--active' : ''}`}
            aria-pressed={planning === 'yes'}
            onClick={startCheck}
          >
            Yes, check it
          </button>
          <button
            type="button"
            className={`training-choice-btn ${planning === 'no' ? 'training-choice-btn--active' : ''}`}
            aria-pressed={planning === 'no'}
            onClick={() => setPlanning('no')}
          >
            No
          </button>
        </div>

        {planning === 'no' && (
          <div className="training-result training-result--neutral" role="status">
            <div className="training-result-title">No touch-and-go restriction check needed</div>
            <p>Continue with the normal airport briefing and current NOTAM review.</p>
          </div>
        )}

        {planning === 'yes' && (
          <>
            <div className="training-form-grid">
              {icao === 'BIKF' && (
                <label className="training-field">
                  <span>Activity</span>
                  <select value={activity} onChange={event => setActivity(event.target.value as TrainingActivity)}>
                    <option value="touch-and-go">Touch-and-goes</option>
                    <option value="low-approach">Low approach</option>
                  </select>
                </label>
              )}

              <label className="training-field">
                <span>Date</span>
                <input type="date" value={date} onChange={event => setDate(event.target.value)} />
              </label>

              <label className="training-field">
                <span>Time (UTC)</span>
                <input type="time" value={time} onChange={event => setTime(event.target.value)} />
              </label>

              {icao === 'BIKF' && (
                <label className="training-field">
                  <span>Planned runway</span>
                  <select value={bikfRunway} onChange={event => setBikfRunway(event.target.value as BikfRunway)}>
                    <option value="unknown">Not known yet</option>
                    <option value="01-19">01/19</option>
                    <option value="10-28">10/28</option>
                  </select>
                </label>
              )}

              {icao === 'BIRK' && (
                <>
                  <label className="training-field">
                    <span>Aircraft category</span>
                    <select value={birkAircraft} onChange={event => setBirkAircraft(event.target.value as BirkAircraft)}>
                      <option value="">Choose category</option>
                      <option value="single-under-220">Single-engine, under 220 hp</option>
                      <option value="single-220-plus">Single-engine, 220 hp or more</option>
                      <option value="multi">Multi-engine</option>
                    </select>
                  </label>

                  <label className="training-field">
                    <span>Date type</span>
                    <select value={dayKind} onChange={event => setDayKind(event.target.value as DayKind)}>
                      <option value="normal">Normal date</option>
                      <option value="public-holiday">General public holiday</option>
                      <option value="special-holiday">Special / major holiday</option>
                    </select>
                  </label>

                  <label className="training-field">
                    <span>Ceiling ft MSL (optional)</span>
                    <input
                      type="number"
                      min="0"
                      step="100"
                      inputMode="numeric"
                      placeholder="e.g. 2500"
                      value={ceiling}
                      onChange={event => setCeiling(event.target.value)}
                    />
                  </label>
                </>
              )}
            </div>

            <div className={`training-result training-result--${result.status}`} role="status" aria-live="polite">
              <div className="training-result-kicker">
                {result.status === 'blocked' ? 'STOP' : result.status === 'caution' ? 'CAUTION' : 'CHECK'}
              </div>
              <div className="training-result-title">{result.title}</div>
              <p>{result.summary}</p>

              {result.reasons.length > 0 && (
                <ul className="training-result-list training-result-list--reasons">
                  {result.reasons.map(reason => <li key={reason}>{reason}</li>)}
                </ul>
              )}

              {result.caveats.length > 0 && (
                <ul className="training-result-list">
                  {result.caveats.map(caveat => <li key={caveat}>{caveat}</li>)}
                </ul>
              )}
            </div>

            <p className="training-source">
              Based on {airacCycle}, effective {airacEffective}.{' '}
              <a href={sourceUrl(icao, sourceRoot)} target="_blank" rel="noopener noreferrer">
                {result.aipReference}
              </a>
            </p>
          </>
        )}
      </div>
    </section>
  )
}
