const CACHE_NAME = "mini-e-library-cache";
const urlsToCache = [
  "/",
  "/index.html",
  "/styles/index.css",
  "/scripts/index.js",
  "/bell.wav",
  "/background-processes.js",
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

let worker;

self.addEventListener("push", (event) => {
  const data = event.data ? event.data.json() : {};

  if (!worker) {
    worker = new Worker("/background-processes.js");
  }
  worker.postMessage(data);
});

self.addEventListener("activate", () => {
  if (!worker) {
    worker = new Worker("/background-processes.js");
  }
});

// Handle notification click event
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  clients.openWindow("/");
});
