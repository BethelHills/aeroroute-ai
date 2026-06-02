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
  CheckCircle2,
  ChevronDown,
  Clock3,
  Cpu,
  Flame,
  Gauge,
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

const ctaClass =
  "inline-flex w-full cursor-pointer items-center justify-center gap-3 rounded-2xl px-6 py-4 font-black transition hover:scale-[1.01] hover:opacity-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400/50 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100";

function buildAgentHref(from: string, to: string, amount: string) {
  const prompt = `Analyze the best Aerodrome route on Base to swap ${amount} ${from} to ${to}. Compare liquidity, slippage, and gas.`;
  return `/agent-chat?prompt=${encodeURIComponent(prompt)}`;
}

type TokenSelectProps = {
  label: string;
  token: SwapToken;
  onSelect: () => void;
};

function TokenSelect({ label, token, onSelect }: TokenSelectProps) {
  return (
    <div>
      <div className="mb-2 flex flex-wrap items-center justify-between gap-2 text-sm text-slate-500">
        <span>{label}</span>
        <span>Balance: {token.balance}</span>
      </div>
      <button
        type="button"
        onClick={onSelect}
        className="flex w-full min-w-0 cursor-pointer items-center justify-between rounded-2xl border border-white/10 bg-white/[0.035] p-4 text-left backdrop-blur-xl transition hover:border-emerald-400/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400/50"
        aria-label={`Change ${label} token, currently ${token.symbol}`}
      >
        <div className="flex min-w-0 items-center gap-3">
          <SwapTokenIcon key={token.symbol} token={token} size="md" />
          <div className="min-w-0">
            <p className="text-lg font-black text-white">{token.symbol}</p>
            <p className="text-xs text-slate-500">{token.name}</p>
          </div>
        </div>
        <ChevronDown size={18} className="shrink-0 text-slate-500" />
      </button>
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

type SwapFormProps = {
  fromIndex: number;
  toIndex: number;
  amount: string;
  isAnalyzing: boolean;
  onAmountChange: (value: string) => void;
  onSwapDirection: () => void;
  onFromTokenCycle: () => void;
  onToTokenCycle: () => void;
  onReset: () => void;
  onAnalyze: () => void;
  onPreset: (preset: "25%" | "50%" | "MAX") => void;
};

function SwapForm({
  fromIndex,
  toIndex,
  amount,
  isAnalyzing,
  onAmountChange,
  onSwapDirection,
  onFromTokenCycle,
  onToTokenCycle,
  onReset,
  onAnalyze,
  onPreset,
}: SwapFormProps) {
  const from = tokens[fromIndex];
  const to = tokens[toIndex];

  return (
    <div className="w-full min-w-0 rounded-[2rem] border border-white/10 bg-white/[0.035] p-4 shadow-[0_0_50px_rgba(0,245,160,0.08)] backdrop-blur-xl sm:p-6">
      <div className="mb-6 flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-300">Swap Intent</p>
          <h2 className="mt-2 text-2xl font-black">Enter Route</h2>
        </div>
        <button
          type="button"
          onClick={onReset}
          className="shrink-0 cursor-pointer rounded-2xl border border-white/10 bg-black/20 p-3 text-slate-400 transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400/50"
          aria-label="Reset swap form"
        >
          <RefreshCcw size={18} />
        </button>
      </div>

      <div className="space-y-5">
        <TokenSelect label="From" token={from} onSelect={onFromTokenCycle} />
        <div className="flex justify-center">
          <button
            type="button"
            onClick={onSwapDirection}
            className="cursor-pointer rounded-2xl border border-emerald-400/25 bg-emerald-400/10 p-3 text-emerald-300 shadow-[0_0_25px_rgba(0,245,160,0.12)] transition hover:scale-105 hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400/50"
            aria-label={`Swap direction: switch from ${from.symbol} to ${to.symbol}`}
          >
            <ArrowDown size={20} />
          </button>
        </div>
        <TokenSelect label="To" token={to} onSelect={onToTokenCycle} />

        <div>
          <label htmlFor="swap-amount" className="mb-2 block text-sm text-slate-500">
            Amount
          </label>
          <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
            <input
              id="swap-amount"
              value={amount}
              onChange={(e) => onAmountChange(e.target.value)}
              className="w-full min-w-0 bg-transparent text-2xl font-black text-white outline-none sm:text-4xl"
            />
            <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-sm text-slate-500">
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
          className={`${ctaClass} group bg-gradient-to-r from-emerald-400 to-cyan-400 text-[#041014] shadow-[0_0_40px_rgba(0,245,160,0.25)]`}
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
      </div>
    </div>
  );
}

function BestRoute({ fromSymbol, toSymbol }: { fromSymbol: string; toSymbol: string }) {
  const best = routes[0];
  return (
    <div className="relative w-full min-w-0 overflow-hidden rounded-[2rem] border border-emerald-400/25 bg-gradient-to-br from-emerald-400/10 via-white/[0.035] to-cyan-500/10 p-4 backdrop-blur-xl sm:p-6">
      <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-emerald-400/20 blur-3xl" />
      <div className="relative flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-bold text-emerald-300">
            <CheckCircle2 size={14} />
            Best Route Found
          </div>
          <h2 className="text-2xl font-black tracking-tight text-white sm:text-3xl">{best.name}</h2>
          <p className="mt-3 max-w-2xl break-words text-sm leading-7 text-slate-400">
            Best path for {fromSymbol} → {toSymbol} on Aerodrome: strongest output, lowest price impact, and deepest liquidity on Base.
          </p>
          <div className="mt-5">
            <RoutePath path={[fromSymbol, toSymbol]} />
          </div>
        </div>

        <div className="mx-auto flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-[conic-gradient(from_180deg,#00F5A0_0deg,#22d3ee_260deg,rgba(255,255,255,0.08)_260deg)] p-2 shadow-[0_0_60px_rgba(0,245,160,0.25)] sm:mx-0 sm:h-32 sm:w-32 md:h-40 md:w-40 sm:p-3">
          <div className="flex h-full w-full flex-col items-center justify-center rounded-full bg-[#061018]">
            <p className="text-xs text-slate-500">Score</p>
            <p className="text-3xl font-black text-emerald-300 sm:text-4xl md:text-5xl">{best.score}</p>
            <p className="text-xs text-emerald-300">Excellent</p>
          </div>
        </div>
      </div>

      <div className="relative mt-6 grid w-full min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          ["Expected Output", best.output, "+0.92% vs avg"],
          ["Slippage", best.slippage, "Protected"],
          ["Price Impact", best.impact, "Very Low"],
          ["Gas Estimate", best.gas, best.gasEth],
        ].map(([label, value, sub]) => (
          <div key={label} className="min-w-0 rounded-2xl border border-white/10 bg-black/25 p-4">
            <p className="text-xs text-slate-500">{label}</p>
            <p className="mt-2 break-words text-lg font-black text-white">{value}</p>
            <p className="mt-1 text-xs text-emerald-300">{sub}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function Stat({ label, value, accent, large }: { label: string; value: string; accent?: boolean; large?: boolean }) {
  return (
    <div className="min-w-0">
      <p className="text-xs text-slate-500">{label}</p>
      <p className={`mt-1 break-words font-black ${large ? "text-2xl" : "text-sm"} ${accent ? "text-emerald-300" : "text-white"}`}>{value}</p>
    </div>
  );
}

function RouteComparison() {
  return (
    <div className="w-full min-w-0 overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.035] p-4 backdrop-blur-xl sm:p-6">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-cyan-300">Route Comparison</p>
          <h2 className="mt-2 text-2xl font-black">3 Routes Analyzed</h2>
        </div>
        <span className="w-fit shrink-0 rounded-full bg-emerald-400/10 px-3 py-1 text-xs text-emerald-300">Base · Aerodrome</span>
      </div>

      <div className="space-y-4">
        {routes.map((route, index) => (
          <motion.div key={route.name} whileHover={{ y: -2 }} className="w-full min-w-0 overflow-hidden rounded-2xl border border-white/10 bg-black/20 p-4 transition hover:border-emerald-400/30">
            <div className="grid w-full min-w-0 grid-cols-1 gap-4">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-xs font-black">{index + 1}</span>
                  <h3 className="font-black text-white">{route.name}</h3>
                  <span className={`rounded-full px-2 py-1 text-[10px] font-bold ${route.badge === "Best" ? "bg-emerald-400/10 text-emerald-300" : "bg-white/10 text-slate-300"}`}>{route.badge}</span>
                </div>
                <div className="mt-3">
                  <RoutePath path={route.path} />
                </div>
              </div>
              <div className="grid w-full min-w-0 grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
                <Stat label="Output" value={route.output} />
                <Stat label="Gas" value={route.gas} />
                <Stat label="Impact" value={route.impact} accent />
                <Stat label="Risk" value={route.risk} />
                <Stat label="Score" value={`${route.score}`} large />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function AiSummary() {
  return (
    <div className="w-full min-w-0 rounded-[2rem] border border-orange-400/25 bg-gradient-to-br from-orange-400/10 via-white/[0.03] to-emerald-400/10 p-4 backdrop-blur-xl sm:p-6">
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-orange-400/15 text-orange-300">
          <Cpu size={23} />
        </div>
        <div className="min-w-0">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-300">AI Route Summary</p>
          <h2 className="text-xl font-black">Recommended execution path</h2>
        </div>
      </div>
      <p className="mt-5 break-words text-sm leading-7 text-slate-300">
        Use Aerodrome V2 Direct. It provides the highest expected output, lowest route complexity, and lowest price impact. Multi-hop routes are available, but they add gas cost without improving output.
      </p>
      <div className="mt-5 space-y-3">
        {["Best output across available routes", "Lowest price impact", "No risky multi-hop exposure", "Simulation recommended before signing"].map((item) => (
          <div key={item} className="flex items-start gap-3 text-sm text-slate-300">
            <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-emerald-300" /> <span className="break-words">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function TransactionPreview({ agentHref, actionLabel }: { agentHref: string; actionLabel: string }) {
  return (
    <div className="w-full min-w-0 rounded-[2rem] border border-white/10 bg-white/[0.035] p-4 backdrop-blur-xl sm:p-6">
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-300"><Lock size={22} /></div>
        <div className="min-w-0">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-300">Transaction Preview</p>
          <h2 className="text-xl font-black">Ready to simulate</h2>
        </div>
      </div>
      <div className="space-y-3 text-sm">
        {[
          ["Protocol", "Aerodrome"],
          ["Network", "Base 8453"],
          ["Action", actionLabel],
          ["Minimum Received", "3,166.65 USDC"],
          ["Deadline", "20 minutes"],
        ].map(([label, value]) => (
          <div key={label} className="flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
            <span className="text-slate-500">{label}</span>
            <span className="break-words font-bold text-white">{value}</span>
          </div>
        ))}
      </div>
      <Link href={agentHref} className={`${ctaClass} mt-5 bg-gradient-to-r from-orange-400 to-amber-300 text-[#130900]`}>
        Prepare Swap with Aomi <ArrowRight size={18} />
      </Link>
      <p className="mt-3 text-center text-xs text-slate-500">No transaction is signed until you approve it in your wallet.</p>
    </div>
  );
}

function MiniChart() {
  return (
    <div className="w-full min-w-0 rounded-[2rem] border border-white/10 bg-white/[0.035] p-4 backdrop-blur-xl sm:p-6">
      <div className="mb-5 flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-300">Liquidity Curve</p>
          <h2 className="text-xl font-black">Pool depth</h2>
        </div>
        <Gauge className="shrink-0 text-emerald-300" />
      </div>
      <svg viewBox="0 0 520 190" className="h-44 w-full min-w-0">
        <defs><linearGradient id="routeOptArea" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#00F5A0" stopOpacity="0.45" /><stop offset="100%" stopColor="#00F5A0" stopOpacity="0" /></linearGradient></defs>
        <path d="M0 145 C45 115 70 160 115 102 C160 50 190 118 245 88 C300 56 330 135 380 92 C430 48 470 62 520 28 L520 190 L0 190 Z" fill="url(#routeOptArea)" />
        <path d="M0 145 C45 115 70 160 115 102 C160 50 190 118 245 88 C300 56 330 135 380 92 C430 48 470 62 520 28" fill="none" stroke="#00F5A0" strokeWidth="4" />
      </svg>
    </div>
  );
}

function AnalysisPlaceholder({ onAnalyze }: { onAnalyze: () => void }) {
  return (
    <div className="flex w-full min-w-0 flex-col items-center justify-center rounded-[2rem] border border-dashed border-white/15 bg-white/[0.02] p-10 text-center backdrop-blur-xl">
      <Route className="mb-4 text-emerald-300" size={40} />
      <h2 className="text-xl font-black text-white">Ready to analyze</h2>
      <p className="mt-3 max-w-md text-sm leading-7 text-slate-400">
        Set your swap pair and amount, then select Analyze Best Route to compare Aerodrome paths.
      </p>
      <button
        type="button"
        onClick={onAnalyze}
        className={`${ctaClass} mt-6 max-w-sm bg-gradient-to-r from-emerald-400 to-cyan-400 text-[#041014]`}
      >
        Analyze Best Route
        <Zap size={18} />
      </button>
    </div>
  );
}

export default function AeroRouteOptimizerPreview() {
  const [fromIndex, setFromIndex] = useState(0);
  const [toIndex, setToIndex] = useState(1);
  const [amount, setAmount] = useState("1.0000");
  const [hasAnalyzed, setHasAnalyzed] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  const from = tokens[fromIndex];
  const to = tokens[toIndex];
  const agentHref = buildAgentHref(from.symbol, to.symbol, amount);
  const actionLabel = `Swap ${from.symbol} to ${to.symbol}`;

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
      <AppPageSection>
        <AppPageHeader>
          <PageTitleBlock
            badge={
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-emerald-300">
                <Sparkles size={14} /> Aerodrome on Base
              </div>
            }
            title={
              <>
                Route{" "}
                <span className="bg-gradient-to-r from-emerald-300 via-cyan-300 to-orange-300 bg-clip-text text-transparent">
                  Optimizer
                </span>
              </>
            }
            description="Enter your swap intent and let AeroRoute AI compare liquidity, slippage, gas, and execution risk before you trade."
            titleActions={<WalletStatusButtons />}
          />
        </AppPageHeader>

        <div className="flex w-full min-w-0 flex-col gap-6 xl:grid xl:grid-cols-[minmax(0,420px)_1fr]">
          <div className="order-1 min-w-0 space-y-6">
            <SwapForm
              fromIndex={fromIndex}
              toIndex={toIndex}
              amount={amount}
              isAnalyzing={isAnalyzing}
              onAmountChange={(value) => {
                setAmount(value);
                setHasAnalyzed(false);
              }}
              onSwapDirection={handleSwapDirection}
              onFromTokenCycle={handleFromCycle}
              onToTokenCycle={handleToCycle}
              onReset={handleReset}
              onAnalyze={handleAnalyze}
              onPreset={handlePreset}
            />
            <div className="hidden space-y-6 xl:block">
              {hasAnalyzed ? (
                <>
                  <AiSummary />
                  <TransactionPreview agentHref={agentHref} actionLabel={actionLabel} />
                </>
              ) : null}
            </div>
          </div>

          <div ref={resultsRef} className="order-2 min-w-0 space-y-6 scroll-mt-24">
            {hasAnalyzed ? (
              <>
                <BestRoute fromSymbol={from.symbol} toSymbol={to.symbol} />
                <RouteComparison />
                <div className="space-y-6 xl:hidden">
                  <AiSummary />
                  <TransactionPreview agentHref={agentHref} actionLabel={actionLabel} />
                </div>
                <MiniChart />
              </>
            ) : (
              <AnalysisPlaceholder onAnalyze={handleAnalyze} />
            )}
          </div>
        </div>

        <div className="mt-6 grid w-full min-w-0 grid-cols-1 gap-4 rounded-[2rem] border border-white/10 bg-white/[0.035] p-4 backdrop-blur-xl sm:p-5 md:grid-cols-2 xl:grid-cols-4">
          {[
            [ShieldCheck, "Protected", "Simulation-first route planning."],
            [Clock3, "Fast", "Route analysis in seconds."],
            [Flame, "Gas Aware", "Gas estimate included."],
            [Route, "Optimized", "Highest output selected."],
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
