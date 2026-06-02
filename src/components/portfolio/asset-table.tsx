import { portfolioAssets } from "@/lib/portfolio-data";

export function AssetTable() {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-5 backdrop-blur-xl">
      <div className="mb-5">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-300">
          Assets
        </p>
        <h2 className="mt-2 text-2xl font-black text-white">
          Base Portfolio
        </h2>
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

        {portfolioAssets.map((asset) => (
          <div
            key={asset.symbol}
            className="grid min-w-[640px] grid-cols-6 border-t border-white/10 px-4 py-4 text-sm"
          >
            <div>
              <p className="font-black text-white">{asset.symbol}</p>
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
        {portfolioAssets.map((asset) => (
          <div
            key={asset.symbol}
            className="rounded-2xl border border-white/10 bg-black/20 p-4"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="font-black text-white">{asset.symbol}</p>
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
