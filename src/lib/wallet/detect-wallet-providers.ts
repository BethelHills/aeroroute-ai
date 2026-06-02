import {
  getEthereumProviders,
  isNamedWalletProvider,
  type EthereumWindow,
  type ExtendedWalletProvider,
} from "@/lib/wallet/ethereum-provider";
import {
  WALLET_MENU_ITEMS,
  type WalletMenuId,
} from "@/lib/wallet/wallet-menu";

export type DetectedWalletProvider = {
  id: WalletMenuId;
  name: string;
  installed: boolean;
};

function findMetaMaskProvider(
  window?: EthereumWindow,
): ExtendedWalletProvider | undefined {
  return getEthereumProviders(window).find(
    (provider) =>
      Boolean(provider.isMetaMask) &&
      !provider.isRabby &&
      !provider.isBraveWallet,
  );
}

function findRabbyProvider(
  window?: EthereumWindow,
): ExtendedWalletProvider | undefined {
  return getEthereumProviders(window).find((provider) =>
    Boolean(provider.isRabby),
  );
}

function findOkxProvider(
  window?: EthereumWindow,
): ExtendedWalletProvider | undefined {
  return getEthereumProviders(window).find(
    (provider) => Boolean(provider.isOkxWallet || provider.isOKExWallet),
  );
}

function findBraveProvider(
  window?: EthereumWindow,
): ExtendedWalletProvider | undefined {
  const braveProvider = getEthereumProviders(window).find((provider) =>
    Boolean(provider.isBraveWallet),
  );
  if (braveProvider) return braveProvider;

  if (window?.navigator?.brave?.isBrave?.() && window.ethereum?.isBraveWallet) {
    return window.ethereum;
  }

  return undefined;
}

function findTrustProvider(
  window?: EthereumWindow,
): ExtendedWalletProvider | undefined {
  return getEthereumProviders(window).find((provider) =>
    Boolean(provider.isTrust || provider.isTrustWallet),
  );
}

function findCoin98Provider(
  window?: EthereumWindow,
): ExtendedWalletProvider | undefined {
  return getEthereumProviders(window).find((provider) =>
    Boolean(provider.isCoin98),
  );
}

function findCoinbaseProvider(
  window?: EthereumWindow,
): ExtendedWalletProvider | undefined {
  if (window?.coinbaseWalletExtension) {
    return window.coinbaseWalletExtension;
  }

  return getEthereumProviders(window).find((provider) =>
    Boolean(provider.isCoinbaseWallet),
  );
}

function findBrowserWalletProvider(
  window?: EthereumWindow,
): ExtendedWalletProvider | undefined {
  return getEthereumProviders(window).find(
    (provider) => !isNamedWalletProvider(provider),
  );
}

export function findWalletProviderById(
  window: EthereumWindow | undefined,
  walletId: WalletMenuId,
): ExtendedWalletProvider | undefined {
  switch (walletId) {
    case "metaMask":
      return findMetaMaskProvider(window);
    case "coinbase":
      return findCoinbaseProvider(window);
    case "rabby":
      return findRabbyProvider(window);
    case "okx":
      return findOkxProvider(window);
    case "brave":
      return findBraveProvider(window);
    case "trust":
      return findTrustProvider(window);
    case "coin98":
      return findCoin98Provider(window);
    case "browser":
      return findBrowserWalletProvider(window);
  }
}

function isWalletInstalled(
  window: EthereumWindow | undefined,
  walletId: WalletMenuId,
): boolean {
  return Boolean(findWalletProviderById(window, walletId));
}

export function detectWalletProviders(
  window?: EthereumWindow,
): DetectedWalletProvider[] {
  const targetWindow =
    typeof globalThis.window !== "undefined"
      ? (globalThis.window as EthereumWindow)
      : window;

  return WALLET_MENU_ITEMS.map((item) => ({
    id: item.id,
    name: item.name,
    installed: isWalletInstalled(targetWindow, item.id),
  }));
}

export function logDetectedWalletProviders(window?: EthereumWindow): void {
  const providers = detectWalletProviders(window).map(({ name, installed }) => ({
    name,
    installed,
  }));
  console.log("[wallet] detected providers", providers);
}
