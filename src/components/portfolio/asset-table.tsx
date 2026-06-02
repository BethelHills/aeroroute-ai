import { CORE_ASSET_SYMBOLS, type PortfolioAsset } from "@/lib/portfolio-data";
import { cn } from "@/lib/utils";

const symbolAccent: Record<string, string> = {
  ETH: "from-blue-500/20 to-violet-500/10",
  USDC: "from-cyan-500/20 to-blue-500/10",
  AERO: "from-orange-500/20 to-red-500/10",
  DAI: "from-amber-500/20 to-yellow-500/10",
  USDbC: "from-violet-500/20 to-purple-500/10",
};

type AssetTableProps = {
  assets: PortfolioAsset[];
};

export function AssetTable({ assets }: AssetTableProps) {
  const coreAssets = assets.filter((asset) =>
    CORE_ASSET_SYMBOLS.includes(asset.symbol as (typeof CORE_ASSET_SYMBOLS)[number]),
  );

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-3">
        {coreAssets.map((asset) => (
          <CoreBalanceCard key={asset.symbol} asset={asset} />
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:hidden">
        {assets.map((asset) => (
          <AssetCard key={asset.symbol} asset={asset} />
        ))}
      </div>

      <div className="hidden overflow-x-auto rounded-[2rem] border border-white/10 bg-white/[0.035] backdrop-blur-xl lg:block">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead>
            <tr className="border-b border-white/10 text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
              <th className="px-5 py-4">Asset</th>
              <th className="px-5 py-4">Balance</th>
              <th className="px-5 py-4">Value</th>
              <th className="px-5 py-4">24h</th>
              <th className="px-5 py-4">Alloc.</th>
              <th className="px-5 py-4">Route use</th>
            </tr>
          </thead>
          <tbody>
            {assets.map((asset) => (
              <tr
                key={asset.symbol}
                className="border-b border-white/5 last:border-0"
              >
                <td className="px-5 py-4">
                  <p className="font-black text-white">{asset.symbol}</p>
                  <p className="text-xs text-slate-500">{asset.name}</p>
                </td>
                <td className="px-5 py-4 text-slate-200">
                  <span className="inline-flex items-center gap-2">
                    {asset.balance}
                    {asset.live ? (
                      <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2 py-0.5 text-[10px] font-bold text-emerald-300">
                        Live
                      </span>
                    ) : null}
                  </span>
                </td>
                <td className="px-5 py-4 text-slate-400">{asset.value}</td>
                <td
                  className={cn(
                    "px-5 py-4 font-bold",
                    asset.change.startsWith("-")
                      ? "text-orange-300"
                      : "text-emerald-300",
                  )}
                >
                  {asset.change}
                </td>
                <td className="px-5 py-4 text-slate-300">{asset.allocation}%</td>
                <td className="px-5 py-4 text-slate-500">{asset.routeUse}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function CoreBalanceCard({ asset }: { asset: PortfolioAsset }) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-white/10 bg-gradient-to-br p-5 backdrop-blur-xl",
        symbolAccent[asset.symbol] ?? "from-white/5 to-white/10",
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <p className="text-sm text-slate-500">{asset.symbol} Balance</p>
        {asset.live ? (
          <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2 py-0.5 text-[10px] font-bold uppercase text-emerald-300">
            Live
          </span>
        ) : null}
      </div>
      <p className="mt-2 text-2xl font-black text-white">{asset.balance}</p>
      <p className="mt-1 text-sm text-slate-400">{asset.value}</p>
      <p
        className={cn(
          "mt-2 text-xs font-bold",
          asset.change.startsWith("-") ? "text-orange-300" : "text-emerald-300",
        )}
      >
        {asset.change}
      </p>
    </div>
  );
}

function AssetCard({ asset }: { asset: PortfolioAsset }) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-white/10 bg-gradient-to-br p-5 backdrop-blur-xl",
        symbolAccent[asset.symbol] ?? "from-white/5 to-white/10",
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="font-black text-white">{asset.symbol}</p>
          <p className="text-xs text-slate-500">{asset.name}</p>
        </div>
        {asset.live ? (
          <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2 py-0.5 text-[10px] font-bold text-emerald-300">
            Live
          </span>
        ) : null}
      </div>
      <p className="mt-3 text-xl font-black text-white">{asset.balance}</p>
      <p className="mt-1 text-sm text-slate-400">{asset.value}</p>
      <p className="mt-2 text-xs text-slate-500">{asset.routeUse}</p>
    </div>
  );
}
