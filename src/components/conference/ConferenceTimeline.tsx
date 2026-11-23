"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import type { ConferenceEvent } from "@/types/conference";
import ConferenceEventHeader from "./ConferenceEventHeader";
import ConferenceEventMetadata from "./ConferenceEventMetadata";
import ConferenceDescription from "./ConferenceDescription";
import ConferenceVideoPlayer from "./ConferenceVideoPlayer";
import ConferenceImageGallery from "./ConferenceImageGallery";

interface Props {
  events: ConferenceEvent[];
}

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, ease: "easeOut", delay: 0.1 } },
};

function ConferenceTimelineItem({ event, index }: { event: ConferenceEvent; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const hasVideo = Boolean(event.video?.url);
  const hasImages = Boolean(event.images && event.images.length > 0);
  const hasMedia = hasVideo || hasImages;
  const mediaLeft = index % 2 === 0;

  const MediaSlot = (
    <>
      {hasVideo && event.video ? (
        <ConferenceVideoPlayer video={event.video} />
      ) : hasImages && event.images ? (
        <ConferenceImageGallery images={event.images} />
      ) : (
        <div className="w-full h-full bg-sand border border-sand-dark flex items-center justify-center min-h-[180px]">
          <span className="font-sans text-[11px] uppercase tracking-[0.18em] text-charcoal-muted/40">
            No media
          </span>
        </div>
      )}
    </>
  );

  const TextContent = (
    <>
      <ConferenceEventHeader event={event} />
      <ConferenceEventMetadata event={event} />
      <ConferenceDescription description={event.description} />
    </>
  );

  return (
    <div ref={ref} className="relative" id={`conference-${event._id}`} data-event-index={index}>

      {/* ── Desktop ── */}
      <div className="hidden lg:grid lg:grid-cols-[1fr_48px_1fr] items-stretch gap-0">

        <motion.div variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} className="pb-16 flex flex-col">
          {mediaLeft ? (
            <div className="pr-8 h-full">{MediaSlot}</div>
          ) : (
            <div className="pr-8 pt-2">{TextContent}</div>
          )}
        </motion.div>

        {/* Timeline spine */}
        <div className="relative flex flex-col items-center">
          <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px bg-sand-dark/50" />
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="relative z-10 mt-6 w-3 h-3 rounded-full bg-forest border-2 border-ivory shadow-sm"
          />
        </div>

        <motion.div variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} className="pb-16 flex flex-col">
          {mediaLeft ? (
            <div className="pl-8 pt-2">{TextContent}</div>
          ) : (
            <div className="pl-8 h-full">{MediaSlot}</div>
          )}
        </motion.div>
      </div>

      {/* ── Mobile ── */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="lg:hidden relative pl-7 pb-12"
      >
        <div className="absolute left-0 top-0 bottom-0 w-px bg-sand-dark/50" />
        <div className="absolute left-[-5px] top-5 w-3 h-3 rounded-full bg-forest border-2 border-ivory" />
        <div className="pt-2 space-y-4">
          <ConferenceEventHeader event={event} />
          <ConferenceEventMetadata event={event} />
          {hasMedia && <div>{MediaSlot}</div>}
          <ConferenceDescription description={event.description} />
        </div>
      </motion.div>

    </div>
  );
}

export default function ConferenceTimeline({ events }: Props) {
  if (events.length === 0) {
    return (
      <section className="w-full bg-ivory py-24 px-6 md:px-12 lg:px-20">
        <div className="text-center py-16">
          <span className="font-sans text-[11px] uppercase tracking-[0.2em] text-charcoal-muted/60">
            No conferences published yet
          </span>
          <p className="mt-3 font-serif text-sm italic text-charcoal-muted/50">
            Conferences will appear here once published in Sanity Studio.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full bg-ivory py-16 md:py-20">
      <div className="w-full px-6 md:px-12 lg:px-20">
        <div className="relative">
          {events.map((event, index) => (
            <div key={event._id}>
              <ConferenceTimelineItem event={event} index={index} />
              {index < events.length - 1 && (
                <div className="hidden lg:block w-full h-px bg-sand-dark/30 mb-16 -mt-16" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
