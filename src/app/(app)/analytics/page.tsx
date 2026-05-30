"use client";

import { LineChart } from "lucide-react";
import { ComingSoonPage } from "@/components/layout/coming-soon-page";

export default function AnalyticsPage() {
  return (
    <ComingSoonPage
      badge="Insights"
      title="Route"
      titleAccent="Analytics"
      description="Visualize liquidity depth, execution quality, and savings trends over time."
      icon={LineChart}
    />
  );
}
