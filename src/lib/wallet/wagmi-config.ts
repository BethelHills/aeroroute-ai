import { createConfig, http } from "wagmi";
import {
  coinbaseWallet,
  injected,
  metaMask,
  walletConnect,
} from "wagmi/connectors";
import { base } from "viem/chains";
import { getWalletConnectProjectId } from "@/lib/wallet/para-config";

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
    injected({ target: "rabby" }),
    injected({ target: "braveWallet" }),
    injected({ target: "rainbow" }),
    injected({ target: "okxWallet" }),
    injected({ target: "trustWallet" }),
    injected({ target: "phantom" }),
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
