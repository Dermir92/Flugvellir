// Flugvellir service worker — offline cache for airport pages and METAR/NOTAM data.
// Staleness design: stale weather served as fresh is a hazard.
// Strategy: METAR/NOTAM responses cached from the network carry an X-SW-Cached-At
// timestamp header. When served from cache (offline), MetarCard reads this header
// and shows a visible warning with the data age. Fresh network responses never carry
// this header, so no warning is shown on a live connection.

const SHELL_CACHE  = 'flv-shell-v1'   // Airport HTML pages, homepage
const API_CACHE    = 'flv-api-v1'     // METAR and NOTAM API responses
const STATIC_CACHE = 'flv-static-v1'  // /_next/static/* immutable assets

const ALL_CACHES = [SHELL_CACHE, API_CACHE, STATIC_CACHE]

// ── Lifecycle ────────────────────────────────────────────────────────────────

self.addEventListener('install', () => {
  // Take over immediately — no need to wait for old tabs to close.
  self.skipWaiting()
})

self.addEventListener('activate', event => {
  event.waitUntil(
    Promise.all([
      self.clients.claim(),
      // Delete caches from previous versions.
      caches.keys().then(keys =>
        Promise.all(keys.filter(k => !ALL_CACHES.includes(k)).map(k => caches.delete(k)))
      ),
    ])
  )
})

// ── Fetch routing ────────────────────────────────────────────────────────────

self.addEventListener('fetch', event => {
  const { request } = event
  const url = new URL(request.url)

  // Only handle GET requests to our own origin.
  if (request.method !== 'GET' || url.origin !== self.location.origin) return

  const path = url.pathname

  // Next.js immutable static assets (content-hashed filenames) — cache-first.
  if (path.startsWith('/_next/static/')) {
    event.respondWith(cacheFirst(request, STATIC_CACHE))
    return
  }

  // Weather and NOTAM data — network-first with stamped cache fallback.
  if (path.startsWith('/api/metar/') || path.startsWith('/api/notam')) {
    event.respondWith(networkFirstApi(request))
    return
  }

  // Airport pages and nearest view — stale-while-revalidate (instant load from cache, silent update).
  if (path.startsWith('/airport/') || path === '/nearest') {
    event.respondWith(staleWhileRevalidate(request, SHELL_CACHE))
    return
  }

  // Homepage — network-first with cache fallback.
  if (path === '/') {
    event.respondWith(networkFirst(request, SHELL_CACHE))
    return
  }
})

// ── Cache strategies ─────────────────────────────────────────────────────────

async function cacheFirst(request, cacheName) {
  const cached = await caches.match(request)
  if (cached) return cached
  const response = await fetch(request)
  if (response.ok) {
    const cache = await caches.open(cacheName)
    cache.put(request, response.clone())
  }
  return response
}

async function networkFirst(request, cacheName) {
  const cache = await caches.open(cacheName)
  try {
    const response = await fetch(request)
    if (response.ok) cache.put(request, response.clone())
    return response
  } catch {
    return (await cache.match(request)) ??
      new Response('Offline', { status: 503 })
  }
}

// Network-first for API routes. On network success the response is stored in
// cache with an X-SW-Cached-At timestamp header. The original (un-stamped)
// response is returned to the page so MetarCard sees no header on live data.
// On network failure the stamped cached response is returned — MetarCard reads
// the header and shows a staleness warning.
async function networkFirstApi(request) {
  const cache = await caches.open(API_CACHE)
  try {
    const response = await fetch(request)
    if (response.ok) {
      const body    = await response.clone().arrayBuffer()
      const headers = new Headers(response.headers)
      headers.set('X-SW-Cached-At', Date.now().toString())
      cache.put(request, new Response(body, {
        status: response.status,
        statusText: response.statusText,
        headers,
      }))
    }
    return response  // Fresh — no X-SW-Cached-At header visible to the page.
  } catch {
    // Offline — return cached response (which carries X-SW-Cached-At).
    return (await cache.match(request)) ??
      new Response(JSON.stringify({ offline: true }), {
        status: 503,
        headers: { 'Content-Type': 'application/json' },
      })
  }
}

async function staleWhileRevalidate(request, cacheName) {
  const cache        = await caches.open(cacheName)
  const cached       = await cache.match(request)
  const fetchPromise = fetch(request)
    .then(r => { if (r.ok) cache.put(request, r.clone()); return r })
    .catch(() => null)
  return cached ?? (await fetchPromise) ??
    new Response('Offline', { status: 503 })
}
