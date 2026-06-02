import {
  Bot,
  History,
  LayoutDashboard,
  Route,
  Settings,
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
  { label: "Settings", href: "/settings", icon: Settings },
];

const APP_SHELL_TITLES: Record<string, string> = {
  "/protocols": "Protocols",
  "/portfolio": "Portfolio",
  "/analytics": "Analytics",
  "/alerts": "Alerts",
  "/integrations": "Integrations",
};

export function getNavTitle(pathname: string): string {
  const match = APP_NAV_ITEMS.find(
    (item) =>
      pathname === item.href || pathname.startsWith(`${item.href}/`),
  );
  if (match) return match.label;
  return APP_SHELL_TITLES[pathname] ?? "AeroRoute AI";
}

/** Routes wrapped by AppShell (not the marketing landing page). */
export function isAppShellRoute(pathname: string): boolean {
  return pathname !== "/" && !pathname.startsWith("/_");
}
