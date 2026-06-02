"use client";

import { useEffect, useState, useSyncExternalStore, type ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import {
  AomiAuthAdapterProvider,
  DISCONNECTED_AUTH_ADAPTER,
} from "@/lib/aomi-auth-adapter/context";
import { WagmiAuthAdapterBridge } from "@/components/providers/wagmi-auth-adapter-bridge";
import { getEip6963Store } from "@/lib/wallet/eip6963-store";
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

function Eip6963Bootstrap() {
  useEffect(() => {
    getEip6963Store()?.reset();
  }, []);
  return null;
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
        <Eip6963Bootstrap />
        <WagmiAuthAdapterBridge>{children}</WagmiAuthAdapterBridge>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
