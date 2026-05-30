export function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="relative h-10 w-10 rounded-xl bg-gradient-to-br from-emerald-400 via-cyan-400 to-orange-400 shadow-[0_0_35px_rgba(0,245,160,0.4)]">
        <div className="absolute left-2 top-2 h-2 w-6 rounded-full bg-[#061018]" />
        <div className="absolute bottom-2 right-2 h-2 w-6 rounded-full bg-[#061018]" />
      </div>
      <span className="text-2xl font-black tracking-tight">
        AeroRoute <span className="text-emerald-300">AI</span>
      </span>
    </div>
  );
}
