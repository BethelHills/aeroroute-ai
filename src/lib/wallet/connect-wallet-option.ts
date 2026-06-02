import { connect, getConnectors } from "@wagmi/core";
import type { Config } from "wagmi";
import type { WalletOption } from "@/hooks/use-wallet-options";
import { findWalletProviderById } from "@/lib/wallet/detect-wallet-providers";
import type { EthereumWindow } from "@/lib/wallet/ethereum-provider";
import { DEFAULT_CHAIN_ID } from "@/lib/wallet/para-config";
import { offerSwitchToBase } from "@/lib/wallet/switch-to-base";
import type { WalletMenuId } from "@/lib/wallet/wallet-menu";

const PROVIDER_REQUIRED_IDS = new Set<WalletMenuId>([
  "browser",
  "rabby",
  "okx",
  "brave",
  "trust",
  "coin98",
]);

function isProviderNotFoundError(error: unknown): boolean {
  if (!(error instanceof Error)) return false;
  return /provider not found|providernotfounderror/i.test(error.message);
}

function assertInjectedProvider(option: WalletOption): void {
  if (!PROVIDER_REQUIRED_IDS.has(option.id as WalletMenuId)) return;
  if (typeof window === "undefined") {
    throw new Error(`${option.name} is not installed.`);
  }

  const provider = findWalletProviderById(
    window as EthereumWindow,
    option.id as WalletMenuId,
  );

  if (!provider) {
    throw new Error(`${option.name} is not installed.`);
  }
}

export async function connectWalletOption(
  config: Config,
  option: WalletOption,
): Promise<void> {
  if (!option.available) {
    throw new Error(`${option.name} is not installed.`);
  }

  const connector = getConnectors(config).find(
    (item) => item.uid === option.connectorUid,
  );

  if (!connector) {
    throw new Error(`${option.name} is not available in this browser.`);
  }

  assertInjectedProvider(option);

  try {
    await connect(config, {
      connector,
      chainId: DEFAULT_CHAIN_ID,
    });
  } catch (error) {
    if (isProviderNotFoundError(error)) {
      throw new Error(`${option.name} is not installed.`);
    }
    throw error;
  }

  await offerSwitchToBase(config);
}
