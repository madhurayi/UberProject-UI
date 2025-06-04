import type { RouteData } from "../features/dashboard/components/RideMap";
import type { Coordinates } from "../features/dashboard/pages/BookingPage";

export const getRouteOSRM = async (
  pickup: Coordinates,
  drop: Coordinates
): Promise<RouteData | null> => {
  try {
    const url = `https://router.project-osrm.org/route/v1/driving/${pickup.lng},${pickup.lat};${drop.lng},${drop.lat}?geometries=geojson&overview=full`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.routes && data.routes[0]) {
      const route = data.routes[0];
      const coordinates = route.geometry.coordinates.map(
        (coord: number[]) => [coord[1], coord[0]] as [number, number]
      );

      return {
        coordinates,
        distance: route.distance,
        duration: route.duration,
      };
    }

    return null;
  } catch (error) {
    console.error("Error fetching OSRM route:", error);
    return null;
  }
};