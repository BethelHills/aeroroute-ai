import Link from "next/link";
import { ArrowRight, Bot, Route, Sparkles } from "lucide-react";
import {
  PORTFOLIO_AGENT_CHAT_HREF,
  PORTFOLIO_ROUTE_OPTIMIZER_HREF,
  type PortfolioInsight,
} from "@/lib/portfolio-data";

type AiPortfolioInsightsProps = {
  routeOpportunities: PortfolioInsight[];
  suggestedSwaps: PortfolioInsight[];
  liquidityAlerts: PortfolioInsight[];
};

function InsightGroup({
  title,
  items,
}: {
  title: string;
  items: PortfolioInsight[];
}) {
  return (
    <div>
      <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
        {title}
      </p>
      <div className="space-y-2">
        {items.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className="block rounded-2xl border border-white/10 bg-black/20 px-4 py-3 transition hover:border-emerald-400/30 hover:bg-white/[0.04]"
          >
            <p className="font-bold text-white">{item.title}</p>
            <p className="mt-1 text-sm text-slate-500">{item.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export function AiPortfolioInsights({
  routeOpportunities,
  suggestedSwaps,
  liquidityAlerts,
}: AiPortfolioInsightsProps) {
  return (
    <div className="space-y-6">
      <div className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-5 backdrop-blur-xl sm:p-6">
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-400/10 text-orange-300">
            <Sparkles size={22} />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-300">
              AeroRoute AI
            </p>
            <h2 className="text-xl font-black text-white">AI insights</h2>
          </div>
        </div>

        <div className="space-y-6">
          <InsightGroup
            title="Best route opportunities"
            items={routeOpportunities}
          />
          <InsightGroup title="Suggested swaps" items={suggestedSwaps} />
          <InsightGroup title="Liquidity alerts" items={liquidityAlerts} />
        </div>
      </div>

      <div className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-5 backdrop-blur-xl sm:p-6">
        <h2 className="text-lg font-black text-white">Actions</h2>
        <div className="mt-4 grid gap-3">
          <Link
            href={PORTFOLIO_ROUTE_OPTIMIZER_HREF}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-400 to-cyan-400 px-4 py-3 text-sm font-black text-[#041014] transition hover:opacity-95"
          >
            <Route size={16} />
            Open Route Optimizer
            <ArrowRight size={16} />
          </Link>
          <Link
            href={PORTFOLIO_AGENT_CHAT_HREF}
            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-emerald-400/25 bg-emerald-400/10 px-4 py-3 text-sm font-bold text-emerald-200 transition hover:bg-emerald-400/15"
          >
            <Bot size={16} />
            Ask Agent Chat
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
