"use client";

import Link from "next/link";
import {
  ArrowLeftRight,
  ArrowUpRight,
  Layers,
  Route,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { RouteResult } from "@/lib/agent-chat/route-results";

type RouteResultCardProps = {
  route: RouteResult;
  onPrepareTransaction?: (route: RouteResult) => void;
  onCompareRoutes?: () => void;
  className?: string;
};

function MetricRow({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="flex items-start justify-between gap-3 text-sm">
      <span className="shrink-0 text-slate-500">{label}</span>
      <span className="min-w-0 max-w-[65%] break-words text-right font-medium text-slate-100">
        {value}
      </span>
    </div>
  );
}

export function RouteResultCard({
  route,
  onPrepareTransaction,
  onCompareRoutes,
  className,
}: RouteResultCardProps) {
  return (
    <article
      className={cn(
        "flex h-full flex-col rounded-[1.35rem] border border-white/10 bg-white/[0.035] p-4 shadow-[0_12px_40px_rgba(0,0,0,0.22)] backdrop-blur-xl sm:p-5",
        route.highlighted &&
          "border-emerald-400/35 bg-gradient-to-br from-emerald-400/10 via-white/[0.03] to-cyan-400/10 shadow-[0_0_35px_rgba(0,245,160,0.12)]",
        className,
      )}
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <span className="inline-flex size-9 items-center justify-center rounded-2xl bg-emerald-400/10 text-emerald-300">
              <Route className="size-4" />
            </span>
            {route.badge ? (
              <span
                className={cn(
                  "rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em]",
                  route.highlighted
                    ? "bg-emerald-400/15 text-emerald-300"
                    : "bg-white/8 text-slate-400",
                )}
              >
                {route.badge}
              </span>
            ) : null}
          </div>
          <h3 className="text-base font-black text-white sm:text-lg">{route.name}</h3>
        </div>
        <div className="shrink-0 rounded-2xl border border-white/10 bg-black/20 px-3 py-2 text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
            Score
          </p>
          <p className="text-xl font-black text-emerald-300">{route.routeScore}</p>
        </div>
      </div>

      <div className="space-y-2.5 border-y border-white/10 py-4">
        <MetricRow label="Protocol" value={route.protocol} />
        <MetricRow label="Network" value={route.network} />
        <MetricRow label="Route Path" value={route.routePath} />
        <MetricRow label="Expected Output" value={route.expectedOutput} />
        <MetricRow label="Price Impact" value={route.priceImpact} />
        <MetricRow label="Gas Estimate" value={route.gasEstimate} />
        <MetricRow label="Route Score" value={route.routeScore} />
      </div>

      <div className="mt-4 grid gap-2">
        <button
          type="button"
          onClick={() => onPrepareTransaction?.(route)}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-400 to-cyan-400 px-4 py-2.5 text-sm font-bold text-[#041014] transition hover:opacity-95"
        >
          <Sparkles className="size-4" />
          Prepare Transaction
        </button>
        <button
          type="button"
          onClick={onCompareRoutes}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm font-semibold text-slate-200 transition hover:bg-white/[0.08]"
        >
          <Layers className="size-4" />
          Compare Routes
        </button>
        <Link
          href="/route-optimizer"
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-black/20 px-4 py-2.5 text-sm font-semibold text-slate-200 transition hover:border-emerald-400/30 hover:text-white"
        >
          <ArrowUpRight className="size-4" />
          Open Route Optimizer
        </Link>
      </div>
    </article>
  );
}

export function RouteResultCardGrid({
  routes,
  onPrepareTransaction,
  onCompareRoutes,
  className,
}: {
  routes: RouteResult[];
  onPrepareTransaction?: (route: RouteResult) => void;
  onCompareRoutes?: () => void;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3",
        className,
      )}
    >
      {routes.map((route) => (
        <RouteResultCard
          key={route.id}
          route={route}
          onPrepareTransaction={onPrepareTransaction}
          onCompareRoutes={onCompareRoutes}
        />
      ))}
    </div>
  );
}

export function RouteResultCardIconBadge() {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-emerald-300">
      <ArrowLeftRight className="size-3.5" />
      Route Analysis
    </span>
  );
}
