import Link from "next/link";
import { ArrowRight, BarChart3, ShieldCheck, Zap } from "lucide-react";
import type { Protocol } from "@/lib/protocols-data";

type ProtocolCardProps = {
  protocol: Protocol;
};

const riskStyles: Record<Protocol["risk"], string> = {
  Low: "border-emerald-400/30 bg-emerald-400/10 text-emerald-300",
  Medium: "border-orange-400/30 bg-orange-400/10 text-orange-300",
  High: "border-red-400/30 bg-red-400/10 text-red-300",
};

const statusStyles: Record<Protocol["status"], string> = {
  Active: "border-emerald-400/30 bg-emerald-400/10 text-emerald-300",
  Ready: "border-cyan-400/30 bg-cyan-400/10 text-cyan-300",
  Preview: "border-orange-400/30 bg-orange-400/10 text-orange-300",
};

export function ProtocolCard({ protocol }: ProtocolCardProps) {
  const agentPrompt = encodeURIComponent(`Analyze ${protocol.name} on Base`);

  return (
    <article className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.035] p-5 backdrop-blur-xl transition hover:-translate-y-1 hover:border-emerald-400/30">
      <div
        className={`absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gradient-to-br ${protocol.accent} blur-3xl transition group-hover:opacity-80`}
      />

      <div className="relative z-10">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-emerald-400/25 bg-emerald-400/10 text-emerald-300 shadow-[0_0_24px_rgba(0,245,160,0.15)]">
              <Zap size={22} />
            </div>

            <div>
              <h3 className="text-xl font-black text-white">{protocol.name}</h3>
              <p className="text-sm text-slate-500">{protocol.category}</p>
            </div>
          </div>

          <span
            className={`rounded-full border px-3 py-1 text-xs font-bold ${statusStyles[protocol.status]}`}
          >
            {protocol.status}
          </span>
        </div>

        <p className="min-h-[72px] text-sm leading-6 text-slate-400">
          {protocol.description}
        </p>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
            <div className="mb-2 flex items-center gap-2 text-slate-500">
              <BarChart3 size={15} />
              <span className="text-xs">TVL</span>
            </div>
            <p className="font-black text-white">{protocol.tvl}</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
            <div className="mb-2 flex items-center gap-2 text-slate-500">
              <ShieldCheck size={15} />
              <span className="text-xs">Risk</span>
            </div>
            <span
              className={`inline-flex rounded-full border px-3 py-1 text-xs font-bold ${riskStyles[protocol.risk]}`}
            >
              {protocol.risk}
            </span>
          </div>
        </div>

        <div className="mt-5">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
            Supported Actions
          </p>

          <div className="flex flex-wrap gap-2">
            {protocol.actions.map((action) => (
              <span
                key={action}
                className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-slate-300"
              >
                {action}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:grid sm:grid-cols-2">
          <Link
            href={`/agent-chat?prompt=${agentPrompt}`}
            className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-emerald-400/25 bg-emerald-400/10 px-4 py-3 text-sm font-bold text-emerald-200 transition hover:bg-emerald-400/15"
          >
            Analyze
            <ArrowRight size={16} />
          </Link>

          <Link
            href="/route-optimizer"
            className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-400 to-cyan-400 px-4 py-3 text-sm font-black text-[#041014] transition hover:scale-[1.01] sm:hover:scale-[1.01]"
          >
            Route
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </article>
  );
}
