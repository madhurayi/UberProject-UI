export interface Coordinates {
  lat: number;
  lng: number;
}

export const getLatLng = async (address: string): Promise<Coordinates | undefined> => {
  const res = await fetch(
    `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(address)}&key=${import.meta.env.VITE_OPEN_CAGE_API_KEY}`
  );
  const data = await res.json();
  return data?.results;
};

export const getRoute = async (
  start: Coordinates,
  end: Coordinates,
): Promise<void> => {
  const res = await fetch(`https://api.openrouteservice.org/v2/directions/driving-car`, {
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
  });

  await res.json();
  // setDistance((data.routes[0].summary.distance / 1000).toFixed(2));
  // setDuration((data.routes[0].summary.duration / 60).toFixed(2));
};
