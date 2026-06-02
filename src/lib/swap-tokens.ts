export type SwapToken = {
  symbol: string;
  name: string;
  balance: string;
  balanceNum: number;
  color: string;
};

/** Demo balances for Swap Intent on dashboard and route optimizer (Base-focused). */
export const SWAP_TOKENS: SwapToken[] = [
  {
    symbol: "ETH",
    name: "Ethereum",
    balance: "4.2800",
    balanceNum: 4.28,
    color: "from-blue-500 to-violet-500",
  },
  {
    symbol: "WETH",
    name: "Wrapped Ether",
    balance: "2.1500",
    balanceNum: 2.15,
    color: "from-indigo-500 to-blue-600",
  },
  {
    symbol: "cbBTC",
    name: "Coinbase Wrapped BTC",
    balance: "0.1842",
    balanceNum: 0.1842,
    color: "from-amber-500 to-orange-600",
  },
  {
    symbol: "WBTC",
    name: "Wrapped Bitcoin",
    balance: "0.0920",
    balanceNum: 0.092,
    color: "from-orange-500 to-amber-600",
  },
  {
    symbol: "USDC",
    name: "USD Coin",
    balance: "4,820.00",
    balanceNum: 4820,
    color: "from-cyan-500 to-blue-500",
  },
  {
    symbol: "USDT",
    name: "Tether USD",
    balance: "2,140.50",
    balanceNum: 2140.5,
    color: "from-emerald-500 to-teal-600",
  },
  {
    symbol: "USDbC",
    name: "Bridged USDC",
    balance: "1,220.00",
    balanceNum: 1220,
    color: "from-violet-500 to-purple-600",
  },
  {
    symbol: "DAI",
    name: "Dai Stablecoin",
    balance: "1,845.30",
    balanceNum: 1845.3,
    color: "from-yellow-400 to-orange-500",
  },
  {
    symbol: "AERO",
    name: "Aerodrome",
    balance: "2,918.44",
    balanceNum: 2918.44,
    color: "from-red-500 to-blue-500",
  },
  {
    symbol: "LINK",
    name: "Chainlink",
    balance: "312.80",
    balanceNum: 312.8,
    color: "from-blue-400 to-cyan-500",
  },
  {
    symbol: "UNI",
    name: "Uniswap",
    balance: "428.15",
    balanceNum: 428.15,
    color: "from-pink-500 to-rose-600",
  },
  {
    symbol: "OP",
    name: "Optimism",
    balance: "1,056.00",
    balanceNum: 1056,
    color: "from-red-400 to-red-600",
  },
];

export function nextSwapTokenIndex(current: number, otherIndex: number, tokenCount = SWAP_TOKENS.length) {
  for (let i = 0; i < tokenCount; i++) {
    const next = (current + 1 + i) % tokenCount;
    if (next !== otherIndex) return next;
  }
  return current;
}
