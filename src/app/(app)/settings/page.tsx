"use client";

import React, { useCallback, useSyncExternalStore, useState } from "react";
import Link from "next/link";
import {
  AppPageHeader,
  AppPageRoot,
  AppPageSection,
  PageTitleBlock,
} from "@/components/layout/page-shell";
import { SettingsWalletActions } from "@/components/settings/settings-wallet-actions";
import { Toaster } from "@/components/ui/sonner";
import {
  AlertTriangle,
  ArrowRight,
  Bell,
  Bot,
  CheckCircle2,
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
  type LucideIcon,
} from "lucide-react";
import { toast } from "sonner";
import {
  CONFIGURE_PROVIDER_HREF,
  DEFAULT_AEROROUTE_SETTINGS,
  RISK_MODE_OPTIONS,
  SLIPPAGE_OPTIONS,
  saveAerorouteSettings,
  loadAerorouteSettings,
  type AerorouteSettings,
  type RiskMode,
  type SlippageOption,
} from "@/lib/aeroroute-settings";

const PRESET_CARDS = [
  {
    name: "Safe" as const,
    description: "Strict confirmation, low slippage, simulation required.",
  },
  {
    name: "Balanced" as const,
    description: "Recommended for most swaps and route analysis.",
  },
  {
    name: "Aggressive" as const,
    description: "Higher slippage tolerance for speed and execution priority.",
  },
];

const integrations = [
  ["Aomi Backend", "https://api.aomi.dev", "Active"],
  ["Browser Wallets", "MetaMask, Coinbase, Rabby, OKX, and more", "Active"],
  ["Base Network", "Chain ID 8453", "Active"],
  ["OpenRouter BYOK", "Optional model provider", "Pending"],
] as const;

const interactiveButtonClass =
  "pointer-events-auto relative z-10 min-h-11 cursor-pointer touch-manipulation transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/50 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60";

function useIsClient() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

function Toggle({
  enabled,
  onChange,
  label,
}: {
  enabled: boolean;
  onChange: (value: boolean) => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!enabled)}
      className={`relative h-8 w-14 shrink-0 rounded-full border transition ${interactiveButtonClass} ${enabled ? "border-emerald-400/40 bg-emerald-400/20" : "border-white/10 bg-white/5"}`}
      aria-pressed={enabled}
      aria-label={label}
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
    <section className="min-w-0 overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.035] p-5 backdrop-blur-xl sm:p-6">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-emerald-400/25 bg-emerald-400/10 text-emerald-300">
          <Icon size={23} />
        </div>
        <div className="min-w-0">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-300">
            {eyebrow}
          </p>
          <h2 className="break-words text-xl font-black text-white">{title}</h2>
        </div>
      </div>
      {children}
    </section>
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
    <div className="flex min-w-0 flex-col gap-4 rounded-2xl border border-white/10 bg-black/20 p-4 md:flex-row md:items-center md:justify-between md:gap-6">
      <div className="min-w-0 flex-1">
        <p className="font-black text-white">{title}</p>
        <p className="mt-1 break-words text-sm text-slate-500">{text}</p>
      </div>
      <div className="flex w-full min-w-0 shrink-0 items-center md:w-auto md:justify-end">
        {children}
      </div>
    </div>
  );
}

function SettingsSelect<T extends string>({
  value,
  options,
  onChange,
  ariaLabel,
}: {
  value: T;
  options: readonly T[];
  onChange: (value: T) => void;
  ariaLabel: string;
}) {
  return (
    <select
      value={value}
      aria-label={ariaLabel}
      onChange={(event) => onChange(event.target.value as T)}
      className={`w-full min-w-0 appearance-none rounded-xl border border-white/10 bg-white/[0.035] bg-[length:1rem] bg-[right_0.75rem_center] bg-no-repeat px-4 py-3 text-sm font-bold text-slate-200 outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/50 md:min-w-[10rem] md:w-auto ${interactiveButtonClass}`}
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
      }}
    >
      {options.map((option) => (
        <option key={option} value={option} className="bg-[#061018] text-white">
          {option}
        </option>
      ))}
    </select>
  );
}

function PresetCard({
  name,
  description,
  selected,
  onClick,
}: {
  name: RiskMode;
  description: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`w-full min-w-0 rounded-2xl border p-5 text-left transition ${interactiveButtonClass} ${selected ? "border-emerald-400/40 bg-emerald-400/10" : "border-white/10 bg-black/20 hover:border-emerald-400/30"}`}
    >
      <div className="mb-3 flex items-center justify-between gap-2">
        <h3 className="font-black text-white">{name}</h3>
        {selected ? <CheckCircle2 size={18} className="shrink-0 text-emerald-300" /> : null}
      </div>
      <p className="break-words text-sm leading-6 text-slate-400">{description}</p>
    </button>
  );
}

function SettingsWorkspace() {
  const [settings, setSettings] = useState<AerorouteSettings>(() => {
    return loadAerorouteSettings() ?? DEFAULT_AEROROUTE_SETTINGS;
  });
  const [saveState, setSaveState] = useState<"idle" | "saved">("idle");

  const updateSettings = useCallback(
    (patch: Partial<AerorouteSettings>) => {
      setSettings((current) => ({ ...current, ...patch }));
      setSaveState("idle");
    },
    [],
  );

  const handleSave = () => {
    saveAerorouteSettings(settings);
    setSaveState("saved");
    toast.success("Settings saved");
    window.setTimeout(() => setSaveState("idle"), 2500);
  };

  const handleReset = () => {
    setSettings(DEFAULT_AEROROUTE_SETTINGS);
    saveAerorouteSettings(DEFAULT_AEROROUTE_SETTINGS);
    setSaveState("idle");
    toast.success("Defaults restored");
  };

  const handlePresetSelect = (riskMode: RiskMode) => {
    updateSettings({ riskMode });
  };

  return (
    <>
      <Toaster position="top-center" richColors closeButton />
      <AppPageHeader>
        <PageTitleBlock
          badge={
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-emerald-300">
              <Sparkles size={14} /> Control center
            </div>
          }
          title={
            <>
              AeroRoute{" "}
              <span className="bg-gradient-to-r from-emerald-300 via-cyan-300 to-orange-300 bg-clip-text text-transparent">
                Settings
              </span>
            </>
          }
          description="Configure wallet behavior, route safety, Aomi backend settings, notifications, and agent execution preferences."
          titleActions={
            <div className="flex w-full min-w-0 flex-col items-stretch gap-2">
              <SettingsWalletActions walletReady />
              <button
                type="button"
                onClick={handleSave}
                className={`inline-flex w-full min-w-0 items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-black text-[#041014] ${interactiveButtonClass} ${
                  saveState === "saved"
                    ? "bg-emerald-300"
                    : "bg-gradient-to-r from-emerald-400 to-cyan-400"
                }`}
              >
                {saveState === "saved" ? (
                  <>
                    <CheckCircle2 size={17} />
                    Saved
                  </>
                ) : (
                  <>
                    <Save size={17} />
                    Save Settings
                  </>
                )}
              </button>
            </div>
          }
        />
      </AppPageHeader>

      <div className="grid w-full min-w-0 grid-cols-1 gap-4 md:gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="min-w-0 space-y-4 md:space-y-6">
          <Panel icon={ShieldCheck} eyebrow="Safety" title="Transaction Protection">
            <div className="space-y-4">
              <SettingRow
                title="Manual confirmation"
                text="Require wallet approval before any Aerodrome swap is signed."
              >
                <Toggle
                  label="Manual confirmation"
                  enabled={settings.manualConfirm}
                  onChange={(manualConfirm) => updateSettings({ manualConfirm })}
                />
              </SettingRow>
              <SettingRow
                title="Simulate before signing"
                text="Run route simulation before wallet confirmation."
              >
                <Toggle
                  label="Simulate before signing"
                  enabled={settings.simulateBeforeSigning}
                  onChange={(simulateBeforeSigning) =>
                    updateSettings({ simulateBeforeSigning })
                  }
                />
              </SettingRow>
              <SettingRow
                title="Maximum slippage"
                text="Set the highest allowed slippage for prepared swaps."
              >
                <SettingsSelect
                  ariaLabel="Maximum slippage"
                  value={settings.maxSlippage}
                  options={SLIPPAGE_OPTIONS}
                  onChange={(maxSlippage) =>
                    updateSettings({ maxSlippage: maxSlippage as SlippageOption })
                  }
                />
              </SettingRow>
              <SettingRow
                title="Risk mode"
                text="Choose how strict AeroRoute should be when recommending paths."
              >
                <SettingsSelect
                  ariaLabel="Risk mode"
                  value={settings.riskMode}
                  options={RISK_MODE_OPTIONS}
                  onChange={(riskMode) =>
                    updateSettings({ riskMode: riskMode as RiskMode })
                  }
                />
              </SettingRow>
            </div>
          </Panel>

          <Panel icon={Bot} eyebrow="Agent" title="Route Agent Behavior">
            <div className="grid w-full min-w-0 grid-cols-1 gap-4 md:grid-cols-3">
              {PRESET_CARDS.map((preset) => (
                <PresetCard
                  key={preset.name}
                  name={preset.name}
                  description={preset.description}
                  selected={settings.riskMode === preset.name}
                  onClick={() => handlePresetSelect(preset.name)}
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
                <Toggle
                  label="Route improvement alerts"
                  enabled={settings.routeAlerts}
                  onChange={(routeAlerts) => updateSettings({ routeAlerts })}
                />
              </SettingRow>
              <SettingRow
                title="Transaction outcome alerts"
                text="Notify me when staged, signed, failed, or confirmed routes change status."
              >
                <Toggle
                  label="Transaction outcome alerts"
                  enabled={settings.transactionAlerts}
                  onChange={(transactionAlerts) =>
                    updateSettings({ transactionAlerts })
                  }
                />
              </SettingRow>
              <SettingRow
                title="Gas movement alerts"
                text="Notify me when gas changes affect route quality."
              >
                <Toggle
                  label="Gas movement alerts"
                  enabled={settings.gasAlerts}
                  onChange={(gasAlerts) => updateSettings({ gasAlerts })}
                />
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
                <div className="min-w-0">
                  <h3 className="font-black text-orange-200">
                    You control every signature.
                  </h3>
                  <p className="mt-2 break-words text-sm leading-7 text-slate-300">
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

        <aside className="min-w-0 space-y-4 md:space-y-6">
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
                  className="flex min-w-0 flex-col gap-1 rounded-2xl border border-white/10 bg-black/20 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
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
                  className="min-w-0 rounded-2xl border border-white/10 bg-black/20 p-4"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0 flex-1">
                      <p className="font-black text-white">{name}</p>
                      <p className="mt-1 break-words text-xs text-slate-500">
                        {detail}
                      </p>
                    </div>
                    <span
                      className={`inline-flex w-fit shrink-0 rounded-full px-3 py-1 text-xs font-bold ${status === "Active" ? "bg-emerald-400/10 text-emerald-300" : "bg-orange-400/10 text-orange-300"}`}
                    >
                      {status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Panel>

          <Panel icon={KeyRound} eyebrow="BYOK" title="Model Provider">
            <p className="break-words text-sm leading-7 text-slate-400">
              Add OpenRouter credits or configure an LLM provider to continue
              real Aomi chat requests when free Aomi credits are exhausted.
            </p>
            <Link
              href={CONFIGURE_PROVIDER_HREF}
              className={`mt-5 inline-flex w-full min-w-0 items-center justify-center gap-3 rounded-2xl border border-emerald-400/25 bg-emerald-400/10 px-5 py-3 font-bold text-emerald-200 hover:bg-emerald-400/15 ${interactiveButtonClass}`}
            >
              Configure Provider
              <ArrowRight size={17} className="shrink-0" />
            </Link>
          </Panel>

          <Panel icon={RefreshCcw} eyebrow="Defaults" title="Reset Controls">
            <p className="break-words text-sm leading-7 text-slate-400">
              Restore safe mode, 0.5% slippage, simulation-first execution, and
              default notification settings.
            </p>
            <button
              type="button"
              onClick={handleReset}
              className={`mt-5 inline-flex w-full min-w-0 items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-orange-400 to-amber-300 px-5 py-3 font-black text-[#130900] ${interactiveButtonClass}`}
            >
              Reset Defaults
              <RefreshCcw size={17} className="shrink-0" />
            </button>
          </Panel>
        </aside>
      </div>

      <div className="mt-6 w-full min-w-0 overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.035] p-4 backdrop-blur-xl sm:p-5">
        <div className="grid w-full min-w-0 grid-cols-1 gap-4 sm:grid-cols-2">
          {[
            [Lock, "Non-Custodial", "AeroRoute never stores private keys."],
            [Gauge, "Slippage Guard", "Default protection before execution."],
            [Route, "Route Rules", "Agent follows selected risk preset."],
            [
              SlidersHorizontal,
              "Flexible Controls",
              "Adjust behavior per trading style.",
            ],
          ].map(([Icon, title, text]) => {
            const SafeIcon = Icon as LucideIcon;
            return (
              <div
                key={title as string}
                className="min-w-0 rounded-2xl border border-white/10 bg-black/20 p-5"
              >
                <SafeIcon className="text-emerald-300" size={25} />
                <h3 className="mt-3 font-black text-white">{title as string}</h3>
                <p className="mt-2 break-words text-sm leading-relaxed text-slate-400">
                  {text as string}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

function SettingsPagePlaceholder() {
  return (
    <>
      <AppPageHeader>
        <PageTitleBlock
          badge={
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-emerald-300">
              <Sparkles size={14} /> Control center
            </div>
          }
          title={
            <>
              AeroRoute{" "}
              <span className="bg-gradient-to-r from-emerald-300 via-cyan-300 to-orange-300 bg-clip-text text-transparent">
                Settings
              </span>
            </>
          }
          description="Configure wallet behavior, route safety, Aomi backend settings, notifications, and agent execution preferences."
          titleActions={
            <div className="flex w-full min-w-0 flex-col items-stretch gap-2">
              <SettingsWalletActions walletReady={false} />
              <button
                type="button"
                disabled
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-400 to-cyan-400 px-5 py-3 text-sm font-black text-[#041014] opacity-90"
              >
                <Save size={17} />
                Save Settings
              </button>
            </div>
          }
        />
      </AppPageHeader>
      <div className="h-48 animate-pulse rounded-[2rem] border border-white/10 bg-white/[0.03]" />
    </>
  );
}

export default function AeroRouteSettingsPreview() {
  const isClient = useIsClient();

  return (
    <AppPageRoot>
      <AppPageSection>
        {isClient ? <SettingsWorkspace /> : <SettingsPagePlaceholder />}
      </AppPageSection>
    </AppPageRoot>
  );
}
