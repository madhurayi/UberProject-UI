import { GeoSearchResults } from "./GeoSearchResults";
import { useGeoSearch } from "../../../hooks/useGeoSearch";
import { useRef } from "react";

export interface GeoSearchProps {
  setAddress: (value: string) => void;
  address: string;
  // setPickupCoords: (value: Coordinates) => void,
  // setDropCoords: (value: Coordinates) => void,
}

export const GeoSearch = ({ address, setAddress }: GeoSearchProps) => {
  const { query, results, setResults, handleSearch } = useGeoSearch();
  const resultRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative">
      <input
        type="text"
        className="w-1/2 border-none outline-none"
        value={query.trim().length > 0 ? query : address}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        placeholder="Enter location"
      />
      <GeoSearchResults
        resultRef={resultRef}
        results={results}
        onSelect={async (result) => {
          await handleSearch(result.formatted);
          setAddress(result.formatted);
          setResults([]);
        }}
      />
    </div>
  );
};
