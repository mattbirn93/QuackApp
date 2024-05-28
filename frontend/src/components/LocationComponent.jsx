// src/LocationComponent.js
import React, { useState, useEffect } from 'react';

const LocationComponent = () => {
  const [location, setLocation] = useState({ latitude: null, longitude: null });

  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLocation({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
          },
          (error) => console.error('Error getting location:', error),
          { enableHighAccuracy: true }
        );
      }
    };

    getLocation();
  }, []);

  return (
    <div>
      <h1>Location Access</h1>
      <p>Latitude: {location.latitude}</p>
      <p>Longitude: {location.longitude}</p>
    </div>
  );
};

export default LocationComponent;
