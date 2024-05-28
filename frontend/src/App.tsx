import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { io, Socket } from "socket.io-client";
import MyErrorBoundary from "./MyErrorBoundary";

import CameraComponent from "./components/CameraComponent";
import LocationComponent from "./components/LocationComponent";
import SpeechToText from "./components/SpeechToText";

const App: React.FC = () => {
  const socketRef = useRef<Socket | null>(null);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(`${API_BASE_URL}/api/users`, {
          first_name: "From front end UseEffect9",
          last_name: "From front end UseEffect9",
          email: "From front end UseEffect9@gmail.com",
          scripts_id_array: [],
        });
        console.log("User added:", response.data);
      } catch (error: any) {
        if (error.response) {
          console.error("Error response:", error.response.data);
        } else if (error.request) {
          console.error("Error request:", error.request);
        } else {
          console.error("Error:", error.message);
        }
      }
    };
    fetchData();
  }, [API_BASE_URL]);

  useEffect(() => {
    // Initialize the WebSocket connection
    socketRef.current = io(API_BASE_URL, {
      transports: ["websocket"], // Force WebSocket transport
      rejectUnauthorized: false, // Accept self-signed certificates if using HTTPS
    });

    socketRef.current.on("connect", () => {
      console.log("Socket connected");
    });

    socketRef.current.on("user_added", (response) => {
      console.log("SUCCESS");
      console.log("User added:", response);
    });

    socketRef.current.on("connect_error", (error) => {
      console.error("Socket connection error:", error);
      console.log("FAILED");
    });

    return () => {
      // Clean up the WebSocket connection when the component unmounts
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [API_BASE_URL]);

  const addUser = () => {
    const data = {
      first_name: "From front end websockets version Homie3",
      last_name: "From front end websockets version Homie3",
      email: "From front end websockets versionHomie3@gmail.com",
      scripts_id_array: [],
    };

    if (socketRef.current) {
      socketRef.current.emit("add_user", data);
    }
  };

  return (
    <MyErrorBoundary fallback={"There was an error"}>
      <div className="custom-combined">
        {/* Heading with extended 6xl font size */}
        <h1 className="text-6xl font-bold text-primary mb-4">
          Welcome to the Screenwriting App
        </h1>
        <div>Toxic Positivity is for Realzzzzzz</div>
        <button title="Add User" onClick={addUser}>
          Add User
        </button>
        <div>
          <div className="text-custom-red">
            <div className="m-[var(--mXL)] p-[var(--padL)] text-fs1300">
              Hello World
            </div>
            <div className="p-4 bg-white rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-2">Example Component</h2>
              <p className="text-[purple]">
                This is an example component using Tailwind CSS.
              </p>
              <button className="custom-btn">Click Me</button>
            </div>
            <h1 className="text-[pink]">Camera and Location Access</h1>

            <div className="mt-[10rem]">
              <CameraComponent />
            </div>

            <LocationComponent />
            <div className="mt-[10rem]">
              <SpeechToText />
            </div>
          </div>
        </div>
      </div>
    </MyErrorBoundary>
  );
};

export default App;
