"use client";

/**
 * InitiativeMediaSlider
 * ---------------------
 * Unified media slider for initiative event timelines.
 * Slots: [video_0, video_1, …, image_0, image_1, …]
 * - Videos play inline (HTML5 <video>) with native controls + autoplay muted loop.
 * - Images use next/image WITHOUT loading="lazy" (Next.js handles priority by position).
 * - Autoplay advances between slides every 5 s; pauses when out of viewport.
 * - Prev/Next arrows, dot indicators (max 10), slide counter.
 * - Lightbox on images (not videos — browser fullscreen covers that).
 */

import {
  useCallback,
  useEffect,
  useReducer,
  useRef,
} from "react";
import Image from "next/image";
import { createPortal } from "react-dom";
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Pause,
  Play,
  Video,
} from "lucide-react";
import type { InitiativeVideo, MediaCoverageItem } from "@/types/media";
import type { InitiativeEventImage } from "@/types/culture-sports";
import { urlFor } from "@/sanity/image";

// ── Types ──────────────────────────────────────────────────────────────────

type SlideKind = "video" | "image";

interface VideoSlide {
  kind: "video";
  key: string;
  url: string;
  title?: string;
  caption?: string;
  posterUrl?: string;
  posterLqip?: string;
}

interface ImageSlide {
  kind: "image";
  key: string;
  asset: { _ref: string; _type: string };
  alt: string;
  caption?: string;
  lqip?: string;
}

type Slide = VideoSlide | ImageSlide;

type Action =
  | { type: "PREV" }
  | { type: "NEXT" }
  | { type: "GOTO"; index: number }
  | { type: "TOGGLE_PLAY" }
  | { type: "PAUSE" }
  | { type: "OPEN_LIGHTBOX"; index: number }
  | { type: "CLOSE_LIGHTBOX" };

interface State {
  current: number;
  playing: boolean;
  lightboxOpen: boolean;
  lightboxIndex: number;
}

function reducer(s: State, a: Action, total: number): State {
  switch (a.type) {
    case "PREV":           return { ...s, current: (s.current - 1 + total) % total, playing: false };
    case "NEXT":           return { ...s, current: (s.current + 1) % total };
    case "GOTO":           return { ...s, current: a.index, playing: false };
    case "TOGGLE_PLAY":    return { ...s, playing: !s.playing };
    case "PAUSE":          return { ...s, playing: false };
    case "OPEN_LIGHTBOX":  return { ...s, lightboxOpen: true, lightboxIndex: a.index, playing: false };
    case "CLOSE_LIGHTBOX": return { ...s, lightboxOpen: false };
    default:               return s;
  }
}

const AUTOPLAY_MS = 5000;

// ── Helpers ────────────────────────────────────────────────────────────────

function buildSlides(
  videos: InitiativeVideo[] | undefined,
  images: InitiativeEventImage[] | undefined
): Slide[] {
  const videoSlides: VideoSlide[] = (videos ?? [])
    .filter((v) => v.url)
    .map((v) => ({
      kind: "video",
      key: v._key,
      url: v.url,
      title: v.title,
      caption: v.caption,
      posterUrl: v.posterUrl,
      posterLqip: v.posterLqip,
    }));

  const imageSlides: ImageSlide[] = (images ?? [])
    .filter((img) => img.asset?._ref)
    .map((img) => ({
      kind: "image",
      key: img._key,
      asset: img.asset,
      alt: img.alt,
      caption: img.caption,
      lqip: img.lqip,
    }));

  return [...videoSlides, ...imageSlides];
}

// ── Lightbox ───────────────────────────────────────────────────────────────

function ImageLightbox({
  slides,
  index,
  onClose,
  onPrev,
  onNext,
}: {
  slides: ImageSlide[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const slide = slides[index];
  const src = urlFor(slide.asset).width(1600).fit("max").auto("format").quality(90).url();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handler);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handler);
    };
  }, [onClose, onPrev, onNext]);

  return (
    <div
      className="fixed inset-0 z-[9999] bg-charcoal/95 flex flex-col items-center justify-center p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative max-w-5xl w-full max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          aria-label="Close lightbox"
          className="absolute -top-10 right-0 text-warm-white/70 hover:text-warm-white font-sans text-[11px] uppercase tracking-widest flex items-center gap-2 transition-colors"
        >
          Close ✕
        </button>

        {/* Image */}
        <div className="relative w-full" style={{ aspectRatio: "16/10" }}>
          <Image
            src={src}
            alt={slide.alt || "Event photograph"}
            fill
            sizes="100vw"
            className="object-contain"
            placeholder={slide.lqip ? "blur" : "empty"}
            blurDataURL={slide.lqip}
          />
        </div>

        {/* Caption + nav */}
        <div className="flex items-center justify-between mt-3 gap-4">
          <p className="font-sans text-xs text-warm-white/60 leading-relaxed flex-1">
            {slide.caption || slide.alt}
          </p>
          {slides.length > 1 && (
            <div className="flex items-center gap-3 flex-shrink-0">
              <button onClick={onPrev} aria-label="Previous" className="w-8 h-8 border border-warm-white/20 flex items-center justify-center text-warm-white/70 hover:text-warm-white hover:border-warm-white/50 transition-colors">
                <ChevronLeft size={16} />
              </button>
              <span className="font-sans text-[11px] text-warm-white/50">{index + 1} / {slides.length}</span>
              <button onClick={onNext} aria-label="Next" className="w-8 h-8 border border-warm-white/20 flex items-center justify-center text-warm-white/70 hover:text-warm-white hover:border-warm-white/50 transition-colors">
                <ChevronRight size={16} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────

interface Props {
  videos?: InitiativeVideo[];
  images?: InitiativeEventImage[];
  eventId: string;
  layout?: "desktop" | "mobile";
}

export default function InitiativeMediaSlider({
  videos,
  images,
  eventId,
  layout = "mobile",
}: Props) {
  const slides = buildSlides(videos, images);
  const total = slides.length;

  const [state, rawDispatch] = useReducer(
    (s: State, a: Action) => reducer(s, a, total),
    { current: 0, playing: total > 1, lightboxOpen: false, lightboxIndex: 0 }
  );
  const dispatch = rawDispatch;

  const containerRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const touchStartX = useRef<number | null>(null);

  const prefersReduced =
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false;

  const startAutoplay = useCallback(() => {
    if (total <= 1 || prefersReduced) return;
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => dispatch({ type: "NEXT" }), AUTOPLAY_MS);
  }, [total, prefersReduced]);

  const stopAutoplay = useCallback(() => {
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
  }, []);

  // Start/stop timer based on play state
  useEffect(() => {
    if (state.playing && !state.lightboxOpen) startAutoplay();
    else stopAutoplay();
    return stopAutoplay;
  }, [state.playing, state.lightboxOpen, startAutoplay, stopAutoplay]);

  // Pause when scrolled out of view
  useEffect(() => {
    if (total <= 1) return;
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (!e.isIntersecting) dispatch({ type: "PAUSE" }); },
      { threshold: 0 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [total]);

  // When switching away from a video slide, pause the video element
  useEffect(() => {
    if (videoRef.current) videoRef.current.pause();
  }, [state.current]);

  function onTouchStart(e: React.TouchEvent) { touchStartX.current = e.touches[0].clientX; }
  function onTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(delta) < 40) return;
    dispatch({ type: delta < 0 ? "NEXT" : "PREV" });
    if (delta > 0) dispatch({ type: "PAUSE" });
  }

  if (total === 0) return null;

  const slide = slides[state.current];
  const isVideo = slide.kind === "video";

  // Collect only image slides for the lightbox
  const imageSlides = slides.filter((s): s is ImageSlide => s.kind === "image");
  // Map global slide index → image-only index
  const imageSlideIndex = isVideo
    ? 0
    : imageSlides.findIndex((s) => s.key === slide.key);

  return (
    <>
      <div
        ref={containerRef}
        className={[
          "select-none w-full",
          layout === "desktop" ? "h-full flex flex-col" : "flex flex-col",
        ].join(" ")}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        aria-label={`Media slider — ${total} item${total !== 1 ? "s" : ""}`}
      >
        {/* ── Slide area ── */}
        <div
          className={[
            "relative overflow-hidden bg-charcoal",
            layout === "desktop" ? "flex-1 min-h-[200px]" : "w-full aspect-[16/9]",
          ].join(" ")}
        >
          {isVideo ? (
            /* ── Video slide ── */
            <video
              ref={videoRef}
              key={`${eventId}-video-${state.current}`}
              src={(slide as VideoSlide).url}
              poster={(slide as VideoSlide).posterUrl}
              autoPlay
              muted
              loop
              playsInline
              controls
              className="w-full h-full object-contain bg-charcoal"
              aria-label={(slide as VideoSlide).title ?? "Event video"}
            />
          ) : (
            /* ── Image slide ── */
            <Image
              key={`${eventId}-img-${state.current}`}
              src={urlFor((slide as ImageSlide).asset)
                .width(1200)
                .fit("max")
                .auto("format")
                .quality(85)
                .url()}
              alt={(slide as ImageSlide).alt || "Event photograph"}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-contain"
              placeholder={(slide as ImageSlide).lqip ? "blur" : "empty"}
              blurDataURL={(slide as ImageSlide).lqip}
            />
          )}

          {/* ── Top-right controls ── */}
          <div className="absolute top-3 right-3 flex items-center gap-2 z-10">
            {/* Slide type badge for videos */}
            {isVideo && (
              <span className="bg-terracotta/90 text-warm-white font-sans text-[10px] px-2 py-1 flex items-center gap-1 backdrop-blur-sm uppercase tracking-widest">
                <Video size={9} /> Video
              </span>
            )}
            {total > 1 && (
              <span className="bg-charcoal/70 text-warm-white font-sans text-[10px] px-2 py-1 backdrop-blur-sm">
                {state.current + 1} / {total}
              </span>
            )}
            {/* Lightbox button — images only */}
            {!isVideo && (
              <button
                onClick={() =>
                  dispatch({ type: "OPEN_LIGHTBOX", index: imageSlideIndex })
                }
                aria-label="Open in full screen"
                className="w-8 h-8 flex items-center justify-center bg-charcoal/70 text-warm-white hover:bg-charcoal/90 transition-colors backdrop-blur-sm"
              >
                <Maximize2 size={13} />
              </button>
            )}
          </div>

          {/* ── Caption overlay ── */}
          {slide.caption && (
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-charcoal/70 to-transparent pt-8 pb-3 px-3 z-10 pointer-events-none">
              <p className="font-sans text-[11px] text-warm-white/90">
                {slide.caption}
              </p>
            </div>
          )}
        </div>

        {/* ── Control bar ── */}
        {total > 1 && (
          <div className="flex-shrink-0 flex items-center justify-between bg-sand/60 border-t border-sand-dark/40 px-3 py-2">
            <div className="flex items-center gap-1">
              <button
                onClick={() => dispatch({ type: "PREV" })}
                aria-label="Previous"
                className="w-7 h-7 flex items-center justify-center text-charcoal hover:text-forest transition-colors"
              >
                <ChevronLeft size={16} />
              </button>
              {!prefersReduced && (
                <button
                  onClick={() => dispatch({ type: "TOGGLE_PLAY" })}
                  aria-label={state.playing ? "Pause" : "Resume autoplay"}
                  className="w-7 h-7 flex items-center justify-center text-charcoal hover:text-forest transition-colors"
                >
                  {state.playing ? <Pause size={12} /> : <Play size={12} />}
                </button>
              )}
              <button
                onClick={() => dispatch({ type: "NEXT" })}
                aria-label="Next"
                className="w-7 h-7 flex items-center justify-center text-charcoal hover:text-forest transition-colors"
              >
                <ChevronRight size={16} />
              </button>
            </div>

            {/* Dot strip — max 10 dots */}
            {total <= 10 && (
              <div className="flex items-center gap-1.5" role="tablist">
                {slides.map((s, i) => (
                  <button
                    key={s.key}
                    role="tab"
                    aria-selected={i === state.current}
                    aria-label={`Go to slide ${i + 1}`}
                    onClick={() => dispatch({ type: "GOTO", index: i })}
                    className={[
                      "transition-all",
                      s.kind === "video"
                        ? `w-2.5 h-2 ${i === state.current ? "bg-terracotta" : "bg-terracotta/30 hover:bg-terracotta/60"}`
                        : `w-1.5 h-1.5 rounded-full ${i === state.current ? "bg-forest scale-125" : "bg-charcoal-muted/40 hover:bg-charcoal-muted"}`,
                    ].join(" ")}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* ── Lightbox portal ── */}
      {state.lightboxOpen &&
        imageSlides.length > 0 &&
        typeof window !== "undefined" &&
        createPortal(
          <ImageLightbox
            slides={imageSlides}
            index={state.lightboxIndex}
            onClose={() => dispatch({ type: "CLOSE_LIGHTBOX" })}
            onPrev={() =>
              dispatch({
                type: "OPEN_LIGHTBOX",
                index: (state.lightboxIndex - 1 + imageSlides.length) % imageSlides.length,
              })
            }
            onNext={() =>
              dispatch({
                type: "OPEN_LIGHTBOX",
                index: (state.lightboxIndex + 1) % imageSlides.length,
              })
            }
          />,
          document.body
        )}
    </>
  );
}
