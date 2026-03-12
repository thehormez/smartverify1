const CACHE_NAME = "krs-control-panel-v2";

const URLS_TO_CACHE = [
  "./",
  "./KRS-INVITE-PWA.html",
  "./manifest.webmanifest",
  "./icon-192.png",
  "./icon-512.png",

  "./KRS-upload-RSVP.html",
  "./KRS-merge-qr.html",
  "./KRS-center-pro.html",
  "./wa-dashboard-pro.html",
  "./KRS-CLIENT-DASH.html",
  "./KRSinvites-RSVP.html",
  "./KRS-Inbox.html",
  "./KRSINVITE-SCANNER.html",
  "./KRS-delete.html"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(URLS_TO_CACHE))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) return cachedResponse;

      return fetch(event.request)
        .then((networkResponse) => {
          return networkResponse;
        })
        .catch(() => {
          return caches.match("./KRS-INVITE-PWA.html");
        });
    })
  );
});
