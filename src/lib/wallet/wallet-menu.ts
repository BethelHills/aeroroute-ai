export type WalletMenuId =
  | "metaMask"
  | "coinbase"
  | "rabby"
  | "okx"
  | "brave"
  | "trust"
  | "coin98"
  | "browser";

export type WalletMenuItem = {
  id: WalletMenuId;
  connectorId: string;
  name: string;
  /** Shown under the wallet name when the extension is not available. */
  unavailableLabel?: string;
};

/** Fixed wallet picker order — every entry maps to a real wagmi connector. */
export const WALLET_MENU_ITEMS: readonly WalletMenuItem[] = [
  { id: "metaMask", connectorId: "metaMaskSDK", name: "MetaMask" },
  { id: "coinbase", connectorId: "coinbaseWalletSDK", name: "Coinbase Wallet" },
  { id: "rabby", connectorId: "rabby", name: "Rabby" },
  { id: "okx", connectorId: "okx", name: "OKX Wallet" },
  { id: "brave", connectorId: "brave", name: "Brave Wallet" },
  { id: "trust", connectorId: "trust", name: "Trust Wallet" },
  { id: "coin98", connectorId: "coin98", name: "Coin98" },
  {
    id: "browser",
    connectorId: "browser-wallet",
    name: "Browser Wallet",
    unavailableLabel: "Install a supported wallet extension",
  },
];
