"use client";

import { useRef } from "react";
import type { EducationEvent, PaginationCursor } from "@/types/education";
import { useEducationPagination } from "@/hooks/useEducationPagination";
import { PAGE_SIZE } from "@/sanity/queries/education";
import EducationTimelineItem from "./EducationTimelineItem";
import EducationLoader from "./EducationLoader";
import EducationEndMessage from "./EducationEndMessage";

interface Props {
  initialEvents: EducationEvent[];
  initialHasMore: boolean;
  initialCursor: PaginationCursor | null;
}

/**
 * Client component that owns the full paginated event list.
 *
 * Trigger logic:
 * Each loaded batch is PAGE_SIZE events. We watch the 4th event (index 3)
 * of the most recently loaded batch. When it enters the viewport, we fetch
 * the next batch. The trigger ref is re-attached after each append.
 *
 * Example for PAGE_SIZE = 5:
 *   Batch 1 events 0–4  → trigger at global index 3  (event 4)
 *   Batch 2 events 5–9  → trigger at global index 8  (event 9)
 *   Batch 3 events 10–14 → trigger at global index 13 (event 14)
 */
export default function EducationTimeline({
  initialEvents,
  initialHasMore,
  initialCursor,
}: Props) {
  const { events, hasMore, isLoading, error, triggerRef, retry } =
    useEducationPagination({ initialEvents, initialHasMore, initialCursor });

  /**
   * Determine which global index should be observed as the trigger.
   * It is the 4th item (index 3 within batch) of the latest loaded batch.
   *
   * total events loaded → last batch start = floor((total-1) / PAGE_SIZE) * PAGE_SIZE
   * trigger index = lastBatchStart + 3
   *
   * We only set the trigger if we actually have more to load and there are
   * enough events in the current batch (at least 4 items).
   */
  const totalLoaded = events.length;
  const lastBatchStart =
    Math.floor((totalLoaded - 1) / PAGE_SIZE) * PAGE_SIZE;
  const triggerIndex = lastBatchStart + 3;
  const shouldTrigger = hasMore && triggerIndex < totalLoaded;

  if (events.length === 0) {
    return (
      <section className="w-full bg-ivory py-24 px-6 md:px-12 lg:px-20">
        <div className="text-center py-16">
          <span className="font-sans text-[11px] uppercase tracking-[0.2em] text-charcoal-muted/60">
            No events published yet
          </span>
          <p className="mt-3 font-serif text-sm italic text-charcoal-muted/50">
            Events will appear here once published in Sanity Studio.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full bg-ivory py-16 md:py-20">
      <div className="w-full px-6 md:px-12 lg:px-20">

        {/* Section label */}
     

        {/* Timeline container */}
        <div className="relative">
          {events.map((event, index) => {
            const isTrigger = shouldTrigger && index === triggerIndex;
            return (
              <div
                key={event._id}
                ref={isTrigger ? triggerRef : undefined}
                data-trigger={isTrigger ? "true" : undefined}
              >
                <EducationTimelineItem
                  event={event}
                  globalIndex={index}
                />
                {/* Hairline divider between events (not after last) */}
                {index < events.length - 1 && (
                  <div className="hidden lg:block w-full h-px bg-sand-dark/30 mb-16 -mt-16" />
                )}
              </div>
            );
          })}
        </div>

        {/* Loading indicator */}
        {isLoading && <EducationLoader />}

        {/* Error state */}
        {error && !isLoading && (
          <div className="flex flex-col items-center gap-4 py-10">
            <p className="font-sans text-sm text-terracotta text-center">
              {error}
            </p>
            <button
              onClick={retry}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-forest text-warm-white font-sans text-[11px] uppercase tracking-[0.18em] font-semibold hover:bg-forest-dark transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest/50"
            >
              Retry ↺
            </button>
          </div>
        )}

        {/* End of timeline */}
        {!hasMore && !isLoading && events.length > 0 && (
          <EducationEndMessage />
        )}
      </div>
    </section>
  );
}
