// Validates every entry in airports.js against the Zod schema that mirrors
// src/types/airport.ts. Run via `npm run validate` or automatically as prebuild.
import { z } from 'zod'
import { AIRPORTS } from '../src/data/airports.js'
import { AIRAC_META } from '../src/data/airac-meta.js'
import { validateAiracMeta } from './lib/airac-meta-validation.mjs'

// ── Sub-schemas ────────────────────────────────────────────────────────────

const Runway = z.object({
  id: z.string(),
  length_m: z.number(),
  width_m: z.number(),
  surface: z.string(),
  pcn: z.string().nullable().optional(),
  notes: z.string().nullable().optional(),
})

const Frequency = z.object({
  role: z.string(),
  freq: z.string(),
  label: z.string().optional(),
})

const NavAid = z.object({
  type: z.string(),
  ident: z.string(),
  freq: z.string(),
  notes: z.string().optional(),
})

const Hours = z.object({
  service: z.string(),
  schedule: z.string(),
  notes: z.string().nullable().optional(),
})

const Fuel = z.object({
  avgas: z.boolean(),
  jet_a1: z.boolean(),
  supplier: z.string().nullable().optional(),
  notes: z.string().nullable().optional(),
  hours: z.string().optional(),
})

const FireCat = z.object({
  standard: z.string(),
  reduced: z.string().optional(),
  note: z.string().optional(),
})

const Services = z.object({
  ppr: z.boolean(),
  ppr_phone: z.string().optional(),
  ppr_contact: z.string().optional(),
  customs: z.boolean(),
  deicing: z.boolean(),
  fire_cat: z.union([z.string(), FireCat]).nullable().optional(),
  slots: z.string().optional(),
  handling: z.string().optional(),
})

const Hazard = z.object({
  type: z.enum(['bird', 'volcanic', 'military', 'terrain']),
  description: z.string(),
  season: z.string().optional(),
})

const AirspaceInfo = z.object({
  class: z.string(),
  name: z.string(),
})

const TandGRow = z.object({
  period: z.string(),
  days: z.string(),
  hours: z.string(),
})

const TandGStructured = z.object({
  intro: z.string().optional(),
  rows: z.array(TandGRow),
  notes: z.array(z.string()).optional(),
})

const PilotNotes = z.object({
  circuit_note: z.string().optional(),
  circuit_alt_ft: z.number().nullable().optional(),
  circuit_dir: z.string().nullable().optional(),
  t_and_g: z.union([z.string(), TandGStructured]).optional(),
  entry: z.string().optional(),
  traffic: z.string().optional(),
  sample_call: z.string().optional(),
  tips: z.array(z.string()).optional(),
  departure: z.array(z.string()).optional(),
})

const Airport = z.object({
  icao: z.string().regex(/^BI[A-Z]{2}$/, 'Must be 4 uppercase letters starting with BI'),
  iata: z.string().nullable().optional(),
  name: z.string(),
  name_is: z.string(),
  type: z.enum(['international', 'regional', 'small']),
  highland: z.boolean().optional(),
  city: z.string(),
  region: z.string(),
  elevation_ft: z.number(),
  elevation_m: z.number(),
  lat: z.number(),
  lng: z.number(),
  lat_dms: z.string(),
  lng_dms: z.string(),
  description: z.string().optional(),
  runways: z.array(Runway),
  frequencies: z.array(Frequency).optional(),
  nav: z.array(NavAid).optional(),
  hours: Hours.optional(),
  fuel: Fuel.optional(),
  services: Services.optional(),
  remarks: z.array(z.string()).optional(),
  pilot_notes: PilotNotes.optional(),
  hazards: z.array(Hazard).optional(),
  airspace: AirspaceInfo.optional(),
  charts_url: z.string().optional(),
})

// ── Validation ─────────────────────────────────────────────────────────────

let errorCount = 0

const metaIssues = validateAiracMeta(AIRAC_META)
if (metaIssues.length > 0) {
  errorCount++
  console.error('\n  ❌  AIRAC_META')
  for (const issue of metaIssues) {
    console.error(`       ${issue.path}: ${issue.message}`)
  }
}

for (const ap of AIRPORTS) {
  const result = Airport.safeParse(ap)
  if (!result.success) {
    errorCount++
    const icao = ap.icao ?? '(unknown)'
    console.error(`\n  ❌  ${icao}`)
    for (const issue of result.error.issues) {
      const path = issue.path.length ? issue.path.join('.') : '(root)'
      console.error(`       ${path}: ${issue.message}`)
    }
  }
}

if (errorCount > 0) {
  console.error(`\n  ${errorCount} data validation error(s). Fix before building.\n`)
  process.exit(1)
}

console.log(`  ✓  AIRAC metadata and all ${AIRPORTS.length} airports passed schema validation.`)
