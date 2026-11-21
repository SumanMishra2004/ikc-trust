"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import type { HealthcareEvent } from "@/types/healthcare";
import HealthcareEventHeader from "./HealthcareEventHeader";
import HealthcareEventMetadata from "./HealthcareEventMetadata";
import HealthcareDescription from "./HealthcareDescription";
import InitiativeMediaSlider from "@/components/shared/InitiativeMediaSlider";
import MediaCoverageSection from "@/components/shared/MediaCoverageSection";

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

  const hasMedia = Boolean(
    (event.videos && event.videos.length > 0) ||
    (event.images && event.images.length > 0)
  );
  const hasMediaCoverage = Boolean(event.mediaCoverage && event.mediaCoverage.length > 0);
  const mediaLeft = globalIndex % 2 === 0;

  const MediaSlider = (layout: "desktop" | "mobile") =>
    hasMedia ? (
      <InitiativeMediaSlider
        videos={event.videos}
        images={event.images}
        eventId={layout === "desktop" ? event._id : `mobile-${event._id}`}
        layout={layout}
      />
    ) : (
      <div className="w-full h-full bg-sand border border-sand-dark flex items-center justify-center min-h-[180px]">
        <span className="font-sans text-[11px] uppercase tracking-[0.18em] text-charcoal-muted/40">
          No media
        </span>
      </div>
    );

  const TextContent = (
    <>
      <HealthcareEventHeader event={event} />
      <HealthcareEventMetadata event={event} />
      <HealthcareDescription markdown={event.description} />
      {hasMediaCoverage && <MediaCoverageSection items={event.mediaCoverage!} />}
    </>
  );

  return (
    <div ref={ref} className="relative" id={`event-${event._id}`} data-event-index={globalIndex}>

      {/* ── Desktop ── */}
      <div className="hidden lg:grid lg:grid-cols-[1fr_48px_1fr] items-stretch gap-0">

        <motion.div variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} className="pb-16 flex flex-col">
          {mediaLeft ? (
            <div className="pr-8 h-full">{MediaSlider("desktop")}</div>
          ) : (
            <div className="pr-8 pt-2">{TextContent}</div>
          )}
        </motion.div>

        <div className="relative flex flex-col items-center">
          <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px bg-sand-dark/50" />
          <motion.div variants={fadeIn} initial="hidden" animate={inView ? "visible" : "hidden"}
            className="relative z-10 mt-6 w-3 h-3 rounded-full bg-forest border-2 border-ivory shadow-sm" />
        </div>

        <motion.div variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} className="pb-16 flex flex-col">
          {mediaLeft ? (
            <div className="pl-8 pt-2">{TextContent}</div>
          ) : (
            <div className="pl-8 h-full">{MediaSlider("desktop")}</div>
          )}
        </motion.div>
      </div>

      {/* ── Mobile ── */}
      <motion.div variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"}
        className="lg:hidden relative pl-7 pb-12">
        <div className="absolute left-0 top-0 bottom-0 w-px bg-sand-dark/50" />
        <div className="absolute left-[-5px] top-5 w-3 h-3 rounded-full bg-forest border-2 border-ivory" />
        <div className="pt-2 space-y-4">
          <HealthcareEventHeader event={event} />
          <HealthcareEventMetadata event={event} />
          {hasMedia && MediaSlider("mobile")}
          <HealthcareDescription markdown={event.description} />
          {hasMediaCoverage && <MediaCoverageSection items={event.mediaCoverage!} />}
        </div>
      </motion.div>

    </div>
  );
}
