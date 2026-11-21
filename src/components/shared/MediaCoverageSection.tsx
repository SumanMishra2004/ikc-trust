"use client";

/**
 * MediaCoverageSection
 * --------------------
 * Renders a grid of media coverage items for an initiative event.
 * Each item is either:
 *   - "image" → photograph / newspaper clipping shown via next/image
 *   - "youtube" → responsive 16:9 iframe embed
 * Both have a title, optional description, source badge, and coverage date.
 *
 * Design: matches the site palette (ivory / forest / terracotta / sand).
 * No lazy loading attribute on <Image> — Next.js handles priority natively.
 */

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView } from "motion/react";
import { Calendar, ExternalLink, Newspaper, Youtube } from "lucide-react";
import type { MediaCoverageItem } from "@/types/media";

// ── YouTube ID helper ──────────────────────────────────────────────────────

function extractYouTubeId(url: string): string | null {
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtube.com")) {
      return u.searchParams.get("v");
    }
    if (u.hostname === "youtu.be") {
      return u.pathname.slice(1).split("?")[0];
    }
  } catch {
    // malformed url
  }
  return null;
}

// ── Date formatter ─────────────────────────────────────────────────────────

function formatDate(iso: string) {
  return new Date(iso + "T00:00:00").toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

// ── Single card ────────────────────────────────────────────────────────────

function CoverageCard({
  item,
  index,
}: {
  item: MediaCoverageItem;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [imgError, setImgError] = useState(false);

  const isYoutube = item.type === "youtube";
  const youtubeId = isYoutube && item.youtubeUrl
    ? extractYouTubeId(item.youtubeUrl)
    : null;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: (index % 3) * 0.08 }}
      className="group bg-warm-white border border-sand-dark flex flex-col overflow-hidden hover:shadow-[0_6px_28px_rgba(36,75,60,0.1)] transition-shadow duration-300"
    >
      {/* ── Media area ── */}
      <div className="relative w-full overflow-hidden bg-sand">
        {isYoutube ? (
          youtubeId ? (
            /* YouTube iframe — 16:9 */
            <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${youtubeId}?rel=0&modestbranding=1`}
                title={item.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full border-0"
                loading="lazy"
              />
            </div>
          ) : (
            /* Bad URL fallback */
            <div className="w-full aspect-video flex items-center justify-center bg-sand border-b border-sand-dark/40">
              <span className="font-sans text-[11px] text-charcoal-muted/50 uppercase tracking-widest">
                Invalid YouTube URL
              </span>
            </div>
          )
        ) : (
          /* Image coverage */
          item.imageUrl && !imgError ? (
            <div className="relative w-full aspect-[4/3] overflow-hidden">
              <Image
                src={item.imageUrl}
                alt={item.imageAlt || item.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                placeholder={item.imageLqip ? "blur" : "empty"}
                blurDataURL={item.imageLqip}
                onError={() => setImgError(true)}
              />
              {/* Forest tint on hover */}
              <div className="absolute inset-0 bg-forest/0 group-hover:bg-forest/10 transition-colors duration-500" />
            </div>
          ) : (
            <div className="w-full aspect-[4/3] flex items-center justify-center bg-sand border-b border-sand-dark/40">
              <Newspaper size={28} className="text-charcoal-muted/30" />
            </div>
          )
        )}
      </div>

      {/* ── Content ── */}
      <div className="flex flex-col flex-1 p-5">
        {/* Type + source badge row */}
        <div className="flex items-center gap-2 mb-3">
          <span
            className={[
              "inline-flex items-center gap-1.5 text-[10px] font-sans uppercase tracking-[0.2em] font-semibold px-2 py-1",
              isYoutube
                ? "bg-terracotta/10 text-terracotta border border-terracotta/20"
                : "bg-forest/8 text-forest border border-forest/20",
            ].join(" ")}
          >
            {isYoutube ? <Youtube size={9} /> : <Newspaper size={9} />}
            {isYoutube ? "Video" : "Press"}
          </span>
          {item.source && (
            <span className="text-[10px] font-sans text-charcoal-muted/60 uppercase tracking-widest truncate">
              {item.source}
            </span>
          )}
        </div>

        {/* Title */}
        <h4 className="font-serif text-base sm:text-lg text-charcoal leading-snug mb-2 group-hover:text-forest transition-colors duration-200">
          {item.title}
        </h4>

        {/* Description */}
        {item.description && (
          <p className="font-sans text-body-sm text-charcoal-muted leading-relaxed mb-3 flex-1">
            {item.description}
          </p>
        )}

        {/* Footer row */}
        <div className="mt-auto pt-3 border-t border-sand-dark/50 flex items-center justify-between gap-2">
          {item.coverageDate ? (
            <span className="flex items-center gap-1.5 text-[10px] font-sans text-charcoal-muted/60 uppercase tracking-widest">
              <Calendar size={10} />
              {formatDate(item.coverageDate)}
            </span>
          ) : (
            <span />
          )}
          {isYoutube && item.youtubeUrl && (
            <a
              href={item.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open on YouTube"
              className="flex items-center gap-1 text-[10px] font-sans font-semibold text-terracotta hover:text-terracotta-dark uppercase tracking-widest transition-colors"
            >
              Watch <ExternalLink size={9} />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// ── Section ────────────────────────────────────────────────────────────────

interface Props {
  items: MediaCoverageItem[];
  accentColor?: string; // tailwind text class — defaults to terracotta
}

export default function MediaCoverageSection({ items }: Props) {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-40px" });

  if (!items || items.length === 0) return null;

  return (
    <div className="mt-10 pt-8 border-t border-sand-dark/40">
      {/* Section eyebrow */}
      <div ref={headerRef}>
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          animate={headerInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-6"
        >
          <span className="w-6 h-[2px] bg-terracotta flex-shrink-0" />
          <span className="text-[10px] font-sans uppercase tracking-[0.25em] text-terracotta font-semibold">
            Media Coverage
          </span>
          <span className="text-[10px] font-sans text-charcoal-muted/40 uppercase tracking-widest">
            {items.length} item{items.length !== 1 ? "s" : ""}
          </span>
        </motion.div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {items.map((item, i) => (
          <CoverageCard key={item._key} item={item} index={i} />
        ))}
      </div>
    </div>
  );
}
