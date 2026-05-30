"use client";

import type { ReactNode } from "react";

type MainContentProps = {
  children: ReactNode;
};

export function MainContent({ children }: MainContentProps) {
  return (
    <div className="relative z-10 min-h-0 min-w-0 flex-1 overflow-x-hidden overflow-y-auto">
      <div className="mx-auto w-full max-w-[1400px] overflow-x-hidden">
        {children}
      </div>
    </div>
  );
}
