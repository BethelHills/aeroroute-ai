import type { LucideIcon } from "lucide-react";
import {
  Activity,
  BarChart3,
  Cpu,
  Layers,
  Lock,
  Network,
  Rocket,
  Route,
  ShieldCheck,
  Wallet,
  Waves,
  Zap,
} from "lucide-react";

export const navLinks = [
  "Features",
  "Routes",
  "Analytics",
  "How It Works",
  "Docs",
  "Integrations",
];

export const protocols = ["Aerodrome", "Base", "Across", "Stargate", "Aomi"];

export const routeTokens = ["ETH", "WETH", "USDbC", "USDC"];

export const routeRows: [string, string, string, string][] = [
  ["Route 1", "3,176.82 USDC", "0.18%", "Best"],
  ["Route 2", "3,166.24 USDC", "0.42%", "Good"],
  ["Route 3", "3,154.67 USDC", "0.78%", "Risky"],
];

export type Feature = {
  icon: LucideIcon;
  title: string;
  text: string;
  glow: string;
};

export const features: Feature[] = [
  {
    icon: Route,
    title: "Route Intelligence",
    text: "AI compares swap paths across Aerodrome pools to find the most efficient execution route.",
    glow: "from-emerald-400 to-cyan-400",
  },
  {
    icon: Waves,
    title: "Liquidity Discovery",
    text: "Discover deep liquidity, concentrated pools, and routing opportunities across Base.",
    glow: "from-orange-400 to-amber-300",
  },
  {
    icon: ShieldCheck,
    title: "Slippage Protection",
    text: "Estimate price impact and slippage before execution so users trade with more confidence.",
    glow: "from-cyan-400 to-blue-500",
  },
  {
    icon: Zap,
    title: "AI Simulation Engine",
    text: "Simulate route outcomes before wallet confirmation using Aomi-powered workflows.",
    glow: "from-fuchsia-500 to-purple-500",
  },
];

export type Step = {
  icon: LucideIcon;
  title: string;
  text: string;
};

export const steps: Step[] = [
  { icon: Wallet, title: "Connect Wallet", text: "Connect your wallet on Base securely." },
  { icon: Layers, title: "Select Tokens", text: "Choose token pair and swap amount." },
  { icon: Cpu, title: "Analyze Routes", text: "AI scans liquidity and compares paths." },
  { icon: BarChart3, title: "Simulate Swap", text: "Review slippage, gas, and expected output." },
  { icon: Rocket, title: "Execute on Base", text: "Confirm the best route from your wallet." },
];

export const analyticsBullets = [
  "Real-time pool data",
  "Price impact analysis",
  "Route efficiency scoring",
  "Historical route performance",
];

export const analyticsMetrics = [
  { label: "Best Route", value: "98/100", sub: "Excellent" },
  { label: "Output", value: "3,176.82", sub: "USDC" },
  { label: "Impact", value: "0.18%", sub: "Very Low" },
  { label: "Efficiency", value: "98.6%", sub: "Top 2%" },
];

export const liquidityBars = [52, 88, 62];

export type EcosystemItem = {
  icon: LucideIcon;
  title: string;
  text: string;
};

export const ecosystemItems: EcosystemItem[] = [
  { icon: Lock, title: "Non-Custodial", text: "You stay in control." },
  { icon: Network, title: "Base Native", text: "Built for Base speed." },
  { icon: Cpu, title: "AI Assisted", text: "Modeled route logic." },
  { icon: Activity, title: "Real-time Data", text: "Live liquidity insights." },
  { icon: ShieldCheck, title: "Wallet Controlled", text: "You approve every tx." },
];

export const footerGroups = ["Product", "Resources", "Company"];

export const footerLinks = ["Route Optimizer", "Analytics", "Documentation", "Guides"];
