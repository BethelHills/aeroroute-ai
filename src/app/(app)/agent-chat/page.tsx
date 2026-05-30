"use client";

import React, { useState } from "react";
import {
  AppPageHeader,
  AppPageRoot,
  AppPageSection,
  PageTitleBlock,
} from "@/components/layout/page-shell";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Bot,
  CheckCircle2,
  ChevronDown,
  Clock3,
  Cpu,
  Send,
  ShieldCheck,
  Sparkles,
  Wallet,
  Zap,
} from "lucide-react";

const suggestions = [
  "Find best Aerodrome route for swapping 1 ETH to USDC",
  "Quote swap on Aerodrome",
  "Simulate route before signing",
  "Show liquidity pools on Base",
  "Prepare swap transaction",
];

type ChatMessage = {
  role: "agent" | "user";
  text: string;
  title?: string;
  tool?: string;
};

const messages: ChatMessage[] = [
  {
    role: "agent",
    title: "AeroRoute AI",
    text: "I can help you compare Aerodrome swap routes, estimate slippage, simulate trades, and prepare wallet-safe transactions on Base.",
  },
  {
    role: "user",
    text: "Find best route for swapping 1 ETH to USDC on Aerodrome.",
  },
  {
    role: "agent",
    title: "AeroRoute AI",
    text: "Best route found: Aerodrome V2 Direct. Expected output is 3,176.82 USDC with 0.18% price impact and estimated gas of $0.48.",
    tool: "route_optimizer.analyze",
  },
];

const executionSteps = [
  { label: "Intent detected", value: "Swap ETH → USDC", status: "done" as const },
  { label: "Protocol selected", value: "Aerodrome", status: "done" as const },
  { label: "Network", value: "Base 8453", status: "done" as const },
  { label: "Route analysis", value: "3 paths found", status: "done" as const },
  { label: "Simulation", value: "Ready", status: "active" as const },
  { label: "Wallet approval", value: "Pending", status: "idle" as const },
];

const routeResult = {
  route: "Aerodrome V2 Direct",
  output: "3,176.82 USDC",
  gas: "$0.48",
  impact: "0.18%",
  slippage: "0.32%",
  score: 98,
  path: ["ETH", "USDC"],
};

function ChatBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`max-w-[min(100%,32rem)] break-words rounded-[1.6rem] p-4 sm:p-5 ${
          isUser
            ? "bg-gradient-to-r from-emerald-400 to-cyan-400 text-[#031014]"
            : "border border-white/10 bg-white/[0.035] text-slate-100 backdrop-blur-xl"
        }`}
      >
        {!isUser && (
          <div className="mb-3 flex items-center gap-2 text-emerald-300">
            <Bot size={17} />
            <span className="text-sm font-bold">{message.title}</span>
          </div>
        )}
        <p className={`text-sm leading-7 ${isUser ? "font-semibold" : "text-slate-300"}`}>{message.text}</p>
        {message.tool && (
          <div className="mt-4 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-xs text-emerald-200">
            Used tool: {message.tool}
          </div>
        )}
      </div>
    </motion.div>
  );
}

function PathPills({ path }: { path: string[] }) {
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

function RouteResultCard() {
  return (
    <div className="rounded-[2rem] border border-emerald-400/25 bg-gradient-to-br from-emerald-400/10 via-white/[0.03] to-cyan-500/10 p-6 backdrop-blur-xl">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-bold text-emerald-300">
            <CheckCircle2 size={14} />
            Best route
          </div>
          <h3 className="text-2xl font-black">{routeResult.route}</h3>
          <div className="mt-4"><PathPills path={routeResult.path} /></div>
        </div>
        <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-[conic-gradient(from_180deg,#00F5A0_0deg,#22d3ee_260deg,rgba(255,255,255,0.08)_260deg)] p-2">
          <div className="flex h-full w-full flex-col items-center justify-center rounded-full bg-[#061018]">
            <span className="text-xs text-slate-500">Score</span>
            <span className="text-3xl font-black text-emerald-300">98</span>
          </div>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {[
          ["Expected Output", routeResult.output],
          ["Gas", routeResult.gas],
          ["Price Impact", routeResult.impact],
          ["Slippage", routeResult.slippage],
        ].map(([label, value]) => (
          <div key={label} className="rounded-2xl border border-white/10 bg-black/20 p-4">
            <p className="text-xs text-slate-500">{label}</p>
            <p className="mt-2 font-black text-white">{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ExecutionTimeline() {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 backdrop-blur-xl">
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-400/10 text-orange-300">
          <Cpu size={22} />
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-300">Agent Timeline</p>
          <h3 className="text-xl font-black">Execution plan</h3>
        </div>
      </div>

      <div className="space-y-4">
        {executionSteps.map((step) => (
          <div key={step.label} className="flex gap-3">
            <div
              className={`mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border ${
                step.status === "done"
                  ? "border-emerald-400/40 bg-emerald-400/15 text-emerald-300"
                  : step.status === "active"
                  ? "border-orange-400/40 bg-orange-400/15 text-orange-300"
                  : "border-white/10 bg-white/5 text-slate-500"
              }`}
            >
              {step.status === "done" ? <CheckCircle2 size={15} /> : <Clock3 size={15} />}
            </div>
            <div className="flex-1 rounded-2xl border border-white/10 bg-black/20 p-3">
              <p className="text-sm font-bold text-white">{step.label}</p>
              <p className="mt-1 text-xs text-slate-500">{step.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function WalletContext() {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 backdrop-blur-xl">
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-300">
          <Wallet size={22} />
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-300">Wallet Context</p>
          <h3 className="text-xl font-black">Base connected</h3>
        </div>
      </div>
      <div className="space-y-3 text-sm">
        {[
          ["Address", "0x8f...3a29"],
          ["Network", "Base 8453"],
          ["ETH", "4.2800"],
          ["USDC", "1,240.00"],
        ].map(([label, value]) => (
          <div key={label} className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
            <span className="text-slate-500">{label}</span>
            <span className="font-bold text-white">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function QuickActions() {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 backdrop-blur-xl">
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-400/10 text-emerald-300">
          <Zap size={22} />
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-300">Quick Prompts</p>
          <h3 className="text-xl font-black">Try these</h3>
        </div>
      </div>
      <div className="space-y-3">
        {suggestions.map((item) => (
          <button key={item} className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-left text-sm text-slate-300 transition hover:border-emerald-400/40 hover:text-white">
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}

function ChatPanel() {
  const [input, setInput] = useState("Find best Aerodrome route for swapping 1 ETH to USDC");

  return (
    <div className="flex min-h-[min(70vh,720px)] max-h-[calc(100svh-12rem)] flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.035] p-4 backdrop-blur-xl sm:p-5">
      <div className="mb-5 flex flex-col gap-4 border-b border-white/10 pb-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-cyan-400 text-[#031014] shadow-[0_0_35px_rgba(0,245,160,0.25)]">
            <Bot size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-black">AeroRoute Agent</h2>
            <p className="text-sm text-slate-500">Aerodrome route intelligence on Base</p>
          </div>
        </div>
        <button className="flex w-fit items-center gap-2 rounded-2xl border border-white/10 bg-black/20 px-4 py-2 text-sm text-slate-300">
          <span className="h-2 w-2 rounded-full bg-emerald-300" />
          Base · Aerodrome
          <ChevronDown size={15} />
        </button>
      </div>

      <div className="min-h-0 flex-1 space-y-5 overflow-y-auto overflow-x-hidden pr-1">
        {messages.map((message, index) => (
          <ChatBubble key={index} message={message} />
        ))}
        <RouteResultCard />
      </div>

      <div className="mt-4 shrink-0 rounded-[1.5rem] border border-white/10 bg-black/25 p-3 sm:mt-5">
        <div className="flex items-center gap-2 sm:gap-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="min-w-0 flex-1 bg-transparent px-2 py-3 text-sm text-white outline-none placeholder:text-slate-600 sm:px-3"
            placeholder="Ask AeroRoute AI..."
          />
          <button className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-r from-emerald-400 to-cyan-400 text-[#031014]">
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AeroRouteAgentChatPreview() {
  return (
    <AppPageRoot>
      <AppPageSection>
        <AppPageHeader>
          <PageTitleBlock
            badge={
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-emerald-300">
                <Sparkles size={14} /> Aomi-powered assistant
              </div>
            }
            title={
              <>
                Agent{" "}
                <span className="bg-gradient-to-r from-emerald-300 via-cyan-300 to-orange-300 bg-clip-text text-transparent">
                  Chat
                </span>
              </>
            }
            description="Ask AeroRoute AI to quote swaps, compare routes, simulate transactions, and prepare Aerodrome actions on Base."
          />
        </AppPageHeader>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_minmax(0,360px)]">
          <ChatPanel />
          <aside className="min-w-0 space-y-6">
            <WalletContext />
            <ExecutionTimeline />
            <QuickActions />
            <div className="rounded-[2rem] border border-orange-400/25 bg-gradient-to-br from-orange-400/10 via-white/[0.03] to-emerald-400/10 p-6 backdrop-blur-xl">
              <div className="mb-4 flex items-center gap-3"><ShieldCheck className="text-orange-300" /><h3 className="font-black">Safety Mode</h3></div>
              <p className="text-sm leading-7 text-slate-400">AeroRoute will never sign transactions automatically. Every route is simulated and reviewed before wallet approval.</p>
            </div>
          </aside>
        </div>
      </AppPageSection>
    </AppPageRoot>
  );
}
