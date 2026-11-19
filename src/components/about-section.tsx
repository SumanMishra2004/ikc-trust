"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import { about } from "@/data/homepage";

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
};

export default function AboutSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="about-trust"
      ref={ref}
      className="w-full bg-ivory py-24 md:py-32 border-b border-sand-dark/40"
    >
      <div className="w-full px-6 md:px-12 lg:px-20">
        {/* Section Tag */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-6"
        >
          <span className="w-8 h-[2px] bg-terracotta flex-shrink-0" />
          <span className="text-xs font-sans uppercase tracking-[0.25em] text-terracotta font-semibold">
            {about.sectionTag}
          </span>
        </motion.div>

        {/* Asymmetrical Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left: Editorial Typography */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="lg:col-span-6 space-y-8"
          >
            <motion.h2
              variants={fadeUp}
              className="font-serif text-3xl sm:text-4xl md:text-5xl text-charcoal leading-[1.15] font-normal"
            >
              {about.headlinePart1}{" "}
              <span className="italic text-forest block mt-2">
                {about.headlinePart2}
              </span>
            </motion.h2>

            <motion.div
              variants={fadeUp}
              className="w-20 h-[2px] bg-terracotta/60"
            />

            <motion.p
              variants={fadeUp}
              className="font-serif text-xl sm:text-2xl text-charcoal/90 leading-relaxed font-light"
            >
              {about.leadText}
            </motion.p>

            <motion.p
              variants={fadeUp}
              className="font-sans text-base text-charcoal-muted leading-relaxed"
            >
              {about.bodyText}
            </motion.p>

            {/* Core Pledge Quote Card */}
            <motion.div
              variants={fadeUp}
              className="p-8 bg-sand/40 border-l-4 border-forest relative"
            >
              <span className="text-[11px] font-sans uppercase tracking-[0.25em] text-terracotta block mb-2 font-semibold">
                {about.quote.label}
              </span>
              <blockquote className="font-serif text-xl sm:text-2xl italic text-charcoal leading-snug">
                {about.quote.text}
              </blockquote>
              <span className="text-xs uppercase tracking-widest text-charcoal-light mt-3 block font-medium">
                {about.quote.attribution}
              </span>
            </motion.div>

            {/* Compliance Matrix */}
            <motion.div
              variants={fadeUp}
              className="grid grid-cols-2 gap-6 pt-4"
            >
              {about.credentials.map((cred) => (
                <div key={cred.label} className="border-t border-sand-dark pt-4">
                  <span className="font-serif text-3xl text-forest font-medium block">
                    {cred.value}
                  </span>
                  <span className="text-xs uppercase tracking-widest text-charcoal font-semibold block mt-1">
                    {cred.label}
                  </span>
                  <p className="text-xs text-charcoal-muted mt-1 leading-normal">
                    {cred.description}
                  </p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: Documentary Feature Frame */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="lg:col-span-6 space-y-6"
          >
            <div className="relative bg-warm-white p-4 shadow-xl border border-sand-dark/60">
              <div className="aspect-[4/3] w-full overflow-hidden relative">
                <Image
                  src={about.image.url}
                  alt={about.image.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-charcoal/80 text-warm-white px-3 py-1 text-[11px] uppercase tracking-widest backdrop-blur-sm font-sans z-10">
                  {about.image.badge}
                </div>
              </div>
              <div className="p-6 bg-sand/30 mt-4 border-t border-sand-dark/40">
                <div className="flex justify-between items-center text-xs uppercase tracking-widest text-charcoal-muted mb-2">
                  <span>{about.image.seriesLabel}</span>
                  <span className="text-terracotta font-bold">
                    {about.image.auditYear}
                  </span>
                </div>
                <p className="font-sans text-sm text-charcoal-light leading-relaxed">
                  {about.image.caption}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
