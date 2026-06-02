"use client";

import { useEffect, useState } from "react";
import { getConnectors } from "@wagmi/core";
import { useConfig } from "wagmi";
import type { Connector } from "wagmi";

export type WalletOption = {
  connectorUid: string;
  id: string;
  name: string;
  icon?: string;
  available: boolean;
};

function connectorIcon(connector: Connector): string | undefined {
  return typeof connector.icon === "string" ? connector.icon : undefined;
}

async function isConnectorAvailable(connector: Connector): Promise<boolean> {
  if (connector.type === "walletConnect") {
    return true;
  }

  if (typeof connector.getProvider !== "function") {
    return false;
  }

  try {
    const provider = await connector.getProvider();
    return Boolean(provider);
  } catch {
    return false;
  }
}

function logConnectors(connectors: readonly Connector[]) {
  console.log(
    "[wallet] getConnectors()",
    connectors.map((connector) => ({
      id: connector.id,
      name: connector.name,
      type: connector.type,
      uid: connector.uid,
    })),
  );
}

export function useWalletOptions(refreshToken = 0): WalletOption[] {
  const config = useConfig();
  const [options, setOptions] = useState<WalletOption[]>([]);

  useEffect(() => {
    let cancelled = false;

    async function loadOptions() {
      const connectors = getConnectors(config);
      logConnectors(connectors);

      const probed = await Promise.all(
        connectors.map(async (connector) => ({
          connectorUid: connector.uid,
          id: connector.id,
          name: connector.name,
          icon: connectorIcon(connector),
          available: await isConnectorAvailable(connector),
        })),
      );

      if (cancelled) return;

      probed.sort((a, b) => {
        if (a.available === b.available) return a.name.localeCompare(b.name);
        return a.available ? -1 : 1;
      });

      setOptions(probed);
    }

    void loadOptions();

    return () => {
      cancelled = true;
    };
  }, [config, refreshToken]);

  return options;
}
