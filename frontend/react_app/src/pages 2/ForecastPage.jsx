import { useEffect, useState } from "react";

import ClimateChart from "../components/charts/ClimateChart";
import { fetchClimateForecast } from "../services/apiClient";

export default function ForecastPage() {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchClimateForecast({ region_id: "delhi-ncr", horizon_days: 7 })
      .then((response) => {
        setData(
          response.points.map((point) => ({
            date: point.date.slice(5),
            rainfall_mm: point.rainfall_mm,
            temperature_c: point.temperature_c,
          })),
        );
      })
      .catch(() => setError("Could not load forecast from backend API."));
  }, []);

  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-leaf-800">Climate Impact Forecasting</h2>
      {error ? <p className="rounded-xl bg-rose-100 p-4 text-rose-700">{error}</p> : <ClimateChart data={data} />}
    </section>
  );
}
