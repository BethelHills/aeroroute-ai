"use client";

import { Menu, Network, Wallet } from "lucide-react";
import { getNavTitle } from "./app-nav";
import { usePathname } from "next/navigation";

type HeaderProps = {
  onMenuClick: () => void;
};

export function Header({ onMenuClick }: HeaderProps) {
  const pathname = usePathname();
  const title = getNavTitle(pathname);

  return (
    <header className="sticky top-0 z-20 flex h-14 shrink-0 items-center justify-between gap-4 border-b border-white/10 bg-[#03070b]/90 px-4 backdrop-blur-xl md:h-16 md:px-6">
      <div className="flex min-w-0 items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          className="rounded-xl border border-white/10 bg-white/[0.04] p-2 text-slate-300 hover:text-white md:hidden"
          aria-label="Open navigation menu"
        >
          <Menu size={20} />
        </button>
        <p className="truncate text-sm font-black text-white md:text-base">
          {title}
        </p>
      </div>
      <div className="flex shrink-0 flex-wrap items-center gap-2">
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
    </header>
  );
}
