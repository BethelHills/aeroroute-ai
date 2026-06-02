"use client";

import { History, Sparkles } from "lucide-react";
import { WalletStatusButtons } from "@/components/layout/wallet-status-buttons";
import { AiPortfolioInsights } from "@/components/portfolio/ai-portfolio-insights";
import { AllocationCard } from "@/components/portfolio/allocation-card";
import { AssetTable } from "@/components/portfolio/asset-table";
import { PortfolioSummary } from "@/components/portfolio/portfolio-summary";
import { usePortfolioView } from "@/components/portfolio/use-portfolio-view";
import type { RouteActivity } from "@/lib/portfolio-data";
import { cn } from "@/lib/utils";

const statusStyles: Record<RouteActivity["status"], string> = {
  Completed: "border-emerald-400/25 bg-emerald-400/10 text-emerald-300",
  Simulated: "border-cyan-400/25 bg-cyan-400/10 text-cyan-300",
  Staged: "border-orange-400/25 bg-orange-400/10 text-orange-300",
};

export function PortfolioWorkspace() {
  const { state, displayAddress, balancesLoading } = usePortfolioView();

  return (
    <div className="relative z-10 min-w-0 overflow-x-hidden text-white">
      <section className="mx-auto max-w-7xl px-5 py-8 lg:px-8">
        <header className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="min-w-0">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-emerald-300">
              <Sparkles size={14} />
              Base holdings
            </div>

            <h1 className="text-4xl font-black tracking-[-0.05em] md:text-6xl">
              Portfolio{" "}
              <span className="bg-gradient-to-r from-emerald-300 via-cyan-300 to-orange-300 bg-clip-text text-transparent">
                Overview
              </span>
            </h1>

            <p className="mt-4 max-w-2xl text-slate-400">
              Track wallet balances, allocation, and AeroRoute AI route
              opportunities across Aerodrome on Base.
            </p>
          </div>

          <WalletStatusButtons variant="hero" />
        </header>

        <div className="space-y-6">
          <PortfolioSummary
            state={state}
            displayAddress={displayAddress}
            balancesLoading={balancesLoading}
          />

          <div>
            <h2 className="mb-4 text-lg font-black text-white">Assets</h2>
            <AssetTable assets={state.assets} />
          </div>

          <div className="grid min-w-0 gap-6 xl:grid-cols-[1fr_360px]">
            <div className="min-w-0 space-y-6">
              <AllocationCard assets={state.assets} />

              <div className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-5 backdrop-blur-xl sm:p-6">
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-300">
                    <History size={22} />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-300">
                      Routing
                    </p>
                    <h2 className="text-xl font-black text-white">
                      Recent route activity
                    </h2>
                  </div>
                </div>

                <div className="space-y-3">
                  {state.activity.map((item) => (
                    <div
                      key={`${item.pair}-${item.time}`}
                      className="flex flex-col gap-2 rounded-2xl border border-white/10 bg-black/20 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div className="min-w-0">
                        <p className="font-bold text-white">{item.pair}</p>
                        <p className="mt-1 text-sm text-slate-500">
                          {item.action}
                        </p>
                      </div>
                      <div className="flex shrink-0 flex-wrap items-center gap-2">
                        <span
                          className={cn(
                            "rounded-full border px-3 py-1 text-xs font-bold",
                            statusStyles[item.status],
                          )}
                        >
                          {item.status}
                        </span>
                        <span className="text-xs text-slate-500">
                          {item.time}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <AiPortfolioInsights />
          </div>
        </div>
      </section>
    </div>
  );
}
