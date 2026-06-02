"use client";

import { useMemo } from "react";
import { useAccount, useBalance } from "wagmi";
import { formatAddress } from "@aomi-labs/react";
import { useAomiAuthAdapter } from "@/lib/aomi-auth-adapter";
import {
  BASE_AERO_ADDRESS,
  BASE_USDC_ADDRESS,
  getConnectedPortfolioView,
  getDemoPortfolioView,
  type LiveBalanceInput,
  type PortfolioView,
} from "@/lib/portfolio-data";

export function usePortfolioView(): {
  view: PortfolioView;
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

  const view = useMemo(() => {
    if (!isConnected || !address) {
      return getDemoPortfolioView();
    }
    return getConnectedPortfolioView(address, chainId, live);
  }, [isConnected, address, chainId, live]);

  const displayAddress = isConnected
    ? formatAddress(address) ?? address
    : view.address;

  return { view, displayAddress, isConnected, balancesLoading };
}
