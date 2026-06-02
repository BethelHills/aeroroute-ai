"use client";

import React, { useCallback, useRef, useState } from "react";
import Link from "next/link";
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
  ChevronDown,
  History,
  Info,
  Layers,
  LineChart,
  Loader2,
  Lock,
  RefreshCcw,
  Route,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";
import { SwapTokenIcon } from "@/components/icons/swap-token-icon";
import {
  nextSwapTokenIndex,
  SWAP_TOKENS,
  type SwapToken,
} from "@/lib/swap-tokens";

const tokens = SWAP_TOKENS;

const ctaLinkClass =
  "inline-flex w-full cursor-pointer items-center justify-center gap-3 rounded-2xl px-6 py-4 font-black transition hover:scale-[1.01] hover:opacity-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400/50";

const ctaButtonClass =
  "inline-flex w-full cursor-pointer items-center justify-center gap-3 rounded-2xl px-6 py-4 font-black transition hover:scale-[1.01] hover:opacity-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400/50 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100";

function buildPrepareSwapHref(from: string, to: string, amount: string) {
  const prompt = `Prepare a wallet-safe swap plan for swapping ${amount} ${from} to ${to} on Base using the best available route. Include Aerodrome if available.`;
  return `/agent-chat?prompt=${encodeURIComponent(prompt)}`;
}

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

const cardClass =
  "w-full min-w-0 rounded-[2rem] border border-white/10 bg-white/[0.035] p-4 backdrop-blur-xl sm:p-6";

function TokenButton({
  token,
  label,
  onSelect,
}: {
  token: SwapToken;
  label: string;
  onSelect: () => void;
}) {
  return (
    <div className="w-full min-w-0">
      <div className="mb-2 flex flex-wrap items-center justify-between gap-2 text-sm text-slate-500">
        <span>{label}</span>
        <span>Balance: {token.balance}</span>
      </div>
      <button
        type="button"
        onClick={onSelect}
        className="flex w-full min-w-0 cursor-pointer items-center justify-between rounded-2xl border border-white/10 bg-white/[0.035] p-4 text-left transition hover:border-emerald-400/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400/50"
        aria-label={`Change ${label} token, currently ${token.symbol}`}
      >
        <div className="flex min-w-0 items-center gap-3">
          <SwapTokenIcon key={token.symbol} token={token} size="sm" />
          <div className="min-w-0">
            <p className="font-black text-white">{token.symbol}</p>
            <p className="text-xs text-slate-500">{token.name}</p>
          </div>
        </div>
        <ChevronDown size={18} className="shrink-0 text-slate-500" />
      </button>
    </div>
  );
}

function MetricCard({ metric }: { metric: (typeof metrics)[number] }) {
  const Icon = metric.icon;
  return (
    <motion.div whileHover={{ y: -4 }} className="w-full min-w-0 rounded-3xl border border-white/10 bg-white/[0.035] p-5 backdrop-blur-xl">
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

function RouteScoreGauge({ score }: { score: number }) {
  return (
    <div className="relative mx-auto flex h-28 w-28 shrink-0 items-center justify-center md:mx-0 md:h-36 md:w-36 lg:h-44 lg:w-44">
      <div className="flex h-full w-full items-center justify-center rounded-full bg-[conic-gradient(from_180deg,#00F5A0_0deg,#22d3ee_260deg,rgba(255,255,255,0.08)_260deg)] p-2 shadow-[0_0_55px_rgba(0,245,160,0.25)] md:p-3">
        <div className="flex h-full w-full flex-col items-center justify-center rounded-full bg-[#061018]">
          <p className="text-xs text-slate-500 md:text-sm">Route Score</p>
          <p className="text-3xl font-black text-emerald-300 md:text-4xl lg:text-5xl">{score}</p>
          <p className="text-xs text-emerald-300 md:text-sm">Excellent</p>
        </div>
      </div>
    </div>
  );
}

function RoutePath({ path }: { path: string[] }) {
  return (
    <div className="flex min-w-0 flex-wrap items-center gap-2">
      {path.map((token, index) => (
        <React.Fragment key={`${token}-${index}`}>
          <span className="rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3 py-1.5 text-xs font-bold text-emerald-100">{token}</span>
          {index < path.length - 1 && <ArrowRight size={14} className="shrink-0 text-orange-300" />}
        </React.Fragment>
      ))}
    </div>
  );
}

function BestRouteCard({
  fromSymbol,
  toSymbol,
  score,
}: {
  fromSymbol: string;
  toSymbol: string;
  score: number;
}) {
  return (
    <div className="w-full min-w-0 overflow-hidden rounded-[2rem] border border-emerald-400/25 bg-gradient-to-br from-emerald-400/10 via-white/[0.03] to-cyan-500/10 p-4 shadow-[0_0_50px_rgba(0,245,160,0.12)] backdrop-blur-xl sm:p-6">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0 flex-1">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-bold text-emerald-300">
            <CheckCircle2 size={14} />
            Best Route Found
          </div>
          <h2 className="text-2xl font-black text-white">Aerodrome V2 Direct</h2>
          <p className="mt-2 max-w-lg break-words text-sm leading-6 text-slate-400">
            Best path for {fromSymbol} → {toSymbol}: deepest liquidity, lowest price impact, and strongest execution score on Base.
          </p>
          <div className="mt-4">
            <RoutePath path={[fromSymbol, toSymbol]} />
          </div>
        </div>
        <RouteScoreGauge score={score} />
      </div>

      <div className="mt-6 grid w-full min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          ["Expected Output", "3,176.82 USDC", "+0.92% vs avg"],
          ["Price Impact", "0.18%", "Very Low"],
          ["Gas Estimate", "$0.48", "0.00016 ETH"],
          ["Savings", "+22.15 USDC", "Best route edge"],
        ].map(([label, value, sub]) => (
          <div key={label} className="min-w-0 rounded-2xl border border-white/10 bg-black/20 p-4">
            <p className="text-xs text-slate-500">{label}</p>
            <p className="mt-2 break-words text-lg font-black text-white">{value}</p>
            <p className="mt-1 text-xs text-emerald-300">{sub}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

type SwapPanelProps = {
  fromIndex: number;
  toIndex: number;
  amount: string;
  isAnalyzing: boolean;
  onAmountChange: (value: string) => void;
  onSwapDirection: () => void;
  onFromCycle: () => void;
  onToCycle: () => void;
  onReset: () => void;
  onAnalyze: () => void;
  onPreset: (preset: "25%" | "50%" | "MAX") => void;
};

function SwapPanel({
  fromIndex,
  toIndex,
  amount,
  isAnalyzing,
  onAmountChange,
  onSwapDirection,
  onFromCycle,
  onToCycle,
  onReset,
  onAnalyze,
  onPreset,
}: SwapPanelProps) {
  const from = tokens[fromIndex];
  const to = tokens[toIndex];

  return (
    <div className={cardClass}>
      <div className="mb-6 flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-300">Route Optimizer</p>
          <h2 className="mt-2 text-2xl font-black">Swap Intent</h2>
        </div>
        <button
          type="button"
          onClick={onReset}
          className="shrink-0 cursor-pointer rounded-xl border border-white/10 bg-black/20 p-3 text-slate-400 transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400/50"
          aria-label="Reset swap intent"
        >
          <RefreshCcw size={18} />
        </button>
      </div>

      <div className="space-y-4">
        <TokenButton token={from} label="From" onSelect={onFromCycle} />

        <div className="flex justify-center">
          <button
            type="button"
            onClick={onSwapDirection}
            className="cursor-pointer rounded-2xl border border-emerald-400/25 bg-emerald-400/10 p-3 text-emerald-300 transition hover:scale-105 hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400/50"
            aria-label={`Swap direction: switch from ${from.symbol} to ${to.symbol}`}
          >
            <ArrowDown size={20} />
          </button>
        </div>

        <TokenButton token={to} label="To" onSelect={onToCycle} />

        <div className="w-full min-w-0">
          <label htmlFor="dashboard-swap-amount" className="mb-2 block text-sm text-slate-500">
            Amount
          </label>
          <div className="w-full rounded-2xl border border-white/10 bg-black/25 p-4">
            <input
              id="dashboard-swap-amount"
              value={amount}
              onChange={(e) => onAmountChange(e.target.value)}
              className="w-full min-w-0 bg-transparent text-2xl font-black text-white outline-none sm:text-3xl"
            />
            <div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-sm text-slate-500">
              <span>≈ $3,182.45</span>
              <div className="flex flex-wrap gap-2">
                {(["25%", "50%", "MAX"] as const).map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => onPreset(item)}
                    className="cursor-pointer rounded-full border border-white/10 px-3 py-1 text-xs transition hover:border-emerald-400/40 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400/50"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={onAnalyze}
          disabled={isAnalyzing || fromIndex === toIndex}
          className={`${ctaButtonClass} group mt-2 touch-manipulation bg-gradient-to-r from-emerald-400 to-cyan-400 text-[#041014] shadow-[0_0_35px_rgba(0,245,160,0.25)]`}
        >
          {isAnalyzing ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Analyzing routes…
            </>
          ) : (
            <>
              Analyze Best Route
              <Zap size={18} className="transition group-hover:rotate-12" />
            </>
          )}
        </button>

        <Link
          href="/route-optimizer"
          className={`${ctaLinkClass} border border-white/10 bg-white/[0.04] text-sm text-emerald-200 hover:bg-white/[0.06]`}
        >
          Open full Route Optimizer
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}

function DashboardAnalysisPlaceholder({
  onAnalyze,
  disabled,
  isAnalyzing,
}: {
  onAnalyze: () => void;
  disabled: boolean;
  isAnalyzing: boolean;
}) {
  return (
    <div className={`${cardClass} flex flex-col items-center justify-center py-10 text-center`}>
      <Route className="mb-4 text-emerald-300" size={36} />
      <h2 className="text-lg font-black text-white">Analyze to see routes</h2>
      <p className="mt-2 max-w-sm break-words text-sm text-slate-400">
        Configure your swap intent, then run analysis to compare Aerodrome paths here on the dashboard.
      </p>
      <button
        type="button"
        onClick={onAnalyze}
        disabled={disabled || isAnalyzing}
        className={`${ctaButtonClass} mt-5 max-w-xs touch-manipulation bg-gradient-to-r from-emerald-400 to-cyan-400 text-[#041014]`}
      >
        {isAnalyzing ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Analyzing routes…
          </>
        ) : (
          <>
            Analyze Best Route
            <Zap size={16} />
          </>
        )}
      </button>
    </div>
  );
}

function RouteComparison({ visible }: { visible: boolean }) {
  if (!visible) return null;

  return (
    <div className={`${cardClass} overflow-hidden`}>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-cyan-300">Route Comparison</p>
          <h2 className="mt-2 text-2xl font-black">Available Paths</h2>
        </div>
        <span className="w-fit shrink-0 rounded-full bg-emerald-400/10 px-3 py-1 text-xs text-emerald-300">3 routes found</span>
      </div>

      <div className="space-y-4">
        {routeOptions.map((route) => (
          <motion.div
            key={route.id}
            whileHover={{ y: -2 }}
            className="w-full min-w-0 overflow-hidden rounded-2xl border border-white/10 bg-black/20 p-4 transition hover:border-emerald-400/30"
          >
            <div className="grid w-full min-w-0 grid-cols-1 gap-4">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-black text-white">{route.name}</h3>
                  <span className={`rounded-full px-2 py-1 text-[10px] font-bold ${route.status === "Best" ? "bg-emerald-400/10 text-emerald-300" : "bg-white/10 text-slate-300"}`}>{route.status}</span>
                </div>
                <div className="mt-3">
                  <RoutePath path={route.path} />
                </div>
              </div>
              <div className="grid w-full min-w-0 grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
                <div className="min-w-0">
                  <p className="text-xs text-slate-500">Output</p>
                  <p className="mt-1 break-words font-black text-white">{route.output}</p>
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-slate-500">Gas</p>
                  <p className="mt-1 font-bold text-slate-200">{route.gas}</p>
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-slate-500">Impact</p>
                  <p className="mt-1 font-bold text-emerald-300">{route.impact}</p>
                </div>
                <div className="min-w-0">
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
    <div className={`${cardClass} order-5 min-w-0 overflow-hidden xl:order-none`}>
      <div className="mb-6 flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-orange-300">Live Analytics</p>
          <h2 className="mt-2 text-2xl font-black">Liquidity Depth</h2>
        </div>
        <LineChart className="shrink-0 text-orange-300" />
      </div>
      <svg viewBox="0 0 700 260" className="h-48 w-full min-w-0 sm:h-64" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="depthArea" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#00F5A0" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#00F5A0" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d="M0 190 C60 155 90 210 150 140 C210 70 250 130 310 105 C380 70 420 180 500 105 C585 25 620 75 700 42 L700 260 L0 260 Z" fill="url(#depthArea)" />
        <path d="M0 190 C60 155 90 210 150 140 C210 70 250 130 310 105 C380 70 420 180 500 105 C585 25 620 75 700 42" fill="none" stroke="#00F5A0" strokeWidth="5" />
      </svg>
      <div className="mt-4 grid w-full min-w-0 grid-cols-1 gap-3 sm:grid-cols-3">
        {[
          ["Pool Depth", "$12.45M"],
          ["Execution Time", "2.1s"],
          ["Route Confidence", "98.6%"],
        ].map(([label, value]) => (
          <div key={label} className="min-w-0 rounded-2xl border border-white/10 bg-black/20 p-4">
            <p className="text-xs text-slate-500">{label}</p>
            <p className="mt-2 text-xl font-black text-white">{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function AiRecommendation({
  agentHref,
  visible,
}: {
  agentHref: string;
  visible: boolean;
}) {
  if (!visible) return null;

  return (
    <div className="order-3 w-full min-w-0 overflow-hidden rounded-[2rem] border border-orange-400/25 bg-gradient-to-br from-orange-400/10 via-white/[0.03] to-emerald-400/10 p-4 backdrop-blur-xl sm:p-6 xl:order-none">
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-orange-400/15 text-orange-300">
          <Cpu size={23} />
        </div>
        <div className="min-w-0">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-300">AI Recommendation</p>
          <h2 className="break-words text-xl font-black">Use Aerodrome V2 Direct</h2>
        </div>
      </div>
      <p className="mt-5 break-words text-sm leading-7 text-slate-300">
        This route has the strongest execution quality because it uses the deepest liquidity pool, keeps price impact below 0.2%, and saves approximately 22.15 USDC against the average route.
      </p>
      <div className="mt-5 space-y-3">
        {[
          "Lowest slippage detected",
          "Best estimated output",
          "No risky multi-hop exposure",
        ].map((item) => (
          <div key={item} className="flex items-start gap-3 text-sm text-slate-300">
            <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-emerald-300" />
            <span className="break-words">{item}</span>
          </div>
        ))}
      </div>
      <Link
        href={agentHref}
        className={`${ctaLinkClass} mt-6 touch-manipulation bg-gradient-to-r from-orange-400 to-amber-300 text-[#130900]`}
      >
        Prepare Swap Transaction
        <ArrowRight size={18} />
      </Link>
    </div>
  );
}

function RecentRoutesPanel() {
  return (
    <div className={`${cardClass} order-6 min-w-0 xl:order-none`}>
      <div className="mb-6 flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-cyan-300">Recent Routes</p>
          <h2 className="mt-2 text-2xl font-black">Execution History</h2>
        </div>
        <History className="shrink-0 text-cyan-300" />
      </div>
      <div className="space-y-3">
        {recentRoutes.map(([pair, output, impact, score, time]) => (
          <div key={`${pair}-${time}`} className="w-full min-w-0 rounded-2xl border border-white/10 bg-black/20 p-4">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="font-black text-white">{pair}</p>
                <p className="mt-1 text-xs text-slate-500">{time}</p>
              </div>
              <span className="shrink-0 rounded-full bg-emerald-400/10 px-3 py-1 text-xs text-emerald-300">{score}</span>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div className="min-w-0">
                <p className="text-xs text-slate-500">Output</p>
                <p className="break-words font-bold text-white">{output}</p>
              </div>
              <div className="min-w-0">
                <p className="text-xs text-slate-500">Impact</p>
                <p className="font-bold text-emerald-300">{impact}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AeroRouteDashboardPreview() {
  const [fromIndex, setFromIndex] = useState(0);
  const [toIndex, setToIndex] = useState(1);
  const [amount, setAmount] = useState("1.0000");
  const [hasAnalyzed, setHasAnalyzed] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  const from = tokens[fromIndex];
  const to = tokens[toIndex];
  const agentHref = buildPrepareSwapHref(from.symbol, to.symbol, amount);
  const bestScore = routeOptions[0].score;

  const handleSwapDirection = useCallback(() => {
    setFromIndex(toIndex);
    setToIndex(fromIndex);
    setHasAnalyzed(false);
  }, [fromIndex, toIndex]);

  const handleFromCycle = useCallback(() => {
    setFromIndex((i) => nextSwapTokenIndex(i, toIndex));
    setHasAnalyzed(false);
  }, [toIndex]);

  const handleToCycle = useCallback(() => {
    setToIndex((i) => nextSwapTokenIndex(i, fromIndex));
    setHasAnalyzed(false);
  }, [fromIndex]);

  const handleReset = useCallback(() => {
    setFromIndex(0);
    setToIndex(1);
    setAmount("1.0000");
    setHasAnalyzed(false);
    setIsAnalyzing(false);
  }, []);

  const handlePreset = useCallback(
    (preset: "25%" | "50%" | "MAX") => {
      const bal = tokens[fromIndex].balanceNum;
      const factor = preset === "25%" ? 0.25 : preset === "50%" ? 0.5 : 1;
      const value = bal * factor;
      setAmount(value >= 1 ? value.toFixed(4) : value.toFixed(6));
      setHasAnalyzed(false);
    },
    [fromIndex],
  );

  const handleAnalyze = useCallback(() => {
    if (fromIndex === toIndex || isAnalyzing) return;

    setIsAnalyzing(true);
    setHasAnalyzed(false);

    window.setTimeout(() => {
      setIsAnalyzing(false);
      setHasAnalyzed(true);
      requestAnimationFrame(() => {
        resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }, 700);
  }, [fromIndex, toIndex, isAnalyzing]);

  return (
    <AppPageRoot>
      <AppPageSection className="max-w-[1500px]">
        <AppPageHeader>
          <PageTitleBlock
            badge={
              <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-300 sm:px-4 sm:py-2 sm:text-xs sm:tracking-[0.22em]">
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
            titleActions={<WalletStatusButtons />}
            description="Compare routes, estimate output, detect slippage, and prepare smarter Aerodrome swaps on Base with AI assistance."
          />
        </AppPageHeader>

        <div className="mb-6 grid w-full min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {metrics.map((metric) => (
            <MetricCard key={metric.label} metric={metric} />
          ))}
        </div>

        <div className="grid w-full min-w-0 grid-cols-1 gap-6 overflow-x-hidden xl:grid-cols-[390px_1fr]">
          <div className="order-1 min-w-0 xl:order-none xl:col-start-1 xl:row-start-1">
            <SwapPanel
              fromIndex={fromIndex}
              toIndex={toIndex}
              amount={amount}
              isAnalyzing={isAnalyzing}
              onAmountChange={(value) => {
                setAmount(value);
                setHasAnalyzed(false);
              }}
              onSwapDirection={handleSwapDirection}
              onFromCycle={handleFromCycle}
              onToCycle={handleToCycle}
              onReset={handleReset}
              onAnalyze={handleAnalyze}
              onPreset={handlePreset}
            />
          </div>

          <div
            ref={resultsRef}
            className="order-2 min-w-0 scroll-mt-24 xl:order-none xl:col-start-2 xl:row-start-1"
          >
            {hasAnalyzed ? (
              <BestRouteCard
                fromSymbol={from.symbol}
                toSymbol={to.symbol}
                score={bestScore}
              />
            ) : (
              <DashboardAnalysisPlaceholder
                onAnalyze={handleAnalyze}
                disabled={fromIndex === toIndex}
                isAnalyzing={isAnalyzing}
              />
            )}
          </div>

          <AiRecommendation agentHref={agentHref} visible={hasAnalyzed} />

          <div className="order-4 min-w-0 xl:order-none xl:col-start-2 xl:row-start-2">
            <RouteComparison visible={hasAnalyzed} />
          </div>
        </div>

        <div className="mt-6 grid w-full min-w-0 grid-cols-1 gap-6 overflow-x-hidden xl:grid-cols-[1fr_420px]">
          <AnalyticsPanel />
          <RecentRoutesPanel />
        </div>

        <div className="mt-6 grid w-full min-w-0 grid-cols-1 gap-4 overflow-x-hidden rounded-[2rem] border border-white/10 bg-white/[0.035] p-4 backdrop-blur-xl sm:grid-cols-2 sm:p-5 xl:grid-cols-4">
          {[
            [ShieldCheck, "Non-Custodial", "You approve every transaction."],
            [Lock, "Simulation First", "Review before signing."],
            [Info, "Aomi Assisted", "Natural language route logic."],
            [Bell, "Route Alerts", "Track better opportunities."],
          ].map(([Icon, title, text]) => {
            const SafeIcon = Icon as typeof ShieldCheck;
            return (
              <div key={title as string} className="min-w-0 rounded-2xl border border-white/10 bg-black/20 p-5">
                <SafeIcon className="text-emerald-300" size={25} />
                <h3 className="mt-3 font-black">{title as string}</h3>
                <p className="mt-2 break-words text-sm text-slate-400">{text as string}</p>
              </div>
            );
          })}
        </div>
      </AppPageSection>
    </AppPageRoot>
  );
}
