"use client";

/**
 * AdvisoryBoardSection
 * ─────────────────────
 * Every member uses the same horizontal card layout:
 *   Photo left (natural size, never cropped) | Dark forest content panel right.
 * Description renders full markdown — italic tagline, bold, ### headings, bullets.
 * No featured/rest split. No accordion. No portrait grid.
 */

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "motion/react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { urlFor } from "@/sanity/image";
import type { AdvisoryBoardMember } from "@/types/people";

export type { AdvisoryBoardMember };

// ─── animations ────────────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: (i % 2) * 0.1 },
  }),
};

// ─── dark markdown renderer (forest bg) ───────────────────────────────────

function DarkMarkdown({ children }: { children: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        // *italic tagline* → styled italic intro line
        em: ({ children }) => (
          <em className="not-italic italic font-sans text-[13px] text-sand/70
                         block mb-4 leading-relaxed">
            {children}
          </em>
        ),
        p: ({ children }) => (
          <p className="font-sans text-[13px] text-sand/80 leading-relaxed mb-3 last:mb-0">
            {children}
          </p>
        ),
        strong: ({ children }) => (
          <strong className="font-semibold text-warm-white">{children}</strong>
        ),
        // ### 🔬 Research → small terracotta label
        h3: ({ children }) => (
          <h4 className="font-sans text-[10px] uppercase tracking-[0.22em] font-semibold
                         text-terracotta mt-5 mb-2">
            {children}
          </h4>
        ),
        h2: ({ children }) => (
          <h3 className="font-sans text-[11px] uppercase tracking-[0.2em] font-semibold
                         text-terracotta mt-5 mb-2">
            {children}
          </h3>
        ),
        ul: ({ children }) => (
          <ul className="space-y-1.5 mb-4 list-none pl-0">{children}</ul>
        ),
        li: ({ children }) => (
          <li className="font-sans text-[13px] text-sand/80 leading-relaxed
                         flex items-start gap-2">
            <span className="text-terracotta flex-shrink-0 leading-none mt-[3px]">–</span>
            <span>{children}</span>
          </li>
        ),
        a: ({ href, children }) => (
          <a href={href} target="_blank" rel="noopener noreferrer"
             className="text-terracotta underline underline-offset-2
                        hover:text-terracotta-dark transition-colors">
            {children}
          </a>
        ),
      }}
    >
      {children}
    </ReactMarkdown>
  );
}

// ─── member card ───────────────────────────────────────────────────────────
// Photo left, dark forest panel right. Same layout for every member.

function MemberCard({
  member,
  index,
}: {
  member: AdvisoryBoardMember;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  // fit("max") — never crops, full photo visible at natural proportions
  const src = urlFor(member.photo.asset)
    .width(400)
    .fit("max")
    .auto("format")
    .quality(90)
    .url();

  return (
    <motion.div
      ref={ref}
      custom={index}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="flex flex-col sm:flex-row bg-forest border border-forest-dark
                 hover:shadow-[0_12px_48px_rgba(27,56,45,0.28)]
                 transition-shadow duration-300"
    >
      {/* ── photo — sits at top-left, full image, no crop ── */}
      <div className="flex-shrink-0 self-start overflow-hidden bg-[#1B382D]">
        <Image
          src={src}
          alt={member.name}
          width={400}
          height={600}
          sizes="(max-width: 640px) 100vw, 400px"
          className="w-full sm:w-[160px] md:w-[200px] lg:w-[240px] xl:w-[280px] h-auto block"
          placeholder={member.photo.lqip ? "blur" : "empty"}
          blurDataURL={member.photo.lqip ?? undefined}
        />
      </div>

      {/* ── content panel ── */}
      <div className="flex-1 p-6 md:p-8 xl:p-10 flex flex-col justify-between
                      border-t sm:border-t-0 sm:border-l border-forest-dark min-w-0">
        <div>
          {/* expertise eyebrow */}
          {member.expertise && (
            <div className="flex items-center gap-2 mb-4">
              <span className="w-5 h-[2px] bg-terracotta flex-shrink-0" />
              <span className="font-sans text-[10px] uppercase tracking-[0.26em]
                               text-terracotta font-semibold">
                {member.expertise}
              </span>
            </div>
          )}

          {/* name */}
          <h3 className="font-serif text-2xl sm:text-3xl md:text-[32px] text-warm-white
                         leading-[1.1] font-normal tracking-tight mb-1.5">
            {member.name}
          </h3>

          {/* affiliation */}
          <p className="font-sans text-[12px] text-sand/55 mb-5 leading-relaxed">
            {member.affiliation}
          </p>

          <div className="w-8 h-[2px] bg-terracotta/50 mb-5" />

          {/* markdown description */}
          <DarkMarkdown>{member.description}</DarkMarkdown>
        </div>

        {/* footer */}
        <div className="mt-7 pt-4 border-t border-warm-white/10
                        flex items-center justify-between gap-4">
          <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-sand/35">
            Advisory Board · IKC Trust
          </span>
          <span className="font-sans text-[10px] uppercase tracking-[0.2em]
                           text-sand/35">
            #{String(index + 1).padStart(2, "0")}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

// ─── empty ─────────────────────────────────────────────────────────────────

function EmptyState() {
  return (
    <div className="py-20 text-center border border-sand-dark/40">
      <span className="font-sans text-[11px] uppercase tracking-[0.2em] text-charcoal-muted/40">
        No advisory board members published yet
      </span>
      <p className="mt-2 font-serif text-sm italic text-charcoal-muted/40">
        Add members in Sanity Studio to populate this page.
      </p>
    </div>
  );
}

// ─── section ───────────────────────────────────────────────────────────────

interface Props { members: AdvisoryBoardMember[] }

export default function AdvisoryBoardSection({ members }: Props) {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-60px" });

  return (
    <section className="w-full bg-ivory py-24 md:py-32 border-b border-sand-dark/40">
      <div className="w-full px-6 md:px-12 lg:px-20">

        {/* ── section header ── */}
        <div ref={headerRef}>
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={headerInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-8"
          >
            <span className="w-8 h-[2px] bg-terracotta flex-shrink-0" />
            <span className="font-sans text-xs uppercase tracking-[0.25em]
                             text-terracotta font-semibold">
              Advisory Board
            </span>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 mb-16 pb-12
                          border-b border-sand-dark/40">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.08 }}
              className="lg:col-span-6"
            >
              <h2 className="font-serif text-4xl sm:text-5xl md:text-[52px] text-charcoal
                             leading-[1.1] font-normal tracking-tight">
                Guided by{" "}
                <span className="italic text-forest">Wisdom & Experience.</span>
              </h2>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.17 }}
              className="lg:col-span-6 flex flex-col justify-end"
            >
              <p className="font-sans text-base md:text-body-lg text-charcoal-muted
                            leading-relaxed max-w-xl">
                Eminent scholars, practitioners, and leaders who provide strategic
                counsel and institutional credibility to IKC Trust's mission across
                education, healthcare, environment, and governance.
              </p>
            </motion.div>
          </div>
        </div>

        {/* ── members — single stacked column ── */}
        {members.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="flex flex-col gap-6">
            {members.map((m, i) => (
              <MemberCard key={m._id} member={m} index={i} />
            ))}
          </div>
        )}

        {/* ── footer ── */}
        {members.length > 0 && (
          <div className="mt-16 pt-8 border-t border-sand-dark/40
                          flex items-center justify-between">
            <span className="font-sans text-[11px] uppercase tracking-[0.2em] text-charcoal-muted">
              {members.length} Advisory Board Member{members.length !== 1 ? "s" : ""}
            </span>
            <span className="font-sans text-[11px] uppercase tracking-[0.2em]
                             text-forest font-semibold">
              Institutional Leadership · IKC Trust
            </span>
          </div>
        )}

      </div>
    </section>
  );
}
