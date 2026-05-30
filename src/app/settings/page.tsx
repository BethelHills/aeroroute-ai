"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  ArrowRight,
  Bell,
  Bot,
  CheckCircle2,
  ChevronDown,
  Database,
  Gauge,
  KeyRound,
  Lock,
  Network,
  RefreshCcw,
  Route,
  Save,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Wallet,
  type LucideIcon,
} from "lucide-react";

const presets = [
  {
    name: "Safe",
    description: "Strict confirmation, low slippage, simulation required.",
    active: true,
  },
  {
    name: "Balanced",
    description: "Recommended for most swaps and route analysis.",
    active: false,
  },
  {
    name: "Aggressive",
    description: "Higher slippage tolerance for speed and execution priority.",
    active: false,
  },
];

const integrations = [
  ["Aomi Backend", "https://api.aomi.dev", "Active"],
  ["WalletConnect", "Project ID configured", "Active"],
  ["Base Network", "Chain ID 8453", "Active"],
  ["OpenRouter BYOK", "Optional model provider", "Pending"],
] as const;

function Toggle({
  enabled,
  setEnabled,
}: {
  enabled: boolean;
  setEnabled: (value: boolean) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => setEnabled(!enabled)}
      className={`relative h-8 w-14 rounded-full border transition ${enabled ? "border-emerald-400/40 bg-emerald-400/20" : "border-white/10 bg-white/5"}`}
      aria-pressed={enabled}
    >
      <span
        className={`absolute top-1 h-6 w-6 rounded-full transition ${enabled ? "left-7 bg-emerald-300" : "left-1 bg-slate-500"}`}
      />
    </button>
  );
}

function Panel({
  icon: Icon,
  eyebrow,
  title,
  children,
}: {
  icon: LucideIcon;
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <motion.section
      whileHover={{ y: -3 }}
      className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 backdrop-blur-xl"
    >
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-emerald-400/25 bg-emerald-400/10 text-emerald-300">
          <Icon size={23} />
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-300">
            {eyebrow}
          </p>
          <h2 className="text-xl font-black text-white">{title}</h2>
        </div>
      </div>
      {children}
    </motion.section>
  );
}

function SettingRow({
  title,
  text,
  children,
}: {
  title: string;
  text: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-black/20 p-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="font-black text-white">{title}</p>
        <p className="mt-1 text-sm text-slate-500">{text}</p>
      </div>
      <div className="shrink-0">{children}</div>
    </div>
  );
}

function SelectButton({ value }: { value: string }) {
  return (
    <button
      type="button"
      className="inline-flex min-w-[160px] items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.035] px-4 py-3 text-sm font-bold text-slate-200"
    >
      {value}
      <ChevronDown size={16} className="text-slate-500" />
    </button>
  );
}

function PresetCard({
  preset,
  selected,
  onClick,
}: {
  preset: (typeof presets)[number];
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-2xl border p-5 text-left transition ${selected ? "border-emerald-400/40 bg-emerald-400/10" : "border-white/10 bg-black/20 hover:border-emerald-400/30"}`}
    >
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-black text-white">{preset.name}</h3>
        {selected && <CheckCircle2 size={18} className="text-emerald-300" />}
      </div>
      <p className="text-sm leading-6 text-slate-400">{preset.description}</p>
    </button>
  );
}

export default function AeroRouteSettingsPreview() {
  const [manualConfirm, setManualConfirm] = useState(true);
  const [simulation, setSimulation] = useState(true);
  const [routeAlerts, setRouteAlerts] = useState(true);
  const [txAlerts, setTxAlerts] = useState(true);
  const [gasAlerts, setGasAlerts] = useState(true);
  const [selectedPreset, setSelectedPreset] = useState("Safe");

  return (
    <main className="min-h-screen overflow-hidden bg-[#03070b] text-white">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top_left,rgba(0,245,160,0.15),transparent_32%),radial-gradient(circle_at_top_right,rgba(255,122,24,0.12),transparent_34%),linear-gradient(180deg,#03070b_0%,#061018_55%,#03070b_100%)]" />
      <div className="fixed inset-0 opacity-[0.2] [background-image:linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:72px_72px]" />

      <section className="relative z-10 mx-auto max-w-7xl px-5 py-8 lg:px-8">
        <header className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-emerald-300">
              <Sparkles size={14} /> Control center
            </div>
            <h1 className="text-4xl font-black tracking-[-0.05em] md:text-6xl">
              AeroRoute{" "}
              <span className="bg-gradient-to-r from-emerald-300 via-cyan-300 to-orange-300 bg-clip-text text-transparent">
                Settings
              </span>
            </h1>
            <p className="mt-4 max-w-2xl text-slate-400">
              Configure wallet behavior, route safety, Aomi backend settings,
              notifications, and agent execution preferences.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.035] px-5 py-3 text-sm font-bold text-slate-200 backdrop-blur-xl"
            >
              <Wallet size={17} /> 0x8f...3a29
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-400 to-cyan-400 px-5 py-3 text-sm font-black text-[#041014]"
            >
              <Save size={17} /> Save Settings
            </button>
          </div>
        </header>

        <div className="grid gap-6 xl:grid-cols-[1fr_390px]">
          <div className="space-y-6">
            <Panel icon={ShieldCheck} eyebrow="Safety" title="Transaction Protection">
              <div className="space-y-4">
                <SettingRow
                  title="Manual confirmation"
                  text="Require wallet approval before any Aerodrome swap is signed."
                >
                  <Toggle enabled={manualConfirm} setEnabled={setManualConfirm} />
                </SettingRow>
                <SettingRow
                  title="Simulate before signing"
                  text="Run route simulation before wallet confirmation."
                >
                  <Toggle enabled={simulation} setEnabled={setSimulation} />
                </SettingRow>
                <SettingRow
                  title="Maximum slippage"
                  text="Set the highest allowed slippage for prepared swaps."
                >
                  <SelectButton value="0.50%" />
                </SettingRow>
                <SettingRow
                  title="Risk mode"
                  text="Choose how strict AeroRoute should be when recommending paths."
                >
                  <SelectButton value={selectedPreset} />
                </SettingRow>
              </div>
            </Panel>

            <Panel icon={Bot} eyebrow="Agent" title="Route Agent Behavior">
              <div className="grid gap-4 md:grid-cols-3">
                {presets.map((preset) => (
                  <PresetCard
                    key={preset.name}
                    preset={preset}
                    selected={selectedPreset === preset.name}
                    onClick={() => setSelectedPreset(preset.name)}
                  />
                ))}
              </div>
            </Panel>

            <Panel icon={Bell} eyebrow="Notifications" title="Alerts & Updates">
              <div className="space-y-4">
                <SettingRow
                  title="Route improvement alerts"
                  text="Notify me when a better route becomes available."
                >
                  <Toggle enabled={routeAlerts} setEnabled={setRouteAlerts} />
                </SettingRow>
                <SettingRow
                  title="Transaction outcome alerts"
                  text="Notify me when staged, signed, failed, or confirmed routes change status."
                >
                  <Toggle enabled={txAlerts} setEnabled={setTxAlerts} />
                </SettingRow>
                <SettingRow
                  title="Gas movement alerts"
                  text="Notify me when gas changes affect route quality."
                >
                  <Toggle enabled={gasAlerts} setEnabled={setGasAlerts} />
                </SettingRow>
              </div>
            </Panel>

            <Panel
              icon={AlertTriangle}
              eyebrow="Security"
              title="Important Transaction Notice"
            >
              <div className="rounded-2xl border border-orange-400/25 bg-orange-400/10 p-5">
                <div className="flex items-start gap-4">
                  <AlertTriangle className="mt-1 shrink-0 text-orange-300" />
                  <div>
                    <h3 className="font-black text-orange-200">
                      You control every signature.
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-slate-300">
                      AeroRoute AI can analyze and prepare Aerodrome routes, but
                      it cannot sign transactions for you. Always review route
                      output, slippage, gas, and token addresses before
                      confirming in your wallet.
                    </p>
                  </div>
                </div>
              </div>
            </Panel>
          </div>

          <aside className="space-y-6">
            <Panel icon={Network} eyebrow="Network" title="Base Configuration">
              <div className="space-y-3 text-sm">
                {[
                  ["Network", "Base Mainnet"],
                  ["Chain ID", "8453"],
                  ["Primary Protocol", "Aerodrome"],
                  ["Status", "Connected"],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/20 px-4 py-3"
                  >
                    <span className="text-slate-500">{label}</span>
                    <span className="font-bold text-white">{value}</span>
                  </div>
                ))}
              </div>
            </Panel>

            <Panel icon={Database} eyebrow="Runtime" title="Integrations">
              <div className="space-y-3">
                {integrations.map(([name, detail, status]) => (
                  <div
                    key={name}
                    className="rounded-2xl border border-white/10 bg-black/20 p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-black text-white">{name}</p>
                        <p className="mt-1 text-xs text-slate-500">{detail}</p>
                      </div>
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-bold ${status === "Active" ? "bg-emerald-400/10 text-emerald-300" : "bg-orange-400/10 text-orange-300"}`}
                      >
                        {status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </Panel>

            <Panel icon={KeyRound} eyebrow="BYOK" title="Model Provider">
              <p className="text-sm leading-7 text-slate-400">
                Add OpenRouter credits or configure an LLM provider to continue
                real Aomi chat requests when free Aomi credits are exhausted.
              </p>
              <button
                type="button"
                className="mt-5 flex w-full items-center justify-center gap-3 rounded-2xl border border-emerald-400/25 bg-emerald-400/10 px-5 py-3 font-bold text-emerald-200 hover:bg-emerald-400/15"
              >
                Configure Provider
                <ArrowRight size={17} />
              </button>
            </Panel>

            <Panel icon={RefreshCcw} eyebrow="Defaults" title="Reset Controls">
              <p className="text-sm leading-7 text-slate-400">
                Restore safe mode, 0.5% slippage, simulation-first execution, and
                default notification settings.
              </p>
              <button
                type="button"
                className="mt-5 flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-orange-400 to-amber-300 px-5 py-3 font-black text-[#130900]"
              >
                Reset Defaults
                <RefreshCcw size={17} />
              </button>
            </Panel>
          </aside>
        </div>

        <div className="mt-6 grid gap-4 rounded-[2rem] border border-white/10 bg-white/[0.035] p-5 backdrop-blur-xl md:grid-cols-4">
          {[
            [Lock, "Non-Custodial", "AeroRoute never stores private keys."],
            [Gauge, "Slippage Guard", "Default protection before execution."],
            [Route, "Route Rules", "Agent follows selected risk preset."],
            [SlidersHorizontal, "Flexible Controls", "Adjust behavior per trading style."],
          ].map(([Icon, title, text]) => {
            const SafeIcon = Icon as LucideIcon;
            return (
              <div
                key={title as string}
                className="rounded-2xl border border-white/10 bg-black/20 p-5"
              >
                <SafeIcon className="text-emerald-300" size={25} />
                <h3 className="mt-3 font-black">{title as string}</h3>
                <p className="mt-2 text-sm text-slate-400">{text as string}</p>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
