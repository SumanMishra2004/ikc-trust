
"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import {
  motion,
  useInView,
  AnimatePresence,
  useReducedMotion,
} from "motion/react";
import {
  ChevronDown,
  GraduationCap,
  UsersRound,
  Trophy,
  BookOpen,
  Award,
  FlaskConical,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { urlFor } from "@/sanity/image";
import type { AdvisoryBoardMember } from "@/types/people";

export type { AdvisoryBoardMember };

// ─── CONSTANTS ─────────────────────────────────────────────────────────────

const COLORS = {
  forest: "#10372D",
  forestDark: "#0B2B23",
  terracotta: "#C77D59",
  sand: "#E5E9E2",
  ivory: "#F8F5ED",
  divider: "#C8A77B",
};

const ease = [0.22, 1, 0.36, 1] as const;

// ─── ANIMATIONS ────────────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease,
      delay: (i % 3) * 0.09,
    },
  }),
};

// ─── SAFE IMAGE URL ─────────────────────────────────────────────────────────

function getImageUrl(
  member: AdvisoryBoardMember,
  width: number,
  height?: number
): string | null {
  try {
    if (!member.photo?.asset) return null;

    let builder = urlFor(member.photo.asset).width(width);

    if (height) {
      builder = builder.height(height);
    }

    return builder
      .auto("format")
      .quality(90)
      .url();
  } catch {
    return null;
  }
}

// ─── MARKDOWN LINK ─────────────────────────────────────────────────────────

function MarkdownLink({
  href,
  children,
  className,
}: {
  href?: string;
  children?: React.ReactNode;
  className: string;
}) {
  if (!href) return <>{children}</>;

  const safeHref = /^(https?:|mailto:)/i.test(href) ? href : undefined;

  if (!safeHref) return <>{children}</>;

  return (
    <a
      href={safeHref}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {children}
    </a>
  );
}

// ─── MARKDOWN — REGULAR MEMBER CARDS ────────────────────────────────────────

function LightMarkdown({ children }: { children?: string | null }) {
  if (!children?.trim()) return null;

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        em: ({ children }) => (
          <em className="block mb-3 font-sans text-[13px] italic leading-relaxed text-charcoal-muted/80">
            {children}
          </em>
        ),

        p: ({ children }) => (
          <p className="mb-3 font-sans text-[13px] leading-relaxed text-charcoal-muted last:mb-0">
            {children}
          </p>
        ),

        strong: ({ children }) => (
          <strong className="font-semibold text-charcoal">
            {children}
          </strong>
        ),

        h1: ({ children }) => (
          <h4 className="mt-5 mb-2 font-serif text-lg text-forest">
            {children}
          </h4>
        ),

        h2: ({ children }) => (
          <h4 className="mt-5 mb-2 font-serif text-lg text-forest">
            {children}
          </h4>
        ),

        h3: ({ children }) => (
          <h4 className="mt-4 mb-2 flex items-center gap-1.5 font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-forest">
            {children}
          </h4>
        ),

        ul: ({ children }) => (
          <ul className="mb-3 list-none space-y-1 pl-0">
            {children}
          </ul>
        ),

        ol: ({ children }) => (
          <ol className="mb-3 list-decimal space-y-1 pl-5">
            {children}
          </ol>
        ),

        li: ({ children }) => (
          <li className="flex items-start gap-2 font-sans text-[13px] leading-relaxed text-charcoal-muted">
            <span className="mt-px shrink-0 text-terracotta">—</span>
            <span className="min-w-0">{children}</span>
          </li>
        ),

        a: ({ href, children }) => (
          <MarkdownLink
            href={href}
            className="text-forest underline underline-offset-2 transition-colors hover:text-terracotta"
          >
            {children}
          </MarkdownLink>
        ),
      }}
    >
      {children}
    </ReactMarkdown>
  );
}

// ─── FEATURED DESCRIPTION PARSER ───────────────────────────────────────────

interface FeaturedSection {
  title: string;
  originalTitle: string;
  content: string;
  iconHint: string;
}

interface ParsedDescription {
  tagline: string;
  biography: string;
  sections: FeaturedSection[];
}

function splitFeaturedDescription(
  description?: string | null
): ParsedDescription {
  if (!description?.trim()) {
    return {
      tagline: "",
      biography: "",
      sections: [],
    };
  }

  const source = description.trim();

  // Match Markdown H3 headings, regardless of emoji or heading text.
  const headingPattern = /^###\s+(.+)$/gm;
  const matches = [...source.matchAll(headingPattern)];

  const firstHeadingIndex =
    matches.length > 0 ? matches[0].index! : source.length;

  let intro = source.slice(0, firstHeadingIndex).trim();

  // Extract first standalone italic paragraph as tagline.
  let tagline = "";

  const taglineMatch = intro.match(
    /^\s*\*([^*\n]+)\*\s*(?:\n+|$)/
  );

  if (taglineMatch) {
    tagline = taglineMatch[1].trim();
    intro = intro.slice(taglineMatch[0].length).trim();
  }

  // Also support a description where the tagline is followed
  // by other introductory Markdown content.
  const sections: FeaturedSection[] = matches.map((match, index) => {
    const originalTitle = match[1].trim();

    const contentStart = match.index! + match[0].length;

    const contentEnd =
      matches[index + 1]?.index ?? source.length;

    // Remove leading emoji/symbols for a clean visible heading.
    const title = originalTitle
      .replace(/^[^\p{L}\p{N}]+\s*/u, "")
      .trim();

    return {
      title: title || `Additional Information ${index + 1}`,
      originalTitle,
      content: source.slice(contentStart, contentEnd).trim(),
      iconHint: originalTitle.toLowerCase(),
    };
  });

  return {
    tagline,
    biography: intro,
    sections,
  };
}

// ─── FEATURED MARKDOWN — BIOGRAPHY ──────────────────────────────────────────

function FeaturedBiography({
  children,
}: {
  children?: string | null;
}) {
  if (!children?.trim()) return null;

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        p: ({ children }) => (
          <p className="mb-3 font-sans text-[13px] leading-[1.9] text-[#E5E9E2]/90 last:mb-0 sm:text-[14px]">
            {children}
          </p>
        ),

        strong: ({ children }) => (
          <strong className="font-semibold text-[#F8F5ED]">
            {children}
          </strong>
        ),

        em: ({ children }) => (
          <em className="italic text-[#F8F5ED]">
            {children}
          </em>
        ),

        ul: ({ children }) => (
          <ul className="mb-3 list-none space-y-2 pl-0">
            {children}
          </ul>
        ),

        li: ({ children }) => (
          <li className="flex items-start gap-2 font-sans text-[13px] leading-relaxed text-[#E5E9E2]/85">
            <span className="mt-1 shrink-0 text-[#C77D59]">—</span>
            <span className="min-w-0">{children}</span>
          </li>
        ),

        a: ({ href, children }) => (
          <MarkdownLink
            href={href}
            className="text-[#D58A67] underline underline-offset-4"
          >
            {children}
          </MarkdownLink>
        ),
      }}
    >
      {children}
    </ReactMarkdown>
  );
}

// ─── FEATURED MARKDOWN — ACHIEVEMENTS ───────────────────────────────────────

function FeaturedAchievementContent({
  children,
}: {
  children?: string | null;
}) {
  if (!children?.trim()) return null;

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        p: ({ children }) => (
          <p className="mt-1.5 font-sans text-[12px] leading-[1.7] text-[#E5E9E2]/85 sm:text-[13px]">
            {children}
          </p>
        ),

        strong: ({ children }) => (
          <strong className="font-semibold text-[#F8F5ED]">
            {children}
          </strong>
        ),

        em: ({ children }) => (
          <em className="italic text-[#F8F5ED]">
            {children}
          </em>
        ),

        ul: ({ children }) => (
          <ul className="mt-1.5 list-none space-y-1.5 pl-0">
            {children}
          </ul>
        ),

        ol: ({ children }) => (
          <ol className="mt-1.5 list-decimal space-y-1.5 pl-4">
            {children}
          </ol>
        ),

        li: ({ children }) => (
          <li className="font-sans text-[12px] leading-[1.7] text-[#E5E9E2]/85 sm:text-[13px]">
            {children}
          </li>
        ),

        a: ({ href, children }) => (
          <MarkdownLink
            href={href}
            className="text-[#D58A67] underline underline-offset-4"
          >
            {children}
          </MarkdownLink>
        ),
      }}
    >
      {children}
    </ReactMarkdown>
  );
}

// ─── ACHIEVEMENT ICON ──────────────────────────────────────────────────────

function AchievementIcon({ title }: { title: string }) {
  const normalized = title.toLowerCase();

  const Icon = normalized.includes("research")
    ? GraduationCap
    : normalized.includes("mentor")
      ? UsersRound
      : normalized.includes("recognition") ||
          normalized.includes("award")
        ? Trophy
        : normalized.includes("chemistry") ||
            normalized.includes("science")
          ? FlaskConical
          : normalized.includes("publication") ||
              normalized.includes("journal")
            ? BookOpen
            : Award;

  return (
    <div className="flex h-10 w-10 shrink-0 items-center justify-center text-[#D58A67] sm:h-11 sm:w-11">
      <Icon
        size={32}
        strokeWidth={1.8}
        aria-hidden="true"
      />
    </div>
  );
}

// ─── ARCHITECTURAL SVG WATERMARK ───────────────────────────────────────────

function ArchitecturalWatermark() {
  return (
    <svg
      viewBox="0 0 600 650"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
      className="pointer-events-none absolute right-0 top-0 z-0 hidden h-full w-[45%] select-none lg:block"
      preserveAspectRatio="xMaxYMid slice"
    >
      <g
        stroke="#D9D3B9"
        strokeWidth="2"
        opacity="0.075"
      >
        {/* Circular architectural motif */}
        <path
          d="M410 -120 A250 250 0 0 1 660 130"
          strokeWidth="36"
        />
        <path d="M445 -90 A210 210 0 0 1 655 120" />

        {/* Building silhouette */}
        <path
          d="M220 350 L600 245 L600 650 L220 650 Z"
          fill="#D9D3B9"
          fillOpacity="0.12"
          stroke="none"
        />

        <path d="M220 350 L600 245" strokeWidth="7" />
        <path d="M235 370 L600 270" />
        <path d="M250 405 L600 310" />

        <path d="M250 405 V650 M600 310 V650" />

        {/* Windows */}
        {Array.from({ length: 5 }).map((_, row) =>
          Array.from({ length: 7 }).map((_, col) => {
            const x = 280 + col * 47;
            const y = 390 + row * 48 - col * 12;

            return (
              <rect
                key={`${row}-${col}`}
                x={x}
                y={y}
                width="22"
                height="29"
                strokeWidth="1.5"
              />
            );
          })
        )}

        {/* Columns */}
        <path d="M265 365 V650 M330 347 V650 M395 329 V650 M460 311 V650 M525 293 V650" />

        {/* Ground lines */}
        <path d="M205 650 H600" />
        <path d="M220 635 H600" />
      </g>
    </svg>
  );
}

// ─── FEATURED CARD ─────────────────────────────────────────────────────────

function FeaturedCard({
  member,
}: {
  member: AdvisoryBoardMember;
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, {
    once: true,
    margin: "-60px",
  });

  const reduceMotion = useReducedMotion();

  const src = getImageUrl(member, 600);

  const {
    tagline,
    biography,
    sections,
  } = splitFeaturedDescription(member.description);

  const name = member.name?.trim() || "Advisory Board Member";
  const affiliation = member.affiliation?.trim();

  return (
    <motion.article
      ref={ref}
      initial={
        reduceMotion
          ? false
          : { opacity: 0, y: 28 }
      }
      animate={
        reduceMotion
          ? { opacity: 1 }
          : inView
            ? { opacity: 1, y: 0 }
            : {}
      }
      transition={{
        duration: 0.75,
        ease,
      }}
      className="
        relative isolate mb-10 w-full overflow-hidden
        border border-[#0B2B23]
        bg-[#10372D] text-[#F8F5ED]
        shadow-[0_8px_32px_rgba(16,55,45,0.10)]
        transition-shadow duration-300
        hover:shadow-[0_12px_48px_rgba(16,55,45,0.25)]
      "
    >
      <ArchitecturalWatermark />

      <div className="relative z-10 flex min-w-0 flex-col lg:flex-row">

        {/* ── LEFT: PORTRAIT ─────────────────────────────────────── */}

        <div
          className="
            relative flex shrink-0 items-center justify-center
            px-8 pb-8 pt-10
            sm:px-12
            lg:w-[27%] lg:px-7 lg:py-10
            xl:w-[25%] xl:px-9
          "
        >
          {/* Top-left terracotta decoration */}
          <div
            className="
              absolute left-[7%] top-[5%]
              h-[24%] w-[52%]
              rounded-[15px]
              bg-[#B87859]/85
            "
          />

          {/* Bottom-right terracotta decoration */}
          <div
            className="
              absolute bottom-[5%] right-[4%]
              h-[26%] w-[49%]
              rounded-[15px]
              bg-[#B87859]/85
            "
          />

          {/* Image */}
          <div
            className="
              relative z-10 flex min-h-[220px] w-full
              max-w-[390px] items-center justify-center
              overflow-hidden rounded-[17px]
              border border-white/20
              bg-[#173F33]
              shadow-[0_12px_35px_rgba(0,0,0,0.22)]
            "
          >
            {src ? (
              <Image
                src={src}
                alt={name}
                width={600}
                height={900}
                priority
                sizes="(max-width: 1023px) 85vw, (max-width: 1280px) 27vw, 25vw"
                className="
                  block h-auto w-full max-w-full
                  object-contain
                "
                placeholder={
                  member.photo?.lqip ? "blur" : "empty"
                }
                blurDataURL={
                  member.photo?.lqip ?? undefined
                }
              />
            ) : (
              <div className="flex min-h-[220px] w-full flex-col items-center justify-center gap-3 p-6 text-[#E5E9E2]/50">
                <UsersRound size={42} strokeWidth={1.2} />
                <span className="text-center font-sans text-xs">
                  Photograph unavailable
                </span>
              </div>
            )}
          </div>
        </div>

        {/* ── RIGHT: CONTENT ─────────────────────────────────────── */}

        <div
          className="
            relative flex min-w-0 flex-1 flex-col
            border-t border-[#C8A77B]/20
            px-6 pb-7 pt-6
            sm:px-9 sm:pb-9
            lg:border-l lg:border-t-0
            lg:px-9 lg:py-9
            xl:px-12 xl:py-10
          "
        >
          {/* Header */}
          <div className="min-w-0">

            {/* Expertise */}
            {member.expertise?.trim() && (
              <div className="mb-4 flex items-center gap-3">
                <span className="h-[3px] w-[30px] shrink-0 bg-[#C77D59]" />

                <span className="
                  font-sans text-[10px] font-bold uppercase
                  tracking-[0.24em] text-[#CD8562]
                  sm:text-[11px]
                ">
                  {member.expertise}
                </span>
              </div>
            )}

            {/* Name */}
            <h3 className="
              mb-2 break-words font-serif font-normal
              leading-[1.13] tracking-[-0.025em]
              text-[clamp(27px,3vw,54px)]
              text-[#F8F5ED]
            ">
              {name}
            </h3>

            {/* Affiliation */}
            {affiliation && (
              <p className="
                max-w-5xl break-words font-serif
                text-[14px] italic leading-relaxed
                text-[#E5E9E2]/90
                sm:text-[16px]
                xl:text-[17px]
              ">
                {affiliation}
              </p>
            )}

            {/* Terracotta divider */}
            <div className="mb-6 mt-7 h-[3px] w-[86px] bg-[#C77D59]" />
          </div>

          {/* ── BIOGRAPHY + ACHIEVEMENTS ─────────────────────────── */}

          <div className="
            grid min-w-0 grid-cols-1 gap-7
            lg:grid-cols-[minmax(0,1fr)_minmax(0,1.12fr)]
            lg:gap-6
            xl:gap-9
          ">

            {/* Biography */}
            <div className="min-w-0 lg:pr-2">
              {biography ? (
                <FeaturedBiography>
                  {biography}
                </FeaturedBiography>
              ) : (
                <p className="font-sans text-[13px] italic leading-relaxed text-[#E5E9E2]/50">
                  Profile information will be updated soon.
                </p>
              )}
            </div>

            {/* Achievements */}
            {sections.length > 0 && (
              <div className="
                min-w-0 space-y-5
                border-t border-[#C8A77B]/50 pt-6
                lg:border-l lg:border-t-0
                lg:space-y-5 lg:pt-0 lg:pl-6
                xl:space-y-6 xl:pl-9
              ">
                {sections.map((section, index) => (
                  <div
                    key={`${section.originalTitle}-${index}`}
                    className="
                      flex min-w-0 items-start gap-3
                      sm:gap-4
                    "
                  >
                    <AchievementIcon
                      title={section.iconHint}
                    />

                    <div className="min-w-0 flex-1">
                      <h4 className="
                        break-words font-sans
                        text-[14px] font-medium
                        leading-snug text-[#F8F5ED]
                        sm:text-[15px]
                      ">
                        {section.title}
                      </h4>

                      {section.content ? (
                        <FeaturedAchievementContent>
                          {section.content}
                        </FeaturedAchievementContent>
                      ) : null}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ── FOOTER ───────────────────────────────────────────── */}

          <div className="
            mt-8 flex min-w-0 flex-col
            items-start justify-between gap-4
            border-t border-[#C8A77B]/60 pt-5
            sm:flex-row sm:items-center
          ">
            {/* Tagline */}
            <div className="flex min-w-0 items-center gap-3">
              <UsersRound
                size={27}
                strokeWidth={2}
                className="shrink-0 text-[#D58A67]"
                fill="currentColor"
                aria-hidden="true"
              />

              <span className="
                break-words font-serif
                text-[12px] leading-relaxed
                tracking-[0.06em]
                text-[#E5E9E2]/90
                sm:text-[14px]
              ">
                {tagline ||
                  "Distinguished Academician • Researcher • Mentor"}
              </span>
            </div>

            {/* Featured label */}
            <div className="
              flex shrink-0 items-center
              border-l border-[#C8A77B]/70
              pl-4 sm:pl-5
            ">
              <span className="
                font-sans text-[9px] font-bold uppercase
                tracking-[0.2em] text-[#CD8562]
                sm:text-[10px]
              ">
                Featured Member
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

// ─── REGULAR MEMBER CARD ────────────────────────────────────────────────────

function MemberCard({
  member,
  index,
}: {
  member: AdvisoryBoardMember;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const inView = useInView(ref, {
    once: true,
    margin: "-50px",
  });

  const [open, setOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  const src = getImageUrl(member, 360, 540);

  const name = member.name?.trim() || "Board Member";

  return (
    <motion.div
      ref={ref}
      custom={index}
      variants={reduceMotion ? undefined : fadeUp}
      initial={reduceMotion ? false : "hidden"}
      animate={
        reduceMotion
          ? { opacity: 1 }
          : inView
            ? "visible"
            : "hidden"
      }
      className="
        group flex min-w-0 flex-col
        border border-sand-dark
        bg-warm-white
        transition-shadow duration-300
        hover:shadow-[0_6px_24px_rgba(36,75,60,0.1)]
      "
    >
      {/* Portrait */}
      <div className="
        relative flex min-h-[220px] items-center justify-center
        overflow-hidden bg-[#F8F5ED]
      ">
        {src ? (
          <Image
            src={src}
            alt={name}
            width={360}
            height={540}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="block h-auto w-full object-contain"
            placeholder={
              member.photo?.lqip ? "blur" : "empty"
            }
            blurDataURL={
              member.photo?.lqip ?? undefined
            }
          />
        ) : (
          <div className="flex min-h-[220px] flex-col items-center justify-center gap-3 text-charcoal-muted/40">
            <UsersRound size={38} strokeWidth={1.2} />
            <span className="font-sans text-xs">
              Photograph unavailable
            </span>
          </div>
        )}

        {/* Expertise badge */}
        {member.expertise?.trim() && (
          <div className="
            pointer-events-none absolute bottom-0
            left-0 right-0 bg-gradient-to-t
            from-charcoal/85 via-charcoal/30
            to-transparent px-4 pb-3 pt-10
          ">
            <span className="
              block font-sans text-[9px]
              font-semibold uppercase
              leading-none tracking-[0.22em]
              text-terracotta
            ">
              {member.expertise}
            </span>
          </div>
        )}
      </div>

      {/* Identity */}
      <div className="border-t border-sand-dark/50 p-5">
        <h3 className="
          break-words font-serif text-[19px]
          leading-snug text-charcoal
          transition-colors duration-200
          group-hover:text-forest
        ">
          {name}
        </h3>

        <div className="my-2.5 h-[2px] w-7 bg-terracotta/40" />

        {member.affiliation?.trim() && (
          <p className="
            mb-4 break-words font-sans
            text-[12px] leading-relaxed
            text-charcoal-muted
          ">
            {member.affiliation}
          </p>
        )}

        {/* Accordion button */}
        {member.description?.trim() && (
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            className="
              flex items-center gap-2
              font-sans text-[10px] font-semibold
              uppercase tracking-[0.2em]
              text-forest transition-colors
              hover:text-terracotta
              focus-visible:outline
              focus-visible:outline-2
              focus-visible:outline-offset-4
              focus-visible:outline-forest
            "
          >
            {open ? "Collapse" : "Read Profile"}

            <ChevronDown
              size={13}
              aria-hidden="true"
              className={`transition-transform duration-250 ${
                open ? "rotate-180" : ""
              }`}
            />
          </button>
        )}
      </div>

      {/* Accordion content */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={
              reduceMotion
                ? false
                : { height: 0, opacity: 0 }
            }
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              duration: reduceMotion ? 0 : 0.28,
              ease,
            }}
            className="overflow-hidden"
          >
            <div className="
              border-t border-sand-dark/40
              bg-sand/30 px-5 pb-5 pt-3
            ">
              <LightMarkdown>
                {member.description}
              </LightMarkdown>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── EMPTY STATE ────────────────────────────────────────────────────────────

function EmptyState() {
  return (
    <div className="
      col-span-full border border-sand-dark/40
      py-20 text-center
    ">
      <span className="
        font-sans text-[11px] uppercase
        tracking-[0.2em] text-charcoal-muted/50
      ">
        No advisory board members published yet
      </span>

      <p className="
        mt-2 font-serif text-sm italic
        text-charcoal-muted/50
      ">
        Add members in Sanity Studio to populate this page.
      </p>
    </div>
  );
}

// ─── MAIN SECTION ───────────────────────────────────────────────────────────

interface Props {
  members: AdvisoryBoardMember[];
}

export default function AdvisoryBoardSection({
  members,
}: Props) {
  const headerRef = useRef<HTMLDivElement>(null);

  const headerInView = useInView(headerRef, {
    once: true,
    margin: "-60px",
  });

  const reduceMotion = useReducedMotion();

  // Guard against empty or malformed input.
  const validMembers = Array.isArray(members)
    ? members.filter((member) => member && typeof member === "object")
    : [];

  // Featured member is selected from Sanity.
  const featured =
    validMembers.find((member) => member.isFeatured) ??
    validMembers[0] ??
    null;

  // Exclude featured member from regular grid.
  const rest = featured
    ? validMembers.filter(
        (member) => member._id !== featured._id
      )
    : [];

  const memberCount = validMembers.length;

  return (
    <section
      className="
        w-full overflow-hidden
        border-b border-sand-dark/40
        bg-ivory py-16
        sm:py-20
        lg:py-24
        xl:py-32
      "
    >
      <div className="
        mx-auto w-full max-w-[1800px]
        px-5 sm:px-8 md:px-12
        lg:px-16 xl:px-20
      ">

        {/* ── SECTION HEADER ────────────────────────────────────── */}

        <div ref={headerRef}>

          <motion.div
            initial={
              reduceMotion
                ? false
                : { opacity: 0, x: -16 }
            }
            animate={
              reduceMotion
                ? { opacity: 1 }
                : headerInView
                  ? { opacity: 1, x: 0 }
                  : {}
            }
            transition={{ duration: 0.5 }}
            className="mb-8 flex items-center gap-3"
          >
            <span className="
              h-[2px] w-8 shrink-0 bg-terracotta
            " />

            <span className="
              font-sans text-[11px] font-semibold
              uppercase tracking-[0.25em]
              text-terracotta sm:text-xs
            ">
              Advisory Board
            </span>
          </motion.div>

          <div className="
            mb-12 grid grid-cols-1
            gap-7 border-b border-sand-dark/40
            pb-10
            lg:mb-16 lg:grid-cols-12
            lg:gap-12 lg:pb-12
          ">
            {/* Heading */}
            <motion.div
              initial={
                reduceMotion
                  ? false
                  : { opacity: 0, y: 20 }
              }
              animate={
                reduceMotion
                  ? { opacity: 1 }
                  : headerInView
                    ? { opacity: 1, y: 0 }
                    : {}
              }
              transition={{
                duration: 0.65,
                delay: 0.08,
              }}
              className="lg:col-span-6"
            >
              <h2 className="
                font-serif font-normal
                leading-[1.1] tracking-tight
                text-4xl text-charcoal
                sm:text-5xl
                md:text-[52px]
              ">
                Guided by{" "}
                <span className="italic text-forest">
                  Wisdom &amp; Experience.
                </span>
              </h2>
            </motion.div>

            {/* Introduction */}
            <motion.div
              initial={
                reduceMotion
                  ? false
                  : { opacity: 0, y: 20 }
              }
              animate={
                reduceMotion
                  ? { opacity: 1 }
                  : headerInView
                    ? { opacity: 1, y: 0 }
                    : {}
              }
              transition={{
                duration: 0.65,
                delay: 0.17,
              }}
              className="
                flex flex-col justify-end
                lg:col-span-6
              "
            >
              <p className="
                max-w-xl font-sans
                text-sm leading-[1.9]
                text-charcoal-muted
                sm:text-base
              ">
                Eminent scholars, practitioners, and
                leaders who provide strategic counsel
                and institutional credibility to IKC
                Trust&apos;s mission across education,
                healthcare, environment, and governance.
              </p>
            </motion.div>
          </div>
        </div>

        {/* ── EMPTY STATE ───────────────────────────────────────── */}

        {memberCount === 0 && <EmptyState />}

        {/* ── FEATURED MEMBER ───────────────────────────────────── */}

        {featured && (
          <FeaturedCard member={featured} />
        )}

        {/* ── REMAINING MEMBERS ─────────────────────────────────── */}

        {rest.length > 0 && (
          <div className="
            grid grid-cols-1 gap-5
            sm:grid-cols-2
            lg:grid-cols-3
            xl:gap-6
          ">
            {rest.map((member, index) => (
              <MemberCard
                key={member._id ?? `member-${index}`}
                member={member}
                index={index}
              />
            ))}
          </div>
        )}

        {/* ── SECTION FOOTER ───────────────────────────────────── */}

        {memberCount > 0 && (
          <div className="
            mt-12 flex flex-col
            items-start justify-between
            gap-4 border-t border-sand-dark/40
            pt-7
            sm:mt-16 sm:flex-row
            sm:items-center
          ">
            <span className="
              font-sans text-[10px]
              uppercase tracking-[0.2em]
              text-charcoal-muted
              sm:text-[11px]
            ">
              {memberCount} Advisory Board Member
              {memberCount !== 1 ? "s" : ""}
            </span>

            <span className="
              font-sans text-[10px]
              font-semibold uppercase
              tracking-[0.2em] text-forest
              sm:text-[11px]
            ">
              Institutional Leadership · IKC Trust
            </span>
          </div>
        )}
      </div>
    </section>
  );
}
