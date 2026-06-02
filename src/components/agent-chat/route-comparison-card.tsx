"use client";

import { ArrowLeftRight, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";
import type { RouteResult } from "@/lib/agent-chat/route-results";

type RouteComparisonCardProps = {
  routes: RouteResult[];
  className?: string;
  id?: string;
};

export function RouteComparisonCard({
  routes,
  className,
  id = "route-comparison",
}: RouteComparisonCardProps) {
  const bestRoute = routes.reduce<RouteResult | null>((best, route) => {
    if (!best || route.routeScore > best.routeScore) return route;
    return best;
  }, null);

  return (
    <section
      id={id}
      className={cn(
        "rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-4 backdrop-blur-xl sm:p-5",
        className,
      )}
    >
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-cyan-300">
            <ArrowLeftRight className="size-3.5" />
            Route Comparison
          </div>
          <h3 className="text-lg font-black text-white">Compare Aerodrome paths</h3>
          <p className="mt-1 text-sm text-slate-400">
            Side-by-side view of output, impact, gas, and route score on Base.
          </p>
        </div>
        {bestRoute ? (
          <div className="inline-flex items-center gap-2 rounded-2xl border border-emerald-400/25 bg-emerald-400/10 px-3 py-2 text-sm text-emerald-300">
            <Trophy className="size-4 shrink-0" />
            Best: {bestRoute.name}
          </div>
        ) : null}
      </div>

      <div className="hidden overflow-x-auto md:block">
        <table className="min-w-full border-separate border-spacing-0 text-left text-sm">
          <thead>
            <tr className="text-xs uppercase tracking-[0.16em] text-slate-500">
              <th className="border-b border-white/10 px-3 py-3 font-semibold">
                Route
              </th>
              <th className="border-b border-white/10 px-3 py-3 font-semibold">
                Path
              </th>
              <th className="border-b border-white/10 px-3 py-3 font-semibold">
                Output
              </th>
              <th className="border-b border-white/10 px-3 py-3 font-semibold">
                Impact
              </th>
              <th className="border-b border-white/10 px-3 py-3 font-semibold">
                Gas
              </th>
              <th className="border-b border-white/10 px-3 py-3 font-semibold">
                Score
              </th>
            </tr>
          </thead>
          <tbody>
            {routes.map((route) => (
              <tr
                key={route.id}
                className={cn(
                  "transition-colors",
                  route.highlighted && "bg-emerald-400/[0.06]",
                )}
              >
                <td className="border-b border-white/5 px-3 py-3 font-semibold text-white">
                  <div className="flex flex-col gap-1">
                    <span>{route.name}</span>
                    <span className="text-xs font-normal text-slate-500">
                      {route.protocol}
                    </span>
                  </div>
                </td>
                <td className="border-b border-white/5 px-3 py-3 text-slate-300">
                  {route.routePath}
                </td>
                <td className="border-b border-white/5 px-3 py-3 text-slate-200">
                  {route.expectedOutput}
                </td>
                <td className="border-b border-white/5 px-3 py-3 text-slate-300">
                  {route.priceImpact}
                </td>
                <td className="border-b border-white/5 px-3 py-3 text-slate-300">
                  {route.gasEstimate}
                </td>
                <td className="border-b border-white/5 px-3 py-3 font-bold text-emerald-300">
                  {route.routeScore}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid gap-3 md:hidden">
        {routes.map((route) => (
          <div
            key={`${route.id}-mobile`}
            className={cn(
              "rounded-2xl border border-white/10 bg-black/20 p-3",
              route.highlighted && "border-emerald-400/30 bg-emerald-400/[0.06]",
            )}
          >
            <div className="mb-2 flex items-center justify-between gap-2">
              <p className="font-semibold text-white">{route.name}</p>
              <span className="text-sm font-bold text-emerald-300">
                {route.routeScore}
              </span>
            </div>
            <dl className="grid grid-cols-2 gap-2 text-xs text-slate-400">
              <div>
                <dt className="uppercase tracking-wide">Path</dt>
                <dd className="mt-0.5 text-slate-200">{route.routePath}</dd>
              </div>
              <div>
                <dt className="uppercase tracking-wide">Output</dt>
                <dd className="mt-0.5 text-slate-200">{route.expectedOutput}</dd>
              </div>
              <div>
                <dt className="uppercase tracking-wide">Impact</dt>
                <dd className="mt-0.5 text-slate-200">{route.priceImpact}</dd>
              </div>
              <div>
                <dt className="uppercase tracking-wide">Gas</dt>
                <dd className="mt-0.5 text-slate-200">{route.gasEstimate}</dd>
              </div>
            </dl>
          </div>
        ))}
      </div>
    </section>
  );
}
