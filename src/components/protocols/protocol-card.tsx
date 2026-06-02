"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Bot, Route, Shield } from "lucide-react";
import {
  protocolAgentChatHref,
  ROUTE_OPTIMIZER_HREF,
  type Protocol,
} from "@/lib/protocols-data";
import { cn } from "@/lib/utils";

const statusStyles: Record<Protocol["status"], string> = {
  Active: "border-emerald-400/30 bg-emerald-400/10 text-emerald-300",
  Beta: "border-cyan-400/30 bg-cyan-400/10 text-cyan-300",
  Monitoring: "border-orange-400/30 bg-orange-400/10 text-orange-300",
};

const riskStyles: Record<Protocol["risk"], string> = {
  Low: "text-emerald-300",
  Medium: "text-orange-300",
  High: "text-red-300",
};

const categoryAccent: Record<Protocol["category"], string> = {
  DEX: "from-emerald-400/15 to-cyan-500/10",
  Bridge: "from-cyan-400/15 to-blue-500/10",
  Lending: "from-orange-400/15 to-amber-400/10",
  Network: "from-violet-400/15 to-fuchsia-500/10",
  "AI Runtime": "from-emerald-400/15 to-orange-400/10",
};

type ProtocolCardProps = {
  protocol: Protocol;
};

export function ProtocolCard({ protocol }: ProtocolCardProps) {
  const showRouteOptimizer = protocol.category !== "AI Runtime";

  return (
    <motion.article
      whileHover={{ y: -4 }}
      className={cn(
        "flex h-full min-w-0 flex-col overflow-hidden rounded-[1.75rem] border border-white/10 bg-gradient-to-br p-5 backdrop-blur-xl",
        categoryAccent[protocol.category],
      )}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
            {protocol.category}
          </p>
          <h3 className="mt-1 text-xl font-black text-white">{protocol.name}</h3>
        </div>
        <span
          className={cn(
            "shrink-0 rounded-full border px-3 py-1 text-xs font-bold",
            statusStyles[protocol.status],
          )}
        >
          {protocol.status}
        </span>
      </div>

      <div className="mt-4 flex flex-wrap gap-2 text-xs">
        <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1 font-bold text-slate-300">
          {protocol.network}
        </span>
        <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-slate-400">
          TVL {protocol.tvl}
        </span>
        <span
          className={cn(
            "inline-flex items-center gap-1 rounded-full border border-white/10 bg-black/20 px-3 py-1 font-bold",
            riskStyles[protocol.risk],
          )}
        >
          <Shield size={12} />
          {protocol.risk} risk
        </span>
      </div>

      <p className="mt-4 flex-1 text-sm leading-relaxed text-slate-400">
        {protocol.description}
      </p>

      <div className="mt-4">
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
          Supported actions
        </p>
        <div className="flex flex-wrap gap-2">
          {protocol.supportedActions.map((action) => (
            <span
              key={action}
              className="rounded-full border border-emerald-400/20 bg-emerald-400/5 px-3 py-1 text-xs font-semibold text-emerald-100/90"
            >
              {action}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-2 sm:flex-row">
        <Link
          href={protocolAgentChatHref(protocol.name)}
          className="inline-flex min-w-0 flex-1 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-400 to-cyan-400 px-4 py-3 text-sm font-black text-[#041014] transition hover:opacity-90"
        >
          <Bot size={16} />
          Analyze in Agent Chat
        </Link>
        {showRouteOptimizer ? (
          <Link
            href={ROUTE_OPTIMIZER_HREF}
            className="inline-flex min-w-0 flex-1 items-center justify-center gap-2 rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-sm font-bold text-slate-200 transition hover:border-emerald-400/40 hover:text-white"
          >
            <Route size={16} />
            Route Optimizer
            <ArrowRight size={14} />
          </Link>
        ) : (
          <Link
            href={protocolAgentChatHref(protocol.name)}
            className="inline-flex min-w-0 flex-1 items-center justify-center gap-2 rounded-2xl border border-orange-400/25 bg-orange-400/10 px-4 py-3 text-sm font-bold text-orange-200 transition hover:border-orange-400/40"
          >
            <Bot size={16} />
            Open Agent
            <ArrowRight size={14} />
          </Link>
        )}
      </div>
    </motion.article>
  );
}
