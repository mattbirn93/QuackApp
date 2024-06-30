import express from "express";
import { createServer } from "http";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import { Server as SocketIOServer } from "socket.io";
import path from "path";
import connectDB from "./backend/config/db.js";

// Load environment variables from .env file
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const server = createServer(app);
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
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);

// Middleware for logging requests
app.use((req, res, next) => {
  console.log(
    `[${new Date().toISOString()}] Request: ${req.method} ${req.url}`,
  );
  console.log(`Body: ${JSON.stringify(req.body)}`);
  next();
});

// Serve static files from the dist directory
app.use(express.static(join(__dirname, "dist")));

// Test routes
app.get("/test", (req, res) => res.send("API is working!"));
app.get("/butterfly", (req, res) => res.send("butterfly is working!"));
app.get("/api/dog", (req, res) => res.json({ message: "Woof!" }));
app.get("/food", (req, res) => res.json({ message: "food route is working" }));
app.get("/api/users/fetchUserById", (req, res) =>
  res.json({ user: "user data" }),
);
app.get("/api/scenes", (req, res) => res.json({ scenes: "scene data" }));
app.post("/api/scenes/createNewScript", (req, res) => {
  const { title, title_page } = req.body;
  console.log("Received data:", req.body);
  if (!title || !title_page || !title_page.title || !title_page.written_by) {
    console.error("Invalid script data:", req.body);
    return res.status(400).json({ error: "Invalid script data" });
  }
  console.log("Creating new script:", req.body);
  res
    .status(201)
    .json({ message: "New script created successfully", script: req.body });
});

// Additional routes from server.ts
app.get("/troppers", (req, res) => {
  console.log("troopers route accessed");
  res.json({ message: "troopers route is working" });
});
app.get("/api/poopers", (req, res) => {
  console.log("poopers route accessed");
  res.json({ message: "poopers route is working" });
});
app.get("/api/cat", (req, res) => res.send("Cat is working!"));

// API Route imports from server.ts
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

// Catch-all route to serve index.html
app.get("*", (req, res) => {
  const indexPath = path.resolve(__dirname, "dist", "index.html");
  res.sendFile(indexPath, (err) => {
    if (err) {
      console.error("Error sending index.html:", err);
      res.status(500).send(err);
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Set up Socket.IO
const io = new SocketIOServer(server, {
  cors: {
    origin: [
      "http://localhost:5173",
      "https://aqueous-fortress-42552-d35f4f194ee9.herokuapp.com",
    ],
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("New client connected", socket.id);
  // Define your socket event handlers here
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
});

// Handle uncaught exceptions
process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception thrown:", error);
  process.exit(1);
});

// Graceful shutdown
const gracefulShutdown = () => {
  console.log("Shutting down gracefully...");
  server.close(() => {
    console.log("Closed out remaining connections");
    process.exit(0);
  });

  setTimeout(() => {
    console.error("Forcing shutdown...");
    process.exit(1);
  }, 10000);
};

process.on("SIGTERM", gracefulShutdown);
process.on("SIGINT", gracefulShutdown);

//////////////////////////

// import express from "express";
// import { createServer } from "http";
// import { fileURLToPath } from "url";
// import { dirname, join } from "path";
// import dotenv from "dotenv";

// dotenv.config();

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// const app = express();
// const server = createServer(app);

// app.use(express.json()); // Add this line to parse JSON bodies

// // Middleware for logging requests
// app.use((req, res, next) => {
//   console.log(
//     `[${new Date().toISOString()}] Request: ${req.method} ${req.url}`,
//   );
//   console.log(`Body: ${JSON.stringify(req.body)}`);
//   next();
// });

// // Serve static files from the dist directory
// app.use(express.static(join(__dirname, "dist")));

// // API routes
// app.get("/test", (req, res) => {
//   res.send("API is working!");
// });

// app.get("/butterfly", (req, res) => {
//   res.send("butterfly is working!");
// });

// app.get("/api/dog", (req, res) => {
//   res.json({ message: "Woof!" });
// });

// app.get("/food", (req, res) => {
//   res.json({ message: "food route is working" });
// });

// app.get("/api/users/fetchUserById", (req, res) => {
//   res.json({ user: "user data" });
// });

// app.get("/api/scenes", (req, res) => {
//   res.json({ scenes: "scene data" });
// });

// app.post("/api/scenes/createNewScript", (req, res) => {
//   const { title, title_page } = req.body;
//   console.log("Received data:", req.body); // Log the received data for debugging
//   if (!title || !title_page || !title_page.title || !title_page.written_by) {
//     console.error("Invalid script data:", req.body); // Log invalid data
//     return res.status(400).json({ error: "Invalid script data" });
//   }
//   // Implement your logic to save the new script here
//   // For example, you could save it to a database
//   console.log("Creating new script:", req.body);
//   res
//     .status(201)
//     .json({ message: "New script created successfully", script: req.body });
// });

// // All other GET requests not handled before will return the frontend app
// app.get("*", (req, res) => {
//   res.sendFile(join(__dirname, "dist", "index.html"));
// });

// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).send("Something broke!");
// });

// const PORT = process.env.PORT || 5001;
// server.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });

// // Handle unhandled promise rejections
// process.on("unhandledRejection", (reason, promise) => {
//   console.error("Unhandled Rejection at:", promise, "reason:", reason);
//   // Application specific logging, throwing an error, or other logic here
// });

// // Handle uncaught exceptions
// process.on("uncaughtException", (error) => {
//   console.error("Uncaught Exception thrown:", error);
//   // Application specific logging, throwing an error, or other logic here
//   process.exit(1); // Optional: Exit the process to avoid undefined state
// });

// // Graceful shutdown
// const gracefulShutdown = () => {
//   console.log("Shutting down gracefully...");
//   server.close(() => {
//     console.log("Closed out remaining connections");
//     process.exit(0);
//   });

//   setTimeout(() => {
//     console.error("Forcing shutdown...");
//     process.exit(1);
//   }, 10000);
// };

// process.on("SIGTERM", gracefulShutdown);
// process.on("SIGINT", gracefulShutdown);

////////

// import express from "express";
// import { createServer } from "http";
// import { fileURLToPath } from "url";
// import { dirname, join } from "path";
// import dotenv from "dotenv";

// dotenv.config();

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// const app = express();
// const server = createServer(app);

// app.use(express.json()); // Add this line to parse JSON bodies

// // Middleware for logging requests
// app.use((req, res, next) => {
//   console.log(
//     `[${new Date().toISOString()}] Request: ${req.method} ${req.url}`,
//   );
//   console.log(`Body: ${JSON.stringify(req.body)}`);
//   next();
// });

// // Serve static files from the dist directory
// app.use(express.static(join(__dirname, "dist")));

// // API routes
// app.get("/api/users/fetchUserById", (req, res) => {
//   res.json({ user: "user data" });
// });

// app.get("/api/scenes", (req, res) => {
//   res.json({ scenes: "scene data" });
// });

// app.post("/api/scenes/createNewScript", (req, res) => {
//   const { title, title_page } = req.body;
//   if (!title || !title_page || !title_page.title || !title_page.written_by) {
//     return res.status(400).json({ error: "Invalid script data" });
//   }
//   // Implement your logic to save the new script here
//   // For example, you could save it to a database
//   console.log("Creating new script:", req.body);
//   res
//     .status(201)
//     .json({ message: "New script created successfully", script: req.body });
// });

// // All other GET requests not handled before will return the frontend app
// app.get("*", (req, res) => {
//   res.sendFile(join(__dirname, "dist", "index.html"));
// });

// // Error handling middleware
// app.use((err, req, res) => {
//   console.error(err.stack);
//   res.status(500).send("Something broke!");
// });

// const PORT = process.env.PORT || 5001;
// server.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });

// // Handle unhandled promise rejections
// process.on("unhandledRejection", (reason, promise) => {
//   console.error("Unhandled Rejection at:", promise, "reason:", reason);
//   // Application specific logging, throwing an error, or other logic here
// });

// // Handle uncaught exceptions
// process.on("uncaughtException", (error) => {
//   console.error("Uncaught Exception thrown:", error);
//   // Application specific logging, throwing an error, or other logic here
//   process.exit(1); // Optional: Exit the process to avoid undefined state
// });

// // Graceful shutdown
// const gracefulShutdown = () => {
//   console.log("Shutting down gracefully...");
//   server.close(() => {
//     console.log("Closed out remaining connections");
//     process.exit(0);
//   });

//   setTimeout(() => {
//     console.error("Forcing shutdown...");
//     process.exit(1);
//   }, 10000);
// };

// process.on("SIGTERM", gracefulShutdown);
// process.on("SIGINT", gracefulShutdown);

////////////

// import express from "express";
// import { createServer } from "http";
// import { fileURLToPath } from "url";
// import { dirname, join } from "path";
// import dotenv from "dotenv";

// dotenv.config();

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// const app = express();
// const server = createServer(app);

// // Middleware for logging requests
// app.use((req, res, next) => {
//   console.log(
//     `[${new Date().toISOString()}] Request: ${req.method} ${req.url}`,
//   );
//   next();
// });

// // Serve static files from the dist directory
// app.use(express.static(join(__dirname, "dist")));

// // API routes
// app.get("/api/users/fetchUserById", (req, res) => {
//   res.json({ user: "user data" });
// });

// app.get("/api/scenes", (req, res) => {
//   res.json({ scenes: "scene data" });
// });

// app.get("/test", (req, res) => {
//   res.send("API is working!");
// });

// app.get("/butterfly", (req, res) => {
//   res.send("butterfly is working!");
// });

// app.get("/api/dog", (req, res) => {
//   res.json({ message: "Woof!" });
// });

// app.get("/food", (req, res) => {
//   res.json({ message: "food route is working" });
// });

// // All other GET requests not handled before will return the frontend app
// app.get("*", (req, res) => {
//   res.sendFile(join(__dirname, "dist", "index.html"));
// });

// // Error handling middleware
// app.use((err, req, res) => {
//   // added `next` to the parameters
//   console.error(err.stack);
//   res.status(500).send("Something broke!");
// });

// const PORT = process.env.PORT || 5001;
// server.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });

// // Handle unhandled promise rejections
// process.on("unhandledRejection", (reason, promise) => {
//   console.error("Unhandled Rejection at:", promise, "reason:", reason);
//   // Application specific logging, throwing an error, or other logic here
// });

// // Handle uncaught exceptions
// process.on("uncaughtException", (error) => {
//   console.error("Uncaught Exception thrown:", error);
//   // Application specific logging, throwing an error, or other logic here
//   process.exit(1); // Optional: Exit the process to avoid undefined state
// });

// // Graceful shutdown
// const gracefulShutdown = () => {
//   console.log("Shutting down gracefully...");
//   server.close(() => {
//     console.log("Closed out remaining connections");
//     process.exit(0);
//   });

//   setTimeout(() => {
//     console.error("Forcing shutdown...");
//     process.exit(1);
//   }, 10000);
// };

// process.on("SIGTERM", gracefulShutdown);
// process.on("SIGINT", gracefulShutdown);

////////////////

// import express from "express";
// import { createServer } from "http";
// import { fileURLToPath } from "url";
// import { dirname, join } from "path";
// import dotenv from "dotenv";

// dotenv.config();

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// const app = express();
// const server = createServer(app);

// // Middleware for logging requests
// app.use((req, res, next) => {
//   console.log(`Request: ${req.method} ${req.url}`);
//   next();
// });

// // Serve static files from the dist directory
// app.use(express.static(join(__dirname, "dist")));

// // API routes
// app.get("/api/users/fetchUserById", (req, res) => {
//   res.json({ user: "user data" });
// });

// app.get("/api/scenes", (req, res) => {
//   res.json({ scenes: "scene data" });
// });

// // All other GET requests not handled before wills return the fronend app
// app.get("*", (req, res) => {
//   res.sendFile(join(__dirname, "dist", "index.html"));
// });

// // Error handling middleware
// app.use((err, req, res) => {
//   console.error(err.stack);
//   res.status(500).send("Something broke!");
// });

// const PORT = process.env.PORT || 5001;
// server.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });

// // Graceful shutdown
// const gracefulShutdown = () => {
//   console.log("Shutting down gracefully...");
//   server.close(() => {
//     console.log("Closed out remaining connections");
//     process.exit(0);
//   });

//   setTimeout(() => {
//     console.error("Forcing shutdown...");
//     process.exit(1);
//   }, 10000);
// };

// process.on("SIGTERM", gracefulShutdown);
// process.on("SIGINT", gracefulShutdown);

////////////

// import express from "express";
// import { createServer } from "http";
// import { fileURLToPath } from "url";
// import { dirname, join } from "path";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// const app = express();
// const server = createServer(app);

// // Serve static files from the dist directory
// app.use(express.static(join(__dirname, "dist")));

// // API routes
// app.get("/api/users/fetchUserById", (req, res) => {
//   // Your API logic here
//   res.json({ user: "user data" });
// });

// app.get("/api/scenes", (req, res) => {
//   // Your API logic here
//   res.json({ scenes: "scene data" });
// });

// // All other GET requests not handled before will return the frontend app
// app.get("*", (req, res) => {
//   res.sendFile(join(__dirname, "dist", "index.html"));
// });

// const PORT = process.env.PORT || 5001;
// server.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });

///////

// import express from "express";
// import { createServer } from "http";
// import { resolve } from "path";
// import dotenv from "dotenv";

// dotenv.config(); // Load environment variables from .env file

// const app = express();
// const port = process.env.PORT || 5173; // Default to 5173 if no port is specified, Heroku sets process.env.PORT

// // Middleware to log requests
// app.use((req, res, next) => {
//   console.log(`Request: ${req.method} ${req.path}`);
//   next();
// });

// // API routes
// app.get("/test", (req, res) => {
//   res.send("API is working!");
// });

// app.get("/butterfly", (req, res) => {
//   res.send("butterfly is working!");
// });

// app.get("/api/dog", (req, res) => {
//   res.json({ message: "Woof!" });
// });

// app.get("/food", (req, res) => {
//   res.json({ message: "food route is working" });
// });

// // Serve static files
// const publicPath = resolve("dist");
// app.use(express.static(publicPath));

// // Catch-all route to serve index.html (must be placed after all other routes)
// app.get("*", (req, res) => {
//   const indexPath = resolve(publicPath, "index.html");
//   res.sendFile(indexPath, (err) => {
//     if (err) {
//       console.error("Error sending index.html:", err);
//       res.status(500).send(err);
//     }
//   });
// });

// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).send("Something went wrong!");
// });

// // Start HTTP servers
// createServer(app).listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });

///////////////

// import express from "express";
// import { createServer } from "http";
// import { resolve } from "path";
// import dotenv from "dotenv";

// dotenv.config(); // Load environment variables from .env file

// const app = express();
// const port = process.env.PORT || 5173; // Default to 5173 if no port is specified, Heroku sets process.env.PORT

// // Middleware to log requests
// app.use((req, res, next) => {
//   console.log(`Request: ${req.method} ${req.path}`);
//   next();
// });

// // API routes
// app.get("/test", (req, res) => {
//   res.send("API is working!");
// });

// app.get("/butterfly", (req, res) => {
//   res.send("butterfly is working!");
// });

// app.get("/api/dog", (req, res) => {
//   res.json({ message: "Woof!" });
// });

// app.get("/food", (req, res) => {
//   res.json({ message: "food route is working" });
// });

// // Serve static files
// const publicPath = resolve("dist");
// app.use(express.static(publicPath));

// // Catch-all route to serve index.html (must be placed after all sother routes)
// app.get("*", (req, res) => {
//   const indexPath = resolve(publicPath, "index.html");
//   res.sendFile(indexPath, (err) => {
//     if (err) {
//       console.error("Error sending index.html:", err);
//       res.status(500).send(err);
//     }
//   });
// });

// // Error handling middlewares
// app.use((err, req, res) => {
//   console.error(err.stack);
//   res.status(500).send("Something went wrong!");
// });

// // Start HTTP servers
// createServer(app).listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });

//////////////////////////

// import express from "express";
// import { createServer } from "http";
// import { resolve } from "path";
// import dotenv from "dotenv";

// dotenv.config(); // Load environment variables from .env file

// const app = express();
// const port = process.env.PORT || 5173; // Default to 5173 if no port is specified, Heroku sets process.env.PORT

// // Middleware to log requests
// app.use((req, res, next) => {
//   console.log(`Request: ${req.method} ${req.path}`);
//   next();
// });

// // API routes
// app.get("/test", (req, res) => {
//   res.send("API is working!");
// });

// app.get("/butterfly", (req, res) => {
//   res.send("butterfly is working!");
// });

// app.get("/api/dog", (req, res) => {
//   res.json({ message: "Woof!" });
// });

// app.get("/food", (req, res) => {
//   res.json({ message: "food route is working" });
// });

// // Serve static files
// const publicPath = resolve("dist");
// app.use(express.static(publicPath));

// // Catch-all route to serve index.html (must be placed after all other routes)
// app.get("*", (req, res) => {
//   const indexPath = resolve(publicPath, "index.html");
//   res.sendFile(indexPath, (err) => {
//     if (err) {
//       console.error("Error sending index.html:", err);
//       res.status(500).send(err);
//     }
//   });
// });

// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).send("Something went wrong!");
// });

// // Start HTTP servers
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
