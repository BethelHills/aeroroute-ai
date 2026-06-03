"use client";

import type { ComponentProps } from "react";
import { Toaster as Sonner } from "sonner";

import { cn } from "@aomi-labs/react";

type ToasterProps = ComponentProps<typeof Sonner>;

/** Below sticky app header on mobile (h-14); clear of md+ layouts without mobile header. */
const TOAST_OFFSET = { top: "1rem" } as const;
const TOAST_MOBILE_OFFSET = { top: "4.75rem" } as const;

export function Toaster({
  className,
  toastOptions,
  style,
  offset = TOAST_OFFSET,
  mobileOffset = TOAST_MOBILE_OFFSET,
  ...props
}: ToasterProps) {
  return (
    <Sonner
      className={cn("toaster group z-[100]", className)}
      offset={offset}
      mobileOffset={mobileOffset}
      style={{ zIndex: 100, ...style }}
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-[#061018] group-[.toaster]:text-slate-100 group-[.toaster]:border-white/15 group-[.toaster]:shadow-[0_12px_40px_rgba(0,0,0,0.55)]",
          description: "group-[.toast]:text-slate-400",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
        ...toastOptions,
      }}
      {...props}
    />
  );
}
