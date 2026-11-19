import Link from "next/link";
import { siteConfig, footer, areasOfWork } from "@/data/homepage";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-charcoal text-warm-white pt-24 pb-12 border-t border-sand-dark/20">
      <div className="w-full px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-warm-white/10">
          {/* Identity */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full border border-warm-white/20 flex items-center justify-center bg-forest/70 text-warm-white flex-shrink-0">
                <span className="font-serif italic font-bold text-lg leading-none">I</span>
              </div>
              <span className="font-serif text-2xl text-warm-white tracking-wide">
                IKC TRUST
              </span>
            </div>
            <p className="font-sans text-sm text-sand/80 leading-relaxed max-w-sm">
              {footer.about}
            </p>
            <div className="pt-4 text-xs font-sans space-y-1 text-sand/60">
              <p className="text-sand uppercase tracking-widest font-semibold mb-2">
                Headquarters
              </p>
              <p>{siteConfig.headquarters}</p>
              <p>
                {siteConfig.email} | {siteConfig.phone}
              </p>
            </div>
          </div>

          {/* Focus Areas */}
          <div className="lg:col-span-3 space-y-4">
            <div className="text-xs font-sans uppercase tracking-[0.2em] text-sand font-semibold">
              Focus Areas
            </div>
            <ul className="space-y-2 text-sm text-sand/80">
              {footer.focusAreas.map((item) => (
                <li key={item}>
                  <Link
                    href="#areas-of-work"
                    className="hover:text-warm-white transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Governance */}
          <div className="lg:col-span-3 space-y-4">
            <div className="text-xs font-sans uppercase tracking-[0.2em] text-sand font-semibold">
              Governance & Reports
            </div>
            <ul className="space-y-2 text-sm text-sand/80">
              {footer.governance.map((item) => (
                <li key={item}>
                  <Link href="#" className="hover:text-warm-white transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Institution */}
          <div className="lg:col-span-2 space-y-4">
            <div className="text-xs font-sans uppercase tracking-[0.2em] text-sand font-semibold">
              Institution
            </div>
            <ul className="space-y-2 text-sm text-sand/80">
              {footer.institution.map((item) => (
                <li key={item}>
                  <Link href="#" className="hover:text-warm-white transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs font-sans text-sand/60">
          <div className="space-y-1">
            <p>© {currentYear} IKC TRUST (Integrated Knowledge & Care). All Rights Reserved.</p>
            <p>{footer.legal}</p>
          </div>
          <div className="flex items-center gap-6 uppercase tracking-widest text-[11px]">
            <Link href="#" className="hover:text-warm-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-warm-white transition-colors">
              Terms of Trust
            </Link>
            <Link href="#" className="hover:text-warm-white transition-colors">
              Regulatory Disclosures
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
