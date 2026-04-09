import { useEffect, useState } from "react";

import ProductivityMap from "../maps/ProductivityMap";
import { fetchProductivityMap } from "../services/apiClient";

const mapModes = [
  { id: "productivity", label: "Crop Productivity" },
  { id: "rainfall", label: "Rainfall Heatmap" },
  { id: "ndvi", label: "NDVI Vegetation" },
];

export default function MapInsightsPage() {
  const [geojson, setGeojson] = useState({ type: "FeatureCollection", features: [] });
  const [mapMode, setMapMode] = useState("productivity");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProductivityMap({ region_id: "delhi-ncr" })
      .then((response) => setGeojson(response.geojson))
      .catch(() => setError("Could not load geospatial productivity layer."));
  }, []);

  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-leaf-800">Geospatial Productivity Mapping</h2>
      <div className="flex flex-wrap gap-2">
        {mapModes.map((mode) => (
          <button
            key={mode.id}
            type="button"
            onClick={() => setMapMode(mode.id)}
            className={`rounded-full px-4 py-2 text-sm font-medium ${
              mapMode === mode.id ? "bg-leaf-700 text-white" : "bg-white text-leaf-700"
            }`}
          >
            {mode.label}
          </button>
        ))}
      </div>
      {error ? <p className="rounded-xl bg-rose-100 p-4 text-rose-700">{error}</p> : <ProductivityMap featureCollection={geojson} mapMode={mapMode} />}
    </section>
  );
}
