import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import path from "path";
import dotenv from "dotenv";

export default defineConfig(({ mode }) => {
  // Determine the appropriate .env file based on the mode
  const envFile = mode === "network" ? ".env.network" : `.env.${mode}`;
  dotenv.config({ path: envFile });

  const serverConfig = {
    host: "0.0.0.0",
    port: process.env.VITE_PORT || 5173,
    hmr: {
      host: "localhost",
      port: process.env.VITE_PORT || 5173,
    },
  };

  const baseUrl = process.env.VITE_PUBLIC_URL || "/";

  const plugins = [
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
        start_url: baseUrl,
        scope: baseUrl,
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
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern:
              /^https:\/\/aqueous-fortress-42552-d35f4f194ee9.herokuapp.com\//,
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
  ];

  return {
    base: baseUrl,
    plugins,
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    server: serverConfig,
    build: {
      outDir: "dist",
    },
  };
});

//////

// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
// import { VitePWA } from "vite-plugin-pwa";
// import path from "path";
// import dotenv from "dotenv";

// dotenv.config();

// export default defineConfig(({ command, mode }) => {
//   const serverConfig = {
//     host: "0.0.0.0",
//     port: 5173,
//     hmr: {
//       host: "localhost",
//       port: 5173,
//     },
//   };

//   const baseUrl = process.env.VITE_PUBLIC_URL || "/";

//   return {
//     base: baseUrl,
//     plugins: [
//       react(),
//       VitePWA({
//         registerType: "autoUpdate",
//         manifest: {
//           name: "QuackApp",
//           short_name: "QuackApp",
//           description: "My screenwriting app",
//           theme_color: "#4A90E2",
//           background_color: "#ffffff",
//           display: "standalone",
//           start_url: baseUrl,
//           scope: baseUrl,
//           icons: [
//             {
//               src: "icon-192x192.png",
//               sizes: "192x192",
//               type: "image/png",
//               purpose: "any",
//             },
//             {
//               src: "icon-512x512.png",
//               sizes: "512x512",
//               type: "image/png",
//               purpose: "any",
//             },
//             {
//               src: "icon-maskable-512x512.png",
//               sizes: "512x512",
//               type: "image/png",
//               purpose: "maskable",
//             },
//           ],
//         },
//         workbox: {
//           runtimeCaching: [
//             {
//               urlPattern:
//                 /^https:\/\/aqueous-fortress-42552-d35f4f194ee9.herokuapp.com\//,
//               handler: "NetworkFirst",
//               options: {
//                 cacheName: "api-cache",
//                 expiration: {
//                   maxEntries: 10,
//                   maxAgeSeconds: 300, // 5 minutes
//                 },
//               },
//             },
//           ],
//         },
//       }),
//     ],
//     resolve: {
//       alias: {
//         "@": path.resolve(__dirname, "./src"),
//       },
//     },
//     server: serverConfig,
//     build: {
//       outDir: "dist",
//     },
//   };
// });

////////// BELOW HERE IS MODE SWITCHING VERSION FOR ENV VARIBALE IN CASE YOU WANT TO TRY

// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
// import { VitePWA } from "vite-plugin-pwa";
// import path from "path";
// import dotenv from "dotenv";

// // Load environment variables based on the mode
// export default defineConfig(({ command, mode }) => {
//   const envFiles = {
//     development: '.env.development',
//     production: '.env.production',
//     staging: '.env.staging',
//   };

//   dotenv.config({ path: envFiles[mode] });

//   const serverConfig = {
//     host: "0.0.0.0",
//     port: 5173,
//     hmr: {
//       host: "localhost",
//       port: 5173,
//     },
//   };

//   const baseUrl = process.env.VITE_PUBLIC_URL || "/";

//   return {
//     base: baseUrl,
//     plugins: [
//       react(),
//       VitePWA({
//         registerType: "autoUpdate",
//         manifest: {
//           name: "QuackApp",
//           short_name: "QuackApp",
//           description: "My screenwriting app",
//           theme_color: "#4A90E2",
//           background_color: "#ffffff",
//           display: "standalone",
//           start_url: baseUrl,
//           scope: baseUrl,
//           icons: [
//             {
//               src: "icon-192x192.png",
//               sizes: "192x192",
//               type: "image/png",
//               purpose: "any",
//             },
//             {
//               src: "icon-512x512.png",
//               sizes: "512x512",
//               type: "image/png",
//               purpose: "any",
//             },
//             {
//               src: "icon-maskable-512x512.png",
//               sizes: "512x512",
//               type: "image/png",
//               purpose: "maskable",
//             },
//           ],
//         },
//         workbox: {
//           runtimeCaching: [
//             {
//               urlPattern:
//                 /^https:\/\/aqueous-fortress-42552-d35f4f194ee9.herokuapp.com\//,
//               handler: "NetworkFirst",
//               options: {
//                 cacheName: "api-cache",
//                 expiration: {
//                   maxEntries: 10,
//                   maxAgeSeconds: 300, // 5 minutes
//                 },
//               },
//             },
//           ],
//         },
//       }),
//     ],
//     resolve: {
//       alias: {
//         "@": path.resolve(__dirname, "./src"),
//       },
//     },
//     server: serverConfig,
//     build: {
//       outDir: "dist",
//     },
//   };
// });
