"use client";

import { useRef } from "react";
import { motion } from "motion/react";
import { useInView } from "motion/react";
import type { HealthcareEvent } from "@/types/healthcare";
import HealthcareGallery from "./HealthcareGallery";
import HealthcareEventHeader from "./HealthcareEventHeader";
import HealthcareEventMetadata from "./HealthcareEventMetadata";
import HealthcareDescription from "./HealthcareDescription";

interface Props {
  event: HealthcareEvent;
  globalIndex: number;
}

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, ease: "easeOut", delay: 0.1 } },
};

export default function HealthcareTimelineItem({ event, globalIndex }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const hasImages = Boolean(event.images && event.images.length > 0);
  const imageLeft = globalIndex % 2 === 0;

  return (
    <div ref={ref} className="relative" id={`event-${event._id}`} data-event-index={globalIndex}>
      {/* Desktop layout */}
      <div className="hidden lg:grid lg:grid-cols-[1fr_48px_1fr] items-stretch gap-0">
        <motion.div variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} className="pb-16 flex flex-col">
          {imageLeft ? (
            hasImages ? (
              <div className="pr-8 h-full">
                <HealthcareGallery images={event.images!} eventId={event._id} layout="desktop" />
              </div>
            ) : (
              <div className="pr-8 h-full bg-sand border border-sand-dark flex items-center justify-center min-h-[180px]">
                <span className="font-sans text-[11px] uppercase tracking-[0.18em] text-charcoal-muted/40">No photographs</span>
              </div>
            )
          ) : (
            <div className="pr-8 pt-2">
              <HealthcareEventHeader event={event} />
              <HealthcareEventMetadata event={event} />
              <HealthcareDescription markdown={event.description} />
            </div>
          )}
        </motion.div>

        {/* Centre timeline */}
        <div className="relative flex flex-col items-center">
          <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px bg-sand-dark/50" />
          <motion.div variants={fadeIn} initial="hidden" animate={inView ? "visible" : "hidden"} className="relative z-10 mt-6 w-3 h-3 rounded-full bg-forest border-2 border-ivory shadow-sm" />
        </div>

        <motion.div variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} className="pb-16 flex flex-col">
          {imageLeft ? (
            <div className="pl-8 pt-2">
              <HealthcareEventHeader event={event} />
              <HealthcareEventMetadata event={event} />
              <HealthcareDescription markdown={event.description} />
            </div>
          ) : (
            hasImages ? (
              <div className="pl-8 h-full">
                <HealthcareGallery images={event.images!} eventId={event._id} layout="desktop" />
              </div>
            ) : (
              <div className="pl-8 h-full bg-sand border border-sand-dark flex items-center justify-center min-h-[180px]">
                <span className="font-sans text-[11px] uppercase tracking-[0.18em] text-charcoal-muted/40">No photographs</span>
              </div>
            )
          )}
        </motion.div>
      </div>

      {/* Mobile layout */}
      <motion.div variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} className="lg:hidden relative pl-7 pb-12">
        <div className="absolute left-0 top-0 bottom-0 w-px bg-sand-dark/50" />
        <div className="absolute left-[-5px] top-5 w-3 h-3 rounded-full bg-forest border-2 border-ivory" />
        <div className="pt-2 space-y-4">
          <HealthcareEventHeader event={event} />
          <HealthcareEventMetadata event={event} />
          {hasImages && <HealthcareGallery images={event.images!} eventId={`mobile-${event._id}`} />}
          <HealthcareDescription markdown={event.description} />
        </div>
      </motion.div>
    </div>
  );
}
