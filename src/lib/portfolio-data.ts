export type PortfolioBalance = {
  symbol: string;
  label: string;
  amount: string;
  usd: string;
  change: string;
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

export type PortfolioSnapshot = {
  modeLabel: string;
  addressLabel: string;
  address: string;
  totalValue: string;
  totalChange: string;
  balances: PortfolioBalance[];
  allocation: AllocationSlice[];
  activity: PortfolioActivity[];
  routeOpportunities: PortfolioInsight[];
  suggestedSwaps: PortfolioInsight[];
  liquidityAlerts: PortfolioInsight[];
};

export const DEMO_PORTFOLIO: PortfolioSnapshot = {
  modeLabel: "Demo Portfolio",
  addressLabel: "Preview wallet",
  address: "0xDemo…AeroRoute",
  totalValue: "$12,842.56",
  totalChange: "+2.4% (24h)",
  balances: [
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
  ],
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
      href: "/route-optimizer",
    },
    {
      id: "r2",
      title: "AERO → ETH split route",
      description: "Dual-hop through WETH pool on Base",
      href: "/route-optimizer",
    },
  ],
  suggestedSwaps: [
    {
      id: "s1",
      title: "Rebalance 15% ETH to USDC",
      description: "Reduce volatility before next Aerodrome epoch",
      href: "/agent-chat?prompt=Suggest%20a%20rebalance%20from%20ETH%20to%20USDC%20on%20Base",
    },
    {
      id: "s2",
      title: "Compound AERO rewards",
      description: "Swap veAERO emissions into USDC efficiently",
      href: "/agent-chat?prompt=Find%20best%20route%20to%20swap%20AERO%20to%20USDC%20on%20Base",
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
      href: "/agent-chat?prompt=Analyze%20ETH%20liquidity%20on%20Aerodrome%20for%20large%20swaps",
    },
  ],
};

export function getConnectedPortfolioSnapshot(
  walletAddress?: string,
): PortfolioSnapshot {
  const shortAddress = walletAddress
    ? `${walletAddress.slice(0, 6)}…${walletAddress.slice(-4)}`
    : "Connected";

  return {
    modeLabel: "Connected Wallet",
    addressLabel: "Your wallet on Base",
    address: walletAddress ?? shortAddress,
    totalValue: "$18,204.12",
    totalChange: "+3.1% (24h)",
    balances: [
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
    ],
    allocation: [
      { name: "ETH", value: 38, color: "#60a5fa" },
      { name: "USDC", value: 32, color: "#22d3ee" },
      { name: "AERO", value: 24, color: "#f97316" },
      { name: "Other", value: 6, color: "#a78bfa" },
    ],
    activity: [
      {
        id: "c1",
        title: "Received USDC",
        detail: "Transfer in · Base mainnet",
        time: "45m ago",
        tone: "cyan",
      },
      {
        id: "c2",
        title: "Swap USDC → AERO",
        detail: "Aerodrome · Agent-assisted route",
        time: "4h ago",
        tone: "emerald",
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
        href: "/route-optimizer",
      },
      {
        id: "cr2",
        title: "AERO boost route",
        description: "Pair with WETH hop for lower price impact",
        href: "/route-optimizer",
      },
    ],
    suggestedSwaps: [
      {
        id: "cs1",
        title: "Take profit on AERO",
        description: "Route 25% AERO to USDC with low slippage",
        href: "/agent-chat?prompt=Quote%20swapping%2025%25%20of%20my%20AERO%20to%20USDC%20on%20Base",
      },
      {
        id: "cs2",
        title: "Add ETH exposure",
        description: "Swap USDC → ETH using deepest Aerodrome pool",
        href: "/agent-chat?prompt=Find%20best%20USDC%20to%20ETH%20route%20on%20Aerodrome",
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
        href: "/agent-chat?prompt=When%20is%20the%20best%20time%20to%20swap%20ETH%20on%20Aerodrome",
      },
    ],
  };
}
