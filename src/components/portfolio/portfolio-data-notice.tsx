"use client";

import { cn, formatAddress } from "@aomi-labs/react";

type PortfolioDataNoticeProps = {
  isConnected: boolean;
  walletAddress?: string;
  className?: string;
};

export function PortfolioDataNotice({
  isConnected,
  walletAddress,
  className,
}: PortfolioDataNoticeProps) {
  const truncated =
    walletAddress && formatAddress(walletAddress)
      ? formatAddress(walletAddress)
      : walletAddress
        ? `${walletAddress.slice(0, 6)}…${walletAddress.slice(-4)}`
        : null;

  if (!isConnected) {
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
          — connect a wallet to personalize this view. Balances shown are mock
          until live indexing is enabled.
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
          — token balances below are mock until live balances are wired.
        </span>
      </p>
      <span className="inline-flex w-fit shrink-0 items-center rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-amber-200">
        Mock balances
      </span>
    </div>
  );
}
