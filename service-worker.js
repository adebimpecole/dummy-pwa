const CACHE_NAME = "mini-e-library-cache";
const urlsToCache = [
  "/",
  "/index.html",
  "/styles/index.css",
  "/scripts/index.js",
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

self.addEventListener("sync", (event) => {
  if (event.tag === "sync-books") {
    event.waitUntil(
      fetch("/api/sync-books")
        .then((response) => response.json())
        .then((data) => {
          console.log("Books synced in the background", data);
        })
    );
  }
});

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
    icon: "/icons/icon.png", 
    badge: "/icons/badge-72x72.png", // Your PWA badge icon
  };

  event.waitUntil(
    self.registration.pushManager.getSubscription().then((subscription) => {
      return subscription.showNotification(data.title, options);
    })
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(clients.openWindow("/")); // Redirect to your homepage or another page
});