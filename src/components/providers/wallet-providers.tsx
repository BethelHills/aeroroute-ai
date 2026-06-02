"use client";

import "@/components/wallet/walletconnect-modal.css";
import { useEffect, useState, type ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider, type Config } from "wagmi";
import {
  AomiAuthAdapterProvider,
  DISCONNECTED_AUTH_ADAPTER,
} from "@/lib/aomi-auth-adapter/context";
import { WagmiAuthAdapterBridge } from "@/components/providers/wagmi-auth-adapter-bridge";
import { getWagmiConfig } from "@/lib/wallet/wagmi-config";

type WalletProvidersProps = {
  children: ReactNode;
};

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60_000,
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined;

function getQueryClient() {
  if (typeof window === "undefined") {
    return makeQueryClient();
  }
  if (!browserQueryClient) {
    browserQueryClient = makeQueryClient();
  }
  return browserQueryClient;
}

export function WalletProviders({ children }: WalletProvidersProps) {
  const [wagmiConfig, setWagmiConfig] = useState<Config | null>(null);
  const [queryClient] = useState(getQueryClient);

  useEffect(() => {
    setWagmiConfig(getWagmiConfig());
  }, []);

  if (!wagmiConfig) {
    return (
      <AomiAuthAdapterProvider value={DISCONNECTED_AUTH_ADAPTER}>
        {children}
      </AomiAuthAdapterProvider>
    );
  }

  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <WagmiAuthAdapterBridge>{children}</WagmiAuthAdapterBridge>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
