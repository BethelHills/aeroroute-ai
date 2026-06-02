"use client";

import { Logo } from "@/components/landing/logo";
import { Menu } from "lucide-react";
import { getNavTitle, isAppShellRoute } from "./app-nav";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { WalletStatusButtons } from "./wallet-status-buttons";

type HeaderProps = {
  onMenuClick: () => void;
};

export function Header({ onMenuClick }: HeaderProps) {
  const pathname = usePathname();
  const title = getNavTitle(pathname);
  const appShell = isAppShellRoute(pathname);

  return (
    <header
      className={cn(
        "sticky top-0 z-20 flex shrink-0 items-center justify-between gap-2 border-b border-white/10 bg-[#03070b]/90 px-4 backdrop-blur-xl sm:gap-3 sm:px-6",
        appShell ? "h-14 md:hidden" : "h-14 md:h-16",
      )}
    >
      <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          className="shrink-0 rounded-xl border border-white/10 bg-white/[0.04] p-2.5 text-slate-300 hover:text-white md:hidden"
          aria-label="Open navigation menu"
        >
          <Menu size={20} />
        </button>
        {appShell ? (
          <Logo
            priority
            href="/dashboard"
            alt="AeroRoute AI"
            linkClassName="min-w-0 shrink"
            className="h-auto w-[130px] max-w-[calc(100vw-7rem)] md:w-[170px] lg:w-[220px]"
          />
        ) : (
          <p className="min-w-0 truncate text-sm font-black text-white md:text-base">
            {title}
          </p>
        )}
      </div>
      {!appShell && (
        <div className="shrink-0">
          <WalletStatusButtons />
        </div>
      )}
    </header>
  );
}
