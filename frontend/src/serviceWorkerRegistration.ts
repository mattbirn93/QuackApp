type Config = {
  onSuccess?: (registration: ServiceWorkerRegistration) => void;
  onUpdate?: (registration: ServiceWorkerRegistration) => void;
};

export function register(config?: Config) {
  // if (process.env.NODE_ENV === "production" && "serviceWorker" in navigator) {
  async () => {
    try {
      const publicUrl = new URL(import.meta.env.VITE_PUBLIC_URL);

      console.log("VITE PUBLIC_URL:", import.meta.env.VITE_PUBLIC_URL || "."); // Log PUBLIC_URL with fallback
      console.log("publicUrl.origin:", publicUrl.origin); // Log publicUrl.origin
      console.log("window.location.origin:", window.location.origin); // Log window.location.origin

      // Only proceed with service worker registration if origins match
      if (publicUrl.origin) {
        const swUrl = `${publicUrl.origin}/sw.js`; // Ensure proper path
        console.log("Service worker URL:", swUrl); // Log swUrl

        await registerValidSW(swUrl, config);
      } else {
        console.log("Service worker not registered due to origin mismatch.");
      }
    } catch (error) {
      console.error("Error during service worker registration:", error);
    }
  };
}
// }

async function registerValidSW(swUrl: string, config?: Config) {
  try {
    const registration = await navigator.serviceWorker.register(swUrl);
    registration.onupdatefound = () => {
      const installingWorker = registration.installing;
      if (installingWorker == null) {
        return;
      }
      installingWorker.onstatechange = () => {
        if (installingWorker.state === "installed") {
          if (navigator.serviceWorker.controller) {
            console.log(
              "New content is available and will be used when all tabs for this page are closed. See https://cra.link/PWA.",
            );
            if (config && config.onUpdate) {
              config.onUpdate(registration);
            }
          } else {
            console.log("Content is cached for offline use.");
            if (config && config.onSuccess) {
              config.onSuccess(registration);
            }
          }
        }
      };
    };
  } catch (error) {
    console.error("Error during service worker registration:", error);
    throw error;
  }
}

async function checkValidServiceWorker(swUrl: string, config?: Config) {
  try {
    const response = await fetch(swUrl, {
      headers: { "Service-Worker": "script" },
    });

    if (!response.ok) {
      throw new Error("Service worker not found or failed to load.");
    }

    const contentType = response.headers.get("content-type");
    if (
      response.status === 404 ||
      (contentType != null && contentType.indexOf("javascript") === -1)
    ) {
      const registration = await navigator.serviceWorker.ready;
      await registration.unregister();
      window.location.reload();
    } else {
      await registerValidSW(swUrl, config);
    }
  } catch (error) {
    console.error(
      "No internet connection found. App is running in offline mode.",
    );
    throw error;
  }
}

export function unregister() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.ready
      .then((registration) => {
        registration.unregister();
      })
      .catch((error) => {
        console.error(error.message);
      });
  }
}

/////////////////////

// type Config = {
//   onSuccess?: (registration: ServiceWorkerRegistration) => void;
//   onUpdate?: (registration: ServiceWorkerRegistration) => void;
// };

// export function register(config?: Config) {
//   // if (process.env.NODE_ENV === "production" && "serviceWorker" in navigator) {
//   window.addEventListener("load", async () => {
//     try {
//       const publicUrl = new URL(import.meta.env.VITE_PUBLIC_URL);

//       console.log("VITE PUBLIC_URL:", import.meta.env.VITE_PUBLIC_URL || "."); // Log PUBLIC_URL with fallback
//       console.log("publicUrl.origin:", publicUrl.origin); // Log publicUrl.origin
//       console.log("window.location.origin:", window.location.origin); // Log window.location.origin

//       // Only proceed with service worker registration if origins match
//       if (publicUrl.origin) {
//         const swUrl = `${publicUrl.origin}/sw.js`; // Ensure proper path
//         console.log("Service worker URL:", swUrl); // Log swUrl

//         await registerValidSW(swUrl, config);
//       } else {
//         console.log("Service worker not registered due to origin mismatch.");
//       }
//     } catch (error) {
//       console.error("Error during service worker registration:", error);
//     }
//   });
// }
// // }

// async function registerValidSW(swUrl: string, config?: Config) {
//   try {
//     const registration = await navigator.serviceWorker.register(swUrl);
//     registration.onupdatefound = () => {
//       const installingWorker = registration.installing;
//       if (installingWorker == null) {
//         return;
//       }
//       installingWorker.onstatechange = () => {
//         if (installingWorker.state === "installed") {
//           if (navigator.serviceWorker.controller) {
//             console.log(
//               "New content is available and will be used when all tabs for this page are closed. See https://cra.link/PWA.",
//             );
//             if (config && config.onUpdate) {
//               config.onUpdate(registration);
//             }
//           } else {
//             console.log("Content is cached for offline use.");
//             if (config && config.onSuccess) {
//               config.onSuccess(registration);
//             }
//           }
//         }
//       };
//     };
//   } catch (error) {
//     console.error("Error during service worker registration:", error);
//     throw error;
//   }
// }

// async function checkValidServiceWorker(swUrl: string, config?: Config) {
//   try {
//     const response = await fetch(swUrl, {
//       headers: { "Service-Worker": "script" },
//     });

//     if (!response.ok) {
//       throw new Error("Service worker not found or failed to load.");
//     }

//     const contentType = response.headers.get("content-type");
//     if (
//       response.status === 404 ||
//       (contentType != null && contentType.indexOf("javascript") === -1)
//     ) {
//       const registration = await navigator.serviceWorker.ready;
//       await registration.unregister();
//       window.location.reload();
//     } else {
//       await registerValidSW(swUrl, config);
//     }
//   } catch (error) {
//     console.error(
//       "No internet connection found. App is running in offline mode.",
//     );
//     throw error;
//   }
// }

// export function unregister() {
//   if ("serviceWorker" in navigator) {
//     navigator.serviceWorker.ready
//       .then((registration) => {
//         registration.unregister();
//       })
//       .catch((error) => {
//         console.error(error.message);
//       });
//   }
// }

// // // serviceWorkerRegistration.ts

// const isLocalhost = Boolean(
//   window.location.hostname === "localhost" ||
//   window.location.hostname === "[::1]" ||
//   window.location.hostname.match(
//     /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/,
//   ),
// );

// type Config = {
//   onSuccess?: (registration: ServiceWorkerRegistration) => void;
//   onUpdate?: (registration: ServiceWorkerRegistration) => void;
// };

// export function register(config?: Config) {
//   if (process.env.NODE_ENV === "production" && "serviceWorker" in navigator) {
//     window.addEventListener("load", async () => {
//       try {
//         const publicUrl = new URL(
//           import.meta.env.VITE_PUBLIC_URL || ".", // Provide a fallback value here
//           window.location.href,
//         );

//         console.log("PUBLIC_URL:", import.meta.env.VITE_PUBLIC_URL || "."); // Log PUBLIC_URL with fallback
//         console.log("publicUrl.origin:", publicUrl.origin); // Log publicUrl.origin
//         console.log("window.location.origin:", window.location.origin); // Log window.location.origin

//         if (publicUrl.origin !== window.location.origin) {
//           console.log("Service worker not registered due to origin mismatch.");
//           return;
//         }

//         const swUrl = `${publicUrl.origin}/sw.js`; // Ensure proper path
//         console.log("Service worker URL:", swUrl); // Log swUrl

//         if (isLocalhost) {
//           await checkValidServiceWorker(swUrl, config);
//           console.log(
//             "This web app is served cache-first by a service worker. To learn more, visit https://cra.link/PWA",
//           );
//         } else {
//           await registerValidSW(swUrl, config);
//         }
//       } catch (error) {
//         console.error("Error during service worker registration:", error);
//       }
//     });
//   }
// }

// async function registerValidSW(swUrl: string, config?: Config) {
//   try {
//     const registration = await navigator.serviceWorker.register(swUrl);
//     registration.onupdatefound = () => {
//       const installingWorker = registration.installing;
//       if (installingWorker == null) {
//         return;
//       }
//       installingWorker.onstatechange = () => {
//         if (installingWorker.state === "installed") {
//           if (navigator.serviceWorker.controller) {
//             console.log(
//               "New content is available and will be used when all tabs for this page are closed. See https://cra.link/PWA.",
//             );
//             if (config && config.onUpdate) {
//               config.onUpdate(registration);
//             }
//           } else {
//             console.log("Content is cached for offline use.");
//             if (config && config.onSuccess) {
//               config.onSuccess(registration);
//             }
//           }
//         }
//       };
//     };
//   } catch (error) {
//     console.error("Error during service worker registration:", error);
//     throw error;
//   }
// }

// async function checkValidServiceWorker(swUrl: string, config?: Config) {
//   try {
//     const response = await fetch(swUrl, {
//       headers: { "Service-Worker": "script" },
//     });

//     if (!response.ok) {
//       throw new Error("Service worker not found or failed to load.");
//     }

//     const contentType = response.headers.get("content-type");
//     if (
//       response.status === 404 ||
//       (contentType != null && contentType.indexOf("javascript") === -1)
//     ) {
//       const registration = await navigator.serviceWorker.ready;
//       await registration.unregister();
//       window.location.reload();
//     } else {
//       await registerValidSW(swUrl, config);
//     }
//   } catch (error) {
//     console.error(
//       "No internet connection found. App is running in offline mode.",
//     );
//     throw error;
//   }
// }

// export function unregister() {
//   if ("serviceWorker" in navigator) {
//     navigator.serviceWorker.ready
//       .then((registration) => {
//         registration.unregister();
//       })
//       .catch((error) => {
//         console.error(error.message);
//       });
//   }
// }

/////////////////

// // serviceWorkerRegistration.ts

// const isLocalhost = Boolean(
//   window.location.hostname === "localhost" ||
//   window.location.hostname === "[::1]" ||
//   window.location.hostname.match(
//     /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/,
//   ),
// );

// type Config = {
//   onSuccess?: (registration: ServiceWorkerRegistration) => void;
//   onUpdate?: (registration: ServiceWorkerRegistration) => void;
// };

// export function register(config?: Config) {
//   if (process.env.NODE_ENV === "production" && "serviceWorker" in navigator) {
//     window.addEventListener("load", async () => {
//       try {
//         const publicUrl = new URL(
//           import.meta.env.VITE_PUBLIC_URL || ".", // Provide a fallback value here
//           window.location.href,
//         );

//         console.log("PUBLIC_URL:", import.meta.env.VITE_PUBLIC_URL || "."); // Log PUBLIC_URL with fallback
//         console.log("publicUrl.origin:", publicUrl.origin); // Log publicUrl.origin
//         console.log("window.location.origin:", window.location.origin); // Log window.location.origin

//         if (publicUrl.origin !== window.location.origin) {
//           console.log("Service worker not registered due to origin mismatch.");
//           return;
//         }

//         const swUrl = `${publicUrl.origin}/sw.js`; // Ensure proper path
//         console.log("Service worker URL:", swUrl); // Log swUrl

//         if (isLocalhost) {
//           await checkValidServiceWorker(swUrl, config);
//           console.log(
//             "This web app is served cache-first by a service worker. To learn more, visit https://cra.link/PWA",
//           );
//         } else {
//           await registerValidSW(swUrl, config);
//         }
//       } catch (error) {
//         console.error("Error during service worker registration:", error);
//       }
//     });
//   }
// }

// async function registerValidSW(swUrl: string, config?: Config) {
//   try {
//     const registration = await navigator.serviceWorker.register(swUrl);
//     registration.onupdatefound = () => {
//       const installingWorker = registration.installing;
//       if (installingWorker == null) {
//         return;
//       }
//       installingWorker.onstatechange = () => {
//         if (installingWorker.state === "installed") {
//           if (navigator.serviceWorker.controller) {
//             console.log(
//               "New content is available and will be used when all tabs for this page are closed. See https://cra.link/PWA.",
//             );
//             if (config && config.onUpdate) {
//               config.onUpdate(registration);
//             }
//           } else {
//             console.log("Content is cached for offline use.");
//             if (config && config.onSuccess) {
//               config.onSuccess(registration);
//             }
//           }
//         }
//       };
//     };
//   } catch (error) {
//     console.error("Error during service worker registration:", error);
//     throw error;
//   }
// }

// async function checkValidServiceWorker(swUrl: string, config?: Config) {
//   try {
//     const response = await fetch(swUrl, {
//       headers: { "Service-Worker": "script" },
//     });

//     if (!response.ok) {
//       throw new Error("Service worker not found or failed to load.");
//     }

//     const contentType = response.headers.get("content-type");
//     if (
//       response.status === 404 ||
//       (contentType != null && contentType.indexOf("javascript") === -1)
//     ) {
//       const registration = await navigator.serviceWorker.ready;
//       await registration.unregister();
//       window.location.reload();
//     } else {
//       await registerValidSW(swUrl, config);
//     }
//   } catch (error) {
//     console.error(
//       "No internet connection found. App is running in offline mode.",
//     );
//     throw error;
//   }
// }

// export function unregister() {
//   if ("serviceWorker" in navigator) {
//     navigator.serviceWorker.ready
//       .then((registration) => {
//         registration.unregister();
//       })
//       .catch((error) => {
//         console.error(error.message);
//       });
//   }
// }

///////////

// const isLocalhost = Boolean(
//   window.location.hostname === "localhost" ||
//   window.location.hostname === "[::1]" ||
//   window.location.hostname.match(
//     /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/,
//   ),
// );

// type Config = {
//   onSuccess?: (registration: ServiceWorkerRegistration) => void;
//   onUpdate?: (registration: ServiceWorkerRegistration) => void;
// };

// export function register(config?: Config) {
//   if (process.env.NODE_ENV === "production" && "serviceWorker" in navigator) {
//     const publicUrl = new URL(
//       import.meta.env.VITE_PUBLIC_URL || ".", // Provide a fallback value here
//       window.location.href,
//     );

//     console.log(
//       "WELCOME TURKEY PUBLIC_URL:",
//       import.meta.env.VITE_PUBLIC_URL || ".",
//     ); // Log PUBLIC_URL with fallback
//     console.log("WELCOME TURKEY publicUrl.origin:", publicUrl.origin); // Log publicUrl.origin
//     console.log(
//       "WELCOME TURKEY window.location.origin:",
//       window.location.origin,
//     ); // Log window.location.origin

//     if (publicUrl.origin !== window.location.origin) {
//       console.log(
//         "WELCOME TURKEY Service worker not registered due to origin mismatch.",
//       );
//       return;
//     }
//     window.addEventListener("load", () => {
//       const swUrl = `${import.meta.env.VITE_PUBLIC_URL || "."}/sw.js`; // Ensure proper path
//       console.log("WELCOME TURKEY Service worker URL:", swUrl); // Log swUrl

//       if (isLocalhost) {
//         checkValidServiceWorker(swUrl, config);
//         navigator.serviceWorker.ready.then(() => {
//           console.log(
//             "WELCOME TURKEY This web app is being served cache-first by a service worker. To learn more, visit https://cra.link/PWA",
//           );
//         });
//       } else {
//         registerValidSW(swUrl, config);
//       }
//     });
//   }
// }

// function registerValidSW(swUrl: string, config?: Config) {
//   navigator.serviceWorker
//     .register(swUrl)
//     .then((registration) => {
//       registration.onupdatefound = () => {
//         const installingWorker = registration.installing;
//         if (installingWorker == null) {
//           return;
//         }
//         installingWorker.onstatechange = () => {
//           if (installingWorker.state === "installed") {
//             if (navigator.serviceWorker.controller) {
//               console.log(
//                 "WELCOME TURKEY New content is available and will be used when all tabs for this page are closed. See https://cra.link/PWA.",
//               );
//               if (config && config.onUpdate) {
//                 config.onUpdate(registration);
//               }
//             } else {
//               console.log("WELCOME TURKEY Content is cached for offline use.");
//               if (config && config.onSuccess) {
//                 config.onSuccess(registration);
//               }
//             }
//           }
//         };
//       };
//     })
//     .catch((error) => {
//       console.error(
//         "WELCOME TURKEY Error during service worker registration:",
//         error,
//       );
//     });
// }

// function checkValidServiceWorker(swUrl: string, config?: Config) {
//   fetch(swUrl, {
//     headers: { "Service-Worker": "script" },
//   })
//     .then((response) => {
//       const contentType = response.headers.get("content-type");
//       if (
//         response.status === 404 ||
//         (contentType != null && contentType.indexOf("javascript") === -1)
//       ) {
//         navigator.serviceWorker.ready.then((registration) => {
//           registration.unregister().then(() => {
//             window.location.reload();
//           });
//         });
//       } else {
//         registerValidSW(swUrl, config);
//       }
//     })
//     .catch(() => {
//       console.log(
//         "WELCOME TURKEY No internet connection found. App is running in offline mode.",
//       );
//     });
// }

// export function unregister() {
//   if ("serviceWorker" in navigator) {
//     navigator.serviceWorker.ready
//       .then((registration) => {
//         registration.unregister();
//       })
//       .catch((error) => {
//         console.error(error.message);
//       });
//   }
// }

/////////////////

// const isLocalhost = Boolean(
//   window.location.hostname === "localhost" ||
//   window.location.hostname === "[::1]" ||
//   window.location.hostname.match(
//     /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/,
//   ),
// );

// type Config = {
//   onSuccess?: (registration: ServiceWorkerRegistration) => void;
//   onUpdate?: (registration: ServiceWorkerRegistration) => void;
// };

// export function register(config?: Config) {
//   if (process.env.NODE_ENV === "production" && "serviceWorker" in navigator) {
//     const publicUrl = new URL(
//       import.meta.env.VITE_PUBLIC_URL || ".", // Provide a fallback value here
//       window.location.href,
//     );

//     console.log(
//       "WELCOME TURKEY PUBLIC_URL:",
//       import.meta.env.VITE_PUBLIC_URL || ".",
//     ); // Log PUBLIC_URL with fallback
//     console.log("WELCOME TURKEY publicUrl.origin:", publicUrl.origin); // Log publicUrl.origin
//     console.log(
//       "WELCOME TURKEY window.location.origin:",
//       window.location.origin,
//     ); // Log window.location.origin

//     if (publicUrl.origin !== window.location.origin) {
//       console.log(
//         "WELCOME TURKEY Service worker not registered due to origin mismatch.",
//       );
//       return;
//     }
//     window.addEventListener("load", () => {
//       const swUrl = `${import.meta.env.VITE_PUBLIC_URL || "."}/sw.js`; // Ensure proper path
//       console.log("WELCOME TURKEY Service worker URL:", swUrl); // Log swUrl

//       if (isLocalhost) {
//         checkValidServiceWorker(swUrl, config);
//         navigator.serviceWorker.ready.then(() => {
//           console.log(
//             "WELCOME TURKEY This web app is being served cache-first by a service worker. To learn more, visit https://cra.link/PWA",
//           );
//         });
//       } else {
//         registerValidSW(swUrl, config);
//       }
//     });
//   }
// }

// function registerValidSW(swUrl: string, config?: Config) {
//   navigator.serviceWorker
//     .register(swUrl)
//     .then((registration) => {
//       registration.onupdatefound = () => {
//         const installingWorker = registration.installing;
//         if (installingWorker == null) {
//           return;
//         }
//         installingWorker.onstatechange = () => {
//           if (installingWorker.state === "installed") {
//             if (navigator.serviceWorker.controller) {
//               console.log(
//                 "WELCOME TURKEY New content is available and will be used when all tabs for this page are closed. See https://cra.link/PWA.",
//               );
//               if (config && config.onUpdate) {
//                 config.onUpdate(registration);
//               }
//             } else {
//               console.log("WELCOME TURKEY Content is cached for offline use.");
//               if (config && config.onSuccess) {
//                 config.onSuccess(registration);
//               }
//             }
//           }
//         };
//       };
//     })
//     .catch((error) => {
//       console.error(
//         "WELCOME TURKEY Error during service worker registration:",
//         error,
//       );
//     });
// }

// function checkValidServiceWorker(swUrl: string, config?: Config) {
//   fetch(swUrl, {
//     headers: { "Service-Worker": "script" },
//   })
//     .then((response) => {
//       const contentType = response.headers.get("content-type");
//       if (
//         response.status === 404 ||
//         (contentType != null && contentType.indexOf("javascript") === -1)
//       ) {
//         navigator.serviceWorker.ready.then((registration) => {
//           registration.unregister().then(() => {
//             window.location.reload();
//           });
//         });
//       } else {
//         registerValidSW(swUrl, config);
//       }
//     })
//     .catch(() => {
//       console.log(
//         "WELCOME TURKEY No internet connection found. App is running in offline mode.",
//       );
//     });
// }

// export function unregister() {
//   if ("serviceWorker" in navigator) {
//     navigator.serviceWorker.ready
//       .then((registration) => {
//         registration.unregister();
//       })
//       .catch((error) => {
//         console.error(error.message);
//       });
//   }
// }

/////////////////

// const isLocalhost = Boolean(
//   window.location.hostname === "localhost" ||
//   window.location.hostname === "[::1]" ||
//   window.location.hostname.match(
//     /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/,
//   ),
// );

// type Config = {
//   onSuccess?: (registration: ServiceWorkerRegistration) => void;
//   onUpdate?: (registration: ServiceWorkerRegistration) => void;
// };

// export function register(config?: Config) {
//   if (process.env.NODE_ENV === "production" && "serviceWorker" in navigator) {
//     const publicUrl = new URL(
//       process.env.PUBLIC_URL || "",
//       window.location.href,
//     );
//     if (publicUrl.origin !== window.location.origin) {
//       return;
//     }
//     window.addEventListener("load", () => {
//       const swUrl = `./sw.js`;

//       if (isLocalhost) {
//         // Check if a service worker is already controlling the page
//         if (navigator.serviceWorker.controller) {
//           console.log("Service worker is already controlling the page.");
//         } else {
//           checkValidServiceWorker(swUrl, config);
//         }
//         navigator.serviceWorker.ready.then(() => {
//           console.log(
//             "This web app is being served cache-first by a service worker. To learn more, visit https://cra.link/PWA",
//           );
//         });
//       } else {
//         registerValidSW(swUrl, config);
//       }
//     });
//   }
// }

// function registerValidSW(swUrl: string, config?: Config) {
//   navigator.serviceWorker
//     .register(swUrl)
//     .then((registration) => {
//       registration.onupdatefound = () => {
//         const installingWorker = registration.installing;
//         if (installingWorker == null) {
//           return;
//         }
//         installingWorker.onstatechange = () => {
//           if (installingWorker.state === "installed") {
//             if (navigator.serviceWorker.controller) {
//               console.log(
//                 "New content is available and will be used when all tabs for this page are closed. See https://cra.link/PWA.",
//               );
//               if (config && config.onUpdate) {
//                 config.onUpdate(registration);
//               }
//             } else {
//               console.log("Content is cached for offline use.");
//               if (config && config.onSuccess) {
//                 config.onSuccess(registration);
//               }
//             }
//           }
//         };
//       };
//     })
//     .catch((error) => {
//       console.error("Error during service worker registration:", error);
//     });
// }

// function checkValidServiceWorker(swUrl: string, config?: Config) {
//   fetch(swUrl, {
//     headers: { "Service-Worker": "script" },
//   })
//     .then((response) => {
//       const contentType = response.headers.get("content-type");
//       if (
//         response.status === 404 ||
//         (contentType != null && contentType.indexOf("javascript") === -1)
//       ) {
//         navigator.serviceWorker.ready.then((registration) => {
//           registration.unregister().then(() => {
//             window.location.reload();
//           });
//         });
//       } else {
//         registerValidSW(swUrl, config);
//       }
//     })
//     .catch(() => {
//       console.log(
//         "No internet connection found. App is running in offline mode.",
//       );
//     });
// }

// export function unregister() {
//   if ("serviceWorker" in navigator) {
//     navigator.serviceWorker.ready
//       .then((registration) => {
//         registration.unregister();
//       })
//       .catch((error) => {
//         console.error(error.message);
//       });
//   }
// }

//////////////////////

// const isLocalhost = Boolean(
//   window.location.hostname === "localhost" ||
//   window.location.hostname === "[::1]" ||
//   window.location.hostname.match(
//     /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/,
//   ),
// );

// type Config = {
//   onSuccess?: (registration: ServiceWorkerRegistration) => void;
//   onUpdate?: (registration: ServiceWorkerRegistration) => void;
// };

// export function register(config?: Config) {
//   if (process.env.NODE_ENV === "production" && "serviceWorker" in navigator) {
//     const publicUrl = new URL(
//       process.env.PUBLIC_URL || "",
//       window.location.href,
//     );
//     if (publicUrl.origin !== window.location.origin) {
//       return;
//     }
//     window.addEventListener("load", () => {
//       const swUrl = `./sw.js`;

//       if (isLocalhost) {
//         checkValidServiceWorker(swUrl, config);
//         navigator.serviceWorker.ready.then(() => {
//           console.log(
//             "This web app is being served cache-first by a service worker. To learn more, visit https://cra.link/PWA",
//           );
//         });
//       } else {
//         registerValidSW(swUrl, config);
//       }
//     });
//   }
// }

// function registerValidSW(swUrl: string, config?: Config) {
//   navigator.serviceWorker
//     .register(swUrl)
//     .then((registration) => {
//       registration.onupdatefound = () => {
//         const installingWorker = registration.installing;
//         if (installingWorker == null) {
//           return;
//         }
//         installingWorker.onstatechange = () => {
//           if (installingWorker.state === "installed") {
//             if (navigator.serviceWorker.controller) {
//               console.log(
//                 "New content is available and will be used when all tabs for this page are closed. See https://cra.link/PWA.",
//               );
//               if (config && config.onUpdate) {
//                 config.onUpdate(registration);
//               }
//             } else {
//               console.log("Content is cached for offline use.");
//               if (config && config.onSuccess) {
//                 config.onSuccess(registration);
//               }
//             }
//           }
//         };
//       };
//     })
//     .catch((error) => {
//       console.error("Error during service worker registration:", error);
//     });
// }

// function checkValidServiceWorker(swUrl: string, config?: Config) {
//   fetch(swUrl, {
//     headers: { "Service-Worker": "script" },
//   })
//     .then((response) => {
//       const contentType = response.headers.get("content-type");
//       if (
//         response.status === 404 ||
//         (contentType != null && contentType.indexOf("javascript") === -1)
//       ) {
//         navigator.serviceWorker.ready.then((registration) => {
//           registration.unregister().then(() => {
//             window.location.reload();
//           });
//         });
//       } else {
//         registerValidSW(swUrl, config);
//       }
//     })
//     .catch(() => {
//       console.log(
//         "No internet connection found. App is running in offline mode.",
//       );
//     });
// }

// export function unregister() {
//   if ("serviceWorker" in navigator) {
//     navigator.serviceWorker.ready
//       .then((registration) => {
//         registration.unregister();
//       })
//       .catch((error) => {
//         console.error(error.message);
//       });
//   }
// }

//////////////////////

// const isLocalhost = Boolean(
//   window.location.hostname === "localhost" ||
//   window.location.hostname === "[::1]" ||
//   window.location.hostname.match(
//     /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/,
//   ),
// );

// type Config = {
//   onSuccess?: (registration: ServiceWorkerRegistration) => void;
//   onUpdate?: (registration: ServiceWorkerRegistration) => void;
// };

// export function register(config?: Config) {
//   if (process.env.NODE_ENV === "production" && "serviceWorker" in navigator) {
//     const publicUrl = new URL(
//       process.env.PUBLIC_URL || "",
//       window.location.href,
//     );
//     if (publicUrl.origin !== window.location.origin) {
//       return;
//     }

//     window.addEventListener("load", () => {
//       const swUrl = `${publicUrl.origin}/sw.js`;

//       if (isLocalhost) {
//         checkValidServiceWorker(swUrl, config);
//         navigator.serviceWorker.ready.then(() => {
//           console.log(
//             "This web app is being served cache-first by a service worker.",
//           );
//         });
//       } else {
//         registerValidSW(swUrl, config);
//       }
//     });
//   }
// }

// function registerValidSW(swUrl: string, config?: Config) {
//   navigator.serviceWorker
//     .register(swUrl)
//     .then((registration) => {
//       registration.onupdatefound = () => {
//         const installingWorker = registration.installing;
//         if (installingWorker == null) {
//           return;
//         }
//         installingWorker.onstatechange = () => {
//           if (installingWorker.state === "installed") {
//             if (navigator.serviceWorker.controller) {
//               console.log("New content is available; please refresh.");
//               if (config && config.onUpdate) {
//                 config.onUpdate(registration);
//               }
//             } else {
//               console.log("Content is cached for offline use.");
//               if (config && config.onSuccess) {
//                 config.onSuccess(registration);
//               }
//             }
//           }
//         };
//       };
//     })
//     .catch((error) => {
//       console.error("Error during service worker registration:", error);
//     });
// }

// function checkValidServiceWorker(swUrl: string, config?: Config) {
//   fetch(swUrl, {
//     headers: { "Service-Worker": "script" },
//   })
//     .then((response) => {
//       const contentType = response.headers.get("content-type");
//       if (
//         response.status === 404 ||
//         (contentType != null && contentType.indexOf("javascript") === -1)
//       ) {
//         navigator.serviceWorker.ready.then((registration) => {
//           registration.unregister().then(() => {
//             window.location.reload();
//           });
//         });
//       } else {
//         registerValidSW(swUrl, config);
//       }
//     })
//     .catch(() => {
//       console.log(
//         "No internet connection found. App is running in offline mode.",
//       );
//     });
// }

// export function unregister() {
//   if ("serviceWorker" in navigator) {
//     navigator.serviceWorker.ready
//       .then((registration) => {
//         registration.unregister();
//       })
//       .catch((error) => {
//         console.error(error.message);
//       });
//   }
// }

//////////////

// const isLocalhost = Boolean(
//   window.location.hostname === "localhost" ||
//   window.location.hostname === "[::1]" ||
//   window.location.hostname.match(
//     /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/,
//   ),
// );

// type Config = {
//   onSuccess?: (registration: ServiceWorkerRegistration) => void;
//   onUpdate?: (registration: ServiceWorkerRegistration) => void;
// };

// export function register(config?: Config) {
//   if (process.env.NODE_ENV === "production" && "serviceWorker" in navigator) {
//     const publicUrl = new URL(
//       process.env.PUBLIC_URL || "",
//       window.location.href,
//     );
//     if (publicUrl.origin !== window.location.origin) {
//       return;
//     }

//     window.addEventListener("load", () => {
//       const swUrl = `${publicUrl.origin}/sw.js`;

//       if (isLocalhost) {
//         checkValidServiceWorker(swUrl, config);
//         navigator.serviceWorker.ready.then(() => {
//           console.log(
//             "This web app is being served cache-first by a service worker.",
//           );
//         });
//       } else {
//         registerValidSW(swUrl, config);
//       }
//     });
//   }
// }

// function registerValidSW(swUrl: string, config?: Config) {
//   navigator.serviceWorker
//     .register(swUrl)
//     .then((registration) => {
//       registration.onupdatefound = () => {
//         const installingWorker = registration.installing;
//         if (installingWorker == null) {
//           return;
//         }
//         installingWorker.onstatechange = () => {
//           if (installingWorker.state === "installed") {
//             if (navigator.serviceWorker.controller) {
//               console.log("New content is available; please refresh.");
//               if (config && config.onUpdate) {
//                 config.onUpdate(registration);
//               }
//             } else {
//               console.log("Content is cached for offline use.");
//               if (config && config.onSuccess) {
//                 config.onSuccess(registration);
//               }
//             }
//           }
//         };
//       };
//     })
//     .catch((error) => {
//       console.error("Error during service worker registration:", error);
//     });
// }

// function checkValidServiceWorker(swUrl: string, config?: Config) {
//   fetch(swUrl, {
//     headers: { "Service-Worker": "script" },
//   })
//     .then((response) => {
//       const contentType = response.headers.get("content-type");
//       if (
//         response.status === 404 ||
//         (contentType != null && contentType.indexOf("javascript") === -1)
//       ) {
//         navigator.serviceWorker.ready.then((registration) => {
//           registration.unregister().then(() => {
//             window.location.reload();
//           });
//         });
//       } else {
//         registerValidSW(swUrl, config);
//       }
//     })
//     .catch(() => {
//       console.log(
//         "No internet connection found. App is running in offline mode.",
//       );
//     });
// }

// export function unregister() {
//   if ("serviceWorker" in navigator) {
//     navigator.serviceWorker.ready
//       .then((registration) => {
//         registration.unregister();
//       })
//       .catch((error) => {
//         console.error(error.message);
//       });
//   }
// }

/////////////////

// const isLocalhost = Boolean(
//   window.location.hostname === "localhost" ||
//   window.location.hostname === "[::1]" ||
//   window.location.hostname.match(
//     /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/,
//   ),
// );

// type Config = {
//   onSuccess?: (registration: ServiceWorkerRegistration) => void;
//   onUpdate?: (registration: ServiceWorkerRegistration) => void;
// };

// export function register(config?: Config) {
//   if (process.env.NODE_ENV === "production" && "serviceWorker" in navigator) {
//     const publicUrl = new URL(
//       process.env.PUBLIC_URL || "",
//       window.location.href,
//     );
//     if (publicUrl.origin !== window.location.origin) {
//       return;
//     }

//     window.addEventListener("load", () => {
//       const swUrl = `${process.env.PUBLIC_URL}/sw.js`;

//       if (isLocalhost) {
//         checkValidServiceWorker(swUrl, config);
//         navigator.serviceWorker.ready.then(() => {
//           console.log(
//             "This web app is being served cache-first by a service worker. To learn more, visit https://cra.link/PWA",
//           );
//         });
//       } else {
//         registerValidSW(swUrl, config);
//       }
//     });
//   }
// }

// function registerValidSW(swUrl: string, config?: Config) {
//   navigator.serviceWorker
//     .register(swUrl)
//     .then((registration) => {
//       registration.onupdatefound = () => {
//         const installingWorker = registration.installing;
//         if (installingWorker == null) {
//           return;
//         }
//         installingWorker.onstatechange = () => {
//           if (installingWorker.state === "installed") {
//             if (navigator.serviceWorker.controller) {
//               console.log(
//                 "New content is available and will be used when all tabs for this page are closed. See https://cra.link/PWA.",
//               );
//               if (config && config.onUpdate) {
//                 config.onUpdate(registration);
//               }
//             } else {
//               console.log("Content is cached for offline use.");
//               if (config && config.onSuccess) {
//                 config.onSuccess(registration);
//               }
//             }
//           }
//         };
//       };
//     })
//     .catch((error) => {
//       console.error("Error during service worker registration:", error);
//     });
// }

// function checkValidServiceWorker(swUrl: string, config?: Config) {
//   fetch(swUrl, {
//     headers: { "Service-Worker": "script" },
//   })
//     .then((response) => {
//       const contentType = response.headers.get("content-type");
//       if (
//         response.status === 404 ||
//         (contentType != null && contentType.indexOf("javascript") === -1)
//       ) {
//         navigator.serviceWorker.ready.then((registration) => {
//           registration.unregister().then(() => {
//             window.location.reload();
//           });
//         });
//       } else {
//         registerValidSW(swUrl, config);
//       }
//     })
//     .catch(() => {
//       console.log(
//         "No internet connection found. App is running in offline mode.",
//       );
//     });
// }

// export function unregister() {
//   if ("serviceWorker" in navigator) {
//     navigator.serviceWorker.ready
//       .then((registration) => {
//         registration.unregister();
//       })
//       .catch((error) => {
//         console.error(error.message);
//       });
//   }
// }

////////////////////////////////////

// const isLocalhost = Boolean(
//   window.location.hostname === "localhost" ||
//   window.location.hostname === "[::1]" ||
//   window.location.hostname.match(
//     /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/,
//   ),
// );

// type Config = {
//   onSuccess?: (registration: ServiceWorkerRegistration) => void;
//   onUpdate?: (registration: ServiceWorkerRegistration) => void;
// };

// export function register(config?: Config) {
//   if (process.env.NODE_ENV === "production" && "serviceWorker" in navigator) {
//     const publicUrl = new URL(
//       process.env.PUBLIC_URL || "",
//       window.location.href,
//     );
//     if (publicUrl.origin !== window.location.origin) {
//       return;
//     }

//     window.addEventListener("load", () => {
//       const swUrl = `${process.env.PUBLIC_URL}/sw.js`;

//       if (isLocalhost) {
//         checkValidServiceWorker(swUrl, config);
//         navigator.serviceWorker.ready.then(() => {
//           console.log(
//             "This web app is being served cache-first by a service worker. To learn more, visit https://cra.link/PWA",
//           );
//         });
//       } else {
//         registerValidSW(swUrl, config);
//       }
//     });
//   }
// }

// function registerValidSW(swUrl: string, config?: Config) {
//   navigator.serviceWorker
//     .register(swUrl)
//     .then((registration) => {
//       registration.onupdatefound = () => {
//         const installingWorker = registration.installing;
//         if (installingWorker == null) {
//           return;
//         }
//         installingWorker.onstatechange = () => {
//           if (installingWorker.state === "installed") {
//             if (navigator.serviceWorker.controller) {
//               console.log(
//                 "New content is available and will be used when all tabs for this page are closed. See https://cra.link/PWA.",
//               );
//               if (config && config.onUpdate) {
//                 config.onUpdate(registration);
//               }
//             } else {
//               console.log("Content is cached for offline use.");
//               if (config && config.onSuccess) {
//                 config.onSuccess(registration);
//               }
//             }
//           }
//         };
//       };
//     })
//     .catch((error) => {
//       console.error("Error during service worker registration:", error);
//     });
// }

// function checkValidServiceWorker(swUrl: string, config?: Config) {
//   fetch(swUrl, {
//     headers: { "Service-Worker": "script" },
//   })
//     .then((response) => {
//       const contentType = response.headers.get("content-type");
//       if (
//         response.status === 404 ||
//         (contentType != null && contentType.indexOf("javascript") === -1)
//       ) {
//         navigator.serviceWorker.ready.then((registration) => {
//           registration.unregister().then(() => {
//             window.location.reload();
//           });
//         });
//       } else {
//         registerValidSW(swUrl, config);
//       }
//     })
//     .catch(() => {
//       console.log(
//         "No internet connection found. App is running in offline mode.",
//       );
//     });
// }

// export function unregister() {
//   if ("serviceWorker" in navigator) {
//     navigator.serviceWorker.ready
//       .then((registration) => {
//         registration.unregister();
//       })
//       .catch((error) => {
//         console.error(error.message);
//       });
//   }
// }
