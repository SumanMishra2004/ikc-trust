
"use client";

import Image from "next/image";
import { useRef } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
} from "motion/react";
import {
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

const ease = [0.22, 1, 0.36, 1] as const;

// ─── SAFE IMAGE URL ─────────────────────────────────────────────────────────

function getImageUrl(
  member: AdvisoryBoardMember,
  width: number,
  height?: number
): string | null {
  try {
    if (!member.photo?.asset) return null;

    let builder = urlFor(member.photo.asset).width(width);

    if (height) builder = builder.height(height);

    return builder.auto("format").quality(90).url();
  } catch {
    return null;
  }
}

// ─── MARKDOWN LINK ──────────────────────────────────────────────────────────

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

  const safeHref = /^(https?:|mailto:)/i.test(href)
    ? href
    : undefined;

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

// ─── DESCRIPTION PARSER ─────────────────────────────────────────────────────

interface DescriptionSection {
  title: string;
  originalTitle: string;
  content: string;
  iconHint: string;
}

interface ParsedDescription {
  tagline: string;
  biography: string;
  sections: DescriptionSection[];
}

function splitDescription(
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

  // Recognize Markdown H2 and H3 section headings.
  const headingPattern = /^#{2,3}\s+(.+)$/gm;
  const matches = [...source.matchAll(headingPattern)];

  const firstHeadingIndex =
    matches.length > 0 ? matches[0].index! : source.length;

  let intro = source.slice(0, firstHeadingIndex).trim();

  // Extract the first standalone italic paragraph as tagline.
  let tagline = "";

  const taglineMatch = intro.match(
    /^\s*\*([^*\n]+)\*\s*(?:\n+|$)/
  );

  if (taglineMatch) {
    tagline = taglineMatch[1].trim();
    intro = intro.slice(taglineMatch[0].length).trim();
  }

  const sections: DescriptionSection[] = matches.map(
    (match, index) => {
      const originalTitle = match[1].trim();

      const contentStart =
        match.index! + match[0].length;

      const contentEnd =
        matches[index + 1]?.index ?? source.length;

      const title = originalTitle
        .replace(/^[^\p{L}\p{N}]+\s*/u, "")
        .trim();

      return {
        title:
          title || `Additional Information ${index + 1}`,
        originalTitle,
        content: source
          .slice(contentStart, contentEnd)
          .trim(),
        iconHint: originalTitle.toLowerCase(),
      };
    }
  );

  return {
    tagline,
    biography: intro,
    sections,
  };
}

// ─── MARKDOWN STYLES ────────────────────────────────────────────────────────

// Shared Markdown renderer for every advisory board member.

function AdvisoryMarkdown({
  children,
  variant = "biography",
}: {
  children?: string | null;
  variant?: "biography" | "section";
}) {
  if (!children?.trim()) return null;

  const isSection = variant === "section";

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        p: ({ children }) => (
          <p
            className={
              isSection
                ? "mt-2 font-sans text-[12px] leading-[1.85] text-[#E5E9E2]/85 sm:text-[13px]"
                : "mb-3 font-sans text-[13px] leading-[1.9] text-[#E5E9E2]/90 last:mb-0 sm:text-[14px]"
            }
          >
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

        h1: ({ children }) => (
          <h4 className="mb-3 mt-5 font-serif text-xl text-[#F8F5ED]">
            {children}
          </h4>
        ),

        h2: ({ children }) => (
          <h4 className="mb-3 mt-5 font-serif text-lg text-[#F8F5ED]">
            {children}
          </h4>
        ),

        h3: ({ children }) => (
          <h4 className="mb-2 mt-4 font-sans text-[11px] font-bold uppercase tracking-[0.17em] text-[#D58A67]">
            {children}
          </h4>
        ),

        ul: ({ children }) => (
          <ul
            className={
              isSection
                ? "mt-2 list-none space-y-2 pl-0"
                : "mb-3 list-none space-y-2 pl-0"
            }
          >
            {children}
          </ul>
        ),

        ol: ({ children }) => (
          <ol className="my-3 list-decimal space-y-2 pl-5 font-sans text-[13px] leading-relaxed text-[#E5E9E2]/85">
            {children}
          </ol>
        ),

        li: ({ children }) => (
          <li className="flex items-start gap-2 font-sans text-[12px] leading-[1.8] text-[#E5E9E2]/85 sm:text-[13px]">
            <span className="mt-px shrink-0 text-[#D58A67]">
              —
            </span>
            <span className="min-w-0 flex-1">
              {children}
            </span>
          </li>
        ),

        a: ({ href, children }) => (
          <MarkdownLink
            href={href}
            className="text-[#D58A67] underline underline-offset-4 transition-colors hover:text-[#F8F5ED]"
          >
            {children}
          </MarkdownLink>
        ),

        blockquote: ({ children }) => (
          <blockquote className="my-4 border-l-2 border-[#C77D59] pl-4 italic text-[#E5E9E2]/80">
            {children}
          </blockquote>
        ),

        hr: () => (
          <hr className="my-5 border-[#C8A77B]/30" />
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
        size={30}
        strokeWidth={1.7}
        aria-hidden="true"
      />
    </div>
  );
}

// ─── ARCHITECTURAL WATERMARK ────────────────────────────────────────────────

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
        <path
          d="M410 -120 A250 250 0 0 1 660 130"
          strokeWidth="36"
        />

        <path d="M445 -90 A210 210 0 0 1 655 120" />

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

        <path d="M265 365 V650 M330 347 V650 M395 329 V650 M460 311 V650 M525 293 V650" />

        <path d="M205 650 H600" />
        <path d="M220 635 H600" />
      </g>
    </svg>
  );
}

// ─── UNIFIED ADVISORY BOARD CARD ────────────────────────────────────────────

function AdvisoryBoardCard({
  member,
  index,
}: {
  member: AdvisoryBoardMember;
  index: number;
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
  } = splitDescription(member.description);

  const name = member.name?.trim() || "Advisory Board Member";
  const affiliation = member.affiliation?.trim();
  const expertise = member.expertise?.trim();

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
        delay: Math.min(index * 0.06, 0.3),
      }}
      className="
        relative isolate mb-8 w-full overflow-hidden
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
          <div
            className="
              absolute left-[7%] top-[5%]
              h-[24%] w-[52%]
              rounded-[15px]
              bg-[#B87859]/85
            "
          />

          <div
            className="
              absolute bottom-[5%] right-[4%]
              h-[26%] w-[49%]
              rounded-[15px]
              bg-[#B87859]/85
            "
          />

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
                priority={index === 0}
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

        {/* ── RIGHT: MEMBER INFORMATION ──────────────────────────── */}

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

          {/* ── MEMBER HEADER ─────────────────────────────────────── */}

          <div className="min-w-0">

            {/* Expertise */}
            {expertise && (
              <div className="mb-4 flex items-center gap-3">
                <span className="h-[3px] w-[30px] shrink-0 bg-[#C77D59]" />

                <span className="
                  font-sans text-[10px] font-bold uppercase
                  tracking-[0.24em] text-[#CD8562]
                  sm:text-[11px]
                ">
                  {expertise}
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

            <div className="mb-6 mt-7 h-[3px] w-[86px] bg-[#C77D59]" />
          </div>

          {/* ── BIOGRAPHY + DESCRIPTION SECTIONS ─────────────────── */}

          <div className="
            grid min-w-0 grid-cols-1 gap-7
            lg:grid-cols-[minmax(0,1fr)_minmax(0,1.12fr)]
            lg:gap-6
            xl:gap-9
          ">

            {/* Biography */}
            <div className="min-w-0 lg:pr-2">
              {biography ? (
                <AdvisoryMarkdown variant="biography">
                  {biography}
                </AdvisoryMarkdown>
              ) : (
                <p className="font-sans text-[13px] italic leading-relaxed text-[#E5E9E2]/50">
                  Profile information will be updated soon.
                </p>
              )}
            </div>

            {/* Markdown Sections */}
            {sections.length > 0 && (
              <div className="
                min-w-0 space-y-5
                border-t border-[#C8A77B]/50 pt-6
                lg:border-l lg:border-t-0
                lg:space-y-5 lg:pt-0 lg:pl-6
                xl:space-y-6 xl:pl-9
              ">
                {sections.map((section, sectionIndex) => (
                  <div
                    key={`${section.originalTitle}-${sectionIndex}`}
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

                      {section.content && (
                        <AdvisoryMarkdown variant="section">
                          {section.content}
                        </AdvisoryMarkdown>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ── MEMBER FOOTER ────────────────────────────────────── */}

          <div className="
            mt-8 flex min-w-0 items-center gap-3
            border-t border-[#C8A77B]/60 pt-5
          ">
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

        </div>
      </div>
    </motion.article>
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

// ─── MAIN ADVISORY BOARD SECTION ────────────────────────────────────────────

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
    ? members.filter(
        (member) =>
          member && typeof member === "object"
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

        {/* ── ALL MEMBERS: IDENTICAL CARD STRUCTURE ─────────────── */}

        {memberCount > 0 && (
          <div className="flex flex-col gap-2">
            {validMembers.map((member, index) => (
              <AdvisoryBoardCard
                key={member._id ?? `member-${index}`}
                member={member}
                index={index}
              />
            ))}
          </div>
        )}

        {/* ── SECTION FOOTER ────────────────────────────────────── */}

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
