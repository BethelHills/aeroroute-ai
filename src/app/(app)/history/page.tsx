"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Link from "next/link";
import {
  AppPageHeader,
  AppPageRoot,
  AppPageSection,
  PageTitleBlock,
} from "@/components/layout/page-shell";
import { WalletStatusButtons } from "@/components/layout/wallet-status-buttons";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  CheckCircle2,
  ChevronDown,
  Clock3,
  Copy,
  ExternalLink,
  Filter,
  Flame,
  Gauge,
  History,
  Info,
  Route,
  Search,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Timer,
  X,
  XCircle,
  Zap,
} from "lucide-react";

const interactiveButtonClass =
  "pointer-events-auto relative z-10 min-h-11 cursor-pointer touch-manipulation transition hover:border-emerald-400/40 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/50 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50";

const stats = [
  { label: "Routes Analyzed", value: "248", change: "+18.4%", icon: Route },
  { label: "Completed Swaps", value: "89", change: "+9.8%", icon: CheckCircle2 },
  { label: "Gas Saved", value: "$428.16", change: "+12.1%", icon: Flame },
  { label: "Avg. Score", value: "94.2", change: "+3.6%", icon: Gauge },
];

type HistoryStatus = "confirmed" | "simulated" | "staged" | "failed";

type HistoryItem = {
  id: string;
  pair: string;
  route: string;
  output: string;
  amount: string;
  impact: string;
  gas: string;
  score: number;
  status: HistoryStatus;
  hash: string;
  time: string;
  savings: string;
  action: string;
};

const history: HistoryItem[] = [
  {
    id: "ar-001",
    pair: "ETH → USDC",
    route: "Aerodrome V2 Direct",
    output: "3,176.82 USDC",
    amount: "1.00 ETH",
    impact: "0.18%",
    gas: "$0.48",
    score: 98,
    status: "confirmed",
    hash: "0x8f21...a3e9",
    time: "2 mins ago",
    savings: "+22.15 USDC",
    action: "Swap completed",
  },
  {
    id: "ar-002",
    pair: "USDC → AERO",
    route: "Aerodrome CL Split",
    output: "1,249.31 AERO",
    amount: "500 USDC",
    impact: "0.24%",
    gas: "$0.31",
    score: 94,
    status: "simulated",
    hash: "simulation-only",
    time: "18 mins ago",
    savings: "+8.42 AERO",
    action: "Route simulated",
  },
  {
    id: "ar-003",
    pair: "ETH → DAI",
    route: "Stable Multi-hop",
    output: "3,151.08 DAI",
    amount: "1.00 ETH",
    impact: "0.31%",
    gas: "$0.55",
    score: 90,
    status: "staged",
    hash: "pending-wallet",
    time: "42 mins ago",
    savings: "+12.04 DAI",
    action: "Transaction staged",
  },
  {
    id: "ar-004",
    pair: "AERO → USDC",
    route: "Aerodrome V2 Direct",
    output: "843.12 USDC",
    amount: "900 AERO",
    impact: "0.27%",
    gas: "$0.34",
    score: 92,
    status: "failed",
    hash: "0x91c4...82fa",
    time: "1 hr ago",
    savings: "Reverted",
    action: "Swap failed",
  },
  {
    id: "ar-005",
    pair: "USDC → ETH",
    route: "Aerodrome V2 Direct",
    output: "0.157 ETH",
    amount: "500 USDC",
    impact: "0.21%",
    gas: "$0.41",
    score: 96,
    status: "confirmed",
    hash: "0x42ab...771e",
    time: "3 hrs ago",
    savings: "+0.002 ETH",
    action: "Swap completed",
  },
];

type StatusFilter = "all" | HistoryStatus;

const STATUS_FILTERS: { id: StatusFilter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "confirmed", label: "Confirmed" },
  { id: "simulated", label: "Simulated" },
  { id: "staged", label: "Staged" },
  { id: "failed", label: "Failed" },
];

type RouteTypeFilter = "direct" | "split" | "multihop";

type ExtraHistoryFilters = {
  routeTypes: RouteTypeFilter[];
  minScore: number | null;
};

const ROUTE_TYPE_OPTIONS: { id: RouteTypeFilter; label: string }[] = [
  { id: "direct", label: "Direct routes" },
  { id: "split", label: "Split routes" },
  { id: "multihop", label: "Multi-hop" },
];

const MIN_SCORE_OPTIONS: { value: number | null; label: string }[] = [
  { value: null, label: "Any score" },
  { value: 90, label: "Score 90+" },
  { value: 95, label: "Score 95+" },
];

const EMPTY_EXTRA_FILTERS: ExtraHistoryFilters = {
  routeTypes: [],
  minScore: null,
};

function pairToOptimizerHref(pair: string): string {
  const [from, to] = pair.split(" → ").map((part) => part.trim());
  if (!from || !to) {
    return "/route-optimizer";
  }
  const params = new URLSearchParams({ from, to });
  return `/route-optimizer?${params.toString()}`;
}

function matchesRouteType(item: HistoryItem, routeTypes: RouteTypeFilter[]): boolean {
  if (routeTypes.length === 0) return true;

  const route = item.route.toLowerCase();
  return routeTypes.some((type) => {
    if (type === "direct") return route.includes("direct");
    if (type === "split") return route.includes("split");
    if (type === "multihop") {
      return route.includes("multi-hop") || route.includes("multi hop");
    }
    return false;
  });
}

function matchesExtraFilters(
  item: HistoryItem,
  extra: ExtraHistoryFilters,
): boolean {
  if (extra.minScore != null && item.score < extra.minScore) {
    return false;
  }
  return matchesRouteType(item, extra.routeTypes);
}

function useCopyText() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copy = useCallback(async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(key);
      window.setTimeout(() => setCopiedKey(null), 2000);
      return true;
    } catch {
      return false;
    }
  }, []);

  return { copiedKey, copy };
}

function statusStyles(status: string) {
  switch (status) {
    case "confirmed":
      return "border-emerald-400/30 bg-emerald-400/10 text-emerald-300";
    case "simulated":
      return "border-cyan-400/30 bg-cyan-400/10 text-cyan-300";
    case "staged":
      return "border-orange-400/30 bg-orange-400/10 text-orange-300";
    case "failed":
      return "border-red-400/30 bg-red-400/10 text-red-300";
    default:
      return "border-white/10 bg-white/5 text-slate-300";
  }
}

function HistoryStatusIcon({ status }: { status: string }) {
  if (status === "confirmed") return <CheckCircle2 size={22} />;
  if (status === "failed") return <XCircle size={22} />;
  if (status === "simulated") return <ShieldCheck size={22} />;
  return <Clock3 size={22} />;
}

function matchesSearch(item: HistoryItem, query: string): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;

  const haystack = [
    item.pair,
    item.route,
    item.status,
    item.hash,
    item.action,
    item.id,
    item.amount,
    item.output,
    item.time,
    item.savings,
  ]
    .join(" ")
    .toLowerCase();

  return haystack.includes(q);
}

function StatCard({ stat }: { stat: (typeof stats)[number] }) {
  const Icon = stat.icon;
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="min-w-0 rounded-3xl border border-white/10 bg-white/[0.035] p-5 backdrop-blur-xl"
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-emerald-400/25 bg-emerald-400/10 text-emerald-300">
          <Icon size={22} />
        </div>
        <span className="shrink-0 rounded-full bg-emerald-400/10 px-3 py-1 text-xs text-emerald-300">
          {stat.change}
        </span>
      </div>
      <p className="mt-5 text-sm text-slate-500">{stat.label}</p>
      <p className="mt-2 text-3xl font-black tracking-tight text-white">
        {stat.value}
      </p>
    </motion.div>
  );
}

function HistoryCard({
  item,
  copyKey,
  copiedKey,
  onCopyHash,
}: {
  item: HistoryItem;
  copyKey: string;
  copiedKey: string | null;
  onCopyHash: (hash: string, key: string) => void;
}) {
  const isHashCopied = copiedKey === copyKey;
  const isDialogHashCopied = copiedKey === `${copyKey}-dialog`;
  const tokens = item.pair.split(" → ");
  const optimizerHref = pairToOptimizerHref(item.pair);

  return (
    <div className="relative min-w-0 overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.035] p-5 backdrop-blur-xl transition hover:border-emerald-400/30">
      <div className="flex min-w-0 flex-col gap-5 xl:flex-row xl:items-start xl:justify-between xl:gap-8">
        <div className="min-w-0 flex-1">
          <div className="flex min-w-0 gap-4">
            <div
              className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border ${statusStyles(item.status)}`}
            >
              <HistoryStatusIcon status={item.status} />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="break-words text-lg font-black text-white">
                  {item.pair}
                </h3>
                <span
                  className={`shrink-0 rounded-full border px-3 py-1 text-xs font-bold capitalize ${statusStyles(item.status)}`}
                >
                  {item.status}
                </span>
              </div>
              <p className="mt-1 break-words text-sm text-slate-500">
                {item.route} · {item.time}
              </p>
              <p className="mt-1 text-xs text-slate-500">{item.action}</p>
              <div className="mt-4 flex min-w-0 flex-wrap items-center gap-2">
                {tokens.map((token, index) => (
                  <React.Fragment key={`${item.id}-${token}-${index}`}>
                    <span className="max-w-full break-words rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3 py-1 text-xs font-bold text-emerald-100">
                      {token}
                    </span>
                    {index < tokens.length - 1 ? (
                      <ArrowRight
                        size={14}
                        className="shrink-0 text-orange-300"
                      />
                    ) : null}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid w-full min-w-0 grid-cols-2 gap-3 text-sm sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 lg:gap-4 xl:max-w-[42rem] xl:shrink-0">
          <MiniStat label="Amount" value={item.amount} />
          <MiniStat label="Output" value={item.output} />
          <MiniStat label="Impact" value={item.impact} accent />
          <MiniStat label="Gas" value={item.gas} />
          <MiniStat label="Score" value={`${item.score}`} large />
          <MiniStat
            label="Savings"
            value={item.savings}
            accent={item.status !== "failed"}
            danger={item.status === "failed"}
          />
        </div>
      </div>

      <div className="relative z-10 mt-5 flex min-w-0 flex-col gap-3 border-t border-white/10 pt-4">
        <div className="flex min-w-0 flex-col gap-2">
          <span className="min-w-0 truncate font-mono text-xs text-slate-500 sm:text-sm">
            {item.hash}
          </span>
          <button
            type="button"
            onClick={() => onCopyHash(item.hash, copyKey)}
            className={`inline-flex w-full min-w-0 items-center justify-center gap-2 rounded-xl border border-white/10 bg-black/20 px-4 py-2.5 text-sm font-bold text-slate-300 ${interactiveButtonClass}`}
            aria-label={
              isHashCopied ? `Copied hash ${item.hash}` : `Copy hash ${item.hash}`
            }
          >
            {isHashCopied ? (
              <>
                <Check size={16} className="text-emerald-300" />
                <span className="text-emerald-300">Copied</span>
              </>
            ) : (
              <>
                <Copy size={16} />
                <span>Copy hash</span>
              </>
            )}
          </button>
        </div>

        <Dialog>
          <DialogTrigger
            className={`inline-flex w-full min-w-0 items-center justify-center gap-2 rounded-xl border border-white/10 bg-black/20 px-4 py-2.5 text-sm font-bold text-slate-300 ${interactiveButtonClass}`}
          >
            View details
            <ExternalLink size={14} className="shrink-0" />
          </DialogTrigger>
          <DialogContent
            className="max-h-[min(90vh,640px)] overflow-y-auto border-white/10 bg-[#061018] text-slate-100 sm:max-w-lg"
            showCloseButton
          >
            <DialogHeader>
              <DialogTitle className="text-left text-xl font-black text-white">
                {item.pair}
              </DialogTitle>
              <DialogDescription className="text-left text-slate-400">
                {item.route} · {item.time}
              </DialogDescription>
            </DialogHeader>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <DetailRow label="Status" value={item.status} />
              <DetailRow label="Action" value={item.action} />
              <DetailRow label="Amount" value={item.amount} />
              <DetailRow label="Output" value={item.output} />
              <DetailRow label="Impact" value={item.impact} />
              <DetailRow label="Gas" value={item.gas} />
              <DetailRow label="Score" value={`${item.score}`} />
              <DetailRow label="Savings" value={item.savings} />
            </div>

            <div className="flex min-w-0 flex-col gap-2 rounded-xl border border-white/10 bg-black/20 p-3">
              <span className="min-w-0 break-all font-mono text-xs text-slate-400">
                {item.hash}
              </span>
              <button
                type="button"
                onClick={() => onCopyHash(item.hash, `${copyKey}-dialog`)}
                className={`inline-flex w-full min-w-0 items-center justify-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-xs font-bold text-slate-300 ${interactiveButtonClass}`}
              >
                {isDialogHashCopied ? (
                  <>
                    <Check size={14} className="text-emerald-300" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy size={14} />
                    Copy
                  </>
                )}
              </button>
            </div>

            <DialogFooter className="flex-col gap-2 border-white/10 bg-transparent p-0">
              <Link
                href={optimizerHref}
                className={`inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-400 to-cyan-400 px-4 py-2.5 text-sm font-black text-[#041014] ${interactiveButtonClass}`}
              >
                Open in Route Optimizer
                <Route size={16} />
              </Link>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

function HistoryFeatureCard({
  icon: Icon,
  title,
  text,
}: {
  icon: typeof History;
  title: string;
  text: string;
}) {
  return (
    <div className="flex min-w-0 flex-col gap-3 rounded-2xl border border-white/10 bg-black/20 p-5">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-emerald-400/25 bg-emerald-400/10 text-emerald-300">
        <Icon size={22} />
      </div>
      <div className="min-w-0">
        <h3 className="font-black text-white">{title}</h3>
        <p className="mt-2 break-words text-sm leading-relaxed text-slate-400">
          {text}
        </p>
      </div>
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0 rounded-xl border border-white/10 bg-black/20 p-3">
      <p className="text-xs text-slate-500">{label}</p>
      <p className="mt-1 break-words font-bold capitalize text-white">{value}</p>
    </div>
  );
}

function MiniStat({
  label,
  value,
  accent,
  danger,
  large,
}: {
  label: string;
  value: string;
  accent?: boolean;
  danger?: boolean;
  large?: boolean;
}) {
  return (
    <div className="min-w-0">
      <p className="text-xs text-slate-500">{label}</p>
      <p
        className={`mt-1 break-words font-black ${large ? "text-xl md:text-2xl" : "text-sm"} ${danger ? "text-red-300" : accent ? "text-emerald-300" : "text-white"}`}
      >
        {value}
      </p>
    </div>
  );
}

type FilterBarProps = {
  filter: StatusFilter;
  setFilter: (value: StatusFilter) => void;
  searchInput: string;
  setSearchInput: (value: string) => void;
  onSearch: () => void;
  onClear: () => void;
  extraFilters: ExtraHistoryFilters;
  onExtraFiltersChange: (value: ExtraHistoryFilters) => void;
};

function FilterBar({
  filter,
  setFilter,
  searchInput,
  setSearchInput,
  onSearch,
  onClear,
  extraFilters,
  onExtraFiltersChange,
}: FilterBarProps) {
  const hasSearchText = searchInput.trim().length > 0;
  const [moreFiltersOpen, setMoreFiltersOpen] = useState(false);
  const moreFiltersRef = useRef<HTMLDivElement>(null);

  const hasExtraFilters =
    extraFilters.routeTypes.length > 0 || extraFilters.minScore != null;

  useEffect(() => {
    if (!moreFiltersOpen) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (
        moreFiltersRef.current &&
        !moreFiltersRef.current.contains(event.target as Node)
      ) {
        setMoreFiltersOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, [moreFiltersOpen]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSearch();
  };

  const toggleRouteType = (routeType: RouteTypeFilter) => {
    const next = extraFilters.routeTypes.includes(routeType)
      ? extraFilters.routeTypes.filter((value) => value !== routeType)
      : [...extraFilters.routeTypes, routeType];

    onExtraFiltersChange({ ...extraFilters, routeTypes: next });
  };

  const clearExtraFilters = () => {
    onExtraFiltersChange(EMPTY_EXTRA_FILTERS);
  };

  return (
    <div className="w-full min-w-0 overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.035] p-4 backdrop-blur-xl sm:p-5">
      <div className="flex w-full min-w-0 flex-col gap-4">
        <form
          onSubmit={handleSubmit}
          className="flex w-full min-w-0 flex-col gap-3 sm:flex-row sm:items-stretch lg:max-w-2xl"
        >
          <label className="relative flex min-h-11 min-w-0 flex-1 items-center gap-3 rounded-2xl border border-white/10 bg-black/20 px-4 py-2.5">
            <Search size={18} className="shrink-0 text-slate-500" />
            <input
              type="search"
              value={searchInput}
              onChange={(event) => setSearchInput(event.target.value)}
              placeholder="Search routes, pairs, hashes..."
              className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
              aria-label="Search route history"
            />
          </label>
          <div className="flex w-full min-w-0 flex-col gap-2 sm:w-auto sm:flex-row">
            <button
              type="submit"
              className={`inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-400 to-cyan-400 px-5 py-2.5 text-sm font-black text-[#041014] sm:w-auto ${interactiveButtonClass}`}
            >
              <Search size={16} />
              Search
            </button>
            {hasSearchText ? (
              <button
                type="button"
                onClick={onClear}
                className={`inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-black/20 px-5 py-2.5 text-sm font-bold text-slate-300 sm:w-auto ${interactiveButtonClass}`}
              >
                <X size={16} />
                Clear
              </button>
            ) : null}
          </div>
        </form>

        <div className="flex w-full min-w-0 flex-col gap-3 lg:flex-row lg:items-start lg:justify-between lg:gap-4">
          <div className="flex min-w-0 flex-1 flex-wrap items-center justify-start gap-2 lg:justify-center">
            {STATUS_FILTERS.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setFilter(item.id)}
                className={`min-h-11 shrink-0 rounded-xl border px-4 py-2 text-sm font-bold ${interactiveButtonClass} ${
                  filter === item.id
                    ? "border-emerald-400/40 bg-emerald-400/10 text-emerald-300"
                    : "border-white/10 bg-black/20 text-slate-400"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div
            ref={moreFiltersRef}
            className="relative z-20 w-full shrink-0 lg:ml-auto lg:w-auto"
          >
            <button
              type="button"
              onClick={() => setMoreFiltersOpen((open) => !open)}
              aria-expanded={moreFiltersOpen}
              aria-haspopup="true"
              className={`inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border px-4 py-2 text-sm font-bold sm:w-auto ${
                moreFiltersOpen || hasExtraFilters
                  ? "border-emerald-400/40 bg-emerald-400/10 text-emerald-300"
                  : "border-white/10 bg-black/20 text-slate-300"
              } ${interactiveButtonClass}`}
            >
              <Filter size={16} />
              More filters
              <ChevronDown
                size={16}
                className={`transition ${moreFiltersOpen ? "rotate-180" : ""}`}
              />
            </button>

            {moreFiltersOpen ? (
              <div className="mt-2 w-full rounded-2xl border border-white/10 bg-[#061018] p-4 shadow-[0_12px_40px_rgba(0,0,0,0.45)] lg:absolute lg:right-0 lg:mt-2 lg:w-80">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
                  Route type
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {ROUTE_TYPE_OPTIONS.map((option) => {
                    const active = extraFilters.routeTypes.includes(option.id);
                    return (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() => toggleRouteType(option.id)}
                        className={`min-h-10 rounded-xl border px-3 py-2 text-xs font-bold ${interactiveButtonClass} ${
                          active
                            ? "border-emerald-400/40 bg-emerald-400/10 text-emerald-300"
                            : "border-white/10 bg-black/20 text-slate-400"
                        }`}
                      >
                        {option.label}
                      </button>
                    );
                  })}
                </div>

                <p className="mt-4 text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
                  Minimum score
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {MIN_SCORE_OPTIONS.map((option) => {
                    const active = extraFilters.minScore === option.value;
                    return (
                      <button
                        key={option.label}
                        type="button"
                        onClick={() =>
                          onExtraFiltersChange({
                            ...extraFilters,
                            minScore: option.value,
                          })
                        }
                        className={`min-h-10 rounded-xl border px-3 py-2 text-xs font-bold ${interactiveButtonClass} ${
                          active
                            ? "border-emerald-400/40 bg-emerald-400/10 text-emerald-300"
                            : "border-white/10 bg-black/20 text-slate-400"
                        }`}
                      >
                        {option.label}
                      </button>
                    );
                  })}
                </div>

                {hasExtraFilters ? (
                  <button
                    type="button"
                    onClick={clearExtraFilters}
                    className={`mt-4 inline-flex min-h-10 w-full items-center justify-center rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-xs font-bold text-slate-300 ${interactiveButtonClass}`}
                  >
                    Reset extra filters
                  </button>
                ) : null}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

function HistoryEmptyState({ onClear }: { onClear: () => void }) {
  return (
    <div className="rounded-[1.75rem] border border-dashed border-white/15 bg-white/[0.02] px-6 py-12 text-center">
      <p className="text-lg font-black text-white">
        No matching route history found
      </p>
      <p className="mx-auto mt-2 max-w-md text-sm text-slate-400">
        Try another search term or clear filters
      </p>
      <button
        type="button"
        onClick={onClear}
        className="mt-6 inline-flex min-h-11 items-center justify-center rounded-xl border border-emerald-400/30 bg-emerald-400/10 px-5 py-2.5 text-sm font-bold text-emerald-200 hover:bg-emerald-400/15"
      >
        Clear filters
      </button>
    </div>
  );
}

function InsightPanel() {
  return (
    <aside className="min-w-0 w-full space-y-6">
      <div className="rounded-[2rem] border border-orange-400/25 bg-gradient-to-br from-orange-400/10 via-white/[0.03] to-emerald-400/10 p-6 backdrop-blur-xl">
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-orange-400/10 text-orange-300">
            <Zap size={23} />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-300">
              AI Summary
            </p>
            <h3 className="text-xl font-black">Route performance</h3>
          </div>
        </div>
        <p className="text-sm leading-7 text-slate-300">
          AeroRoute AI detected that direct Aerodrome V2 routes are outperforming
          split routes for ETH → USDC by an average of 0.68% this session.
        </p>
        <div className="mt-5 space-y-3">
          {[
            "Best pair: ETH → USDC",
            "Lowest impact: 0.18%",
            "Failed route reason: slippage cap",
            "Recommended: simulate before signing",
          ].map((item) => (
            <div key={item} className="flex items-start gap-3 text-sm text-slate-300">
              <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-emerald-300" />
              <span className="min-w-0 break-words">{item}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 backdrop-blur-xl">
        <div className="mb-5 flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-300">
              Efficiency
            </p>
            <h3 className="text-xl font-black">Savings curve</h3>
          </div>
          <Gauge className="shrink-0 text-emerald-300" />
        </div>
        <svg viewBox="0 0 420 180" className="h-40 w-full max-w-full">
          <defs>
            <linearGradient id="historyArea" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#00F5A0" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#00F5A0" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M0 140 C45 108 68 155 105 112 C145 65 180 104 215 78 C260 44 290 112 335 62 C365 28 392 45 420 22 L420 180 L0 180 Z"
            fill="url(#historyArea)"
          />
          <path
            d="M0 140 C45 108 68 155 105 112 C145 65 180 104 215 78 C260 44 290 112 335 62 C365 28 392 45 420 22"
            fill="none"
            stroke="#00F5A0"
            strokeWidth="4"
          />
        </svg>
      </div>

      <div className="rounded-[2rem] border border-red-400/25 bg-red-400/5 p-6 backdrop-blur-xl">
        <div className="mb-4 flex items-center gap-3 text-red-300">
          <ShieldAlert size={22} className="shrink-0" />
          <h3 className="font-black">Failed route note</h3>
        </div>
        <p className="text-sm leading-7 text-slate-400">
          The failed AERO → USDC route reverted because expected output moved
          below your slippage limit before confirmation.
        </p>
      </div>
    </aside>
  );
}

export default function AeroRouteHistoryPreview() {
  const [filter, setFilter] = useState<StatusFilter>("all");
  const [searchInput, setSearchInput] = useState("");
  const [appliedSearch, setAppliedSearch] = useState("");
  const [extraFilters, setExtraFilters] =
    useState<ExtraHistoryFilters>(EMPTY_EXTRA_FILTERS);
  const { copiedKey, copy } = useCopyText();

  const filtered = useMemo(() => {
    let items = history;

    if (filter !== "all") {
      items = items.filter((item) => item.status === filter);
    }

    if (appliedSearch.trim()) {
      items = items.filter((item) => matchesSearch(item, appliedSearch));
    }

    items = items.filter((item) => matchesExtraFilters(item, extraFilters));

    return items;
  }, [filter, appliedSearch, extraFilters]);

  const handleSearch = () => {
    setAppliedSearch(searchInput);
  };

  const handleClear = () => {
    setSearchInput("");
    setAppliedSearch("");
  };

  const handleClearAll = () => {
    setFilter("all");
    setExtraFilters(EMPTY_EXTRA_FILTERS);
    handleClear();
  };

  const handleCopyHash = useCallback(
    (hash: string, key: string) => {
      void copy(hash, key);
    },
    [copy],
  );

  return (
    <AppPageRoot>
      <AppPageSection>
        <AppPageHeader>
          <PageTitleBlock
            badge={
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-emerald-300">
                <Sparkles size={14} /> Route execution records
              </div>
            }
            title={
              <>
                Route{" "}
                <span className="bg-gradient-to-r from-emerald-300 via-cyan-300 to-orange-300 bg-clip-text text-transparent">
                  History
                </span>
              </>
            }
            description="Review simulated, staged, completed, and failed Aerodrome route actions with AI performance insights."
            titleActions={<WalletStatusButtons />}
          />
        </AppPageHeader>

        <div className="mb-6 grid w-full min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <StatCard key={stat.label} stat={stat} />
          ))}
        </div>

        <FilterBar
          filter={filter}
          setFilter={setFilter}
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          onSearch={handleSearch}
          onClear={handleClear}
          extraFilters={extraFilters}
          onExtraFiltersChange={setExtraFilters}
        />

        <div className="mt-6 grid w-full min-w-0 grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(0,360px)]">
          <div className="min-w-0 space-y-4">
            {filtered.length > 0 ? (
              filtered.map((item) => (
                <HistoryCard
                  key={item.id}
                  item={item}
                  copyKey={item.id}
                  copiedKey={copiedKey}
                  onCopyHash={handleCopyHash}
                />
              ))
            ) : (
              <HistoryEmptyState onClear={handleClearAll} />
            )}
          </div>
          <InsightPanel />
        </div>

        <div className="mt-6 w-full min-w-0 overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.035] p-4 backdrop-blur-xl sm:p-5">
          <div className="grid w-full min-w-0 grid-cols-1 gap-4 sm:grid-cols-2">
            <HistoryFeatureCard
              icon={History}
              title="Full Timeline"
              text="Every route action in one place."
            />
            <HistoryFeatureCard
              icon={Timer}
              title="Execution Timing"
              text="Track speed and confirmation."
            />
            <HistoryFeatureCard
              icon={Info}
              title="Reasoning Notes"
              text="Understand route decisions."
            />
            <HistoryFeatureCard
              icon={ShieldCheck}
              title="Safety Audit"
              text="Review failures before retrying."
            />
          </div>
        </div>
      </AppPageSection>
    </AppPageRoot>
  );
}
