"use client";

import { useState } from "react";
import type { SwapToken } from "@/lib/swap-tokens";
import { cn } from "@/lib/utils";

const CRYPTO_ICON_CDN =
  "https://cdn.jsdelivr.net/gh/spothq/cryptocurrency-icons@master/svg/color";

/** Maps swap symbols to cryptocurrency-icons slugs (lowercase). */
const SYMBOL_ICON_SLUG: Record<string, string> = {
  ETH: "eth",
  WETH: "weth",
  cbBTC: "btc",
  WBTC: "wbtc",
  USDC: "usdc",
  USDT: "usdt",
  USDbC: "usdc",
  DAI: "dai",
  LINK: "link",
  UNI: "uni",
  OP: "op",
};

/** Symbols that need a custom logo URL (not in cryptocurrency-icons). */
const CUSTOM_ICON_URL: Record<string, string> = {
  AERO: "https://assets.coingecko.com/coins/images/31745/small/symbol.png",
};

export function getSwapTokenIconUrl(symbol: string): string | undefined {
  if (CUSTOM_ICON_URL[symbol]) {
    return CUSTOM_ICON_URL[symbol];
  }
  const slug = SYMBOL_ICON_SLUG[symbol];
  if (!slug) return undefined;
  return `${CRYPTO_ICON_CDN}/${slug}.svg`;
}

type SwapTokenIconProps = {
  token: Pick<SwapToken, "symbol" | "color">;
  size?: "sm" | "md";
  className?: string;
};

export function SwapTokenIcon({
  token,
  size = "md",
  className,
}: SwapTokenIconProps) {
  const [failed, setFailed] = useState(false);
  const iconUrl = getSwapTokenIconUrl(token.symbol);
  const dim = size === "sm" ? "h-11 w-11 text-sm" : "h-12 w-12 text-sm";

  if (!iconUrl || failed) {
    return (
      <span
        className={cn(
          "flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br font-black text-white shadow-[0_0_24px_rgba(0,245,160,0.18)]",
          token.color,
          dim,
          className,
        )}
        aria-hidden
      >
        {token.symbol.slice(0, 1)}
      </span>
    );
  }

  return (
    <span
      className={cn(
        "relative shrink-0 overflow-hidden rounded-full bg-[#0a1218] ring-1 ring-white/15",
        dim,
        className,
      )}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={iconUrl}
        alt=""
        width={size === "sm" ? 44 : 48}
        height={size === "sm" ? 44 : 48}
        className="h-full w-full object-cover"
        onError={() => setFailed(true)}
      />
    </span>
  );
}
