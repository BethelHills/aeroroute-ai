"use client";

import { useCallback, useMemo } from "react";
import {
  useAccount,
  useConnect,
  useDisconnect,
  useSwitchChain,
} from "wagmi";
import {
  AEROROUTE_EVM_CHAINS,
  DEFAULT_CHAIN_ID,
} from "@/lib/wallet/para-config";
import {
  AOMI_AUTH_BOOTING_IDENTITY,
  AOMI_AUTH_DISCONNECTED_IDENTITY,
} from "./identity";
import type { AomiAuthAdapter, AomiAuthIdentity } from "./types";

export function useWagmiAuthAdapter(): AomiAuthAdapter {
  const {
    address,
    chainId,
    isConnected,
    isConnecting,
    isReconnecting,
  } = useAccount();
  const { connectAsync, connectors } = useConnect();
  const { disconnectAsync } = useDisconnect();
  const { switchChainAsync, isPending: isSwitchingChain } = useSwitchChain();

  const isReady = !isConnecting && !isReconnecting;

  const identity: AomiAuthIdentity = useMemo(() => {
    if (!isReady) {
      return AOMI_AUTH_BOOTING_IDENTITY;
    }
    if (!isConnected) {
      return AOMI_AUTH_DISCONNECTED_IDENTITY;
    }
    return {
      status: "connected",
      isConnected: true,
      address,
      chainId: chainId ?? DEFAULT_CHAIN_ID,
      authMethod: "wagmi",
      walletKind: "eoa",
    };
  }, [isReady, isConnected, address, chainId]);

  const connect = useCallback(async () => {
    const connector =
      connectors.find((item) => item.ready) ?? connectors[0];
    if (!connector) {
      throw new Error("No wallet connector available");
    }
    await connectAsync({
      connector,
      chainId: DEFAULT_CHAIN_ID,
    });
  }, [connectAsync, connectors]);

  const disconnect = useCallback(async () => {
    await disconnectAsync();
  }, [disconnectAsync]);

  const switchChain = useCallback(
    async (nextChainId: number) => {
      await switchChainAsync({ chainId: nextChainId });
    },
    [switchChainAsync],
  );

  return useMemo(
    (): AomiAuthAdapter => ({
      identity,
      isReady,
      isSwitchingChain,
      canConnect: isReady && !isConnected && connectors.length > 0,
      canOpenAccountUI: false,
      canDisconnect: isReady && isConnected,
      supportedChains: AEROROUTE_EVM_CHAINS,
      connect,
      disconnect,
      switchChain: isConnected ? switchChain : undefined,
    }),
    [
      identity,
      isReady,
      isSwitchingChain,
      isConnected,
      connectors.length,
      connect,
      disconnect,
      switchChain,
    ],
  );
}
