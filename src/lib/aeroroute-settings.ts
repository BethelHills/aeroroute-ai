export type RiskMode = "Safe" | "Balanced" | "Aggressive";

export type SlippageOption = "0.25%" | "0.50%" | "1.00%" | "2.00%";

export type AerorouteSettings = {
  manualConfirm: boolean;
  simulateBeforeSigning: boolean;
  maxSlippage: SlippageOption;
  riskMode: RiskMode;
  routeAlerts: boolean;
  transactionAlerts: boolean;
  gasAlerts: boolean;
};

export const SLIPPAGE_OPTIONS: SlippageOption[] = [
  "0.25%",
  "0.50%",
  "1.00%",
  "2.00%",
];

export const RISK_MODE_OPTIONS: RiskMode[] = ["Safe", "Balanced", "Aggressive"];

export const DEFAULT_AEROROUTE_SETTINGS: AerorouteSettings = {
  manualConfirm: true,
  simulateBeforeSigning: true,
  maxSlippage: "0.50%",
  riskMode: "Safe",
  routeAlerts: true,
  transactionAlerts: true,
  gasAlerts: true,
};

const STORAGE_KEY = "aeroroute-settings";

function isRiskMode(value: string): value is RiskMode {
  return RISK_MODE_OPTIONS.includes(value as RiskMode);
}

function isSlippage(value: string): value is SlippageOption {
  return SLIPPAGE_OPTIONS.includes(value as SlippageOption);
}

export function loadAerorouteSettings(): AerorouteSettings | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return null;
    }

    const parsed = JSON.parse(raw) as Partial<AerorouteSettings>;
    return {
      manualConfirm:
        typeof parsed.manualConfirm === "boolean"
          ? parsed.manualConfirm
          : DEFAULT_AEROROUTE_SETTINGS.manualConfirm,
      simulateBeforeSigning:
        typeof parsed.simulateBeforeSigning === "boolean"
          ? parsed.simulateBeforeSigning
          : DEFAULT_AEROROUTE_SETTINGS.simulateBeforeSigning,
      maxSlippage:
        parsed.maxSlippage && isSlippage(parsed.maxSlippage)
          ? parsed.maxSlippage
          : DEFAULT_AEROROUTE_SETTINGS.maxSlippage,
      riskMode:
        parsed.riskMode && isRiskMode(parsed.riskMode)
          ? parsed.riskMode
          : DEFAULT_AEROROUTE_SETTINGS.riskMode,
      routeAlerts:
        typeof parsed.routeAlerts === "boolean"
          ? parsed.routeAlerts
          : DEFAULT_AEROROUTE_SETTINGS.routeAlerts,
      transactionAlerts:
        typeof parsed.transactionAlerts === "boolean"
          ? parsed.transactionAlerts
          : DEFAULT_AEROROUTE_SETTINGS.transactionAlerts,
      gasAlerts:
        typeof parsed.gasAlerts === "boolean"
          ? parsed.gasAlerts
          : DEFAULT_AEROROUTE_SETTINGS.gasAlerts,
    };
  } catch {
    return null;
  }
}

export function saveAerorouteSettings(settings: AerorouteSettings): void {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
}

export const CONFIGURE_PROVIDER_HREF = `/agent-chat?prompt=${encodeURIComponent(
  "Help me configure OpenRouter BYOK for AeroRoute AI",
)}`;
