"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Linkedin, Mail } from "lucide-react";
import { urlFor } from "@/sanity/image";
import type { TeamMember } from "@/types/people";

export type { TeamMember };

// ── Animations ─────────────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: (i % 3) * 0.09 },
  }),
};

const headerFade = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

// ── Card ───────────────────────────────────────────────────────────────────

function TeamCard({ member, index }: { member: TeamMember; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const photoSrc = urlFor(member.photo.asset)
    .width(600)
    .height(720)
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
      {/* ── Photo ── */}
      <div className="relative h-72 w-full overflow-hidden bg-sand flex-shrink-0">
        <Image
          src={photoSrc}
          alt={`${member.name} — ${member.position}`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
          placeholder={member.photo.lqip ? "blur" : "empty"}
          blurDataURL={member.photo.lqip}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        {/* Social links — slide up on hover */}
        <div className="absolute bottom-0 left-0 right-0 p-4 flex items-center gap-3 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          {member.linkedin && (
            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${member.name} on LinkedIn`}
              className="w-8 h-8 bg-warm-white/90 flex items-center justify-center hover:bg-forest hover:text-warm-white transition-colors text-charcoal"
            >
              <Linkedin size={14} />
            </a>
          )}
          {member.email && (
            <a
              href={`mailto:${member.email}`}
              aria-label={`Email ${member.name}`}
              className="w-8 h-8 bg-warm-white/90 flex items-center justify-center hover:bg-terracotta hover:text-warm-white transition-colors text-charcoal"
            >
              <Mail size={14} />
            </a>
          )}
        </div>
      </div>

      {/* ── Content ── */}
      <div className="p-6 flex flex-col flex-1 border-t border-sand-dark/60">
        <span className="text-[10px] font-sans uppercase tracking-[0.22em] text-terracotta font-semibold mb-1 block">
          {member.position}
        </span>
        <h3 className="font-serif text-xl text-charcoal leading-snug mb-2 group-hover:text-forest transition-colors duration-200">
          {member.name}
        </h3>
        <div className="w-8 h-[2px] bg-terracotta/40 mb-3" />
        <p className="font-sans text-body-sm text-charcoal-muted leading-relaxed mt-auto">
          {member.affiliation}
        </p>
      </div>
    </motion.div>
  );
}

// ── Empty state ────────────────────────────────────────────────────────────

function EmptyState() {
  return (
    <div className="col-span-full py-20 text-center">
      <span className="font-sans text-[11px] uppercase tracking-[0.2em] text-charcoal-muted/40">
        No team members published yet
      </span>
      <p className="mt-2 font-serif text-sm italic text-charcoal-muted/40">
        Add team members in Sanity Studio to populate this page.
      </p>
    </div>
  );
}

// ── Section ────────────────────────────────────────────────────────────────

interface Props {
  members: TeamMember[];
}

export default function TeamSection({ members }: Props) {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-60px" });

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
              The People Behind the Mission
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
                Our Team.{" "}
                <span className="italic text-forest">Driven by Purpose.</span>
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
                The IKC Trust team is a collective of dedicated professionals,
                practitioners, and change-makers committed to building stronger
                communities across West Bengal through care, knowledge, and action.
              </p>
            </motion.div>
          </div>
        </div>

        {/* ── Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {members.length === 0 ? (
            <EmptyState />
          ) : (
            members.map((member, i) => (
              <TeamCard key={member._id} member={member} index={i} />
            ))
          )}
        </div>

        {/* ── Footer strip ── */}
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
