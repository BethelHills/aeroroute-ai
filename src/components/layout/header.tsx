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
        "sticky top-0 z-20 flex h-14 shrink-0 items-center justify-between gap-4 border-b border-white/10 bg-[#03070b]/90 px-4 backdrop-blur-xl md:h-16 md:px-6",
        appShell && "md:hidden",
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
            className="h-8 w-auto max-w-[min(11rem,calc(100vw-5.25rem))] sm:h-9 sm:max-w-[12rem]"
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
