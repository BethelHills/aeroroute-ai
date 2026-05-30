"use client";

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  Copy,
  ExternalLink,
  Filter,
  Flame,
  Gauge,
  History,
  Info,
  Network,
  Route,
  Search,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Timer,
  Wallet,
  XCircle,
  Zap,
} from "lucide-react";

const stats = [
  { label: "Routes Analyzed", value: "248", change: "+18.4%", icon: Route },
  { label: "Completed Swaps", value: "89", change: "+9.8%", icon: CheckCircle2 },
  { label: "Gas Saved", value: "$428.16", change: "+12.1%", icon: Flame },
  { label: "Avg. Score", value: "94.2", change: "+3.6%", icon: Gauge },
];

const history = [
  {
    id: "ar-001",
    pair: "ETH → USDC",
    route: "Aerodrome V2 Direct",
    output: "3,176.82 USDC",
    amount: "1.00 ETH",
    impact: "0.18%",
    gas: "$0.48",
    score: 98,
    status: "confirmed",
    hash: "0x8f21...a3e9",
    time: "2 mins ago",
    savings: "+22.15 USDC",
  },
  {
    id: "ar-002",
    pair: "USDC → AERO",
    route: "Aerodrome CL Split",
    output: "1,249.31 AERO",
    amount: "500 USDC",
    impact: "0.24%",
    gas: "$0.31",
    score: 94,
    status: "simulated",
    hash: "simulation-only",
    time: "18 mins ago",
    savings: "+8.42 AERO",
  },
  {
    id: "ar-003",
    pair: "ETH → DAI",
    route: "Stable Multi-hop",
    output: "3,151.08 DAI",
    amount: "1.00 ETH",
    impact: "0.31%",
    gas: "$0.55",
    score: 90,
    status: "staged",
    hash: "pending-wallet",
    time: "42 mins ago",
    savings: "+12.04 DAI",
  },
  {
    id: "ar-004",
    pair: "AERO → USDC",
    route: "Aerodrome V2 Direct",
    output: "843.12 USDC",
    amount: "900 AERO",
    impact: "0.27%",
    gas: "$0.34",
    score: 92,
    status: "failed",
    hash: "0x91c4...82fa",
    time: "1 hr ago",
    savings: "Reverted",
  },
  {
    id: "ar-005",
    pair: "USDC → ETH",
    route: "Aerodrome V2 Direct",
    output: "0.157 ETH",
    amount: "500 USDC",
    impact: "0.21%",
    gas: "$0.41",
    score: 96,
    status: "confirmed",
    hash: "0x42ab...771e",
    time: "3 hrs ago",
    savings: "+0.002 ETH",
  },
];

function statusStyles(status: string) {
  switch (status) {
    case "confirmed":
      return "border-emerald-400/30 bg-emerald-400/10 text-emerald-300";
    case "simulated":
      return "border-cyan-400/30 bg-cyan-400/10 text-cyan-300";
    case "staged":
      return "border-orange-400/30 bg-orange-400/10 text-orange-300";
    case "failed":
      return "border-red-400/30 bg-red-400/10 text-red-300";
    default:
      return "border-white/10 bg-white/5 text-slate-300";
  }
}

function statusIcon(status: string) {
  if (status === "confirmed") return CheckCircle2;
  if (status === "failed") return XCircle;
  if (status === "simulated") return ShieldCheck;
  return Clock3;
}

function StatCard({ stat }: { stat: (typeof stats)[number] }) {
  const Icon = stat.icon;
  return (
    <motion.div whileHover={{ y: -4 }} className="rounded-3xl border border-white/10 bg-white/[0.035] p-5 backdrop-blur-xl">
      <div className="flex items-center justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-emerald-400/25 bg-emerald-400/10 text-emerald-300">
          <Icon size={22} />
        </div>
        <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs text-emerald-300">{stat.change}</span>
      </div>
      <p className="mt-5 text-sm text-slate-500">{stat.label}</p>
      <p className="mt-2 text-3xl font-black tracking-tight text-white">{stat.value}</p>
    </motion.div>
  );
}

function HistoryCard({ item }: { item: (typeof history)[number] }) {
  const Icon = statusIcon(item.status);
  return (
    <motion.div whileHover={{ y: -3 }} className="rounded-[1.75rem] border border-white/10 bg-white/[0.035] p-5 backdrop-blur-xl transition hover:border-emerald-400/30">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex gap-4">
          <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border ${statusStyles(item.status)}`}>
            <Icon size={22} />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-lg font-black text-white">{item.pair}</h3>
              <span className={`rounded-full border px-3 py-1 text-xs font-bold capitalize ${statusStyles(item.status)}`}>{item.status}</span>
            </div>
            <p className="mt-1 text-sm text-slate-500">{item.route} · {item.time}</p>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              {item.pair.split(" → ").map((token, index, arr) => (
                <React.Fragment key={`${token}-${index}`}>
                  <span className="rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3 py-1 text-xs font-bold text-emerald-100">{token}</span>
                  {index < arr.length - 1 && <ArrowRight size={14} className="text-orange-300" />}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-4 text-sm sm:grid-cols-2 lg:grid-cols-6 lg:text-right">
          <MiniStat label="Amount" value={item.amount} />
          <MiniStat label="Output" value={item.output} />
          <MiniStat label="Impact" value={item.impact} accent />
          <MiniStat label="Gas" value={item.gas} />
          <MiniStat label="Score" value={`${item.score}`} large />
          <MiniStat label="Savings" value={item.savings} accent={item.status !== "failed"} danger={item.status === "failed"} />
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-3 border-t border-white/10 pt-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <span className="font-mono">{item.hash}</span>
          <button className="rounded-lg border border-white/10 p-1.5 hover:text-white"><Copy size={14} /></button>
        </div>
        <button className="inline-flex w-fit items-center gap-2 rounded-xl border border-white/10 bg-black/20 px-4 py-2 text-sm font-bold text-slate-300 hover:border-emerald-400/40 hover:text-white">
          View details
          <ExternalLink size={14} />
        </button>
      </div>
    </motion.div>
  );
}

function MiniStat({ label, value, accent, danger, large }: { label: string; value: string; accent?: boolean; danger?: boolean; large?: boolean }) {
  return (
    <div>
      <p className="text-xs text-slate-500">{label}</p>
      <p className={`mt-1 font-black ${large ? "text-2xl" : "text-sm"} ${danger ? "text-red-300" : accent ? "text-emerald-300" : "text-white"}`}>{value}</p>
    </div>
  );
}

function FilterBar({ filter, setFilter }: { filter: string; setFilter: (value: string) => void }) {
  const filters = ["all", "confirmed", "simulated", "staged", "failed"];
  return (
    <div className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-4 backdrop-blur-xl">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/20 px-4 py-3 lg:w-[360px]">
          <Search size={18} className="text-slate-500" />
          <span className="text-sm text-slate-500">Search routes, pairs, hashes...</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {filters.map((item) => (
            <button key={item} onClick={() => setFilter(item)} className={`rounded-xl border px-4 py-2 text-sm font-bold capitalize transition ${filter === item ? "border-emerald-400/40 bg-emerald-400/10 text-emerald-300" : "border-white/10 bg-black/20 text-slate-400 hover:text-white"}`}>
              {item}
            </button>
          ))}
        </div>
        <button className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-black/20 px-4 py-2 text-sm font-bold text-slate-300 hover:text-white">
          <Filter size={16} />
          More filters
        </button>
      </div>
    </div>
  );
}

function InsightPanel() {
  return (
    <aside className="space-y-6">
      <div className="rounded-[2rem] border border-orange-400/25 bg-gradient-to-br from-orange-400/10 via-white/[0.03] to-emerald-400/10 p-6 backdrop-blur-xl">
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-400/10 text-orange-300">
            <Zap size={23} />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-300">AI Summary</p>
            <h3 className="text-xl font-black">Route performance</h3>
          </div>
        </div>
        <p className="text-sm leading-7 text-slate-300">
          AeroRoute AI detected that direct Aerodrome V2 routes are outperforming split routes for ETH → USDC by an average of 0.68% this session.
        </p>
        <div className="mt-5 space-y-3">
          {["Best pair: ETH → USDC", "Lowest impact: 0.18%", "Failed route reason: slippage cap", "Recommended: simulate before signing"].map((item) => (
            <div key={item} className="flex items-center gap-3 text-sm text-slate-300">
              <CheckCircle2 size={17} className="text-emerald-300" />
              {item}
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 backdrop-blur-xl">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-300">Efficiency</p>
            <h3 className="text-xl font-black">Savings curve</h3>
          </div>
          <Gauge className="text-emerald-300" />
        </div>
        <svg viewBox="0 0 420 180" className="h-40 w-full">
          <defs>
            <linearGradient id="historyArea" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#00F5A0" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#00F5A0" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M0 140 C45 108 68 155 105 112 C145 65 180 104 215 78 C260 44 290 112 335 62 C365 28 392 45 420 22 L420 180 L0 180 Z" fill="url(#historyArea)" />
          <path d="M0 140 C45 108 68 155 105 112 C145 65 180 104 215 78 C260 44 290 112 335 62 C365 28 392 45 420 22" fill="none" stroke="#00F5A0" strokeWidth="4" />
        </svg>
      </div>

      <div className="rounded-[2rem] border border-red-400/25 bg-red-400/5 p-6 backdrop-blur-xl">
        <div className="mb-4 flex items-center gap-3 text-red-300">
          <ShieldAlert size={22} />
          <h3 className="font-black">Failed route note</h3>
        </div>
        <p className="text-sm leading-7 text-slate-400">
          The failed AERO → USDC route reverted because expected output moved below your slippage limit before confirmation.
        </p>
      </div>
    </aside>
  );
}

export default function AeroRouteHistoryPreview() {
  const [filter, setFilter] = useState("all");
  const filtered = useMemo(() => filter === "all" ? history : history.filter((item) => item.status === filter), [filter]);

  return (
    <main className="min-h-screen overflow-hidden bg-[#03070b] text-white">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top_left,rgba(0,245,160,0.15),transparent_32%),radial-gradient(circle_at_top_right,rgba(255,122,24,0.12),transparent_34%),linear-gradient(180deg,#03070b_0%,#061018_55%,#03070b_100%)]" />
      <div className="fixed inset-0 opacity-[0.2] [background-image:linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:72px_72px]" />

      <section className="relative z-10 mx-auto max-w-7xl px-5 py-8 lg:px-8">
        <header className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-emerald-300">
              <Sparkles size={14} /> Route execution records
            </div>
            <h1 className="text-4xl font-black tracking-[-0.05em] md:text-6xl">
              Route <span className="bg-gradient-to-r from-emerald-300 via-cyan-300 to-orange-300 bg-clip-text text-transparent">History</span>
            </h1>
            <p className="mt-4 max-w-2xl text-slate-400">
              Review simulated, staged, completed, and failed Aerodrome route actions with AI performance insights.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.035] px-5 py-3 text-sm font-bold text-slate-200 backdrop-blur-xl">
              <Wallet size={17} /> 0x8f...3a29
            </button>
            <button className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-400 to-cyan-400 px-5 py-3 text-sm font-black text-[#041014]">
              <Network size={17} /> Base
            </button>
          </div>
        </header>

        <div className="mb-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <StatCard key={stat.label} stat={stat} />
          ))}
        </div>

        <FilterBar filter={filter} setFilter={setFilter} />

        <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_360px]">
          <div className="space-y-4">
            {filtered.map((item) => (
              <HistoryCard key={item.id} item={item} />
            ))}
          </div>
          <InsightPanel />
        </div>

        <div className="mt-6 grid gap-4 rounded-[2rem] border border-white/10 bg-white/[0.035] p-5 backdrop-blur-xl md:grid-cols-4">
          {[
            [History, "Full Timeline", "Every route action in one place."],
            [Timer, "Execution Timing", "Track speed and confirmation."],
            [Info, "Reasoning Notes", "Understand route decisions."],
            [ShieldCheck, "Safety Audit", "Review failures before retrying."],
          ].map(([Icon, title, text]) => {
            const SafeIcon = Icon as typeof History;
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
