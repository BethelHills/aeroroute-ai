import { createConfig, http } from "wagmi";
import { injected, walletConnect } from "wagmi/connectors";
import { base } from "viem/chains";
import { getWalletConnectProjectId } from "@/lib/wallet/para-config";

const projectId = getWalletConnectProjectId();
const hasWalletConnect =
  Boolean(projectId) && projectId !== "your_walletconnect_project_id";

export const wagmiConfig = createConfig({
  chains: [base],
  transports: {
    [base.id]: http(),
  },
  connectors: [
    injected({ shimDisconnect: true }),
    ...(hasWalletConnect
      ? [
          walletConnect({
            projectId,
            showQrModal: true,
          }),
        ]
      : []),
  ],
  ssr: true,
});
