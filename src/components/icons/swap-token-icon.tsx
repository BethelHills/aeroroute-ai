"use client";

import { useState } from "react";
import type { SwapToken } from "@/lib/swap-tokens";
import { getSwapTokenIconUrls } from "@/lib/swap-token-icons";
import { cn } from "@/lib/utils";

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
  const urls = getSwapTokenIconUrls(token.symbol);
  const [urlIndex, setUrlIndex] = useState(0);

  const dim = size === "sm" ? "h-11 w-11 text-sm" : "h-12 w-12 text-sm";
  const px = size === "sm" ? 44 : 48;
  const currentUrl = urls[urlIndex];

  if (!currentUrl) {
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
        key={`${token.symbol}-${urlIndex}`}
        src={currentUrl}
        alt=""
        width={px}
        height={px}
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover"
        onError={() => {
          setUrlIndex((index) => index + 1);
        }}
      />
    </span>
  );
}

/** @deprecated Use getSwapTokenIconUrls from @/lib/swap-token-icons */
export function getSwapTokenIconUrl(symbol: string): string | undefined {
  return getSwapTokenIconUrls(symbol)[0];
}
