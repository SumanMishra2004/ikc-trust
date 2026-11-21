"use client";

/**
 * TeamSection
 * ───────────
 * Layout: masonry-style asymmetric grid.
 * First member (leader) → large 2-col card, image left 2:3, details right.
 * Remaining members    → uniform portrait cards, 2:3 image on top, text below.
 *
 * Image strategy:
 *   - next/image with explicit width + height (NOT fill).
 *   - Sanity fit("fill") pads any non-2:3 source to exactly 2:3 with ivory bg.
 *   - Zero object-cover / object-contain ambiguity — image IS the container.
 */

import Image from "next/image";
import { useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { Linkedin, Mail } from "lucide-react";
import { urlFor } from "@/sanity/image";
import type { TeamMember } from "@/types/people";

export type { TeamMember };

// ─── animations ────────────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: (i % 4) * 0.07 },
  }),
};

// ─── small social pill ─────────────────────────────────────────────────────

function SocialPill({ member }: { member: TeamMember }) {
  if (!member.linkedin && !member.email) return null;
  return (
    <div className="flex items-center gap-2 mt-3">
      {member.linkedin && (
        <a
          href={member.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="w-7 h-7 border border-sand-dark flex items-center justify-center
                     text-charcoal-muted hover:bg-forest hover:text-warm-white hover:border-forest
                     transition-colors duration-200"
        >
          <Linkedin size={12} />
        </a>
      )}
      {member.email && (
        <a
          href={`mailto:${member.email}`}
          aria-label="Email"
          className="w-7 h-7 border border-sand-dark flex items-center justify-center
                     text-charcoal-muted hover:bg-terracotta hover:text-warm-white hover:border-terracotta
                     transition-colors duration-200"
        >
          <Mail size={12} />
        </a>
      )}
    </div>
  );
}

// ─── featured leader card (first member) ──────────────────────────────────
// Wide card: 2:3 photo on the left, bio on the right.

function LeaderCard({ member }: { member: TeamMember }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  // 2:3 → 480 × 720
  const src = urlFor(member.photo.asset)
    .width(480).height(720)
    .fit("fill").bg("F8F5ED")
    .auto("format").quality(90)
    .url();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="mb-10 flex flex-col sm:flex-row bg-warm-white border border-sand-dark
                 hover:shadow-[0_8px_36px_rgba(36,75,60,0.11)] transition-shadow duration-300 group"
    >
      {/* photo — 2:3, never cropped */}
      <div className="flex-shrink-0 overflow-hidden bg-[#F8F5ED]">
        <Image
          src={src}
          alt={member.name}
          width={480}
          height={720}
          priority
          sizes="(max-width: 640px) 100vw, 480px"
          className="w-full sm:w-[220px] md:w-[260px] lg:w-[300px] xl:w-[340px] h-auto block"
          placeholder={member.photo.lqip ? "blur" : "empty"}
          blurDataURL={member.photo.lqip ?? undefined}
        />
      </div>

      {/* details */}
      <div className="flex-1 p-7 md:p-10 flex flex-col justify-between
                      border-t sm:border-t-0 sm:border-l border-sand-dark">
        <div>
          {/* eyebrow */}
          <div className="flex items-center gap-2 mb-4">
            <span className="w-5 h-[2px] bg-terracotta flex-shrink-0" />
            <span className="text-[10px] font-sans uppercase tracking-[0.24em] text-terracotta font-semibold">
              {member.position}
            </span>
          </div>
          {/* name */}
          <h3 className="font-serif text-3xl sm:text-4xl text-charcoal leading-[1.1]
                         font-normal tracking-tight mb-3
                         group-hover:text-forest transition-colors duration-200">
            {member.name}
          </h3>
          <div className="w-10 h-[2px] bg-terracotta/40 mb-4" />
          {/* affiliation */}
          <p className="font-sans text-body-md text-charcoal-muted leading-relaxed max-w-sm">
            {member.affiliation}
          </p>
        </div>

        {/* social + label footer */}
        <div className="mt-8 pt-5 border-t border-sand-dark/40 flex items-end justify-between gap-4">
          <SocialPill member={member} />
          <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-charcoal-muted/40">
            IKC Trust
          </span>
        </div>
      </div>
    </motion.div>
  );
}

// ─── standard portrait card ────────────────────────────────────────────────
// Image is the top element, exactly 2:3. Text block below.

function MemberCard({ member, index }: { member: TeamMember; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [hovered, setHovered] = useState(false);

  // 2:3 → 360 × 540
  const src = urlFor(member.photo.asset)
    .width(360).height(540)
    .fit("fill").bg("F8F5ED")
    .auto("format").quality(85)
    .url();

  return (
    <motion.div
      ref={ref}
      custom={index}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group flex flex-col bg-warm-white border border-sand-dark
                 hover:shadow-[0_6px_24px_rgba(36,75,60,0.1)] transition-shadow duration-300"
    >
      {/* ── 2:3 photo — the entire image is always rendered ── */}
      <div className="relative overflow-hidden bg-[#F8F5ED] flex-shrink-0">
        <Image
          src={src}
          alt={member.name}
          width={360}
          height={540}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="w-full h-auto block"
          placeholder={member.photo.lqip ? "blur" : "empty"}
          blurDataURL={member.photo.lqip ?? undefined}
        />

        {/* position badge — slides up from bottom on hover */}
        <div
          className={`absolute bottom-0 left-0 right-0 px-4 py-3
                      bg-gradient-to-t from-charcoal/85 via-charcoal/40 to-transparent
                      transition-opacity duration-300 ${hovered ? "opacity-100" : "opacity-0"}`}
        >
          <span className="text-[9px] font-sans uppercase tracking-[0.22em]
                           text-terracotta font-semibold leading-none block">
            {member.position}
          </span>
        </div>
      </div>

      {/* ── text block ── */}
      <div className="p-4 md:p-5 border-t border-sand-dark/50">
        <h3 className="font-serif text-[17px] sm:text-[18px] text-charcoal leading-snug
                       group-hover:text-forest transition-colors duration-200">
          {member.name}
        </h3>
        <div className="w-6 h-[2px] bg-terracotta/40 my-2" />
        <p className="font-sans text-[12px] text-charcoal-muted leading-relaxed line-clamp-2">
          {member.affiliation}
        </p>
        <SocialPill member={member} />
      </div>
    </motion.div>
  );
}

// ─── empty state ───────────────────────────────────────────────────────────

function EmptyState() {
  return (
    <div className="col-span-full py-20 text-center border border-sand-dark/40">
      <span className="font-sans text-[11px] uppercase tracking-[0.2em] text-charcoal-muted/40">
        No team members published yet
      </span>
      <p className="mt-2 font-serif text-sm italic text-charcoal-muted/40">
        Add team members in Sanity Studio.
      </p>
    </div>
  );
}

// ─── section ───────────────────────────────────────────────────────────────

interface Props { members: TeamMember[] }

export default function TeamSection({ members }: Props) {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-60px" });

  const [leader, ...rest] = members;

  return (
    <section className="w-full bg-ivory py-24 md:py-32 border-b border-sand-dark/40">
      <div className="w-full px-6 md:px-12 lg:px-20">

        {/* ── header ── */}
        <div ref={headerRef}>
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={headerInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-8"
          >
            <span className="w-8 h-[2px] bg-terracotta flex-shrink-0" />
            <span className="text-xs font-sans uppercase tracking-[0.25em] text-terracotta font-semibold">
              The People Behind the Mission
            </span>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 mb-16 pb-12
                          border-b border-sand-dark/40">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.08 }}
              className="lg:col-span-6"
            >
              <h2 className="font-serif text-4xl sm:text-5xl md:text-[52px] text-charcoal
                             leading-[1.1] font-normal tracking-tight">
                Our Team.{" "}
                <span className="italic text-forest">Driven by Purpose.</span>
              </h2>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.17 }}
              className="lg:col-span-6 flex flex-col justify-end"
            >
              <p className="font-sans text-base md:text-body-lg text-charcoal-muted
                            leading-relaxed max-w-xl">
                A collective of dedicated professionals, practitioners, and change-makers
                committed to building stronger communities across West Bengal through
                care, knowledge, and action.
              </p>
            </motion.div>
          </div>
        </div>

        {/* ── empty ── */}
        {members.length === 0 && <EmptyState />}

        {/* ── leader — full-width horizontal card ── */}
        {leader && <LeaderCard member={leader} />}

        {/* ── rest — responsive portrait grid ── */}
        {rest.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6">
            {rest.map((m, i) => (
              <MemberCard key={m._id} member={m} index={i + 1} />
            ))}
          </div>
        )}

        {/* ── footer ── */}
        {members.length > 0 && (
          <div className="mt-16 pt-8 border-t border-sand-dark/40 flex items-center justify-between">
            <span className="text-[11px] font-sans uppercase tracking-[0.2em] text-charcoal-muted">
              {members.length} Core Team Member{members.length !== 1 ? "s" : ""}
            </span>
            <span className="text-[11px] font-sans uppercase tracking-[0.2em] text-forest font-semibold">
              Kolkata, West Bengal
            </span>
          </div>
        )}

      </div>
    </section>
  );
}
