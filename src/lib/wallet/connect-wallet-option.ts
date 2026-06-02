import { injected } from "wagmi/connectors";
import type { Connector } from "wagmi";
import type { Config } from "wagmi";
import { connect } from "@wagmi/core";
import { DEFAULT_CHAIN_ID } from "@/lib/wallet/para-config";
import type { WalletOption } from "@/hooks/use-wallet-options";

export async function connectWalletOption(
  config: Config,
  option: WalletOption,
  connectors: readonly Connector[],
): Promise<void> {
  if (option.kind === "connector") {
    const connector = connectors.find(
      (item) =>
        item.uid === option.connectorUid || item.id === option.id,
    );
    if (!connector) {
      throw new Error(`${option.name} is not available in this browser.`);
    }
    await connect(config, {
      connector,
      chainId: DEFAULT_CHAIN_ID,
    });
    return;
  }

  if (option.kind === "eip6963") {
    const { info, provider } = option.detail;
    await connect(config, {
      connector: injected({
        target: {
          id: info.rdns,
          name: info.name,
          icon: info.icon,
          provider,
        },
      }),
      chainId: DEFAULT_CHAIN_ID,
    });
    return;
  }

  await connect(config, {
    connector: injected({ target: option.target }),
    chainId: DEFAULT_CHAIN_ID,
  });
}
