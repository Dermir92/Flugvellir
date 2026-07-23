export function validateAiracMeta(meta) {
  const issues = []

  if (!meta || typeof meta !== 'object') {
    return [{ path: '(root)', message: 'AIRAC metadata must be an object' }]
  }

  const cycleMatch = typeof meta.cycle === 'string'
    ? /^A(\d{2})\/(\d{4})$/.exec(meta.cycle)
    : null
  if (!cycleMatch) {
    issues.push({ path: 'cycle', message: 'Must look like A07/2026' })
  }

  const effectiveIssue = validateIsoDate(meta.effective, 'effective')
  if (effectiveIssue) issues.push(effectiveIssue)

  if (typeof meta.next !== 'string' || meta.next.length === 0) {
    issues.push({ path: 'next', message: 'Required' })
  }

  const nextIsoIssue = validateIsoDate(meta.next_iso, 'next_iso')
  if (nextIsoIssue) issues.push(nextIsoIssue)

  if (
    typeof meta.effective === 'string' &&
    typeof meta.next_iso === 'string' &&
    !effectiveIssue &&
    !nextIsoIssue &&
    meta.next_iso <= meta.effective
  ) {
    issues.push({ path: 'next_iso', message: 'Must be after the current AIRAC effective date' })
  }

  const sourceUrlIssue = validateSourceUrl(meta.source_url)
  if (sourceUrlIssue) issues.push(sourceUrlIssue)

  if (!sourceUrlIssue && cycleMatch && !effectiveIssue) {
    const expectedPath = expectedAiracSourcePath(cycleMatch, meta.effective)
    const actualPath = normalizedUrlPath(meta.source_url)
    if (actualPath !== expectedPath) {
      issues.push({
        path: 'source_url',
        message: `Must match declared AIRAC cycle and effective date: expected path ${expectedPath}`,
      })
    }
  }

  return issues
}

export function assertAiracMeta(meta) {
  const issues = validateAiracMeta(meta)
  if (issues.length > 0) {
    const details = issues.map((issue) => `${issue.path}: ${issue.message}`).join('; ')
    throw new Error(`Invalid AIRAC metadata: ${details}`)
  }
}

function validateIsoDate(value, path) {
  if (typeof value !== 'string' || value.length === 0) {
    return { path, message: 'Must be an ISO date in YYYY-MM-DD format' }
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return { path, message: 'Must be an ISO date in YYYY-MM-DD format' }
  }

  const date = new Date(`${value}T00:00:00.000Z`)
  if (Number.isNaN(date.getTime()) || date.toISOString().slice(0, 10) !== value) {
    return { path, message: 'Must be a real UTC calendar date' }
  }

  return null
}

function validateSourceUrl(value) {
  if (typeof value !== 'string' || value.length === 0) {
    return { path: 'source_url', message: 'Must be a valid URL' }
  }

  try {
    new URL(value)
    return null
  } catch {
    return { path: 'source_url', message: 'Must be a valid URL' }
  }
}

function expectedAiracSourcePath(cycleMatch, effectiveIso) {
  const [, cycleNumber, cycleYear] = cycleMatch
  return `/A_${cycleNumber}-${cycleYear}_${effectiveIso.replaceAll('-', '_')}/`
}

function normalizedUrlPath(value) {
  const url = new URL(value)
  return url.pathname.endsWith('/') ? url.pathname : `${url.pathname}/`
}
