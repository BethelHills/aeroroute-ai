"use client";

import {
  PROTOCOL_CATEGORIES,
  type ProtocolCategory,
} from "@/lib/protocols-data";
import { cn } from "@/lib/utils";

export type ProtocolCategoryFilterValue = ProtocolCategory | "All";

type ProtocolCategoryFilterProps = {
  value: ProtocolCategoryFilterValue;
  onChange: (value: ProtocolCategoryFilterValue) => void;
  counts: Record<ProtocolCategoryFilterValue, number>;
};

export function ProtocolCategoryFilter({
  value,
  onChange,
  counts,
}: ProtocolCategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {PROTOCOL_CATEGORIES.map((category) => {
        const active = value === category;
        return (
          <button
            key={category}
            type="button"
            onClick={() => onChange(category)}
            className={cn(
              "rounded-xl border px-4 py-2 text-sm font-bold transition",
              active
                ? "border-emerald-400/40 bg-emerald-400/10 text-emerald-300"
                : "border-white/10 bg-black/20 text-slate-400 hover:border-emerald-400/30 hover:text-white",
            )}
          >
            {category}
            <span
              className={cn(
                "ml-2 rounded-full px-2 py-0.5 text-xs",
                active ? "bg-emerald-400/20 text-emerald-200" : "bg-white/5",
              )}
            >
              {counts[category] ?? 0}
            </span>
          </button>
        );
      })}
    </div>
  );
}
