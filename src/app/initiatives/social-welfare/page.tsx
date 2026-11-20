import Link from "next/link";
import { Users, ArrowLeft } from "lucide-react";

export default function SocialWelfarePage() {
  return (
    <main className="min-h-screen bg-warm-white pt-32 pb-24 px-6 md:px-12 lg:px-20">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-charcoal-muted hover:text-forest transition-colors mb-10"
        >
          <ArrowLeft size={14} /> Back to Home
        </Link>

        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 rounded-xl bg-green-500 flex items-center justify-center">
            <Users className="text-white" size={22} />
          </div>
          <span className="text-xs font-sans uppercase tracking-[0.2em] text-terracotta font-semibold">
            Initiative · 04
          </span>
        </div>

        <h1 className="font-serif text-4xl md:text-5xl text-charcoal mb-6 leading-tight">
          Social Welfare &amp; Women Collectives
        </h1>
        <p className="font-sans text-lg text-charcoal-muted leading-relaxed max-w-2xl mb-12">
          Supporting children, women, youth, and senior citizens through
          self-help micro-enterprises, traditional Kantha stitching collectives,
          financial literacy, and community legal guidance.
        </p>

        <div className="grid sm:grid-cols-2 gap-6">
          {[
            { label: "Women Self-Help Collectives", desc: "Kantha stitching, micro-finance, and artisan marketing cooperatives across 12 blocks." },
            { label: "Financial Literacy", desc: "Banking, savings, and insurance awareness camps for women heads-of-household." },
            { label: "Child Protection", desc: "School enrolment drives, mid-day meal monitoring, and abuse prevention awareness." },
            { label: "Legal Aid Clinics", desc: "Free community legal guidance sessions with volunteer advocates for rural families." },
          ].map((item) => (
            <div key={item.label} className="bg-ivory border border-sand-dark p-6">
              <h3 className="font-serif text-xl text-charcoal mb-2">{item.label}</h3>
              <p className="font-sans text-sm text-charcoal-muted leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
