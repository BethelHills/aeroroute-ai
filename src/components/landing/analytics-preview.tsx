import { analyticsMetrics } from "@/lib/landing-data";
import { Metric } from "./metric";
import { PortfolioPreview } from "./portfolio-preview";

export function AnalyticsPreview() {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-5 backdrop-blur-xl">
      <div className="grid gap-4 md:grid-cols-4">
        {analyticsMetrics.map((metric) => (
          <Metric key={metric.label} {...metric} />
        ))}
      </div>
      <PortfolioPreview />
    </div>
  );
}
