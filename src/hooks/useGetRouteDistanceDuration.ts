import { useState } from "react";
import type { Coordinates } from "../features/dashboard/pages/BookingPage";

export const useGetRouteDistanceDuration = ()=>{

      const [distance, setDistance] = useState<string | null>(null);
      const [duration, setDuration] = useState<string | null>(null);

    const getRouteDistanceDur = async (start: Coordinates, end: Coordinates) => {
        const res = await fetch(
          `https://api.openrouteservice.org/v2/directions/driving-car`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: import.meta.env.VITE_OPEN_ROUTE_SERVICE_KEY,
            },
            body: JSON.stringify({
              coordinates: [
                [start.lng, start.lat],
                [end.lng, end.lat],
              ],
            }),
          }
        );
        const data = await res.json();
        setDistance((data.routes[0].summary.distance / 1000).toFixed(2));
        setDuration((data.routes[0].summary.duration / 60).toFixed(2));
      };

    return {getRouteDistanceDur,distance, duration};
}