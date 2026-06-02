"use client";

import { useEffect, useState } from "react";
import { getConnectors } from "@wagmi/core";
import { useConfig } from "wagmi";
import type { Connector } from "wagmi";
import { detectBrowserWalletProviders } from "@/lib/wallet/detect-wallet-providers";
import { getWalletMenuItems } from "@/lib/wallet/wallet-menu";

export type WalletOption = {
  connectorUid: string;
  id: string;
  name: string;
  icon?: string;
  available: boolean;
  unavailableLabel: string;
};

function connectorIcon(connector: Connector): string | undefined {
  return typeof connector.icon === "string" ? connector.icon : undefined;
}

function isWalletAvailable(
  item: ReturnType<typeof getWalletMenuItems>[number],
  connector: Connector | undefined,
  detectedInstalled: boolean,
): boolean {
  if (!connector) return false;
  if (item.availability === "connector") return true;
  return detectedInstalled;
}

export function useWalletOptions(refreshToken = 0): WalletOption[] {
  const config = useConfig();
  const [options, setOptions] = useState<WalletOption[]>([]);

  useEffect(() => {
    let cancelled = false;

    function loadOptions() {
      const connectors = getConnectors(config);
      console.log("[wallet] connectors", connectors);

      const detectedWallets = detectBrowserWalletProviders();
      console.log("[wallet] detected browser wallets", detectedWallets);

      const installedById = new Map(
        detectedWallets.map((entry) => [entry.id, entry.installed]),
      );

      const menuItems = getWalletMenuItems();

      const nextOptions = menuItems.map((item) => {
        const connector = connectors.find(
          (candidate) => candidate.id === item.connectorId,
        );
        const detectedInstalled = installedById.get(item.id) ?? false;

        return {
          connectorUid: connector?.uid ?? `${item.connectorId}-missing`,
          id: item.id,
          name: item.name,
          icon: connector ? connectorIcon(connector) : undefined,
          available: isWalletAvailable(item, connector, detectedInstalled),
          unavailableLabel: item.unavailableLabel ?? "Not Installed",
        };
      });

      if (cancelled) return;
      setOptions(nextOptions);
    }

    loadOptions();

    return () => {
      cancelled = true;
    };
  }, [config, refreshToken]);

  return options;
}
