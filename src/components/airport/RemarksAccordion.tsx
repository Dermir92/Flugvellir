'use client'
import { useState } from 'react'
import Accordion from '@/components/Accordion'

const LIST_ICON = (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <rect x="2" y="1" width="10" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.3"/>
    <line x1="4.5" y1="5" x2="9.5" y2="5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/>
    <line x1="4.5" y1="7.5" x2="9.5" y2="7.5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/>
    <line x1="4.5" y1="10" x2="7.5" y2="10" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/>
  </svg>
)

function truncate(s: string, max = 90): string {
  if (s.length <= max) return s
  const cut = s.lastIndexOf(' ', max)
  return s.slice(0, cut > 0 ? cut : max) + '…'
}

interface RemarksAccordionProps {
  remarks: string[]
}

export default function RemarksAccordion({ remarks }: RemarksAccordionProps) {
  const [open, setOpen] = useState(false)

  const badge = (
    <span className="pn-acc-header-badge">
      {remarks.length} {remarks.length === 1 ? 'remark' : 'remarks'}
    </span>
  )

  return (
    <Accordion
      title="Remarks"
      preview={truncate(remarks[0])}
      open={open}
      onToggle={() => setOpen(o => !o)}
      icon={LIST_ICON}
      badge={badge}
    >
      <ul className="remark-list remark-list--acc">
        {remarks.map((r, i) => (
          <li key={i} className="remark-item">
            <span className="remark-dot" aria-hidden="true" />
            <span>{r}</span>
          </li>
        ))}
      </ul>
    </Accordion>
  )
}
