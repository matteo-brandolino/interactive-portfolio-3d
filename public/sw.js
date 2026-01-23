const CACHE_NAME = 'portfolio-3d-v1'
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/favicon.ico',
  '/favicon-32x32.png',
  '/favicon-16x16.png',
  '/apple-touch-icon.png',
  '/android-chrome-192x192.png',
  '/android-chrome-512x512.png',
  '/site.webmanifest',

  // Models
  '/models/character.glb',
  '/models/tree.glb',
  '/models/rock.glb',
  '/models/wooden_sign.glb',
  '/models/tent.glb',
  '/models/bonfire.glb',
  '/models/boat.glb',

  // Water Textures (WebP + Fallback)
  '/textures/waternormals.webp',
  '/textures/waternormals_compressed.jpg'
]

// Install Event - Cache Assets
self.addEventListener('install', (event) => {
  console.log('[SW] Installing...')

  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[SW] Caching assets')
      return cache.addAll(ASSETS_TO_CACHE)
    }).then(() => {
      console.log('[SW] Installation complete')
      return self.skipWaiting()
    }).catch((err) => {
      console.error('[SW] Cache failed:', err)
    })
  )
})

// Activate Event - Clean Old Caches
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating...')

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('[SW] Deleting old cache:', cacheName)
            return caches.delete(cacheName)
          }
        })
      )
    }).then(() => {
      console.log('[SW] Activation complete')
      return self.clients.claim()
    })
  )
})

// Fetch Event - Serve from Cache, Fallback to Network
self.addEventListener('fetch', (event) => {
  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin)) {
    return
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        console.log('[SW] Serving from cache:', event.request.url)
        return cachedResponse
      }

      console.log('[SW] Fetching from network:', event.request.url)
      return fetch(event.request).then((response) => {
        // Only cache successful responses
        if (!response || response.status !== 200 || response.type === 'error') {
          return response
        }

        // Clone response before caching
        const responseToCache = response.clone()

        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache)
        })

        return response
      }).catch((err) => {
        console.error('[SW] Fetch failed:', err)

        // Return offline fallback if available
        if (event.request.destination === 'document') {
          return caches.match('/')
        }
      })
    })
  )
})
