import type { Metadata } from "next";
import Header from "@/components/header";
import Footer from "@/components/footer";
import TeamSection from "@/components/team/TeamSection";
import { fetchTeamMembers } from "@/sanity/queries/people";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Our Team — IKC Trust | Integrated Knowledge & Care",
  description:
    "Meet the dedicated team behind IKC Trust — professionals and change-makers driving education, healthcare, environment, and social welfare initiatives across West Bengal.",
};

export default async function TeamPage() {
  const members = await fetchTeamMembers();

  return (
    <main>
      <Header />

      {/* ── Hero banner ── */}
      <div className="w-full bg-forest pt-36 pb-16 md:pt-44 md:pb-20 border-b border-forest-dark">
        <div className="w-full px-6 md:px-12 lg:px-20">
          <div className="flex items-center gap-3 mb-5">
            <span className="w-8 h-[2px] bg-terracotta flex-shrink-0" />
            <span className="text-xs font-sans uppercase tracking-[0.25em] text-terracotta font-semibold">
              IKC Trust · People
            </span>
          </div>
          <h1 className="font-serif text-5xl sm:text-6xl md:text-[72px] text-warm-white leading-[1.05] font-normal tracking-tight max-w-3xl">
            Our Team
          </h1>
          <p className="font-sans text-base md:text-body-lg text-sand/80 leading-relaxed max-w-2xl mt-5">
            A collective of passionate individuals united by a common purpose —
            to serve communities, build knowledge, and deliver care where it
            matters most.
          </p>
        </div>
      </div>

      <TeamSection members={members} />
      <Footer />
    </main>
  );
}
