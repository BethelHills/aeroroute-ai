"use client";

import { useEffect, useState, type ReactNode } from "react";
import { WalletProviders } from "@/components/providers/wallet-providers";
import { Sidebar } from "./sidebar";
import { Header } from "./header";
import { MainContent } from "./main-content";

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px) and (max-width: 1279px)");
    const sync = () => setCollapsed(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileNavOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileNavOpen]);

  return (
    <WalletProviders>
    <div className="flex min-h-svh w-full overflow-hidden bg-[#03070b] text-white">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top_left,rgba(0,245,160,0.15),transparent_32%),radial-gradient(circle_at_top_right,rgba(255,122,24,0.12),transparent_34%),linear-gradient(180deg,#03070b_0%,#061018_55%,#03070b_100%)]" />
      <div className="pointer-events-none fixed inset-0 opacity-[0.2] [background-image:linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:72px_72px]" />

      <Sidebar
        mobileOpen={mobileNavOpen}
        onMobileClose={() => setMobileNavOpen(false)}
        collapsed={collapsed}
        onCollapsedChange={setCollapsed}
      />

      <div className="flex min-h-svh min-w-0 flex-1 flex-col">
        <Header onMenuClick={() => setMobileNavOpen(true)} />
        <MainContent>{children}</MainContent>
      </div>
    </div>
    </WalletProviders>
  );
}
