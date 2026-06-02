"use client";

import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type FC,
} from "react";
import { createPortal } from "react-dom";
import { ChevronDownIcon, WalletIcon } from "lucide-react";
import { useConnect, useConfig } from "wagmi";
import { cn } from "@aomi-labs/react";
import { useAomiAuthAdapter } from "@/lib/aomi-auth-adapter";
import { DEFAULT_CHAIN_ID } from "@/lib/wallet/para-config";
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

type WalletSelectMenuProps = WalletSelectProps & {
  menuId?: string;
};

export const WalletSelectMenu: FC<WalletSelectMenuProps> = ({
  className,
  connectLabel = "Select Wallet",
  menuId = "wallet-select-menu",
}) => {
  const adapter = useAomiAuthAdapter();
  const identity = adapter.identity;
  const { connectAsync, isPending } = useConnect();
  const { connectors: configConnectors } = useConfig();
  const { connectors: hookConnectors } = useConnect();
  const connectors =
    hookConnectors.length > 0 ? hookConnectors : configConnectors;

  const triggerRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const [menuStyle, setMenuStyle] = useState<CSSProperties>({});

  useLayoutEffect(() => {
    if (!open || !triggerRef.current) return;

    const updatePosition = () => {
      const rect = triggerRef.current?.getBoundingClientRect();
      if (!rect) return;

      const menuWidth = Math.max(rect.width, 220);
      const left = Math.max(
        12,
        Math.min(rect.left, window.innerWidth - menuWidth - 12),
      );

      setMenuStyle({
        position: "fixed",
        left,
        bottom: window.innerHeight - rect.top + 10,
        width: menuWidth,
        zIndex: 10000,
      });
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);

    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  if (identity.isConnected) {
    return (
      <ConnectButton connectLabel={connectLabel} className={className} />
    );
  }

  const isBooting = identity.status === "booting";
  const canOpenMenu = !identity.isConnected;

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
    "aui-wallet-select inline-flex shrink-0 cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap text-sm font-medium",
    "rounded-3xl px-4 py-2.5",
    "bg-primary text-primary-foreground",
    "hover:bg-primary/90",
    "transition-colors",
    "focus-visible:ring-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
    "disabled:cursor-not-allowed disabled:opacity-50",
    className,
  );

  const menu =
    open && typeof document !== "undefined"
      ? createPortal(
          <>
            <button
              type="button"
              tabIndex={-1}
              aria-label="Close wallet menu"
              className="fixed inset-0 z-[9999] cursor-default bg-black/40"
              onClick={() => setOpen(false)}
            />
            <div
              id={menuId}
              role="menu"
              aria-label="Choose a wallet"
              style={menuStyle}
              className="aui-wallet-select-menu fixed z-[10000] rounded-xl border border-white/15 bg-[#061018] p-1.5 text-slate-100 shadow-[0_12px_40px_rgba(0,0,0,0.55)]"
            >
              <p className="px-2.5 py-1.5 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Choose a wallet
              </p>
              {isBooting ? (
                <p className="px-2.5 py-2 text-sm text-slate-400">
                  Preparing wallet options…
                </p>
              ) : connectors.length === 0 ? (
                <p className="px-2.5 py-2 text-sm text-slate-400">
                  No wallet found. Install MetaMask or another browser wallet,
                  or set{" "}
                  <code className="text-emerald-300">NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID</code>{" "}
                  for WalletConnect.
                </p>
              ) : (
                connectors.map((connector) => (
                  <button
                    key={connector.uid}
                    type="button"
                    role="menuitem"
                    disabled={isPending}
                    onClick={() => void handlePick(connector)}
                    className="flex w-full cursor-pointer items-center gap-2.5 rounded-lg px-2.5 py-2.5 text-left text-sm text-white transition hover:bg-white/10 focus-visible:bg-white/10 focus-visible:outline-none disabled:cursor-wait disabled:opacity-60"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-400/15 text-emerald-300">
                      <WalletIcon className="size-4" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-semibold">
                        {connectorLabel(connector.name, connector.id)}
                      </span>
                      {!connector.ready ? (
                        <span className="block text-xs text-slate-500">
                          Tap to connect
                        </span>
                      ) : null}
                    </span>
                  </button>
                ))
              )}
            </div>
          </>,
          document.body,
        )
      : null;

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        disabled={!canOpenMenu || isPending}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={open ? menuId : undefined}
        onClick={() => setOpen((value) => !value)}
        className={buttonClass}
      >
        <WalletIcon className="size-4 shrink-0 opacity-90" />
        <span className="max-md:max-w-[5.5rem] max-md:truncate">
          {isPending ? "Connecting…" : connectLabel}
        </span>
        <ChevronDownIcon
          className={cn(
            "size-3.5 shrink-0 opacity-70 transition-transform",
            open && "rotate-180",
          )}
        />
      </button>
      {menu}
    </>
  );
};
