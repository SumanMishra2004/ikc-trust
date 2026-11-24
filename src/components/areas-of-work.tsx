"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { areasOfWork } from "@/data/homepage";
import { cn } from "@/lib/utils";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 },
  }),
};

export default function AreasOfWork() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="areas-of-work"
      ref={ref}
      className="w-full bg-warm-white py-24 md:py-32 border-b border-sand-dark/30"
    >
      <div className="w-full px-6 md:px-12 lg:px-20">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-12 border-b border-sand-dark"
        >
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-8 h-[2px] bg-terracotta flex-shrink-0" />
              <span className="text-xs font-sans uppercase tracking-[0.25em] text-terracotta font-semibold">
                Our Areas of Commitment
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-charcoal font-normal">
              Working across the foundations of a stronger society.
            </h2>
          </div>
          <p className="font-sans text-sm sm:text-base text-charcoal-muted max-w-md leading-relaxed">
            Six interconnected programmatic pillars engineered for systemic
            empowerment, generational dignity, and measurable human development.
          </p>
        </motion.div>

        {/* Asymmetric Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-12">
          {/* 01: Education — Featured Large */}
          {(() => {
            const item = areasOfWork[0];
            return (
              <motion.div
                custom={0}
                variants={fadeUp}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                className="md:col-span-12 lg:col-span-7 bg-ivory border border-sand-dark flex flex-col justify-between overflow-hidden group"
              >
                <Link href={item.href} className="flex flex-col flex-1">
                {item.imageUrl && (
                  <div className="relative h-80 md:h-96 w-full overflow-hidden">
                    <Image
                      src={item.imageUrl}
                      alt={item.imageAlt ?? item.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 58vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ivory via-transparent to-transparent" />
                    <span className="absolute top-6 left-6 font-serif text-5xl text-terracotta/90 select-none">
                      {item.number}
                    </span>
                    {item.tag && (
                      <span className="absolute top-6 right-6 bg-forest text-warm-white text-[10px] font-sans uppercase tracking-[0.2em] px-3 py-1 font-semibold">
                        {item.tag}
                      </span>
                    )}
                  </div>
                )}
                <div className="p-8 md:p-10 space-y-4">
                  <h3 className="font-serif text-2xl md:text-3xl text-charcoal group-hover:text-forest transition-colors">
                    {item.title}
                  </h3>
                  <p className="font-sans text-base text-charcoal-muted leading-relaxed">
                    {item.description}
                  </p>
                  <div className="pt-4 border-t border-sand-dark flex items-center justify-between text-xs font-sans uppercase tracking-widest">
                    <span className="text-charcoal-muted">{item.meta}</span>
                    <span className="text-forest font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                      Learn More <ArrowRight size={14} />
                    </span>
                  </div>
                </div>
                </Link>
              </motion.div>
            );
          })()}

          {/* 02: Healthcare */}
          {(() => {
            const item = areasOfWork[1];
            return (
              <motion.div
                custom={1}
                variants={fadeUp}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                className="md:col-span-12 lg:col-span-5 bg-ivory border border-sand-dark flex flex-col justify-between group"
              >
                <Link href={item.href} className="flex flex-col flex-1">
                {item.imageUrl && (
                  <div className="relative h-64 md:h-80 w-full overflow-hidden">
                    <Image
                      src={item.imageUrl}
                      alt={item.imageAlt ?? item.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 42vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ivory via-transparent to-transparent" />
                    <span className="absolute top-6 left-6 font-serif text-4xl text-terracotta/90 select-none">
                      {item.number}
                    </span>
                  </div>
                )}
                <div className="p-8 space-y-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-2xl text-charcoal group-hover:text-forest transition-colors">
                      {item.title}
                    </h3>
                    <p className="font-sans text-sm sm:text-base text-charcoal-muted leading-relaxed mt-2">
                      {item.description}
                    </p>
                  </div>
                  <div className="pt-4 border-t border-sand-dark flex items-center justify-between text-xs font-sans uppercase tracking-widest text-charcoal-muted">
                    <span>{item.meta}</span>
                    <ArrowUpRight size={16} className="text-forest" />
                  </div>
                </div>
                </Link>
              </motion.div>
            );
          })()}

          {/* 03: Environment */}
          {(() => {
            const item = areasOfWork[2];
            return (
              <motion.div
                custom={2}
                variants={fadeUp}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                className="md:col-span-12 lg:col-span-5 bg-ivory border border-sand-dark flex flex-col justify-between group"
              >
                <Link href={item.href} className="flex flex-col flex-1">
                {item.imageUrl && (
                  <div className="relative h-64 md:h-72 w-full overflow-hidden">
                    <Image
                      src={item.imageUrl}
                      alt={item.imageAlt ?? item.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 42vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ivory via-transparent to-transparent" />
                    <span className="absolute top-6 left-6 font-serif text-4xl text-terracotta/90 select-none">
                      {item.number}
                    </span>
                  </div>
                )}
                <div className="p-8 space-y-4">
                  <h3 className="font-serif text-2xl text-charcoal group-hover:text-forest transition-colors">
                    {item.title}
                  </h3>
                  <p className="font-sans text-sm sm:text-base text-charcoal-muted leading-relaxed">
                    {item.description}
                  </p>
                  <div className="pt-4 border-t border-sand-dark flex items-center justify-between text-xs font-sans uppercase tracking-widest text-charcoal-muted">
                    <span>{item.meta}</span>
                    <ArrowUpRight size={16} className="text-forest" />
                  </div>
                </div>
                </Link>
              </motion.div>
            );
          })()}

          {/* 04: Social Welfare */}
          {(() => {
            const item = areasOfWork[3];
            return (
              <motion.div
                custom={3}
                variants={fadeUp}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                className="md:col-span-6 lg:col-span-3 bg-sand/30 border border-sand-dark flex flex-col justify-between group hover:bg-ivory transition-colors"
              >
                <Link href={item.href} className="flex flex-col flex-1 p-8">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-serif text-3xl text-terracotta select-none">
                      {item.number}
                    </span>
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl text-charcoal group-hover:text-forest transition-colors">
                    {item.title}
                  </h3>
                  <p className="font-sans text-sm text-charcoal-muted leading-relaxed">
                    {item.description}
                  </p>
                </div>
                <div className="pt-6 border-t border-sand-dark text-[11px] font-sans uppercase tracking-widest text-forest font-semibold">
                  {item.meta}
                </div>
                </Link>
              </motion.div>
            );
          })()}

          {/* 05: Disaster Relief */}
          {(() => {
            const item = areasOfWork[4];
            return (
              <motion.div
                custom={4}
                variants={fadeUp}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                className="md:col-span-6 lg:col-span-4 bg-sand/30 border border-sand-dark flex flex-col justify-between group hover:bg-ivory transition-colors"
              >
                <Link href={item.href} className="flex flex-col flex-1 p-8">
                <div className="space-y-4">
                  <span className="font-serif text-3xl text-terracotta select-none">
                    {item.number}
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl text-charcoal group-hover:text-forest transition-colors">
                    {item.title}
                  </h3>
                  <p className="font-sans text-sm text-charcoal-muted leading-relaxed">
                    {item.description}
                  </p>
                </div>
                <div className="pt-6 border-t border-sand-dark text-[11px] font-sans uppercase tracking-widest text-forest font-semibold">
                  {item.meta}
                </div>
                </Link>
              </motion.div>
            );
          })()}

          {/* 06: Culture — Wide Strip */}
          {(() => {
            const item = areasOfWork[5];
            return (
              <motion.div
                custom={5}
                variants={fadeUp}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                className="md:col-span-12 bg-ivory border border-sand-dark p-8 md:p-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6"
              >
                <div className="flex items-start gap-6">
                  <span className="font-serif text-4xl sm:text-5xl text-terracotta leading-none select-none flex-shrink-0">
                    {item.number}
                  </span>
                  <div className="space-y-1">
                    <span className="text-[11px] font-sans uppercase tracking-[0.2em] text-terracotta font-semibold">
                      {item.meta}
                    </span>
                    <h3 className="font-serif text-2xl md:text-3xl text-charcoal">
                      {item.title}
                    </h3>
                    <p className="font-sans text-sm sm:text-base text-charcoal-muted max-w-3xl leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
                <Link
                  href={item.href}
                  className="px-6 py-3 border border-forest text-forest hover:bg-forest hover:text-warm-white transition-colors text-xs font-sans uppercase tracking-[0.2em] font-semibold whitespace-nowrap flex-shrink-0"
                >
                  View Archive
                </Link>
              </motion.div>
            );
          })()}
        </div>
      </div>
    </section>
  );
}
