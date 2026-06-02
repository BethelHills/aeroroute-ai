const LOCAL = "/tokens";
const SPOT =
  "https://cdn.jsdelivr.net/gh/spothq/cryptocurrency-icons@master/128/color";

/** Local-first logo paths (served from /public/tokens). */
const LOCAL_ICON: Record<string, string> = {
  ETH: `${LOCAL}/eth.png`,
  WETH: `${LOCAL}/weth.png`,
  cbBTC: `${LOCAL}/cbbtc.png`,
  WBTC: `${LOCAL}/wbtc.png`,
  USDC: `${LOCAL}/usdc.png`,
  USDT: `${LOCAL}/usdt.png`,
  USDbC: `${LOCAL}/usdbc.png`,
  DAI: `${LOCAL}/dai.png`,
  AERO: `${LOCAL}/aero.png`,
  LINK: `${LOCAL}/link.png`,
  UNI: `${LOCAL}/uni.png`,
  OP: `${LOCAL}/op.png`,
};

const CDN_FALLBACK: Record<string, readonly string[]> = {
  ETH: [`${SPOT}/eth.png`],
  WETH: [`${SPOT}/eth.png`],
  cbBTC: [`${SPOT}/btc.png`],
  WBTC: [`${SPOT}/wbtc.png`],
  USDC: [`${SPOT}/usdc.png`],
  USDT: [`${SPOT}/usdt.png`],
  USDbC: [`${SPOT}/usdc.png`],
  DAI: [`${SPOT}/dai.png`],
  AERO: ["https://icons.llamao.fi/icons/protocols/aerodrome"],
  LINK: [`${SPOT}/link.png`],
  UNI: [`${SPOT}/uni.png`],
  OP: ["https://icons.llamao.fi/icons/chains/rsz_optimism.jpg"],
};

export const SWAP_TOKEN_ICON_URLS: Record<string, readonly string[]> =
  Object.fromEntries(
    Object.keys(LOCAL_ICON).map((symbol) => [
      symbol,
      [
        LOCAL_ICON[symbol],
        ...(CDN_FALLBACK[symbol] ?? []).filter(
          (url) => url !== LOCAL_ICON[symbol],
        ),
      ],
    ]),
  );

export function getSwapTokenIconUrls(symbol: string): readonly string[] {
  return SWAP_TOKEN_ICON_URLS[symbol] ?? [];
}
