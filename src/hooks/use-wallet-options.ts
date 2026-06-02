"use client";

import { useEffect, useState } from "react";
import { getConnectors } from "@wagmi/core";
import { useConfig } from "wagmi";
import type { Connector } from "wagmi";
import {
  detectWalletProviders,
  logDetectedWalletProviders,
} from "@/lib/wallet/detect-wallet-providers";
import { WALLET_MENU_ITEMS } from "@/lib/wallet/wallet-menu";

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

export function useWalletOptions(refreshToken = 0): WalletOption[] {
  const config = useConfig();
  const [options, setOptions] = useState<WalletOption[]>([]);

  useEffect(() => {
    let cancelled = false;

    async function loadOptions() {
      logDetectedWalletProviders();
      const detected = detectWalletProviders();
      const connectors = getConnectors(config);
      const installedById = new Map(
        detected.map((item) => [item.id, item.installed]),
      );

      const nextOptions = WALLET_MENU_ITEMS.map((item) => {
        const connector = connectors.find(
          (candidate) => candidate.id === item.connectorId,
        );
        const installed = installedById.get(item.id) ?? false;

        return {
          connectorUid: connector?.uid ?? `${item.connectorId}-missing`,
          id: item.id,
          name: item.name,
          icon: connector ? connectorIcon(connector) : undefined,
          available: installed && Boolean(connector),
          unavailableLabel: item.unavailableLabel ?? "Not Installed",
        };
      });

      if (cancelled) return;
      setOptions(nextOptions);
    }

    void loadOptions();

    return () => {
      cancelled = true;
    };
  }, [config, refreshToken]);

  return options;
}
