"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Gem, Star, Heart, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Contributor } from "@/types/contributor";

// ─── Category config ──────────────────────────────────────────────────────────
const CATEGORIES: {
  key: Contributor["category"];
  label: string;
  icon: React.ElementType;
  dark: boolean;
  headerBg: string;
  bodyBg: string;
  border: string;
  countBg: string;
  countText: string;
  nameDivider: string;
  nameText: string;
  locationText: string;
  dotColor: string;
  accentBar: string;
}[] = [
  {
    key: "Patron",
    label: "Patrons",
    icon: Gem,
    dark: true,
    headerBg: "bg-[#1B3A2D]",
    bodyBg: "bg-[#1B3A2D]",
    border: "border-[#1B3A2D]",
    countBg: "bg-[#B9674B]",
    countText: "text-white",
    nameDivider: "border-white/10",
    nameText: "text-white/90",
    locationText: "text-white/35",
    dotColor: "bg-[#B9674B]",
    accentBar: "bg-[#B9674B]",
  },
  {
    key: "Benefactor",
    label: "Benefactors",
    icon: Star,
    dark: true,
    headerBg: "bg-[#B9674B]",
    bodyBg: "bg-[#9A523A]",
    border: "border-[#B9674B]",
    countBg: "bg-white/20",
    countText: "text-white",
    nameDivider: "border-white/10",
    nameText: "text-white/90",
    locationText: "text-white/35",
    dotColor: "bg-white/60",
    accentBar: "bg-white/40",
  },
  {
    key: "Supporter",
    label: "Supporters",
    icon: Heart,
    dark: false,
    headerBg: "bg-[#244B3C]",
    bodyBg: "bg-[#F8F5ED]",
    border: "border-[#D9D2C5]",
    countBg: "bg-[#244B3C]",
    countText: "text-white",
    nameDivider: "border-[#D9D2C5]/60",
    nameText: "text-[#292B27]",
    locationText: "text-[#5C5E57]",
    dotColor: "bg-[#B9674B]",
    accentBar: "bg-[#B9674B]",
  },
  {
    key: "Community",
    label: "Community Contributors",
    icon: Users,
    dark: false,
    headerBg: "bg-[#292B27]",
    bodyBg: "bg-[#F8F5ED]",
    border: "border-[#D9D2C5]",
    countBg: "bg-[#292B27]",
    countText: "text-white",
    nameDivider: "border-[#D9D2C5]/60",
    nameText: "text-[#292B27]",
    locationText: "text-[#5C5E57]",
    dotColor: "bg-[#244B3C]",
    accentBar: "bg-[#244B3C]",
  },
];

// ─── SVG lotus watermark ──────────────────────────────────────────────────────
function LotusWatermark({ light = false }: { light?: boolean }) {
  const fill = light ? "#ffffff" : "#244B3C";
  return (
    <svg
      viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg"
      className="absolute bottom-0 right-0 w-32 h-28 pointer-events-none select-none opacity-[0.07]"
      aria-hidden="true"
    >
      <path d="M60 85 C60 85 44 62 44 44 C44 30 52 20 60 16 C68 20 76 30 76 44 C76 62 60 85 60 85Z" fill={fill}/>
      <path d="M60 85 C60 85 32 72 24 55 C18 42 22 28 32 24 C42 28 50 42 50 55 C50 68 60 85 60 85Z" fill={fill}/>
      <path d="M60 85 C60 85 88 72 96 55 C102 42 98 28 88 24 C78 28 70 42 70 55 C70 68 60 85 60 85Z" fill={fill}/>
      <path d="M60 85 C60 85 20 78 10 62 C4 50 10 36 20 34 C30 36 36 50 38 62 C40 72 60 85 60 85Z" fill={fill} opacity="0.55"/>
      <path d="M60 85 C60 85 100 78 110 62 C116 50 110 36 100 34 C90 36 84 50 82 62 C80 72 60 85 60 85Z" fill={fill} opacity="0.55"/>
      <path d="M60 85 L60 98" stroke={fill} strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

// ─── Single name item — compact, used inside CSS columns ─────────────────────
function NameItem({
  contributor,
  index,
  cfg,
}: {
  contributor: Contributor;
  index: number;
  cfg: typeof CATEGORIES[0];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10px" });
  const displayName = contributor.anonymous ? "Anonymous Donor" : contributor.name;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 6 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.35, delay: (index % 12) * 0.03 }}
      className={cn(
        "flex items-center gap-2.5 py-2.5 border-b break-inside-avoid",
        cfg.nameDivider
      )}
    >
      <span className={cn("w-[5px] h-[5px] rounded-full flex-shrink-0", cfg.dotColor)} />
      <span className={cn("font-serif text-[14px] sm:text-[15px] leading-snug flex-1 min-w-0", cfg.nameText)}>
        {displayName}
      </span>
      {contributor.location && (
        <span className={cn("font-sans text-[10px] flex-shrink-0 hidden sm:block", cfg.locationText)}>
          {contributor.location}
        </span>
      )}
    </motion.div>
  );
}

// ─── Category block ───────────────────────────────────────────────────────────
// Threshold: >8 names → 2 columns; >16 names → 3 columns on wide screens
function CategoryBlock({
  config: cfg,
  contributors,
  index,
}: {
  config: typeof CATEGORIES[0];
  contributors: Contributor[];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const Icon = cfg.icon;
  const count = contributors.length;

  if (count === 0) return null;

  // CSS columns class based on count
  const columnsClass =
    count > 16
      ? "columns-1 sm:columns-2 lg:columns-3"
      : count > 8
      ? "columns-1 sm:columns-2"
      : "columns-1";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: (index % 2) * 0.08 }}
      className={cn("relative overflow-hidden border", cfg.bodyBg, cfg.border)}
    >
      <LotusWatermark light={cfg.dark} />

      {/* ── Coloured header band ── */}
      <div className={cn("relative z-10 flex items-center gap-4 px-6 py-5", cfg.headerBg)}>
        <div className="w-8 h-8 flex items-center justify-center bg-white/10 flex-shrink-0">
          <Icon size={15} className="text-white" />
        </div>
        <h3 className="font-serif text-lg text-white leading-tight flex-1">
          {cfg.label}
        </h3>
        {/* Count badge */}
        <span className={cn(
          "font-sans text-[10px] uppercase tracking-[0.2em] font-bold px-2.5 py-1 flex-shrink-0",
          cfg.countBg, cfg.countText
        )}>
          {count}
        </span>
      </div>

      {/* ── Names body ── */}
      <div className={cn(
        "relative z-10 px-6 pt-4 pb-6",
        cfg.dark ? cfg.bodyBg : "bg-[#F8F5ED]"
      )}>
        <div className={cn(columnsClass, "gap-x-8")}>
          {contributors.map((c, i) => (
            <NameItem key={c._id} contributor={c} index={i} cfg={cfg} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ─── Empty state ──────────────────────────────────────────────────────────────
function EmptyState() {
  return (
    <div className="border border-[#D9D2C5] bg-[#F8F5ED] p-16 text-center">
      <Heart size={28} className="text-[#D9D2C5] mx-auto mb-4" />
      <p className="font-serif text-lg text-[#5C5E57]">No contributors published yet.</p>
      <p className="font-sans text-[11px] text-[#5C5E57]/60 mt-2 uppercase tracking-widest">
        Add entries in Sanity Studio → Contributors
      </p>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function ContributorsPage({
  contributors,
}: {
  contributors: Contributor[];
}) {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true });
  const bodyRef = useRef<HTMLDivElement>(null);
  const bodyInView = useInView(bodyRef, { once: true, margin: "-60px" });

  const grouped = CATEGORIES.map((cat) => ({
    config: cat,
    contributors: contributors.filter((c) => c.category === cat.key),
  })).filter((g) => g.contributors.length > 0);

  const total = contributors.length;

  return (
    <>
      {/* ── Hero ── */}
      <div className="w-full bg-[#1B3A2D] pt-36 pb-20 md:pt-44 md:pb-24 relative overflow-hidden">
        <svg className="absolute inset-0 w-full h-full opacity-[0.04] pointer-events-none" aria-hidden>
          <defs>
            <pattern id="c-dots" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.5" fill="white"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#c-dots)"/>
        </svg>

        <div ref={heroRef} className="relative z-10 w-full px-6 md:px-12 lg:px-20">
          <motion.div
            initial={{ opacity: 0, x: -16 }} animate={heroInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }} className="flex items-center gap-3 mb-6"
          >
            <span className="w-8 h-[2px] bg-[#B9674B]" />
            <span className="text-[10px] font-sans uppercase tracking-[0.28em] text-[#B9674B] font-semibold">
              IKC Trust · Giving
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }} animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
            className="font-serif text-5xl sm:text-6xl md:text-[72px] text-white leading-[1.05] font-normal tracking-tight max-w-3xl mb-5"
          >
            Our <span className="italic text-[#E9E0D1]">Contributors</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.18 }}
            className="font-sans text-base md:text-[18px] text-[#E9E0D1]/65 max-w-2xl leading-relaxed"
          >
            Generous individuals whose support powers IKC Trust's work in healthcare,
            education, environment, and social welfare across West Bengal.
          </motion.p>

          {total > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 12 }} animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.28 }}
              className="mt-8 flex items-center gap-6 pt-6 border-t border-white/10"
            >
              <div>
                <span className="font-serif text-4xl text-[#B9674B] block leading-none">{total}</span>
                <span className="font-sans text-[10px] uppercase tracking-[0.22em] text-white/50 mt-1 block">
                  Contributors
                </span>
              </div>
              <div className="w-px h-10 bg-white/10" />
              <div>
                <span className="font-serif text-4xl text-[#B9674B] block leading-none">{grouped.length}</span>
                <span className="font-sans text-[10px] uppercase tracking-[0.22em] text-white/50 mt-1 block">
                  Categories
                </span>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* ── Body ── */}
      <div className="w-full bg-[#FFFDF8] py-20 md:py-28">
        <div ref={bodyRef} className="w-full px-6 md:px-12 lg:px-20">

          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, x: -16 }} animate={bodyInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }} className="flex items-center gap-3 mb-12"
          >
            <span className="w-8 h-[2px] bg-[#B9674B] flex-shrink-0" />
            <span className="font-sans text-[11px] uppercase tracking-[0.24em] text-[#5C5E57] font-semibold">
              Acknowledgements
            </span>
          </motion.div>

          {/* Blocks stacked full-width — each handles its own multi-column layout */}
          {total === 0 ? (
            <EmptyState />
          ) : (
            <div className="flex flex-col gap-6">
              {grouped.map((g, i) => (
                <CategoryBlock
                  key={g.config.key}
                  config={g.config}
                  contributors={g.contributors}
                  index={i}
                />
              ))}
            </div>
          )}

          {/* Footer */}
          {total > 0 && (
            <motion.div
              initial={{ opacity: 0 }} animate={bodyInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-14 pt-8 border-t border-[#D9D2C5]/60 flex items-center justify-between flex-wrap gap-4"
            >
              <span className="font-sans text-[11px] uppercase tracking-[0.2em] text-[#5C5E57]">
                {total} acknowledged contributor{total !== 1 ? "s" : ""}
              </span>
              <span className="font-sans text-[11px] uppercase tracking-[0.2em] text-[#244B3C] font-semibold">
                IKC Trust · Kolkata, West Bengal
              </span>
            </motion.div>
          )}

        </div>
      </div>
    </>
  );
}
