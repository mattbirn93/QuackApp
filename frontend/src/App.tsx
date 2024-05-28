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

    socketRef.current.on('content_array_updated', (response) => {
      console.log('Content array updated:', response);
    });

    socketRef.current.on('update_content_array_error', (error) => {
      console.error('Update content array error:', error);
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
      console.log('Emitting get_scene_version_content event with id:', id);
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

  const updateContentArray = () => {
    const data = {
      id: '66495227baa753a417fd5468', // Replace with the actual ID
      contentItem: {
        notes: 'Non notes',
        text: 'Updated text',
        type: 'Updated type',
        content_id: '664cd9c83f4fd7f2ad6664f9', // Replace with the actual content_id
      },
    };

    if (socketRef.current) {
      console.log('Emitting update_content_array event with data:', data);
      socketRef.current.emit('update_content_array', data);
    }
  };

  return (
    <div className="App">
      <div>WebSocket Example</div>
      <button onClick={addUser}>Add User</button>
      <button onClick={() => fetchSceneVersionContent('66495227baa753a417fd5468')}>Fetch Scene Version Content</button>
      <button onClick={updateContentArray}>Update Content Array</button>
    </div>
  );
};

export default App;
