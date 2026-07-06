import type { Metadata } from 'next'
import { Barlow_Condensed, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import SwRegister from '@/components/SwRegister'
import './globals.css'

const barlowCondensed = Barlow_Condensed({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
  variable: '--font-barlow-condensed',
  display: 'swap',
})

const inter = Inter({
  weight: ['300', '400', '500', '600'],
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Flugvellir — Íslenzkir flugvellir á einum stað',
  description: 'Interactive map of Icelandic airports and airfields with AIP data. Made for pilots and aviation enthusiasts.',
  manifest: '/manifest.json',
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${barlowCondensed.variable} ${inter.variable}`}>
      <body className="antialiased">
        {children}
        <SwRegister />
        <Analytics />
      </body>
    </html>
  )
}
