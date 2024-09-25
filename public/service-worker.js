const CACHE_NAME = 'pwa-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/about.html',
  '/styles/index.css',
];

// Cache important files on install
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Serve cached files
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});

// Background sync
self.addEventListener('sync', event => {
  if (event.tag === 'sync-tag') {
    event.waitUntil(fetch('/api/sync'));
  }
});

// Push notifications
self.addEventListener('push', event => {
  const options = {
    body: event.data.text() || 'You have a new notification!',
    icon: '/images/icon.png',
  };
  event.waitUntil(self.registration.showNotification('New Notification', options));
});
