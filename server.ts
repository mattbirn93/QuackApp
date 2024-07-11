import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import { Server as SocketIOServer } from "socket.io";

// Load environment variables from .env file
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log("__filename:", __filename);
console.log("__dirname:", __dirname);

const connectDBPath = path.join(__dirname, "backend/config/db.js");
console.log("Connecting to DB from:", connectDBPath);

// Dynamically import connectDB
const connectDB = await import(connectDBPath).then((module) => module.default);

const app = express();
const PORT = process.env.PORT || 5001;

// Connect to MongoDB
connectDB();

// Middleware
app.use(bodyParser.json());
app.use(express.json());

const corsOptions = {
  origin: [
    "http://localhost:5173",
    "http://localhost:4173",
    "http://192.168.1.126:5173",
    "https://aqueous-fortress-42552-d35f4f194ee9.herokuapp.com",
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

app.use(cors(corsOptions));

// Middleware to log request
app.use((req, res, next) => {
  console.log(`Request: ${req.method} ${req.path}`);
  next();
});

// Simple test routes
app.get("/api/test", (req, res) => {
  res.send("Test route is working on server");
});

// API Route imports
import userRoutes from "./backend/routes/userRoutes.js";
import scriptRoutes from "./backend/routes/scriptRoutes.js";
import sceneRoutes from "./backend/routes/sceneRoutes.js";
import sceneVersionRoutes from "./backend/routes/sceneVersionRoutes.js";
import sceneVersionContentRoutes from "./backend/routes/sceneVersionContentRoutes.js";

// API routes
app.use("/api/users", userRoutes);
app.use("/api/scripts", scriptRoutes);
app.use("/api/scenes", sceneRoutes);
app.use("/api/sceneVersions", sceneVersionRoutes);
app.use("/api/sceneVersionContent", sceneVersionContentRoutes);

// Serve static files from the React app
const distPath = path.join(__dirname, "..", "dist");
app.use(express.static(distPath));

// Catch-all route to serve index.html (must be placed after all other routes)
app.get("*", (req, res) => {
  const indexPath = path.resolve(distPath, "index.html");
  res.sendFile(indexPath, (err) => {
    if (err) {
      console.error("Error sending index.html:", err);
      res.status(500).send(err);
    }
  });
});

// Start the server
const server = app.listen(Number(PORT), "0.0.0.0", () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// Set up Socket.IO
const io = new SocketIOServer(server, {
  cors: {
    origin: [
      "http://localhost:5173",
      "http://localhost:4173",
      "http://192.168.1.126:5173",
      "https://aqueous-fortress-42552-d35f4f194ee9.herokuapp.com",
    ],
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("New client connected", socket.id);

  socket.on("chatMessage", (msg) => {
    console.log("Message received:", msg);
    io.emit("chatMessage", msg); // Broadcast the message to all clientss
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected", socket.id);
  });
});

///////////

// import express from "express";
// import path from "path";
// import { fileURLToPath } from "url";
// import bodyParser from "body-parser";
// import cors from "cors";
// import dotenv from "dotenv";
// import { Server as SocketIOServer } from "socket.io";

// // Load environment variables from .env file
// dotenv.config();

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// console.log("__filename:", __filename);
// console.log("__dirname:", __dirname);

// const connectDBPath = path.join(__dirname, "backend/config/db.js");
// console.log("Connecting to DB from:", connectDBPath);

// // Dynamically import connectDB
// const connectDB = await import(connectDBPath).then((module) => module.default);

// const app = express();
// const PORT = process.env.PORT || 5001;

// // Connect to MongoDB
// connectDB();

// // Middleware
// app.use(bodyParser.json());
// app.use(express.json());

// const corsOptions = {
//   origin: [
//     "http://localhost:5173",
//     "http://localhost:4173",
//     "http://192.168.0.211:5173",
//     "https://aqueous-fortress-42552-d35f4f194ee9.herokuapp.com",
//   ],
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   credentials: true,
// };

// app.use(cors(corsOptions));

// // Middleware to log request
// app.use((req, res, next) => {
//   console.log(`Request: ${req.method} ${req.path}`);
//   next();
// });

// // Simple test routes
// app.get("/api/test", (req, res) => {
//   res.send("Test route is working on server");
// });

// // API Route imports
// import userRoutes from "./backend/routes/userRoutes.js";
// import scriptRoutes from "./backend/routes/scriptRoutes.js";
// import sceneRoutes from "./backend/routes/sceneRoutes.js";
// import sceneVersionRoutes from "./backend/routes/sceneVersionRoutes.js";
// import sceneVersionContentRoutes from "./backend/routes/sceneVersionContentRoutes.js";

// // API routes
// app.use("/api/users", userRoutes);
// app.use("/api/scripts", scriptRoutes);
// app.use("/api/scenes", sceneRoutes);
// app.use("/api/sceneVersions", sceneVersionRoutes);
// app.use("/api/sceneVersionContent", sceneVersionContentRoutes);

// // Serve static files from the React app
// const distPath = path.join(__dirname, "..", "dist");
// app.use(express.static(distPath));

// // Catch-all route to serve index.html (must be placed after all other routes)
// app.get("*", (req, res) => {
//   const indexPath = path.resolve(distPath, "index.html");
//   res.sendFile(indexPath, (err) => {
//     if (err) {
//       console.error("Error sending index.html:", err);
//       res.status(500).send(err);
//     }
//   });
// });

// // Start the server
// const server = app.listen(Number(PORT), "0.0.0.0", () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });

// // Set up Socket.IO
// const io = new SocketIOServer(server, {
//   cors: {
//     origin: [
//       "http://localhost:5173",
//       "http://localhost:4173",
//       "http://192.168.0.211:5173",
//       "https://aqueous-fortress-42552-d35f4f194ee9.herokuapp.com",
//     ],
//     methods: ["GET", "POST"],
//   },
// });

// io.on("connection", (socket) => {
//   console.log("New client connected", socket.id);
// });
