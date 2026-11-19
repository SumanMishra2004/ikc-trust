"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import { GraduationCap, Building2, HeartPulse, Users } from "lucide-react";
import { partnerships } from "@/data/homepage";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  GraduationCap,
  Building2,
  HeartPulse,
  Users,
};

export default function PartnershipsSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="partnerships"
      ref={ref}
      className="w-full bg-sand/40 py-24 md:py-32 border-b border-sand-dark/50"
    >
      <div className="w-full px-6 md:px-12 lg:px-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mx-auto text-center space-y-4 mb-16"
        >
          <div className="inline-flex items-center gap-3 justify-center">
            <span className="w-6 h-[1.5px] bg-terracotta" />
            <span className="text-xs font-sans uppercase tracking-[0.25em] text-terracotta font-semibold">
              Institutional Synergy
            </span>
            <span className="w-6 h-[1.5px] bg-terracotta" />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-charcoal font-normal">
            Progress is stronger when we work together.
          </h2>
          <p className="font-sans text-base text-charcoal-muted leading-relaxed">
            The complex challenges of rural poverty and systemic neglect cannot
            be tackled in isolation. We actively partner with academic
            institutions, state medical boards, CSR foundations, and dedicated
            individuals to build sustained social capital.
          </p>
        </motion.div>

        {/* Partner Archetypes Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {partnerships.map((partner, i) => {
            const Icon = iconMap[partner.icon];
            return (
              <motion.div
                key={partner.title}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1],
                  delay: 0.1 + i * 0.08,
                }}
                className="bg-warm-white p-8 border border-sand-dark space-y-4 hover:border-forest transition-colors group"
              >
                <div className="w-12 h-12 bg-ivory text-forest flex items-center justify-center border border-sand-dark group-hover:bg-forest group-hover:text-warm-white transition-colors">
                  {Icon && <Icon size={22} />}
                </div>
                <h3 className="font-serif text-2xl text-charcoal">
                  {partner.title}
                </h3>
                <p className="font-sans text-sm text-charcoal-muted leading-relaxed">
                  {partner.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <Link
            href="#contact"
            className="inline-block px-8 py-4 bg-forest text-warm-white text-xs font-sans uppercase tracking-[0.2em] font-semibold hover:bg-terracotta transition-colors shadow-sm"
          >
            Initiate Institutional Dialogue
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
