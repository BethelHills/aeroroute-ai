import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export const appPageSectionClass =
  "relative z-10 mx-auto w-full max-w-[1400px] overflow-hidden px-4 py-6 sm:px-6 sm:py-8 lg:px-8";

type AppPageRootProps = {
  children: ReactNode;
  className?: string;
};

export function AppPageRoot({ children, className }: AppPageRootProps) {
  return (
    <main
      className={cn("w-full min-h-full overflow-x-hidden text-white", className)}
    >
      {children}
    </main>
  );
}

type AppPageSectionProps = {
  children: ReactNode;
  className?: string;
};

export function AppPageSection({ children, className }: AppPageSectionProps) {
  return (
    <section className={cn(appPageSectionClass, className)}>{children}</section>
  );
}

type AppPageHeaderProps = {
  children: ReactNode;
  className?: string;
};

export function AppPageHeader({ children, className }: AppPageHeaderProps) {
  return (
    <header
      className={cn(
        "mb-6 flex flex-col gap-4 sm:mb-8 sm:gap-6",
        className,
      )}
    >
      {children}
    </header>
  );
}

type PageTitleBlockProps = {
  badge: ReactNode;
  title: ReactNode;
  description: string;
  /** Renders beside the title row (e.g. wallet controls on mobile dashboard). */
  titleActions?: ReactNode;
};

export function PageTitleBlock({
  badge,
  title,
  description,
  titleActions,
}: PageTitleBlockProps) {
  return (
    <div className="min-w-0">
      {badge}
      <div className="flex items-center justify-between gap-3">
        <h1 className="min-w-0 flex-1 text-3xl font-black leading-tight tracking-[-0.05em] sm:text-4xl md:text-5xl lg:text-6xl">
          {title}
        </h1>
        {titleActions ? <div className="shrink-0">{titleActions}</div> : null}
      </div>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-400 sm:mt-4 sm:text-base">
        {description}
      </p>
    </div>
  );
}

type PageActionsProps = {
  children: ReactNode;
  className?: string;
};

/** Full-width buttons on mobile; inline on sm+. */
export function PageActions({ children, className }: PageActionsProps) {
  return (
    <div
      className={cn(
        "flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:flex-wrap sm:gap-3 [&_button]:w-full sm:[&_button]:w-auto",
        className,
      )}
    >
      {children}
    </div>
  );
}
