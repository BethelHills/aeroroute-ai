import { footerGroups, footerLinks } from "@/lib/landing-data";
import { Logo } from "./logo";

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/10 px-5 py-10 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-4">
        <div>
          <Logo className="h-16 w-auto md:h-24" href="/" />
          <p className="mt-4 text-sm text-slate-500">AI-powered route optimizer for Aerodrome on Base.</p>
        </div>
        {footerGroups.map((group) => (
          <div key={group}>
            <h4 className="font-bold">{group}</h4>
            <div className="mt-4 space-y-3 text-sm text-slate-500">
              {footerLinks.map((link) => (
                <p key={`${group}-${link}`}>{link}</p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </footer>
  );
}
