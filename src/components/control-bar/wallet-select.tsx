"use client";

import dynamic from "next/dynamic";
import { type FC } from "react";
import { WalletIcon } from "lucide-react";
import { cn } from "@aomi-labs/react";

export type WalletSelectProps = {
  className?: string;
  connectLabel?: string;
  /** Unique id for the portaled menu (use when multiple pickers on one page). */
  menuId?: string;
};

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
        "bg-primary text-[#041014]",
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

const WalletSelectMenu = dynamic(
  () =>
    import("./wallet-select-menu").then((mod) => mod.WalletSelectMenu),
  {
    ssr: false,
    loading: () => <WalletSelectPlaceholder />,
  },
);

export const WalletSelect: FC<WalletSelectProps> = (props) => {
  return <WalletSelectMenu {...props} />;
};
