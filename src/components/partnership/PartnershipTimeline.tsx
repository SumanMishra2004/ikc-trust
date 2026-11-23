"use client";

import type { PartnershipEvent, PaginationCursor } from "@/types/partnership";
import { usePartnershipPagination } from "@/hooks/usePartnershipPagination";
import { PAGE_SIZE } from "@/sanity/queries/partnerships";
import PartnershipTimelineItem from "./PartnershipTimelineItem";
import EducationLoader from "@/components/education/EducationLoader";
import PartnershipEndMessage from "./PartnershipEndMessage";

interface Props {
  initialEvents: PartnershipEvent[];
  initialHasMore: boolean;
  initialCursor: PaginationCursor | null;
}

export default function PartnershipTimeline({
  initialEvents,
  initialHasMore,
  initialCursor,
}: Props) {
  const { events, hasMore, isLoading, error, triggerRef, retry } =
    usePartnershipPagination({ initialEvents, initialHasMore, initialCursor });

  const totalLoaded = events.length;
  const lastBatchStart = Math.floor((totalLoaded - 1) / PAGE_SIZE) * PAGE_SIZE;
  const triggerIndex = lastBatchStart + 3;
  const shouldTrigger = hasMore && triggerIndex < totalLoaded;

  if (events.length === 0) {
    return (
      <section className="w-full bg-ivory py-24 px-6 md:px-12 lg:px-20">
        <div className="text-center py-16">
          <span className="font-sans text-[11px] uppercase tracking-[0.2em] text-charcoal-muted/60">
            No partnerships published yet
          </span>
          <p className="mt-3 font-serif text-sm italic text-charcoal-muted/50">
            Partnerships will appear here once published in Sanity Studio.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full bg-ivory py-16 md:py-20">
      <div className="w-full px-6 md:px-12 lg:px-20">

        <div className="relative">
          {events.map((event, index) => {
            const isTrigger = shouldTrigger && index === triggerIndex;
            return (
              <div
                key={event._id}
                ref={isTrigger ? triggerRef : undefined}
                data-trigger={isTrigger ? "true" : undefined}
              >
                <PartnershipTimelineItem event={event} globalIndex={index} />
                {index < events.length - 1 && (
                  <div className="hidden lg:block w-full h-px bg-sand-dark/30 mb-16 -mt-16" />
                )}
              </div>
            );
          })}
        </div>

        {isLoading && <EducationLoader />}

        {error && !isLoading && (
          <div className="flex flex-col items-center gap-4 py-10">
            <p className="font-sans text-sm text-terracotta text-center">{error}</p>
            <button
              onClick={retry}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-forest text-warm-white font-sans text-[11px] uppercase tracking-[0.18em] font-semibold hover:bg-forest-dark transition-colors"
            >
              Retry ↺
            </button>
          </div>
        )}

        {!hasMore && !isLoading && events.length > 0 && <PartnershipEndMessage />}
      </div>
    </section>
  );
}
