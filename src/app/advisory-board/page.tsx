import type { Metadata } from "next";
import Header from "@/components/header";
import Footer from "@/components/footer";
import AdvisoryBoardSection from "@/components/advisory-board/AdvisoryBoardSection";
import { fetchAdvisoryBoardMembers } from "@/sanity/queries/people";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Advisory Board — IKC Trust | Integrated Knowledge & Care",
  description:
    "Meet the distinguished scholars, jurists, and practitioners who guide IKC Trust's strategic direction and institutional governance across education, healthcare, environment, and social welfare.",
};

export default async function AdvisoryBoardPage() {
  const members = await fetchAdvisoryBoardMembers();

  return (
    <main>
      <Header />

      {/* ── Hero banner ── */}
      <div className="w-full bg-charcoal pt-36 pb-16 md:pt-44 md:pb-20 border-b border-charcoal-light/30">
        <div className="w-full px-6 md:px-12 lg:px-20">
          <div className="flex items-center gap-3 mb-5">
            <span className="w-8 h-[2px] bg-terracotta flex-shrink-0" />
            <span className="text-xs font-sans uppercase tracking-[0.25em] text-terracotta font-semibold">
              IKC Trust · Leadership
            </span>
          </div>
          <h1 className="font-serif text-5xl sm:text-6xl md:text-[72px] text-warm-white leading-[1.05] font-normal tracking-tight max-w-3xl">
            Advisory Board
          </h1>
          <p className="font-sans text-base md:text-body-lg text-sand/70 leading-relaxed max-w-2xl mt-5">
            Eminent voices guiding our institutional direction — bringing depth of
            expertise, independent perspective, and long-term vision to every
            decision IKC Trust makes.
          </p>

          {/* Credential strip */}
          <div className="mt-10 flex flex-wrap items-center gap-6 pt-8 border-t border-warm-white/10">
            <div className="flex flex-col">
              <span className="font-serif text-3xl text-terracotta leading-none">12A</span>
              <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-sand/60 mt-1">
                Registered Trust
              </span>
            </div>
            <div className="w-px h-10 bg-warm-white/10 hidden sm:block" />
            <div className="flex flex-col">
              <span className="font-serif text-3xl text-terracotta leading-none">80G</span>
              <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-sand/60 mt-1">
                Tax Exempt Donations
              </span>
            </div>
            <div className="w-px h-10 bg-warm-white/10 hidden sm:block" />
            <div className="flex flex-col">
              <span className="font-serif text-3xl text-terracotta leading-none">Est.</span>
              <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-sand/60 mt-1">
                Kolkata, West Bengal
              </span>
            </div>
          </div>
        </div>
      </div>

      <AdvisoryBoardSection members={members} />
      <Footer />
    </main>
  );
}
