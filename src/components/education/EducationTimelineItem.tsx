"use client";

import { useRef } from "react";
import { motion } from "motion/react";
import { useInView } from "motion/react";
import type { EducationEvent } from "@/types/education";
import EducationGallery from "./EducationGallery";
import EducationEventHeader from "./EducationEventHeader";
import EducationEventMetadata from "./EducationEventMetadata";
import EducationDescription from "./EducationDescription";

interface Props {
  event: EducationEvent;
  /**
   * Global position index across all loaded events (0-based).
   * Even = image left / description right.
   * Odd  = description left / image right.
   */
  globalIndex: number;
}

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut", delay: 0.1 },
  },
};

export default function EducationTimelineItem({ event, globalIndex }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const hasImages = Boolean(event.images && event.images.length > 0);
  // Even index → image left; odd → image right
  const imageLeft = globalIndex % 2 === 0;

  return (
    <div
      ref={ref}
      className="relative"
      id={`event-${event._id}`}
      data-event-index={globalIndex}
    >
      {/* ── Desktop layout (lg+) ─────────────────────────────────────── */}
      <div className="hidden lg:grid lg:grid-cols-[1fr_48px_1fr] items-stretch gap-0">

        {/* Left column */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="pb-16 flex flex-col"
        >
          {imageLeft ? (
            /* Image on left */
            hasImages ? (
              <div className="pr-8 h-full flex flex-col">
                <EducationGallery
                  images={event.images!}
                  eventId={event._id}
                />
              </div>
            ) : (
              /* No-image placeholder to maintain layout balance */
              <div className="pr-8 aspect-[3/2] bg-sand/40 border border-sand-dark/30 flex items-center justify-center">
                <span className="font-sans text-[11px] uppercase tracking-[0.18em] text-charcoal-muted/40">
                  No photographs
                </span>
              </div>
            )
          ) : (
            /* Description on left */
            <div className="pr-8 pt-2">
              <EducationEventHeader event={event} />
              <EducationEventMetadata event={event} />
              <EducationDescription markdown={event.description} />
            </div>
          )}
        </motion.div>

        {/* Centre column — timeline line + marker */}
        <div className="relative flex flex-col items-center">
          {/* Vertical line — full height */}
          <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px bg-sand-dark/50" />
          {/* Marker dot */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="relative z-10 mt-6 w-3 h-3 rounded-full bg-forest border-2 border-ivory shadow-sm"
          />
        </div>

        {/* Right column */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="pb-16 flex flex-col"
        >
          {imageLeft ? (
            /* Description on right */
            <div className="pl-8 pt-2">
              <EducationEventHeader event={event} />
              <EducationEventMetadata event={event} />
              <EducationDescription markdown={event.description} />
            </div>
          ) : (
            /* Image on right */
            hasImages ? (
              <div className="pl-8 h-full flex flex-col">
                <EducationGallery
                  images={event.images!}
                  eventId={event._id}
                />
              </div>
            ) : (
              <div className="pl-8 aspect-[3/2] bg-sand/40 border border-sand-dark/30 flex items-center justify-center">
                <span className="font-sans text-[11px] uppercase tracking-[0.18em] text-charcoal-muted/40">
                  No photographs
                </span>
              </div>
            )
          )}
        </motion.div>
      </div>

      {/* ── Mobile / tablet layout (< lg) ───────────────────────────── */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="lg:hidden relative pl-7 pb-12"
      >
        {/* Left-side timeline line */}
        <div className="absolute left-0 top-0 bottom-0 w-px bg-sand-dark/50" />
        {/* Marker dot */}
        <div className="absolute left-[-5px] top-5 w-3 h-3 rounded-full bg-forest border-2 border-ivory" />

        {/* Content */}
        <div className="pt-2 space-y-4">
          <EducationEventHeader event={event} />
          <EducationEventMetadata event={event} />

          {hasImages && (
            <EducationGallery
              images={event.images!}
              eventId={`mobile-${event._id}`}
            />
          )}

          <EducationDescription markdown={event.description} />
        </div>
      </motion.div>
    </div>
  );
}
