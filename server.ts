import "tsconfig-paths/register.js";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./backend/config2.js";
import https from "https";
import fs from "fs";
import { Server as SocketIOServer } from "socket.io";

// Importing user-related routes
import userRoutes from "./backend/routes/userRoutes.js";
import scriptRoutes from "./backend/routes/scriptRoutes.js";
import sceneRoutes from "./backend/routes/sceneRoutes.js";
import scriptsFullRoutes from "./backend/routes/scriptsFullRoutes.js";
import sceneVersionRoutes from "./backend/routes/sceneVersionRoutes.js";
import sceneVersionContentRoutes from "./backend/routes/sceneVersionContentRoutes.js";
import { createUserSocket } from "./backend/controllers/userController2.js";
import { getSceneVersionContentSocket } from "./backend/controllers/sceneVersionContentWSController.js";
import { createContentItemSocket } from "./backend/controllers/sceneVersionContentWSController.js";
import { updateContentItemSocket } from "./backend/controllers/sceneVersionContentWSController.js";
import { deleteContentItemSocket } from "./backend/controllers/sceneVersionContentWSController.js";
import {
  getCharactersById,
  addCharacterToArray,
  updateCharacterInArray,
} from "./backend/controllers/charactersWSController.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

const keyPath =
  process.env.VITE_SSL_KEY_PATH || path.join(__dirname, "./certs/key.pem");
const certPath =
  process.env.VITE_SSL_CERT_PATH || path.join(__dirname, "./certs/cert.pem");

const httpsOptions = {
  key: fs.readFileSync(keyPath),
  cert: fs.readFileSync(certPath),
};

const server = https.createServer(httpsOptions, app);
const io = new SocketIOServer(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(bodyParser.json());
app.use(express.json());

app.use(cors());
app.use(express.static(path.join(__dirname, "dist")));

connectDB();

app.use("/api/users", (req, res, next) => {
  console.log(`SERVER USER ADDED: ${req.originalUrl}`);
  next();
});

// Define API Routes
app.use("/api/users", userRoutes);
app.use("/api/users/fetchUserById", userRoutes);
app.use("/api/scripts", scriptRoutes);
app.use("/api/scripts/fetchScriptsById", scriptRoutes);
app.use("/api/scripts/createNewScript", scriptRoutes);
app.use("/api/scenes", sceneRoutes);
app.use("api/scenes/fetchScriptsFull", sceneRoutes)
app.use("api/scenes/updateScriptsContent", sceneRoutes)
app.use("api/scenes/createSecene", sceneRoutes);
app.use("/api/sceneVersions", sceneVersionRoutes);
app.use("/api/sceneVersions/updateCurrentVersion", sceneVersionRoutes);
app.use("/api/sceneVersions/createSceneVersion", sceneVersionRoutes);
app.use("/api/sceneVersionContent", sceneVersionContentRoutes);
app.use("/api/scenes/sceneVersions", sceneVersionContentRoutes);
app.use("/api/scenes/sceneVersionContent", sceneVersionContentRoutes);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

io.on("connection", (socket) => {
  console.log("New client connected", socket.id);

  socket.on("add_user", (data) => {
    createUserSocket(data, (error: any, savedUser: any) => {
      if (error) {
        socket.emit("user_add_error", error);
      } else {
        socket.emit("user_added", savedUser);
      }
    });
  });

  socket.on("get_scene_version_content", (data) => {
    const { id } = data;
    getSceneVersionContentSocket(id, (error: any, result: any) => {
      if (error) {
        socket.emit("get_scene_version_content_error", error);
      } else {
        socket.emit("scene_version_content", result);
      }
    });
  });

  socket.on("create_content_item", (data: any) => {
    console.log("Received create_content_item event:", data);
    createContentItemSocket(data, (error: any, result: any) => {
      if (error) {
        socket.emit("create_content_item_error", error);
      } else {
        socket.emit("content_item_created", result);
      }
    });
  });

  socket.on("update_content_item", (data: any) => {
    console.log("Received update_content_item event:", data);
    updateContentItemSocket(data, (error: any, result: any) => {
      if (error) {
        socket.emit("update_content_item_error", error);
      } else {
        socket.emit("content_item_updated", result);
      }
    });
  });

  socket.on("delete_content_item", (data: any) => {
    console.log("Received delete_content_item event:", data);
    deleteContentItemSocket(data, (error: any, result: any) => {
      if (error) {
        socket.emit("delete_content_item_error", error);
      } else {
        socket.emit("content_item_deleted", result);
      }
    });
  });
  socket.on("getCharactersById", (id) => {
    getCharactersById(id, (error: any, characters: any) => {
      if (error) {
        socket.emit("error", error);
      } else {
        socket.emit("charactersData", characters);
      }
    });
  });

  socket.on("addCharacterToArray", (data) => {
    addCharacterToArray(data, (error: any, updatedCharacters: any) => {
      if (error) {
        socket.emit("error", error);
      } else {
        socket.emit("updatedCharacters", updatedCharacters);
      }
    });
  });

  socket.on("updateCharacterInArray", (data) => {
    updateCharacterInArray(data, (error: any, updatedCharacters: any) => {
      if (error) {
        socket.emit("error", error);
      } else {
        socket.emit("updatedCharacters", updatedCharacters);
      }
    });
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected", socket.id);
  });
});

server.listen(Number(PORT), "0.0.0.0", () => {
  console.log(`Server running on https://localhost:${PORT}`);
});

//////////////////////////////////////////////////

// The server file initializes the Express application, connects to the database, sets up middleware, and defines the routes.

// import "tsconfig-paths/register.js"; // Enables tsconfig paths in the project
// import express from "express"; // Express framework for building the server
// import path from "path"; // Utility module for handling and transforming file paths
// import { fileURLToPath } from "url"; // Module to convert file URL to path
// import bodyParser from "body-parser"; // Middleware to parse request bodies
// import cors from "cors"; // Middleware to enable CORS (Cross-Origin Resource Sharing)
// import dotenv from "dotenv"; // Module to load environment variables from a .env file
// import connectDB from "./backend/config2.js"; // Function to connect to the MongoDB database
// import http from "http"; // HTTP module to create server
// import { Server as SocketIOServer } from "socket.io"; // Socket.IO server for real-time communication

// // Importing user-related routes
// import userRoutes from "./backend/routes/userRoutes.js";
// import scriptRoutes from "./backend/routes/scriptRoutes.js";
// import sceneRoutes from "./backend/routes/sceneRoutes.js";
// import sceneVersionRoutes from "./backend/routes/sceneVersionRoutes.js";
// import sceneVersionContentRoutes from "./backend/routes/sceneVersionContentRoutes.js";
// import { createUserSocket } from "./backend/controllers/userController2.js";
// import { getSceneVersionContentSocket } from "./backend/controllers/sceneVersionContentWSController.js";
// import { createContentItemSocket } from "./backend/controllers/sceneVersionContentWSController.js";
// import { updateContentItemSocket } from "./backend/controllers/sceneVersionContentWSController.js";
// import { deleteContentItemSocket } from "./backend/controllers/sceneVersionContentWSController.js";

// // ES module equivalents of __dirname and __filename
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// dotenv.config(); // Load environment variables from .env file

// const app = express(); // Initialize Express app
// const PORT = process.env.PORT || 5001; // Port to run the server on

// const server = http.createServer(app); // Create an HTTP server
// const io = new SocketIOServer(server, {
//   cors: {
//     origin: "*", // Allow all origins (for development, restrict in production)
//     methods: ["GET", "POST"], // Allowed HTTP methods
//   },
// });

// // Middleware to parse request bodies
// app.use(bodyParser.json());
// app.use(express.json());

// app.use(cors()); // Enable CORS
// app.use(express.static(path.join(__dirname, "dist"))); // Serve static files from the dist directory

// // Connect to the Mongo Database
// connectDB();

// // Define API Routes
// app.use("/api/users", userRoutes);
// app.use("/api/users/fetchUserById", userRoutes);
// app.use("/api/scripts", scriptRoutes);
// app.use("/api/scripts/fetchScriptsById", scriptRoutes);
// app.use("/api/scripts/createNewScript", scriptRoutes);
// app.use("/api/scenes", sceneRoutes);
// app.use("api/scenes/createSecene", sceneRoutes);
// app.use("/api/sceneVersions", sceneVersionRoutes);
// app.use("/api/sceneVersions/updateCurrentVersion", sceneVersionRoutes);
// app.use("/api/sceneVersions/createSceneVersion", sceneVersionRoutes);
// app.use("/api/sceneVersionContent", sceneVersionContentRoutes);
// app.use("/api/scenes/sceneVersions", sceneVersionContentRoutes);
// app.use("/api/scenes/sceneVersionContent", sceneVersionContentRoutes);

// // All other routes should serve the index.html file
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "dist", "index.html"));
// });

// // Socket.io connection handler
// io.on("connection", (socket) => {
//   console.log("New client connected", socket.id);

//   socket.on("add_user", (data) => {
//     createUserSocket(data, (error: any, savedUser: any) => {
//       if (error) {
//         socket.emit("user_add_error", error);
//       } else {
//         socket.emit("user_added", savedUser);
//       }
//     });
//   });

//   socket.on("get_scene_version_content", (data) => {
//     const { id } = data;
//     getSceneVersionContentSocket(id, (error: any, result: any) => {
//       if (error) {
//         socket.emit("get_scene_version_content_error", error);
//       } else {
//         socket.emit("scene_version_content", result);
//       }
//     });
//   });

//   socket.on("create_content_item", (data: any) => {
//     console.log("Received create_content_item event:", data);
//     createContentItemSocket(data, (error: any, result: any) => {
//       if (error) {
//         socket.emit("create_content_item_error", error);
//       } else {
//         socket.emit("content_item_created", result);
//       }
//     });
//   });

//   socket.on("update_content_item", (data: any) => {
//     console.log("Received update_content_item event:", data);
//     updateContentItemSocket(data, (error: any, result: any) => {
//       if (error) {
//         socket.emit("update_content_item_error", error);
//       } else {
//         socket.emit("content_item_updated", result);
//       }
//     });
//   });

//   socket.on("delete_content_item", (data: any) => {
//     console.log("Received delete_content_item event:", data);
//     deleteContentItemSocket(data, (error: any, result: any) => {
//       if (error) {
//         socket.emit("delete_content_item_error", error);
//       } else {
//         socket.emit("content_item_deleted", result);
//       }
//     });
//   });

//   socket.on("disconnect", () => {
//     console.log("Client disconnected", socket.id);
//   });
// });

// // Start the server
// server.listen(Number(PORT), "0.0.0.0", () => {
//   console.log(`Server running on port ${PORT}`);
// });

////////////////////////////////////////

// import "tsconfig-paths/register.js";
// import express, { Request, Response, NextFunction } from "express";
// import path from "path";
// import { fileURLToPath } from "url";
// import bodyParser from "body-parser";
// import cors from "cors";
// import dotenv from "dotenv";
// import connectDB from "./backend/config2.js";

// import createError from "http-errors";
// import morgan from "morgan";
// import expressWinston from "express-winston";
// import logger from "./backend/logger.js";
// import { format, transports } from "winston";

// import { createUserSocket } from "./backend/controllers/userController2.js";
// import http from "http";
// import { Server as SocketIOServer } from "socket.io";

// import Item from "./backend/models/Item.js";
// import userRoutes from "./backend/routes/userRoutes.js";

// // ES module equivalents of __dirname and __filename
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 5001;

// const server = http.createServer(app);

// const io = new SocketIOServer(server, {
//   cors: {
//     origin: "*",
//     methods: ["GET", "POST"],
//   },
// });

// app.use(bodyParser.json());

// // Middleware to parse JSON requests
// app.use(express.json());

// // Enable CORS
// app.use(cors());

// //Mongo connection call to function
// connectDB();

// // Serve static files from the dist directory
// app.use(express.static(path.join(__dirname, "dist")));

// // Morgan for HTTP request logging
// app.use(
//   morgan("combined", {
//     stream: { write: (message) => logger.info(message.trim()) },
//   }),
// );

// // Express-Winston middleware for request logging
// app.use(
//   expressWinston.logger({
//     transports: [
//       new transports.Console(),
//       new transports.File({ filename: "requests.log" }),
//     ],
//     format: format.combine(format.colorize(), format.json()),
//     meta: true,
//     msg: "HTTP {{req.method}} {{req.url}}",
//     expressFormat: true,
//     colorize: false,
//   }),
// );

// // Routes
// app.use("/api/users", userRoutes);

// app.get("/api/test", (req, res, next) => {
//   res.json({ message: "Hello from the server SUCAKH MC!" });
// });

// app.post(
//   "/api/items",
//   async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const { name, description } = req.body;
//       const newItem = new Item({ name, description });
//       await newItem.save();
//       res.status(201).json(newItem);
//     } catch (error: unknown) {
//       logger.error("Error creating item: %o", error);
//       if (error instanceof Error) {
//         next(createError(500, "Error creating item", { error: error.message }));
//       } else {
//         next(createError(500, "Error creating item"));
//       }
//     }
//   },
// );

// app.get(
//   "/api/items",
//   async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const items = await Item.find();
//       res.status(200).json(items);
//     } catch (error: unknown) {
//       logger.error("Error fetching items: %o", error);
//       if (error instanceof Error) {
//         next(
//           createError(500, "Error fetching items", { error: error.message }),
//         );
//       } else {
//         next(createError(500, "Error fetching items"));
//       }
//     }
//   },
// );

// // All other routes should serve the index.html file
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "dist", "index.html"));
// });

// io.on("connection", (socket) => {
//   logger.info("New client connected", { socketId: socket.id });

//   socket.on("add_user", (data) => {
//     createUserSocket(data, (error: unknown, savedUser: any) => {
//       if (error) {
//         socket.emit("user_add_error", error);
//         logger.error("Error adding user: %o", error);
//       } else {
//         socket.emit("user_added", savedUser);
//         logger.info("User added", { savedUser });
//       }
//     });
//   });

//   socket.on("disconnect", () => {
//     logger.info("Client disconnected", { socketId: socket.id });
//   });
// });

// // Error handling middleware
// app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
//   logger.error(err instanceof Error ? err.message : "Unknown error", err);
//   res.status(err instanceof createError.HttpError ? err.status : 500).json({
//     message: err instanceof Error ? err.message : "Internal Server Error",
//   });
// });

// server.listen(Number(PORT), "0.0.0.0", () => {
//   logger.info(`Server running on port ${PORT}`);
// });

//////////////////////////////////////////

// import 'tsconfig-paths/register.js';
// import express from 'express';
// import path from 'path';
// import { fileURLToPath } from 'url';
// // import mongoose from 'mongoose';
// import bodyParser from 'body-parser';
// import cors from 'cors';
// import dotenv from 'dotenv';
// import connectDB from './backend/config2.js';
// import Item from './backend/models/Item.js'; // Correct path for JavaScript
// import userRoutes from './backend/routes/userRoutes.js';
// // import alternateSceneVersionRoutes from './backend/routes/alternateSceneVersionRoutes';
// // import { createUserSocket } from './controllers/userController2'; compiled file

// // ES module equivalents of __dirname and __filename
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 5001;

// app.use(bodyParser.json());

// // Middleware to parse JSON requests
// app.use(express.json());

// // Enable CORS
// app.use(cors());

// connectDB();

// // Serve static files from the dist directory
// app.use(express.static(path.join(__dirname, 'dist')));

// app.use('/api/users', userRoutes);

// // Define a test route
// app.get('/api/test', (req, res) => {
//     res.json({ message: 'Hello from the server SUCAKH MATT S!' });
// });

// // Define a route to create a new item
// app.post('/api/items', async (req, res) => {
//     try {
//         const { name, description } = req.body;
//         const newItem = new Item({ name, description });
//         await newItem.save();
//         res.status(201).json(newItem);
//     } catch (error) {
//         res.status(500).json({ message: 'Error creating item', error });
//     }
// });

// // Define a route to get all items
// app.get('/api/items', async (req, res) => {
//     try {
//         const items = await Item.find();
//         res.status(200).json(items);
//     } catch (error) {
//         res.status(500).json({ message: 'Error fetching items', error });
//     }
// });

// // All other routes should serve the index.html file
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'dist', 'index.html'));
// });

// app.listen(PORT, () => {
//     console.log(`Server is running at http://localhost:${PORT}`);
// });

//////////////////////////////