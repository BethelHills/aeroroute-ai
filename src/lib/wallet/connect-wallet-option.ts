import { connect, getConnectors } from "@wagmi/core";
import type { Config } from "wagmi";
import { DEFAULT_CHAIN_ID } from "@/lib/wallet/para-config";
import { offerSwitchToBase } from "@/lib/wallet/switch-to-base";
import type { WalletOption } from "@/hooks/use-wallet-options";

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

  await connect(config, {
    connector,
    chainId: DEFAULT_CHAIN_ID,
  });

  await offerSwitchToBase(config);
}
