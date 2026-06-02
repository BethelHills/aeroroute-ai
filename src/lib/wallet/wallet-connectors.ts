import { coinbaseWallet, injected, metaMask } from "wagmi/connectors";
import type { InjectedParameters } from "wagmi/connectors";
import { findWalletProviderById } from "@/lib/wallet/detect-wallet-providers";
import type { EthereumWindow } from "@/lib/wallet/ethereum-provider";
import type { WalletMenuId } from "@/lib/wallet/wallet-menu";

type InjectedTargetObject = Extract<
  NonNullable<InjectedParameters["target"]>,
  { id: string; name: string }
>;

function injectedTarget(
  walletId: WalletMenuId,
  name: string,
): InjectedTargetObject {
  const id = walletId === "browser" ? "browser-wallet" : walletId;

  return {
    id,
    name,
    provider(window) {
      const provider = findWalletProviderById(
        window as EthereumWindow | undefined,
        walletId,
      );
      return provider as InjectedTargetObject["provider"] extends (
        ...args: never[]
      ) => infer R
        ? R
        : never;
    },
  };
}

export const evmWalletConnectors = [
  metaMask({ dappMetadata: { name: "AeroRoute AI" } }),
  coinbaseWallet({
    appName: "AeroRoute AI",
  }),
  injected({ target: injectedTarget("rabby", "Rabby") }),
  injected({ target: injectedTarget("okx", "OKX Wallet") }),
  injected({ target: injectedTarget("brave", "Brave Wallet") }),
  injected({ target: injectedTarget("trust", "Trust Wallet") }),
  injected({ target: injectedTarget("coin98", "Coin98") }),
  injected({ target: injectedTarget("browser", "Browser Wallet") }),
];
