import { base } from "viem/chains";
import { http } from "viem";

export const AEROROUTE_EVM_CHAINS = [base] as const;

export const AEROROUTE_EVM_TRANSPORTS = {
  [base.id]: http(),
} as const;

export const DEFAULT_CHAIN_ID = Number(
  process.env.NEXT_PUBLIC_CHAIN_ID ?? base.id,
);

export function getParaApiKey(): string {
  return process.env.NEXT_PUBLIC_PARA_API_KEY?.trim() ?? "";
}
