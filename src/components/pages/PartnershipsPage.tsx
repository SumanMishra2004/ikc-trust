"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import {
  MapPin, Clock, Target, CalendarDays, Sparkles,
  ChevronDown, ChevronUp, ArrowRight,
} from "lucide-react";
import Image from "next/image";
import type { PartnershipEvent, PaginationCursor } from "@/types/partnership";
import { fetchMorePartnershipEvents } from "@/sanity/queries/partnerships";

// ─── SVG Handshake watermark ──────────────────────────────────────────────────
function HandshakeWatermark() {
  return (
    <svg viewBox="0 0 160 120" fill="none" xmlns="http://www.w3.org/2000/svg"
      className="absolute -bottom-4 -right-4 w-44 h-36 pointer-events-none select-none opacity-[0.04]"
      aria-hidden="true">
      <path d="M10 72 Q28 48 55 52 L82 60" stroke="#244B3C" strokeWidth="9" strokeLinecap="round" fill="none"/>
      <path d="M55 52 L60 34 Q63 23 72 27 L78 54" stroke="#244B3C" strokeWidth="6" strokeLinecap="round" fill="none"/>
      <path d="M68 50 L70 32 Q73 22 80 26 L82 52" stroke="#244B3C" strokeWidth="6" strokeLinecap="round" fill="none"/>
      <path d="M80 52 L80 34 Q82 25 88 29 L88 54" stroke="#244B3C" strokeWidth="5" strokeLinecap="round" fill="none"/>
      <path d="M150 72 Q132 48 105 52 L78 60" stroke="#B9674B" strokeWidth="9" strokeLinecap="round" fill="none"/>
      <path d="M105 52 L100 34 Q97 23 88 27 L82 54" stroke="#B9674B" strokeWidth="6" strokeLinecap="round" fill="none"/>
      <path d="M92 50 L90 32 Q87 22 80 26 L78 52" stroke="#B9674B" strokeWidth="6" strokeLinecap="round" fill="none"/>
      <ellipse cx="80" cy="60" rx="11" ry="8" fill="#244B3C" opacity="0.3"/>
    </svg>
  );
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function formatDate(raw: string) {
  return new Date(raw + "T00:00:00").toLocaleDateString("en-IN", {
    year: "numeric", month: "long", day: "numeric",
  });
}

function typeLabel(type: string) {
  const map: Record<string, string> = {
    MoU: "MoU", Academic: "Academic Collaboration", CSR: "Corporate CSR",
    Government: "Government Alliance", NGO: "NGO Partnership",
    Medical: "Medical Society", Other: "Partnership",
  };
  return map[type] ?? type;
}

// ─── Single event card ────────────────────────────────────────────────────────
function PartnershipCard({ event, index }: { event: PartnershipEvent; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [expanded, setExpanded] = useState(false);

  const shortDesc = event.description.length > 220
    ? event.description.slice(0, 220) + "…"
    : event.description;

  const primaryImage = event.images?.[0];
  const imageUrl = primaryImage?.asset
    ? (() => {
        try {
          // eslint-disable-next-line @typescript-eslint/no-require-imports
          const { urlFor } = require("@/sanity/image");
          return urlFor(primaryImage.asset).width(640).height(360).fit("crop").auto("format").quality(85).url();
        } catch { return null; }
      })()
    : null;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: index * 0.06 }}
      className="relative pl-9 sm:pl-12"
    >
      {/* Timeline node */}
      <div className="absolute left-0 top-5 z-10 w-8 h-8 bg-[#F8F5ED] border-2 border-[#D9D2C5]
                      flex items-center justify-center shadow-sm">
        <Sparkles size={13} className="text-[#244B3C]" />
      </div>

      {/* Card */}
      <div className="relative overflow-hidden bg-[#F8F5ED] border border-[#D9D2C5]
                      hover:border-[#244B3C]/25 hover:shadow-[0_4px_24px_rgba(36,75,60,0.08)]
                      transition-all duration-300">
        {/* Top terracotta accent */}
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#B9674B]" />
        <HandshakeWatermark />

        <div className="p-6 md:p-8 flex flex-col lg:flex-row gap-7 items-start">

          {/* ── Left: content ── */}
          <div className="flex-1 min-w-0 flex flex-col gap-4 pt-1">

            {/* Type + date row */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-[9px] font-sans font-bold uppercase tracking-[0.26em]
                               text-[#244B3C] bg-[#244B3C]/8 border border-[#244B3C]/15 px-3 py-1">
                {typeLabel(event.partnershipType)}
              </span>
              <span className="text-[10px] font-sans text-[#B9674B] font-semibold">
                {formatDate(event.date)}
              </span>
            </div>

            {/* Title */}
            <h3 className="font-serif text-2xl sm:text-[26px] text-[#292B27] leading-tight font-normal">
              {event.title}
            </h3>

            {/* Meta grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 bg-[#FFFDF8] border border-[#D9D2C5]/70 p-4">
              {event.venue && (
                <div className="flex items-start gap-2">
                  <MapPin size={12} className="text-[#B9674B] flex-shrink-0 mt-0.5" />
                  <span className="font-sans text-[12px] text-[#5C5E57] leading-snug">
                    <span className="font-semibold text-[#292B27]">Venue: </span>{event.venue}
                  </span>
                </div>
              )}
              <div className="flex items-start gap-2">
                <Clock size={12} className="text-[#B9674B] flex-shrink-0 mt-0.5" />
                <span className="font-sans text-[12px] text-[#5C5E57] leading-snug">
                  <span className="font-semibold text-[#292B27]">Partner: </span>{event.partnerName}
                </span>
              </div>
              {event.objective && (
                <div className="flex items-start gap-2 sm:col-span-2 border-t border-[#D9D2C5]/50 pt-2 mt-1">
                  <Target size={12} className="text-[#B9674B] flex-shrink-0 mt-0.5" />
                  <span className="font-sans text-[12px] text-[#5C5E57] leading-snug">
                    <span className="font-semibold text-[#292B27]">Objective: </span>{event.objective}
                  </span>
                </div>
              )}
            </div>

            {/* Description */}
            <div className="border-t border-[#D9D2C5]/50 pt-4">
              <p className="font-sans text-[13px] sm:text-sm text-[#5C5E57] leading-relaxed whitespace-pre-line">
                {expanded ? event.description : shortDesc}
              </p>
              {event.description.length > 220 && (
                <button
                  onClick={() => setExpanded((v) => !v)}
                  className="mt-2 inline-flex items-center gap-1.5 text-[11px] font-sans font-semibold
                             text-[#244B3C] hover:text-[#B9674B] transition-colors focus:outline-none"
                >
                  {expanded
                    ? <><ChevronUp size={13} /> Read Less</>
                    : <><ChevronDown size={13} /> Read More</>}
                </button>
              )}
            </div>
          </div>

          {/* ── Right: image ── */}
          {imageUrl && (
            <div className="w-full lg:w-[260px] xl:w-[300px] flex-shrink-0 self-center lg:self-start">
              <div className="relative w-full aspect-[16/9] overflow-hidden bg-[#E9E0D1] border border-[#D9D2C5]">
                <Image
                  src={imageUrl}
                  alt={primaryImage?.alt ?? event.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 300px"
                  className="object-cover"
                  placeholder={primaryImage?.lqip ? "blur" : "empty"}
                  blurDataURL={primaryImage?.lqip ?? undefined}
                />
                {(event.images?.length ?? 0) > 1 && (
                  <div className="absolute top-2 right-2 bg-[#1B3A2D]/80 backdrop-blur-sm
                                  px-2.5 py-0.5 text-[9px] font-sans font-bold text-white uppercase tracking-widest">
                    1 / {event.images!.length}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// ─── Empty state ──────────────────────────────────────────────────────────────
function EmptyState() {
  return (
    <div className="border border-[#D9D2C5] bg-[#F8F5ED] p-12 text-center">
      <Sparkles size={28} className="text-[#D9D2C5] mx-auto mb-4" />
      <p className="font-serif text-lg text-[#5C5E57]">No partnerships published yet.</p>
      <p className="font-sans text-[12px] text-[#5C5E57]/60 mt-2 uppercase tracking-widest">
        Add entries in Sanity Studio → Partnership Event
      </p>
    </div>
  );
}

// ─── Timeline (with load more) ────────────────────────────────────────────────
interface TimelineProps {
  initialEvents: PartnershipEvent[];
  initialHasMore: boolean;
  initialCursor: PaginationCursor | null;
}

export function PartnershipTimeline({ initialEvents, initialHasMore, initialCursor }: TimelineProps) {
  const [events, setEvents] = useState(initialEvents);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [cursor, setCursor] = useState(initialCursor);
  const [loading, setLoading] = useState(false);

  const loadMore = async () => {
    if (!cursor || loading) return;
    setLoading(true);
    try {
      const result = await fetchMorePartnershipEvents(cursor);
      setEvents((prev) => [...prev, ...result.events]);
      setHasMore(result.hasMore);
      setCursor(result.cursor);
    } finally {
      setLoading(false);
    }
  };

  const bodyRef = useRef<HTMLDivElement>(null);
  const bodyInView = useInView(bodyRef, { once: true, margin: "-60px" });

  return (
    <div className="w-full bg-[#FFFDF8] py-20 md:py-28">
      <div className="w-full px-6 md:px-12 lg:px-20">

        {/* Section eyebrow */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={bodyInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
          ref={bodyRef}
          className="flex items-center gap-3 mb-12"
        >
          <CalendarDays size={15} className="text-[#244B3C]" />
          <span className="font-sans text-[11px] uppercase tracking-[0.24em] text-[#5C5E57] font-semibold">
            Deployment History &amp; Event Timeline
          </span>
        </motion.div>

        {/* Timeline */}
        {events.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="max-w-4xl flex flex-col">
            {/* Vertical timeline line */}
            <div className="relative">
              <div className="absolute left-[13px] sm:left-[15px] top-5 bottom-5 w-[2px] bg-[#D9D2C5]" />
              <div className="flex flex-col gap-10">
                {events.map((event, i) => (
                  <PartnershipCard key={event._id} event={event} index={i} />
                ))}
              </div>
            </div>

            {/* Load more */}
            {hasMore && (
              <div className="mt-12 flex justify-center">
                <button
                  onClick={loadMore}
                  disabled={loading}
                  className="inline-flex items-center gap-2 px-8 py-3 border border-[#244B3C]
                             text-[#244B3C] font-sans text-[11px] uppercase tracking-[0.2em] font-semibold
                             hover:bg-[#244B3C] hover:text-white transition-colors duration-200
                             disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Loading…" : <><ArrowRight size={14} /> Load More Partnerships</>}
                </button>
              </div>
            )}
          </div>
        )}

        {/* Footer strip */}
        <div className="mt-16 pt-8 border-t border-[#D9D2C5]/60
                        flex items-center justify-between flex-wrap gap-4">
          <span className="font-sans text-[11px] uppercase tracking-[0.2em] text-[#5C5E57]">
            {events.length} Partnership{events.length !== 1 ? "s" : ""} on record
          </span>
          <span className="font-sans text-[11px] uppercase tracking-[0.2em] text-[#244B3C] font-semibold">
            IKC Trust · Kolkata
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── Hero (server-renderable, no hooks) ───────────────────────────────────────
export function PartnershipHero() {
  return (
    <div className="w-full bg-[#244B3C] pt-36 pb-20 md:pt-44 md:pb-24 relative overflow-hidden">
      {/* Dot pattern */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.04] pointer-events-none" aria-hidden>
        <defs>
          <pattern id="p-dots" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.5" fill="white" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#p-dots)" />
      </svg>

      <div className="relative z-10 w-full px-6 md:px-12 lg:px-20">
        <div className="flex items-center gap-3 mb-6">
          <span className="w-8 h-[2px] bg-[#B9674B]" />
          <span className="text-[10px] font-sans uppercase tracking-[0.28em] text-[#B9674B] font-semibold">
            IKC Trust · Alliances
          </span>
        </div>
        <h1 className="font-serif text-5xl sm:text-6xl md:text-[72px] text-white leading-[1.05]
                       font-normal tracking-tight max-w-3xl mb-5">
          Our{" "}<span className="italic text-[#E9E0D1]">Partnerships</span>
        </h1>
        <p className="font-sans text-base md:text-[18px] text-[#E9E0D1]/70 max-w-2xl leading-relaxed mb-6">
          Collaborating with government agencies, NGOs, corporate sponsors, and academic
          institutions to maximise collective impact across West Bengal.
        </p>
        <span className="inline-flex items-center gap-2 px-4 py-1.5 border border-white/20 bg-white/5">
          <span className="w-1.5 h-1.5 bg-[#B9674B] animate-pulse" />
          <span className="text-[10px] font-sans uppercase tracking-[0.22em] text-white/60 font-semibold">
            Active Programme
          </span>
        </span>
      </div>
    </div>
  );
}
