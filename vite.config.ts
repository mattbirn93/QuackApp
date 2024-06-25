import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import { readFileSync } from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const keyPath = process.env.VITE_SSL_KEY_PATH;
const certPath = process.env.VITE_SSL_CERT_PATH;

let key, cert;
try {
  key = readFileSync(path.resolve(__dirname, keyPath));
  cert = readFileSync(path.resolve(__dirname, certPath));
} catch (error) {
  console.warn("SSL key or certificate not found, using HTTP instead of HTTPS");
}

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "QuackApp",
        short_name: "QuackApp",
        description: "My screenwriting app",
        theme_color: "#4A90E2",
        background_color: "#ffffff",
        display: "standalone",
        start_url: "/",
        scope: "/",
        icons: [
          {
            src: "icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "icon-maskable-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
        splash_screens: [
          {
            src: "splash-640x1136.png",
            sizes: "640x1136",
            type: "image/png",
          },
          {
            src: "splash-750x1334.png",
            sizes: "750x1334",
            type: "image/png",
          },
          {
            src: "splash-1242x2208.png",
            sizes: "1242x2208",
            type: "image/png",
          },
          {
            src: "splash-1125x2436.png",
            sizes: "1125x2436",
            type: "image/png",
          },
          {
            src: "splash-828x1792.png",
            sizes: "828x1792",
            type: "image/png",
          },
          {
            src: "splash-1242x2688.png",
            sizes: "1242x2688",
            type: "image/png",
          },
          {
            src: "splash-1536x2048.png",
            sizes: "1536x2048",
            type: "image/png",
          },
          {
            src: "splash-1668x2224.png",
            sizes: "1668x2224",
            type: "image/png",
          },
          {
            src: "splash-1668x2388.png",
            sizes: "1668x2388",
            type: "image/png",
          },
          {
            src: "splash-2048x2732.png",
            sizes: "2048x2732",
            type: "image/png",
          },
        ],
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/your-api-domain\.com\//,
            handler: "NetworkFirst",
            options: {
              cacheName: "api-cache",
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 300, // 5 minutes
              },
            },
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: "0.0.0.0",
    port: 5173,
    https: key && cert ? { key, cert } : false,
  },
  build: {
    outDir: "dist",
  },
});

///////////

// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
// import { VitePWA } from "vite-plugin-pwa";
// import { readFileSync } from "fs";
// import path from "path";
// import dotenv from "dotenv";

// dotenv.config();

// const keyPath = process.env.VITE_SSL_KEY_PATH;
// const certPath = process.env.VITE_SSL_CERT_PATH;

// if (!keyPath || !certPath) {
//   throw new Error(
//     "SSL key and certificate paths must be defined in the .env file",
//   );
// }

// export default defineConfig({
//   plugins: [
//     react(),
//     VitePWA({
//       registerType: "autoUpdate",
//       manifest: {
//         name: "QuackApp",
//         short_name: "QuackApp",
//         description: "My screenwriting app",
//         theme_color: "#4A90E2",
//         background_color: "#ffffff",
//         display: "standalone",
//         start_url: "/",
//         scope: "/",
//         icons: [
//           {
//             src: "icon-192x192.png",
//             sizes: "192x192",
//             type: "image/png",
//             purpose: "any",
//           },
//           {
//             src: "icon-512x512.png",
//             sizes: "512x512",
//             type: "image/png",
//             purpose: "any",
//           },
//           {
//             src: "icon-maskable-512x512.png",
//             sizes: "512x512",
//             type: "image/png",
//             purpose: "maskable",
//           },
//         ],
//         splash_screens: [
//           {
//             src: "splash-640x1136.png",
//             sizes: "640x1136",
//             type: "image/png",
//           },
//           {
//             src: "splash-750x1334.png",
//             sizes: "750x1334",
//             type: "image/png",
//           },
//           {
//             src: "splash-1242x2208.png",
//             sizes: "1242x2208",
//             type: "image/png",
//           },
//           {
//             src: "splash-1125x2436.png",
//             sizes: "1125x2436",
//             type: "image/png",
//           },
//           {
//             src: "splash-828x1792.png",
//             sizes: "828x1792",
//             type: "image/png",
//           },
//           {
//             src: "splash-1242x2688.png",
//             sizes: "1242x2688",
//             type: "image/png",
//           },
//           {
//             src: "splash-1536x2048.png",
//             sizes: "1536x2048",
//             type: "image/png",
//           },
//           {
//             src: "splash-1668x2224.png",
//             sizes: "1668x2224",
//             type: "image/png",
//           },
//           {
//             src: "splash-1668x2388.png",
//             sizes: "1668x2388",
//             type: "image/png",
//           },
//           {
//             src: "splash-2048x2732.png",
//             sizes: "2048x2732",
//             type: "image/png",
//           },
//         ],
//       },
//       workbox: {
//         runtimeCaching: [
//           {
//             urlPattern: /^https:\/\/your-api-domain\.com\//,
//             handler: "NetworkFirst",
//             options: {
//               cacheName: "api-cache",
//               expiration: {
//                 maxEntries: 10,
//                 maxAgeSeconds: 300, // 5 minutes
//               },
//             },
//           },
//         ],
//       },
//     }),
//   ],
//   resolve: {
//     alias: {
//       "@": path.resolve(__dirname, "./src"),
//     },
//   },
//   server: {
//     host: "0.0.0.0",
//     port: 5173,
//     https: {
//       key: readFileSync(path.resolve(__dirname, keyPath)),
//       cert: readFileSync(path.resolve(__dirname, certPath)),
//     },
//   },
//   build: {
//     outDir: "dist",
//   },
// });
