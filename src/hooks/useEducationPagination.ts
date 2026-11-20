"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { fetchMoreEducationEvents } from "@/sanity/queries/education";
import type { EducationEvent, PaginationCursor } from "@/types/education";

interface Options {
  /** Events already fetched server-side for the initial render. */
  initialEvents: EducationEvent[];
  initialHasMore: boolean;
  initialCursor: PaginationCursor | null;
}

interface PaginationState {
  events: EducationEvent[];
  hasMore: boolean;
  isLoading: boolean;
  error: string | null;
}

/**
 * Manages client-side cursor pagination for the education timeline.
 *
 * Trigger element: the (batchStart + 3)th event in the latest batch
 * (i.e., the 4th event of a 5-event page, 0-indexed = index 3 within the batch).
 *
 * When that element enters the viewport, the next batch is fetched and appended.
 * Global alternation index is preserved because we never reset the events array.
 */
export function useEducationPagination({
  initialEvents,
  initialHasMore,
  initialCursor,
}: Options): PaginationState & {
  /** Attach this ref to the DOM element that should trigger the next fetch. */
  triggerRef: React.RefObject<HTMLDivElement | null>;
  retry: () => void;
} {
  const [events, setEvents] = useState<EducationEvent[]>(initialEvents);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [cursor, setCursor] = useState<PaginationCursor | null>(initialCursor);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Guard against concurrent fetches
  const isFetchingRef = useRef(false);
  // Track whether we have already set up an observer for the current trigger
  const observerRef = useRef<IntersectionObserver | null>(null);
  // The DOM element we want to watch
  const triggerRef = useRef<HTMLDivElement | null>(null);

  const loadMore = useCallback(async () => {
    if (!hasMore || !cursor || isFetchingRef.current) return;

    isFetchingRef.current = true;
    setIsLoading(true);
    setError(null);

    try {
      const result = await fetchMoreEducationEvents(cursor);

      setEvents((prev) => {
        // Deduplicate by _id — guard against double-fetches
        const existingIds = new Set(prev.map((e) => e._id));
        const fresh = result.events.filter((e) => !existingIds.has(e._id));
        return [...prev, ...fresh];
      });
      setHasMore(result.hasMore);
      setCursor(result.cursor);
    } catch {
      setError("Failed to load more events. Please try again.");
    } finally {
      setIsLoading(false);
      isFetchingRef.current = false;
    }
  }, [hasMore, cursor]);

  // Re-observe whenever the trigger element or hasMore/isLoading state changes
  useEffect(() => {
    // Disconnect any previous observer
    if (observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = null;
    }

    if (!hasMore || isLoading || !triggerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          // Disconnect immediately — loadMore will re-attach after the new
          // trigger element is rendered
          observer.disconnect();
          observerRef.current = null;
          loadMore();
        }
      },
      { rootMargin: "200px" } // start fetch slightly before the element is visible
    );

    observer.observe(triggerRef.current);
    observerRef.current = observer;

    // Also fire immediately if already in viewport (e.g., short page)
    const rect = triggerRef.current.getBoundingClientRect();
    if (rect.top < window.innerHeight + 200) {
      observer.disconnect();
      observerRef.current = null;
      loadMore();
    }

    return () => {
      observer.disconnect();
    };
  }, [
    // Re-run when: a new batch lands (events.length changes), hasMore changes,
    // loading state resolves, or the cursor advances
    events.length,
    hasMore,
    isLoading,
    loadMore,
  ]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, []);

  const retry = useCallback(() => {
    setError(null);
    loadMore();
  }, [loadMore]);

  return { events, hasMore, isLoading, error, triggerRef, retry };
}
