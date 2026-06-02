"use client";

import { useMemo, useState } from "react";
import { Sparkles } from "lucide-react";
import { WalletStatusButtons } from "@/components/layout/wallet-status-buttons";
import { ProtocolCard } from "@/components/protocols/protocol-card";
import { ProtocolCategoryFilter } from "@/components/protocols/protocol-category-filter";
import {
  protocolCategories,
  protocols,
  type ProtocolCategory,
} from "@/lib/protocols-data";

export function ProtocolsWorkspace() {
  const [activeCategory, setActiveCategory] = useState<
    ProtocolCategory | "All"
  >("All");
  const [search, setSearch] = useState("");

  const filteredProtocols = useMemo(() => {
    return protocols.filter((protocol) => {
      const matchesCategory =
        activeCategory === "All" || protocol.category === activeCategory;

      const matchesSearch =
        protocol.name.toLowerCase().includes(search.toLowerCase()) ||
        protocol.description.toLowerCase().includes(search.toLowerCase()) ||
        protocol.category.toLowerCase().includes(search.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, search]);

  return (
    <div className="relative z-10 w-full min-w-0 overflow-x-hidden text-white">
      <section className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <header className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-emerald-300">
              <Sparkles size={14} />
              Base protocol universe
            </div>

            <h1 className="text-4xl font-black tracking-[-0.05em] md:text-6xl">
              Protocol{" "}
              <span className="bg-gradient-to-r from-emerald-300 via-cyan-300 to-orange-300 bg-clip-text text-transparent">
                Explorer
              </span>
            </h1>

            <p className="mt-4 max-w-2xl text-slate-400">
              Explore Base protocols connected to AeroRoute AI for routing,
              liquidity, bridging, lending, and agent-powered execution.
            </p>
          </div>

          <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
            <WalletStatusButtons variant="hero" className="w-full sm:w-auto [&_button]:w-full sm:[&_button]:w-auto" />
          </div>
        </header>

        <div className="mb-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <SummaryCard label="Protocols" value={protocols.length.toString()} />
          <SummaryCard label="DEX Routes" value="4" />
          <SummaryCard label="Bridge Options" value="2" />
          <SummaryCard label="AI Runtime" value="Aomi" />
        </div>

        <ProtocolCategoryFilter
          categories={protocolCategories}
          activeCategory={activeCategory}
          search={search}
          onCategoryChange={setActiveCategory}
          onSearchChange={setSearch}
        />

        {filteredProtocols.length > 0 ? (
          <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filteredProtocols.map((protocol) => (
              <ProtocolCard key={protocol.id} protocol={protocol} />
            ))}
          </div>
        ) : (
          <div className="mt-6 rounded-[2rem] border border-dashed border-white/10 bg-white/[0.035] p-10 text-center backdrop-blur-xl">
            <h2 className="text-2xl font-black text-white">
              No protocols found
            </h2>
            <p className="mt-3 text-slate-400">
              Try changing your search or selecting another category.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}

function SummaryCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-5 backdrop-blur-xl">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-2 text-3xl font-black text-white">{value}</p>
    </div>
  );
}
