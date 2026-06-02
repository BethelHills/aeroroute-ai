"use client";

import { useSyncExternalStore, useState, type ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import {
  AomiAuthAdapterProvider,
  DISCONNECTED_AUTH_ADAPTER,
} from "@/lib/aomi-auth-adapter/context";
import { WagmiAuthAdapterBridge } from "@/components/providers/wagmi-auth-adapter-bridge";
import { wagmiConfig } from "@/lib/wallet/wagmi-config";

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

function useIsClient() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

export function WalletProviders({ children }: WalletProvidersProps) {
  const mounted = useIsClient();
  const [queryClient] = useState(getQueryClient);

  if (!mounted) {
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
