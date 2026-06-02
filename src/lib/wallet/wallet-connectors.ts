import { coinbaseWallet, injected, metaMask } from "wagmi/connectors";
import type { InjectedParameters } from "wagmi/connectors";
import { findDetectedWalletProvider } from "@/lib/wallet/detect-wallet-providers";
import type { EthereumWindow } from "@/lib/wallet/ethereum-provider";
import type { WalletMenuId } from "@/lib/wallet/wallet-menu";

type InjectedTargetObject = Extract<
  NonNullable<InjectedParameters["target"]>,
  { id: string; name: string }
>;

function detectedWalletTarget(
  walletId: Extract<WalletMenuId, "rabby" | "okx" | "brave" | "trust" | "coin98">,
  name: string,
): InjectedTargetObject {
  return {
    id: walletId,
    name,
    provider(window) {
      const provider = findDetectedWalletProvider(
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

const browserWalletTarget: InjectedTargetObject = {
  id: "browser-wallet",
  name: "Browser Wallet",
  provider(window) {
    return window?.ethereum as InjectedTargetObject["provider"] extends (
      ...args: never[]
    ) => infer R
      ? R
      : never;
  },
};

export const evmWalletConnectors = [
  metaMask({ dappMetadata: { name: "AeroRoute AI" } }),
  coinbaseWallet({
    appName: "AeroRoute AI",
  }),
  injected({ target: browserWalletTarget }),
  injected({ target: detectedWalletTarget("rabby", "Rabby") }),
  injected({ target: detectedWalletTarget("okx", "OKX Wallet") }),
  injected({ target: detectedWalletTarget("brave", "Brave Wallet") }),
  injected({ target: detectedWalletTarget("trust", "Trust Wallet") }),
  injected({ target: detectedWalletTarget("coin98", "Coin98") }),
];
