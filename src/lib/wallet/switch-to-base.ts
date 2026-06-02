import { getAccount, switchChain } from "@wagmi/core";
import type { Config } from "wagmi";
import { DEFAULT_CHAIN_ID } from "@/lib/wallet/para-config";

export function isOnBaseNetwork(chainId?: number | null): boolean {
  return chainId === DEFAULT_CHAIN_ID;
}

export async function switchToBaseNetwork(config: Config): Promise<void> {
  await switchChain(config, { chainId: DEFAULT_CHAIN_ID });
}

/** Prompt the wallet to switch to Base after connect when on the wrong network. */
export async function offerSwitchToBase(config: Config): Promise<void> {
  const { isConnected, chainId } = getAccount(config);
  if (!isConnected || isOnBaseNetwork(chainId)) {
    return;
  }

  try {
    await switchToBaseNetwork(config);
  } catch (error) {
    console.warn("[wallet] Base network switch declined or failed:", error);
  }
}
