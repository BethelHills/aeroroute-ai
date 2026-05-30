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
        "sticky top-0 z-20 flex shrink-0 items-center justify-between gap-3 border-b border-white/10 bg-[#03070b]/90 px-3 backdrop-blur-xl sm:px-4",
        appShell ? "h-[4.25rem] md:hidden" : "h-14 md:h-16 md:px-6",
      )}
    >
      <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          className="shrink-0 rounded-xl border border-white/10 bg-white/[0.04] p-2 text-slate-300 hover:text-white"
          aria-label="Open navigation menu"
        >
          <Menu size={20} />
        </button>
        {appShell ? (
          <Logo
            priority
            href="/dashboard"
            linkClassName="flex-1"
            className="h-12 w-auto max-w-[min(17rem,calc(100vw-4.5rem))] sm:h-14 sm:max-w-[19rem]"
          />
        ) : (
          <p className="min-w-0 truncate text-sm font-black text-white md:text-base">
            {title}
          </p>
        )}
      </div>
      {!appShell && <WalletStatusButtons />}
    </header>
  );
}
