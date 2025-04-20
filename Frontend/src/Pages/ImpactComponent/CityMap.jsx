import React, { useEffect, useRef } from 'react';
import ee from '@google/earthengine';
import L from 'leaflet';

const CityMap = ({ city }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    const initializeMap = () => {
      if (mapRef.current) {
        const map = L.map(mapRef.current).setView([19.076, 72.8777], 10); // Default to Mumbai coordinates

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; OpenStreetMap contributors',
        }).addTo(map);

        // Initialize GEE
        ee.initialize();

        // Example: Load and display some GEE data
        const dataset = ee.Image('CGIAR/SRTM90_V4');
        const visParams = {
          min: 0,
          max: 3000,
          palette: ['blue', 'green', 'red'],
        };

        dataset.getMap(visParams, ({ tile_fetcher }) => {
          L.tileLayer(tile_fetcher.urlFormat).addTo(map);
        });

        return map;
      }
    };

    const mapInstance = initializeMap();

    return () => {
      if (mapInstance) {
        mapInstance.remove();
      }
    };
  }, [city]);

  return (
    <div>
      <h2>Map of {city}</h2>
      <div ref={mapRef} style={{ height: '500px', width: '100%' }}></div>
    </div>
  );
};

export default CityMap;
