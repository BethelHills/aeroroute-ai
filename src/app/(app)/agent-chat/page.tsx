import {
  AppPageHeader,
  AppPageRoot,
  AppPageSection,
  PageTitleBlock,
} from "@/components/layout/page-shell";
import { WalletStatusButtons } from "@/components/layout/wallet-status-buttons";
import { AerorouteAomiChat } from "@/components/agent-chat/aeroroute-aomi-chat";
import { Sparkles } from "lucide-react";

export default function AeroRouteAgentChatPage() {
  const aomiApiKey = process.env.AOMI_API_KEY;

  return (
    <AppPageRoot>
      <AppPageSection>
        <AppPageHeader>
          <PageTitleBlock
            badge={
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-emerald-300">
                <Sparkles size={14} /> Aomi-powered assistant
              </div>
            }
            title={
              <>
                Agent{" "}
                <span className="bg-gradient-to-r from-emerald-300 via-cyan-300 to-orange-300 bg-clip-text text-transparent">
                  Chat
                </span>
              </>
            }
            description="Ask AeroRoute AI to quote swaps, compare routes, simulate transactions, and prepare Aerodrome actions on Base."
            titleActions={<WalletStatusButtons />}
          />
        </AppPageHeader>

        <AerorouteAomiChat aomiApiKey={aomiApiKey} />
      </AppPageSection>
    </AppPageRoot>
  );
}
