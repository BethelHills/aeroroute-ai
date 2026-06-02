"use client";

import { useMemo } from "react";
import { useAccount, useBalance } from "wagmi";
import { formatAddress } from "@aomi-labs/react";
import { useAomiAuthAdapter } from "@/lib/aomi-auth-adapter";
import {
  BASE_AERO_ADDRESS,
  BASE_USDC_ADDRESS,
  DEMO_WALLET_ADDRESS,
  getConnectedPortfolioState,
  getDemoPortfolioState,
  type LiveBalanceInput,
  type PortfolioState,
} from "@/lib/portfolio-data";

export function usePortfolioView(): {
  state: PortfolioState;
  displayAddress: string;
  isConnected: boolean;
  balancesLoading: boolean;
} {
  const { identity } = useAomiAuthAdapter();
  const { address: wagmiAddress } = useAccount();
  const address = identity.address ?? wagmiAddress;
  const isConnected = identity.isConnected && Boolean(address);
  const chainId = identity.chainId;

  const ethBalance = useBalance({
    address: address as `0x${string}` | undefined,
    query: { enabled: isConnected && Boolean(address) },
  });
  const usdcBalance = useBalance({
    address: address as `0x${string}` | undefined,
    token: BASE_USDC_ADDRESS,
    query: { enabled: isConnected && Boolean(address) },
  });
  const aeroBalance = useBalance({
    address: address as `0x${string}` | undefined,
    token: BASE_AERO_ADDRESS,
    query: { enabled: isConnected && Boolean(address) },
  });

  const balancesLoading =
    isConnected &&
    (ethBalance.isLoading || usdcBalance.isLoading || aeroBalance.isLoading);

  const live: LiveBalanceInput | undefined = useMemo(() => {
    if (!isConnected) return undefined;
    return {
      eth: ethBalance.data?.value,
      ethDecimals: ethBalance.data?.decimals,
      usdc: usdcBalance.data?.value,
      usdcDecimals: usdcBalance.data?.decimals,
      aero: aeroBalance.data?.value,
      aeroDecimals: aeroBalance.data?.decimals,
    };
  }, [
    isConnected,
    ethBalance.data,
    usdcBalance.data,
    aeroBalance.data,
  ]);

  const state = useMemo(() => {
    if (!isConnected || !address) {
      return getDemoPortfolioState();
    }
    return getConnectedPortfolioState(address, chainId, live);
  }, [isConnected, address, chainId, live]);

  const displayAddress = isConnected
    ? formatAddress(address) ?? address
    : DEMO_WALLET_ADDRESS;

  return { state, displayAddress, isConnected, balancesLoading };
}
