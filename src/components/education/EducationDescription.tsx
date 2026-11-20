"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Components } from "react-markdown";

interface Props {
  markdown: string;
  /**
   * Number of words to show before collapsing.
   * Default: 300 — roughly the first third of a 1000-word description.
   * Set to Infinity to disable collapse entirely.
   */
  collapseAfterWords?: number;
}

/** Tailwind prose-equivalent styles applied via className map to each element. */
const components: Components = {
  h1: ({ children }) => (
    <h1 className="font-serif text-xl text-forest font-normal mt-6 mb-2 leading-snug">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="font-serif text-lg text-forest font-normal mt-5 mb-2 leading-snug">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="font-sans text-[13px] uppercase tracking-[0.12em] text-forest font-semibold mt-4 mb-1.5">
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="font-sans text-[14px] text-charcoal leading-[1.75] mb-3">
      {children}
    </p>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold text-charcoal">{children}</strong>
  ),
  em: ({ children }) => (
    <em className="italic text-charcoal/80">{children}</em>
  ),
  ul: ({ children }) => (
    <ul className="mb-3 space-y-1 pl-4">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="mb-3 space-y-1 pl-4 list-decimal">{children}</ol>
  ),
  li: ({ children }) => (
    <li className="font-sans text-[14px] text-charcoal leading-[1.7] flex gap-2 items-start before:content-['–'] before:text-terracotta/60 before:flex-shrink-0 before:mt-[1px]">
      <span>{children}</span>
    </li>
  ),
  blockquote: ({ children }) => (
    <blockquote className="border-l-2 border-forest/30 pl-4 my-4 font-serif text-[15px] italic text-charcoal/70 leading-relaxed">
      {children}
    </blockquote>
  ),
  a: ({ href, children }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-forest underline underline-offset-2 decoration-forest/40 hover:decoration-forest transition-all"
    >
      {children}
    </a>
  ),
  table: ({ children }) => (
    <div className="overflow-x-auto my-4">
      <table className="w-full border-collapse text-[13px] font-sans">
        {children}
      </table>
    </div>
  ),
  thead: ({ children }) => (
    <thead className="bg-sand border-b border-sand-dark">{children}</thead>
  ),
  tr: ({ children }) => (
    <tr className="border-b border-sand-dark/50">{children}</tr>
  ),
  th: ({ children }) => (
    <th className="px-3 py-2 text-left text-[11px] uppercase tracking-[0.1em] text-charcoal font-semibold">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="px-3 py-2 text-charcoal-muted">{children}</td>
  ),
  hr: () => <hr className="my-4 border-sand-dark/60" />,
  code: ({ children }) => (
    <code className="bg-sand px-1.5 py-0.5 font-mono text-[12px] text-charcoal">
      {children}
    </code>
  ),
  pre: ({ children }) => (
    <pre className="bg-sand p-4 overflow-x-auto font-mono text-[12px] text-charcoal my-4">
      {children}
    </pre>
  ),
};

/**
 * Truncates markdown at a word boundary.
 * Splits on whitespace so Markdown syntax tokens count as words —
 * this avoids broken Markdown tags at the cut point.
 */
function truncateAtChars(text: string, charLimit: number): string {
  if (text.length <= charLimit) return text;
  // Cut at a word boundary so we don't slice mid-word
  const cut = text.lastIndexOf(" ", charLimit);
  return text.slice(0, cut > 0 ? cut : charLimit) + "…";
}

export default function EducationDescription({
  markdown,
  collapseAfterWords = 400,
}: Props) {
  const isLong = markdown.length > collapseAfterWords;
  const [expanded, setExpanded] = useState(false);

  const displayText =
    isLong && !expanded
      ? truncateAtChars(markdown, collapseAfterWords)
      : markdown;

  return (
    <div>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {displayText}
      </ReactMarkdown>

      {isLong && (
        <button
          onClick={() => setExpanded((v) => !v)}
          className="mt-2 inline-flex items-center gap-1.5 font-sans text-[11px] uppercase tracking-[0.18em] text-forest font-semibold hover:text-terracotta transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest/50"
          aria-expanded={expanded}
        >
          {expanded ? "Read less ↑" : "Read more ↓"}
        </button>
      )}
    </div>
  );
}
