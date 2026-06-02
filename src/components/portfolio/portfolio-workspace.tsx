"use client";

import { useSyncExternalStore } from "react";
import { Sparkles } from "lucide-react";
import { AiPortfolioInsights } from "@/components/portfolio/ai-portfolio-insights";
import { AllocationCard } from "@/components/portfolio/allocation-card";
import { AssetTable } from "@/components/portfolio/asset-table";
import { PortfolioDataNotice } from "@/components/portfolio/portfolio-data-notice";
import { PortfolioSummary } from "@/components/portfolio/portfolio-summary";
import { PortfolioWalletHeader } from "@/components/portfolio/portfolio-wallet-header";
import { usePortfolioBalances } from "@/hooks/use-portfolio-balances";
import { buildDemoPortfolioView, type PortfolioViewData } from "@/lib/portfolio-data";

function useIsClient() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

type PortfolioWorkspaceLayoutProps = {
  walletReady: boolean;
  portfolio: PortfolioViewData;
  walletAddress?: string;
};

function PortfolioWorkspaceLayout({
  walletReady,
  portfolio,
  walletAddress,
}: PortfolioWorkspaceLayoutProps) {
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

          <PortfolioWalletHeader walletReady={walletReady} />
        </header>

        <PortfolioDataNotice
          dataMode={portfolio.dataMode}
          walletAddress={walletAddress}
          isLoading={portfolio.isLoading}
          readFailed={portfolio.readFailed}
          className="mb-6"
        />

        <PortfolioSummary portfolio={portfolio} />

        <div className="mt-6 grid w-full min-w-0 grid-cols-1 gap-6 lg:grid-cols-[1fr_minmax(0,360px)]">
          <div className="min-w-0 space-y-6">
            <AssetTable portfolio={portfolio} />
          </div>

          <div className="min-w-0 space-y-6">
            <AllocationCard portfolio={portfolio} />
            <AiPortfolioInsights portfolio={portfolio} />
          </div>
        </div>
      </section>
    </div>
  );
}

function PortfolioWorkspaceWithBalances() {
  const balances = usePortfolioBalances(true);

  return (
    <PortfolioWorkspaceLayout
      walletReady
      portfolio={balances.portfolio}
      walletAddress={balances.address}
    />
  );
}

export function PortfolioWorkspace() {
  const mounted = useIsClient();
  const demoPortfolio = buildDemoPortfolioView();

  if (!mounted) {
    return (
      <PortfolioWorkspaceLayout
        walletReady={false}
        portfolio={demoPortfolio}
      />
    );
  }

  return <PortfolioWorkspaceWithBalances />;
}
