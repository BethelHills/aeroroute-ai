"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  PlayCircle,
  Zap,
  ShieldCheck,
  BarChart3,
  Route,
  Waves,
  Wallet,
  Cpu,
  Layers,
  Lock,
  Activity,
  Network,
  Sparkles,
  CheckCircle2,
  Rocket,
} from "lucide-react";

const protocols = ["Aerodrome", "Base", "Across", "Stargate", "Aomi"];

const features = [
  {
    icon: Route,
    title: "Route Intelligence",
    text: "AI compares swap paths across Aerodrome pools to find the most efficient execution route.",
    glow: "from-emerald-400 to-cyan-400",
  },
  {
    icon: Waves,
    title: "Liquidity Discovery",
    text: "Discover deep liquidity, concentrated pools, and routing opportunities across Base.",
    glow: "from-orange-400 to-amber-300",
  },
  {
    icon: ShieldCheck,
    title: "Slippage Protection",
    text: "Estimate price impact and slippage before execution so users trade with more confidence.",
    glow: "from-cyan-400 to-blue-500",
  },
  {
    icon: Zap,
    title: "AI Simulation Engine",
    text: "Simulate route outcomes before wallet confirmation using Aomi-powered workflows.",
    glow: "from-fuchsia-500 to-purple-500",
  },
];

const steps = [
  { icon: Wallet, title: "Connect Wallet", text: "Connect your wallet on Base securely." },
  { icon: Layers, title: "Select Tokens", text: "Choose token pair and swap amount." },
  { icon: Cpu, title: "Analyze Routes", text: "AI scans liquidity and compares paths." },
  { icon: BarChart3, title: "Simulate Swap", text: "Review slippage, gas, and expected output." },
  { icon: Rocket, title: "Execute on Base", text: "Confirm the best route from your wallet." },
];

const routeRows = [
  ["Route 1", "3,176.82 USDC", "0.18%", "Best"],
  ["Route 2", "3,166.24 USDC", "0.42%", "Good"],
  ["Route 3", "3,154.67 USDC", "0.78%", "Risky"],
];

function Logo() {
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

function Glow({ className }: { className: string }) {
  return <div className={`pointer-events-none absolute rounded-full blur-3xl ${className}`} />;
}

function HeroDashboard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotateX: 8 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.8 }}
      className="relative rounded-[2rem] border border-emerald-400/30 bg-[#071015]/90 p-5 shadow-[0_0_90px_rgba(0,245,160,0.18)] backdrop-blur-xl lg:rotate-[-3deg]"
    >
      <div className="absolute -inset-8 -z-10 rounded-full bg-emerald-500/10 blur-3xl" />
      <div className="grid gap-4 lg:grid-cols-[220px_1fr]">
        <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-5">
          <p className="mb-5 text-sm font-semibold text-slate-300">Swap</p>
          <div className="space-y-4">
            <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
              <p className="text-xs text-slate-500">From</p>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-xl font-bold">ETH</span>
                <span className="text-slate-400">1.0000</span>
              </div>
            </div>
            <div className="flex justify-center text-emerald-300">
              <ArrowRight className="rotate-90" />
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
              <p className="text-xs text-slate-500">To</p>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-xl font-bold">USDC</span>
                <span className="text-emerald-300">3,176.82</span>
              </div>
            </div>
          </div>
          <button className="mt-5 w-full rounded-2xl bg-gradient-to-r from-emerald-400 to-cyan-400 px-4 py-3 font-bold text-[#041014]">
            Optimize
          </button>
        </div>

        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-emerald-400/25 bg-emerald-400/10 p-4">
              <p className="text-xs text-emerald-200">Best Route</p>
              <p className="mt-2 text-3xl font-black">98</p>
              <p className="text-xs text-emerald-300">Excellent</p>
            </div>
            <Metric label="Output" value="3,176.82" sub="USDC" />
            <Metric label="Impact" value="0.18%" sub="Very Low" />
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
            <div className="mb-4 flex items-center justify-between">
              <p className="font-semibold">Route Path</p>
              <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs text-emerald-300">AI Recommended</span>
            </div>
            <div className="flex flex-wrap items-center gap-3 text-sm">
              {["ETH", "WETH", "USDbC", "USDC"].map((token, index) => (
                <React.Fragment key={token}>
                  <div className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-emerald-100">{token}</div>
                  {index < 3 && <ArrowRight size={16} className="text-orange-300" />}
                </React.Fragment>
              ))}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-[1fr_220px]">
            <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
              <p className="mb-3 text-sm font-semibold">Liquidity Depth</p>
              <svg viewBox="0 0 500 170" className="h-36 w-full">
                <defs>
                  <linearGradient id="aeroArea" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#00F5A0" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#00F5A0" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d="M0 120 C40 100 70 135 110 90 C145 55 170 80 210 70 C260 55 280 120 330 82 C380 45 410 72 450 42 C470 30 485 28 500 35 L500 170 L0 170 Z" fill="url(#aeroArea)" />
                <path d="M0 120 C40 100 70 135 110 90 C145 55 170 80 210 70 C260 55 280 120 330 82 C380 45 410 72 450 42 C470 30 485 28 500 35" fill="none" stroke="#00F5A0" strokeWidth="4" />
              </svg>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
              <p className="mb-3 text-sm font-semibold">Comparison</p>
              <div className="space-y-3">
                {routeRows.map(([route, output, impact, status]) => (
                  <div key={route} className="rounded-xl border border-white/10 bg-white/[0.03] p-3 text-xs">
                    <div className="flex justify-between">
                      <span>{route}</span>
                      <span className="text-emerald-300">{status}</span>
                    </div>
                    <p className="mt-1 text-slate-400">{output} · {impact}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function Metric({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
      <p className="text-xs text-slate-500">{label}</p>
      <p className="mt-2 text-2xl font-bold">{value}</p>
      <p className="text-xs text-emerald-300">{sub}</p>
    </div>
  );
}

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

export default function AeroRouteLandingPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#03070b] text-white">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top_left,rgba(0,245,160,0.18),transparent_34%),radial-gradient(circle_at_top_right,rgba(255,122,24,0.15),transparent_32%),linear-gradient(180deg,#03070b_0%,#051016_55%,#03070b_100%)]" />
      <div className="fixed inset-0 opacity-[0.22] [background-image:linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:80px_80px]" />

      <nav className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-5 py-6 lg:px-8">
        <Logo />
        <div className="hidden items-center gap-8 text-sm text-slate-300 lg:flex">
          {["Features", "Routes", "Analytics", "How It Works", "Docs", "Integrations"].map((item) => (
            <a key={item} href="#" className="hover:text-emerald-300">{item}</a>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden rounded-xl border border-blue-400/20 bg-blue-500/10 px-4 py-2 text-sm text-blue-100 sm:inline-flex">Built on Base</span>
          <a href="/route-optimizer" className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-400 to-cyan-400 px-5 py-3 text-sm font-bold text-[#041014] shadow-[0_0_30px_rgba(0,245,160,0.25)]">
            Launch App
            <ArrowRight size={17} />
          </a>
        </div>
      </nav>

      <section className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 px-5 pb-16 pt-12 lg:grid-cols-[0.9fr_1.1fr] lg:px-8 lg:pb-20 lg:pt-20">
        <Glow className="left-20 top-40 h-80 w-80 bg-emerald-500/25" />
        <Glow className="right-20 top-32 h-96 w-96 bg-orange-500/15" />
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.25em] text-emerald-300">
            <Sparkles size={14} />
            AI-powered · Aerodrome Route Optimizer
          </div>
          <h1 className="max-w-2xl text-5xl font-black leading-[0.95] tracking-[-0.06em] md:text-7xl">
            Find the smartest swap route on <span className="bg-gradient-to-r from-emerald-300 via-cyan-300 to-orange-300 bg-clip-text text-transparent">Base in seconds.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-400">
            AeroRoute AI analyzes liquidity, compares routes, estimates slippage, simulates transactions, and helps you execute with confidence.
          </p>
          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <a href="/route-optimizer" className="inline-flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-emerald-400 to-cyan-400 px-7 py-4 font-black text-[#041014] shadow-[0_0_40px_rgba(0,245,160,0.3)]">
              Optimize Route
              <Zap size={18} />
            </a>
            <a href="/agent-chat" className="inline-flex items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/[0.035] px-7 py-4 font-bold text-slate-200 backdrop-blur-xl hover:border-emerald-400/40">
              Watch Demo
              <PlayCircle size={18} />
            </a>
          </div>
          <div className="mt-8 flex items-center gap-3 text-sm text-slate-400">
            <CheckCircle2 size={18} className="text-emerald-300" />
            Powered by Aomi intelligence on Base
          </div>
        </div>
        <HeroDashboard />
      </section>

      <section className="relative z-10 mx-auto max-w-7xl px-5 py-8 lg:px-8">
        <div className="grid gap-4 rounded-3xl border border-white/10 bg-white/[0.035] p-5 backdrop-blur-xl sm:grid-cols-2 lg:grid-cols-5">
          {protocols.map((protocol) => (
            <div key={protocol} className="flex items-center justify-center rounded-2xl border border-white/10 bg-black/20 px-5 py-5 text-lg font-black tracking-wide text-slate-200">
              {protocol}
            </div>
          ))}
        </div>
      </section>

      <section className="relative z-10 mx-auto grid max-w-7xl gap-5 px-5 py-14 lg:grid-cols-4 lg:px-8">
        {features.map((feature) => <FeatureCard key={feature.title} feature={feature} />)}
      </section>

      <section className="relative z-10 mx-auto grid max-w-7xl gap-8 px-5 py-16 lg:grid-cols-[0.55fr_1fr] lg:px-8">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-300">Live Route Analytics</p>
          <h2 className="mt-4 text-4xl font-black tracking-[-0.04em] md:text-5xl">Real-time insights. Smarter trades.</h2>
          <p className="mt-5 text-slate-400">Advanced analytics and AI models work together to give you the edge in every swap.</p>
          <div className="mt-6 space-y-3 text-slate-300">
            {["Real-time pool data", "Price impact analysis", "Route efficiency scoring", "Historical route performance"].map((item) => (
              <div key={item} className="flex items-center gap-3"><CheckCircle2 size={18} className="text-emerald-300" />{item}</div>
            ))}
          </div>
        </div>
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-5 backdrop-blur-xl">
          <div className="grid gap-4 md:grid-cols-4">
            <Metric label="Best Route" value="98/100" sub="Excellent" />
            <Metric label="Output" value="3,176.82" sub="USDC" />
            <Metric label="Impact" value="0.18%" sub="Very Low" />
            <Metric label="Efficiency" value="98.6%" sub="Top 2%" />
          </div>
          <div className="mt-5 grid gap-4 lg:grid-cols-[0.6fr_1fr_0.7fr]">
            <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
              <p className="text-sm text-slate-400">Liquidity Depth</p>
              <p className="mt-2 text-3xl font-black">$12.45M</p>
              <div className="mt-8 flex h-32 items-end gap-4">
                {[52, 88, 62].map((h, i) => <div key={i} style={{ height: `${h}%` }} className="flex-1 rounded-t-xl bg-gradient-to-t from-emerald-500 to-cyan-300" />)}
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
              <p className="mb-8 text-sm text-slate-400">Route Flow</p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                {["ETH", "WETH", "USDbC", "USDC"].map((token, i) => (
                  <React.Fragment key={token}>
                    <div className="flex h-20 w-20 items-center justify-center rounded-full border border-emerald-400/40 bg-emerald-400/10 text-sm font-bold text-emerald-100">{token}</div>
                    {i < 3 && <ArrowRight className="text-orange-300" />}
                  </React.Fragment>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
              <p className="text-sm text-slate-400">Historical Performance</p>
              <p className="mt-2 text-3xl font-black">92.4%</p>
              <svg viewBox="0 0 280 140" className="mt-6 h-28 w-full">
                <path d="M0 110 C30 70 45 118 70 88 C95 55 115 92 140 62 C165 32 180 85 205 55 C230 24 250 42 280 20" fill="none" stroke="#00F5A0" strokeWidth="4" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-7xl px-5 py-16 lg:px-8">
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

      <section className="relative z-10 mx-auto max-w-7xl px-5 py-8 lg:px-8">
        <div className="grid gap-4 rounded-3xl border border-white/10 bg-white/[0.035] p-5 backdrop-blur-xl md:grid-cols-2 lg:grid-cols-5">
          {[
            [Lock, "Non-Custodial", "You stay in control."],
            [Network, "Base Native", "Built for Base speed."],
            [Cpu, "AI Assisted", "Modeled route logic."],
            [Activity, "Real-time Data", "Live liquidity insights."],
            [ShieldCheck, "Wallet Controlled", "You approve every tx."],
          ].map(([Icon, title, text]) => {
            const SafeIcon = Icon as typeof Lock;
            return (
              <div key={title as string} className="rounded-2xl border border-white/10 bg-black/20 p-5">
                <SafeIcon className="text-emerald-300" size={28} />
                <h3 className="mt-3 font-black">{title as string}</h3>
                <p className="mt-2 text-sm text-slate-400">{text as string}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="relative overflow-hidden rounded-[2rem] border border-orange-400/40 bg-gradient-to-r from-emerald-500/20 via-cyan-500/10 to-orange-500/20 p-8 md:p-12">
          <Glow className="bottom-0 left-0 h-72 w-72 bg-emerald-400/30" />
          <Glow className="right-0 top-0 h-72 w-72 bg-orange-400/25" />
          <div className="relative z-10 flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-3xl font-black tracking-[-0.04em] md:text-4xl">Optimize every swap. Maximize every opportunity.</h2>
              <p className="mt-3 text-slate-300">Join traders using AeroRoute AI for smarter, faster, and safer swaps on Base.</p>
            </div>
            <a href="/route-optimizer" className="inline-flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-orange-400 to-amber-300 px-7 py-4 font-black text-[#120800] shadow-[0_0_40px_rgba(255,122,24,0.3)]">
              Optimize Your Route Now
              <Zap size={18} />
            </a>
          </div>
        </div>
      </section>

      <footer className="relative z-10 border-t border-white/10 px-5 py-10 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-4">
          <div>
            <Logo />
            <p className="mt-4 text-sm text-slate-500">AI-powered route optimizer for Aerodrome on Base.</p>
          </div>
          {["Product", "Resources", "Company"].map((group) => (
            <div key={group}>
              <h4 className="font-bold">{group}</h4>
              <div className="mt-4 space-y-3 text-sm text-slate-500">
                <p>Route Optimizer</p><p>Analytics</p><p>Documentation</p><p>Guides</p>
              </div>
            </div>
          ))}
        </div>
      </footer>
    </main>
  );
}
