"use client";

import { useMemo, useState } from "react";
import { Search, Sparkles } from "lucide-react";
import {
  PROTOCOLS,
  type ProtocolCategory,
} from "@/lib/protocols-data";
import { ProtocolCategoryFilter } from "@/components/protocols/protocol-category-filter";
import type { ProtocolCategoryFilterValue } from "@/components/protocols/protocol-category-filter";
import { ProtocolCard } from "@/components/protocols/protocol-card";

function buildCounts() {
  const counts: Record<ProtocolCategoryFilterValue, number> = {
    All: PROTOCOLS.length,
    DEX: 0,
    Bridge: 0,
    Lending: 0,
    Network: 0,
    "AI Runtime": 0,
  };
  for (const p of PROTOCOLS) {
    counts[p.category] += 1;
  }
  return counts;
}

const CATEGORY_COUNTS = buildCounts();

export function ProtocolsWorkspace() {
  const [category, setCategory] = useState<ProtocolCategoryFilterValue>("All");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PROTOCOLS.filter((protocol) => {
      const matchesCategory =
        category === "All" || protocol.category === category;
      const matchesQuery =
        !q ||
        protocol.name.toLowerCase().includes(q) ||
        protocol.category.toLowerCase().includes(q) ||
        protocol.description.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [category, query]);

  const activeDex = PROTOCOLS.filter((p) => p.category === "DEX").length;
  const activeBridges = PROTOCOLS.filter((p) => p.category === "Bridge").length;

  return (
    <div className="min-w-0 space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {[
          ["Protocols tracked", String(PROTOCOLS.length)],
          ["DEX on Base", String(activeDex)],
          ["Bridges", String(activeBridges)],
        ].map(([label, value]) => (
          <div
            key={label}
            className="rounded-2xl border border-white/10 bg-white/[0.035] p-4 backdrop-blur-xl"
          >
            <p className="text-xs text-slate-500">{label}</p>
            <p className="mt-2 text-2xl font-black text-white">{value}</p>
          </div>
        ))}
      </div>

      <div className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-4 backdrop-blur-xl sm:p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex min-w-0 flex-1 items-center gap-3 rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
            <Search size={18} className="shrink-0 text-slate-500" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search protocols..."
              className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-slate-600"
              aria-label="Search protocols"
            />
          </div>
          <p className="shrink-0 text-sm text-slate-500">
            {filtered.length} of {PROTOCOLS.length} shown
          </p>
        </div>
        <div className="mt-4">
          <ProtocolCategoryFilter
            value={category}
            onChange={setCategory}
            counts={CATEGORY_COUNTS}
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-10 text-center backdrop-blur-xl">
          <Sparkles className="mx-auto text-emerald-300" size={28} />
          <p className="mt-4 font-black text-white">No protocols match</p>
          <p className="mt-2 text-sm text-slate-500">
            Try another category or clear your search.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((protocol) => (
            <ProtocolCard key={protocol.id} protocol={protocol} />
          ))}
        </div>
      )}
    </div>
  );
}
