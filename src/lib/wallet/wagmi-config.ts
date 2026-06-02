import { createConfig, http } from "wagmi";
import { coinbaseWallet, metaMask, walletConnect } from "wagmi/connectors";
import { base } from "viem/chains";
import { getWalletConnectProjectId } from "@/lib/wallet/para-config";
import { WALLETCONNECT_FEATURED_WALLET_IDS } from "@/lib/wallet/walletconnect-featured-wallets";

const projectId = getWalletConnectProjectId();
const hasWalletConnect = Boolean(projectId);

/** Registered wagmi connectors — each appears in the Select Wallet menu. */
export const wagmiConfig = createConfig({
  chains: [base],
  transports: {
    [base.id]: http(),
  },
  connectors: [
    metaMask({ dappMetadata: { name: "AeroRoute AI" } }),
    coinbaseWallet({ appName: "AeroRoute AI", preference: "all" }),
    ...(hasWalletConnect
      ? [
          walletConnect({
            projectId,
            showQrModal: true,
            metadata: {
              name: "AeroRoute AI",
              description: "Smart swap routes on Base",
              url: "https://aeroroute.ai",
              icons: [],
            },
            qrModalOptions: {
              explorerRecommendedWalletIds: [
                ...WALLETCONNECT_FEATURED_WALLET_IDS,
              ],
              themeMode: "dark",
              themeVariables: {
                "--wcm-z-index": "50000",
                "--wcm-accent-color": "#ffffff",
                "--wcm-background-color": "#061018",
              },
            },
          }),
        ]
      : []),
  ],
  ssr: true,
});
