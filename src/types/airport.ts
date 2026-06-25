export interface Runway {
  id: string
  length_m: number
  width_m: number
  surface: string
  pcn?: string
  notes?: string
}

export interface Frequency {
  role: string
  freq: string
}

export interface NavAid {
  type: string
  ident: string
  freq: string
  notes?: string
}

export interface Hours {
  service: string
  schedule: string
  notes?: string
}

export interface Fuel {
  avgas: boolean
  jet_a1: boolean
  supplier?: string
  notes?: string
}

export interface Services {
  ppr: boolean
  ppr_phone?: string
  ppr_contact?: string
  customs: boolean
  deicing: boolean
  fire_cat?: string
  slots?: string
  handling?: string
}

export interface Hazard {
  type: 'bird' | 'volcanic' | 'military' | 'terrain'
  description: string
  season?: string
}

export interface AirspaceInfo {
  class: string
  name: string
}

export interface PilotNotes {
  circuit_note?: string
  circuit_alt_ft?: number | null
  circuit_dir?: string | null
  t_and_g?: string
  entry?: string
  traffic?: string
  sample_call?: string
  tips?: string[]
}

export type AirportType = 'international' | 'regional' | 'small'

export interface Airport {
  icao: string
  iata?: string
  name: string
  name_is: string
  type: AirportType
  highland?: boolean
  city: string
  region: string
  elevation_ft: number
  elevation_m: number
  lat: number
  lng: number
  lat_dms: string
  lng_dms: string
  description?: string
  runways: Runway[]
  frequencies?: Frequency[]
  nav?: NavAid[]
  hours?: Hours
  fuel?: Fuel
  services?: Services
  remarks?: string[]
  pilot_notes?: PilotNotes
  hazards?: Hazard[]
  airspace?: AirspaceInfo
  charts_url?: string
}

export interface AiracMeta {
  cycle: string
  effective: string
  next: string
  source_url: string
}
