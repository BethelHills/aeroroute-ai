import { portfolioAssets } from "@/lib/portfolio-data";

export function AllocationCard() {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 backdrop-blur-xl">
      <p className="text-xs font-bold uppercase tracking-[0.25em] text-cyan-300">
        Allocation
      </p>

      <h2 className="mt-2 text-2xl font-black text-white">
        Asset Distribution
      </h2>

      <div className="mt-6 flex items-center justify-center">
        <div className="relative flex h-52 w-52 items-center justify-center rounded-full bg-[conic-gradient(from_90deg,#00F5A0_0deg,#00D4FF_150deg,#FF7A18_230deg,#8b5cf6_300deg,#00F5A0_360deg)] p-4 shadow-[0_0_55px_rgba(0,245,160,0.22)]">
          <div className="flex h-full w-full flex-col items-center justify-center rounded-full bg-[#061018] text-center">
            <p className="text-sm text-slate-500">Route Ready</p>
            <p className="text-4xl font-black text-emerald-300">73%</p>
            <p className="text-xs text-slate-500">ETH + Stable assets</p>
          </div>
        </div>
      </div>

      <div className="mt-6 space-y-3">
        {portfolioAssets.map((asset) => (
          <div key={asset.symbol}>
            <div className="mb-1 flex items-center justify-between text-sm">
              <span className="text-slate-300">{asset.symbol}</span>
              <span className="font-bold text-white">{asset.allocation}%</span>
            </div>

            <div className="h-2 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400"
                style={{ width: `${asset.allocation}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
