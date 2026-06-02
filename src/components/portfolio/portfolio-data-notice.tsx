"use client";

import { cn, formatAddress } from "@aomi-labs/react";
import type { PortfolioDataMode } from "@/lib/portfolio-data";

type PortfolioDataNoticeProps = {
  dataMode: PortfolioDataMode;
  walletAddress?: string;
  isLoading?: boolean;
  readFailed?: boolean;
  className?: string;
};

export function PortfolioDataNotice({
  dataMode,
  walletAddress,
  isLoading = false,
  readFailed = false,
  className,
}: PortfolioDataNoticeProps) {
  const truncated =
    walletAddress && formatAddress(walletAddress)
      ? formatAddress(walletAddress)
      : walletAddress
        ? `${walletAddress.slice(0, 6)}…${walletAddress.slice(-4)}`
        : null;

  if (dataMode === "Demo") {
    return (
      <div
        className={cn(
          "rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-slate-400",
          className,
        )}
      >
        <span className="font-semibold text-slate-300">Demo portfolio data</span>
        <span className="text-slate-500">
          {" "}
          — connect a wallet on Base to load live ETH, USDC, and AERO balances.
        </span>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex flex-col gap-2 rounded-2xl border border-emerald-400/20 bg-emerald-400/5 px-4 py-3 sm:flex-row sm:items-center sm:justify-between",
        className,
      )}
    >
      <p className="text-sm text-slate-300">
        <span className="font-semibold text-emerald-200">Wallet connected</span>
        {truncated ? (
          <span className="text-slate-400"> · {truncated}</span>
        ) : null}
        <span className="text-slate-500">
          {" "}
          — ETH, USDC, and AERO balances are on-chain.
          {isLoading ? " Loading…" : ""}
          {readFailed
            ? " Some token reads failed; affected balances show as 0."
            : " DAI and USDbC rows remain demo until indexed."}
        </span>
      </p>
      <span className="inline-flex w-fit shrink-0 items-center rounded-full border border-emerald-400/35 bg-emerald-400/15 px-3 py-1 text-xs font-bold uppercase tracking-wide text-emerald-200">
        Live wallet data
      </span>
    </div>
  );
}
