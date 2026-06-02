"use client";

import { Search } from "lucide-react";
import type { ProtocolCategory } from "@/lib/protocols-data";

type ProtocolCategoryFilterProps = {
  categories: ProtocolCategory[];
  activeCategory: ProtocolCategory | "All";
  search: string;
  onCategoryChange: (category: ProtocolCategory | "All") => void;
  onSearchChange: (value: string) => void;
};

export function ProtocolCategoryFilter({
  categories,
  activeCategory,
  search,
  onCategoryChange,
  onSearchChange,
}: ProtocolCategoryFilterProps) {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-4 backdrop-blur-xl">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/20 px-4 py-3 lg:w-[360px]">
          <Search size={18} className="shrink-0 text-slate-500" />

          <input
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search protocols..."
            className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-600"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {(["All", ...categories] as const).map((category) => {
            const isActive = activeCategory === category;

            return (
              <button
                key={category}
                type="button"
                onClick={() => onCategoryChange(category)}
                className={`min-h-10 rounded-xl border px-4 py-2 text-sm font-bold transition ${
                  isActive
                    ? "border-emerald-400/40 bg-emerald-400/10 text-emerald-300"
                    : "border-white/10 bg-black/20 text-slate-400 hover:border-emerald-400/30 hover:text-white"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
