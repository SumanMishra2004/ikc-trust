"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import { ArrowRight, MapPin, Phone, Mail } from "lucide-react";
import { getInvolved, siteConfig } from "@/data/homepage";

export default function GetInvolved() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="contact"
      ref={ref}
      className="w-full bg-forest text-warm-white py-24 md:py-32 relative overflow-hidden"
    >
      {/* Subtle grid texture */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, transparent, transparent 79px, rgba(248,245,237,1) 79px, rgba(248,245,237,1) 80px), repeating-linear-gradient(0deg, transparent, transparent 79px, rgba(248,245,237,1) 79px, rgba(248,245,237,1) 80px)",
        }}
      />

      <div className="w-full px-6 md:px-12 lg:px-20 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="max-w-3xl space-y-4 mb-16"
        >
          <div className="flex items-center gap-3">
            <span className="w-8 h-[2px] bg-terracotta flex-shrink-0" />
            <span className="text-xs font-sans uppercase tracking-[0.25em] text-sand font-medium">
              {getInvolved.sectionTag}
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-warm-white font-normal leading-tight">
            {getInvolved.headline}
          </h2>
          <p className="font-sans text-base text-sand/80 font-light leading-relaxed">
            {getInvolved.body}
          </p>
        </motion.div>

        {/* Three Pathways */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {getInvolved.pathways.map((pathway, i) => (
            <motion.div
              key={pathway.number}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.65,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.1 + i * 0.1,
              }}
              className="bg-forest-dark/80 p-8 border border-sand/20 flex flex-col justify-between space-y-6 hover:border-terracotta transition-colors group"
            >
              <div className="space-y-3">
                <span className="text-[11px] font-sans uppercase tracking-widest text-sand block">
                  {pathway.number}
                </span>
                <h3 className="font-serif text-2xl text-warm-white">
                  {pathway.title}
                </h3>
                <p className="font-sans text-sm text-sand/80 leading-relaxed font-light">
                  {pathway.description}
                </p>
              </div>
              <Link
                href={pathway.href}
                className="text-xs font-sans uppercase tracking-[0.2em] text-sand font-semibold inline-flex items-center gap-2 hover:text-terracotta transition-colors group-hover:gap-3"
              >
                {pathway.cta} <ArrowRight size={14} />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Quick Contact Bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 pt-8 border-t border-sand/20 flex flex-col sm:flex-row items-start sm:items-center justify-between text-sand text-xs font-sans uppercase tracking-widest gap-4"
        >
          <div className="flex items-start sm:items-center gap-2">
            <MapPin size={14} className="text-terracotta mt-0.5 sm:mt-0 flex-shrink-0" />
            <span>Headquarters: {siteConfig.headquarters}</span>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
              className="hover:text-warm-white transition-colors flex items-center gap-1.5"
            >
              <Phone size={12} />
              {siteConfig.phone}
            </Link>
            <span className="text-sand/40">•</span>
            <Link
              href={`mailto:${siteConfig.email}`}
              className="hover:text-warm-white transition-colors flex items-center gap-1.5"
            >
              <Mail size={12} />
              {siteConfig.email}
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
