import { ecosystemItems } from "@/lib/landing-data";

export function Ecosystem() {
  return (
    <section className="relative z-10 mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid gap-4 rounded-3xl border border-white/10 bg-white/[0.035] p-5 backdrop-blur-xl md:grid-cols-2 lg:grid-cols-5">
        {ecosystemItems.map(({ icon: Icon, title, text }) => (
          <div key={title} className="rounded-2xl border border-white/10 bg-black/20 p-5">
            <Icon className="text-emerald-300" size={28} />
            <h3 className="mt-3 font-black">{title}</h3>
            <p className="mt-2 text-sm text-slate-400">{text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
