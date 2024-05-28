import 'tsconfig-paths/register.js';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './backend/config2.js';
import Item from './backend/models/Item.js'; // Correct path for JavaScript 
import userRoutes from './backend/routes/userRoutes.js';
import scriptRoutes from './backend/routes/scriptRoutes.js';
import sceneRoutes from './backend/routes/sceneRoutes.js';
import sceneVersionRoutes from './backend/routes/sceneVersionRoutes.js';
import sceneVersionContentRoutes from './backend/routes/sceneVersionContentRoutes.js';
import { createUserSocket } from './backend/controllers/userController2.js';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import { getSceneVersionContentSocket, updateContentArraySocket } from './backend/controllers/sceneVersionContentWSController.js';

// ES module equivalents of __dirname and __filename
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

const server = http.createServer(app);

const io = new SocketIOServer(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

app.use(bodyParser.json());

// Middleware to parse JSON requests
app.use(express.json());

// Enable CORS
app.use(cors());

connectDB();

// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, 'dist')));

app.use('/api/users', userRoutes);
app.use('/api/users/fetchUserById', userRoutes);
app.use('/api/scripts', scriptRoutes);
app.use('/api/scripts/fetchScriptsById', scriptRoutes);
app.use('/api/scripts/createNewScript', scriptRoutes);
app.use('/api/scenes', sceneRoutes);
app.use('/api/sceneVersions', sceneVersionRoutes);
app.use('/api/sceneVersions/createSceneVersion', sceneVersionRoutes);
app.use('/api/sceneVersionContent', sceneVersionContentRoutes);
app.use('/api/scenes/sceneVersions', sceneVersionContentRoutes);
app.use('/api/scenes/sceneVersionContent', sceneVersionContentRoutes);

// Define a test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Hello from the server!' });
});

// Define a route to create a new item
app.post('/api/items', async (req, res) => {
  try {
    const { name, description } = req.body;
    const newItem = new Item({ name, description });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ message: 'Error creating item', error });
  }
});

// Define a route to get all items
app.get('/api/items', async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching items', error });
  }
});

// All other routes should serve the index.html file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

io.on('connection', (socket) => {
  console.log('New client connected', socket.id);

  socket.on('add_user', (data) => {
    createUserSocket(data, (error: any, savedUser: any) => {
      if (error) {
        socket.emit('user_add_error', error);
      } else {
        socket.emit('user_added', savedUser);
      }
    });
  });

  socket.on('get_scene_version_content', (data) => {
    const { id } = data;
    getSceneVersionContentSocket(id, (error: any, result: any) => {
      if (error) {
        socket.emit('get_scene_version_content_error', error);
      } else {
        socket.emit('scene_version_content', result);
      }
    });
  });
  
  socket.on('update_content_array', (data) => {
    console.log('Received update_content_array event:', data);
    updateContentArraySocket(data, (error: any, result: any) => {
      if (error) {
        socket.emit('update_content_array_error', error);
      } else {
        socket.emit('content_array_updated', result);
      }
    });
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected', socket.id);
  });
});

server.listen(Number(PORT), '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
