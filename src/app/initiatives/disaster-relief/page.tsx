import Link from "next/link";
import { ShieldAlert, ArrowLeft } from "lucide-react";

export default function DisasterReliefPage() {
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
          <div className="w-12 h-12 rounded-xl bg-gray-500 flex items-center justify-center">
            <ShieldAlert className="text-white" size={22} />
          </div>
          <span className="text-xs font-sans uppercase tracking-[0.2em] text-terracotta font-semibold">
            Initiative · 05
          </span>
        </div>

        <h1 className="font-serif text-4xl md:text-5xl text-charcoal mb-6 leading-tight">
          Disaster Relief
        </h1>
        <p className="font-sans text-lg text-charcoal-muted leading-relaxed max-w-2xl mb-12">
          Providing emergency relief, rehabilitation, and resilience-building —
          rapid response network delivering immediate ration kits, water
          purification units, and dry-shelter stabilization during Bengal
          cyclones, tidal surges, and floods.
        </p>

        <div className="grid sm:grid-cols-2 gap-6">
          {[
            { label: "Emergency Ration Kits", desc: "Pre-positioned food and medicine kits deployable within 24 hours of a disaster declaration." },
            { label: "Water Purification Units", desc: "Portable filtration units distributed to flood-affected villages in the delta." },
            { label: "Shelter Stabilisation", desc: "Tarpaulin and structural support for families whose homes are damaged by cyclones." },
            { label: "Post-Disaster Rehabilitation", desc: "Long-term livelihood restoration for farmers and fisherfolk after cyclone losses." },
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
