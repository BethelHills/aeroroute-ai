import { CheckCircle2 } from "lucide-react";
import { analyticsBullets } from "@/lib/landing-data";

export function AiInsights() {
  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-300">Live Route Analytics</p>
      <h2 className="mt-4 text-4xl font-black tracking-[-0.04em] md:text-5xl">Real-time insights. Smarter trades.</h2>
      <p className="mt-5 text-slate-400">Advanced analytics and AI models work together to give you the edge in every swap.</p>
      <div className="mt-6 space-y-3 text-slate-300">
        {analyticsBullets.map((item) => (
          <div key={item} className="flex items-center gap-3">
            <CheckCircle2 size={18} className="text-emerald-300" />
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
