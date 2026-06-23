// @ts-expect-error — plain JS data file with no TS declarations
import { AIRPORTS as AIRPORTS_RAW, AIRAC_META as AIRAC_META_RAW } from './airports.js'
import type { Airport, AiracMeta } from '@/types/airport'

export const AIRPORTS = AIRPORTS_RAW as Airport[]
export const AIRAC_META = AIRAC_META_RAW as AiracMeta
