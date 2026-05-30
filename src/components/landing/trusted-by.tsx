import { protocols } from "@/lib/landing-data";

export function TrustedBy() {
  return (
    <section className="relative z-10 mx-auto max-w-7xl px-5 py-8 lg:px-8">
      <div className="grid gap-4 rounded-3xl border border-white/10 bg-white/[0.035] p-5 backdrop-blur-xl sm:grid-cols-2 lg:grid-cols-5">
        {protocols.map((protocol) => (
          <div key={protocol} className="flex items-center justify-center rounded-2xl border border-white/10 bg-black/20 px-5 py-5 text-lg font-black tracking-wide text-slate-200">
            {protocol}
          </div>
        ))}
      </div>
    </section>
  );
}
