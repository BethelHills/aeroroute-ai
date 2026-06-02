"use client";

import { useState, type FC } from "react";
import { ChevronDownIcon, WalletIcon } from "lucide-react";
import { useConnect } from "wagmi";
import { cn } from "@aomi-labs/react";
import { useAomiAuthAdapter } from "@/lib/aomi-auth-adapter";
import { DEFAULT_CHAIN_ID } from "@/lib/wallet/para-config";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ConnectButton } from "./connect-button";
import type { WalletSelectProps } from "./wallet-select";

function connectorLabel(name: string, id: string): string {
  if (id === "injected" || name === "Injected") {
    return "Browser Wallet";
  }
  if (id === "walletConnect" || name === "WalletConnect") {
    return "WalletConnect";
  }
  return name;
}

export const WalletSelectMenu: FC<WalletSelectProps> = ({
  className,
  connectLabel = "Select Wallet",
}) => {
  const adapter = useAomiAuthAdapter();
  const identity = adapter.identity;
  const { connectors, connectAsync, isPending } = useConnect();
  const [open, setOpen] = useState(false);

  if (identity.isConnected) {
    return (
      <ConnectButton connectLabel={connectLabel} className={className} />
    );
  }

  const canPick = adapter.canConnect && connectors.length > 0 && !isPending;

  const handlePick = async (connector: (typeof connectors)[number]) => {
    try {
      await connectAsync({
        connector,
        chainId: DEFAULT_CHAIN_ID,
      });
      setOpen(false);
    } catch (error) {
      console.error("Wallet connection failed:", error);
    }
  };

  const buttonClass = cn(
    "aui-wallet-select inline-flex shrink-0 items-center justify-center gap-1.5 whitespace-nowrap text-sm font-medium",
    "rounded-3xl px-4 py-2.5",
    "bg-primary text-primary-foreground",
    "hover:bg-primary/90",
    "transition-colors",
    "focus-visible:ring-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
    "disabled:cursor-not-allowed disabled:opacity-50",
    className,
  );

  if (connectors.length <= 1) {
    const single = connectors[0];
    return (
      <button
        type="button"
        disabled={!canPick || !single}
        onClick={() => single && void handlePick(single)}
        className={buttonClass}
        aria-label={connectLabel}
      >
        <WalletIcon className="size-4 shrink-0 opacity-90" />
        <span className="max-md:max-w-[5.5rem] max-md:truncate">
          {isPending ? "Connecting…" : connectLabel}
        </span>
      </button>
    );
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={
          <button
            type="button"
            disabled={!canPick}
            className={buttonClass}
            aria-label={connectLabel}
          />
        }
      >
        <WalletIcon className="size-4 shrink-0 opacity-90" />
        <span className="max-md:max-w-[5.5rem] max-md:truncate">
          {isPending ? "Connecting…" : connectLabel}
        </span>
        <ChevronDownIcon className="size-3.5 shrink-0 opacity-70" />
      </PopoverTrigger>
      <PopoverContent
        align="start"
        side="top"
        sideOffset={8}
        className="w-[min(100vw-2rem,16rem)] rounded-xl border border-white/10 bg-[#061018] p-1 text-slate-200"
      >
        <p className="px-2 py-1.5 text-xs font-medium text-slate-500">
          Choose a wallet
        </p>
        {connectors.map((connector) => (
          <button
            key={connector.uid}
            type="button"
            disabled={isPending || !connector.ready}
            onClick={() => void handlePick(connector)}
            className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left text-sm transition hover:bg-white/10 disabled:opacity-50"
          >
            <WalletIcon className="size-4 shrink-0 text-emerald-300" />
            <span className="min-w-0 truncate">
              {connectorLabel(connector.name, connector.id)}
            </span>
          </button>
        ))}
      </PopoverContent>
    </Popover>
  );
};
