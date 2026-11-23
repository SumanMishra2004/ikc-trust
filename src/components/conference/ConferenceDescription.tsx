import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@/types/conference";

interface LinkValue {
  href?: string;
}

const components: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2 className="font-serif text-xl text-forest font-normal mt-6 mb-2 leading-snug">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-serif text-lg text-forest font-normal mt-5 mb-2 leading-snug">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="font-sans text-[13px] uppercase tracking-[0.12em] text-forest font-semibold mt-4 mb-1.5">{children}</h4>
    ),
    normal: ({ children }) => (
      <p className="font-sans text-[14px] text-charcoal leading-[1.75] mb-3">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-2 border-forest/30 pl-4 my-4 font-serif text-[15px] italic text-charcoal/70 leading-relaxed">
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-charcoal">{children}</strong>
    ),
    em: ({ children }) => (
      <em className="italic text-charcoal/80">{children}</em>
    ),
    underline: ({ children }) => (
      <span className="underline underline-offset-2">{children}</span>
    ),
    code: ({ children }) => (
      <code className="bg-sand px-1.5 py-0.5 font-mono text-[12px] text-charcoal">{children}</code>
    ),
    link: ({ value, children }: { value?: LinkValue; children?: React.ReactNode }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-forest underline underline-offset-2 decoration-forest/40 hover:decoration-forest transition-all"
      >
        {children}
      </a>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mb-3 space-y-1 pl-4">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="mb-3 space-y-1 pl-4 list-decimal">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="font-sans text-[14px] text-charcoal leading-[1.7] flex gap-2 items-start">
        <span className="text-terracotta/60 flex-shrink-0 mt-[1px]">–</span>
        <span>{children}</span>
      </li>
    ),
    number: ({ children }) => (
      <li className="font-sans text-[14px] text-charcoal leading-[1.7]">{children}</li>
    ),
  },
};

interface Props {
  description?: PortableTextBlock[];
}

export default function ConferenceDescription({ description }: Props) {
  if (!description || description.length === 0) return null;

  return (
    <div>
      <PortableText value={description} components={components} />
    </div>
  );
}
