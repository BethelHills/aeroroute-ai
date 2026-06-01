"use client";

import { useEffect, useRef } from "react";
import { useAssistantApi } from "@assistant-ui/react";
import { useAomiRuntime, useControl, useUser } from "@aomi-labs/react";

export const AEROROUTE_DEFAULT_PROMPT =
  "Find best Aerodrome route for swapping 1 ETH to USDC";

type AerorouteChatBootstrapProps = {
  initialPrompt?: string;
  /** Send the initial prompt when the thread is empty (first load). */
  autoSend?: boolean;
  chainId?: number;
};

export function AerorouteChatBootstrap({
  initialPrompt = AEROROUTE_DEFAULT_PROMPT,
  autoSend = true,
  chainId = Number(process.env.NEXT_PUBLIC_CHAIN_ID ?? 8453),
}: AerorouteChatBootstrapProps) {
  const api = useAssistantApi();
  const { sendMessage, getMessages, threadViewKey } = useAomiRuntime();
  const { getAvailableModels, getAuthorizedApps, syncCurrentThreadControl } =
    useControl();
  const { setUser } = useUser();
  const hasAutoSentRef = useRef(false);

  useEffect(() => {
    void getAvailableModels();
    void getAuthorizedApps();
  }, [getAvailableModels, getAuthorizedApps]);

  useEffect(() => {
    if (!Number.isFinite(chainId)) return;
    setUser({ chain_id: chainId });
  }, [chainId, setUser]);

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      await new Promise((resolve) => setTimeout(resolve, 350));
      if (cancelled) return;

      try {
        api.composer().setText(initialPrompt);
      } catch (error) {
        console.error("Failed to set composer text:", error);
      }

      if (
        !autoSend ||
        hasAutoSentRef.current ||
        getMessages().length > 0
      ) {
        return;
      }

      try {
        await syncCurrentThreadControl();
        await sendMessage(initialPrompt);
        hasAutoSentRef.current = true;
      } catch (error) {
        console.error("Failed to send initial AeroRoute prompt:", error);
      }
    };

    void run();

    return () => {
      cancelled = true;
    };
  }, [
    api,
    autoSend,
    initialPrompt,
    sendMessage,
    syncCurrentThreadControl,
    threadViewKey,
  ]);

  return null;
}
