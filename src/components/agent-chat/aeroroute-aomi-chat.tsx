"use client";

import "@/components/default.css";
import { AomiFrame } from "@/components/aomi-frame";
import {
  AerorouteChatBootstrap,
  AEROROUTE_DEFAULT_PROMPT,
} from "@/components/agent-chat/aeroroute-chat-bootstrap";
import { cn } from "@/lib/utils";
import { useAomiRuntime } from "@aomi-labs/react";
import {
  Bot,
  CheckCircle2,
  ChevronDown,
  Clock3,
  Cpu,
  ShieldCheck,
  Wallet,
  Zap,
} from "lucide-react";

const suggestions = [
  AEROROUTE_DEFAULT_PROMPT,
  "Quote swap on Aerodrome",
  "Simulate route before signing",
  "Show liquidity pools on Base",
  "Prepare swap transaction",
];

const executionSteps = [
  { label: "Intent detected", value: "Swap ETH → USDC", status: "done" as const },
  { label: "Protocol selected", value: "Aerodrome", status: "done" as const },
  { label: "Network", value: "Base 8453", status: "done" as const },
  { label: "Route analysis", value: "Live via Aomi", status: "active" as const },
  { label: "Simulation", value: "Pending", status: "idle" as const },
  { label: "Wallet approval", value: "Pending", status: "idle" as const },
];

type AerorouteAomiChatProps = {
  aomiApiKey?: string;
  className?: string;
};

function QuickActions({ onPrompt }: { onPrompt: (text: string) => void }) {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 backdrop-blur-xl">
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-400/10 text-emerald-300">
          <Zap size={22} />
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-300">
            Quick Prompts
          </p>
          <h3 className="text-xl font-black text-white">Try these</h3>
        </div>
      </div>
      <div className="space-y-3">
        {suggestions.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => onPrompt(item)}
            className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-left text-sm text-slate-300 transition hover:border-emerald-400/40 hover:text-white"
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}

function ExecutionTimeline() {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 backdrop-blur-xl">
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-400/10 text-orange-300">
          <Cpu size={22} />
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-300">
            Agent Timeline
          </p>
          <h3 className="text-xl font-black text-white">Execution plan</h3>
        </div>
      </div>
      <div className="space-y-4">
        {executionSteps.map((step) => (
          <div key={step.label} className="flex gap-3">
            <div
              className={`mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border ${
                step.status === "done"
                  ? "border-emerald-400/40 bg-emerald-400/15 text-emerald-300"
                  : step.status === "active"
                    ? "border-orange-400/40 bg-orange-400/15 text-orange-300"
                    : "border-white/10 bg-white/5 text-slate-500"
              }`}
            >
              {step.status === "done" ? (
                <CheckCircle2 size={15} />
              ) : (
                <Clock3 size={15} />
              )}
            </div>
            <div className="flex-1 rounded-2xl border border-white/10 bg-black/20 p-3">
              <p className="text-sm font-bold text-white">{step.label}</p>
              <p className="mt-1 text-xs text-slate-500">{step.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function WalletContext() {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 backdrop-blur-xl">
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-300">
          <Wallet size={22} />
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-300">
            Wallet Context
          </p>
          <h3 className="text-xl font-black text-white">Connect in chat</h3>
        </div>
      </div>
      <p className="text-sm leading-7 text-slate-400">
        Use the controls below the message box to connect a wallet on Base before
        simulating or signing Aerodrome swaps.
      </p>
    </div>
  );
}

function AerorouteChatShell({ aomiApiKey }: { aomiApiKey?: string }) {
  const { sendMessage, isRunning } = useAomiRuntime();

  const handlePrompt = async (text: string) => {
    if (isRunning) return;
    await sendMessage(text);
  };

  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_minmax(0,360px)]">
      <div className="flex min-h-[min(70vh,720px)] max-h-[calc(100svh-12rem)] flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.035] backdrop-blur-xl">
        <div className="flex shrink-0 flex-col gap-4 border-b border-white/10 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-cyan-400 text-[#031014] shadow-[0_0_35px_rgba(0,245,160,0.25)]">
              <Bot size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-black text-white">AeroRoute Agent</h2>
              <p className="text-sm text-slate-500">Live Aomi · Aerodrome on Base</p>
            </div>
          </div>
          <div className="flex w-fit items-center gap-2 rounded-2xl border border-white/10 bg-black/20 px-4 py-2 text-sm text-slate-300">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-300" />
            {aomiApiKey ? "Aomi ready" : "Set Aomi API key"}
            <ChevronDown size={15} />
          </div>
        </div>

        <div className="dark aeroroute-aomi-thread relative min-h-0 flex-1 [&_.aui-root]:!bg-transparent [&_.aui-thread-root]:!bg-transparent">
          <AerorouteChatBootstrap />
          <AomiFrame.Composer
            withControl
            className="flex h-full min-h-0 flex-col"
            controlBarProps={{
              hideWallet: false,
              hideNetwork: false,
              hideApp: false,
              hideApiKey: Boolean(aomiApiKey),
            }}
          />
        </div>
      </div>

      <aside className="min-w-0 space-y-6">
        <WalletContext />
        <ExecutionTimeline />
        <QuickActions onPrompt={handlePrompt} />
        <div className="rounded-[2rem] border border-orange-400/25 bg-gradient-to-br from-orange-400/10 via-white/[0.03] to-emerald-400/10 p-6 backdrop-blur-xl">
          <div className="mb-4 flex items-center gap-3">
            <ShieldCheck className="text-orange-300" />
            <h3 className="font-black text-white">Safety Mode</h3>
          </div>
          <p className="text-sm leading-7 text-slate-400">
            AeroRoute will never sign transactions automatically. Every route is
            simulated and reviewed before wallet approval.
          </p>
        </div>
      </aside>
    </div>
  );
}

export function AerorouteAomiChat({ aomiApiKey, className }: AerorouteAomiChatProps) {
  return (
    <AomiFrame.Root
      showSidebar={false}
      walletPosition={null}
      height="auto"
      className={cn(
        "!h-auto !min-h-0 !rounded-none !border-0 !bg-transparent !shadow-none dark:!bg-transparent",
        className,
      )}
      clientOptions={aomiApiKey ? { apiKey: aomiApiKey } : undefined}
    >
      <AerorouteChatShell aomiApiKey={aomiApiKey} />
    </AomiFrame.Root>
  );
}
