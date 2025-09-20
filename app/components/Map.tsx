"use client";

import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { FactoryData } from "../data/jsonData";

const operationalIconSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="green">
  <circle cx="12" cy="12" r="10" />
</svg>
`;

const maintenanceIconSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="red">
  <circle cx="12" cy="12" r="10" />
</svg>
`;

const MapComponent = ({ factories }: { factories: FactoryData[] }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => setIsClient(true), []);

  // Filter factories with valid coordinates
  const factoriesWithCoords = factories.filter(
    (f) => f.location?.latitude != null && f.location?.longitude != null
  );

  if (factoriesWithCoords.length === 0)
    return <div>No factories to display</div>;

  // Map center calculation
  const centerLat =
    factoriesWithCoords.reduce((sum, f) => sum + f.location.latitude, 0) /
    factoriesWithCoords.length;
  const centerLng =
    factoriesWithCoords.reduce((sum, f) => sum + f.location.longitude, 0) /
    factoriesWithCoords.length;

  // Icons
  // Pin emoji markers
  const operationalIcon = L.divIcon({
    html: "📍", // pin emoji
    className: "text-2xl", // adjust size
    iconSize: [36, 36],
    iconAnchor: [18, 36],
    popupAnchor: [0, -36],
  });

  const maintenanceIcon = L.divIcon({
    html: "📍", // same pin emoji, you can change color by wrapping in a span if needed
    className: "text-2xl",
    iconSize: [36, 36],
    iconAnchor: [18, 36],
    popupAnchor: [0, -36],
  });

  if (!isClient) {
    return (
      <div className="flex items-center justify-center h-96 bg-gray-100 text-gray-500">
        Loading map...
      </div>
    );
  }

  return (
    <div className="h-[500px] w-full rounded-lg shadow-xl overflow-hidden">
      <MapContainer
        center={[centerLat, centerLng]}
        zoom={6}
        style={{ height: "500px", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        {factoriesWithCoords.map((factory) => {
          const icon =
            factory.status === "operational"
              ? operationalIcon
              : maintenanceIcon;

          return (
            <Marker
              key={factory.id}
              position={[factory.location.latitude, factory.location.longitude]}
              icon={icon}
            >
              <Popup>{factory.name}</Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default MapComponent;
