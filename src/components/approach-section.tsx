"use client";

import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import { approachStages } from "@/data/homepage";

export default function ApproachSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="our-approach"
      ref={ref}
      className="w-full bg-forest text-warm-white py-24 md:py-32 relative overflow-hidden"
    >
      {/* Subtle texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(248,245,237,1) 39px, rgba(248,245,237,1) 40px)",
        }}
      />

      <div className="w-full px-6 md:px-12 lg:px-20 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mb-16 space-y-4"
        >
          <div className="flex items-center gap-3">
            <span className="w-8 h-[2px] bg-terracotta flex-shrink-0" />
            <span className="text-xs font-sans uppercase tracking-[0.25em] text-sand font-medium">
              Our Operational Framework
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-warm-white font-normal leading-tight">
            From understanding community needs to creating lasting impact.
          </h2>
          <p className="font-sans text-base text-sand/80 font-light leading-relaxed">
            A five-stage rigorous operational methodology guaranteeing that our
            interventions respect local autonomy while delivering enduring
            systemic upliftment.
          </p>
        </motion.div>

        {/* 5 Stage Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 relative">
          {/* Connecting Line — desktop only */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            style={{ transformOrigin: "left" }}
            className="hidden lg:block absolute top-12 left-6 right-6 h-[1px] bg-sand/20 z-0"
          />

          {approachStages.map((stage, i) => (
            <motion.div
              key={stage.number}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.65,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.1 + i * 0.1,
              }}
              className="bg-forest-dark/80 p-8 border border-sand/20 relative z-10 group hover:border-terracotta transition-colors flex flex-col"
            >
              {/* Stage Number Circle */}
              <div className="w-12 h-12 bg-forest text-sand border border-sand/40 flex items-center justify-center font-serif text-xl mb-6 group-hover:bg-terracotta group-hover:text-warm-white group-hover:border-terracotta transition-colors flex-shrink-0">
                {stage.number}
              </div>

              <span className="text-[11px] font-sans uppercase tracking-[0.2em] text-sand block mb-1">
                {stage.stage}
              </span>
              <h3 className="font-serif text-2xl text-warm-white mb-3">
                {stage.title}
              </h3>
              <p className="font-sans text-sm text-sand/80 leading-relaxed font-light">
                {stage.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
