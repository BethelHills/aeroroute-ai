import { formatUnits } from "viem";

export const PORTFOLIO_AGENT_PROMPT =
  "Analyze my Base wallet and suggest the best Aerodrome route opportunities";

export const PORTFOLIO_AGENT_CHAT_HREF = `/agent-chat?prompt=${encodeURIComponent(PORTFOLIO_AGENT_PROMPT)}`;

export const PORTFOLIO_ROUTE_OPTIMIZER_HREF = "/route-optimizer";

export const BASE_USDC_ADDRESS =
  "0x833589fCD6eDb6E08f4c7C32D4f71b54bDA02913" as const;
export const BASE_AERO_ADDRESS =
  "0x940181a94A35A4569E4529A3CDfB74e38FD98631" as const;

export const PORTFOLIO_MOCK_PRICES = {
  ETH: 3182.45,
  USDC: 1,
  AERO: 1.3,
} as const;

export type PortfolioDataMode = "Live" | "Demo";

export type PortfolioAsset = {
  symbol: string;
  name: string;
  balance: string;
  value: string;
  change: string;
  allocation: number;
  routeUse: string;
  isLive?: boolean;
  /** @deprecated Use isLive */
  live?: boolean;
};

export type PortfolioViewAsset = PortfolioAsset;

export type PortfolioSummaryView = {
  totalValue: string;
  dailyChange: string;
  dailyPercent: string;
  routeReadiness: string;
  riskLevel: string;
};

export type PortfolioViewData = {
  dataMode: PortfolioDataMode;
  isLoading: boolean;
  readFailed: boolean;
  assets: PortfolioViewAsset[];
  summary: PortfolioSummaryView;
  activity: RouteActivity[];
};

export type RouteActivity = {
  pair: string;
  action: string;
  time: string;
  status: "Completed" | "Simulated" | "Staged";
};

export const portfolioAssets: PortfolioAsset[] = [
  {
    symbol: "ETH",
    name: "Ethereum",
    balance: "4.2800",
    value: "$13,617.12",
    change: "+3.8%",
    allocation: 54,
    routeUse: "Primary swap asset",
  },
  {
    symbol: "USDC",
    name: "USD Coin",
    balance: "4,820.00",
    value: "$4,820.00",
    change: "+0.0%",
    allocation: 19,
    routeUse: "Stable routing pair",
  },
  {
    symbol: "AERO",
    name: "Aerodrome",
    balance: "2,918.44",
    value: "$3,793.97",
    change: "+8.6%",
    allocation: 15,
    routeUse: "Protocol exposure",
  },
  {
    symbol: "DAI",
    name: "Dai Stablecoin",
    balance: "1,845.30",
    value: "$1,845.30",
    change: "+0.1%",
    allocation: 7,
    routeUse: "Stable fallback",
  },
  {
    symbol: "USDbC",
    name: "Bridged USDC",
    balance: "1,220.00",
    value: "$1,220.00",
    change: "-0.1%",
    allocation: 5,
    routeUse: "Base stable route",
  },
];

export const recentRouteActivity: RouteActivity[] = [
  {
    pair: "ETH → USDC",
    action: "Best route simulated",
    time: "4 mins ago",
    status: "Simulated",
  },
  {
    pair: "USDC → AERO",
    action: "Swap completed",
    time: "22 mins ago",
    status: "Completed",
  },
  {
    pair: "ETH → DAI",
    action: "Transaction staged",
    time: "1 hr ago",
    status: "Staged",
  },
];

export const portfolioSummary = {
  totalValue: "$25,296.39",
  dailyChange: "+$842.18",
  dailyPercent: "+3.44%",
  routeReadiness: "High",
  riskLevel: "Low",
};

export const ALLOCATION_COLORS: Record<string, string> = {
  ETH: "#60a5fa",
  USDC: "#22d3ee",
  AERO: "#f97316",
  DAI: "#fbbf24",
  USDbC: "#a78bfa",
};

export type AllocationSlice = {
  name: string;
  value: number;
  color: string;
};

export type PortfolioInsight = {
  id: string;
  title: string;
  description: string;
  href: string;
};

export const portfolioInsights = {
  routeOpportunities: [
    {
      id: "r1",
      title: "ETH → USDC via Aerodrome CL",
      description: "0.18% impact · $22 better than Uniswap path",
      href: PORTFOLIO_ROUTE_OPTIMIZER_HREF,
    },
    {
      id: "r2",
      title: "AERO → ETH split route",
      description: "Dual-hop through WETH pool on Base",
      href: PORTFOLIO_ROUTE_OPTIMIZER_HREF,
    },
  ] satisfies PortfolioInsight[],
  suggestedSwaps: [
    {
      id: "s1",
      title: "Rebalance 15% ETH to USDC",
      description: "Reduce volatility before next Aerodrome epoch",
      href: `/agent-chat?prompt=${encodeURIComponent("Suggest a rebalance from ETH to USDC on Base")}`,
    },
    {
      id: "s2",
      title: "Compound AERO rewards",
      description: "Swap veAERO emissions into USDC efficiently",
      href: `/agent-chat?prompt=${encodeURIComponent("Find best route to swap AERO to USDC on Base")}`,
    },
  ] satisfies PortfolioInsight[],
  liquidityAlerts: [
    {
      id: "l1",
      title: "USDC pool depth +12%",
      description: "Aerodrome stable pair liquidity increased on Base",
      href: "/protocols",
    },
    {
      id: "l2",
      title: "ETH volatility watch",
      description: "Widen slippage tolerance above 0.35% for large swaps",
      href: `/agent-chat?prompt=${encodeURIComponent("Analyze ETH liquidity on Aerodrome for large swaps")}`,
    },
  ] satisfies PortfolioInsight[],
};

export const DEMO_WALLET_ADDRESS = "0xDemo…AeroRoute";

export const CORE_ASSET_SYMBOLS = ["ETH", "USDC", "AERO"] as const;

export type LiveBalanceInput = {
  eth?: bigint;
  ethDecimals?: number;
  usdc?: bigint;
  usdcDecimals?: number;
  aero?: bigint;
  aeroDecimals?: number;
};

export type PortfolioState = {
  mode: "demo" | "connected";
  modeLabel: string;
  addressLabel: string;
  address: string;
  chainLabel: string;
  statusNote: string;
  summary: typeof portfolioSummary;
  assets: PortfolioAsset[];
  activity: RouteActivity[];
};

export function assetsToAllocation(assets: PortfolioAsset[]): AllocationSlice[] {
  return assets.map((asset) => ({
    name: asset.symbol,
    value: asset.allocation,
    color: ALLOCATION_COLORS[asset.symbol] ?? "#94a3b8",
  }));
}

function formatBalanceAmount(
  value: bigint,
  decimals: number,
  symbol: string,
): string {
  const num = Number(formatUnits(value, decimals));
  const maxFractionDigits = symbol === "USDC" ? 2 : 4;
  return num.toLocaleString(undefined, { maximumFractionDigits: maxFractionDigits });
}

function applyLiveBalance(
  asset: PortfolioAsset,
  raw: bigint | undefined,
  decimals: number | undefined,
): PortfolioAsset {
  if (raw === undefined || decimals === undefined) {
    return asset;
  }
  return {
    ...asset,
    balance: formatBalanceAmount(raw, decimals, asset.symbol),
    value: "—",
    isLive: true,
    live: true,
  };
}

export function mergeLiveBalances(
  assets: PortfolioAsset[],
  live: LiveBalanceInput,
): PortfolioAsset[] {
  return assets.map((asset) => {
    switch (asset.symbol) {
      case "ETH":
        return applyLiveBalance(asset, live.eth, live.ethDecimals ?? 18);
      case "USDC":
        return applyLiveBalance(asset, live.usdc, live.usdcDecimals ?? 6);
      case "AERO":
        return applyLiveBalance(asset, live.aero, live.aeroDecimals ?? 18);
      default:
        return asset;
    }
  });
}

function formatBalanceDisplay(
  raw: bigint,
  decimals: number,
  symbol: string,
): string {
  const num = Number(formatUnits(raw, decimals));
  if (!Number.isFinite(num)) {
    return "0";
  }
  const maxFractionDigits =
    symbol === "USDC" ? 2 : symbol === "AERO" ? 4 : 4;
  return num.toLocaleString(undefined, {
    maximumFractionDigits: maxFractionDigits,
    minimumFractionDigits: 0,
  });
}

function formatUsd(value: number): string {
  return value.toLocaleString(undefined, {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  });
}

function parseUsdValue(value: string): number {
  const parsed = Number(value.replace(/[$,]/g, ""));
  return Number.isFinite(parsed) ? parsed : 0;
}

function computeAllocations(
  assets: PortfolioViewAsset[],
): PortfolioViewAsset[] {
  const values = assets.map((asset) => parseUsdValue(asset.value));
  const total = values.reduce((sum, value) => sum + value, 0);

  if (total <= 0) {
    return assets.map((asset) => ({ ...asset, allocation: 0 }));
  }

  const withAlloc = assets.map((asset, index) => ({
    ...asset,
    allocation: Math.round((values[index]! / total) * 100),
  }));

  const sumAlloc = withAlloc.reduce((sum, asset) => sum + asset.allocation, 0);
  if (sumAlloc !== 100 && withAlloc.length > 0) {
    const last = withAlloc.length - 1;
    withAlloc[last] = {
      ...withAlloc[last]!,
      allocation: withAlloc[last]!.allocation + (100 - sumAlloc),
    };
  }

  return withAlloc;
}

function deriveRouteReadiness(assets: PortfolioViewAsset[]): string {
  const eth = assets.find((asset) => asset.symbol === "ETH");
  const usdc = assets.find((asset) => asset.symbol === "USDC");
  const ethUsd = eth ? parseUsdValue(eth.value) : 0;
  const usdcUsd = usdc ? parseUsdValue(usdc.value) : 0;

  if (ethUsd >= 100 || usdcUsd >= 500) {
    return "High";
  }
  if (ethUsd > 0 || usdcUsd > 0) {
    return "Medium";
  }
  return "Low";
}

export function buildDemoPortfolioView(): PortfolioViewData {
  return {
    dataMode: "Demo",
    isLoading: false,
    readFailed: false,
    assets: portfolioAssets,
    summary: { ...portfolioSummary },
    activity: recentRouteActivity,
  };
}

export type BuildLivePortfolioInput = {
  eth: bigint;
  ethDecimals: number;
  usdc: bigint;
  usdcDecimals: number;
  aero: bigint;
  aeroDecimals: number;
  isLoading?: boolean;
  readFailed?: boolean;
};

export function buildLivePortfolioView(
  input: BuildLivePortfolioInput,
): PortfolioViewData {
  const loadingLabel = "…";

  const ethAmount = Number(formatUnits(input.eth, input.ethDecimals));
  const usdcAmount = Number(formatUnits(input.usdc, input.usdcDecimals));
  const aeroAmount = Number(formatUnits(input.aero, input.aeroDecimals));

  const ethValue = ethAmount * PORTFOLIO_MOCK_PRICES.ETH;
  const usdcValue = usdcAmount * PORTFOLIO_MOCK_PRICES.USDC;
  const aeroValue = aeroAmount * PORTFOLIO_MOCK_PRICES.AERO;

  const assets = portfolioAssets.map((asset) => {
    if (asset.symbol === "ETH") {
      return {
        ...asset,
        balance: input.isLoading
          ? loadingLabel
          : formatBalanceDisplay(input.eth, input.ethDecimals, "ETH"),
        value: input.isLoading ? loadingLabel : formatUsd(ethValue),
        isLive: true,
      };
    }
    if (asset.symbol === "USDC") {
      return {
        ...asset,
        balance: input.isLoading
          ? loadingLabel
          : formatBalanceDisplay(input.usdc, input.usdcDecimals, "USDC"),
        value: input.isLoading ? loadingLabel : formatUsd(usdcValue),
        isLive: true,
      };
    }
    if (asset.symbol === "AERO") {
      return {
        ...asset,
        balance: input.isLoading
          ? loadingLabel
          : formatBalanceDisplay(input.aero, input.aeroDecimals, "AERO"),
        value: input.isLoading ? loadingLabel : formatUsd(aeroValue),
        isLive: true,
      };
    }
    return { ...asset, isLive: false };
  });

  const allocated = computeAllocations(assets);
  const mockOnlyUsd = allocated
    .filter((asset) => !asset.isLive)
    .reduce((sum, asset) => sum + parseUsdValue(asset.value), 0);
  const liveUsd = ethValue + usdcValue + aeroValue;
  const totalUsd = input.isLoading ? 0 : liveUsd + mockOnlyUsd;

  return {
    dataMode: "Live",
    isLoading: Boolean(input.isLoading),
    readFailed: Boolean(input.readFailed),
    assets: allocated,
    summary: {
      totalValue: input.isLoading ? loadingLabel : formatUsd(totalUsd),
      dailyChange: portfolioSummary.dailyChange,
      dailyPercent: portfolioSummary.dailyPercent,
      routeReadiness: input.isLoading
        ? "…"
        : deriveRouteReadiness(allocated),
      riskLevel: portfolioSummary.riskLevel,
    },
    activity: recentRouteActivity,
  };
}

export function getDemoPortfolioState(): PortfolioState {
  return {
    mode: "demo",
    modeLabel: "Demo Portfolio",
    addressLabel: "Preview wallet",
    address: DEMO_WALLET_ADDRESS,
    chainLabel: "Base · 8453",
    statusNote:
      "Connect a wallet to personalize this view with your address and live balances.",
    summary: portfolioSummary,
    assets: portfolioAssets,
    activity: recentRouteActivity,
  };
}

export function getConnectedPortfolioState(
  walletAddress: string,
  chainId?: number,
  live?: LiveBalanceInput,
): PortfolioState {
  const hasLive = Boolean(live?.eth ?? live?.usdc ?? live?.aero);
  const assets = mergeLiveBalances(portfolioAssets, live ?? {});

  return {
    mode: "connected",
    modeLabel: "Connected Wallet",
    addressLabel: "Your wallet on Base",
    address: walletAddress,
    chainLabel: chainId ? `Base · ${chainId}` : "Base · 8453",
    statusNote: hasLive
      ? "Live on-chain balances for ETH, USDC, and AERO. Other assets remain mock until indexed."
      : "Loading live balances for core routing assets on Base.",
    summary: {
      ...portfolioSummary,
      totalValue: hasLive ? portfolioSummary.totalValue : portfolioSummary.totalValue,
    },
    assets,
    activity: recentRouteActivity,
  };
}
