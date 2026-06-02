"use client";

import { useSyncExternalStore } from "react";
import { LineChart } from "lucide-react";
import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { assetsToAllocation, type PortfolioAsset } from "@/lib/portfolio-data";

type AllocationCardProps = {
  assets: PortfolioAsset[];
};

function useIsClient() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

export function AllocationCard({ assets }: AllocationCardProps) {
  const mounted = useIsClient();
  const allocation = assetsToAllocation(assets);

  return (
    <div className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-5 backdrop-blur-xl sm:p-6">
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-400/10 text-emerald-300">
          <LineChart size={22} />
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-300">
            Allocation
          </p>
          <h2 className="text-xl font-black text-white">Asset allocation</h2>
        </div>
      </div>

      <div className="h-56 w-full min-w-0 sm:h-64">
        {mounted ? (
          <ResponsiveContainer width="100%" height="100%" minWidth={0}>
            <PieChart>
              <Pie
                data={allocation}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={58}
                outerRadius={88}
                paddingAngle={3}
                stroke="transparent"
              >
                {allocation.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  background: "rgba(3, 7, 11, 0.95)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "12px",
                  color: "#fff",
                }}
                formatter={(value, name) => [`${value ?? 0}%`, String(name)]}
              />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-slate-500">
            Loading chart…
          </div>
        )}
      </div>

      <div className="mt-4 flex flex-wrap justify-center gap-3">
        {allocation.map((slice) => (
          <div
            key={slice.name}
            className="flex items-center gap-2 text-xs text-slate-400"
          >
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: slice.color }}
            />
            {slice.name} {slice.value}%
          </div>
        ))}
      </div>
    </div>
  );
}
