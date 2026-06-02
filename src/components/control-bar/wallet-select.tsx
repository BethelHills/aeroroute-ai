"use client";

import { useSyncExternalStore, type FC } from "react";
import { WalletIcon } from "lucide-react";
import { cn } from "@aomi-labs/react";
import { WalletSelectMenu } from "./wallet-select-menu";

export type WalletSelectProps = {
  className?: string;
  connectLabel?: string;
};

function subscribeNoop() {
  return () => {};
}

function WalletSelectPlaceholder({
  className,
  connectLabel = "Select Wallet",
}: WalletSelectProps) {
  return (
    <button
      type="button"
      disabled
      className={cn(
        "aui-wallet-select inline-flex shrink-0 items-center justify-center gap-1.5 whitespace-nowrap text-sm font-medium",
        "rounded-3xl px-4 py-2.5",
        "bg-primary text-primary-foreground",
        "opacity-70",
        className,
      )}
      aria-label={connectLabel}
    >
      <WalletIcon className="size-4 shrink-0 opacity-90" />
      <span className="max-md:max-w-[5.5rem] max-md:truncate">{connectLabel}</span>
    </button>
  );
}

export const WalletSelect: FC<WalletSelectProps> = (props) => {
  const mounted = useSyncExternalStore(
    subscribeNoop,
    () => true,
    () => false,
  );

  if (!mounted) {
    return <WalletSelectPlaceholder {...props} />;
  }

  return <WalletSelectMenu {...props} />;
};
