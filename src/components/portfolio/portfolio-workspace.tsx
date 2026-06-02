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
    <div className="w-full min-w-0 overflow-x-hidden text-white">
      <section className="relative z-10 mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
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

          <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:flex-wrap sm:gap-3">
            <button
              type="button"
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.035] px-5 py-3 text-sm font-bold text-slate-200 backdrop-blur-xl sm:w-auto"
            >
              <Wallet size={17} />
              <span className="truncate">{displayAddress}</span>
            </button>

            <button
              type="button"
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-400 to-cyan-400 px-5 py-3 text-sm font-black text-[#041014] sm:w-auto"
            >
              <Network size={17} />
              {isConnected ? "Connected" : "Demo Mode"}
            </button>
          </div>
        </header>

        <PortfolioSummary />

        <div className="mt-6 grid w-full min-w-0 grid-cols-1 gap-6 lg:grid-cols-[1fr_minmax(0,360px)]">
          <div className="min-w-0 space-y-6">
            <AssetTable />
          </div>

          <div className="min-w-0 space-y-6">
            <AllocationCard />
            <AiPortfolioInsights />
          </div>
        </div>
      </section>
    </div>
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
