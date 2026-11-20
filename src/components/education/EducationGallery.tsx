"use client";

import {
  useState,
  useEffect,
  useRef,
  useCallback,
  useReducer,
} from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Pause, Play, Maximize2 } from "lucide-react";
import { createPortal } from "react-dom";
import type { EducationEventImage } from "@/types/education";
import { urlFor } from "@/sanity/image";
import EducationLightbox from "./EducationLightbox";

interface Props {
  images: EducationEventImage[];
  /** Unique event ID — used to scope gallery state */
  eventId: string;
}

const AUTOPLAY_INTERVAL = 4500;

// ─── Reducer keeps gallery state strictly local ───────────────────────────────

type GalleryAction =
  | { type: "PREV" }
  | { type: "NEXT" }
  | { type: "GOTO"; index: number }
  | { type: "TOGGLE_PLAY" }
  | { type: "PAUSE" }
  | { type: "OPEN_LIGHTBOX"; index: number }
  | { type: "CLOSE_LIGHTBOX" };

interface GalleryState {
  current: number;
  playing: boolean;
  lightboxOpen: boolean;
  lightboxIndex: number;
}

function galleryReducer(
  state: GalleryState,
  action: GalleryAction,
  total: number
): GalleryState {
  switch (action.type) {
    case "PREV":
      return {
        ...state,
        current: (state.current - 1 + total) % total,
        playing: false,
      };
    case "NEXT":
      return { ...state, current: (state.current + 1) % total };
    case "GOTO":
      return { ...state, current: action.index, playing: false };
    case "TOGGLE_PLAY":
      return { ...state, playing: !state.playing };
    case "PAUSE":
      return { ...state, playing: false };
    case "OPEN_LIGHTBOX":
      return {
        ...state,
        lightboxOpen: true,
        lightboxIndex: action.index,
        playing: false,
      };
    case "CLOSE_LIGHTBOX":
      return { ...state, lightboxOpen: false };
    default:
      return state;
  }
}

export default function EducationGallery({ images, eventId }: Props) {
  const total = images.length;

  const [state, rawDispatch] = useReducer(
    (s: GalleryState, a: GalleryAction) => galleryReducer(s, a, total),
    {
      current: 0,
      playing: total > 1,
      lightboxOpen: false,
      lightboxIndex: 0,
    }
  );

  const dispatch = rawDispatch;

  // Ref for the section — used for IntersectionObserver to pause when off-screen
  const sectionRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Touch gesture tracking
  const touchStartX = useRef<number | null>(null);

  // Reduced-motion preference
  const prefersReducedMotion =
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false;

  // Autoplay
  const startAutoplay = useCallback(() => {
    if (total <= 1 || prefersReducedMotion) return;
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      dispatch({ type: "NEXT" });
    }, AUTOPLAY_INTERVAL);
  }, [total, prefersReducedMotion, dispatch]);

  const stopAutoplay = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (state.playing && !state.lightboxOpen) {
      startAutoplay();
    } else {
      stopAutoplay();
    }
    return stopAutoplay;
  }, [state.playing, state.lightboxOpen, startAutoplay, stopAutoplay]);

  // Pause when scrolled out of view
  useEffect(() => {
    if (total <= 1) return;
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) dispatch({ type: "PAUSE" });
      },
      { threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [total, dispatch]);

  // Touch handlers
  function handleTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
  }

  function handleTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(delta) < 40) return;
    if (delta < 0) {
      dispatch({ type: "NEXT" });
      dispatch({ type: "PAUSE" });
    } else {
      dispatch({ type: "PREV" });
    }
  }

  if (total === 0) return null;

  const current = images[state.current];
  if (!current?.asset?._ref) return null;

  // Pass the asset reference object — @sanity/image-url needs _ref to build the CDN URL
  const primaryUrl = urlFor(current.asset)
    .width(900)
    .height(600)
    .fit("crop")
    .auto("format")
    .quality(85)
    .url();

  // lqip is now at the image level, not nested inside asset
  const lqip = current.lqip ?? undefined;

  return (
    <>
      <div
        ref={sectionRef}
        className="relative w-full h-full select-none flex flex-col"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        aria-label={`Image gallery — ${total} image${total !== 1 ? "s" : ""}`}
      >
        {/* Primary image — min-height locks in a floor; actual height grows to fill the column */}
        <div className="relative w-full overflow-hidden bg-sand flex-1" style={{ minHeight: "240px" }}>
          <Image
            key={`${eventId}-${state.current}`}
            src={primaryUrl}
            alt={current.alt || "Event photograph"}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            placeholder={lqip ? "blur" : "empty"}
            blurDataURL={lqip}
            loading="lazy"
          />

          {/* Top-right controls overlay */}
          <div className="absolute top-3 right-3 flex items-center gap-2 z-10">
            {/* Counter */}
            {total > 1 && (
              <span className="bg-charcoal/70 text-warm-white font-sans text-[10px] px-2 py-1 backdrop-blur-sm">
                {state.current + 1} / {total}
              </span>
            )}

            {/* Lightbox expand */}
            <button
              onClick={() =>
                dispatch({ type: "OPEN_LIGHTBOX", index: state.current })
              }
              aria-label="Open image in full screen"
              className="w-8 h-8 flex items-center justify-center bg-charcoal/70 text-warm-white hover:bg-charcoal/90 transition-colors backdrop-blur-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-warm-white/50"
            >
              <Maximize2 size={13} />
            </button>
          </div>

          {/* Caption overlay at bottom */}
          {current.caption && (
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-charcoal/60 to-transparent pt-6 pb-3 px-3">
              <p className="font-sans text-[11px] text-warm-white/90">
                {current.caption}
              </p>
            </div>
          )}
        </div>

        {/* Controls bar */}
        {total > 1 && (
          <div className="flex items-center justify-between mt-0 bg-sand/60 border-t border-sand-dark/40 px-3 py-2">
            {/* Prev / play / next */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => dispatch({ type: "PREV" })}
                aria-label="Previous image"
                className="w-7 h-7 flex items-center justify-center text-charcoal hover:text-forest transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-forest/40"
              >
                <ChevronLeft size={16} />
              </button>

              {!prefersReducedMotion && (
                <button
                  onClick={() => dispatch({ type: "TOGGLE_PLAY" })}
                  aria-label={state.playing ? "Pause autoplay" : "Resume autoplay"}
                  className="w-7 h-7 flex items-center justify-center text-charcoal hover:text-forest transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-forest/40"
                >
                  {state.playing ? <Pause size={12} /> : <Play size={12} />}
                </button>
              )}

              <button
                onClick={() => dispatch({ type: "NEXT" })}
                aria-label="Next image"
                className="w-7 h-7 flex items-center justify-center text-charcoal hover:text-forest transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-forest/40"
              >
                <ChevronRight size={16} />
              </button>
            </div>

            {/* Dot navigation */}
            {total <= 8 && (
              <div className="flex items-center gap-1.5" role="tablist">
                {images.map((_, i) => (
                  <button
                    key={i}
                    role="tab"
                    aria-selected={i === state.current}
                    aria-label={`Go to image ${i + 1}`}
                    onClick={() => dispatch({ type: "GOTO", index: i })}
                    className={`w-1.5 h-1.5 rounded-full transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-forest/50 ${
                      i === state.current
                        ? "bg-forest scale-125"
                        : "bg-charcoal-muted/40 hover:bg-charcoal-muted"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Lightbox — rendered in a portal to escape layout constraints */}
      {state.lightboxOpen &&
        typeof document !== "undefined" &&
        createPortal(
          <EducationLightbox
            images={images}
            currentIndex={state.lightboxIndex}
            onClose={() => dispatch({ type: "CLOSE_LIGHTBOX" })}
            onPrev={() =>
              dispatch({
                type: "OPEN_LIGHTBOX",
                index: (state.lightboxIndex - 1 + total) % total,
              })
            }
            onNext={() =>
              dispatch({
                type: "OPEN_LIGHTBOX",
                index: (state.lightboxIndex + 1) % total,
              })
            }
          />,
          document.body
        )}
    </>
  );
}
