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

self.addEventListener("push", async (event) => {
  const payload = event.data?.text() ?? "No notification data";

  const audio = new audio.HTMLAudioElement();
  audio.src = "/bell.mp3";
  audio.play();

  event.waitUntil(
    self.registration.showNotification("Dummy PWA", {
      body: payload,
      icon: "/images/icon.png",
      badge: "/images/book.png",
    })
  );
});

// Handle notification click event
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  clients.openWindow("/");
});
