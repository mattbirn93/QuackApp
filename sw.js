self.addEventListener("fetch", (event) => {
  if (event.request.url.includes("/api/")) {
    // Network first for API calls
    event.respondWith(
      fetch(event.request).catch(() => {
        return caches.match(event.request); // Serve from cache if offline
      }),
    );
  } else {
    // Cache first for other requests
    event.respondWith(
      caches.match(event.request).then((response) => {
        return (
          response ||
          fetch(event.request)
            .then((response) => {
              const responseClone = response.clone();
              caches.open("my-cache").then((cache) => {
                cache.put(event.request, responseClone);
              });
              return response;
            })
            .catch(() => {
              return caches.match("/offline.html"); // Provide a fallback page or asset for missing cache entries
            })
        );
      }),
    );
  }
});

///////////////////////////

// self.addEventListener("install", (event) => {
//   event.waitUntil(
//     caches.open("my-cache").then((cache) => {
//       return cache.addAll([
//         "/",
//         "/index.html",
//         "/manifest.json",
//         "/icon-192x192.png",
//         "/icon-512x512.png",
//         "/icon-maskable-512x512.png",
//         // Add other assets to cache as needed
//       ]);
//     }),
//   );
// });

// self.addEventListener("fetch", (event) => {
//   event.respondWith(
//     caches.match(event.request).then((response) => {
//       return (
//         response ||
//         fetch(event.request).catch(() => {
//           return caches.match("/index.html");
//         })
//       );
//     }),
//   );
// });

//////////////

// self.addEventListener("install", (event) => {
//   event.waitUntil(
//     caches.open("my-cache").then((cache) => {
//       return cache.addAll([
//         "/",
//         "/index.html",
//         "/manifest.json",
//         "/icon-192x192.png",
//         "/icon-512x512.png",
//         "/icon-maskable-512x512.png",
//         // Add other assets to cache as needed
//       ]);
//     }),
//   );
// });

// self.addEventListener("fetch", (event) => {
//   event.respondWith(
//     caches.match(event.request).then((response) => {
//       return (
//         response ||
//         fetch(event.request).catch(() => {
//           return caches.match("/index.html");
//         })
//       );
//     }),
//   );
// });

///////////

// self.addEventListener('install', (event) => {
//   event.waitUntil(
//     caches.open('my-cache').then((cache) => {
//       return cache.addAll([
//         '/',
//         '/index.html',
//         '/manifest.json',
//         '/icon-192x192.png',
//         '/icon-512x512.png',
//         '/icon-144x144.png',
//         '/icon-maskable-512x512.png',
//         // Add other assets to cache
//       ]);
//     })
//   );
// });

// self.addEventListener('fetch', (event) => {
//   event.respondWith(
//     caches.match(event.request).then((response) => {
//       return response || fetch(event.request);
//     })
//   );
// });
