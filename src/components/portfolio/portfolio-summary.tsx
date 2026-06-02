import { Network, TrendingUp, Wallet } from "lucide-react";
import type { PortfolioView } from "@/lib/portfolio-data";
import { cn } from "@/lib/utils";

type PortfolioSummaryProps = {
  view: PortfolioView;
  displayAddress: string;
  balancesLoading?: boolean;
};

export function PortfolioSummary({
  view,
  displayAddress,
  balancesLoading,
}: PortfolioSummaryProps) {
  const isConnected = view.mode === "connected";

  return (
    <div className="space-y-4">
      <div
        className={cn(
          "flex flex-col gap-4 rounded-[2rem] border px-5 py-4 backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between",
          isConnected
            ? "border-emerald-400/25 bg-emerald-400/10"
            : "border-cyan-400/25 bg-cyan-400/10",
        )}
      >
        <div className="flex min-w-0 items-center gap-3">
          <div
            className={cn(
              "flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl",
              isConnected
                ? "bg-emerald-400/15 text-emerald-300"
                : "bg-cyan-400/15 text-cyan-300",
            )}
          >
            <Wallet size={22} />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
              Wallet summary
            </p>
            <p className="font-black text-white">{view.modeLabel}</p>
            <p className="mt-1 truncate font-mono text-sm text-slate-400">
              {displayAddress}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-xs font-bold text-slate-300">
            <Network size={14} />
            {view.chainLabel}
          </span>
          {balancesLoading ? (
            <span className="rounded-xl border border-orange-400/25 bg-orange-400/10 px-3 py-2 text-xs font-bold text-orange-200">
              Syncing balances…
            </span>
          ) : null}
        </div>
      </div>

      <p className="text-sm text-slate-500">{view.statusNote}</p>

      <div className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 backdrop-blur-xl">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-slate-500">
          Total portfolio value
        </p>
        <p className="mt-3 text-4xl font-black tracking-tight text-white md:text-5xl">
          {view.totalValue}
        </p>
        <p className="mt-3 flex items-center gap-2 text-sm font-bold text-emerald-300">
          <TrendingUp size={16} />
          {view.totalChange}
        </p>
      </div>
    </div>
  );
}
