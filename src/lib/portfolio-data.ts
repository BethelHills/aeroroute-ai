import { formatUnits } from "viem";

export const PORTFOLIO_AGENT_PROMPT =
  "Analyze my Base wallet and suggest the best Aerodrome route opportunities";

export const PORTFOLIO_AGENT_CHAT_HREF = `/agent-chat?prompt=${encodeURIComponent(PORTFOLIO_AGENT_PROMPT)}`;

export const PORTFOLIO_ROUTE_OPTIMIZER_HREF = "/route-optimizer";

/** Base mainnet token addresses for live balance reads. */
export const BASE_USDC_ADDRESS =
  "0x833589fCD6eDb6E08f4c7C32D4f71b54aDaA29" as const;
export const BASE_AERO_ADDRESS =
  "0x940181a94A35A4569e4529A3CD4bE3316c0D0C2" as const;

export type PortfolioBalance = {
  symbol: "ETH" | "USDC" | "AERO";
  label: string;
  amount: string;
  usd: string;
  change: string;
  live?: boolean;
};

export type AllocationSlice = {
  name: string;
  value: number;
  color: string;
};

export type PortfolioActivity = {
  id: string;
  title: string;
  detail: string;
  time: string;
  tone: "emerald" | "cyan" | "orange";
};

export type PortfolioInsight = {
  id: string;
  title: string;
  description: string;
  href: string;
};

export type PortfolioView = {
  mode: "demo" | "connected";
  modeLabel: string;
  addressLabel: string;
  address: string;
  chainLabel: string;
  statusNote: string;
  totalValue: string;
  totalChange: string;
  balances: PortfolioBalance[];
  allocation: AllocationSlice[];
  activity: PortfolioActivity[];
  routeOpportunities: PortfolioInsight[];
  suggestedSwaps: PortfolioInsight[];
  liquidityAlerts: PortfolioInsight[];
};

export type LiveBalanceInput = {
  eth?: bigint;
  ethDecimals?: number;
  usdc?: bigint;
  usdcDecimals?: number;
  aero?: bigint;
  aeroDecimals?: number;
};

const DEMO_BALANCES: PortfolioBalance[] = [
  {
    symbol: "ETH",
    label: "ETH Balance",
    amount: "4.2800 ETH",
    usd: "$8,420.00",
    change: "+1.8%",
  },
  {
    symbol: "USDC",
    label: "USDC Balance",
    amount: "1,240.00 USDC",
    usd: "$1,240.00",
    change: "+0.0%",
  },
  {
    symbol: "AERO",
    label: "AERO Balance",
    amount: "2,918.44 AERO",
    usd: "$3,182.56",
    change: "+6.2%",
  },
];

const CONNECTED_MOCK_BALANCES: PortfolioBalance[] = [
  {
    symbol: "ETH",
    label: "ETH Balance",
    amount: "5.1200 ETH",
    usd: "$10,080.00",
    change: "+2.2%",
  },
  {
    symbol: "USDC",
    label: "USDC Balance",
    amount: "2,480.00 USDC",
    usd: "$2,480.00",
    change: "+0.0%",
  },
  {
    symbol: "AERO",
    label: "AERO Balance",
    amount: "3,640.00 AERO",
    usd: "$5,644.12",
    change: "+8.4%",
  },
];

function formatTokenAmount(
  value: bigint,
  decimals: number,
  symbol: string,
  maxFractionDigits = symbol === "USDC" ? 2 : 4,
): string {
  const num = Number(formatUnits(value, decimals));
  const formatted = num.toLocaleString(undefined, {
    maximumFractionDigits: maxFractionDigits,
  });
  return `${formatted} ${symbol}`;
}

function applyLiveBalance(
  base: PortfolioBalance,
  raw: bigint | undefined,
  decimals: number | undefined,
): PortfolioBalance {
  if (raw === undefined || decimals === undefined) {
    return base;
  }
  const amount = formatTokenAmount(raw, decimals, base.symbol);
  return {
    ...base,
    amount,
    usd: "—",
    live: true,
  };
}

export function mergeLiveBalances(
  balances: PortfolioBalance[],
  live: LiveBalanceInput,
): PortfolioBalance[] {
  const bySymbol = Object.fromEntries(
    balances.map((b) => [b.symbol, b]),
  ) as Record<PortfolioBalance["symbol"], PortfolioBalance>;

  return [
    applyLiveBalance(bySymbol.ETH, live.eth, live.ethDecimals ?? 18),
    applyLiveBalance(bySymbol.USDC, live.usdc, live.usdcDecimals ?? 6),
    applyLiveBalance(bySymbol.AERO, live.aero, live.aeroDecimals ?? 18),
  ];
}

export function getDemoPortfolioView(): PortfolioView {
  return {
    mode: "demo",
    modeLabel: "Demo Portfolio",
    addressLabel: "Preview wallet",
    address: "0xDemo…AeroRoute",
    chainLabel: "Base · 8453",
    statusNote: "Connect a wallet to personalize this view with your address.",
    totalValue: "$12,842.56",
    totalChange: "+2.4% (24h)",
    balances: DEMO_BALANCES,
    allocation: [
      { name: "ETH", value: 42, color: "#60a5fa" },
      { name: "USDC", value: 28, color: "#22d3ee" },
      { name: "AERO", value: 22, color: "#f97316" },
      { name: "Other", value: 8, color: "#a78bfa" },
    ],
    activity: [
      {
        id: "1",
        title: "Swap ETH → USDC",
        detail: "Aerodrome · Best route saved $14.20",
        time: "2h ago",
        tone: "emerald",
      },
      {
        id: "2",
        title: "Added AERO liquidity",
        detail: "Aerodrome CL pool · $1,200 deposited",
        time: "Yesterday",
        tone: "cyan",
      },
      {
        id: "3",
        title: "Bridge from Ethereum",
        detail: "Across · 0.5 ETH to Base",
        time: "3d ago",
        tone: "orange",
      },
    ],
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
    ],
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
    ],
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
    ],
  };
}

export function getConnectedPortfolioView(
  walletAddress: string,
  chainId?: number,
  live?: LiveBalanceInput,
): PortfolioView {
  const hasLive = Boolean(live?.eth ?? live?.usdc ?? live?.aero);
  const balances = mergeLiveBalances(CONNECTED_MOCK_BALANCES, live ?? {});

  return {
    mode: "connected",
    modeLabel: "Connected Wallet",
    addressLabel: "Your wallet on Base",
    address: walletAddress,
    chainLabel: chainId ? `Base · ${chainId}` : "Base · 8453",
    statusNote: hasLive
      ? "Live on-chain balances for ETH, USDC, and AERO. USD estimates use mock pricing until price feeds ship."
      : "Showing mock balances until on-chain reads finish loading.",
    totalValue: hasLive ? "Live (partial)" : "$18,204.12",
    totalChange: "+3.1% (24h)",
    balances,
    allocation: [
      { name: "ETH", value: 38, color: "#60a5fa" },
      { name: "USDC", value: 32, color: "#22d3ee" },
      { name: "AERO", value: 24, color: "#f97316" },
      { name: "Other", value: 6, color: "#a78bfa" },
    ],
    activity: [
      {
        id: "c1",
        title: "Route quote · USDC → AERO",
        detail: "Aerodrome CL · saved via AeroRoute optimizer",
        time: "45m ago",
        tone: "emerald",
      },
      {
        id: "c2",
        title: "Swap USDC → AERO",
        detail: "Aerodrome · Agent-assisted route",
        time: "4h ago",
        tone: "cyan",
      },
      {
        id: "c3",
        title: "Staked AERO",
        detail: "veAERO position · epoch rewards pending",
        time: "2d ago",
        tone: "orange",
      },
    ],
    routeOpportunities: [
      {
        id: "cr1",
        title: "USDC → ETH Aerodrome exit",
        description: "Tighter spread vs aggregator for your wallet size",
        href: PORTFOLIO_ROUTE_OPTIMIZER_HREF,
      },
      {
        id: "cr2",
        title: "AERO boost route",
        description: "Pair with WETH hop for lower price impact",
        href: PORTFOLIO_ROUTE_OPTIMIZER_HREF,
      },
    ],
    suggestedSwaps: [
      {
        id: "cs1",
        title: "Take profit on AERO",
        description: "Route 25% AERO to USDC with low slippage",
        href: `/agent-chat?prompt=${encodeURIComponent("Quote swapping 25% of my AERO to USDC on Base")}`,
      },
      {
        id: "cs2",
        title: "Add ETH exposure",
        description: "Swap USDC → ETH using deepest Aerodrome pool",
        href: `/agent-chat?prompt=${encodeURIComponent("Find best USDC to ETH route on Aerodrome")}`,
      },
    ],
    liquidityAlerts: [
      {
        id: "cl1",
        title: "Your AERO pool is in-range",
        description: "CL position earning fees · no action needed",
        href: "/protocols",
      },
      {
        id: "cl2",
        title: "ETH/USDC spread tightened",
        description: "Good window for size-limited swaps on Aerodrome",
        href: `/agent-chat?prompt=${encodeURIComponent("When is the best time to swap ETH on Aerodrome")}`,
      },
    ],
  };
}
