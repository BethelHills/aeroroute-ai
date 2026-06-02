"use client";

import { motion } from "framer-motion";
import { features } from "@/lib/landing-data";

function FeatureCard({ feature }: { feature: (typeof features)[number] }) {
  const Icon = feature.icon;
  return (
    <motion.div whileHover={{ y: -6 }} className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.035] p-6 backdrop-blur-xl">
      <div className={`absolute -right-12 -top-12 h-32 w-32 rounded-full bg-gradient-to-br ${feature.glow} opacity-20 blur-2xl`} />
      <div className={`mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${feature.glow} text-[#061018] shadow-[0_0_35px_rgba(0,245,160,0.18)]`}>
        <Icon size={27} />
      </div>
      <h3 className="text-xl font-bold">{feature.title}</h3>
      <p className="mt-3 text-sm leading-6 text-slate-400">{feature.text}</p>
    </motion.div>
  );
}

export function Features() {
  return (
    <section className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 gap-5 px-4 py-14 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
      {features.map((feature) => (
        <FeatureCard key={feature.title} feature={feature} />
      ))}
    </section>
  );
}
