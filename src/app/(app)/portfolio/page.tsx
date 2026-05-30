"use client";

import { Wallet } from "lucide-react";
import { ComingSoonPage } from "@/components/layout/coming-soon-page";

export default function PortfolioPage() {
  return (
    <ComingSoonPage
      badge="Holdings"
      title="Portfolio"
      titleAccent="Overview"
      description="Track wallet balances, positions, and token exposure across Aerodrome routes on Base."
      icon={Wallet}
    />
  );
}
