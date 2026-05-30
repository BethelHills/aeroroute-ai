import { Zap } from "lucide-react";
import { Glow } from "./glow";

export function Cta() {
  return (
    <section className="relative z-10 mx-auto max-w-7xl px-5 py-16 lg:px-8">
      <div className="relative overflow-hidden rounded-[2rem] border border-orange-400/40 bg-gradient-to-r from-emerald-500/20 via-cyan-500/10 to-orange-500/20 p-8 md:p-12">
        <Glow className="bottom-0 left-0 h-72 w-72 bg-emerald-400/30" />
        <Glow className="right-0 top-0 h-72 w-72 bg-orange-400/25" />
        <div className="relative z-10 flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-3xl font-black tracking-[-0.04em] md:text-4xl">Optimize every swap. Maximize every opportunity.</h2>
            <p className="mt-3 text-slate-300">Join traders using AeroRoute AI for smarter, faster, and safer swaps on Base.</p>
          </div>
          <a href="/dashboard" className="inline-flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-orange-400 to-amber-300 px-7 py-4 font-black text-[#120800] shadow-[0_0_40px_rgba(255,122,24,0.3)]">
            Optimize Your Route Now
            <Zap size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}
