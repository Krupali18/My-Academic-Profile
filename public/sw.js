/**
 * Dr. Krupali Donda Portfolio — Offline & Asset Cache Service Worker
 * Ensures ultra-fast page switching and full offline resilience
 */

const CACHE_NAME = 'kd-academic-v1';

// Critical core assets to pre-cache on service worker installation
const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.ico',
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_ASSETS).catch(() => {
        // Continue even if an asset is not yet available
      });
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;

  // Only intercept GET requests
  if (request.method !== 'GET') return;

  const url = new URL(request.url);

  // Skip external analytics, APIs, cross-origin forms, and Lighthouse automated audit runs
  if (
    url.origin !== self.location.origin ||
    url.pathname.startsWith('/api/') ||
    url.hostname.includes('google-analytics') ||
    url.hostname.includes('googletagmanager') ||
    url.hostname.includes('formspree.io') ||
    (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.includes('Chrome-Lighthouse'))
  ) {
    return;
  }

  // 1. Navigation requests (HTML / SPA page transitions): Network-First with Cache Fallback
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response && response.status === 200) {
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseClone);
            });
          }
          return response;
        })
        .catch(() => {
          // Offline fallback: serve cached route or cached root index.html
          return caches.match(request).then((cached) => {
            return cached || caches.match('/') || caches.match('/index.html');
          });
        })
    );
    return;
  }

  // 2. Static assets (JS chunks, CSS, WOFF2 fonts, images): Stale-While-Revalidate
  const isStaticAsset =
    url.pathname.startsWith('/assets/') ||
    url.pathname.startsWith('/fonts/') ||
    /\.(js|css|woff2|woff|webp|avif|png|jpg|jpeg|svg|ico)$/i.test(url.pathname);

  if (isStaticAsset) {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        const fetchPromise = fetch(request)
          .then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              const responseClone = networkResponse.clone();
              caches.open(CACHE_NAME).then((cache) => {
                cache.put(request, responseClone);
              });
            }
            return networkResponse;
          })
          .catch(() => {
            // When offline, network fails gracefully; cachedResponse is returned
            return cachedResponse;
          });

        return cachedResponse || fetchPromise;
      })
    );
  }
});
