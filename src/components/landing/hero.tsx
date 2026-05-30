"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  PlayCircle,
  Sparkles,
  Zap,
} from "lucide-react";
import { navLinks, routeRows, routeTokens } from "@/lib/landing-data";
import { Glow } from "./glow";
import { Logo } from "./logo";
import { Metric } from "./metric";

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
              {routeTokens.map((token, index) => (
                <React.Fragment key={token}>
                  <div className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-emerald-100">{token}</div>
                  {index < routeTokens.length - 1 && <ArrowRight size={16} className="text-orange-300" />}
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

export function Hero() {
  return (
    <>
      <nav className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-5 py-6 lg:px-8">
        <Logo priority />
        <div className="hidden items-center gap-8 text-sm text-slate-300 lg:flex">
          {navLinks.map((item) => (
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
    </>
  );
}
