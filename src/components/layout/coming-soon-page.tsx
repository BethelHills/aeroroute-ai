"use client";

import { Sparkles, type LucideIcon } from "lucide-react";

type ComingSoonPageProps = {
  badge: string;
  title: string;
  titleAccent: string;
  description: string;
  icon?: LucideIcon;
};

export function ComingSoonPage({
  badge,
  title,
  titleAccent,
  description,
  icon: Icon,
}: ComingSoonPageProps) {
  return (
    <main className="min-h-full w-full overflow-hidden text-white">
      <section className="relative z-10 w-full px-5 py-8 lg:px-8">
        <header className="mb-8 max-w-3xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-emerald-300">
            <Sparkles size={14} />
            {badge}
          </div>
          <h1 className="text-4xl font-black tracking-[-0.05em] md:text-6xl">
            {title}{" "}
            <span className="bg-gradient-to-r from-emerald-300 via-cyan-300 to-orange-300 bg-clip-text text-transparent">
              {titleAccent}
            </span>
          </h1>
          <p className="mt-4 text-slate-400">{description}</p>
        </header>
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-8 backdrop-blur-xl">
          {Icon && (
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-emerald-400/25 bg-emerald-400/10 text-emerald-300">
              <Icon size={22} />
            </div>
          )}
          <p className="text-sm leading-7 text-slate-400">
            This section is wired into the global app shell. Page content will
            connect to live Aerodrome and Aomi data in a follow-up iteration.
          </p>
        </div>
      </section>
    </main>
  );
}
