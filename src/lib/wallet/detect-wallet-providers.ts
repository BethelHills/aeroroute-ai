import {
  getEthereumProviders,
  type EthereumWindow,
  type ExtendedWalletProvider,
} from "@/lib/wallet/ethereum-provider";
import {
  DETECTED_WALLET_IDS,
  WALLET_MENU_ITEMS,
  type WalletMenuId,
} from "@/lib/wallet/wallet-menu";

export type DetectedWalletProvider = {
  id: WalletMenuId;
  name: string;
  installed: boolean;
};

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

export function findDetectedWalletProvider(
  window: EthereumWindow | undefined,
  walletId: WalletMenuId,
): ExtendedWalletProvider | undefined {
  switch (walletId) {
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
    default:
      return undefined;
  }
}

function isDetectedWalletInstalled(
  window: EthereumWindow | undefined,
  walletId: WalletMenuId,
): boolean {
  return Boolean(findDetectedWalletProvider(window, walletId));
}

/** Provider-flag detection for extension wallets only (not MetaMask/Coinbase/Browser). */
export function detectBrowserWalletProviders(
  window?: EthereumWindow,
): DetectedWalletProvider[] {
  const targetWindow =
    typeof globalThis.window !== "undefined"
      ? (globalThis.window as EthereumWindow)
      : window;

  return DETECTED_WALLET_IDS.map((walletId) => {
    const item = WALLET_MENU_ITEMS.find((entry) => entry.id === walletId);
    return {
      id: walletId,
      name: item?.name ?? walletId,
      installed: isDetectedWalletInstalled(targetWindow, walletId),
    };
  });
}

export function findWalletProviderById(
  window: EthereumWindow | undefined,
  walletId: WalletMenuId,
): ExtendedWalletProvider | undefined {
  if (walletId === "browser") {
    return window?.ethereum;
  }

  return findDetectedWalletProvider(window, walletId);
}
