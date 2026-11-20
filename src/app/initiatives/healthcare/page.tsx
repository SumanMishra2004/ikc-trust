import Link from "next/link";
import { HeartPulse, ArrowLeft } from "lucide-react";

export default function HealthcarePage() {
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
          <div className="w-12 h-12 rounded-xl bg-orange-500 flex items-center justify-center">
            <HeartPulse className="text-white" size={22} />
          </div>
          <span className="text-xs font-sans uppercase tracking-[0.2em] text-terracotta font-semibold">
            Initiative · 02
          </span>
        </div>

        <h1 className="font-serif text-4xl md:text-5xl text-charcoal mb-6 leading-tight">
          Healthcare &amp; Medical
        </h1>
        <p className="font-sans text-lg text-charcoal-muted leading-relaxed max-w-2xl mb-12">
          Establishing hospitals, health centers, and mobile clinics — operating
          mobile health vans, tele-medicine outposts, maternal-child nutritional
          regimens, and quarterly diagnostic camps across remote riverine
          settlements.
        </p>

        <div className="grid sm:grid-cols-2 gap-6">
          {[
            { label: "Mobile Health Vans", desc: "3 fully-equipped diagnostic vans navigating riverine and forest roads quarterly." },
            { label: "Tele-Medicine Outposts", desc: "Video consultation kiosks linking villages to Kolkata specialists for free." },
            { label: "Maternal & Child Nutrition", desc: "Supplementary feeding programs for 1,200+ pregnant women and infants." },
            { label: "Sundarbans Boat Clinics", desc: "Medical triage and essential pharmaceuticals delivered to 18 coastal islands by boat." },
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
