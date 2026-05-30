import React from "react";
import { ArrowRight } from "lucide-react";
import { liquidityBars, routeTokens } from "@/lib/landing-data";

export function PortfolioPreview() {
  return (
    <div className="mt-5 grid gap-4 lg:grid-cols-[0.6fr_1fr_0.7fr]">
      <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
        <p className="text-sm text-slate-400">Liquidity Depth</p>
        <p className="mt-2 text-3xl font-black">$12.45M</p>
        <div className="mt-8 flex h-32 items-end gap-4">
          {liquidityBars.map((h, i) => (
            <div key={i} style={{ height: `${h}%` }} className="flex-1 rounded-t-xl bg-gradient-to-t from-emerald-500 to-cyan-300" />
          ))}
        </div>
      </div>
      <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
        <p className="mb-8 text-sm text-slate-400">Route Flow</p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          {routeTokens.map((token, i) => (
            <React.Fragment key={token}>
              <div className="flex h-20 w-20 items-center justify-center rounded-full border border-emerald-400/40 bg-emerald-400/10 text-sm font-bold text-emerald-100">{token}</div>
              {i < routeTokens.length - 1 && <ArrowRight className="text-orange-300" />}
            </React.Fragment>
          ))}
        </div>
      </div>
      <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
        <p className="text-sm text-slate-400">Historical Performance</p>
        <p className="mt-2 text-3xl font-black">92.4%</p>
        <svg viewBox="0 0 280 140" className="mt-6 h-28 w-full">
          <path d="M0 110 C30 70 45 118 70 88 C95 55 115 92 140 62 C165 32 180 85 205 55 C230 24 250 42 280 20" fill="none" stroke="#00F5A0" strokeWidth="4" />
        </svg>
      </div>
    </div>
  );
}
