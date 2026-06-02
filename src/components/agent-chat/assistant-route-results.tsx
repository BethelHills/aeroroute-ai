"use client";

import { useCallback, useRef } from "react";
import { useAssistantState, useMessage } from "@assistant-ui/react";
import { useAomiRuntime, useNotification } from "@aomi-labs/react";
import {
  MOCK_ROUTE_RESULTS,
  extractMessageText,
  shouldShowRouteResults,
} from "@/lib/agent-chat/route-results";
import { RouteComparisonCard } from "@/components/agent-chat/route-comparison-card";
import {
  RouteResultCardGrid,
  RouteResultCardIconBadge,
} from "@/components/agent-chat/route-result-card";
import type { RouteResult } from "@/lib/agent-chat/route-results";

type ThreadMessageLike = {
  id: string;
  role: string;
  content: ReadonlyArray<{ type: string; text?: string }>;
};

function getUserPromptForAssistantMessage(
  messages: readonly ThreadMessageLike[],
  parentId: string | null,
  messageIndex: number,
): string {
  const parentMessage = parentId
    ? messages.find((message) => message.id === parentId)
    : undefined;

  if (parentMessage?.role === "user") {
    return extractMessageText(parentMessage.content);
  }

  for (let index = messageIndex - 1; index >= 0; index -= 1) {
    const message = messages[index];
    if (message?.role === "user") {
      return extractMessageText(message.content);
    }
  }

  return "";
}

export function AssistantRouteResults() {
  const comparisonRef = useRef<HTMLDivElement>(null);
  const isEmpty = useMessage((state) => state.content.length === 0);
  const isRunning = useMessage((state) => state.status?.type === "running");
  const parentId = useMessage((state) => state.parentId);
  const messageIndex = useMessage((state) => state.index);
  const messages = useAssistantState(({ thread }) => thread.messages);
  const { sendMessage, isRunning: threadRunning } = useAomiRuntime();
  const { showNotification } = useNotification();

  const userPrompt = getUserPromptForAssistantMessage(
    messages,
    parentId,
    messageIndex,
  );

  const showResults =
    !isEmpty &&
    !isRunning &&
    !threadRunning &&
    shouldShowRouteResults(userPrompt);

  const scrollToComparison = useCallback(() => {
    comparisonRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const handlePrepareTransaction = useCallback(
    async (route: RouteResult) => {
      try {
        await sendMessage(
          `Prepare a transaction for the ${route.name} route (${route.routePath}) on Base.`,
        );
      } catch (error) {
        showNotification({
          type: "error",
          title: "Could not prepare transaction",
          message:
            error instanceof Error ? error.message : "Please try again.",
        });
      }
    },
    [sendMessage, showNotification],
  );

  if (!showResults) {
    return null;
  }

  return (
    <div className="aui-assistant-route-results mx-auto mt-3 w-full min-w-0 max-w-[var(--thread-max-width)] overflow-hidden px-2 sm:px-3">
      <div className="mb-4">
        <RouteResultCardIconBadge />
      </div>
      <RouteResultCardGrid
        routes={MOCK_ROUTE_RESULTS}
        onPrepareTransaction={(route) => void handlePrepareTransaction(route)}
        onCompareRoutes={scrollToComparison}
      />
      <div ref={comparisonRef} className="mt-4">
        <RouteComparisonCard routes={MOCK_ROUTE_RESULTS} />
      </div>
    </div>
  );
}
