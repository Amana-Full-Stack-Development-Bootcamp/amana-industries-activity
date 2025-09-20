import L from "leaflet";
import { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { FactoryData } from "../data/jsonData";

const operationalIconSvg = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="green" width="36px" height="36px">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
  </svg>`;

const maintenanceIconSvg = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="red" width="36px" height="36px">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
  </svg>`;

export const MapComponent = ({ factories }: FactoryData) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Define custom icons for Leaflet
  const operationalIcon = L.divIcon({
    html: operationalIconSvg,
    className: "", // remove default leaflet styles
    iconSize: [36, 36],
    iconAnchor: [18, 36],
    popupAnchor: [0, -36],
  });

  const maintenanceIcon = L.divIcon({
    html: maintenanceIconSvg,
    className: "",
    iconSize: [36, 36],
    iconAnchor: [18, 36],
    popupAnchor: [0, -36],
  });

  // Calculate center of the map
  const latitudes: number[] = factories.map(
    (f: FactoryData) => f?.location?.latitude
  );
  const longitudes: number[] = factories.map(
    (f: FactoryData) => f?.location?.longitude
  );
  const centerLat = latitudes.reduce((a, b) => a + b, 0) / latitudes.length;
  const centerLng = longitudes.reduce((a, b) => a + b, 0) / longitudes.length;

  if (!isClient) {
    return (
      <div className="flex items-center justify-center h-96 bg-gray-100 text-gray-500">
        Loading map...
      </div>
    );
  }

  return (
    <div className="bg-gray-50 py-8 md:py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Factory Statuses
        </h2>
        <div className="h-[500px] w-full rounded-lg shadow-xl overflow-hidden">
          <MapContainer
            center={[centerLat, centerLng]}
            zoom={6}
            scrollWheelZoom={false}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {factories.map((factory: FactoryData) => (
              <Marker
                key={factory.id}
                position={[
                  factory.location?.latitude ?? 0,
                  factory.location?.longitude ?? 0,
                ]}
                icon={
                  factory.status === "operational"
                    ? operationalIcon
                    : maintenanceIcon
                }
              >
                <Popup>
                  <div className="font-sans">
                    <h3 className="font-bold text-base mb-1">{factory.name}</h3>
                    <p className="text-gray-600 text-sm">
                      {factory.location?.city}, {factory.location?.country}
                    </p>
                    <p
                      className={`text-sm font-semibold mt-2 ${
                        factory.status === "operational"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      Status:{" "}
                      <span className="capitalize">{factory.status}</span>
                    </p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </div>
  );
};
