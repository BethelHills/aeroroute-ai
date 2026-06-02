export type ProtocolCategory =
  | "DEX"
  | "Bridge"
  | "Lending"
  | "Network"
  | "AI Runtime";

export type ProtocolStatus = "Active" | "Beta" | "Monitoring";

export type ProtocolRisk = "Low" | "Medium" | "High";

export type Protocol = {
  id: string;
  name: string;
  category: ProtocolCategory;
  network: string;
  status: ProtocolStatus;
  description: string;
  supportedActions: string[];
  tvl: string;
  risk: ProtocolRisk;
};

export const PROTOCOL_CATEGORIES: Array<ProtocolCategory | "All"> = [
  "All",
  "DEX",
  "Bridge",
  "Lending",
  "Network",
  "AI Runtime",
];

export const PROTOCOLS: Protocol[] = [
  {
    id: "aerodrome",
    name: "Aerodrome",
    category: "DEX",
    network: "Base",
    status: "Active",
    description:
      "Primary liquidity hub on Base with volatile and stable pools, veAERO incentives, and concentrated liquidity routes.",
    supportedActions: ["Swap", "Route compare", "Pool depth", "Slippage sim"],
    tvl: "$1.8B",
    risk: "Low",
  },
  {
    id: "uniswap",
    name: "Uniswap",
    category: "DEX",
    network: "Base",
    status: "Active",
    description:
      "Universal AMM with v3 concentrated liquidity; common fallback path for ETH-stable and blue-chip pairs on Base.",
    supportedActions: ["Swap", "Quote", "Price impact", "Multi-hop"],
    tvl: "$2.4B",
    risk: "Low",
  },
  {
    id: "curve",
    name: "Curve",
    category: "DEX",
    network: "Base",
    status: "Active",
    description:
      "Stableswap-optimized pools for USDC, DAI, and LST pairs with low slippage on like-asset routes.",
    supportedActions: ["Stable swap", "Pool select", "Impact check"],
    tvl: "$620M",
    risk: "Low",
  },
  {
    id: "balancer",
    name: "Balancer",
    category: "DEX",
    network: "Base",
    status: "Active",
    description:
      "Weighted and composable pools for custom liquidity strategies and multi-asset routing.",
    supportedActions: ["Swap", "Batch route", "Pool weights"],
    tvl: "$310M",
    risk: "Medium",
  },
  {
    id: "across",
    name: "Across",
    category: "Bridge",
    network: "Base",
    status: "Active",
    description:
      "Intent-based bridging with competitive fees for moving assets into Base for swap execution.",
    supportedActions: ["Bridge in", "Bridge out", "ETA quote"],
    tvl: "$1.1B",
    risk: "Medium",
  },
  {
    id: "stargate",
    name: "Stargate",
    category: "Bridge",
    network: "Base",
    status: "Active",
    description:
      "Omnichain liquidity layer for native asset transfers across chains into Base.",
    supportedActions: ["Cross-chain transfer", "Liquidity check"],
    tvl: "$890M",
    risk: "Medium",
  },
  {
    id: "moonwell",
    name: "Moonwell",
    category: "Lending",
    network: "Base",
    status: "Active",
    description:
      "Native Base lending market for supplying collateral and borrowing against routed swap inventory.",
    supportedActions: ["Supply", "Borrow", "APY view", "Health factor"],
    tvl: "$480M",
    risk: "Medium",
  },
  {
    id: "seamless",
    name: "Seamless",
    category: "Lending",
    network: "Base",
    status: "Beta",
    description:
      "Modular lending protocol on Base with isolated markets and governance-driven risk parameters.",
    supportedActions: ["Lend", "Borrow", "Market scan"],
    tvl: "$210M",
    risk: "Medium",
  },
  {
    id: "compound",
    name: "Compound",
    category: "Lending",
    network: "Base",
    status: "Active",
    description:
      "Algorithmic money markets for USDC and WETH with composable cToken positions on Base.",
    supportedActions: ["Supply", "Borrow", "Rate compare"],
    tvl: "$540M",
    risk: "Low",
  },
  {
    id: "aave",
    name: "Aave",
    category: "Lending",
    network: "Base",
    status: "Active",
    description:
      "Deep lending liquidity with e-mode and flash-loan infrastructure for advanced route strategies.",
    supportedActions: ["Supply", "Borrow", "Flash loan", "e-mode"],
    tvl: "$1.3B",
    risk: "Low",
  },
  {
    id: "base",
    name: "Base",
    category: "Network",
    network: "Base",
    status: "Active",
    description:
      "Coinbase L2 settlement layer (chain ID 8453) where AeroRoute executes and simulates all routes.",
    supportedActions: ["Gas estimate", "Chain status", "Block time"],
    tvl: "—",
    risk: "Low",
  },
  {
    id: "aomi",
    name: "Aomi",
    category: "AI Runtime",
    network: "Base",
    status: "Active",
    description:
      "Agent runtime powering AeroRoute chat, simulation, and wallet-aware route preparation on Base.",
    supportedActions: ["Agent chat", "Simulate", "Tool routing", "BYOK models"],
    tvl: "—",
    risk: "Low",
  },
];

export function protocolAgentChatHref(protocolName: string): string {
  const prompt = `Analyze ${protocolName} on Base`;
  return `/agent-chat?prompt=${encodeURIComponent(prompt)}`;
}

export const ROUTE_OPTIMIZER_HREF = "/route-optimizer";
