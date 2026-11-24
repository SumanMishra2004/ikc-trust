import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";
import { siteConfig } from "@/data/homepage";

const footerNav = {
  organisation: [
    { label: "About Us",        href: "/about" },
    { label: "Advisory Board",  href: "/advisory-board" },
    { label: "Our Team",        href: "/team" },
    { label: "Partnerships",    href: "/partnerships" },
    { label: "Collaborators",   href: "/collaborators" },
    { label: "Contributors",    href: "/contributors" },
    { label: "Awards & Recognition", href: "/awards-recognition" },
  ],
  initiatives: [
    { label: "Education & Knowledge",      href: "/initiatives/education" },
    { label: "Healthcare & Wellbeing",     href: "/initiatives/healthcare" },
    { label: "Social Welfare",             href: "/initiatives/social-welfare" },
    { label: "Environment",                href: "/initiatives/environment" },
    { label: "Disaster Relief",            href: "/initiatives/disaster-relief" },
    { label: "Culture & Sports",           href: "/initiatives/culture-sports" },
    { label: "Conference",                 href: "/initiatives/conference" },
  ],
  connect: [
    { label: "Contact Us",          href: "/contact" },
    { label: "Become a Volunteer",  href: "mailto:admin@ikc.org.in?subject=[IKC Trust] Volunteering Enquiry" },
    { label: "CSR Programme",       href: "mailto:admin@ikc.org.in?subject=[IKC Trust] CSR%2FPartnership Enquiry" },
    { label: "Make a Contribution", href: "mailto:admin@ikc.org.in?subject=[IKC Trust] Donation Enquiry" },
    { label: "Media & Press",       href: "mailto:admin@ikc.org.in?subject=[IKC Trust] Media%2FPress Enquiry" },
  ],
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-charcoal text-warm-white">

      {/* ── Main grid ── */}
      <div className="w-full px-6 md:px-12 lg:px-20 pt-20 pb-16 border-b border-warm-white/10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12">

          {/* Identity */}
          <div className="lg:col-span-4 space-y-6">
            <Link href="/" className="flex items-center gap-3 group w-fit">
              <div className="relative w-10 h-10 flex-shrink-0 bg-white/15 rounded-full p-1.5">
                <Image
                  src="/logo.png"
                  alt="IKC Trust"
                  fill
                  sizes="40px"
                  className="object-contain p-0.5"
                />
              </div>
              <span className="font-serif text-2xl text-warm-white tracking-wide">
                IKC TRUST
              </span>
            </Link>

            <p className="font-sans text-sm text-sand/70 leading-relaxed max-w-xs">
              Integrated Knowledge & Care — empowering communities across West Bengal through education, healthcare, and sustainable development.
            </p>

            {/* Contact block */}
            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-2.5">
                <MapPin size={13} className="text-terracotta mt-0.5 flex-shrink-0" />
                <span className="font-sans text-xs text-sand/60 leading-relaxed">
                  5 Elgin Road, Heritage Enclave<br />Kolkata 700020, West Bengal
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone size={13} className="text-terracotta flex-shrink-0" />
                <a href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                  className="font-sans text-xs text-sand/60 hover:text-warm-white transition-colors">
                  {siteConfig.phone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail size={13} className="text-terracotta flex-shrink-0" />
                <a href={`mailto:${siteConfig.email}`}
                  className="font-sans text-xs text-sand/60 hover:text-warm-white transition-colors">
                  {siteConfig.email}
                </a>
              </div>
            </div>
          </div>

          {/* Organisation */}
          <div className="lg:col-span-3 space-y-5">
            <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-sand font-semibold">
              Organisation
            </p>
            <ul className="space-y-2.5">
              {footerNav.organisation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="font-sans text-sm text-sand/70 hover:text-warm-white transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Initiatives */}
          <div className="lg:col-span-3 space-y-5">
            <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-sand font-semibold">
              Initiatives
            </p>
            <ul className="space-y-2.5">
              {footerNav.initiatives.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="font-sans text-sm text-sand/70 hover:text-warm-white transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div className="lg:col-span-2 space-y-5">
            <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-sand font-semibold">
              Connect
            </p>
            <ul className="space-y-2.5">
              {footerNav.connect.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="font-sans text-sm text-sand/70 hover:text-warm-white transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <div className="pt-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-terracotta text-warm-white font-sans text-[11px] uppercase tracking-[0.18em] font-semibold hover:bg-terracotta-dark transition-colors"
              >
                Get Involved →
              </Link>
            </div>
          </div>

        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="w-full px-6 md:px-12 lg:px-20 py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <p className="font-sans text-xs text-sand/50">
            © {currentYear} IKC TRUST (Integrated Knowledge & Care). All Rights Reserved.
          </p>
          <p className="font-sans text-[11px] text-sand/35 leading-relaxed max-w-xl">
            Registered Public Charitable Trust · Indian Trusts Act, 1882 · Section 12A & 80G certified
          </p>
        </div>
        <div className="flex items-center gap-5 text-[11px] font-sans text-sand/40 uppercase tracking-[0.15em]">
          <Link href="/contact" className="hover:text-warm-white transition-colors">Privacy</Link>
          <span className="text-sand/20">·</span>
          <Link href="/contact" className="hover:text-warm-white transition-colors">Terms</Link>
          <span className="text-sand/20">·</span>
          <Link href="/contact" className="hover:text-warm-white transition-colors">Disclosures</Link>
        </div>
      </div>

    </footer>
  );
}
