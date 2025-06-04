import { useState } from "react";
import opencage from 'opencage-api-client';
import type { Coordinates } from "../utils/geoLocation";

export interface GeoPlaceResult {
  formatted: string,
  geometry: Coordinates
}

export const useGeoSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const handleSearch = async (value: string) => {
    setQuery(value);
    if (!value) {
      setResults([]);
      return;
    }
    try {
      const data = await opencage.geocode({ q: value, key: import.meta.env.VITE_OPEN_CAGE_API_KEY });
      setResults(data.results);
    } catch (error) {
      setResults([]);
      console.error('Error fetching data: ', error);
    }
  };
  return { query, setQuery, results, handleSearch, setResults };
}