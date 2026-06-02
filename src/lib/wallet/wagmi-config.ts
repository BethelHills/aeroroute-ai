import { createConfig, http } from "wagmi";
import { base, mainnet } from "wagmi/chains";
import {
  coinbaseWallet,
  injected,
  metaMask,
  walletConnect,
} from "wagmi/connectors";

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID?.trim();

const WALLETCONNECT_APP_URL = "https://aeroroute-ai.vercel.app";

const walletConnectMetadata = {
  name: "AeroRoute AI",
  description: "AI-powered Aerodrome route optimizer on Base",
  url: WALLETCONNECT_APP_URL,
  icons: [`${WALLETCONNECT_APP_URL}/icon.png`],
};

const hasWalletConnect =
  Boolean(projectId) &&
  projectId !== "your_project_id" &&
  projectId !== "your_walletconnect_project_id";

const connectors = [
  metaMask({ dappMetadata: { name: "AeroRoute AI" } }),
  coinbaseWallet({
    appName: "AeroRoute AI",
  }),
  injected(),
  ...(hasWalletConnect
    ? [
        walletConnect({
          projectId: projectId!,
          metadata: walletConnectMetadata,
          showQrModal: true,
          isNewChainsStale: false,
          qrModalOptions: {
            themeMode: "dark",
            themeVariables: {
              "--wcm-z-index": "50000",
              "--wcm-accent-color": "#061018",
              "--wcm-background-color": "#061018",
            },
          },
        }),
      ]
    : []),
];

export const wagmiConfig = createConfig({
  chains: [base, mainnet],
  connectors,
  transports: {
    [base.id]: http(),
    [mainnet.id]: http(),
  },
  ssr: true,
});
