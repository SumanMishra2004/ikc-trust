"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { useInView } from "motion/react";
import { impactStats } from "@/data/homepage";

function CountUp({
  target,
  inView,
  duration = 1800,
}: {
  target: number;
  inView: boolean;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const hasRun = useRef(false);

  useEffect(() => {
    if (!inView || hasRun.current) return;
    hasRun.current = true;

    const steps = 60;
    const interval = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.round(eased * target);
      setCount(value);
      if (step >= steps) {
        clearInterval(timer);
        setCount(target);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [inView, target, duration]);

  return <>{count.toLocaleString()}</>;
}

export default function ImpactCounters() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="impact-metrics"
      ref={ref}
      className="w-full bg-sand py-24 md:py-28 border-b border-sand-dark/50"
    >
      <div className="w-full px-6 md:px-12 lg:px-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center max-w-2xl mx-auto mb-16 space-y-3"
        >
          <div className="inline-flex items-center gap-3">
            <span className="w-6 h-[1.5px] bg-terracotta" />
            <span className="text-xs font-sans uppercase tracking-[0.25em] text-terracotta font-semibold">
              Measurable Commitment
            </span>
            <span className="w-6 h-[1.5px] bg-terracotta" />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-charcoal font-normal">
            Direct Accountability. Tangible Reality.
          </h2>
          <p className="font-sans text-sm sm:text-base text-charcoal-muted">
            Audited metrics reflecting continuous fieldwork and institutional
            integrity across West Bengal.
          </p>
        </motion.div>

        {/* Counters Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 divide-y sm:divide-y-0 sm:divide-x divide-sand-dark">
          {impactStats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.1 + i * 0.1,
              }}
              className="pt-6 sm:pt-0 sm:px-8 text-center space-y-2"
            >
              <div className="flex items-baseline justify-center">
                <span className="font-serif text-5xl sm:text-6xl text-forest font-medium tabular-nums">
                  <CountUp target={stat.value} inView={inView} />
                </span>
                <span className="font-serif text-4xl text-terracotta ml-1">
                  {stat.suffix}
                </span>
              </div>
              <h4 className="font-serif text-xl text-charcoal">{stat.label}</h4>
              <p className="text-xs text-charcoal-muted leading-relaxed">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Verification Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-16 pt-8 border-t border-sand-dark flex flex-col md:flex-row items-center justify-between text-xs font-sans uppercase tracking-widest text-charcoal-muted gap-4"
        >
          <span>Verified by Registered Statutory Auditors · Kolkata</span>
          <span>Section 80G Tax Deductible Certification Validated</span>
        </motion.div>
      </div>
    </section>
  );
}
