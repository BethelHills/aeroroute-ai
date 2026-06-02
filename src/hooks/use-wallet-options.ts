"use client";

import { useEffect, useMemo, useState } from "react";
import type { EIP6963ProviderDetail } from "mipd";
import { useConfig } from "wagmi";
import { getEip6963Store } from "@/lib/wallet/eip6963-store";

export type WalletOption =
  | {
      kind: "connector";
      id: string;
      name: string;
      icon?: string;
      connectorUid: string;
    }
  | {
      kind: "eip6963";
      id: string;
      name: string;
      icon?: string;
      detail: EIP6963ProviderDetail;
    }
  | {
      kind: "named";
      id: string;
      name: string;
      target: NamedWalletTarget;
    };

export type NamedWalletTarget =
  | "metaMask"
  | "coinbaseWallet"
  | "rabby"
  | "braveWallet"
  | "rainbow"
  | "okxWallet"
  | "trustWallet"
  | "phantom";

/** Always listed so users can pick a wallet even before EIP-6963 announces. */
const FALLBACK_WALLETS: ReadonlyArray<{
  id: string;
  name: string;
  target: NamedWalletTarget;
}> = [
  { id: "fallback-metaMask", name: "MetaMask", target: "metaMask" },
  {
    id: "fallback-coinbaseWallet",
    name: "Coinbase Wallet",
    target: "coinbaseWallet",
  },
  { id: "fallback-rabby", name: "Rabby", target: "rabby" },
  { id: "fallback-braveWallet", name: "Brave Wallet", target: "braveWallet" },
  { id: "fallback-rainbow", name: "Rainbow", target: "rainbow" },
  { id: "fallback-okxWallet", name: "OKX Wallet", target: "okxWallet" },
  { id: "fallback-trustWallet", name: "Trust Wallet", target: "trustWallet" },
  { id: "fallback-phantom", name: "Phantom", target: "phantom" },
];

function normalizeName(name: string): string {
  return name.trim().toLowerCase();
}

function formatConnectorLabel(id: string, name: string): string {
  if (id === "injected") return "";
  if (normalizeName(name) === "injected") return "";
  return name;
}

function dedupeOptions(options: WalletOption[]): WalletOption[] {
  const seen = new Set<string>();
  return options.filter((option) => {
    const key = normalizeName(option.name);
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export function useWalletOptions(refreshToken = 0): WalletOption[] {
  const { connectors } = useConfig();
  const [eip6963Providers, setEip6963Providers] = useState<
    EIP6963ProviderDetail[]
  >([]);

  useEffect(() => {
    const store = getEip6963Store();
    if (!store) return;

    store.reset();
    setEip6963Providers([...store.getProviders()]);

    return store.subscribe((providers) => {
      setEip6963Providers([...providers]);
    });
  }, [refreshToken]);

  return useMemo(() => {
    const connectorOptions: Extract<WalletOption, { kind: "connector" }>[] = [];
    for (const connector of connectors) {
      const label = formatConnectorLabel(connector.id, connector.name);
      if (!label) continue;
      connectorOptions.push({
        kind: "connector",
        id: connector.id,
        name: label,
        icon: typeof connector.icon === "string" ? connector.icon : undefined,
        connectorUid: connector.uid,
      });
    }

    const eip6963Options: WalletOption[] = eip6963Providers.map((detail) => ({
      kind: "eip6963" as const,
      id: detail.info.uuid,
      name: detail.info.name,
      icon: detail.info.icon,
      detail,
    }));

    const existingNames = new Set(
      [...connectorOptions, ...eip6963Options].map((o) => normalizeName(o.name)),
    );

    const fallbackOptions: WalletOption[] = FALLBACK_WALLETS.filter(
      (wallet) => !existingNames.has(normalizeName(wallet.name)),
    ).map((wallet) => ({
      kind: "named" as const,
      id: wallet.id,
      name: wallet.name,
      target: wallet.target,
    }));

    const merged = dedupeOptions([
      ...eip6963Options,
      ...connectorOptions,
      ...fallbackOptions,
    ]);

    return merged.length > 0
      ? merged
      : FALLBACK_WALLETS.map((wallet) => ({
          kind: "named" as const,
          id: wallet.id,
          name: wallet.name,
          target: wallet.target,
        }));
  }, [connectors, eip6963Providers]);
}
