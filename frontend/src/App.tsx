import React, { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

const App: React.FC = () => {
  const socketRef = useRef<Socket | null>(null);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    socketRef.current = io(API_BASE_URL, {
      transports: ['websocket'],
      rejectUnauthorized: false,
    });

    socketRef.current.on('connect', () => {
      console.log('Socket connected');
    });

    socketRef.current.on('scene_version_content', (response) => {
      console.log('SUCCESS');
      console.log('data:', response);
    });

    socketRef.current.on('connect_error', (error) => {
      console.error('Socket connection error:', error);
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [API_BASE_URL]);

  const fetchSceneVersionContent = (id: string) => {
    if (socketRef.current) {
      socketRef.current.emit('get_scene_version_content', { id });
    }
  };

  const addUser = () => {
    const data = {
      first_name: 'From front end websockets version Homie3',
      last_name: 'From front end websockets version Homie3',
      email: 'From front end websockets versionHomie3@gmail.com',
      scripts_id_array: [],
    };

    if (socketRef.current) {
      socketRef.current.emit('add_user', data);
    }
  };

  return (
    <div className="App">
      <div>Toxic Positivity is for Realzzzzzz</div>
      <button title="Add User" onClick={addUser}>Add User</button>
      <button title="Fetch Scene Version Content" onClick={() => fetchSceneVersionContent('66495227baa753a417fd5468')}>Fetch Scene Version Content</button>
    </div>
  );
};

export default App;
