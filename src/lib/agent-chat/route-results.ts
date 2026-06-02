export type RouteResult = {
  id: string;
  name: string;
  protocol: string;
  network: string;
  routePath: string;
  expectedOutput: string;
  priceImpact: string;
  gasEstimate: string;
  routeScore: number;
  badge?: string;
  highlighted?: boolean;
};

export const MOCK_ROUTE_RESULTS: RouteResult[] = [
  {
    id: "aerodrome-v2-direct",
    name: "Aerodrome V2 Direct",
    protocol: "Aerodrome V2",
    network: "Base · 8453",
    routePath: "ETH → USDC",
    expectedOutput: "3,176.82 USDC",
    priceImpact: "0.18%",
    gasEstimate: "$0.48 · 0.00016 ETH",
    routeScore: 98,
    badge: "Best",
    highlighted: true,
  },
  {
    id: "aerodrome-cl-split",
    name: "Aerodrome CL Split",
    protocol: "Aerodrome CL",
    network: "Base · 8453",
    routePath: "ETH → WETH → USDC",
    expectedOutput: "3,166.24 USDC",
    priceImpact: "0.42%",
    gasEstimate: "$0.52 · 0.00017 ETH",
    routeScore: 91,
    badge: "Balanced",
  },
  {
    id: "stable-multi-hop",
    name: "Stable Multi-Hop",
    protocol: "Aerodrome Stable",
    network: "Base · 8453",
    routePath: "ETH → USDbC → USDC",
    expectedOutput: "3,154.67 USDC",
    priceImpact: "0.78%",
    gasEstimate: "$0.61 · 0.00020 ETH",
    routeScore: 86,
    badge: "Fallback",
  },
];

const ROUTE_RESULT_KEYWORDS = [
  "route",
  "swap",
  "quote",
  "best path",
  "optimize",
] as const;

export function shouldShowRouteResults(prompt: string): boolean {
  const normalized = prompt.toLowerCase();
  return ROUTE_RESULT_KEYWORDS.some((keyword) => normalized.includes(keyword));
}

export function extractMessageText(
  content: ReadonlyArray<{ type: string; text?: string }>,
): string {
  return content
    .filter((part) => part.type === "text" && typeof part.text === "string")
    .map((part) => part.text!)
    .join("\n");
}
