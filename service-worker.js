const CACHE_NAME = 'mini-e-library-cache';
const urlsToCache = [
  '/',
  '/index.html',
  '/styles.css',
  '/app.js',
  '/book.html',
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});

// Background Sync
self.addEventListener('sync', event => {
  if (event.tag === 'sync-books') {
    event.waitUntil(syncBooks());
  }
});

async function syncBooks() {
  const response = await fetch('/api/sync-books');
  const books = await response.json();
  // Update the UI with the latest books (this part would require integration with IndexedDB or direct page updates)
}

// Periodic Sync
self.addEventListener('periodicsync', event => {
  if (event.tag === 'sync-book-order') {
    event.waitUntil(updateBookOrder());
  }
});

// Push Notifications
self.addEventListener('push', event => {
  const data = event.data.json();
  const options = {
    body: data.body,
    icon: '/icons/icon-192x192.png',
    badge: '/icons/badge-72x72.png'
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow('/')
  );
});
