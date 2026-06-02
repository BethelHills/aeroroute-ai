"use client";

import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import type { AllocationSlice } from "@/lib/portfolio-data";

type PortfolioAllocationChartProps = {
  data: AllocationSlice[];
};

export function PortfolioAllocationChart({
  data,
}: PortfolioAllocationChartProps) {
  return (
    <div className="h-56 w-full min-w-0 sm:h-64">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={58}
            outerRadius={88}
            paddingAngle={3}
            stroke="transparent"
          >
            {data.map((entry) => (
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

      <div className="mt-4 flex flex-wrap justify-center gap-3">
        {data.map((slice) => (
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
