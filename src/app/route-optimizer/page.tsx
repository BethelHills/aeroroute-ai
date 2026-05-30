"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Clock3,
  Cpu,
  Flame,
  Gauge,
  Lock,
  Network,
  RefreshCcw,
  Route,
  ShieldCheck,
  Sparkles,
  Wallet,
  Zap,
} from "lucide-react";

const tokens = [
  { symbol: "ETH", name: "Ethereum", balance: "4.2800", color: "from-blue-500 to-violet-500" },
  { symbol: "USDC", name: "USD Coin", balance: "1,240.00", color: "from-cyan-500 to-blue-500" },
  { symbol: "AERO", name: "Aerodrome", balance: "2,918.44", color: "from-red-500 to-blue-500" },
  { symbol: "DAI", name: "Dai Stablecoin", balance: "845.30", color: "from-yellow-400 to-orange-500" },
];

const routes = [
  {
    name: "Aerodrome V2 Direct",
    path: ["ETH", "USDC"],
    output: "3,176.82 USDC",
    outputValue: 3176.82,
    gas: "$0.48",
    gasEth: "0.00016 ETH",
    impact: "0.18%",
    slippage: "0.32%",
    score: 98,
    savings: "+22.15 USDC",
    risk: "Low",
    badge: "Best",
  },
  {
    name: "Aerodrome CL Split",
    path: ["ETH", "WETH", "USDC"],
    output: "3,166.24 USDC",
    outputValue: 3166.24,
    gas: "$0.52",
    gasEth: "0.00017 ETH",
    impact: "0.42%",
    slippage: "0.48%",
    score: 91,
    savings: "+11.57 USDC",
    risk: "Medium",
    badge: "Balanced",
  },
  {
    name: "Stable Multi-hop",
    path: ["ETH", "USDbC", "USDC"],
    output: "3,154.67 USDC",
    outputValue: 3154.67,
    gas: "$0.61",
    gasEth: "0.00020 ETH",
    impact: "0.78%",
    slippage: "0.84%",
    score: 86,
    savings: "Baseline",
    risk: "Medium",
    badge: "Fallback",
  },
];

function TokenSelect({ label, token, onClick }: { label: string; token: (typeof tokens)[number]; onClick?: () => void }) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-sm text-slate-500">
        <span>{label}</span>
        <span>Balance: {token.balance}</span>
      </div>
      <button onClick={onClick} className="flex w-full items-center justify-between rounded-2xl border border-white/10 bg-white/[0.035] p-4 text-left backdrop-blur-xl transition hover:border-emerald-400/40">
        <div className="flex items-center gap-3">
          <span className={`flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br ${token.color} text-sm font-black text-white shadow-[0_0_24px_rgba(0,245,160,0.18)]`}>
            {token.symbol.slice(0, 1)}
          </span>
          <div>
            <p className="text-lg font-black text-white">{token.symbol}</p>
            <p className="text-xs text-slate-500">{token.name}</p>
          </div>
        </div>
        <ChevronDown size={18} className="text-slate-500" />
      </button>
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

function SwapForm() {
  const [amount, setAmount] = useState("1.0000");
  const from = tokens[0];
  const to = tokens[1];

  return (
    <div className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 shadow-[0_0_50px_rgba(0,245,160,0.08)] backdrop-blur-xl">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-300">Swap Intent</p>
          <h2 className="mt-2 text-2xl font-black">Enter Route</h2>
        </div>
        <button className="rounded-2xl border border-white/10 bg-black/20 p-3 text-slate-400 transition hover:text-white">
          <RefreshCcw size={18} />
        </button>
      </div>

      <div className="space-y-5">
        <TokenSelect label="From" token={from} />
        <div className="flex justify-center">
          <button className="rounded-2xl border border-emerald-400/25 bg-emerald-400/10 p-3 text-emerald-300 shadow-[0_0_25px_rgba(0,245,160,0.12)]">
            <ArrowDown size={20} />
          </button>
        </div>
        <TokenSelect label="To" token={to} />

        <div>
          <label className="mb-2 block text-sm text-slate-500">Amount</label>
          <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
            <input value={amount} onChange={(e) => setAmount(e.target.value)} className="w-full bg-transparent text-4xl font-black text-white outline-none" />
            <div className="mt-3 flex items-center justify-between text-sm text-slate-500">
              <span>≈ $3,182.45</span>
              <div className="flex gap-2">
                {["25%", "50%", "MAX"].map((item) => (
                  <button key={item} className="rounded-full border border-white/10 px-3 py-1 text-xs hover:border-emerald-400/40">{item}</button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <button className="group flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-emerald-400 to-cyan-400 px-6 py-4 font-black text-[#041014] shadow-[0_0_40px_rgba(0,245,160,0.25)] transition hover:scale-[1.01]">
          Analyze Best Route
          <Zap size={18} className="transition group-hover:rotate-12" />
        </button>
      </div>
    </div>
  );
}

function BestRoute() {
  const best = routes[0];
  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-emerald-400/25 bg-gradient-to-br from-emerald-400/10 via-white/[0.035] to-cyan-500/10 p-6 backdrop-blur-xl">
      <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-emerald-400/20 blur-3xl" />
      <div className="relative flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-bold text-emerald-300">
            <CheckCircle2 size={14} />
            Best Route Found
          </div>
          <h2 className="text-3xl font-black tracking-tight text-white">{best.name}</h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-400">
            AI selected this route because it has the strongest output, lowest price impact, and the deepest liquidity path across Aerodrome on Base.
          </p>
          <div className="mt-5"><RoutePath path={best.path} /></div>
        </div>

        <div className="flex h-40 w-40 shrink-0 items-center justify-center rounded-full bg-[conic-gradient(from_180deg,#00F5A0_0deg,#22d3ee_260deg,rgba(255,255,255,0.08)_260deg)] p-3 shadow-[0_0_60px_rgba(0,245,160,0.25)]">
          <div className="flex h-full w-full flex-col items-center justify-center rounded-full bg-[#061018]">
            <p className="text-xs text-slate-500">Score</p>
            <p className="text-5xl font-black text-emerald-300">98</p>
            <p className="text-xs text-emerald-300">Excellent</p>
          </div>
        </div>
      </div>

      <div className="relative mt-6 grid gap-4 md:grid-cols-4">
        {[
          ["Expected Output", best.output, "+0.92% vs avg"],
          ["Slippage", best.slippage, "Protected"],
          ["Price Impact", best.impact, "Very Low"],
          ["Gas Estimate", best.gas, best.gasEth],
        ].map(([label, value, sub]) => (
          <div key={label} className="rounded-2xl border border-white/10 bg-black/25 p-4">
            <p className="text-xs text-slate-500">{label}</p>
            <p className="mt-2 text-lg font-black text-white">{value}</p>
            <p className="mt-1 text-xs text-emerald-300">{sub}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function Stat({ label, value, accent, large }: { label: string; value: string; accent?: boolean; large?: boolean }) {
  return (
    <div>
      <p className="text-xs text-slate-500">{label}</p>
      <p className={`mt-1 font-black ${large ? "text-2xl" : "text-sm"} ${accent ? "text-emerald-300" : "text-white"}`}>{value}</p>
    </div>
  );
}

function RouteComparison() {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 backdrop-blur-xl">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-cyan-300">Route Comparison</p>
          <h2 className="mt-2 text-2xl font-black">3 Routes Analyzed</h2>
        </div>
        <span className="w-fit rounded-full bg-emerald-400/10 px-3 py-1 text-xs text-emerald-300">Base · Aerodrome</span>
      </div>

      <div className="space-y-4">
        {routes.map((route, index) => (
          <motion.div key={route.name} whileHover={{ y: -2 }} className="rounded-2xl border border-white/10 bg-black/20 p-4 transition hover:border-emerald-400/30">
            <div className="grid gap-4 xl:grid-cols-[1.2fr_1fr_0.7fr_0.7fr_0.5fr_0.5fr] xl:items-center">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-xs font-black">{index + 1}</span>
                  <h3 className="font-black text-white">{route.name}</h3>
                  <span className={`rounded-full px-2 py-1 text-[10px] font-bold ${route.badge === "Best" ? "bg-emerald-400/10 text-emerald-300" : "bg-white/10 text-slate-300"}`}>{route.badge}</span>
                </div>
                <div className="mt-3"><RoutePath path={route.path} /></div>
              </div>
              <Stat label="Output" value={route.output} />
              <Stat label="Gas" value={route.gas} />
              <Stat label="Impact" value={route.impact} accent />
              <Stat label="Risk" value={route.risk} />
              <Stat label="Score" value={`${route.score}`} large />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function AiSummary() {
  return (
    <div className="rounded-[2rem] border border-orange-400/25 bg-gradient-to-br from-orange-400/10 via-white/[0.03] to-emerald-400/10 p-6 backdrop-blur-xl">
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-400/15 text-orange-300">
          <Cpu size={23} />
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-300">AI Route Summary</p>
          <h2 className="text-xl font-black">Recommended execution path</h2>
        </div>
      </div>
      <p className="mt-5 text-sm leading-7 text-slate-300">
        Use Aerodrome V2 Direct. It provides the highest expected output, lowest route complexity, and lowest price impact. Multi-hop routes are available, but they add gas cost without improving output.
      </p>
      <div className="mt-5 space-y-3">
        {["Best output across available routes", "Lowest price impact", "No risky multi-hop exposure", "Simulation recommended before signing"].map((item) => (
          <div key={item} className="flex items-center gap-3 text-sm text-slate-300">
            <CheckCircle2 size={17} className="text-emerald-300" /> {item}
          </div>
        ))}
      </div>
    </div>
  );
}

function TransactionPreview() {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 backdrop-blur-xl">
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-300"><Lock size={22} /></div>
        <div><p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-300">Transaction Preview</p><h2 className="text-xl font-black">Ready to simulate</h2></div>
      </div>
      <div className="space-y-3 text-sm">
        {[
          ["Protocol", "Aerodrome"],
          ["Network", "Base 8453"],
          ["Action", "Swap ETH to USDC"],
          ["Minimum Received", "3,166.65 USDC"],
          ["Deadline", "20 minutes"],
        ].map(([label, value]) => (
          <div key={label} className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
            <span className="text-slate-500">{label}</span><span className="font-bold text-white">{value}</span>
          </div>
        ))}
      </div>
      <button className="mt-5 flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-orange-400 to-amber-300 px-6 py-4 font-black text-[#130900]">
        Prepare Swap with Aomi <ArrowRight size={18} />
      </button>
      <p className="mt-3 text-center text-xs text-slate-500">No transaction is signed until you approve it in your wallet.</p>
    </div>
  );
}

function MiniChart() {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 backdrop-blur-xl">
      <div className="mb-5 flex items-center justify-between">
        <div><p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-300">Liquidity Curve</p><h2 className="text-xl font-black">Pool depth</h2></div>
        <Gauge className="text-emerald-300" />
      </div>
      <svg viewBox="0 0 520 190" className="h-44 w-full">
        <defs><linearGradient id="routeOptArea" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#00F5A0" stopOpacity="0.45" /><stop offset="100%" stopColor="#00F5A0" stopOpacity="0" /></linearGradient></defs>
        <path d="M0 145 C45 115 70 160 115 102 C160 50 190 118 245 88 C300 56 330 135 380 92 C430 48 470 62 520 28 L520 190 L0 190 Z" fill="url(#routeOptArea)" />
        <path d="M0 145 C45 115 70 160 115 102 C160 50 190 118 245 88 C300 56 330 135 380 92 C430 48 470 62 520 28" fill="none" stroke="#00F5A0" strokeWidth="4" />
      </svg>
    </div>
  );
}

export default function AeroRouteOptimizerPreview() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#03070b] text-white">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top_left,rgba(0,245,160,0.15),transparent_32%),radial-gradient(circle_at_top_right,rgba(255,122,24,0.12),transparent_34%),linear-gradient(180deg,#03070b_0%,#061018_55%,#03070b_100%)]" />
      <div className="fixed inset-0 opacity-[0.2] [background-image:linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:72px_72px]" />

      <section className="relative z-10 mx-auto max-w-7xl px-5 py-8 lg:px-8">
        <header className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-emerald-300">
              <Sparkles size={14} /> Aerodrome on Base
            </div>
            <h1 className="text-4xl font-black tracking-[-0.05em] md:text-6xl">
              Route <span className="bg-gradient-to-r from-emerald-300 via-cyan-300 to-orange-300 bg-clip-text text-transparent">Optimizer</span>
            </h1>
            <p className="mt-4 max-w-2xl text-slate-400">
              Enter your swap intent and let AeroRoute AI compare liquidity, slippage, gas, and execution risk before you trade.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.035] px-5 py-3 text-sm font-bold text-slate-200 backdrop-blur-xl">
              <Wallet size={17} /> Connect Wallet
            </button>
            <button className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-400 to-cyan-400 px-5 py-3 text-sm font-black text-[#041014]">
              <Network size={17} /> Base
            </button>
          </div>
        </header>

        <div className="grid gap-6 xl:grid-cols-[420px_1fr]">
          <div className="space-y-6"><SwapForm /><AiSummary /><TransactionPreview /></div>
          <div className="space-y-6"><BestRoute /><RouteComparison /><MiniChart /></div>
        </div>

        <div className="mt-6 grid gap-4 rounded-[2rem] border border-white/10 bg-white/[0.035] p-5 backdrop-blur-xl md:grid-cols-4">
          {[
            [ShieldCheck, "Protected", "Simulation-first route planning."],
            [Clock3, "Fast", "Route analysis in seconds."],
            [Flame, "Gas Aware", "Gas estimate included."],
            [Route, "Optimized", "Highest output selected."],
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
      </section>
    </main>
  );
}
