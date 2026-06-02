import { createConfig, http } from "wagmi";
import { base, mainnet } from "wagmi/chains";
import { evmWalletConnectors } from "@/lib/wallet/wallet-connectors";

export const wagmiConfig = createConfig({
  chains: [base, mainnet],
  connectors: evmWalletConnectors,
  transports: {
    [base.id]: http(),
    [mainnet.id]: http(),
  },
  ssr: true,
});
