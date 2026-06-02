"use client";

import { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
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
  initialPrompt: initialPromptProp,
  autoSend = true,
  chainId = Number(process.env.NEXT_PUBLIC_CHAIN_ID ?? 8453),
}: AerorouteChatBootstrapProps) {
  const searchParams = useSearchParams();
  const promptFromUrl = searchParams.get("prompt")?.trim();
  const initialPrompt =
    promptFromUrl || initialPromptProp || AEROROUTE_DEFAULT_PROMPT;

  const api = useAssistantApi();
  const { sendMessage, getMessages, threadViewKey } = useAomiRuntime();
  const { getAvailableModels, getAuthorizedApps, syncCurrentThreadControl } =
    useControl();
  const { setUser } = useUser();
  const hasAutoSentRef = useRef(false);
  const lastPromptRef = useRef(initialPrompt);

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
    const promptChanged = lastPromptRef.current !== initialPrompt;
    if (promptChanged) {
      lastPromptRef.current = initialPrompt;
      if (promptFromUrl) {
        hasAutoSentRef.current = false;
      }
    }

    const run = async () => {
      await new Promise((resolve) => setTimeout(resolve, 350));
      if (cancelled) return;

      try {
        api.composer().setText(initialPrompt);
      } catch (error) {
        console.error("Failed to set composer text:", error);
      }

      const shouldAutoSend =
        autoSend && !hasAutoSentRef.current && getMessages().length === 0;

      if (!shouldAutoSend) {
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
    getMessages,
    initialPrompt,
    promptFromUrl,
    sendMessage,
    syncCurrentThreadControl,
    threadViewKey,
  ]);

  return null;
}
