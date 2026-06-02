"use client";

import type { ReactNode } from "react";
import { WalletProviders } from "@/components/providers/wallet-providers";

type AppProvidersProps = {
  children: ReactNode;
};

/** Root-level providers (wagmi, wallet auth adapter). */
export function AppProviders({ children }: AppProvidersProps) {
  return <WalletProviders>{children}</WalletProviders>;
}
