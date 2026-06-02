export type WalletMenuId =
  | "metaMask"
  | "coinbase"
  | "browser"
  | "rabby"
  | "okx"
  | "brave"
  | "trust"
  | "coin98";

export type WalletAvailabilityMode = "connector" | "detected";

export type WalletMenuItem = {
  id: WalletMenuId;
  connectorId: string;
  name: string;
  /** `connector` = always enabled when wagmi connector exists; `detected` = requires provider flag. */
  availability: WalletAvailabilityMode;
  unavailableLabel?: string;
};

/** Fixed wallet picker order — every entry maps to a real wagmi connector. */
export const WALLET_MENU_ITEMS: readonly WalletMenuItem[] = [
  {
    id: "metaMask",
    connectorId: "metaMaskSDK",
    name: "MetaMask",
    availability: "connector",
  },
  {
    id: "coinbase",
    connectorId: "coinbaseWalletSDK",
    name: "Coinbase Wallet",
    availability: "connector",
  },
  {
    id: "browser",
    connectorId: "browser-wallet",
    name: "Browser Wallet",
    availability: "connector",
  },
  {
    id: "rabby",
    connectorId: "rabby",
    name: "Rabby",
    availability: "detected",
  },
  {
    id: "okx",
    connectorId: "okx",
    name: "OKX Wallet",
    availability: "detected",
  },
  {
    id: "brave",
    connectorId: "brave",
    name: "Brave Wallet",
    availability: "detected",
  },
  {
    id: "trust",
    connectorId: "trust",
    name: "Trust Wallet",
    availability: "detected",
  },
  {
    id: "coin98",
    connectorId: "coin98",
    name: "Coin98",
    availability: "detected",
  },
];

export const DETECTED_WALLET_IDS = WALLET_MENU_ITEMS.filter(
  (item) => item.availability === "detected",
).map((item) => item.id);
