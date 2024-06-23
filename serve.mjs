import express from "express";
import { readFileSync } from "fs";
import { resolve } from "path";
import { createServer } from "https";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env file

const keyPath = process.env.VITE_SSL_KEY_PATH;
const certPath = process.env.VITE_SSL_CERT_PATH;

if (!keyPath || !certPath) {
  throw new Error(
    "SSL key and certificate paths must be defined in the .env file",
  );
}

const app = express();
const options = {
  key: readFileSync(resolve(keyPath)),
  cert: readFileSync(resolve(certPath)),
};

const port = 5173;
const publicPath = resolve("dist");

// Serve static files from the dist directory
app.use(express.static(publicPath));

// Serve index.html for all other routes to support client-side routing
app.get("*", (req, res) => {
  res.sendFile(resolve(publicPath, "index.html"));
});

createServer(options, app).listen(port, () => {
  console.log(`Server is running on https://localhost:${port}`);
});
