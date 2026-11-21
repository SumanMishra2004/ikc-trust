"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";
import { ChevronDown } from "lucide-react";
import { urlFor } from "@/sanity/image";
import type { AdvisoryBoardMember } from "@/types/people";

export type { AdvisoryBoardMember };

// ── Animations ─────────────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: (i % 2) * 0.1 },
  }),
};

const headerFade = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

// ── Standard card ──────────────────────────────────────────────────────────

function AdvisoryCard({
  member,
  index,
}: {
  member: AdvisoryBoardMember;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [expanded, setExpanded] = useState(false);

  const photoSrc = urlFor(member.photo.asset)
    .width(384)
    .height(480)
    .fit("crop")
    .auto("format")
    .quality(85)
    .url();

  return (
    <motion.div
      ref={ref}
      custom={index}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="group bg-warm-white border border-sand-dark flex flex-col overflow-hidden hover:shadow-[0_8px_32px_rgba(36,75,60,0.12)] transition-shadow duration-300"
    >
      {/* ── Top: image + identity ── */}
      <div className="flex flex-col sm:flex-row">
        {/* Photo */}
        <div className="relative w-full sm:w-48 h-56 sm:h-auto flex-shrink-0 overflow-hidden bg-sand">
          <Image
            src={photoSrc}
            alt={member.name}
            fill
            sizes="(max-width: 640px) 100vw, 192px"
            className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
            placeholder={member.photo.lqip ? "blur" : "empty"}
            blurDataURL={member.photo.lqip}
          />
          <div className="absolute inset-0 bg-forest/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        {/* Identity */}
        <div className="flex-1 p-6 sm:p-8 border-t sm:border-t-0 sm:border-l border-sand-dark/60 flex flex-col justify-between">
          <div>
            {member.expertise && (
              <span className="inline-flex items-center gap-2 text-[10px] font-sans uppercase tracking-[0.22em] text-terracotta font-semibold mb-3">
                <span className="w-4 h-[2px] bg-terracotta flex-shrink-0" />
                {member.expertise}
              </span>
            )}
            <h3 className="font-serif text-xl sm:text-2xl text-charcoal leading-snug mb-2 group-hover:text-forest transition-colors duration-200">
              {member.name}
            </h3>
            <p className="font-sans text-body-sm text-charcoal-muted leading-relaxed">
              {member.affiliation}
            </p>
          </div>

          <button
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
            className="mt-6 self-start flex items-center gap-2 text-[11px] font-sans uppercase tracking-[0.18em] font-semibold text-forest hover:text-terracotta transition-colors group/btn"
          >
            {expanded ? "Collapse" : "Read Profile"}
            <ChevronDown
              size={14}
              className={`transition-transform duration-300 ${expanded ? "rotate-180" : ""} group-hover/btn:translate-y-0.5`}
            />
          </button>
        </div>
      </div>

      {/* ── Expandable description ── */}
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="px-6 sm:px-8 py-6 bg-sand/30 border-t border-sand-dark/60">
              <p className="font-sans text-body-md text-charcoal-muted leading-relaxed">
                {member.description}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ── Featured card ──────────────────────────────────────────────────────────

function FeaturedAdvisoryCard({ member }: { member: AdvisoryBoardMember }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const photoSrc = urlFor(member.photo.asset)
    .width(576)
    .height(720)
    .fit("crop")
    .auto("format")
    .quality(85)
    .url();

  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      custom={0}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="group bg-forest text-warm-white border border-forest-dark flex flex-col lg:flex-row overflow-hidden hover:shadow-[0_12px_48px_rgba(36,75,60,0.28)] transition-shadow duration-300 lg:col-span-2"
    >
      {/* Photo */}
      <div className="relative w-full lg:w-72 h-64 lg:h-auto flex-shrink-0 overflow-hidden bg-forest-dark">
        <Image
          src={photoSrc}
          alt={member.name}
          fill
          sizes="(max-width: 1024px) 100vw, 288px"
          className="object-cover object-top opacity-80 transition-transform duration-700 group-hover:scale-105 mix-blend-luminosity"
          placeholder={member.photo.lqip ? "blur" : "empty"}
          blurDataURL={member.photo.lqip}
        />
        <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-forest via-forest/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="flex-1 p-8 md:p-10 flex flex-col justify-between">
        <div>
          {member.expertise && (
            <span className="inline-flex items-center gap-2 text-[10px] font-sans uppercase tracking-[0.25em] text-terracotta font-semibold mb-4">
              <span className="w-4 h-[2px] bg-terracotta flex-shrink-0" />
              {member.expertise}
            </span>
          )}
          <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl text-warm-white leading-tight mb-2">
            {member.name}
          </h3>
          <p className="font-sans text-body-sm text-sand/80 mb-6">{member.affiliation}</p>
          <div className="w-12 h-[2px] bg-terracotta/60 mb-6" />
          <p className="font-sans text-body-md text-sand/90 leading-relaxed max-w-xl">
            {member.description}
          </p>
        </div>
        <div className="mt-8 pt-6 border-t border-warm-white/10">
          <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-sand/60">
            Advisory Board · IKC Trust
          </span>
        </div>
      </div>
    </motion.div>
  );
}

// ── Empty state ────────────────────────────────────────────────────────────

function EmptyState() {
  return (
    <div className="col-span-full py-20 text-center">
      <span className="font-sans text-[11px] uppercase tracking-[0.2em] text-charcoal-muted/40">
        No advisory board members published yet
      </span>
      <p className="mt-2 font-serif text-sm italic text-charcoal-muted/40">
        Add members in Sanity Studio to populate this page.
      </p>
    </div>
  );
}

// ── Section ────────────────────────────────────────────────────────────────

interface Props {
  members: AdvisoryBoardMember[];
}

export default function AdvisoryBoardSection({ members }: Props) {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-60px" });

  // The query orders featured first; take the first isFeatured member as featured card
  const featured = members.find((m) => m.isFeatured) ?? members[0] ?? null;
  const rest = members.filter((m) => m._id !== featured?._id);

  return (
    <section className="w-full bg-ivory py-24 md:py-32 border-b border-sand-dark/40">
      <div className="w-full px-6 md:px-12 lg:px-20">

        {/* ── Section header ── */}
        <div ref={headerRef}>
          <motion.div
            variants={headerFade}
            initial="hidden"
            animate={headerInView ? "visible" : "hidden"}
            className="flex items-center gap-3 mb-8"
          >
            <span className="w-8 h-[2px] bg-terracotta flex-shrink-0" />
            <span className="text-xs font-sans uppercase tracking-[0.25em] text-terracotta font-semibold">
              Advisory Board
            </span>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 mb-16 pb-12 border-b border-sand-dark/40">
            <motion.div
              variants={headerFade}
              initial="hidden"
              animate={headerInView ? "visible" : "hidden"}
              transition={{ delay: 0.08 }}
              className="lg:col-span-6"
            >
              <h2 className="font-serif text-4xl sm:text-5xl md:text-[52px] text-charcoal leading-[1.1] font-normal tracking-tight">
                Guided by{" "}
                <span className="italic text-forest">Wisdom & Experience.</span>
              </h2>
            </motion.div>

            <motion.div
              variants={headerFade}
              initial="hidden"
              animate={headerInView ? "visible" : "hidden"}
              transition={{ delay: 0.17 }}
              className="lg:col-span-6 flex flex-col justify-end"
            >
              <p className="font-sans text-base md:text-body-lg text-charcoal-muted leading-relaxed max-w-xl">
                Our advisory board comprises eminent scholars, practitioners, and
                leaders who provide strategic counsel and institutional credibility
                to IKC Trust's mission across education, healthcare, environment,
                and governance.
              </p>
            </motion.div>
          </div>
        </div>

        {/* ── Empty ── */}
        {members.length === 0 && (
          <div className="grid grid-cols-1">
            <EmptyState />
          </div>
        )}

        {/* ── Featured card — full width row ── */}
        {featured && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <FeaturedAdvisoryCard member={featured} />
          </div>
        )}

        {/* ── Rest — 2-col grid ── */}
        {rest.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {rest.map((member, i) => (
              <AdvisoryCard key={member._id} member={member} index={i} />
            ))}
          </div>
        )}

        {/* ── Footer strip ── */}
        {members.length > 0 && (
          <div className="mt-16 pt-8 border-t border-sand-dark/40 flex items-center justify-between">
            <span className="text-[11px] font-sans uppercase tracking-[0.2em] text-charcoal-muted">
              {members.length} Advisory Board Member{members.length !== 1 ? "s" : ""}
            </span>
            <span className="text-[11px] font-sans uppercase tracking-[0.2em] text-forest font-semibold">
              Institutional Leadership · IKC Trust
            </span>
          </div>
        )}
      </div>
    </section>
  );
}
