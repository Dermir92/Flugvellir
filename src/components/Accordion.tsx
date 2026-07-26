'use client'

import { useId } from 'react'

interface AccordionProps {
  title: string
  preview: string
  open: boolean
  onToggle: () => void
  icon?: React.ReactNode
  badge?: React.ReactNode
  children: React.ReactNode
}

export default function Accordion({ title, preview, open, onToggle, icon, badge, children }: AccordionProps) {
  const uid = useId()
  const bodyId = `${uid}-body`
  const btnId  = `${uid}-btn`

  return (
    <div className={`pn-acc-item${open ? ' pn-acc-item--open' : ''}`}>
      <button
        id={btnId}
        type="button"
        className="pn-acc-header"
        aria-expanded={open}
        aria-controls={bodyId}
        onClick={onToggle}
      >
        {icon && <span className="pn-acc-icon" aria-hidden="true">{icon}</span>}
        <span className="pn-acc-title-wrap">
          <span className="pn-acc-title-row">
            <span className="pn-acc-title">{title}</span>
            {badge}
          </span>
          <span className="pn-acc-preview">{preview}</span>
        </span>
        <span className="pn-acc-chev" aria-hidden="true">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M3 5l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
      </button>
      <div
        id={bodyId}
        className="pn-acc-body-wrap"
        role="region"
        aria-labelledby={btnId}
      >
        <div className="pn-acc-body-inner">
          <div className="pn-acc-body">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
