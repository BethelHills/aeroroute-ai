import type { EIP1193Provider } from "viem";

export type ExtendedWalletProvider = EIP1193Provider & {
  isMetaMask?: boolean;
  isRabby?: boolean;
  isOkxWallet?: boolean;
  isOKExWallet?: boolean;
  isBraveWallet?: boolean;
  isCoin98?: boolean;
  isTrust?: boolean;
  isTrustWallet?: boolean;
  isCoinbaseWallet?: boolean;
  providers?: ExtendedWalletProvider[];
};

/** Minimal window shape for EIP-1193 provider detection (wagmi-compatible). */
export type EthereumWindow = {
  ethereum?: ExtendedWalletProvider;
  coinbaseWalletExtension?: ExtendedWalletProvider;
  navigator?: Navigator & { brave?: { isBrave?: () => boolean } };
};

export function getEthereumProviders(
  window?: EthereumWindow,
): ExtendedWalletProvider[] {
  if (!window) return [];

  const providers: ExtendedWalletProvider[] = [];

  if (window.coinbaseWalletExtension) {
    providers.push(window.coinbaseWalletExtension);
  }

  const eth = window.ethereum;
  if (!eth) {
    return providers;
  }

  if (Array.isArray(eth.providers) && eth.providers.length > 0) {
    for (const provider of eth.providers) {
      if (!providers.includes(provider)) {
        providers.push(provider);
      }
    }
    return providers;
  }

  if (!providers.includes(eth)) {
    providers.push(eth);
  }

  return providers;
}

export function isNamedWalletProvider(
  provider: ExtendedWalletProvider,
): boolean {
  return (
    Boolean(provider.isMetaMask && !provider.isRabby && !provider.isBraveWallet) ||
    Boolean(provider.isRabby) ||
    Boolean(provider.isOkxWallet || provider.isOKExWallet) ||
    Boolean(provider.isBraveWallet) ||
    Boolean(provider.isCoin98) ||
    Boolean(provider.isTrust || provider.isTrustWallet) ||
    Boolean(provider.isCoinbaseWallet)
  );
}
