"use client";

import Image from "next/image";
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
  visible: { transition: { staggerChildren: 0.11 } },
};

const programmes = [
  {
    num: "01",
    title: "Healthcare",
    body: "Mobile health camps offering on-site check-ups, preventive screening, diagnosis, and free distribution of essential medicines.",
  },
  {
    num: "02",
    title: "Education",
    body: "Long-term fellowships, study stipends, and educational supplies prioritised for underprivileged girl students.",
  },
  {
    num: "03",
    title: "Environment",
    body: "Participatory community afforestation, ecological embankment stabilisation, and water resource conservation.",
  },
];

export default function WhoWeAreSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const metricRef = useRef<HTMLDivElement>(null);
  const metricInView = useInView(metricRef, { once: true, margin: "-60px" });

  return (
    <section
      id="who-we-are"
      ref={ref}
      className="w-full bg-ivory py-24 md:py-32 border-b border-sand-dark/40"
    >
      <div className="w-full px-6 md:px-12 lg:px-20">

        {/* ── Eyebrow ── */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-10"
        >
          <span className="w-8 h-[2px] bg-terracotta flex-shrink-0" />
          <span className="text-xs font-sans uppercase tracking-[0.25em] text-terracotta font-semibold">
            About IKC Trust
          </span>
        </motion.div>

        {/* ── Upper: asymmetric editorial frame ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-20">

          {/* Left column */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="lg:col-span-6 xl:col-span-7 flex flex-col"
          >
            <motion.h1
              variants={fadeUp}
              className="font-serif text-4xl sm:text-5xl md:text-[56px] text-charcoal leading-[1.1] font-normal tracking-tight mb-6"
            >
              Care That Inspires Change.{" "}
              <span className="italic text-forest block mt-1">
                Knowledge That Builds Futures.
              </span>
            </motion.h1>

            <motion.div variants={fadeUp} className="w-20 h-[2px] bg-terracotta/60 mb-8" />

            <motion.p
              variants={fadeUp}
              className="font-sans text-base md:text-body-lg text-charcoal-muted leading-relaxed max-w-2xl mb-10"
            >
              Integrated Knowledge and Care (IKC) Trust works towards building a
              healthier, more educated, and inclusive society. We bring together
              healthcare, education, and environmental initiatives to support
              communities and create opportunities for sustainable development.
            </motion.p>

            {/* Inset documentary vignette — visible on desktop left column */}
            <motion.div
              variants={fadeUp}
              className="relative w-full max-w-lg aspect-[16/9] overflow-hidden bg-sand border border-sand-dark/60 shadow-sm hidden lg:block"
            >
              <Image
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=900&q=85&auto=format&fit=crop"
                alt="IKC Trust mobile healthcare camp in rural West Bengal"
                fill
                sizes="(max-width: 1280px) 50vw, 40vw"
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-charcoal/80 backdrop-blur-sm px-4 py-2 flex items-center justify-between">
                <span className="text-[10px] font-sans uppercase tracking-widest text-warm-white/80">
                  Field Documentation · Mobile Health Camps
                </span>
                <span className="text-[10px] font-sans text-terracotta font-semibold uppercase tracking-wider">
                  West Bengal
                </span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right column — primary banner */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.18 }}
            className="lg:col-span-6 xl:col-span-5 relative"
          >
            {/* Offset shadow frame */}
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-full h-full bg-sand-dark/50 -z-10" />
              <div className="relative w-full aspect-square overflow-hidden bg-sand border border-sand-dark/60 shadow-xl">
                <Image
                  src="https://images.unsplash.com/photo-1593113598332-cd288d649433?w=900&q=85&auto=format&fit=crop"
                  alt="Community volunteers at an IKC Trust outreach programme in rural West Bengal"
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover"
                  onError={() => {/* fallback handled by bg color */}}
                />
                <div className="absolute inset-0 bg-forest/10" />
              </div>

              {/* Credential badge — desktop */}
              <div className="absolute -bottom-6 -left-6 bg-forest text-warm-white p-5 max-w-[240px] shadow-lg hidden sm:block">
                <span className="text-[10px] font-sans uppercase tracking-[0.22em] text-sand/70 block mb-1">
                  Institutional Mandate
                </span>
                <p className="font-sans text-xs text-warm-white/90 leading-snug">
                  Public charitable trust headquartered in Kolkata, serving
                  communities across West Bengal.
                </p>
              </div>
            </div>

            {/* Mobile documentary vignette */}
            <div className="relative w-full aspect-[16/9] overflow-hidden bg-sand border border-sand-dark/60 shadow-sm mt-6 lg:hidden">
              <Image
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=900&q=85&auto=format&fit=crop"
                alt="IKC Trust mobile healthcare camp"
                fill
                sizes="100vw"
                className="object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-charcoal/80 px-4 py-2">
                <span className="text-[10px] font-sans uppercase tracking-widest text-warm-white/80">
                  Field Documentation · Mobile Health Camps
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── Lower: 85% metric + programme ledger ── */}
        <div ref={metricRef} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch border-t border-sand-dark/40 pt-16">

          {/* Metric anchor */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={metricInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-4 bg-warm-white border border-sand-dark/60 p-8 md:p-10 flex flex-col justify-between shadow-sm"
          >
            <div>
              <span className="text-[10px] font-sans uppercase tracking-[0.22em] text-charcoal-muted block mb-3">
                Fiduciary Efficiency
              </span>
              <div className="font-serif text-[88px] md:text-[108px] leading-none text-forest tracking-tighter">
                85%
              </div>
              <h3 className="font-serif text-headline-sm text-charcoal mt-3 mb-2">
                Direct-to-Field Program Allocation
              </h3>
              <p className="font-sans text-body-sm text-charcoal-muted leading-relaxed">
                Community disbursements subject to independent quarterly
                statutory auditing under Kolkata Trust jurisdiction.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-sand-dark/60">
              <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-forest font-semibold">
                12A &amp; 80G Compliant Disbursement
              </span>
            </div>
          </motion.div>

          {/* Programme ledger + narrative */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={metricInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.12 }}
            className="lg:col-span-8 bg-ivory border border-sand-dark/60 p-8 md:p-10 shadow-sm flex flex-col justify-between"
          >
            <div className="mb-8">
              <span className="text-[10px] font-sans uppercase tracking-[0.22em] text-terracotta font-semibold block mb-2">
                Core Architecture
              </span>
              <h2 className="font-serif text-headline-lg text-charcoal mb-3">
                Merging Direct Care with Intellectual Development
              </h2>
              <p className="font-sans text-body-md text-charcoal-muted leading-relaxed max-w-2xl">
                We believe meaningful change comes from addressing immediate
                needs while creating opportunities for long-term growth. Our
                interdisciplinary programmes operate concurrently across the
                same communities.
              </p>
            </div>

            {/* Three programme rows — editorial ledger style */}
            <div className="flex flex-col divide-y divide-sand-dark/50">
              {programmes.map((p) => (
                <div
                  key={p.num}
                  className="grid grid-cols-12 gap-4 py-5 items-baseline"
                >
                  <span className="col-span-2 sm:col-span-1 font-serif text-2xl text-terracotta font-normal leading-none">
                    {p.num}
                  </span>
                  <span className="col-span-10 sm:col-span-3 font-serif text-headline-sm text-charcoal">
                    {p.title}
                  </span>
                  <p className="col-span-12 sm:col-span-8 font-sans text-body-md text-charcoal-muted leading-relaxed">
                    {p.body}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
