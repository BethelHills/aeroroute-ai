"use client";

import { useMemo } from "react";
import { base } from "viem/chains";
import { useAccount, useBalance, useReadContracts } from "wagmi";
import { erc20MinimalAbi } from "@/lib/abi/erc20-minimal";
import {
  BASE_AERO_ADDRESS,
  BASE_USDC_ADDRESS,
  buildDemoPortfolioView,
  buildLivePortfolioView,
  type PortfolioDataMode,
  type PortfolioViewAsset,
  type PortfolioViewData,
} from "@/lib/portfolio-data";

export const BASE_CHAIN_ID = base.id;

export type PortfolioBalancesResult = {
  isConnected: boolean;
  address?: `0x${string}`;
  isLoading: boolean;
  isError: boolean;
  readFailed: boolean;
  assets: PortfolioViewAsset[];
  totalValue: string;
  dataMode: PortfolioDataMode;
  portfolio: PortfolioViewData;
};

const ZERO = BigInt(0);

function parseBalanceResult(
  result: { result?: bigint; status: string } | undefined,
): bigint | undefined {
  if (!result || result.status !== "success") {
    return undefined;
  }
  return result.result ?? ZERO;
}

function parseDecimalsResult(
  result: { result?: number; status: string } | undefined,
  fallback: number,
): number {
  if (!result || result.status !== "success" || result.result == null) {
    return fallback;
  }
  return Number(result.result);
}

export function usePortfolioBalances(walletReady: boolean): PortfolioBalancesResult {
  const { address, isConnected } = useAccount();

  const queryEnabled = walletReady && isConnected && Boolean(address);

  const {
    data: ethBalanceData,
    isLoading: ethLoading,
    isError: ethError,
  } = useBalance({
    address,
    chainId: BASE_CHAIN_ID,
    query: { enabled: queryEnabled },
  });

  const {
    data: tokenReads,
    isLoading: tokensLoading,
    isError: tokensError,
  } = useReadContracts({
    contracts: queryEnabled
      ? [
          {
            address: BASE_USDC_ADDRESS,
            abi: erc20MinimalAbi,
            functionName: "balanceOf",
            args: [address!],
            chainId: BASE_CHAIN_ID,
          },
          {
            address: BASE_USDC_ADDRESS,
            abi: erc20MinimalAbi,
            functionName: "decimals",
            chainId: BASE_CHAIN_ID,
          },
          {
            address: BASE_AERO_ADDRESS,
            abi: erc20MinimalAbi,
            functionName: "balanceOf",
            args: [address!],
            chainId: BASE_CHAIN_ID,
          },
          {
            address: BASE_AERO_ADDRESS,
            abi: erc20MinimalAbi,
            functionName: "decimals",
            chainId: BASE_CHAIN_ID,
          },
        ]
      : [],
    query: { enabled: queryEnabled },
  });

  return useMemo(() => {
    if (!walletReady || !isConnected || !address) {
      const demo = buildDemoPortfolioView();
      return {
        isConnected: false,
        address: undefined,
        isLoading: false,
        isError: false,
        readFailed: false,
        assets: demo.assets,
        totalValue: demo.summary.totalValue,
        dataMode: "Demo" as const,
        portfolio: demo,
      };
    }

    const isLoading = ethLoading || tokensLoading;
    const isError = ethError || tokensError;

    const ethRaw = ethError ? ZERO : (ethBalanceData?.value ?? ZERO);
    const ethDecimals = ethBalanceData?.decimals ?? 18;

    const usdcRaw = parseBalanceResult(tokenReads?.[0]);
    const usdcDecimals = parseDecimalsResult(tokenReads?.[1], 6);
    const aeroRaw = parseBalanceResult(tokenReads?.[2]);
    const aeroDecimals = parseDecimalsResult(tokenReads?.[3], 18);

    const readFailed =
      isError ||
      tokenReads?.[0]?.status === "failure" ||
      tokenReads?.[2]?.status === "failure";

    const liveInputs = {
      eth: ethRaw,
      ethDecimals,
      usdc: usdcRaw ?? ZERO,
      usdcDecimals,
      aero: aeroRaw ?? ZERO,
      aeroDecimals,
    };

    const portfolio = buildLivePortfolioView({
      eth: liveInputs.eth,
      ethDecimals: liveInputs.ethDecimals,
      usdc: liveInputs.usdc,
      usdcDecimals: liveInputs.usdcDecimals,
      aero: liveInputs.aero,
      aeroDecimals: liveInputs.aeroDecimals,
      isLoading,
      readFailed,
    });

    return {
      isConnected: true,
      address,
      isLoading,
      isError,
      readFailed,
      assets: portfolio.assets,
      totalValue: portfolio.summary.totalValue,
      dataMode: "Live" as const,
      portfolio,
    };
  }, [
    walletReady,
    isConnected,
    address,
    ethLoading,
    tokensLoading,
    ethError,
    tokensError,
    ethBalanceData,
    tokenReads,
  ]);
}
