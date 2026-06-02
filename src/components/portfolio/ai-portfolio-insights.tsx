import Link from "next/link";
import { ArrowRight, CheckCircle2, Cpu, Route } from "lucide-react";
import type { PortfolioViewData } from "@/lib/portfolio-data";
import { PORTFOLIO_AGENT_PROMPT } from "@/lib/portfolio-data";

type AiPortfolioInsightsProps = {
  portfolio: PortfolioViewData;
};

export function AiPortfolioInsights({ portfolio }: AiPortfolioInsightsProps) {
  const prompt = encodeURIComponent(PORTFOLIO_AGENT_PROMPT);
  const eth = portfolio.assets.find((asset) => asset.symbol === "ETH");
  const usdc = portfolio.assets.find((asset) => asset.symbol === "USDC");

  const insights =
    portfolio.dataMode === "Live"
      ? [
          eth?.isLive
            ? `ETH balance on Base: ${eth.balance} (${eth.value}).`
            : "Connect on Base to read ETH balance.",
          usdc?.isLive
            ? `USDC balance on Base: ${usdc.balance} for stable routing.`
            : "USDC balance unavailable.",
          "AERO exposure reflects Aerodrome protocol context on Base.",
          "Recommended next action: simulate ETH → USDC on Aerodrome.",
        ]
      : [
          "ETH balance is high enough for efficient ETH → USDC route testing.",
          "Stable allocation supports low-risk route simulation.",
          "AERO exposure gives useful protocol-aligned portfolio context.",
          "Recommended next action: simulate ETH → USDC on Aerodrome.",
        ];

  return (
    <div className="space-y-6">
      <div className="rounded-[2rem] border border-orange-400/25 bg-gradient-to-br from-orange-400/10 via-white/[0.03] to-emerald-400/10 p-6 backdrop-blur-xl">
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-400/10 text-orange-300">
            <Cpu size={23} />
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-300">
              AI Insights
            </p>
            <h2 className="text-xl font-black text-white">
              Portfolio Route Opportunities
            </h2>
          </div>
        </div>

        <div className="space-y-3">
          {insights.map((item) => (
            <div key={item} className="flex gap-3 text-sm text-slate-300">
              <CheckCircle2 size={17} className="mt-1 shrink-0 text-emerald-300" />
              <span>{item}</span>
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:grid sm:grid-cols-2">
          <Link
            href="/route-optimizer"
            className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-400 to-cyan-400 px-4 py-3 text-sm font-black text-[#041014]"
          >
            Open Optimizer
            <Route size={16} />
          </Link>

          <Link
            href={`/agent-chat?prompt=${prompt}`}
            className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-emerald-400/25 bg-emerald-400/10 px-4 py-3 text-sm font-bold text-emerald-200"
          >
            Ask Agent
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      <div className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 backdrop-blur-xl">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-300">
          Recent Activity
        </p>

        <h2 className="mt-2 text-2xl font-black text-white">
          Route Activity
        </h2>

        <div className="mt-5 space-y-3">
          {portfolio.activity.map((activity) => (
            <div
              key={`${activity.pair}-${activity.time}`}
              className="rounded-2xl border border-white/10 bg-black/20 p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-black text-white">{activity.pair}</p>
                  <p className="mt-1 text-sm text-slate-500">
                    {activity.action}
                  </p>
                </div>

                <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-bold text-emerald-300">
                  {activity.status}
                </span>
              </div>

              <p className="mt-3 text-xs text-slate-500">{activity.time}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
