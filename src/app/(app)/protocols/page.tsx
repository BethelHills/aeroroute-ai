import {
  AppPageHeader,
  AppPageRoot,
  AppPageSection,
  PageTitleBlock,
} from "@/components/layout/page-shell";
import { WalletStatusButtons } from "@/components/layout/wallet-status-buttons";
import { ProtocolsWorkspace } from "@/components/protocols/protocols-workspace";
import { Sparkles } from "lucide-react";

export default function ProtocolsPage() {
  return (
    <AppPageRoot>
      <AppPageSection>
        <AppPageHeader>
          <PageTitleBlock
            badge={
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-emerald-300">
                <Sparkles size={14} /> Base ecosystem
              </div>
            }
            title={
              <>
                Protocol{" "}
                <span className="bg-gradient-to-r from-emerald-300 via-cyan-300 to-orange-300 bg-clip-text text-transparent">
                  Directory
                </span>
              </>
            }
            description="Explore Base protocols for routing, liquidity, swaps, lending, and bridges. Analyze any protocol with AeroRoute AI or open the route optimizer."
            titleActions={<WalletStatusButtons />}
          />
        </AppPageHeader>

        <ProtocolsWorkspace />
      </AppPageSection>
    </AppPageRoot>
  );
}
