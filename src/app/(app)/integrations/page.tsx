"use client";

import { PieChart } from "lucide-react";
import { ComingSoonPage } from "@/components/layout/coming-soon-page";

export default function IntegrationsPage() {
  return (
    <ComingSoonPage
      badge="Connections"
      title="App"
      titleAccent="Integrations"
      description="Manage Aomi, WalletConnect, OpenRouter, and other runtime integrations."
      icon={PieChart}
    />
  );
}
