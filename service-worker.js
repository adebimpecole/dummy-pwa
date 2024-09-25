const CACHE_NAME = "mini-e-library-cache";
const urlsToCache = [
  "/",
  "/index.html",
  "/styles.css",
  "/app.js",
  "/book.html",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Opened cache");
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

// service-worker.js
self.addEventListener("sync", (event) => {
  if (event.tag === "sync-books") {
    event.waitUntil(
      // Perform background sync operations (like updating books from the server)
      fetch("/api/books")
        .then((response) => response.json())
        .then((data) => {
          // Update IndexedDB or other storage with new data
          console.log("Books synced in the background", data);
        })
    );
  }
});

// Periodic Sync
self.addEventListener("periodicsync", (event) => {
  if (event.tag === "sync-book-order") {
    event.waitUntil(updateBookOrder());
  }
});

self.addEventListener("push", (event) => {
  const data = event.data.json();
  console.log("Push Notification received:", data);

  const options = {
    body: data.body,
    icon: "/icons/icon-192x192.png", // Your PWA icon
    badge: "/icons/badge-72x72.png", // Your PWA badge icon
  };

  event.waitUntil(self.registration.showNotification(data.title, options));
});

// Handle notification click
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow("/") // Redirect to your homepage or another page
  );
});
