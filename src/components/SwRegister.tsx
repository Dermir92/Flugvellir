'use client'

import { useEffect } from 'react'

export default function SwRegister() {
  useEffect(() => {
    if (!('serviceWorker' in navigator)) return

    // Dev: never run the SW — its cache-first /_next/static/ strategy serves
    // stale assets because dev URLs are not content-hashed. Unregister any
    // SW left over from a previous session so the browser self-heals.
    if (process.env.NODE_ENV !== 'production') {
      navigator.serviceWorker.getRegistrations().then(regs => {
        regs.forEach(r => r.unregister())
      })
      return
    }

    navigator.serviceWorker.register('/sw.js').catch(err => {
      console.warn('SW registration failed:', err)
    })
  }, [])
  return null
}
