"use client";

import type { ReactNode } from "react";
import { AomiAuthAdapterProvider } from "@/lib/aomi-auth-adapter/context";
import { useWagmiAuthAdapter } from "@/lib/aomi-auth-adapter/use-wagmi-auth-adapter";

type WagmiAuthAdapterBridgeProps = {
  children: ReactNode;
};

export function WagmiAuthAdapterBridge({
  children,
}: WagmiAuthAdapterBridgeProps) {
  const adapter = useWagmiAuthAdapter();

  return (
    <AomiAuthAdapterProvider value={adapter}>{children}</AomiAuthAdapterProvider>
  );
}
