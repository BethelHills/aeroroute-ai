import { createConfig, http, type Config } from "wagmi";
import { coinbaseWallet, metaMask, walletConnect } from "wagmi/connectors";
import { base } from "viem/chains";
import { getAppOrigin } from "@/lib/wallet/app-origin";
import { getWalletConnectProjectId } from "@/lib/wallet/para-config";
import { WALLETCONNECT_FEATURED_WALLET_IDS } from "@/lib/wallet/walletconnect-featured-wallets";

function buildConnectors(appOrigin: string) {
  const projectId = getWalletConnectProjectId();
  const hasWalletConnect = Boolean(projectId);

  return [
    metaMask({ dappMetadata: { name: "AeroRoute AI" } }),
    coinbaseWallet({ appName: "AeroRoute AI", preference: "all" }),
    ...(hasWalletConnect
      ? [
          walletConnect({
            projectId,
            showQrModal: true,
            isNewChainsStale: false,
            metadata: {
              name: "AeroRoute AI",
              description: "Smart swap routes on Base",
              url: appOrigin,
              icons: [`${appOrigin}/file.svg`],
            },
            qrModalOptions: {
              explorerRecommendedWalletIds: [
                ...WALLETCONNECT_FEATURED_WALLET_IDS,
              ],
              themeMode: "dark",
              themeVariables: {
                "--wcm-z-index": "50000",
                // QR modules must contrast with the white QR canvas (not white-on-white).
                "--wcm-accent-color": "#061018",
                "--wcm-background-color": "#061018",
              },
            },
          }),
        ]
      : []),
  ];
}

/** Create wagmi config using the current deployment origin (required for WalletConnect). */
export function createWagmiConfig(appOrigin = getAppOrigin()): Config {
  return createConfig({
    chains: [base],
    transports: {
      [base.id]: http(),
    },
    connectors: buildConnectors(appOrigin),
    ssr: true,
  });
}

let browserWagmiConfig: Config | undefined;

/** Client-only singleton; defers creation until the browser origin is known. */
export function getWagmiConfig(): Config {
  if (typeof window === "undefined") {
    return createWagmiConfig();
  }

  if (!browserWagmiConfig) {
    browserWagmiConfig = createWagmiConfig(window.location.origin);
  }

  return browserWagmiConfig;
}
