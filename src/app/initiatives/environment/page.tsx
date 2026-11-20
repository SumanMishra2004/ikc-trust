import Link from "next/link";
import { Leaf, ArrowLeft } from "lucide-react";

export default function EnvironmentPage() {
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
          <div className="w-12 h-12 rounded-xl bg-teal-500 flex items-center justify-center">
            <Leaf className="text-white" size={22} />
          </div>
          <span className="text-xs font-sans uppercase tracking-[0.2em] text-terracotta font-semibold">
            Initiative · 03
          </span>
        </div>

        <h1 className="font-serif text-4xl md:text-5xl text-charcoal mb-6 leading-tight">
          Environment &amp; Conservation
        </h1>
        <p className="font-sans text-lg text-charcoal-muted leading-relaxed max-w-2xl mb-12">
          Afforestation drives with indigenous flora, traditional water reservoir
          revival, rainwater harvesting, and training farmers in chemical-free
          permaculture across the Purulia &amp; Bankura belt.
        </p>

        <div className="grid sm:grid-cols-2 gap-6">
          {[
            { label: "Tree Plantation Drives", desc: "50,000+ native saplings planted by tribal women-led nursery cooperatives." },
            { label: "Water Reservoir Revival", desc: "Restoration of traditional 'bandhs' for groundwater recharge and drought mitigation." },
            { label: "Rainwater Harvesting", desc: "Household and community-level collection structures across 15 panchayats." },
            { label: "Chemical-Free Farming", desc: "Permaculture training workshops converting 300+ farmer families to organic practice." },
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
