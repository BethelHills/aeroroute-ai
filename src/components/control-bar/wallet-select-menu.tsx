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
import { useConfig } from "wagmi";
import { cn } from "@aomi-labs/react";
import { useAomiAuthAdapter } from "@/lib/aomi-auth-adapter";
import { connectWalletOption } from "@/lib/wallet/connect-wallet-option";
import { getEip6963Store } from "@/lib/wallet/eip6963-store";
import { useWalletOptions, type WalletOption } from "@/hooks/use-wallet-options";
import { ConnectButton } from "./connect-button";
import type { WalletSelectProps } from "./wallet-select";

type WalletSelectMenuProps = WalletSelectProps & {
  menuId?: string;
};

function WalletOptionIcon({ option }: { option: WalletOption }) {
  const icon =
    option.kind === "connector" || option.kind === "eip6963"
      ? option.icon
      : undefined;

  if (icon) {
    return (
      // eslint-disable-next-line @next/next/no-img-element -- wallet brand icons (EIP-6963 / wagmi)
      <img
        src={icon}
        alt=""
        className="size-8 shrink-0 rounded-lg object-contain"
      />
    );
  }

  return (
    <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-emerald-400/15 text-emerald-300">
      <WalletIcon className="size-4" />
    </span>
  );
}

export const WalletSelectMenu: FC<WalletSelectMenuProps> = ({
  className,
  connectLabel = "Select Wallet",
  menuId = "wallet-select-menu",
}) => {
  const adapter = useAomiAuthAdapter();
  const identity = adapter.identity;
  const wagmiConfig = useConfig();
  const [refreshToken, setRefreshToken] = useState(0);
  const walletOptions = useWalletOptions(refreshToken);

  const triggerRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const [menuStyle, setMenuStyle] = useState<CSSProperties>({});
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectError, setConnectError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    setConnectError(null);
    getEip6963Store()?.reset();
    const timer = window.setTimeout(() => {
      setRefreshToken((value) => value + 1);
    }, 150);
    return () => window.clearTimeout(timer);
  }, [open]);

  useLayoutEffect(() => {
    if (!open || !triggerRef.current) return;

    const updatePosition = () => {
      const rect = triggerRef.current?.getBoundingClientRect();
      if (!rect) return;

      const menuWidth = Math.min(320, Math.max(rect.width, 260));
      const left = Math.max(
        12,
        Math.min(rect.left, window.innerWidth - menuWidth - 12),
      );

      setMenuStyle({
        position: "fixed",
        left,
        bottom: window.innerHeight - rect.top + 10,
        width: menuWidth,
        maxHeight: "min(70vh, 420px)",
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

  const canOpenMenu = !identity.isConnected;

  const handlePick = async (option: WalletOption) => {
    setConnectError(null);
    setIsConnecting(true);
    try {
      await connectWalletOption(
        wagmiConfig,
        option,
        wagmiConfig.connectors,
      );
      setOpen(false);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Could not connect wallet. Try another option.";
      setConnectError(message);
      console.error("Wallet connection failed:", error);
    } finally {
      setIsConnecting(false);
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
              className="aui-wallet-select-menu fixed z-[10000] flex flex-col overflow-hidden rounded-xl border border-white/15 bg-[#061018] text-slate-100 shadow-[0_12px_40px_rgba(0,0,0,0.55)]"
            >
              <p className="shrink-0 border-b border-white/10 px-3 py-2.5 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Choose a wallet
              </p>
              <div className="min-h-[12rem] min-w-0 flex-1 overflow-y-auto overscroll-contain p-1.5">
                {walletOptions.map((option) => (
                    <button
                      key={`${option.kind}-${option.id}`}
                      type="button"
                      role="menuitem"
                      disabled={isConnecting}
                      onClick={() => void handlePick(option)}
                      className="flex w-full cursor-pointer items-center gap-2.5 rounded-lg px-2.5 py-2.5 text-left text-sm text-white transition hover:bg-white/10 focus-visible:bg-white/10 focus-visible:outline-none disabled:cursor-wait disabled:opacity-60"
                    >
                      <WalletOptionIcon option={option} />
                      <span className="min-w-0 flex-1">
                        <span className="block font-semibold">{option.name}</span>
                        {option.kind === "connector" &&
                        option.id === "walletConnect" ? (
                          <span className="block text-xs text-slate-500">
                            Mobile &amp; desktop apps
                          </span>
                        ) : null}
                      </span>
                    </button>
                  ))}
              </div>
              {connectError ? (
                <p className="shrink-0 border-t border-red-400/20 bg-red-400/10 px-3 py-2 text-xs text-red-200">
                  {connectError}
                </p>
              ) : null}
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
        disabled={!canOpenMenu || isConnecting}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={open ? menuId : undefined}
        onClick={() => setOpen((value) => !value)}
        className={buttonClass}
      >
        <WalletIcon className="size-4 shrink-0 opacity-90" />
        <span className="max-md:max-w-[5.5rem] max-md:truncate">
          {isConnecting ? "Connecting…" : connectLabel}
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
