"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Mic, FileText, Users, BookOpen } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1], delay },
  }),
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut", delay },
  }),
};

const pillars = [
  { icon: Mic,      label: "Keynotes",      desc: "Expert speakers & thought leaders" },
  { icon: FileText, label: "Papers",        desc: "Research & academic presentations" },
  { icon: Users,    label: "Networking",    desc: "Community & professional connections" },
  { icon: BookOpen, label: "Abstract Book", desc: "Published research compilation" },
];

export default function ConferenceHero() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <section ref={ref} className="w-full bg-ivory">

      <div className="w-full bg-forest-dark">
        <div className="w-full px-6 md:px-12 lg:px-20 pt-32 pb-16 md:pt-40 md:pb-20">

          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="flex items-center gap-3 mb-8"
          >
            <span className="w-8 h-px bg-terracotta flex-shrink-0" />
            <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-terracotta font-semibold">
              IKC Trust · Our Initiatives
            </span>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-end">
            <div className="lg:col-span-7">
              <motion.h1
                custom={0.1}
                variants={fadeUp}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                className="font-serif font-normal leading-[1.05] tracking-tight"
              >
                <span className="block text-[42px] sm:text-[52px] md:text-[62px] lg:text-[70px] text-warm-white">
                  Conference
                </span>
                <span className="block text-[42px] sm:text-[52px] md:text-[62px] lg:text-[70px] text-terracotta italic mt-1">
                  &amp; Dialogue
                </span>
              </motion.h1>
              <motion.div
                custom={0.22}
                variants={fadeUp}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                className="w-20 h-[3px] bg-terracotta mt-7"
              />
            </div>

            <div className="lg:col-span-5 lg:pb-2 space-y-6">
              <motion.p
                custom={0.28}
                variants={fadeUp}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                className="font-sans text-base md:text-[17px] text-warm-white/70 leading-[1.75]"
              >
                Academic and community conferences organised by IKC Trust —
                bringing together researchers, practitioners, and community
                leaders to exchange knowledge and drive impact.
              </motion.p>

              <motion.div
                custom={0.36}
                variants={fadeUp}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                className="flex items-start gap-8 pt-2 border-t border-warm-white/10"
              >
                <div>
                  <span className="font-serif text-3xl text-terracotta block leading-none">∞</span>
                  <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-warm-white/50 mt-1 block">Ideas shared</span>
                </div>
                <div>
                  <span className="font-serif text-3xl text-terracotta block leading-none">∞</span>
                  <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-warm-white/50 mt-1 block">Connections made</span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full bg-sand border-b border-sand-dark">
        <div className="w-full px-6 md:px-12 lg:px-20">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-sand-dark">
            {pillars.map((pillar, i) => {
              const Icon = pillar.icon;
              return (
                <motion.div
                  key={pillar.label}
                  custom={0.1 + i * 0.08}
                  variants={fadeUp}
                  initial="hidden"
                  animate={inView ? "visible" : "hidden"}
                  className="flex items-start gap-3 py-6 px-5 first:pl-0 last:pr-0"
                >
                  <div className="mt-0.5 flex-shrink-0 w-7 h-7 bg-forest/10 flex items-center justify-center">
                    <Icon size={14} className="text-forest" />
                  </div>
                  <div>
                    <span className="font-sans text-[11px] uppercase tracking-[0.18em] text-forest font-semibold block leading-tight">{pillar.label}</span>
                    <span className="font-sans text-[12px] text-charcoal-muted mt-0.5 block leading-snug">{pillar.desc}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      <motion.div
        custom={0.5}
        variants={fadeIn}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="w-full bg-ivory border-b border-sand-dark/50 px-6 md:px-12 lg:px-20 py-5 flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <span className="w-6 h-px bg-terracotta flex-shrink-0" />
          <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-charcoal-muted font-semibold">
            All Conferences · Chronological
          </span>
        </div>
        <span className="hidden sm:block font-sans text-[10px] uppercase tracking-[0.2em] text-charcoal-muted/50">
          Scroll to explore ↓
        </span>
      </motion.div>

    </section>
  );
}
