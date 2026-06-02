"use client";

import { useMemo, useSyncExternalStore } from "react";
import type { EIP6963ProviderDetail } from "mipd";
import { useConfig } from "wagmi";
import { getEip6963Store } from "@/lib/wallet/eip6963-store";

export type WalletOption =
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
    }
  | {
      kind: "walletConnect";
      id: string;
      name: string;
      connectorId: string;
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

const NAMED_WALLET_CANDIDATES: ReadonlyArray<{
  target: NamedWalletTarget;
  name: string;
}> = [
  { target: "metaMask", name: "MetaMask" },
  { target: "coinbaseWallet", name: "Coinbase Wallet" },
  { target: "rabby", name: "Rabby" },
  { target: "braveWallet", name: "Brave Wallet" },
  { target: "rainbow", name: "Rainbow" },
  { target: "okxWallet", name: "OKX Wallet" },
  { target: "trustWallet", name: "Trust Wallet" },
  { target: "phantom", name: "Phantom" },
];

function flagForTarget(target: NamedWalletTarget): string {
  return `is${target[0].toUpperCase()}${target.slice(1)}`;
}

function isNamedWalletAvailable(target: NamedWalletTarget): boolean {
  if (typeof window === "undefined") return false;

  const ethereum = window.ethereum as
    | (Record<string, unknown> & {
        providers?: Array<Record<string, unknown>>;
      })
    | undefined;

  if (!ethereum) return false;

  const flag = flagForTarget(target);
  if (ethereum[flag] === true) return true;

  const providers = ethereum.providers;
  if (Array.isArray(providers)) {
    return providers.some((provider) => provider[flag] === true);
  }

  return false;
}

function subscribeEip6963(onChange: () => void) {
  const mipdStore = getEip6963Store();
  if (!mipdStore) return () => {};
  return mipdStore.subscribe(() => onChange());
}

function getEip6963Providers(): EIP6963ProviderDetail[] {
  const providers = getEip6963Store()?.getProviders() ?? [];
  return [...providers];
}

function buildEip6963Options(
  providers: EIP6963ProviderDetail[],
): WalletOption[] {
  return providers.map((detail) => ({
    kind: "eip6963" as const,
    id: detail.info.uuid,
    name: detail.info.name,
    icon: detail.info.icon,
    detail,
  }));
}

function buildNamedOptions(existingRdns: Set<string>): WalletOption[] {
  return NAMED_WALLET_CANDIDATES.filter(({ target, name }) => {
    if (!isNamedWalletAvailable(target)) return false;
    const rdnsKey = target.toLowerCase();
    if (existingRdns.has(rdnsKey)) return false;
    return true;
  }).map(({ target, name }) => ({
    kind: "named" as const,
    id: `named-${target}`,
    name,
    target,
  }));
}

function buildWalletConnectOption(
  connectors: ReturnType<typeof useConfig>["connectors"],
): WalletOption | null {
  const connector = connectors.find(
    (item) =>
      item.id === "walletConnect" ||
      item.type === "walletConnect" ||
      item.name === "WalletConnect",
  );
  if (!connector) return null;
  return {
    kind: "walletConnect",
    id: "wallet-connect",
    name: "WalletConnect",
    connectorId: connector.id,
  };
}

export function useWalletOptions(): WalletOption[] {
  const { connectors } = useConfig();
  const eip6963Providers = useSyncExternalStore(
    subscribeEip6963,
    getEip6963Providers,
    () => [],
  );

  return useMemo(() => {
    const eip6963Options = buildEip6963Options(eip6963Providers);
    const rdnsSet = new Set(
      eip6963Providers.map((p) => p.info.rdns.toLowerCase()),
    );
    const namedOptions = buildNamedOptions(rdnsSet);
    const walletConnect = buildWalletConnectOption(connectors);

    const merged: WalletOption[] = [
      ...eip6963Options,
      ...namedOptions,
      ...(walletConnect ? [walletConnect] : []),
    ];

    if (
      merged.length === 0 &&
      typeof window !== "undefined" &&
      window.ethereum
    ) {
      merged.push({
        kind: "named",
        id: "named-browser-ethereum",
        name: "Browser Wallet",
        target: "metaMask",
      });
    }

    const seen = new Set<string>();
    return merged.filter((option) => {
      const key = `${option.kind}:${option.id}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }, [connectors, eip6963Providers]);
}
