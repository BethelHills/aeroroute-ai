import type { PortfolioViewData } from "@/lib/portfolio-data";

type AssetTableProps = {
  portfolio: PortfolioViewData;
};

export function AssetTable({ portfolio }: AssetTableProps) {
  const { assets, dataMode } = portfolio;
  const hasMockRows = assets.some((asset) => !asset.isLive);

  return (
    <div className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-5 backdrop-blur-xl">
      <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-300">
            Assets
          </p>
          <h2 className="mt-2 text-2xl font-black text-white">
            Base Portfolio
          </h2>
          {dataMode === "Demo" ? (
            <p className="mt-1 text-xs text-slate-500">Demo portfolio data</p>
          ) : null}
        </div>
        <div className="flex flex-wrap gap-2">
          {dataMode === "Live" ? (
            <span className="inline-flex w-fit shrink-0 items-center rounded-full border border-emerald-400/35 bg-emerald-400/15 px-3 py-1 text-xs font-bold uppercase tracking-wide text-emerald-200">
              Live wallet data
            </span>
          ) : null}
          {dataMode === "Live" && hasMockRows ? (
            <span className="inline-flex w-fit shrink-0 items-center rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-amber-200">
              Demo rows
            </span>
          ) : null}
        </div>
      </div>

      <div className="hidden overflow-x-auto rounded-2xl border border-white/10 xl:block">
        <div className="grid min-w-[640px] grid-cols-6 bg-black/30 px-4 py-3 text-sm text-slate-500">
          <span>Asset</span>
          <span>Balance</span>
          <span>Value</span>
          <span>24h</span>
          <span>Allocation</span>
          <span>Route Use</span>
        </div>

        {assets.map((asset) => (
          <div
            key={asset.symbol}
            className="grid min-w-[640px] grid-cols-6 border-t border-white/10 px-4 py-4 text-sm"
          >
            <div>
              <p className="font-black text-white">
                {asset.symbol}
                {asset.isLive ? (
                  <span className="ml-2 text-[10px] font-bold uppercase tracking-wide text-emerald-400">
                    Live
                  </span>
                ) : dataMode === "Live" ? (
                  <span className="ml-2 text-[10px] font-bold uppercase tracking-wide text-amber-300/80">
                    Demo
                  </span>
                ) : null}
              </p>
              <p className="text-xs text-slate-500">{asset.name}</p>
            </div>
            <span className="text-slate-300">{asset.balance}</span>
            <span className="font-bold text-white">{asset.value}</span>
            <span
              className={
                asset.change.startsWith("-")
                  ? "text-red-300"
                  : "text-emerald-300"
              }
            >
              {asset.change}
            </span>
            <span>{asset.allocation}%</span>
            <span className="text-slate-400">{asset.routeUse}</span>
          </div>
        ))}
      </div>

      <div className="space-y-4 xl:hidden">
        {assets.map((asset) => (
          <div
            key={asset.symbol}
            className="rounded-2xl border border-white/10 bg-black/20 p-4"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="font-black text-white">
                  {asset.symbol}
                  {asset.isLive ? (
                    <span className="ml-2 text-[10px] font-bold uppercase text-emerald-400">
                      Live
                    </span>
                  ) : dataMode === "Live" ? (
                    <span className="ml-2 text-[10px] font-bold uppercase text-amber-300/80">
                      Demo
                    </span>
                  ) : null}
                </p>
                <p className="text-xs text-slate-500">{asset.name}</p>
              </div>
              <span className="font-black text-white">{asset.value}</span>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <Info label="Balance" value={asset.balance} />
              <Info label="24h" value={asset.change} accent />
              <Info label="Allocation" value={`${asset.allocation}%`} />
              <Info label="Use" value={asset.routeUse} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Info({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div>
      <p className="text-xs text-slate-500">{label}</p>
      <p className={`mt-1 font-bold ${accent ? "text-emerald-300" : "text-white"}`}>
        {value}
      </p>
    </div>
  );
}
