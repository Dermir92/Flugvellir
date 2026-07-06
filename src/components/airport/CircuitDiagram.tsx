import type { Airport } from '@/types/airport'

function parseCircuitDirs(note: string): Map<string, 'L' | 'R'> {
  const dirs = new Map<string, 'L' | 'R'>()

  // "Left-hand for RWY 01 and 31" / "right-hand pattern for RWY 18"
  const re1 = /(left|right)-hand(?:\s+pattern)?\s+for\s+RWY\s+([\d,\s/and]+)/gi
  let m
  while ((m = re1.exec(note)) !== null) {
    const d: 'L' | 'R' = m[1].toLowerCase() === 'left' ? 'L' : 'R'
    const nums = m[2].match(/\d+/g) ?? []
    nums.forEach(n => dirs.set(n.padStart(2, '0'), d))
  }

  // "RWY 05: Left-hand" / "RWY 23: Right-hand"
  const re2 = /RWY\s+(\d+)\s*:\s*(left|right)-hand/gi
  while ((m = re2.exec(note)) !== null) {
    const d: 'L' | 'R' = m[2].toLowerCase() === 'left' ? 'L' : 'R'
    dirs.set(m[1].padStart(2, '0'), d)
  }

  return dirs
}

export default function CircuitDiagram({
  airport,
  runwayId,
}: {
  airport: Airport
  runwayId: string
}) {
  const p = airport.pilot_notes
  if (!p?.circuit_note) return null

  const dirMap = parseCircuitDirs(p.circuit_note)
  const altFt = p.circuit_alt_ft ?? null

  const parts = runwayId.split('/')
  const lo = parts[0].padStart(2, '0')
  const hi = parts[1]?.padStart(2, '0')

  const loDir = dirMap.get(lo)
  const hiDir = hi ? dirMap.get(hi) : undefined

  if (!loDir && !hiDir) return null

  // Canonical direction is the low end's; derive the other if not explicit
  const canonDir: 'L' | 'R' = loDir ?? (hiDir === 'L' ? 'R' : 'L')
  const effectiveHiDir: 'L' | 'R' = hiDir ?? (canonDir === 'L' ? 'R' : 'L')
  const boxAbove = canonDir === 'L'

  const svgH = 110
  const rwyY = 60
  const rwyH = 8
  const rwyX1 = 48
  const rwyX2 = 232
  const rwyMid = (rwyX1 + rwyX2) / 2
  const boxH = 34
  const boxY = boxAbove ? rwyY - boxH - 6 : rwyY + rwyH + 6

  // Hex, not var(--token): these feed SVG presentation attributes (fill=/stroke=),
  // which don't parse var(). Values mirror --navy, --glacier + diagram-only shades.
  const cRunway = '#0f2a45'
  const cBox = '#7ecff5'
  const cNum = '#1a3a5c'
  const cLabel = '#2a6a9a'
  const cAlt = '#4a7a9a'

  return (
    <div style={{ marginTop: 10 }}>
      <svg
        viewBox={`0 0 280 ${svgH}`}
        style={{ width: '100%', maxWidth: 280, display: 'block' }}
        aria-hidden="true"
      >
        {/* Circuit box */}
        <rect
          x={rwyX1}
          y={boxY}
          width={rwyX2 - rwyX1}
          height={boxH}
          fill="rgba(126,207,245,0.07)"
          stroke={cBox}
          strokeWidth="1.5"
          strokeDasharray="5,3"
          rx="3"
        />

        {/* Runway strip */}
        <rect x={rwyX1} y={rwyY} width={rwyX2 - rwyX1} height={rwyH} rx="2" fill={cRunway} />

        {/* Centerline dashes */}
        {Array.from({ length: 5 }, (_, i) => (
          <rect
            key={i}
            x={rwyX1 + 20 + i * 32}
            y={rwyY + 3}
            width={18}
            height={2}
            rx="1"
            fill="white"
            opacity={0.4}
          />
        ))}

        {/* Runway end numbers */}
        <text
          x={rwyX1 - 6}
          y={rwyY + rwyH / 2}
          textAnchor="end"
          dominantBaseline="middle"
          fontSize="13"
          fontWeight="700"
          fill={cNum}
        >
          {parts[0]}
        </text>
        {parts[1] && (
          <text
            x={rwyX2 + 6}
            y={rwyY + rwyH / 2}
            textAnchor="start"
            dominantBaseline="middle"
            fontSize="13"
            fontWeight="700"
            fill={cNum}
          >
            {parts[1]}
          </text>
        )}

        {/* LH/RH labels inside box */}
        <text
          x={rwyX1 + 7}
          y={boxAbove ? boxY + boxH - 7 : boxY + 14}
          fontSize="10"
          fontWeight="700"
          fill={cLabel}
        >
          {canonDir === 'L' ? 'LH' : 'RH'}
        </text>
        {parts[1] && (
          <text
            x={rwyX2 - 7}
            y={boxAbove ? boxY + boxH - 7 : boxY + 14}
            textAnchor="end"
            fontSize="10"
            fontWeight="700"
            fill={cLabel}
          >
            {effectiveHiDir === 'L' ? 'LH' : 'RH'}
          </text>
        )}

        {/* Altitude label */}
        {altFt && (
          <text
            x={rwyMid}
            y={svgH - 4}
            textAnchor="middle"
            fontSize="10"
            fill={cAlt}
            fontWeight="600"
          >
            Circuit altitude {altFt.toLocaleString()} ft MSL
          </text>
        )}
      </svg>
    </div>
  )
}
