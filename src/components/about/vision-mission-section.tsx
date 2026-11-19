"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

const values = [
  {
    num: "01",
    title: "Inclusion",
    body: "Equal opportunities and unconditional support for all communities without discrimination based on caste, creed, gender, or background.",
  },
  {
    num: "02",
    title: "Compassion",
    body: "Empathy, unconditional respect for human dignity, and mindful care for everyone's well-being in every medical camp and classroom.",
  },
  {
    num: "03",
    title: "Integrity",
    body: "Acting with uncompromising honesty, financial transparency, statutory disclosure, and public accountability at all operational levels.",
  },
  {
    num: "04",
    title: "Empowerment",
    body: "Helping individuals build actionable knowledge, academic confidence, and economic independence for self-sustained futures.",
  },
  {
    num: "05",
    title: "Sustainability",
    body: "Creating long-term positive ecological and social impact designed to endure and flourish for generations to come.",
  },
  {
    num: "06",
    title: "Collaboration",
    body: "Partnering with panchayats, educators, civic bodies, and community leaders to achieve meaningful community development.",
  },
];

export default function VisionMissionSection() {
  const vmRef = useRef<HTMLDivElement>(null);
  const vmInView = useInView(vmRef, { once: true, margin: "-80px" });

  const valuesRef = useRef<HTMLDivElement>(null);
  const valuesInView = useInView(valuesRef, { once: true, margin: "-80px" });

  return (
    <section id="vision-mission" className="w-full flex flex-col">

      {/* ── Forest-green monolith: Vision & Mission ── */}
      <div
        ref={vmRef}
        className="w-full bg-forest text-warm-white py-24 md:py-32 relative overflow-hidden"
      >
        {/* Background typographic watermark */}
        <div
          aria-hidden
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
        >
          <span className="font-serif text-[320px] leading-none text-warm-white/[0.03] font-normal tracking-tighter">
            IKC
          </span>
        </div>

        <div className="relative z-10 w-full px-6 md:px-12 lg:px-20">

          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={vmInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-14"
          >
            <span className="w-8 h-[2px] bg-terracotta flex-shrink-0" />
            <span className="text-xs font-sans uppercase tracking-[0.25em] text-terracotta font-semibold">
              Our Vision &amp; Mission
            </span>
          </motion.div>

          {/* Asymmetric two-panel layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-0 items-start">

            {/* Vision panel */}
            <motion.div
              variants={stagger}
              initial="hidden"
              animate={vmInView ? "visible" : "hidden"}
              className="lg:col-span-5 lg:pr-16"
            >
              <motion.span
                variants={fadeUp}
                className="text-[10px] font-sans uppercase tracking-[0.28em] text-sand/60 block mb-4"
              >
                Our Vision
              </motion.span>
              <motion.h2
                variants={fadeUp}
                className="font-serif text-4xl sm:text-5xl md:text-[52px] text-warm-white leading-[1.1] font-normal tracking-tight mb-6"
              >
                A Better Future
                <br />
                <span className="italic text-sand">for Everyone</span>
              </motion.h2>
              <motion.div
                variants={fadeUp}
                className="w-12 h-[2px] bg-terracotta mb-6"
              />
              <motion.p
                variants={fadeUp}
                className="font-sans text-base md:text-body-lg text-warm-white/80 leading-relaxed max-w-sm"
              >
                To build an inclusive society where everyone has access to
                essential care, education, and opportunities to live with
                dignity.
              </motion.p>

              <motion.div
                variants={fadeUp}
                className="mt-8 inline-flex items-center gap-3 border border-warm-white/20 px-4 py-3"
              >
                <span className="w-1.5 h-1.5 bg-terracotta flex-shrink-0" />
                <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-sand/70">
                  Dignity-Centred Charter
                </span>
              </motion.div>
            </motion.div>

            {/* Thin vertical divider */}
            <div
              aria-hidden
              className="hidden lg:flex lg:col-span-2 justify-center pt-8"
            >
              <div className="w-px h-56 bg-warm-white/15" />
            </div>

            {/* Horizontal rule for mobile */}
            <div aria-hidden className="lg:hidden w-20 h-px bg-warm-white/15" />

            {/* Mission panel */}
            <motion.div
              variants={stagger}
              initial="hidden"
              animate={vmInView ? "visible" : "hidden"}
              className="lg:col-span-5 lg:pl-16"
            >
              <motion.span
                variants={fadeUp}
                className="text-[10px] font-sans uppercase tracking-[0.28em] text-sand/60 block mb-4"
              >
                Our Mission
              </motion.span>
              <motion.h2
                variants={fadeUp}
                className="font-serif text-4xl sm:text-5xl md:text-[52px] text-warm-white leading-[1.1] font-normal tracking-tight mb-6"
              >
                Turning Care
                <br />
                <span className="italic text-sand">into Action</span>
              </motion.h2>
              <motion.div
                variants={fadeUp}
                className="w-12 h-[2px] bg-terracotta mb-6"
              />
              <motion.p
                variants={fadeUp}
                className="font-sans text-base md:text-body-lg text-warm-white/80 leading-relaxed max-w-sm"
              >
                To empower communities through accessible healthcare,
                educational opportunities, environmental responsibility, and
                meaningful collective action.
              </motion.p>

              <motion.div
                variants={fadeUp}
                className="mt-8 inline-flex items-center gap-3 border border-warm-white/20 px-4 py-3"
              >
                <span className="w-1.5 h-1.5 bg-terracotta flex-shrink-0" />
                <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-sand/70">
                  Grassroots Operational Strategy
                </span>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── Warm ivory stratum: Foundation Values ── */}
      <div
        ref={valuesRef}
        className="w-full bg-ivory py-24 md:py-32 border-b border-sand-dark/40"
      >
        <div className="w-full px-6 md:px-12 lg:px-20">

          {/* Section header */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={valuesInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-5"
            >
              <div className="flex items-center gap-3 mb-5">
                <span className="w-8 h-[2px] bg-terracotta flex-shrink-0" />
                <span className="text-xs font-sans uppercase tracking-[0.25em] text-terracotta font-semibold">
                  Core Principles
                </span>
              </div>
              <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl text-charcoal font-normal leading-[1.15]">
                What Guides Us
                <span className="block italic text-forest mt-1">
                  Our Foundation Values
                </span>
              </h3>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={valuesInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              className="lg:col-span-7 flex items-end"
            >
              <p className="font-sans text-base md:text-body-lg text-charcoal-muted leading-relaxed max-w-xl">
                Six institutional principles that shape every field programme,
                community engagement, and governance decision we make.
              </p>
            </motion.div>
          </div>

          {/* Two-column editorial value layout — no cards */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate={valuesInView ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-0"
          >
            {values.map((v, i) => (
              <motion.div
                key={v.num}
                variants={fadeUp}
                className={`py-8 border-t border-sand-dark/60 ${
                  /* right column items — add left border on md+ for visual separation */
                  i % 2 === 1
                    ? "md:pl-10 md:border-l md:border-sand-dark/40"
                    : ""
                }`}
              >
                <div className="flex items-baseline justify-between mb-4">
                  <span className="font-serif text-[42px] leading-none text-terracotta/60 font-normal">
                    {v.num}
                  </span>
                  <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-charcoal-muted">
                    Pillar {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h4 className="font-serif text-headline-md text-charcoal mb-2">
                  {v.title}
                </h4>
                <p className="font-sans text-body-md text-charcoal-muted leading-relaxed">
                  {v.body}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
