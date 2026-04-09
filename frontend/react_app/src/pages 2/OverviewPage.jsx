import { useMemo } from "react";

import YieldTrendChart from "../components/charts/YieldTrendChart";
import KpiPanel from "../dashboards/KpiPanel";

export default function OverviewPage() {
  const kpis = useMemo(
    () => [
      { label: "Avg Yield", value: 4.12, delta: 3.4 },
      { label: "Water Efficiency", value: 71.8, delta: 1.9, type: "percent" },
      { label: "Projected Revenue", value: 1285000, delta: 5.2, type: "currency" },
    ],
    [],
  );

  const trendData = useMemo(
    () => [
      { month: "Jan", yield_tph: 3.2 },
      { month: "Feb", yield_tph: 3.5 },
      { month: "Mar", yield_tph: 3.8 },
      { month: "Apr", yield_tph: 4.0 },
      { month: "May", yield_tph: 4.4 },
      { month: "Jun", yield_tph: 4.6 },
    ],
    [],
  );

  return (
    <section className="space-y-6">
      <KpiPanel kpis={kpis} />
      <YieldTrendChart data={trendData} />
    </section>
  );
}
