const CACHE_NAME = 'my-cache-v1';
const OFFLINE_URL = '/offline.html';

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll([
        OFFLINE_URL,
        '/',
        '/styles.css',
        '/script.js',
        '/icon-192x192.png',
        '/icon-512x512.png',
        '/manifest.webmanifest',
      ]);
    })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      if (response) {
        return response;
      }
      return fetch(event.request).then(response => {
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }
        const responseClone = response.clone();
        caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, responseClone);
        });
        return response;
      }).catch(() => {
        // If fetch fails and the request is not for an API endpoint, serve the offline page
        if (!event.request.url.includes('/api/')) {
          return caches.match(OFFLINE_URL);
        }
      });
    })
  );
});



///////

// const CACHE_NAME = "my-cache-v1";
// const OFFLINE_URL = "/offline.html";

// self.addEventListener("install", (event) => {
//   event.waitUntil(
//     caches.open(CACHE_NAME).then((cache) => {
//       return cache.addAll([
//         OFFLINE_URL,
//         "/",
//         "/assets/index-4ubWRhfU.js",
//         "/assets/index-BrG-zB5P.css",
//         "/icon-192x192.png",
//         "/icon-512x512.png",
//         "/icon-maskable-512x512.png",
//         "/manifest.webmanifest",
//         "/vite.svg",
//         "/workbox-30ed6c48.js",
//       ]);
//     })
//   );
// });

// self.addEventListener("activate", (event) => {
//   event.waitUntil(
//     caches.keys().then((cacheNames) => {
//       return Promise.all(
//         cacheNames.map((cacheName) => {
//           if (cacheName !== CACHE_NAME) {
//             return caches.delete(cacheName);
//           }
//         })
//       );
//     })
//   );
//   self.clients.claim();
// });

// self.addEventListener("fetch", (event) => {
//   if (event.request.url.includes("/api/")) {
//     event.respondWith(
//       fetch(event.request)
//         .then((response) => {
//           return response;
//         })
//         .catch(() => {
//           return caches.match(event.request);
//         })
//     );
//   } else {
//     event.respondWith(
//       caches.match(event.request).then((response) => {
//         if (response) {
//           return response;
//         }
//         return fetch(event.request)
//           .then((response) => {
//             if (!response || response.status !== 200 || response.type !== "basic") {
//               return response;
//             }
//             const responseClone = response.clone();
//             caches.open(CACHE_NAME).then((cache) => {
//               cache.put(event.request, responseClone);
//             });
//             return response;
//           })
//           .catch(() => {
//             return caches.match(OFFLINE_URL);
//           });
//       })
//     );
//   }
// });



////////////////////////////

// const CACHE_NAME = "my-cache-v1";
// const OFFLINE_URL = "/offline.html";

// // Install event: cache offline page and other necessary assets
// self.addEventListener("install", (event) => {
//   event.waitUntil(
//     caches.open(CACHE_NAME).then((cache) => {
//       return cache.addAll([
//         OFFLINE_URL,
//         "/",
//         "/assets/index-4ubWRhfU.js",
//         "/assets/index-BrG-zB5P.css",
//         "/icon-192x192.png",
//         "/icon-512x512.png",
//         "/icon-maskable-512x512.png",
//         "/manifest.webmanifest",
//         "/vite.svg",
//         "/workbox-30ed6c48.js",
//       ]);
//     })
//   );
// });

// // Activate event: clean up old caches if any
// self.addEventListener("activate", (event) => {
//   event.waitUntil(
//     caches.keys().then((cacheNames) => {
//       return Promise.all(
//         cacheNames.map((cacheName) => {
//           if (cacheName !== CACHE_NAME) {
//             return caches.delete(cacheName);
//           }
//         })
//       );
//     })
//   );
// });

// // Fetch event: handle network requests
// self.addEventListener("fetch", (event) => {
//   if (event.request.url.includes("/api/")) {
//     // Network first for API calls
//     event.respondWith(
//       fetch(event.request)
//         .then((response) => {
//           return response;
//         })
//         .catch(() => {
//           return caches.match(event.request); // Serve from cache if offline
//         })
//     );
//   } else {
//     // Cache first for other requests
//     event.respondWith(
//       caches.match(event.request).then((response) => {
//         if (response) {
//           return response;
//         }
//         return fetch(event.request)
//           .then((response) => {
//             if (
//               !response ||
//               response.status !== 200 ||
//               response.type !== "basic"
//             ) {
//               return response;
//             }
//             const responseClone = response.clone();
//             caches.open(CACHE_NAME).then((cache) => {
//               cache.put(event.request, responseClone);
//             });
//             return response;
//           })
//           .catch(() => {
//             // Fallback to offline page if both network and cache fail
//             return caches.match(OFFLINE_URL);
//           });
//       })
//     );
//   }
// });



///////////////////////


// const CACHE_NAME = "my-cache-v1";
// const OFFLINE_URL = "/offline.html";

// // Install event: cache offline page and any other necessary assets
// self.addEventListener("install", (event) => {
//   event.waitUntil(
//     caches.open(CACHE_NAME).then((cache) => {
//       return cache.addAll([OFFLINE_URL, "/"]); // Add any other assets you want to cache initially
//     }),
//   );
// });

// // Activate event: clean up old caches if any
// self.addEventListener("activate", (event) => {
//   event.waitUntil(
//     caches.keys().then((cacheNames) => {
//       return Promise.all(
//         cacheNames.map((cacheName) => {
//           if (cacheName !== CACHE_NAME) {
//             return caches.delete(cacheName);
//           }
//         }),
//       );
//     }),
//   );
// });
// // Fetch event: handle network requests
// self.addEventListener("fetch", (event) => {
//   if (event.request.url.includes("/api/")) {
//     // Network first for API calls
//     event.respondWith(
//       fetch(event.request).catch(() => {
//         return caches.match(event.request); // Serve from cache if offline
//       }),
//     );
//   } else {
//     // Cache first for other requests
//     event.respondWith(
//       caches.match(event.request).then((response) => {
//         if (response) {
//           return response;
//         }
//         return fetch(event.request)
//           .then((response) => {
//             if (
//               !response ||
//               response.status !== 200 ||
//               response.type !== "basic"
//             ) {
//               return response;
//             }
//             const responseClone = response.clone();
//             caches.open(CACHE_NAME).then((cache) => {
//               cache.put(event.request, responseClone);
//             });
//             return response;
//           })
//           .catch(() => {
//             // Fallback to offline page if both network and cache fail
//             return caches.match(OFFLINE_URL);
//           });
//       }),
//     );
//   }
// });

////////////////

// const CACHE_NAME = "my-cache-v1";
// const urlsToCache = [
//   "/",
//   "/index.html",
//   "/offline.html",
//   "/assets/index-DAjFnVK1.js",
//   "/assets/index-BrG-zB5P.css",
//   "/icon-192x192.png",
//   "/icon-512x512.png",
//   "/icon-maskable-512x512.png",
//   "/manifest.webmanifest",
//   "/vite.svg",
// ];

// self.addEventListener("install", (event) => {
//   console.log("Service worker installing...");
//   event.waitUntil(
//     caches.open(CACHE_NAME).then((cache) => {
//       console.log("Opened cache");
//       return cache.addAll(urlsToCache);
//     }),
//   );
//   self.skipWaiting();
// });

// self.addEventListener("activate", (event) => {
//   console.log("Service worker activating...");
//   const cacheWhitelist = [CACHE_NAME];
//   event.waitUntil(
//     caches.keys().then((cacheNames) => {
//       return Promise.all(
//         cacheNames.map((cacheName) => {
//           if (cacheWhitelist.indexOf(cacheName) === -1) {
//             return caches.delete(cacheName);
//           }
//         }),
//       );
//     }),
//   );
//   return self.clients.claim();
// });

// self.addEventListener("fetch", (event) => {
//   if (event.request.url.includes("/api/")) {
//     // Network first for API calls
//     event.respondWith(
//       fetch(event.request).catch(() => {
//         return caches.match(event.request); // Serve from cache if offline
//       }),
//     );
//   } else {
//     // Cache first for other requests
//     event.respondWith(
//       caches.match(event.request).then((response) => {
//         return (
//           response ||
//           fetch(event.request)
//             .then((response) => {
//               if (
//                 !response ||
//                 response.status !== 200 ||
//                 response.type !== "basic"
//               ) {
//                 return response;
//               }
//               const responseClone = response.clone();
//               caches.open(CACHE_NAME).then((cache) => {
//                 cache.put(event.request, responseClone);
//               });
//               return response;
//             })
//             .catch(() => {
//               return caches.match("/offline.html"); // Provide a fallback page or asset for missing cache entries
//             })
//         );
//       }),
//     );
//   }
// });

////////////////////////////

// self.addEventListener("fetch", (event) => {
//   if (event.request.url.includes("/api/")) {
//     // Network first for API calls
//     event.respondWith(
//       fetch(event.request).catch(() => {
//         return caches.match(event.request); // Serve from cache if offline
//       }),
//     );
//   } else {
//     // Cache first for other requests
//     event.respondWith(
//       caches.match(event.request).then((response) => {
//         return (
//           response ||
//           fetch(event.request)
//             .then((response) => {
//               const responseClone = response.clone();
//               caches.open("my-cache").then((cache) => {
//                 cache.put(event.request, responseClone);
//               });
//               return response;
//             })
//             .catch(() => {
//               return caches.match("/offline.html"); // Provide a fallback page or asset for missing cache entries
//             })
//         );
//       }),
//     );
//   }
// });

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
