import Link from "next/link";
import { GraduationCap, ArrowLeft } from "lucide-react";

export default function EducationPage() {
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
          <div className="w-12 h-12 rounded-xl bg-sky-500 flex items-center justify-center">
            <GraduationCap className="text-white" size={22} />
          </div>
          <span className="text-xs font-sans uppercase tracking-[0.2em] text-terracotta font-semibold">
            Initiative · 01
          </span>
        </div>

        <h1 className="font-serif text-4xl md:text-5xl text-charcoal mb-6 leading-tight">
          Education &amp; Knowledge Systems
        </h1>
        <p className="font-sans text-lg text-charcoal-muted leading-relaxed max-w-2xl mb-12">
          Foundational rural schooling, digital learning laboratories, community
          libraries, and teacher training programs designed to dismantle
          multi-generational illiteracy in marginalized districts.
        </p>

        <div className="grid sm:grid-cols-2 gap-6">
          {[
            { label: "Primary & Vocational Literacy", desc: "School infrastructure support and teacher training across 20+ villages." },
            { label: "Digital Learning Labs", desc: "Solar-powered computer centres enabling evening study circles for children and adults." },
            { label: "Community Libraries", desc: "Multilingual book banks serving rural reading groups and skill-development clubs." },
            { label: "Scholarship Programs", desc: "Merit-based sponsorships for students from families below the poverty line." },
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
