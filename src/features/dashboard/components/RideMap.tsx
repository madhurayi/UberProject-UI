import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import type { Coordinates } from "../pages/BookingPage";
import { useEffect, useState } from "react";
import { getRouteOSRM } from "../../../utils/getRouteOSRM";

export interface RouteData {
  coordinates: [number, number][];
  distance: number; // in meters
  duration: number; // in seconds
}

export const RideMap = ({
  pickup,
  drop,
}: {
  pickup: Coordinates;
  drop: Coordinates;
}) => {
  const [routeData, setRouteData] = useState<RouteData | null>(null);
  const [, setLoading] = useState(false);
  const [, setError] = useState<string | null>(null);

  const pickupLatLng: [number, number] = [pickup.lat, pickup.lng];
  const dropLatLng: [number, number] = [drop.lat, drop.lng];

  const pickupIcon = L.icon({
    iconUrl: "/PICKUP_ICON.png", // Make sure this path is correct and in `public` folder
    iconSize: [28, 28],
    iconAnchor: [16, 32],
  });

  const dropIcon = L.icon({
    iconUrl: "/DROP_ICON.png",
    iconSize: [28, 28],
    iconAnchor: [16, 32],
  });

  useEffect(() => {
    const fetchRoute = async () => {
      setLoading(true);
      setError(null);

      // Try OSRM first (free, no API key needed)
      let route = await getRouteOSRM(pickup, drop);

      // Fallback to direct line if route service fails
      if (!route) {
        setError("Could not fetch route, showing direct path");
        route = {
          coordinates: [pickupLatLng, dropLatLng],
          distance: 0,
          duration: 0,
        };
      }

      setRouteData(route);
      setLoading(false);
    };

    fetchRoute();
  }, [pickup.lat, pickup.lng, drop.lat, drop.lng]);

  const bounds = routeData
    ? L.latLngBounds([...routeData.coordinates, pickupLatLng, dropLatLng])
    : L.latLngBounds([pickupLatLng, dropLatLng]);

  // const formatDistance = (meters: number) => {
  //   if (meters < 1000) return `${Math.round(meters)}m`;
  //   return `${(meters / 1000).toFixed(1)}km`;
  // };

  // const formatDuration = (seconds: number) => {
  //   const minutes = Math.round(seconds / 60);
  //   if (minutes < 60) return `${minutes}min`;
  //   const hours = Math.floor(minutes / 60);
  //   const remainingMinutes = minutes % 60;
  //   return `${hours}h ${remainingMinutes}min`;
  // };

  console.log("route", routeData);

  return (
    <MapContainer
      bounds={bounds}
      style={{ height: "400px", width: "100%" }}
      className="rounded-lg mt-7"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      <Marker position={pickupLatLng} icon={pickupIcon} />
      <Marker position={dropLatLng} icon={dropIcon} />
      {routeData && (
        <Polyline
          positions={routeData.coordinates}
          color="#2563eb"
          weight={4}
          opacity={0.8}
        />
      )}{" "}
    </MapContainer>
  );
};
