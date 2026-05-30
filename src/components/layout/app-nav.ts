import {
  Bell,
  Bot,
  History,
  LayoutDashboard,
  LineChart,
  Link2,
  PieChart,
  Route,
  Settings,
  Wallet,
  type LucideIcon,
} from "lucide-react";

export type AppNavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
};

export const APP_NAV_ITEMS: AppNavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Route Optimizer", href: "/route-optimizer", icon: Route },
  { label: "Agent Chat", href: "/agent-chat", icon: Bot },
  { label: "History", href: "/history", icon: History },
  { label: "Portfolio", href: "/portfolio", icon: Wallet },
  { label: "Protocols", href: "/protocols", icon: Link2 },
  { label: "Analytics", href: "/analytics", icon: LineChart },
  { label: "Alerts", href: "/alerts", icon: Bell },
  { label: "Integrations", href: "/integrations", icon: PieChart },
  { label: "Settings", href: "/settings", icon: Settings },
];

export function getNavTitle(pathname: string): string {
  const match = APP_NAV_ITEMS.find(
    (item) =>
      pathname === item.href || pathname.startsWith(`${item.href}/`),
  );
  return match?.label ?? "AeroRoute AI";
}
