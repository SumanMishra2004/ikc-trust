"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Trophy } from "lucide-react";

export default function AwardsPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true });
  const bodyRef = useRef<HTMLDivElement>(null);
  const bodyInView = useInView(bodyRef, { once: true, margin: "-60px" });

  return (
    <>
      {/* ── Hero ── */}
      <div className="w-full bg-[#1B3A2D] pt-36 pb-20 md:pt-44 md:pb-24 relative overflow-hidden">
        <svg className="absolute inset-0 w-full h-full opacity-[0.04] pointer-events-none" aria-hidden>
          <defs>
            <pattern id="award-grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M40 0 L0 0 0 40" fill="none" stroke="white" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#award-grid)"/>
        </svg>

        <div ref={heroRef} className="relative z-10 w-full px-6 md:px-12 lg:px-20">
          <motion.div
            initial={{ opacity: 0, x: -16 }} animate={heroInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }} className="flex items-center gap-3 mb-6"
          >
            <span className="w-8 h-[2px] bg-[#B9674B]" />
            <span className="text-[10px] font-sans uppercase tracking-[0.28em] text-[#B9674B] font-semibold">
              IKC Trust · Recognition
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }} animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
            className="font-serif text-5xl sm:text-6xl md:text-[72px] text-white leading-[1.05] font-normal tracking-tight max-w-3xl mb-5"
          >
            Awards &amp;{" "}
            <span className="italic text-[#E9E0D1]">Recognition</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.18 }}
            className="font-sans text-base md:text-[18px] text-[#E9E0D1]/65 max-w-2xl leading-relaxed"
          >
            Honours and recognitions received for our work across West Bengal.
          </motion.p>
        </div>
      </div>

      {/* ── Coming Soon body ── */}
      <div className="w-full bg-[#FFFDF8] py-28 md:py-36">
        <div ref={bodyRef} className="w-full px-6 md:px-12 lg:px-20 flex flex-col items-center text-center">

          <motion.div
            initial={{ opacity: 0, y: 24 }} animate={bodyInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center gap-6 max-w-md"
          >
            {/* Icon */}
            <div className="w-16 h-16 bg-[#1B3A2D] flex items-center justify-center">
              <Trophy size={28} className="text-[#B9674B]" />
            </div>

            {/* Accent rule */}
            <div className="w-12 h-[2px] bg-[#B9674B]" />

            {/* Heading */}
            <h2 className="font-serif text-3xl sm:text-4xl text-[#292B27] font-normal leading-tight">
              Coming Soon
            </h2>

            {/* Body */}
            <p className="font-sans text-base text-[#5C5E57] leading-relaxed">
              This section is currently being prepared. Awards and recognitions
              received by IKC Trust will be published here shortly.
            </p>

            {/* Bottom rule */}
            <div className="flex items-center gap-4 w-full pt-4">
              <span className="flex-1 h-px bg-[#D9D2C5]" />
              <span className="w-1.5 h-1.5 bg-[#B9674B]/50" />
              <span className="flex-1 h-px bg-[#D9D2C5]" />
            </div>

            <span className="font-sans text-[10px] uppercase tracking-[0.22em] text-[#5C5E57]/50">
              IKC Trust · Kolkata, West Bengal
            </span>
          </motion.div>

        </div>
      </div>
    </>
  );
}
