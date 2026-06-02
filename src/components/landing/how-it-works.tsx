import { steps } from "@/lib/landing-data";

export function HowItWorks() {
  return (
    <section className="relative z-10 mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 backdrop-blur-xl">
        <p className="mb-8 text-center text-xs font-bold uppercase tracking-[0.25em] text-emerald-300">How it works</p>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-5">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={step.title} className="relative rounded-3xl border border-white/10 bg-black/20 p-6 text-center">
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-emerald-400/30 bg-emerald-400/10 text-emerald-300">
                  <Icon size={28} />
                </div>
                <span className="absolute left-5 top-5 flex h-8 w-8 items-center justify-center rounded-full border border-orange-400/30 bg-orange-400/10 text-orange-300">{index + 1}</span>
                <h3 className="font-black">{step.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">{step.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
