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
    badge: "/icons/icon.png", // Your PWA badge icon
  };

  event.waitUntil(
    self.registration.showNotification("Hello!", {
      body: "This is the dummy pwa app",
      icon: "images/icon.png",
    })
  );

  event.waitUntil(
    self.registration.pushManager.getSubscription().then((subscription) => {
      return subscription.showNotification(data.title, options);
    })
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  var fullPath = self.location.origin + event.notification.data.path;
  clients.openWindow(fullPath);
});
