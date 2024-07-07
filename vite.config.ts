import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import path from "path";

export default defineConfig(({ command, mode }) => {
  // Load the correct environment variables based on the mode
  const env = loadEnv(mode, process.cwd());

  const serverConfig = {
    host: "0.0.0.0",
    port: 5173,
    hmr: {
      host: env.VITE_API_BASE_URL.split(":")[1].replace("//", ""), // Use the network IP from the environment variable
      port: 5173,
    },
  };

  const baseUrl = env.VITE_PUBLIC_URL || "/";

  return {
    base: baseUrl,
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
    ],
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

//////////

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
