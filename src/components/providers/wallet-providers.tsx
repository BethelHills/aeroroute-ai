"use client";

import { useState, type ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { wagmiConfig } from "@/lib/wallet/wagmi-config";
import { WagmiAuthAdapterBridge } from "@/components/providers/wagmi-auth-adapter-bridge";

type WalletProvidersProps = {
  children: ReactNode;
};

export function WalletProviders({ children }: WalletProvidersProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <WagmiAuthAdapterBridge>{children}</WagmiAuthAdapterBridge>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
