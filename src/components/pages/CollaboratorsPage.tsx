"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Users } from "lucide-react";
import type { Collaborator } from "@/types/collaborator";

// ─── helpers ─────────────────────────────────────────────────────────────────

function formatDate(raw: string) {
  return new Date(raw + "T00:00:00").toLocaleDateString("en-IN", {
    year: "numeric", month: "long", day: "numeric",
  });
}

function buildImageUrl(asset: Collaborator["image"]["asset"]): string {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { urlFor } = require("@/sanity/image");
    return urlFor(asset).width(600).height(600).fit("crop").auto("format").quality(85).url();
  } catch {
    return "";
  }
}

// ─── Single card ──────────────────────────────────────────────────────────────

function CollaboratorCard({
  item,
  index,
}: {
  item: Collaborator;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const src = buildImageUrl(item.image.asset);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1],
        delay: (index % 4) * 0.08,
      }}
      className="group relative overflow-hidden bg-[#F8F5ED] border border-[#D9D2C5]
                 hover:border-[#244B3C]/30 hover:shadow-[0_4px_24px_rgba(36,75,60,0.10)]
                 transition-all duration-300"
    >
      {/* Image */}
      <div className="relative w-full aspect-square overflow-hidden bg-[#E9E0D1]">
        <div className="absolute inset-2 overflow-hidden">
        {src ? (
          <Image
            src={src}
            alt={item.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            placeholder={item.image.lqip ? "blur" : "empty"}
            blurDataURL={item.image.lqip ?? undefined}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Users size={28} className="text-[#D9D2C5]" />
          </div>
        )}
        </div>{/* end inner padded image wrapper */}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1B3A2D]/60 via-transparent to-transparent
                        opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Top-left terracotta corner accent */}
        <div className="absolute top-0 left-0 w-6 h-[2.5px] bg-[#B9674B]" />
        <div className="absolute top-0 left-0 w-[2.5px] h-6 bg-[#B9674B]" />
      </div>

      {/* Text */}
      <div className="px-5 py-4 border-t border-[#D9D2C5]/60">
        {/* Date */}
        <span className="font-sans text-[10px] uppercase tracking-[0.22em] text-[#B9674B] font-semibold block mb-1.5">
          {formatDate(item.date)}
        </span>
        {/* Title */}
        <h3 className="font-serif text-[16px] sm:text-[17px] text-[#292B27] leading-snug
                       group-hover:text-[#244B3C] transition-colors duration-200">
          {item.title}
        </h3>
      </div>
    </motion.div>
  );
}

// ─── Empty state ──────────────────────────────────────────────────────────────

function EmptyState() {
  return (
    <div className="border border-[#D9D2C5] bg-[#F8F5ED] p-16 text-center">
      <Users size={28} className="text-[#D9D2C5] mx-auto mb-4" />
      <p className="font-serif text-lg text-[#5C5E57]">No collaborators published yet.</p>
      <p className="font-sans text-[11px] text-[#5C5E57]/60 mt-2 uppercase tracking-widest">
        Add entries in Sanity Studio → Collaborators
      </p>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function CollaboratorsPage({
  collaborators,
}: {
  collaborators: Collaborator[];
}) {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true });
  const bodyRef = useRef<HTMLDivElement>(null);
  const bodyInView = useInView(bodyRef, { once: true, margin: "-60px" });

  const total = collaborators.length;

  return (
    <>
      {/* ── Hero ── */}
      <div className="w-full bg-[#292B27] pt-36 pb-20 md:pt-44 md:pb-24 relative overflow-hidden">
        {/* Background hex pattern */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.05] pointer-events-none" aria-hidden>
          <defs>
            <pattern id="col-hex" x="0" y="0" width="50" height="44" patternUnits="userSpaceOnUse">
              <path d="M25 2 L48 15 L48 29 L25 42 L2 29 L2 15 Z"
                stroke="white" strokeWidth="0.5" fill="none"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#col-hex)"/>
        </svg>

        <div ref={heroRef} className="relative z-10 w-full px-6 md:px-12 lg:px-20">
          <motion.div
            initial={{ opacity: 0, x: -16 }} animate={heroInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }} className="flex items-center gap-3 mb-6"
          >
            <span className="w-8 h-[2px] bg-[#B9674B]" />
            <span className="text-[10px] font-sans uppercase tracking-[0.28em] text-[#B9674B] font-semibold">
              IKC Trust · Ground Network
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }} animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
            className="font-serif text-5xl sm:text-6xl md:text-[72px] text-white leading-[1.05]
                       font-normal tracking-tight max-w-3xl mb-5"
          >
            Our <span className="italic text-[#E9E0D1]">Collaborators</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.18 }}
            className="font-sans text-base md:text-[18px] text-[#E9E0D1]/65 max-w-2xl leading-relaxed"
          >
            Organisations and community bodies working alongside IKC Trust
            to deliver ground-level impact across West Bengal.
          </motion.p>

          {total > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 12 }} animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.28 }}
              className="mt-8 pt-6 border-t border-white/10 flex items-center gap-3"
            >
              <span className="font-serif text-4xl text-[#B9674B] leading-none">{total}</span>
              <span className="font-sans text-[10px] uppercase tracking-[0.22em] text-white/50">
                Collaboration{total !== 1 ? "s" : ""} on record
              </span>
            </motion.div>
          )}
        </div>
      </div>

      {/* ── Grid ── */}
      <div className="w-full bg-[#FFFDF8] py-20 md:py-28">
        <div ref={bodyRef} className="w-full px-6 md:px-12 lg:px-20">

          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, x: -16 }} animate={bodyInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }} className="flex items-center gap-3 mb-12"
          >
            <span className="w-8 h-[2px] bg-[#B9674B] flex-shrink-0" />
            <span className="font-sans text-[11px] uppercase tracking-[0.24em] text-[#5C5E57] font-semibold">
              All Collaborations
            </span>
          </motion.div>

          {total === 0 ? (
            <EmptyState />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6">
              {collaborators.map((item, i) => (
                <CollaboratorCard key={item._id} item={item} index={i} />
              ))}
            </div>
          )}

          {/* Footer */}
          {total > 0 && (
            <motion.div
              initial={{ opacity: 0 }} animate={bodyInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-14 pt-8 border-t border-[#D9D2C5]/60 flex items-center justify-between flex-wrap gap-4"
            >
              <span className="font-sans text-[11px] uppercase tracking-[0.2em] text-[#5C5E57]">
                {total} Collaboration{total !== 1 ? "s" : ""}
              </span>
              <span className="font-sans text-[11px] uppercase tracking-[0.2em] text-[#244B3C] font-semibold">
                IKC Trust · West Bengal
              </span>
            </motion.div>
          )}

        </div>
      </div>
    </>
  );
}
