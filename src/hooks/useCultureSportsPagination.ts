"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { fetchMoreCultureSportsEvents } from "@/sanity/queries/culture-sports";
import type { CultureSportsEvent, PaginationCursor } from "@/types/culture-sports";

interface Options {
  initialEvents: CultureSportsEvent[];
  initialHasMore: boolean;
  initialCursor: PaginationCursor | null;
}

interface PaginationState {
  events: CultureSportsEvent[];
  hasMore: boolean;
  isLoading: boolean;
  error: string | null;
}

export function useCultureSportsPagination({
  initialEvents,
  initialHasMore,
  initialCursor,
}: Options): PaginationState & {
  triggerRef: React.RefObject<HTMLDivElement | null>;
  retry: () => void;
} {
  const [events, setEvents] = useState<CultureSportsEvent[]>(initialEvents);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [cursor, setCursor] = useState<PaginationCursor | null>(initialCursor);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isFetchingRef = useRef(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const triggerRef = useRef<HTMLDivElement | null>(null);

  const loadMore = useCallback(async () => {
    if (!hasMore || !cursor || isFetchingRef.current) return;
    isFetchingRef.current = true;
    setIsLoading(true);
    setError(null);
    try {
      const result = await fetchMoreCultureSportsEvents(cursor);
      setEvents((prev) => {
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

  useEffect(() => {
    if (observerRef.current) { observerRef.current.disconnect(); observerRef.current = null; }
    if (!hasMore || isLoading || !triggerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          observer.disconnect();
          observerRef.current = null;
          loadMore();
        }
      },
      { rootMargin: "200px" }
    );
    observer.observe(triggerRef.current);
    observerRef.current = observer;

    const rect = triggerRef.current.getBoundingClientRect();
    if (rect.top < window.innerHeight + 200) {
      observer.disconnect();
      observerRef.current = null;
      loadMore();
    }
    return () => { observer.disconnect(); };
  }, [events.length, hasMore, isLoading, loadMore]);

  useEffect(() => {
    return () => { if (observerRef.current) observerRef.current.disconnect(); };
  }, []);

  const retry = useCallback(() => { setError(null); loadMore(); }, [loadMore]);

  return { events, hasMore, isLoading, error, triggerRef, retry };
}
