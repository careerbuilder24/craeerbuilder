import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const Map = ({ center, zoom }) => {
  const mapRef = useRef(null); // To keep track of the map instance

  useEffect(() => {
    // Initialize the map only if it hasn't been initialized yet
    if (!mapRef.current) {
      const map = L.map('map').setView([center.lat, center.lng], zoom);

      // Add OpenStreetMap tiles
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      // Add a marker
      L.marker([center.lat, center.lng]).addTo(map);

      // Store the map instance
      mapRef.current = map;
    }

    // Cleanup function to remove the map instance on unmount
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [center, zoom]);

  return <div id="map" style={{ width: '100%', height: '100%' }}></div>;
};

export default Map;
