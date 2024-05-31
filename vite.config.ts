// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
// import path from "path";
// import { VitePWA } from "vite-plugin-pwa";

// export default defineConfig({
//   plugins: [
//     react(),
//     VitePWA({
//       registerType: "autoUpdate",
//       includeAssets: ["favicon.ico", "robots.txt", "apple-touch-icon.png"],
//       manifest: {
//         name: "Screenwriting App",
//         short_name: "Screenwriting",
//         description: "A screenwriting app with voice-to-text functionality",
//         theme_color: "#ffffff",
//         icons: [
//           {
//             src: "pwa-192x192.png",
//             sizes: "192x192",
//             type: "image/png",
//           },
//           {
//             src: "pwa-512x512.png",
//             sizes: "512x512",
//             type: "image/png",
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
//   },
//   build: {
//     outDir: "dist",
//   },
// });

///////////////////////////////////////

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: "0.0.0.0",
    port: 5173,
  },
  build: {
    outDir: "dist",
  },
});
