"use client";

import { Network } from "lucide-react";
import { cn, getChainInfo } from "@aomi-labs/react";
import { useAccount, useChainId, useConfig } from "wagmi";
import { ConnectButton } from "@/components/control-bar/connect-button";
import { WalletSelect } from "@/components/control-bar/wallet-select";
import { DEFAULT_CHAIN_ID } from "@/lib/wallet/para-config";
import { isOnBaseNetwork, switchToBaseNetwork } from "@/lib/wallet/switch-to-base";

const connectButtonClass = cn(
  "pointer-events-auto relative z-10 min-h-11 w-full cursor-pointer touch-manipulation rounded-xl border border-white/10 bg-white/[0.035] px-4 py-2.5 text-sm font-bold text-slate-200 shadow-none",
  "hover:bg-white/[0.06] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/50 sm:w-auto",
);

const walletSelectClass = cn(
  connectButtonClass,
  "!rounded-xl !border-white/10 !bg-white/[0.035] !font-bold !text-slate-200",
);

const chainButtonClass = cn(
  "pointer-events-auto relative z-10 inline-flex min-h-11 w-full min-w-0 cursor-pointer touch-manipulation items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-400 to-cyan-400 px-4 py-2.5 text-sm font-black text-[#041014] shadow-none",
  "hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/50 sm:w-auto",
);

const chainDisplayClass = cn(
  chainButtonClass,
  "cursor-default hover:opacity-100",
);

type SettingsWalletActionsProps = {
  walletReady: boolean;
  className?: string;
};

function SettingsWalletActionsStatic() {
  return (
    <div className="flex w-full min-w-0 flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
      <button
        type="button"
        disabled
        className={cn(connectButtonClass, "cursor-default opacity-90")}
      >
        Connect Wallet
      </button>
      <div className={chainDisplayClass} aria-label="Network Base 8453">
        <Network size={16} className="shrink-0" />
        <span>Base</span>
        <span className="opacity-80">{DEFAULT_CHAIN_ID}</span>
      </div>
    </div>
  );
}

function SettingsWalletActionsLive() {
  const { isConnected } = useAccount();
  const chainId = useChainId();
  const wagmiConfig = useConfig();
  const resolvedChainId = chainId ?? DEFAULT_CHAIN_ID;
  const chainInfo = getChainInfo(resolvedChainId);
  const chainName = chainInfo?.ticker ?? chainInfo?.name ?? "Base";
  const onBase = isOnBaseNetwork(resolvedChainId);

  const handleBaseClick = () => {
    if (!isConnected || onBase) return;
    void switchToBaseNetwork(wagmiConfig).catch((error: unknown) => {
      console.warn("[settings] Base network switch failed:", error);
    });
  };

  return (
    <div className="flex w-full min-w-0 flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
      {isConnected ? (
        <ConnectButton connectLabel="Connect Wallet" className={connectButtonClass} />
      ) : (
        <WalletSelect
          connectLabel="Connect Wallet"
          menuId="aeroroute-settings-wallet-menu"
          className={walletSelectClass}
        />
      )}

      {isConnected ? (
        <button
          type="button"
          onClick={handleBaseClick}
          className={cn(
            chainButtonClass,
            onBase && "cursor-default hover:opacity-100",
          )}
          aria-label={
            onBase ? "Connected to Base" : "Switch to Base network"
          }
        >
          <Network size={16} className="shrink-0" />
          <span>{chainName}</span>
          <span className="opacity-80">{DEFAULT_CHAIN_ID}</span>
        </button>
      ) : (
        <div className={chainDisplayClass} aria-label="Network Base 8453">
          <Network size={16} className="shrink-0" />
          <span>Base</span>
          <span className="opacity-80">{DEFAULT_CHAIN_ID}</span>
        </div>
      )}
    </div>
  );
}

export function SettingsWalletActions({
  walletReady,
  className,
}: SettingsWalletActionsProps) {
  return (
    <div className={cn("w-full min-w-0", className)}>
      {walletReady ? (
        <SettingsWalletActionsLive />
      ) : (
        <SettingsWalletActionsStatic />
      )}
    </div>
  );
}
