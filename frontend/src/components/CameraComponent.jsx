// src/CameraComponent.js
import React, { useRef, useEffect } from "react";

const CameraComponent = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    const getMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Error accessing camera:", err);
      }
    };

    getMedia();
  }, []);

  return <video ref={videoRef} autoPlay style={{ width: "100%" }} />;
};

export default CameraComponent;
