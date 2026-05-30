"use client";

import { Bell } from "lucide-react";
import { ComingSoonPage } from "@/components/layout/coming-soon-page";

export default function AlertsPage() {
  return (
    <ComingSoonPage
      badge="Monitoring"
      title="Route"
      titleAccent="Alerts"
      description="Configure notifications for better routes, gas shifts, and transaction outcomes."
      icon={Bell}
    />
  );
}
