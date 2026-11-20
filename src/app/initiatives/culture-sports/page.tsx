import Link from "next/link";
import { Heart, ArrowLeft } from "lucide-react";

export default function CultureSportsPage() {
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
          <div className="w-12 h-12 rounded-xl bg-pink-500 flex items-center justify-center">
            <Heart className="text-white" size={22} />
          </div>
          <span className="text-xs font-sans uppercase tracking-[0.2em] text-terracotta font-semibold">
            Initiative · 06
          </span>
        </div>

        <h1 className="font-serif text-4xl md:text-5xl text-charcoal mb-6 leading-tight">
          Culture &amp; Sports
        </h1>
        <p className="font-sans text-lg text-charcoal-muted leading-relaxed max-w-2xl mb-12">
          Promoting Indian culture through arts, music, dance, and sports —
          reviving indigenous folk arts of rural Bengal (Baul musical archives,
          Patachitra painting circles) alongside organizing grassroots football
          academies for district youth development.
        </p>

        <div className="grid sm:grid-cols-2 gap-6">
          {[
            { label: "Baul Music Archives", desc: "Recording and preservation of rare Baul compositions from aging folk masters." },
            { label: "Patachitra Painting Circles", desc: "Workshops and cooperative sales enabling traditional scroll artists to earn dignified livelihoods." },
            { label: "Youth Football Academies", desc: "Grassroots coaching camps for 400+ young players across six district blocks." },
            { label: "Cultural Festivals", desc: "Annual Lok Utsav celebrating indigenous dances, crafts, and oral storytelling traditions." },
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
