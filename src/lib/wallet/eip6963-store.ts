import { createStore, type EIP6963ProviderDetail } from "mipd";

let store: ReturnType<typeof createStore> | null = null;

/** Singleton MIPD store; requests EIP-6963 announcements from installed wallets. */
export function getEip6963Store() {
  if (typeof window === "undefined") {
    return null;
  }
  if (!store) {
    store = createStore();
  }
  return store;
}

export type { EIP6963ProviderDetail };
