export type ProtocolCategory =
  | "DEX"
  | "Bridge"
  | "Lending"
  | "Network"
  | "AI Runtime";

export type RiskLevel = "Low" | "Medium" | "High";

export interface Protocol {
  id: string;
  name: string;
  category: ProtocolCategory;
  network: string;
  status: "Active" | "Ready" | "Preview";
  tvl: string;
  risk: RiskLevel;
  description: string;
  actions: string[];
  accent: string;
}

export const protocols: Protocol[] = [
  {
    id: "aerodrome",
    name: "Aerodrome",
    category: "DEX",
    network: "Base",
    status: "Active",
    tvl: "$850M",
    risk: "Low",
    description:
      "Base's leading liquidity hub for swaps, routing, and incentives.",
    actions: ["Swap", "Liquidity", "Route Analysis"],
    accent: "from-emerald-500/20 to-cyan-500/20",
  },
  {
    id: "uniswap",
    name: "Uniswap",
    category: "DEX",
    network: "Base",
    status: "Active",
    tvl: "$620M",
    risk: "Low",
    description:
      "Decentralized exchange supporting concentrated liquidity pools.",
    actions: ["Swap", "Liquidity"],
    accent: "from-pink-500/20 to-purple-500/20",
  },
  {
    id: "curve",
    name: "Curve",
    category: "DEX",
    network: "Base",
    status: "Ready",
    tvl: "$210M",
    risk: "Low",
    description:
      "Optimized stablecoin liquidity and low-slippage swaps.",
    actions: ["Stable Swaps"],
    accent: "from-orange-500/20 to-yellow-500/20",
  },
  {
    id: "balancer",
    name: "Balancer",
    category: "DEX",
    network: "Base",
    status: "Ready",
    tvl: "$175M",
    risk: "Medium",
    description:
      "Composable liquidity pools and custom asset weighting.",
    actions: ["Liquidity", "Routing"],
    accent: "from-cyan-500/20 to-blue-500/20",
  },
  {
    id: "across",
    name: "Across",
    category: "Bridge",
    network: "Ethereum ↔ Base",
    status: "Active",
    tvl: "$490M",
    risk: "Medium",
    description:
      "Fast cross-chain asset bridging with low fees.",
    actions: ["Bridge Assets"],
    accent: "from-green-500/20 to-teal-500/20",
  },
  {
    id: "stargate",
    name: "Stargate",
    category: "Bridge",
    network: "Multi-chain",
    status: "Active",
    tvl: "$390M",
    risk: "Medium",
    description:
      "Cross-chain liquidity transport across major ecosystems.",
    actions: ["Bridge Assets"],
    accent: "from-indigo-500/20 to-cyan-500/20",
  },
  {
    id: "moonwell",
    name: "Moonwell",
    category: "Lending",
    network: "Base",
    status: "Active",
    tvl: "$560M",
    risk: "Medium",
    description:
      "Borrow and lend crypto assets on Base.",
    actions: ["Borrow", "Supply"],
    accent: "from-violet-500/20 to-blue-500/20",
  },
  {
    id: "seamless",
    name: "Seamless",
    category: "Lending",
    network: "Base",
    status: "Ready",
    tvl: "$145M",
    risk: "Medium",
    description:
      "Permissionless lending and borrowing markets.",
    actions: ["Borrow", "Supply"],
    accent: "from-emerald-500/20 to-green-500/20",
  },
  {
    id: "compound",
    name: "Compound",
    category: "Lending",
    network: "Base",
    status: "Ready",
    tvl: "$300M",
    risk: "Low",
    description:
      "Algorithmic money markets for lending and borrowing.",
    actions: ["Lending"],
    accent: "from-green-500/20 to-lime-500/20",
  },
  {
    id: "aave",
    name: "Aave",
    category: "Lending",
    network: "Base",
    status: "Ready",
    tvl: "$900M",
    risk: "Low",
    description:
      "One of the largest DeFi lending protocols.",
    actions: ["Lending", "Borrowing"],
    accent: "from-purple-500/20 to-indigo-500/20",
  },
  {
    id: "base",
    name: "Base",
    category: "Network",
    network: "Layer 2",
    status: "Active",
    tvl: "$5.2B",
    risk: "Low",
    description:
      "Ethereum Layer 2 network developed by Coinbase.",
    actions: ["Deploy", "Transact"],
    accent: "from-blue-500/20 to-cyan-500/20",
  },
  {
    id: "aomi",
    name: "Aomi",
    category: "AI Runtime",
    network: "Multi-chain",
    status: "Active",
    tvl: "N/A",
    risk: "Low",
    description:
      "Agent runtime powering AeroRoute AI workflows.",
    actions: ["Automation", "Execution"],
    accent: "from-orange-500/20 to-red-500/20",
  },
];

export const protocolCategories: ProtocolCategory[] = [
  "DEX",
  "Bridge",
  "Lending",
  "Network",
  "AI Runtime",
];

export function protocolAgentChatHref(protocolName: string): string {
  const prompt = `Analyze ${protocolName} on Base`;
  return `/agent-chat?prompt=${encodeURIComponent(prompt)}`;
}

export const ROUTE_OPTIMIZER_HREF = "/route-optimizer";
