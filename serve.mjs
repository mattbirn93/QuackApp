import "tsconfig-paths/register.js";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./backend/config/db.js"; // Adjust the path as needed
import { Server as SocketIOServer } from "socket.io";

// Load environment variables from .env file
dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5001;

// Connect to MongoDB
connectDB();

// Middleware
app.use(bodyParser.json());
app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://aqueous-fortress-42552-d35f4f194ee9.herokuapp.com",
    ], // Adjust this according to your needs
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);

//test
app.get("/test", (req, res) => {
  res.send("API is working!");
});

// API Routes
import userRoutes from "./backend/routes/userRoutes.js";
import scriptRoutes from "./backend/routes/scriptRoutes.js";
import sceneRoutes from "./backend/routes/sceneRoutes.js";
import sceneVersionRoutes from "./backend/routes/sceneVersionRoutes.js";
import sceneVersionContentRoutes from "./backend/routes/sceneVersionContentRoutes.js";

app.use("/api/users", userRoutes);
app.use("/api/scripts", scriptRoutes);
app.use("/api/scenes", sceneRoutes);
app.use("/api/sceneVersions", sceneVersionRoutes);
app.use("/api/sceneVersionContent", sceneVersionContentRoutes);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "dist")));

// Catch-all route - this should be the last route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// Start the servers
const server = app.listen(Number(PORT), "0.0.0.0", () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// Set up Socket.ios
const io = new SocketIOServer(server, {
  cors: {
    origin: [
      "http://localhost:5173",
      "https://aqueous-fortress-42552-d35f4f194ee9.herokuapp.com",
    ], // Ensure CORS for Socket.io as well
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("New client connected", socket.id);

  // Define your socket event handlers here
});

/////////

// import express from "express";
// import { createServer } from "http";
// import { resolve } from "path";
// import dotenv from "dotenv";

// dotenv.config(); // Load environment variables from .env file

// const app = express();
// const port = process.env.PORT || 5173; // Default to 5173 if no port is specified, Heroku sets process.env.PORT

// // Define static files location; typically, this would be where your built frontend reside
// const publicPath = resolve("dist");

// // Serve static files
// app.use(express.static(publicPath));

// // Serve index.html on all other routes to support client-side routing
// app.get("*", (req, res) => {
//   res.sendFile(resolve(publicPath, "index.html"));
// });

// // Start HTTP server
// createServer(app).listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });

///////////

// import express from "express";
// import { createServer } from "http";
// import { resolve } from "path";
// import dotenv from "dotenv";

// dotenv.config(); // Load environment variables from .env file

// const app = express();
// const port = process.env.PORT || 5173; // Default to 5173 if no port is specified, Heroku sets process.env.PORT

// // Define static files location; typically, this would be where your built frontend reside
// const publicPath = resolve("dist");

// // Serve static files
// app.use(express.static(publicPath));

// // Serve index.html on all other routes to support client-side routing
// app.get("*", (req, res) => {
//   res.sendFile(resolve(publicPath, "index.html"));
// });

// // Start HTTP server
// createServer(app).listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });

/////////////////////
///

// import express from "express";
// import { createServer } from "http";
// import { resolve } from "path";
// import dotenv from "dotenv";

// dotenv.config(); // Load environment variables from .env file

// const app = express();
// const port = process.env.PORT || 5173; // Default to 5173 if no port is specified, Heroku sets process.env.PORT

// // Define static files location; typically, this would be where your built frontend resides
// const publicPath = resolve("dist");

// // Serve static files
// app.use(express.static(publicPath));

// // Serve index.html on all other routes to support client-side routing
// app.get("*", (req, res) => {
//   res.sendFile(resolve(publicPath, "index.html"));
// });

// // Start HTTP server
// createServer(app).listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });

//////////////

// import express from "express";
// import { readFileSync } from "fs";
// import { resolve } from "path";
// import { createServer } from "https";
// import dotenv from "dotenv";

// dotenv.config(); // Load environment variables from .env file

// const keyPath = process.env.VITE_SSL_KEY_PATH;
// const certPath = process.env.VITE_SSL_CERT_PATH;

// if (!keyPath || !certPath) {
//   throw new Error(
//     "SSL key and certificate paths must be defined in the .env file",
//   );
// }

// const app = express();
// const options = {
//   key: readFileSync(resolve(keyPath)),
//   cert: readFileSync(resolve(certPath)),
// };

// const port = 5173;
// const publicPath = resolve("dist");

// // Serve static files from the dist directory
// app.use(express.static(publicPath));

// // Serve index.html for all other routes to support client-side routing
// app.get("*", (req, res) => {
//   res.sendFile(resolve(publicPath, "index.html"));
// });

// createServer(options, app).listen(port, () => {
//   console.log(`Server is running on https://localhost:${port}`);
// });

/////////////

// import express from "express";
// import { readFileSync } from "fs";
// import { resolve } from "path";
// import { createServer } from "https";
// import dotenv from "dotenv";

// dotenv.config(); // Load environment variables from .env file

// const keyPath = process.env.VITE_SSL_KEY_PATH;
// const certPath = process.env.VITE_SSL_CERT_PATH;

// if (!keyPath || !certPath) {
//   throw new Error(
//     "SSL key and certificate paths must be defined in the .env file",
//   );
// }

// const app = express();
// const options = {
//   key: readFileSync(resolve(keyPath)),
//   cert: readFileSync(resolve(certPath)),
// };

// const port = 5173;
// const publicPath = resolve("dist");

// // Serve static files from the dist directory
// app.use(express.static(publicPath));

// // Serve index.html for all other routes to support client-side routing
// app.get("*", (req, res) => {
//   res.sendFile(resolve(publicPath, "index.html"));
// });

// createServer(options, app).listen(port, () => {
//   console.log(`Server is running on https://localhost:${port}`);
// });

////////////

// import express from "express";
// import { readFileSync } from "fs";
// import { resolve } from "path";
// import { createServer } from "https";
// import dotenv from "dotenv";

// dotenv.config(); // Load environment variables from .env file

// const keyPath = process.env.VITE_SSL_KEY_PATH;
// const certPath = process.env.VITE_SSL_CERT_PATH;

// if (!keyPath || !certPath) {
//   throw new Error(
//     "SSL key and certificate paths must be defined in the .env file",
//   );
// }

// const app = express();
// const options = {
//   key: readFileSync(resolve(keyPath)),
//   cert: readFileSync(resolve(certPath)),
// };

// const port = 5173;
// const publicPath = resolve("dist");

// // Serve static files from the dist directory
// app.use(express.static(publicPath));

// // Serve index.html for all other routes to support client-side routing
// app.get("*", (req, res) => {
//   res.sendFile(resolve(publicPath, "index.html"));
// });

// createServer(options, app).listen(port, () => {
//   console.log(`Server is running on https://localhost:${port}`);
// });

///////////////////////

// import express from "express";
// import { readFileSync } from "fs";
// import { resolve } from "path";
// import { createServer } from "https";
// import dotenv from "dotenv";

// dotenv.config(); // Load environment variables from .env file

// const keyPath = process.env.VITE_SSL_KEY_PATH;
// const certPath = process.env.VITE_SSL_CERT_PATH;

// if (!keyPath || !certPath) {
//   throw new Error(
//     "SSL key and certificate paths must be defined in the .env file",
//   );
// }

// const app = express();
// const options = {
//   key: readFileSync(resolve(keyPath)),
//   cert: readFileSync(resolve(certPath)),
// };

// const port = 5173;
// const publicPath = resolve("dist");

// // Serve static files from the dist directory
// app.use(express.static(publicPath));

// // Serve index.html for all other routes to support client-side routing
// app.get("*", (req, res) => {
//   res.sendFile(resolve(publicPath, "index.html"));
// });

// createServer(options, app).listen(port, () => {
//   console.log(`Server is running on https://localhost:${port}`);
// });

////////////

// import express from "express";
// import { readFileSync, existsSync } from "fs";
// import { resolve } from "path";
// import { createServer as createHttpServer } from "http";
// import { createServer as createHttpsServer } from "https";
// import dotenv from "dotenv";

// dotenv.config(); // Load environment variables from .env file

// const keyPath = process.env.VITE_SSL_KEY_PATH;
// const certPath = process.env.VITE_SSL_CERT_PATH;

// const app = express();

// let server;
// if (keyPath && certPath && existsSync(keyPath) && existsSync(certPath)) {
//   const options = {
//     key: readFileSync(resolve(keyPath)),
//     cert: readFileSync(resolve(certPath)),
//   };
//   server = createHttpsServer(options, app);
//   console.log("Starting server with HTTPS...");
// } else {
//   server = createHttpServer(app);
//   console.log("Starting server with HTTP...");
// }

// const port = process.env.PORT || 5173;
// const publicPath = resolve("dist");

// // Serve static files from the dist directory
// app.use(express.static(publicPath));

// // Serve index.html for all other routes to support client-side routing
// app.get("*", (req, res) => {
//   res.sendFile(resolve(publicPath, "index.html"));
// });

// server.listen(port, () => {
//   console.log(
//     `Server is running on ${server instanceof HttpsServer ? "https" : "http"}://localhost:${port}`,
//   );
// });

/////////////

// import express from "express";
// import { readFileSync, existsSync } from "fs";
// import { resolve } from "path";
// import { createServer } from "https";
// import dotenv from "dotenv";

// dotenv.config(); // Load environment variables from .env file

// const keyPath = process.env.VITE_SSL_KEY_PATH;
// const certPath = process.env.VITE_SSL_CERT_PATH;

// const app = express();
// const port = process.env.PORT || 5173;
// const publicPath = resolve("dist");

// // Serve static files from the dist directory
// app.use(express.static(publicPath));

// // Serve index.html for all other routes to support client-side routing
// app.get("*", (req, res) => {
//   res.sendFile(resolve(publicPath, "index.html"));
// });

// if (keyPath && certPath && existsSync(keyPath) && existsSync(certPath)) {
//   const options = {
//     key: readFileSync(resolve(keyPath)),
//     cert: readFileSync(resolve(certPath)),
//   };

//   createServer(options, app).listen(port, () => {
//     console.log(`Server is running on https://localhost:${port}`);
//   });
// } else {
//   app.listen(port, () => {
//     console.log(`Server is running on http://localhost:${port}`);
//   });
// }

//////////////

// import express from "express";
// import { readFileSync } from "fs";
// import { resolve } from "path";
// import { createServer } from "https";
// import dotenv from "dotenv";

// dotenv.config(); // Load environment variables from .env file

// const keyPath = process.env.VITE_SSL_KEY_PATH;
// const certPath = process.env.VITE_SSL_CERT_PATH;

// if (!keyPath || !certPath) {
//   console.log("SSL key or certificate not found, using HTTP instead of HTTPS");
// }

// const app = express();
// const options =
//   keyPath && certPath
//     ? {
//         key: readFileSync(resolve(keyPath)),
//         cert: readFileSync(resolve(certPath)),
//       }
//     : null;

// const port = process.env.PORT || 5173;
// const publicPath = resolve("dist");

// // Serve static files from the dist directory
// app.use(express.static(publicPath));

// // Serve index.html for all other routes to support client-side routing
// app.get("*", (req, res) => {
//   res.sendFile(resolve(publicPath, "index.html"));
// });

// if (options) {
//   createServer(options, app).listen(port, () => {
//     console.log(`Server is running on https://localhost:${port}`);
//   });
// } else {
//   app.listen(port, () => {
//     console.log(`Server is running on http://localhost:${port}`);
//   });
// }

////////////////

// import express from "express";
// import { readFileSync } from "fs";
// import { resolve } from "path";
// import { createServer } from "https";
// import http from "http";
// import dotenv from "dotenv";

// dotenv.config(); // Load environment variables from .env file

// const keyPath = process.env.VITE_SSL_KEY_PATH;
// const certPath = process.env.VITE_SSL_CERT_PATH;

// const app = express();
// const port = process.env.PORT || 5173;
// const publicPath = resolve("dist");

// // Serve static files from the dist directory
// app.use(express.static(publicPath));

// // Serve index.html for all other routes to support client-side routing
// app.get("*", (req, res) => {
//   res.sendFile(resolve(publicPath, "index.html"));
// });

// if (keyPath && certPath) {
//   const options = {
//     key: readFileSync(resolve(keyPath)),
//     cert: readFileSync(resolve(certPath)),
//   };
//   createServer(options, app).listen(port, "0.0.0.0", () => {
//     console.log(`Server is running on https://localhost:${port}`);
//   });
// } else {
//   http.createServer(app).listen(port, "0.0.0.0", () => {
//     console.log(`Server is running on http://localhost:${port}`);
//   });
// }

/////////////////////////////////

// import express from "express";
// import { readFileSync } from "fs";
// import { resolve } from "path";
// import { createServer } from "https";
// import dotenv from "dotenv";

// dotenv.config(); // Load environment variables from .env file

// const keyPath = process.env.VITE_SSL_KEY_PATH;
// const certPath = process.env.VITE_SSL_CERT_PATH;

// if (!keyPath || !certPath) {
//   throw new Error(
//     "SSL key and certificate paths must be defined in the .env file",
//   );
// }

// const app = express();
// const options = {
//   key: readFileSync(resolve(keyPath)),
//   cert: readFileSync(resolve(certPath)),
// };

// const port = 5173;
// const publicPath = resolve("dist");

// // Serve static files from the dist directory
// app.use(express.static(publicPath));

// // Serve index.html for all other routes to support client-side routing
// app.get("*", (req, res) => {
//   res.sendFile(resolve(publicPath, "index.html"));
// });

// createServer(options, app).listen(port, () => {
//   console.log(`Server is running on https://localhost:${port}`);
// });
