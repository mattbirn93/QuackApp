import "tsconfig-paths/register.js";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./backend/config2.js";
import Item from "./backend/models/Item.js";
import userRoutes from "./backend/routes/userRoutes.js";

import { createUserSocket } from "./backend/controllers/userController2.js";
import http from "http";
import { Server as SocketIOServer } from "socket.io";

// ES module equivalents of __dirname and __filename
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

const server = http.createServer(app);

const io = new SocketIOServer(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(bodyParser.json());

// Middleware to parse JSON requests
app.use(express.json());

// Enable CORS
app.use(cors());

connectDB();

// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, "dist")));

app.use("/api/users", userRoutes);

// Define a test route
app.get("/api/test", (req, res) => {
  res.json({ message: "Hello from the server SUCAKH MC!" });
});

// Define a route to create a new item
app.post("/api/items", async (req, res) => {
  try {
    const { name, description } = req.body;
    const newItem = new Item({ name, description });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ message: "Error creating item", error });
  }
});

// Define a route to get all items
app.get("/api/items", async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: "Error fetching items", error });
  }
});

// All other routes should serve the index.html file
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

  socket.on("disconnect", () => {
    console.log("Client disconnected", socket.id);
  });
});

server.listen(Number(PORT), "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});

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
