"use client";

import { Link2 } from "lucide-react";
import { ComingSoonPage } from "@/components/layout/coming-soon-page";

export default function ProtocolsPage() {
  return (
    <ComingSoonPage
      badge="Ecosystem"
      title="Protocol"
      titleAccent="Directory"
      description="Explore Aerodrome pools, connectors, and supported Base protocols in one place."
      icon={Link2}
    />
  );
}
