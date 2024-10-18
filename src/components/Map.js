import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Car icon for the Marker
const carIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/744/744465.png', // URL for car icon
  iconSize: [40, 40], // Size of the icon
  iconAnchor: [20, 40], // Anchor point of the icon
});

// Static vehicle data (previously from the backend)
const vehicleData = [
  { latitude: 19.86093, longitude: 75.3109, timestamp: "2024-10-16T10:00:00Z" },
  { latitude: 19.86121, longitude: 75.31202, timestamp: "2024-10-16T10:00:05Z" },
  { latitude: 19.86176, longitude: 75.31318, timestamp: "2024-10-16T10:00:10Z" },
  { latitude: 19.86271, longitude: 75.31517, timestamp: "2024-10-16T10:00:15Z" },
  { latitude: 19.86325, longitude: 75.31581, timestamp: "2024-10-16T10:00:20Z" },
  { latitude: 19.86383, longitude: 75.31639, timestamp: "2024-10-16T10:00:25Z" },
  { latitude: 19.86501, longitude: 75.31737, timestamp: "2024-10-16T10:00:30Z" },
  { latitude: 19.86523, longitude: 75.3162, timestamp: "2024-10-16T10:00:35Z" },
  { latitude: 19.8653, longitude: 75.31516, timestamp: "2024-10-16T10:00:40Z" },
  { latitude: 19.86533, longitude: 75.31384, timestamp: "2024-10-16T10:00:45Z" },
  { latitude: 19.86539, longitude: 75.31305, timestamp: "2024-10-16T10:00:50Z" },
  { latitude: 19.86573, longitude: 75.3113, timestamp: "2024-10-16T10:00:55Z" }
];

const Map = () => {
  const [vehiclePosition, setVehiclePosition] = useState([19.86093, 75.3109]);
  const [path, setPath] = useState([]);
  const [animationInterval, setAnimationInterval] = useState(null);

  // Function to animate the vehicle marker along the path
  const animateVehicle = () => {
    let index = 0;
    const totalPoints = vehicleData.length;

    // Clear the existing interval if it exists
    if (animationInterval) {
      clearInterval(animationInterval);
    }

    const newInterval = setInterval(() => {
      if (index < totalPoints) {
        const { latitude, longitude } = vehicleData[index];
        setVehiclePosition([latitude, longitude]);
        index++;
      } else {
        clearInterval(newInterval); // Stop animation when all points are reached
      }
    }, 1000); // Change every second

    setAnimationInterval(newInterval); // Store the new interval
  };

  useEffect(() => {
    const pathData = vehicleData.map((loc) => [loc.latitude, loc.longitude]);
    setPath(pathData);
    setVehiclePosition(pathData[0]); // Start at the first position
    animateVehicle(); // Start animating the vehicle
  }, []);

  return (
    <div>
      <h1>Vehicle Movement on Leaflet Map</h1>

      <MapContainer center={vehiclePosition} zoom={15} style={{ height: '600px', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* Marker for the vehicle */}
        <Marker position={vehiclePosition} icon={carIcon}>
          <Popup>
            <div>
              <h3>Vehicle Information</h3>
              <p>Current Position: {vehiclePosition[0]}, {vehiclePosition[1]}</p>
              <p>Timestamp: {new Date().toLocaleString()}</p>
            </div>
          </Popup>
        </Marker>

        {/* Polyline to show the vehicle's route */}
        {path.length > 0 && <Polyline positions={path} color="green" />}
      </MapContainer>
    </div>
  );
};

export default Map;
