"use client";

import { useSyncExternalStore } from "react";
import { Network, Sparkles, Wallet } from "lucide-react";
import { useAccount } from "wagmi";
import { AiPortfolioInsights } from "@/components/portfolio/ai-portfolio-insights";
import { AllocationCard } from "@/components/portfolio/allocation-card";
import { AssetTable } from "@/components/portfolio/asset-table";
import { PortfolioSummary } from "@/components/portfolio/portfolio-summary";

function useIsClient() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

function PortfolioWorkspaceConnected() {
  const { address, isConnected } = useAccount();

  const displayAddress = address
    ? `${address.slice(0, 6)}...${address.slice(-4)}`
    : "Demo Wallet";

  return (
    <PortfolioWorkspaceView
      displayAddress={displayAddress}
      isConnected={isConnected}
    />
  );
}

function PortfolioWorkspaceView({
  displayAddress,
  isConnected,
}: {
  displayAddress: string;
  isConnected: boolean;
}) {
  return (
    <main className="min-h-screen overflow-hidden bg-[#03070b] text-white">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top_left,rgba(0,245,160,0.15),transparent_32%),radial-gradient(circle_at_top_right,rgba(255,122,24,0.12),transparent_34%),linear-gradient(180deg,#03070b_0%,#061018_55%,#03070b_100%)]" />
      <div className="fixed inset-0 opacity-[0.2] [background-image:linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:72px_72px]" />

      <section className="relative z-10 mx-auto max-w-7xl px-5 py-8 lg:px-8">
        <header className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-emerald-300">
              <Sparkles size={14} />
              Portfolio intelligence
            </div>

            <h1 className="text-4xl font-black tracking-[-0.05em] md:text-6xl">
              Portfolio{" "}
              <span className="bg-gradient-to-r from-emerald-300 via-cyan-300 to-orange-300 bg-clip-text text-transparent">
                Manager
              </span>
            </h1>

            <p className="mt-4 max-w-2xl text-slate-400">
              Track your Base assets, review route-ready balances, and discover
              AI-powered Aerodrome swap opportunities.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.035] px-5 py-3 text-sm font-bold text-slate-200 backdrop-blur-xl"
            >
              <Wallet size={17} />
              {displayAddress}
            </button>

            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-400 to-cyan-400 px-5 py-3 text-sm font-black text-[#041014]"
            >
              <Network size={17} />
              {isConnected ? "Connected" : "Demo Mode"}
            </button>
          </div>
        </header>

        <PortfolioSummary />

        <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_360px]">
          <div className="space-y-6">
            <AssetTable />
          </div>

          <div className="space-y-6">
            <AllocationCard />
            <AiPortfolioInsights />
          </div>
        </div>
      </section>
    </main>
  );
}

export function PortfolioWorkspace() {
  const mounted = useIsClient();

  if (!mounted) {
    return (
      <PortfolioWorkspaceView
        displayAddress="Demo Wallet"
        isConnected={false}
      />
    );
  }

  return <PortfolioWorkspaceConnected />;
}
