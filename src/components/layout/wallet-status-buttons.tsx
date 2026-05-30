"use client";

import { Network, Wallet } from "lucide-react";
import { cn } from "@/lib/utils";

type WalletStatusButtonsProps = {
  className?: string;
};

export function WalletStatusButtons({ className }: WalletStatusButtonsProps) {
  return (
    <div className={cn("flex shrink-0 items-center gap-2", className)}>
      <button
        type="button"
        className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.035] px-3 py-2 text-xs font-bold text-slate-200 md:px-4 md:text-sm"
      >
        <Wallet size={16} />
        <span className="hidden sm:inline">0x8f...3a29</span>
      </button>
      <button
        type="button"
        className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-400 to-cyan-400 px-3 py-2 text-xs font-black text-[#041014] md:px-4 md:text-sm"
      >
        <Network size={16} />
        <span className="hidden sm:inline">Base</span>
      </button>
    </div>
  );
}
