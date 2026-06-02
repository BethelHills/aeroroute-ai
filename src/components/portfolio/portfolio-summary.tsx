import { BarChart3, Gauge, ShieldCheck, Wallet } from "lucide-react";
import { portfolioSummary } from "@/lib/portfolio-data";
import { cn } from "@/lib/utils";

type PortfolioSummaryProps = {
  isConnected?: boolean;
};

const cards = [
  {
    label: "Total Value",
    value: portfolioSummary.totalValue,
    sub: `${portfolioSummary.dailyChange} today`,
    icon: Wallet,
  },
  {
    label: "24h Change",
    value: portfolioSummary.dailyPercent,
    sub: "Portfolio growth",
    icon: BarChart3,
  },
  {
    label: "Route Readiness",
    value: portfolioSummary.routeReadiness,
    sub: "Swap-ready balance",
    icon: Gauge,
  },
  {
    label: "Risk Level",
    value: portfolioSummary.riskLevel,
    sub: "Stable exposure healthy",
    icon: ShieldCheck,
  },
];

export function PortfolioSummary({ isConnected = false }: PortfolioSummaryProps) {
  return (
    <div className="space-y-4">
      {!isConnected ? (
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
          Demo portfolio data
        </p>
      ) : null}
      <div
        className={cn(
          "grid gap-4 md:grid-cols-2 xl:grid-cols-4",
          isConnected && "opacity-100",
        )}
      >
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.label}
            className="rounded-3xl border border-white/10 bg-white/[0.035] p-5 backdrop-blur-xl"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-emerald-400/25 bg-emerald-400/10 text-emerald-300">
              <Icon size={22} />
            </div>

            <p className="mt-5 text-sm text-slate-500">{card.label}</p>
            <p className="mt-2 text-3xl font-black text-white">{card.value}</p>
            <p className="mt-1 text-sm text-emerald-300">{card.sub}</p>
          </div>
        );
      })}
      </div>
    </div>
  );
}
