import { AiInsights } from "@/components/landing/ai-insights";
import { AnalyticsPreview } from "@/components/landing/analytics-preview";
import { Cta } from "@/components/landing/cta";
import { Ecosystem } from "@/components/landing/ecosystem";
import { Features } from "@/components/landing/features";
import { Footer } from "@/components/landing/footer";
import { Hero } from "@/components/landing/hero";
import { HowItWorks } from "@/components/landing/how-it-works";
import { TrustedBy } from "@/components/landing/trusted-by";

export default function AeroRouteLandingPage() {
  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-[#03070b] text-white">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top_left,rgba(0,245,160,0.18),transparent_34%),radial-gradient(circle_at_top_right,rgba(255,122,24,0.15),transparent_32%),linear-gradient(180deg,#03070b_0%,#051016_55%,#03070b_100%)]" />
      <div className="fixed inset-0 opacity-[0.22] [background-image:linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:80px_80px]" />

      <Hero />
      <TrustedBy />
      <Features />
      <section className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[0.55fr_1fr] lg:px-8">
        <AiInsights />
        <AnalyticsPreview />
      </section>
      <HowItWorks />
      <Ecosystem />
      <Cta />
      <Footer />
    </main>
  );
}
