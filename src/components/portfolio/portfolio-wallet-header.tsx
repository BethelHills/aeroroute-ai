"use client";

import { Network } from "lucide-react";
import { cn, formatAddress, getChainInfo } from "@aomi-labs/react";
import { useAccount, useChainId } from "wagmi";
import { ConnectButton } from "@/components/control-bar/connect-button";
import { WalletSelect } from "@/components/control-bar/wallet-select";

const DEFAULT_CHAIN_ID = Number(process.env.NEXT_PUBLIC_CHAIN_ID ?? 8453);

const connectButtonClass = cn(
  "h-auto min-h-0 w-full rounded-2xl border border-white/10 bg-white/[0.035] px-5 py-3 text-sm font-bold text-slate-200 shadow-none backdrop-blur-xl",
  "hover:bg-white/[0.06] hover:text-white",
  "focus-visible:ring-emerald-400/40 sm:w-auto",
);

const walletSelectClass = cn(
  connectButtonClass,
  "!rounded-2xl !border-white/10 !bg-white/[0.035] !px-5 !py-3 !text-sm !font-bold !text-slate-200",
  "hover:!bg-white/[0.06] hover:!text-white",
);

const statusPillClass =
  "inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-400 to-cyan-400 px-5 py-3 text-sm font-black text-[#041014] sm:w-auto";

type PortfolioWalletHeaderProps = {
  /** False during SSR / pre-hydration to avoid wagmi mismatch. */
  walletReady: boolean;
};

function PortfolioWalletHeaderStatic() {
  return (
    <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:flex-wrap sm:gap-3">
      <button
        type="button"
        disabled
        className={cn(connectButtonClass, "cursor-default opacity-90")}
      >
        Connect Wallet
      </button>
      <div className={statusPillClass} aria-label="Wallet not connected">
        <Network size={17} />
        Not Connected
      </div>
    </div>
  );
}

function PortfolioWalletHeaderLive() {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const resolvedChainId = chainId ?? DEFAULT_CHAIN_ID;
  const chainInfo = getChainInfo(resolvedChainId);
  const chainName = chainInfo?.ticker ?? chainInfo?.name ?? "Base";
  const onBase = resolvedChainId === DEFAULT_CHAIN_ID;

  return (
    <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:flex-wrap sm:gap-3">
      {isConnected ? (
        <ConnectButton
          connectLabel="Connect Wallet"
          className={connectButtonClass}
        />
      ) : (
        <WalletSelect
          connectLabel="Connect Wallet"
          menuId="aeroroute-portfolio-wallet-menu"
          className={walletSelectClass}
        />
      )}

      <div
        className={statusPillClass}
        aria-label={
          isConnected
            ? `Connected on ${chainName}${onBase ? ", Base network" : ""}`
            : "Wallet not connected"
        }
      >
        <Network size={17} />
        {isConnected ? (
          <>
            <span>Connected</span>
            <span className="opacity-80">· {chainName}</span>
            {onBase ? (
              <span className="rounded-full bg-[#041014]/15 px-2 py-0.5 text-xs font-black">
                On Base
              </span>
            ) : null}
          </>
        ) : (
          <span>Not Connected</span>
        )}
      </div>

      {isConnected && address ? (
        <p className="sr-only">
          Wallet {formatAddress(address) ?? address}
        </p>
      ) : null}
    </div>
  );
}

export function PortfolioWalletHeader({ walletReady }: PortfolioWalletHeaderProps) {
  if (!walletReady) {
    return <PortfolioWalletHeaderStatic />;
  }

  return <PortfolioWalletHeaderLive />;
}
