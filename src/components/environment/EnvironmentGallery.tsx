"use client";

import { useEffect, useRef, useCallback, useReducer } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Pause, Play, Maximize2 } from "lucide-react";
import { createPortal } from "react-dom";
import type { InitiativeEventImage } from "@/types/environment";
import { urlFor } from "@/sanity/image";
import EnvironmentLightbox from "./EnvironmentLightbox";

interface Props {
  images: InitiativeEventImage[];
  eventId: string;
  layout?: "desktop" | "mobile";
}

const AUTOPLAY_INTERVAL = 4500;

type GalleryAction = { type: "PREV" } | { type: "NEXT" } | { type: "GOTO"; index: number } | { type: "TOGGLE_PLAY" } | { type: "PAUSE" } | { type: "OPEN_LIGHTBOX"; index: number } | { type: "CLOSE_LIGHTBOX" };
interface GalleryState { current: number; playing: boolean; lightboxOpen: boolean; lightboxIndex: number; }

function galleryReducer(state: GalleryState, action: GalleryAction, total: number): GalleryState {
  switch (action.type) {
    case "PREV": return { ...state, current: (state.current - 1 + total) % total, playing: false };
    case "NEXT": return { ...state, current: (state.current + 1) % total };
    case "GOTO": return { ...state, current: action.index, playing: false };
    case "TOGGLE_PLAY": return { ...state, playing: !state.playing };
    case "PAUSE": return { ...state, playing: false };
    case "OPEN_LIGHTBOX": return { ...state, lightboxOpen: true, lightboxIndex: action.index, playing: false };
    case "CLOSE_LIGHTBOX": return { ...state, lightboxOpen: false };
    default: return state;
  }
}

export default function EnvironmentGallery({ images, eventId, layout = "mobile" }: Props) {
  const total = images.length;
  const [state, rawDispatch] = useReducer(
    (s: GalleryState, a: GalleryAction) => galleryReducer(s, a, total),
    { current: 0, playing: total > 1, lightboxOpen: false, lightboxIndex: 0 }
  );
  const dispatch = rawDispatch;
  const sectionRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const touchStartX = useRef<number | null>(null);
  const prefersReducedMotion = typeof window !== "undefined" ? window.matchMedia("(prefers-reduced-motion: reduce)").matches : false;

  const startAutoplay = useCallback(() => {
    if (total <= 1 || prefersReducedMotion) return;
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => dispatch({ type: "NEXT" }), AUTOPLAY_INTERVAL);
  }, [total, prefersReducedMotion]);

  const stopAutoplay = useCallback(() => { if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; } }, []);

  useEffect(() => {
    if (state.playing && !state.lightboxOpen) startAutoplay(); else stopAutoplay();
    return stopAutoplay;
  }, [state.playing, state.lightboxOpen, startAutoplay, stopAutoplay]);

  useEffect(() => {
    if (total <= 1) return;
    const el = sectionRef.current; if (!el) return;
    const observer = new IntersectionObserver(([entry]) => { if (!entry.isIntersecting) dispatch({ type: "PAUSE" }); }, { threshold: 0 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [total]);

  function handleTouchStart(e: React.TouchEvent) { touchStartX.current = e.touches[0].clientX; }
  function handleTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(delta) < 40) return;
    dispatch({ type: delta < 0 ? "NEXT" : "PREV" });
    if (delta > 0) dispatch({ type: "PAUSE" });
  }

  if (total === 0) return null;
  const current = images[state.current];
  if (!current?.asset?._ref) return null;
  const src = urlFor(current.asset).width(1200).fit("max").auto("format").quality(85).url();
  const lqip = current.lqip ?? undefined;

  return (
    <>
      <div ref={sectionRef} className={["select-none w-full", layout === "desktop" ? "h-full flex flex-col" : "flex flex-col"].join(" ")} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd} aria-label={`Image gallery — ${total} image${total !== 1 ? "s" : ""}`}>
        <div className={["relative overflow-hidden bg-sand", layout === "desktop" ? "flex-1 min-h-[200px]" : "w-full aspect-[4/3]"].join(" ")}>
          <Image key={`${eventId}-${state.current}`} src={src} alt={current.alt || "Event photograph"} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-contain" placeholder={lqip ? "blur" : "empty"} blurDataURL={lqip} loading="lazy" />
          <div className="absolute top-3 right-3 flex items-center gap-2 z-10">
            {total > 1 && <span className="bg-charcoal/70 text-warm-white font-sans text-[10px] px-2 py-1 backdrop-blur-sm">{state.current + 1} / {total}</span>}
            <button onClick={() => dispatch({ type: "OPEN_LIGHTBOX", index: state.current })} aria-label="Open image in full screen" className="w-8 h-8 flex items-center justify-center bg-charcoal/70 text-warm-white hover:bg-charcoal/90 transition-colors backdrop-blur-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-warm-white/50"><Maximize2 size={13} /></button>
          </div>
          {current.caption && <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-charcoal/60 to-transparent pt-6 pb-3 px-3 z-10"><p className="font-sans text-[11px] text-warm-white/90">{current.caption}</p></div>}
        </div>
        {total > 1 && (
          <div className="flex-shrink-0 flex items-center justify-between bg-sand/60 border-t border-sand-dark/40 px-3 py-2">
            <div className="flex items-center gap-1">
              <button onClick={() => dispatch({ type: "PREV" })} aria-label="Previous image" className="w-7 h-7 flex items-center justify-center text-charcoal hover:text-forest transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-forest/40"><ChevronLeft size={16} /></button>
              {!prefersReducedMotion && <button onClick={() => dispatch({ type: "TOGGLE_PLAY" })} aria-label={state.playing ? "Pause autoplay" : "Resume autoplay"} className="w-7 h-7 flex items-center justify-center text-charcoal hover:text-forest transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-forest/40">{state.playing ? <Pause size={12} /> : <Play size={12} />}</button>}
              <button onClick={() => dispatch({ type: "NEXT" })} aria-label="Next image" className="w-7 h-7 flex items-center justify-center text-charcoal hover:text-forest transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-forest/40"><ChevronRight size={16} /></button>
            </div>
            {total <= 8 && <div className="flex items-center gap-1.5" role="tablist">{images.map((_, i) => <button key={i} role="tab" aria-selected={i === state.current} aria-label={`Go to image ${i + 1}`} onClick={() => dispatch({ type: "GOTO", index: i })} className={`w-1.5 h-1.5 rounded-full transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-forest/50 ${i === state.current ? "bg-forest scale-125" : "bg-charcoal-muted/40 hover:bg-charcoal-muted"}`} />)}</div>}
          </div>
        )}
      </div>
      {state.lightboxOpen && typeof window !== "undefined" && createPortal(
        <EnvironmentLightbox images={images} currentIndex={state.lightboxIndex} onClose={() => dispatch({ type: "CLOSE_LIGHTBOX" })} onPrev={() => dispatch({ type: "GOTO", index: (state.lightboxIndex - 1 + total) % total })} onNext={() => dispatch({ type: "GOTO", index: (state.lightboxIndex + 1) % total })} />,
        document.body
      )}
    </>
  );
}
