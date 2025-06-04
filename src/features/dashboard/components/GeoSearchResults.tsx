import type { GeoPlaceResult } from "../../../hooks/useGeoSearch";

interface GeoSearchResultsProps {
  results: GeoPlaceResult[];
  onSelect: (result: GeoPlaceResult) => void;
  resultRef:
    | React.RefObject<HTMLDivElement>
    | React.MutableRefObject<HTMLDivElement | null>;
}

export const GeoSearchResults = ({
  resultRef,
  results,
  onSelect,
}: GeoSearchResultsProps) => {
  return (
    <div ref={resultRef}>
      {results.length > 0 && (
        <div
          style={{
            position: "absolute",
            top: "110%",
            left: 0,
            width: "100%",
            background: "#fff",
            border: "1px solid #ccc",
            borderRadius: "8px",
            zIndex: 50,
            maxHeight: 200,
            overflowY: "auto",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          }}
        >
          {results.map((result: GeoPlaceResult, index) => (
            <div
              key={index}
              style={{
                padding: "8px 12px",
                cursor: "pointer",
                borderBottom: "1px solid #eee",
              }}
              onClick={() => onSelect(result)}
            >
              {result?.formatted}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
