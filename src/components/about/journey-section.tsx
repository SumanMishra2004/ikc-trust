"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useInView } from "motion/react";

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.14 } },
};

const milestones = [
  {
    index: "01",
    phase: "Genesis",
    title: "Early Beginnings",
    body: "A grassroots initiative established in Newtown, Kolkata — addressing neighbourhood health support and primary educational gaps for underserved families.",
    meta: "Location: Newtown, Kolkata",
    focal: false,
  },
  {
    index: "02",
    phase: "Scale",
    title: "Growing Commitment",
    body: "Expanding community support across multiple districts — integrating village clinics, rural student scholarships, and ecological plantation drives.",
    meta: "Regional expansion across Bengal",
    focal: false,
  },
  {
    index: "03",
    phase: "Landmark",
    title: "February 2026",
    body: "Official registration of IKC Trust as a formalised Public Charitable Trust, empowering statutory stewardship, endowed funding, and scaled field governance.",
    meta: "Charter Trust Deed Registered",
    focal: true,
  },
];

export default function JourneySection() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const timelineInView = useInView(timelineRef, { once: true, margin: "-80px" });

  const closingRef = useRef<HTMLDivElement>(null);
  const closingInView = useInView(closingRef, { once: true, margin: "-60px" });

  return (
    <section id="our-journey" className="w-full flex flex-col">

      {/* ── Ivory timeline area ── */}
      <div className="w-full bg-ivory py-24 md:py-32 border-b border-sand-dark/40">
        <div className="w-full px-6 md:px-12 lg:px-20">

          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={timelineInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-10"
          >
            <span className="w-8 h-[2px] bg-terracotta flex-shrink-0" />
            <span className="text-xs font-sans uppercase tracking-[0.25em] text-terracotta font-semibold">
              Our Journey
            </span>
          </motion.div>

          <div
            ref={timelineRef}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 mb-20"
          >
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={timelineInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-6"
            >
              <h2 className="font-serif text-4xl sm:text-5xl md:text-[56px] text-charcoal leading-[1.1] font-normal tracking-tight mb-6">
                Milestones of
                <span className="italic text-forest block mt-1">
                  Sustainable Impact
                </span>
              </h2>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={timelineInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              className="lg:col-span-6 flex items-end"
            >
              <p className="font-sans text-base md:text-body-lg text-charcoal-muted leading-relaxed">
                From a local initiative in Newtown, Kolkata, IKC&apos;s journey
                has grown towards supporting communities across multiple
                regions.
              </p>
            </motion.div>
          </div>

          {/* Timeline: horizontal on desktop, vertical on mobile */}
          <div className="relative">

            {/* Connecting line — desktop only */}
            <div
              aria-hidden
              className="hidden md:block absolute top-[2.75rem] left-[calc(16.66%/2)] right-[calc(16.66%/2)] h-px bg-sand-dark/70 z-0"
            />

            <motion.div
              variants={stagger}
              initial="hidden"
              animate={timelineInView ? "visible" : "hidden"}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10"
            >
              {milestones.map((m) => (
                <motion.div
                  key={m.index}
                  variants={fadeUp}
                  className={`flex flex-col ${
                    m.focal
                      ? "bg-forest text-warm-white shadow-xl"
                      : "bg-warm-white border border-sand-dark/60 shadow-sm"
                  }`}
                >
                  {/* Timeline node dot — desktop */}
                  <div
                    className={`hidden md:flex items-center px-8 pt-7 pb-0`}
                  >
                    <div
                      className={`w-5 h-5 flex-shrink-0 ${
                        m.focal ? "bg-terracotta" : "bg-sand-dark border border-sand-dark"
                      }`}
                    />
                  </div>

                  <div className="p-8 flex flex-col flex-1 justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-5">
                        <div className="flex items-center gap-3">
                          <span
                            className={`font-serif text-2xl leading-none ${
                              m.focal ? "text-sand/60" : "text-charcoal-muted/60"
                            }`}
                          >
                            {m.index}
                          </span>
                          <span
                            className={`text-[10px] font-sans uppercase tracking-[0.22em] ${
                              m.focal ? "text-sand/60" : "text-charcoal-muted"
                            }`}
                          >
                            {m.phase}
                          </span>
                        </div>
                        {m.focal && (
                          <span className="bg-terracotta text-warm-white text-[10px] font-sans uppercase tracking-[0.18em] font-semibold px-3 py-1">
                            Landmark
                          </span>
                        )}
                      </div>

                      {/* Focal milestone: oversized date typography */}
                      {m.focal ? (
                        <h3 className="font-serif text-4xl sm:text-5xl text-warm-white leading-tight font-normal tracking-tight mb-5">
                          February
                          <span className="block text-sand italic">2026</span>
                        </h3>
                      ) : (
                        <h3 className="font-serif text-headline-md text-charcoal mb-5">
                          {m.title}
                        </h3>
                      )}

                      <p
                        className={`font-sans text-body-md leading-relaxed ${
                          m.focal ? "text-warm-white/80" : "text-charcoal-muted"
                        }`}
                      >
                        {m.body}
                      </p>
                    </div>

                    <div
                      className={`mt-6 pt-4 border-t ${
                        m.focal ? "border-warm-white/20" : "border-sand-dark/50"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className={`w-1 h-1 flex-shrink-0 ${
                            m.focal ? "bg-terracotta" : "bg-charcoal-muted/50"
                          }`}
                        />
                        <span
                          className={`text-[10px] font-sans uppercase tracking-[0.2em] ${
                            m.focal ? "text-sand/70" : "text-charcoal-muted"
                          }`}
                        >
                          {m.meta}
                        </span>
                      </div>
                      {m.focal && (
                        <p className="font-sans text-[11px] text-warm-white/50 mt-1 pl-3">
                          Sections 12A &amp; 80G Tax Exemption Enacted
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Interlude: documentary image + ground-level prose */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={timelineInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center bg-warm-white border border-sand-dark/50 shadow-sm p-6 md:p-10"
          >
            <div className="lg:col-span-5 aspect-[4/3] overflow-hidden relative bg-sand">
              <Image
                src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=900&q=85&auto=format&fit=crop"
                alt="Girl students in a rural Bengal learning environment"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute top-4 left-4 bg-charcoal/80 text-warm-white px-3 py-1 text-[10px] uppercase tracking-widest font-sans backdrop-blur-sm">
                Field Documentation
              </div>
            </div>

            <div className="lg:col-span-7 flex flex-col">
              <span className="text-[10px] font-sans uppercase tracking-[0.22em] text-terracotta font-semibold block mb-3">
                Grounded Practice
              </span>
              <h3 className="font-serif text-headline-lg text-charcoal mb-4">
                Built from the ground up — in the courtyards and community halls of Bengal
              </h3>
              <p className="font-sans text-body-md text-charcoal-muted leading-relaxed mb-6">
                Our teams operate not from distant offices but directly on village school porches, community
                health posts, and rural clinics. Each initiative is shaped in collaboration with local
                educators, health aides, and panchayat representatives.
              </p>
              <div className="grid grid-cols-3 gap-4 border-t border-sand-dark/50 pt-6">
                {[
                  { val: "100%", label: "Statutory Filings Open" },
                  { val: "12A/80G", label: "Tax Exemptions Active" },
                  { val: "Kolkata", label: "Trust Headquarters" },
                ].map((stat) => (
                  <div key={stat.label} className="border-t-2 border-sand-dark/60 pt-3">
                    <span className="font-serif text-headline-sm text-forest block">{stat.val}</span>
                    <span className="font-sans text-[11px] text-charcoal-muted uppercase tracking-[0.1em]">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Forest-green closing composition ── */}
      <div
        ref={closingRef}
        className="w-full bg-forest text-warm-white py-24 md:py-32 relative overflow-hidden"
      >
        {/* Decorative photographic backdrop — reduced opacity */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1600&q=70&auto=format&fit=crop"
            alt=""
            fill
            sizes="100vw"
            aria-hidden
            className="object-cover opacity-10"
          />
          <div className="absolute inset-0 bg-forest/85" />
        </div>

        <div className="relative z-10 w-full px-6 md:px-12 lg:px-20">
          <div className="max-w-4xl mx-auto flex flex-col items-center text-center">

            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={closingInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3 mb-10"
            >
              <span className="w-8 h-[2px] bg-terracotta flex-shrink-0" />
              <span className="text-xs font-sans uppercase tracking-[0.25em] text-terracotta font-semibold">
                Collective Future
              </span>
              <span className="w-8 h-[2px] bg-terracotta flex-shrink-0" />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 32 }}
              animate={closingInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
              className="font-serif text-4xl sm:text-5xl md:text-[60px] lg:text-[72px] text-warm-white leading-[1.1] font-normal tracking-tight mb-8"
            >
              Together, We Can Make
              <span className="italic text-sand block mt-1">a Difference.</span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0 }}
              animate={closingInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-16 h-[2px] bg-terracotta mb-8"
            />

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={closingInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.22 }}
              className="font-sans text-base md:text-body-lg text-warm-white/80 max-w-2xl leading-relaxed mb-12"
            >
              We remain committed to bringing knowledge and care closer to
              communities and creating opportunities for a more inclusive and
              sustainable future.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={closingInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center gap-4 mb-16"
            >
              <Link
                href="#contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-terracotta hover:bg-terracotta-dark text-warm-white px-8 py-4 font-sans text-xs uppercase tracking-[0.2em] font-semibold transition-colors shadow-md"
              >
                Get Involved
                <span>→</span>
              </Link>
              <Link
                href="#"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-warm-white/30 hover:border-warm-white/70 text-warm-white px-8 py-4 font-sans text-xs uppercase tracking-[0.2em] font-semibold transition-colors"
              >
                Contact Us
              </Link>
            </motion.div>

            {/* Footer compliance strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={closingInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 font-sans text-[10px] text-warm-white/40 uppercase tracking-[0.16em] border-t border-warm-white/10 pt-8 w-full"
            >
              <span>Registered under the Indian Trusts Act, 1882 · Kolkata</span>
              <span className="hidden sm:block w-px h-3 bg-warm-white/20" />
              <span>Section 12A &amp; Section 80G Certified</span>
              <span className="hidden sm:block w-px h-3 bg-warm-white/20" />
              <span>FCRA Documentation Maintained</span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
