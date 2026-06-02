import type { PortfolioBalance } from "@/lib/portfolio-data";
import { cn } from "@/lib/utils";

const symbolAccent: Record<PortfolioBalance["symbol"], string> = {
  ETH: "from-blue-500/20 to-violet-500/10",
  USDC: "from-cyan-500/20 to-blue-500/10",
  AERO: "from-orange-500/20 to-red-500/10",
};

type AssetTableProps = {
  balances: PortfolioBalance[];
};

export function AssetTable({ balances }: AssetTableProps) {
  return (
    <>
      <div className="grid gap-4 sm:grid-cols-3 md:hidden">
        {balances.map((balance) => (
          <AssetCard key={balance.symbol} balance={balance} />
        ))}
      </div>

      <div className="hidden overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.035] backdrop-blur-xl md:block">
        <table className="w-full min-w-0 text-left text-sm">
          <thead>
            <tr className="border-b border-white/10 text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
              <th className="px-5 py-4">Asset</th>
              <th className="px-5 py-4">Balance</th>
              <th className="px-5 py-4">USD (est.)</th>
              <th className="px-5 py-4">24h</th>
              <th className="px-5 py-4">Source</th>
            </tr>
          </thead>
          <tbody>
            {balances.map((balance) => (
              <tr
                key={balance.symbol}
                className="border-b border-white/5 last:border-0"
              >
                <td className="px-5 py-4 font-black text-white">
                  {balance.symbol}
                </td>
                <td className="px-5 py-4 text-slate-200">{balance.amount}</td>
                <td className="px-5 py-4 text-slate-400">{balance.usd}</td>
                <td className="px-5 py-4 font-bold text-emerald-300">
                  {balance.change}
                </td>
                <td className="px-5 py-4">
                  <span
                    className={cn(
                      "rounded-full border px-2.5 py-1 text-xs font-bold",
                      balance.live
                        ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-300"
                        : "border-white/10 bg-white/5 text-slate-400",
                    )}
                  >
                    {balance.live ? "On-chain" : "Mock"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

function AssetCard({ balance }: { balance: PortfolioBalance }) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-white/10 bg-gradient-to-br p-5 backdrop-blur-xl",
        symbolAccent[balance.symbol],
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <p className="text-sm text-slate-500">{balance.label}</p>
        {balance.live ? (
          <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2 py-0.5 text-[10px] font-bold uppercase text-emerald-300">
            Live
          </span>
        ) : null}
      </div>
      <p className="mt-2 text-2xl font-black text-white">{balance.amount}</p>
      <p className="mt-1 text-sm text-slate-400">{balance.usd}</p>
      <p className="mt-2 text-xs font-bold text-emerald-300">{balance.change}</p>
    </div>
  );
}
