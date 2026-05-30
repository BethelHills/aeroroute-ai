"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PanelLeftClose, PanelLeftOpen, X } from "lucide-react";
import { Logo } from "@/components/landing/logo";
import { cn } from "@/lib/utils";
import { APP_NAV_ITEMS } from "./app-nav";

type SidebarProps = {
  mobileOpen: boolean;
  onMobileClose: () => void;
  collapsed: boolean;
  onCollapsedChange: (collapsed: boolean) => void;
};

function NavLinks({
  collapsed,
  onNavigate,
}: {
  collapsed: boolean;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();

  return (
    <nav className="flex flex-1 flex-col gap-1 px-2 py-4">
      {APP_NAV_ITEMS.map((item) => {
        const Icon = item.icon;
        const active =
          pathname === item.href || pathname.startsWith(`${item.href}/`);

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            title={collapsed ? item.label : undefined}
            className={cn(
              "flex items-center gap-3 rounded-xl border px-3 py-2.5 text-sm font-bold transition",
              active
                ? "border-emerald-400/40 bg-emerald-400/10 text-emerald-200"
                : "border-transparent text-slate-400 hover:border-white/10 hover:bg-white/[0.04] hover:text-white",
              collapsed && "justify-center px-2",
            )}
          >
            <Icon size={18} className="shrink-0" />
            {!collapsed && <span className="truncate">{item.label}</span>}
          </Link>
        );
      })}
    </nav>
  );
}

function SidebarPanel({
  collapsed,
  onCollapsedChange,
  onNavigate,
  showCollapseToggle,
}: {
  collapsed: boolean;
  onCollapsedChange: (collapsed: boolean) => void;
  onNavigate?: () => void;
  showCollapseToggle: boolean;
}) {
  return (
    <div className="flex h-full flex-col">
      <div
        className={cn(
          "flex items-center border-b border-white/10 px-4 py-5",
          collapsed ? "justify-center" : "justify-between gap-3",
        )}
      >
        {!collapsed && (
          <Logo priority href="/dashboard" className="h-auto w-36 sm:w-40 lg:w-44" />
        )}
        {showCollapseToggle && (
          <button
            type="button"
            onClick={() => onCollapsedChange(!collapsed)}
            className="rounded-lg border border-white/10 p-2 text-slate-400 hover:text-white"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}
          </button>
        )}
      </div>
      <NavLinks collapsed={collapsed} onNavigate={onNavigate} />
    </div>
  );
}

export function Sidebar({
  mobileOpen,
  onMobileClose,
  collapsed,
  onCollapsedChange,
}: SidebarProps) {
  return (
    <>
      {/* Desktop + tablet: fixed sidebar */}
      <aside
        className={cn(
          "relative z-30 hidden h-screen shrink-0 flex-col border-r border-white/10 bg-[#03070b]/95 backdrop-blur-xl transition-[width] duration-200 md:flex",
          collapsed ? "w-[4.5rem]" : "w-64 lg:w-72",
        )}
      >
        <SidebarPanel
          collapsed={collapsed}
          onCollapsedChange={onCollapsedChange}
          showCollapseToggle
        />
      </aside>

      {/* Mobile drawer */}
      {mobileOpen && (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-black/60 md:hidden"
          aria-label="Close navigation"
          onClick={onMobileClose}
        />
      )}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-72 max-w-[85vw] flex-col border-r border-white/10 bg-[#03070b] shadow-2xl transition-transform duration-200 md:hidden",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-4">
          <Logo priority href="/dashboard" className="h-auto w-40 max-w-full" />
          <button
            type="button"
            onClick={onMobileClose}
            className="rounded-lg border border-white/10 p-2 text-slate-400 hover:text-white"
            aria-label="Close menu"
          >
            <X size={18} />
          </button>
        </div>
        <SidebarPanel
          collapsed={false}
          onCollapsedChange={onCollapsedChange}
          onNavigate={onMobileClose}
          showCollapseToggle={false}
        />
      </aside>
    </>
  );
}
