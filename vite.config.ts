import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env file

// Ensure the environment variables are defined
const keyPath = process.env.VITE_SSL_KEY_PATH;
const certPath = process.env.VITE_SSL_CERT_PATH;

if (!keyPath || !certPath) {
  throw new Error(
    "SSL key and certificate paths must be defined in the .env file",
  );
}

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
    https: {
      key: fs.readFileSync(path.resolve(__dirname, keyPath)),
      cert: fs.readFileSync(path.resolve(__dirname, certPath)),
    },
  },
  build: {
    outDir: "dist",
  },
});

///////////////////////////////////////////////

// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
// import path from "path";

// export default defineConfig({
//   plugins: [react()],
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
