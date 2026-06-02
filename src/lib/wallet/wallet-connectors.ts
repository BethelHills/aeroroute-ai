import { coinbaseWallet, injected, metaMask, walletConnect } from "wagmi/connectors";
import type { InjectedParameters } from "wagmi/connectors";
import {
  findDetectedWalletProvider,
  findWalletProviderById,
} from "@/lib/wallet/detect-wallet-providers";
import type { EthereumWindow } from "@/lib/wallet/ethereum-provider";
import type { WalletMenuId } from "@/lib/wallet/wallet-menu";
import {
  getWalletConnectProjectId,
  isWalletConnectConfigured,
} from "@/lib/wallet/walletconnect-config";

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
    const provider = findWalletProviderById(
      window as EthereumWindow | undefined,
      "browser",
    );
    return provider as InjectedTargetObject["provider"] extends (
      ...args: never[]
    ) => infer R
      ? R
      : never;
  },
};

function buildWalletConnectConnector() {
  const projectId = getWalletConnectProjectId();
  if (!projectId) return undefined;

  return walletConnect({
    projectId,
    metadata: {
      name: "AeroRoute AI",
      description: "Aerodrome route optimizer on Base",
      url:
        typeof window !== "undefined"
          ? window.location.origin
          : "https://aeroroute-ai.vercel.app",
      icons: ["https://aeroroute-ai.vercel.app/AeroRoute-AI-logo.png"],
    },
  });
}

const walletConnectEntry = isWalletConnectConfigured()
  ? buildWalletConnectConnector()
  : undefined;

export const evmWalletConnectors = [
  metaMask({ dappMetadata: { name: "AeroRoute AI" } }),
  coinbaseWallet({
    appName: "AeroRoute AI",
  }),
  injected({ target: browserWalletTarget }),
  ...(walletConnectEntry ? [walletConnectEntry] : []),
  injected({ target: detectedWalletTarget("rabby", "Rabby") }),
  injected({ target: detectedWalletTarget("okx", "OKX Wallet") }),
  injected({ target: detectedWalletTarget("brave", "Brave Wallet") }),
  injected({ target: detectedWalletTarget("trust", "Trust Wallet") }),
  injected({ target: detectedWalletTarget("coin98", "Coin98") }),
];
