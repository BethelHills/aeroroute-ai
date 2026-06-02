"use client";

import Link from "next/link";
import {
  ArrowRight,
  Bot,
  LineChart,
  Route,
  Sparkles,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { formatAddress } from "@aomi-labs/react";
import { WalletStatusButtons } from "@/components/layout/wallet-status-buttons";
import { PortfolioAllocationChart } from "@/components/portfolio/portfolio-allocation-chart";
import { useAomiAuthAdapter } from "@/lib/aomi-auth-adapter";
import {
  DEMO_PORTFOLIO,
  getConnectedPortfolioSnapshot,
  type PortfolioActivity,
  type PortfolioInsight,
} from "@/lib/portfolio-data";
import { cn } from "@/lib/utils";

const activityTone: Record<PortfolioActivity["tone"], string> = {
  emerald: "border-emerald-400/25 bg-emerald-400/10 text-emerald-300",
  cyan: "border-cyan-400/25 bg-cyan-400/10 text-cyan-300",
  orange: "border-orange-400/25 bg-orange-400/10 text-orange-300",
};

function InsightList({
  title,
  items,
}: {
  title: string;
  items: PortfolioInsight[];
}) {
  return (
    <div>
      <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
        {title}
      </p>
      <div className="space-y-2">
        {items.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className="block rounded-2xl border border-white/10 bg-black/20 px-4 py-3 transition hover:border-emerald-400/30 hover:bg-white/[0.04]"
          >
            <p className="font-bold text-white">{item.title}</p>
            <p className="mt-1 text-sm text-slate-500">{item.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export function PortfolioWorkspace() {
  const { identity } = useAomiAuthAdapter();
  const isConnected = identity.isConnected && Boolean(identity.address);
  const portfolio = isConnected
    ? getConnectedPortfolioSnapshot(identity.address)
    : DEMO_PORTFOLIO;
  const displayAddress = isConnected
    ? formatAddress(identity.address) ?? identity.address
    : portfolio.address;

  return (
    <div className="relative z-10 min-w-0 overflow-hidden text-white">
      <section className="mx-auto max-w-7xl px-5 py-8 lg:px-8">
        <header className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
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
              Track balances, allocation, and AeroRoute AI insights across
              Aerodrome routes on Base.
            </p>
          </div>

          <WalletStatusButtons variant="hero" />
        </header>

        <div
          className={cn(
            "mb-6 flex flex-col gap-3 rounded-[2rem] border px-5 py-4 backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between",
            isConnected
              ? "border-emerald-400/25 bg-emerald-400/10"
              : "border-cyan-400/25 bg-cyan-400/10",
          )}
        >
          <div className="flex items-center gap-3">
            <div
              className={cn(
                "flex h-11 w-11 items-center justify-center rounded-2xl",
                isConnected
                  ? "bg-emerald-400/15 text-emerald-300"
                  : "bg-cyan-400/15 text-cyan-300",
              )}
            >
              <Wallet size={20} />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
                {portfolio.modeLabel}
              </p>
              <p className="font-black text-white">{portfolio.addressLabel}</p>
              <p className="mt-1 font-mono text-sm text-slate-400">
                {displayAddress}
              </p>
            </div>
          </div>
          <p className="text-sm text-slate-400">
            {isConnected
              ? "Balances are mock snapshots until on-chain indexing ships."
              : "Connect a wallet to personalize this view with your address."}
          </p>
        </div>

        <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-5 backdrop-blur-xl sm:col-span-2 xl:col-span-1">
            <p className="text-sm text-slate-500">Total Value</p>
            <p className="mt-2 text-3xl font-black text-white">
              {portfolio.totalValue}
            </p>
            <p className="mt-2 flex items-center gap-1 text-sm font-bold text-emerald-300">
              <TrendingUp size={14} />
              {portfolio.totalChange}
            </p>
          </div>

          {portfolio.balances.map((balance) => (
            <div
              key={balance.symbol}
              className="rounded-3xl border border-white/10 bg-white/[0.035] p-5 backdrop-blur-xl"
            >
              <p className="text-sm text-slate-500">{balance.label}</p>
              <p className="mt-2 text-2xl font-black text-white">
                {balance.amount}
              </p>
              <p className="mt-1 text-sm text-slate-400">{balance.usd}</p>
              <p className="mt-2 text-xs font-bold text-emerald-300">
                {balance.change}
              </p>
            </div>
          ))}
        </div>

        <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
          <div className="min-w-0 space-y-6">
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-5 backdrop-blur-xl sm:p-6">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-400/10 text-emerald-300">
                  <LineChart size={22} />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-300">
                    Allocation
                  </p>
                  <h2 className="text-xl font-black text-white">
                    Asset Allocation
                  </h2>
                </div>
              </div>
              <PortfolioAllocationChart data={portfolio.allocation} />
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-5 backdrop-blur-xl sm:p-6">
              <h2 className="text-xl font-black text-white">Recent Activity</h2>
              <div className="mt-5 space-y-3">
                {portfolio.activity.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col gap-2 rounded-2xl border border-white/10 bg-black/20 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div>
                      <p className="font-bold text-white">{item.title}</p>
                      <p className="mt-1 text-sm text-slate-500">
                        {item.detail}
                      </p>
                    </div>
                    <span
                      className={cn(
                        "w-fit shrink-0 rounded-full border px-3 py-1 text-xs font-bold",
                        activityTone[item.tone],
                      )}
                    >
                      {item.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <aside className="min-w-0 space-y-6">
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-5 backdrop-blur-xl sm:p-6">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-400/10 text-orange-300">
                  <Sparkles size={22} />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-300">
                    AeroRoute AI
                  </p>
                  <h2 className="text-xl font-black text-white">AI Insights</h2>
                </div>
              </div>

              <div className="space-y-6">
                <InsightList
                  title="Best route opportunities"
                  items={portfolio.routeOpportunities}
                />
                <InsightList
                  title="Suggested swaps"
                  items={portfolio.suggestedSwaps}
                />
                <InsightList
                  title="Liquidity alerts"
                  items={portfolio.liquidityAlerts}
                />
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-5 backdrop-blur-xl sm:p-6">
              <h2 className="text-xl font-black text-white">Actions</h2>
              <div className="mt-5 grid gap-3">
                <Link
                  href="/route-optimizer"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-400 to-cyan-400 px-4 py-3 text-sm font-black text-[#041014] transition hover:opacity-95"
                >
                  <Route size={16} />
                  Open Route Optimizer
                  <ArrowRight size={16} />
                </Link>
                <Link
                  href="/agent-chat?prompt=Review%20my%20portfolio%20on%20Base%20and%20suggest%20next%20swaps"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-emerald-400/25 bg-emerald-400/10 px-4 py-3 text-sm font-bold text-emerald-200 transition hover:bg-emerald-400/15"
                >
                  <Bot size={16} />
                  Ask Agent Chat
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
