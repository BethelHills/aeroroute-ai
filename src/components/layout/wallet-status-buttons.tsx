"use client";

import { Network } from "lucide-react";
import { cn, getChainInfo } from "@aomi-labs/react";
import { ConnectButton } from "@/components/control-bar/connect-button";
import { NetworkSelect } from "@/components/control-bar/network-select";
import { SwitchToBasePrompt } from "@/components/wallet/switch-to-base-prompt";
import { useAomiAuthAdapter } from "@/lib/aomi-auth-adapter";

const DEFAULT_CHAIN_ID = Number(process.env.NEXT_PUBLIC_CHAIN_ID ?? 8453);

type WalletStatusButtonsProps = {
  className?: string;
  /** `hero` matches protocols page header sizing; `compact` matches dashboard titles. */
  variant?: "compact" | "hero";
};

export function WalletStatusButtons({
  className,
  variant = "compact",
}: WalletStatusButtonsProps) {
  const { identity } = useAomiAuthAdapter();
  const isHero = variant === "hero";
  const chainId = identity.chainId ?? DEFAULT_CHAIN_ID;
  const chainInfo = getChainInfo(chainId);
  const chainName = chainInfo?.ticker ?? chainInfo?.name ?? "Base";

  const connectClass = cn(
    "cursor-pointer shadow-none focus-visible:ring-emerald-400/40",
    isHero
      ? "h-auto min-h-0 rounded-2xl border border-white/10 bg-white/[0.035] px-5 py-3 text-sm font-bold text-slate-200 backdrop-blur-xl hover:bg-white/[0.06] hover:text-white"
      : "h-auto min-h-0 rounded-xl border border-white/10 bg-white/[0.035] px-3 py-2 text-xs font-bold text-slate-200 hover:bg-white/[0.06] md:px-4 md:text-sm",
  );

  const chainClass = cn(
    "shadow-none",
    isHero
      ? "h-auto min-h-0 rounded-2xl bg-gradient-to-r from-emerald-400 to-cyan-400 px-5 py-3 text-sm font-black text-[#041014] hover:opacity-95"
      : "h-auto min-h-0 rounded-xl bg-gradient-to-r from-emerald-400 to-cyan-400 px-3 py-2 text-xs font-black text-[#041014] hover:opacity-95 md:px-4 md:text-sm",
  );

  return (
    <div className={cn("flex flex-col items-end gap-2 sm:items-stretch", className)}>
      <SwitchToBasePrompt variant="compact" className="w-full max-w-md sm:max-w-lg" />
      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
        <ConnectButton connectLabel="Connect Wallet" className={connectClass} />

        {identity.isConnected ? (
          <NetworkSelect
            showChainId
            className={cn(
              chainClass,
              "text-[#041014] hover:bg-gradient-to-r hover:from-emerald-400 hover:to-cyan-400 hover:text-[#041014]",
            )}
          />
        ) : (
          <div
            className={cn(chainClass, "inline-flex items-center gap-2")}
            aria-label={`Network ${chainName} ${DEFAULT_CHAIN_ID}`}
          >
            <Network size={isHero ? 17 : 16} className="shrink-0" />
            <span>{chainName}</span>
            <span className="opacity-80">{DEFAULT_CHAIN_ID}</span>
          </div>
        )}
      </div>
    </div>
  );
}
