"use client";

import { Menu } from "lucide-react";
import { getNavTitle } from "./app-nav";
import { usePathname } from "next/navigation";
import { WalletStatusButtons } from "./wallet-status-buttons";

type HeaderProps = {
  onMenuClick: () => void;
};

export function Header({ onMenuClick }: HeaderProps) {
  const pathname = usePathname();
  const title = getNavTitle(pathname);
  const isDashboard = pathname === "/dashboard";

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
        <p
          className={
            isDashboard
              ? "hidden truncate text-sm font-black text-white md:block md:text-base"
              : "truncate text-sm font-black text-white md:text-base"
          }
        >
          {title}
        </p>
      </div>
      <WalletStatusButtons
        className={isDashboard ? "hidden md:flex" : undefined}
      />
    </header>
  );
}
