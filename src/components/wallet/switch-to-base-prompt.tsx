"use client";

import { useState, type FC } from "react";
import { AlertTriangle, ArrowRightLeft } from "lucide-react";
import { cn, getChainInfo } from "@aomi-labs/react";
import { useAomiAuthAdapter } from "@/lib/aomi-auth-adapter";
import { DEFAULT_CHAIN_ID } from "@/lib/wallet/para-config";
import { isOnBaseNetwork } from "@/lib/wallet/switch-to-base";

type SwitchToBasePromptProps = {
  className?: string;
  variant?: "default" | "compact";
};

export const SwitchToBasePrompt: FC<SwitchToBasePromptProps> = ({
  className,
  variant = "default",
}) => {
  const adapter = useAomiAuthAdapter();
  const { identity, switchChain, isSwitchingChain } = adapter;
  const [error, setError] = useState<string | null>(null);

  if (!identity.isConnected || identity.chainId == null) {
    return null;
  }

  if (isOnBaseNetwork(identity.chainId) || !switchChain) {
    return null;
  }

  const networkName =
    getChainInfo(identity.chainId)?.name ??
    getChainInfo(identity.chainId)?.ticker ??
    `Chain ${identity.chainId}`;

  const handleSwitch = () => {
    setError(null);
    void switchChain(DEFAULT_CHAIN_ID).catch((err: unknown) => {
      setError(
        err instanceof Error ? err.message : "Could not switch to Base.",
      );
    });
  };

  const isCompact = variant === "compact";

  return (
    <div
      className={cn(
        "flex flex-col gap-3 rounded-2xl border border-orange-400/30 bg-gradient-to-r from-orange-400/10 via-amber-400/5 to-emerald-400/10",
        isCompact ? "px-3 py-2.5 sm:flex-row sm:items-center sm:justify-between" : "px-4 py-3",
        className,
      )}
      role="status"
    >
      <div className="flex min-w-0 items-start gap-2.5">
        <AlertTriangle
          className={cn(
            "shrink-0 text-orange-300",
            isCompact ? "mt-0.5 size-4" : "mt-0.5 size-5",
          )}
        />
        <div className="min-w-0">
          <p
            className={cn(
              "font-semibold text-white",
              isCompact ? "text-sm" : "text-sm sm:text-base",
            )}
          >
            Switch to Base to use AeroRoute
          </p>
          <p className="mt-0.5 text-xs leading-relaxed text-slate-400 sm:text-sm">
            Current connection is on {networkName}. AeroRoute runs on Base (
            {DEFAULT_CHAIN_ID}).
          </p>
          {error ? (
            <p className="mt-1 text-xs text-red-300">{error}</p>
          ) : null}
        </div>
      </div>
      <button
        type="button"
        onClick={handleSwitch}
        disabled={isSwitchingChain}
        className={cn(
          "inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-400 to-cyan-400 font-bold text-[#041014] transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60",
          isCompact
            ? "self-start px-4 py-2 text-xs sm:self-auto sm:text-sm"
            : "px-5 py-2.5 text-sm",
        )}
      >
        <ArrowRightLeft className="size-4 shrink-0" />
        {isSwitchingChain ? "Switching…" : "Switch to Base"}
      </button>
    </div>
  );
};
