"use client";

import React from "react";
import { Logo } from "@/components/landing/logo";
import {
  AppPageHeader,
  AppPageRoot,
  AppPageSection,
  PageTitleBlock,
} from "@/components/layout/page-shell";
import { WalletStatusButtons } from "@/components/layout/wallet-status-buttons";
import { motion } from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  Bell,
  CheckCircle2,
  Cpu,
  Flame,
  Gauge,
  History,
  Info,
  Layers,
  LineChart,
  Lock,
  RefreshCcw,
  Route,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";

const routeOptions = [
  {
    id: "route-1",
    name: "Aerodrome V2 Direct",
    path: ["ETH", "USDC"],
    output: "3,176.82 USDC",
    gas: "$0.48",
    impact: "0.18%",
    score: 98,
    status: "Best",
  },
  {
    id: "route-2",
    name: "Aerodrome CL Split",
    path: ["ETH", "WETH", "USDC"],
    output: "3,166.24 USDC",
    gas: "$0.52",
    impact: "0.42%",
    score: 91,
    status: "Good",
  },
  {
    id: "route-3",
    name: "Multi-hop Stable Path",
    path: ["ETH", "USDbC", "USDC"],
    output: "3,154.67 USDC",
    gas: "$0.61",
    impact: "0.78%",
    score: 86,
    status: "Safe",
  },
];

const recentRoutes = [
  ["ETH → USDC", "3,176.82", "0.18%", "98", "2 mins ago"],
  ["USDC → AERO", "1,249.31", "0.24%", "94", "18 mins ago"],
  ["ETH → DAI", "3,151.08", "0.31%", "90", "42 mins ago"],
  ["AERO → USDC", "843.12", "0.27%", "92", "1 hr ago"],
];

const metrics = [
  { label: "Routes Analyzed", value: "12,482", change: "+18.4%", icon: Route },
  { label: "Gas Saved", value: "$8,942", change: "+11.2%", icon: Flame },
  { label: "Avg. Score", value: "96.8", change: "+4.7%", icon: Gauge },
  { label: "Best Pool Depth", value: "$12.45M", change: "+6.1%", icon: Layers },
];

function TokenButton({ symbol, name, color }: { symbol: string; name: string; color: string }) {
  return (
    <button className="flex w-full items-center justify-between rounded-2xl border border-white/10 bg-white/[0.035] p-4 text-left transition hover:border-emerald-400/40">
      <div className="flex items-center gap-3">
        <span className={`flex h-11 w-11 items-center justify-center rounded-full ${color} text-sm font-black text-white shadow-[0_0_25px_rgba(0,245,160,0.18)]`}>
          {symbol.slice(0, 1)}
        </span>
        <div>
          <p className="font-black text-white">{symbol}</p>
          <p className="text-xs text-slate-500">{name}</p>
        </div>
      </div>
      <span className="text-slate-500">⌄</span>
    </button>
  );
}

function MetricCard({ metric }: { metric: (typeof metrics)[number] }) {
  const Icon = metric.icon;
  return (
    <motion.div whileHover={{ y: -4 }} className="rounded-3xl border border-white/10 bg-white/[0.035] p-5 backdrop-blur-xl">
      <div className="flex items-center justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-emerald-400/25 bg-emerald-400/10 text-emerald-300">
          <Icon size={22} />
        </div>
        <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs text-emerald-300">{metric.change}</span>
      </div>
      <p className="mt-5 text-sm text-slate-500">{metric.label}</p>
      <p className="mt-2 text-3xl font-black tracking-tight text-white">{metric.value}</p>
    </motion.div>
  );
}

function RouteScoreGauge() {
  return (
    <div className="relative mx-auto flex h-36 w-36 items-center justify-center sm:h-44 sm:w-44 md:mx-0 md:h-48 md:w-48">
      <div className="absolute h-full w-full max-h-40 max-w-40 rounded-full bg-[conic-gradient(from_180deg,#00F5A0_0deg,#22d3ee_260deg,rgba(255,255,255,0.08)_260deg)] p-3 shadow-[0_0_55px_rgba(0,245,160,0.25)] sm:max-h-44 sm:max-w-44">
        <div className="flex h-full w-full flex-col items-center justify-center rounded-full bg-[#061018]">
          <p className="text-sm text-slate-500">Route Score</p>
          <p className="text-5xl font-black text-emerald-300">98</p>
          <p className="text-sm text-emerald-300">Excellent</p>
        </div>
      </div>
    </div>
  );
}

function RoutePath({ path }: { path: string[] }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {path.map((token, index) => (
        <React.Fragment key={`${token}-${index}`}>
          <span className="rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3 py-1.5 text-xs font-bold text-emerald-100">{token}</span>
          {index < path.length - 1 && <ArrowRight size={14} className="text-orange-300" />}
        </React.Fragment>
      ))}
    </div>
  );
}

function BestRouteCard() {
  return (
    <div className="rounded-[2rem] border border-emerald-400/25 bg-gradient-to-br from-emerald-400/10 via-white/[0.03] to-cyan-500/10 p-6 shadow-[0_0_50px_rgba(0,245,160,0.12)] backdrop-blur-xl">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-bold text-emerald-300">
            <CheckCircle2 size={14} />
            Best Route Found
          </div>
          <h2 className="text-2xl font-black text-white">Aerodrome V2 Direct</h2>
          <p className="mt-2 max-w-lg text-sm leading-6 text-slate-400">
            AI selected the deepest liquidity path with the lowest price impact and strongest execution score.
          </p>
        </div>
        <RouteScoreGauge />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          ["Expected Output", "3,176.82 USDC", "+0.92% vs avg"],
          ["Price Impact", "0.18%", "Very Low"],
          ["Gas Estimate", "$0.48", "0.00016 ETH"],
          ["Savings", "+22.15 USDC", "Best route edge"],
        ].map(([label, value, sub]) => (
          <div key={label} className="rounded-2xl border border-white/10 bg-black/20 p-4">
            <p className="text-xs text-slate-500">{label}</p>
            <p className="mt-2 text-lg font-black text-white">{value}</p>
            <p className="mt-1 text-xs text-emerald-300">{sub}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function SwapPanel() {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 backdrop-blur-xl">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-300">Route Optimizer</p>
          <h2 className="mt-2 text-2xl font-black">Swap Intent</h2>
        </div>
        <button className="rounded-xl border border-white/10 bg-black/20 p-3 text-slate-400 hover:text-white">
          <RefreshCcw size={18} />
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <div className="mb-2 flex items-center justify-between text-sm text-slate-500">
            <span>From</span>
            <span>Balance: 4.28 ETH</span>
          </div>
          <TokenButton symbol="ETH" name="Ethereum" color="bg-gradient-to-br from-blue-500 to-violet-500" />
        </div>

        <div className="flex justify-center">
          <button className="rounded-2xl border border-emerald-400/25 bg-emerald-400/10 p-3 text-emerald-300">
            <ArrowDown size={20} />
          </button>
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between text-sm text-slate-500">
            <span>To</span>
            <span>Balance: 1,240.00 USDC</span>
          </div>
          <TokenButton symbol="USDC" name="USD Coin" color="bg-gradient-to-br from-cyan-500 to-blue-500" />
        </div>

        <div>
          <label className="mb-2 block text-sm text-slate-500">Amount</label>
          <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
            <input value="1.0000" readOnly className="w-full bg-transparent text-3xl font-black text-white outline-none" />
            <p className="mt-1 text-sm text-slate-500">≈ $3,182.45</p>
          </div>
        </div>

        <button className="group mt-4 flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-emerald-400 to-cyan-400 px-6 py-4 font-black text-[#041014] shadow-[0_0_35px_rgba(0,245,160,0.25)] transition hover:scale-[1.01]">
          Analyze Best Route
          <Zap size={18} className="transition group-hover:rotate-12" />
        </button>
      </div>
    </div>
  );
}

function RouteComparison() {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 backdrop-blur-xl">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-cyan-300">Route Comparison</p>
          <h2 className="mt-2 text-2xl font-black">Available Paths</h2>
        </div>
        <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs text-emerald-300">3 routes found</span>
      </div>

      <div className="space-y-4">
        {routeOptions.map((route) => (
          <motion.div key={route.id} whileHover={{ y: -2 }} className="rounded-2xl border border-white/10 bg-black/20 p-4 transition hover:border-emerald-400/30">
            <div className="grid grid-cols-1 gap-4">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-black text-white">{route.name}</h3>
                  <span className={`rounded-full px-2 py-1 text-[10px] font-bold ${route.status === "Best" ? "bg-emerald-400/10 text-emerald-300" : "bg-white/10 text-slate-300"}`}>{route.status}</span>
                </div>
                <div className="mt-3"><RoutePath path={route.path} /></div>
              </div>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                <div>
                  <p className="text-xs text-slate-500">Output</p>
                  <p className="mt-1 font-black text-white">{route.output}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Gas</p>
                  <p className="mt-1 font-bold text-slate-200">{route.gas}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Impact</p>
                  <p className="mt-1 font-bold text-emerald-300">{route.impact}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Score</p>
                  <p className="mt-1 text-xl font-black text-white">{route.score}</p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function AnalyticsPanel() {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 backdrop-blur-xl">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-orange-300">Live Analytics</p>
          <h2 className="mt-2 text-2xl font-black">Liquidity Depth</h2>
        </div>
        <LineChart className="text-orange-300" />
      </div>
      <svg viewBox="0 0 700 260" className="h-64 w-full">
        <defs>
          <linearGradient id="depthArea" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#00F5A0" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#00F5A0" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d="M0 190 C60 155 90 210 150 140 C210 70 250 130 310 105 C380 70 420 180 500 105 C585 25 620 75 700 42 L700 260 L0 260 Z" fill="url(#depthArea)" />
        <path d="M0 190 C60 155 90 210 150 140 C210 70 250 130 310 105 C380 70 420 180 500 105 C585 25 620 75 700 42" fill="none" stroke="#00F5A0" strokeWidth="5" />
      </svg>
      <div className="mt-4 grid gap-3 md:grid-cols-3">
        {[
          ["Pool Depth", "$12.45M"],
          ["Execution Time", "2.1s"],
          ["Route Confidence", "98.6%"],
        ].map(([label, value]) => (
          <div key={label} className="rounded-2xl border border-white/10 bg-black/20 p-4">
            <p className="text-xs text-slate-500">{label}</p>
            <p className="mt-2 text-xl font-black text-white">{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function AiRecommendation() {
  return (
    <div className="rounded-[2rem] border border-orange-400/25 bg-gradient-to-br from-orange-400/10 via-white/[0.03] to-emerald-400/10 p-6 backdrop-blur-xl">
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-400/15 text-orange-300">
          <Cpu size={23} />
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-300">AI Recommendation</p>
          <h2 className="text-xl font-black">Use Aerodrome V2 Direct</h2>
        </div>
      </div>
      <p className="mt-5 text-sm leading-7 text-slate-300">
        This route has the strongest execution quality because it uses the deepest liquidity pool, keeps price impact below 0.2%, and saves approximately 22.15 USDC against the average route.
      </p>
      <div className="mt-5 space-y-3">
        {[
          "Lowest slippage detected",
          "Best estimated output",
          "No risky multi-hop exposure",
        ].map((item) => (
          <div key={item} className="flex items-center gap-3 text-sm text-slate-300">
            <CheckCircle2 size={17} className="text-emerald-300" />
            {item}
          </div>
        ))}
      </div>
      <button className="mt-6 flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-orange-400 to-amber-300 px-6 py-4 font-black text-[#130900]">
        Prepare Swap Transaction
        <ArrowRight size={18} />
      </button>
    </div>
  );
}

export default function AeroRouteDashboardPreview() {
  return (
    <AppPageRoot>
      <AppPageSection>
        <AppPageHeader>
          <Logo
            priority
            href="/dashboard"
            className="mb-2 h-auto w-52 sm:w-64 md:hidden"
          />
          <PageTitleBlock
            badge={
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-emerald-300">
                <Sparkles size={14} />
                Aerodrome Route Engine
              </div>
            }
            title={
              <>
                Route Optimizer{" "}
                <span className="bg-gradient-to-r from-emerald-300 via-cyan-300 to-orange-300 bg-clip-text text-transparent">
                  Dashboard
                </span>
              </>
            }
            titleActions={<WalletStatusButtons className="md:hidden" />}
            description="Compare routes, estimate output, detect slippage, and prepare smarter Aerodrome swaps on Base with AI assistance."
          />
        </AppPageHeader>

        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {metrics.map((metric) => <MetricCard key={metric.label} metric={metric} />)}
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-[minmax(0,390px)_1fr]">
          <div className="min-w-0 space-y-6">
            <SwapPanel />
            <AiRecommendation />
          </div>
          <div className="min-w-0 space-y-6">
            <BestRouteCard />
            <RouteComparison />
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-[1fr_minmax(0,420px)]">
          <AnalyticsPanel />
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 backdrop-blur-xl">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-cyan-300">Recent Routes</p>
                <h2 className="mt-2 text-2xl font-black">Execution History</h2>
              </div>
              <History className="text-cyan-300" />
            </div>
            <div className="space-y-3">
              {recentRoutes.map(([pair, output, impact, score, time]) => (
                <div key={`${pair}-${time}`} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-black text-white">{pair}</p>
                      <p className="mt-1 text-xs text-slate-500">{time}</p>
                    </div>
                    <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs text-emerald-300">{score}</span>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-xs text-slate-500">Output</p>
                      <p className="font-bold text-white">{output}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Impact</p>
                      <p className="font-bold text-emerald-300">{impact}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 rounded-[2rem] border border-white/10 bg-white/[0.035] p-5 backdrop-blur-xl sm:grid-cols-2 xl:grid-cols-4">
          {[
            [ShieldCheck, "Non-Custodial", "You approve every transaction."],
            [Lock, "Simulation First", "Review before signing."],
            [Info, "Aomi Assisted", "Natural language route logic."],
            [Bell, "Route Alerts", "Track better opportunities."],
          ].map(([Icon, title, text]) => {
            const SafeIcon = Icon as typeof ShieldCheck;
            return (
              <div key={title as string} className="rounded-2xl border border-white/10 bg-black/20 p-5">
                <SafeIcon className="text-emerald-300" size={25} />
                <h3 className="mt-3 font-black">{title as string}</h3>
                <p className="mt-2 text-sm text-slate-400">{text as string}</p>
              </div>
            );
          })}
        </div>
      </AppPageSection>
    </AppPageRoot>
  );
}
