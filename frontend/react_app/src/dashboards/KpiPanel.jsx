const formatters = {
  currency: (value) => `INR ${Number(value).toLocaleString("en-IN")}`,
  percent: (value) => `${Number(value).toFixed(1)}%`,
  number: (value) => Number(value).toFixed(2),
};

export default function KpiPanel({ kpis }) {
  return (
    <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {kpis.map((kpi) => (
        <article key={kpi.label} className="rounded-2xl border border-white/70 bg-white/80 p-5 shadow-panel backdrop-blur">
          <p className="text-sm text-leaf-600">{kpi.label}</p>
          <p className="mt-2 text-3xl font-bold text-leaf-800">{formatters[kpi.type || "number"](kpi.value)}</p>
          <p className={`mt-2 text-sm ${kpi.delta >= 0 ? "text-leaf-600" : "text-rose-600"}`}>
            {kpi.delta >= 0 ? "+" : ""}
            {kpi.delta.toFixed(1)}% vs last month
          </p>
        </article>
      ))}
    </section>
  );
}
