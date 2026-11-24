"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Linkedin, Mail } from "lucide-react";
import type { TeamMember } from "@/types/people";

export type { TeamMember };

// ─── Placeholder data ─────────────────────────────────────────────────────────

const PLACEHOLDER_MEMBERS = [
  {
    _id: "ph-1",
    name: "Dr. Arjun Mukherjee",
    position: "Founder & President",
    affiliation: "IKC Trust · Kolkata",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=480&fit=crop&crop=face&auto=format&q=85",
    linkedin: "",
    email: "admin@ikc.org.in",
  },
  {
    _id: "ph-2",
    name: "Priya Banerjee",
    position: "Director — Education",
    affiliation: "School of Social Work, Kolkata",
    photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=480&fit=crop&crop=face&auto=format&q=85",
    linkedin: "",
    email: "",
  },
  {
    _id: "ph-3",
    name: "Dr. Rajan Ghosh",
    position: "Head — Healthcare",
    affiliation: "SSKM Hospital · Mobile Health",
    photo: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=480&fit=crop&crop=face&auto=format&q=85",
    linkedin: "",
    email: "",
  },
  {
    _id: "ph-4",
    name: "Sumita Das",
    position: "Programme Coordinator",
    affiliation: "Women Empowerment Cell",
    photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=480&fit=crop&crop=face&auto=format&q=85",
    linkedin: "",
    email: "",
  },
  {
    _id: "ph-5",
    name: "Tanmoy Roy",
    position: "Field Operations Lead",
    affiliation: "Sundarbans & Junglemahal",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=480&fit=crop&crop=face&auto=format&q=85",
    linkedin: "",
    email: "",
  },
  {
    _id: "ph-6",
    name: "Ananya Sen",
    position: "Environment Officer",
    affiliation: "Purulia & Bankura Belt",
    photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=480&fit=crop&crop=face&auto=format&q=85",
    linkedin: "",
    email: "",
  },
  {
    _id: "ph-7",
    name: "Debasis Mondal",
    position: "Finance & Compliance",
    affiliation: "Trust Administration · HQ",
    photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=480&fit=crop&crop=face&auto=format&q=85",
    linkedin: "",
    email: "",
  },
  {
    _id: "ph-8",
    name: "Ritika Chatterjee",
    position: "Communications",
    affiliation: "Media & Public Affairs",
    photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=480&fit=crop&crop=face&auto=format&q=85",
    linkedin: "",
    email: "",
  },
  {
    _id: "ph-9",
    name: "Sourav Dey",
    position: "Disaster Relief Coordinator",
    affiliation: "Delta Contingency Fleet",
    photo: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=400&h=480&fit=crop&crop=face&auto=format&q=85",
    linkedin: "",
    email: "",
  },
];

// ─── SVG watermark — lotus / leaf illustration ────────────────────────────────
// A simple stylised lotus flower rendered in white at low opacity,
// sitting in the bottom-right corner of each card.

function LotusWatermark() {
  return (
    <svg
      viewBox="0 0 120 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute bottom-[68px] right-3 w-20 h-16 pointer-events-none select-none opacity-[0.07]"
      aria-hidden="true"
    >
      {/* Centre petal */}
      <path
        d="M60 85 C60 85 44 62 44 44 C44 30 52 20 60 16 C68 20 76 30 76 44 C76 62 60 85 60 85Z"
        fill="white"
      />
      {/* Left petal */}
      <path
        d="M60 85 C60 85 32 72 24 55 C18 42 22 28 32 24 C42 28 50 42 50 55 C50 68 60 85 60 85Z"
        fill="white"
      />
      {/* Right petal */}
      <path
        d="M60 85 C60 85 88 72 96 55 C102 42 98 28 88 24 C78 28 70 42 70 55 C70 68 60 85 60 85Z"
        fill="white"
      />
      {/* Far left petal */}
      <path
        d="M60 85 C60 85 20 78 10 62 C4 50 10 36 20 34 C30 36 36 50 38 62 C40 72 60 85 60 85Z"
        fill="white"
        opacity="0.7"
      />
      {/* Far right petal */}
      <path
        d="M60 85 C60 85 100 78 110 62 C116 50 110 36 100 34 C90 36 84 50 82 62 C80 72 60 85 60 85Z"
        fill="white"
        opacity="0.7"
      />
      {/* Stem */}
      <path
        d="M60 85 L60 98"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Left leaf */}
      <path
        d="M60 94 C52 90 42 92 38 98 C44 96 54 96 60 94Z"
        fill="white"
        opacity="0.6"
      />
      {/* Right leaf */}
      <path
        d="M60 94 C68 90 78 92 82 98 C76 96 66 96 60 94Z"
        fill="white"
        opacity="0.6"
      />
    </svg>
  );
}

// ─── Single card ──────────────────────────────────────────────────────────────

function MemberCard({
  name,
  position,
  affiliation,
  photoSrc,
  linkedin,
  email,
  index,
}: {
  name: string;
  position: string;
  affiliation: string;
  photoSrc: string;
  linkedin?: string;
  email?: string;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
        delay: (index % 4) * 0.09,
      }}
      className="group relative overflow-hidden bg-[#1B3A2D]"
      style={{ aspectRatio: "3/4" }}
    >
      {/* Photo */}
      <Image
        src={photoSrc}
        alt={name}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
      />

      {/* Gradient overlay — always on */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#1B3A2D] via-[#1B3A2D]/20 to-transparent" />

      {/* Lotus SVG watermark */}
      <LotusWatermark />

      {/* Top-left terracotta corner marks */}
      <div className="absolute top-0 left-0 w-8 h-[2.5px] bg-[#B9674B]" />
      <div className="absolute top-0 left-0 w-[2.5px] h-8 bg-[#B9674B]" />

      {/* Index */}
      <span className="absolute top-3 right-4 font-serif italic text-[11px] text-white/25 tracking-widest">
        {String(index).padStart(2, "0")}
      </span>

      {/* ── Static bottom info ── */}
      <div
        className="absolute bottom-0 left-0 right-0 px-5 pb-5 pt-8
                   transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
                   group-hover:-translate-y-[60px]"
      >
        <span className="flex items-center gap-2 mb-1.5">
          <span className="w-3 h-[1.5px] bg-[#B9674B] flex-shrink-0" />
          <span className="text-[9px] font-sans uppercase tracking-[0.24em] text-[#B9674B] font-semibold truncate">
            {position}
          </span>
        </span>
        <h3 className="font-serif text-[17px] text-white leading-snug font-normal">
          {name}
        </h3>
      </div>

      {/* ── Hover drawer — affiliation + socials ── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[60px]
                   bg-[#244B3C] border-t border-white/10
                   px-5 flex items-center justify-between gap-3
                   translate-y-full group-hover:translate-y-0
                   transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
      >
        <p className="font-sans text-[11px] text-white/55 leading-tight line-clamp-1 flex-1">
          {affiliation}
        </p>

        {(linkedin || email) && (
          <div className="flex items-center gap-1.5 flex-shrink-0">
            {linkedin && (
              <a
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                onClick={(e) => e.stopPropagation()}
                className="w-6 h-6 border border-white/20 flex items-center justify-center
                           text-white/40 hover:bg-white hover:text-[#1B3A2D] hover:border-white
                           transition-colors duration-150"
              >
                <Linkedin size={10} />
              </a>
            )}
            {email && (
              <a
                href={`mailto:${email}`}
                aria-label="Email"
                onClick={(e) => e.stopPropagation()}
                className="w-6 h-6 border border-white/20 flex items-center justify-center
                           text-white/40 hover:bg-[#B9674B] hover:text-white hover:border-[#B9674B]
                           transition-colors duration-150"
              >
                <Mail size={10} />
              </a>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

interface Props {
  members: TeamMember[];
}

export default function TeamSection({ members }: Props) {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-60px" });

  const usePlaceholder = members.length === 0;

  const display = usePlaceholder
    ? PLACEHOLDER_MEMBERS
    : members.map((m) => ({
        _id: m._id,
        name: m.name,
        position: m.position,
        affiliation: m.affiliation,
        photo: (() => {
          try {
            // eslint-disable-next-line @typescript-eslint/no-require-imports
            const { urlFor } = require("@/sanity/image");
            return urlFor(m.photo.asset)
              .width(400).height(480)
              .fit("fill").bg("1B3A2D")
              .auto("format").quality(88)
              .url();
          } catch {
            return "";
          }
        })(),
        linkedin: m.linkedin,
        email: m.email,
      }));

  return (
    <section className="w-full bg-[#FFFDF8] py-20 md:py-28">
      <div className="w-full px-6 md:px-12 lg:px-20">

        {/* Header */}
        <div ref={headerRef} className="mb-14">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={headerInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-7"
          >
            <span className="w-8 h-[2px] bg-[#B9674B] flex-shrink-0" />
            <span className="text-xs font-sans uppercase tracking-[0.25em] text-[#B9674B] font-semibold">
              The People Behind the Mission
            </span>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-16 pb-10 border-b border-[#D9D2C5]/60">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.08 }}
              className="lg:col-span-6"
            >
              <h2 className="font-serif text-4xl sm:text-5xl text-[#292B27] leading-[1.1] font-normal tracking-tight">
                Our Team.{" "}
                <span className="italic text-[#244B3C]">Driven by Purpose.</span>
              </h2>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.16 }}
              className="lg:col-span-6 flex items-end"
            >
              <p className="font-sans text-base text-[#5C5E57] leading-relaxed max-w-lg">
                Dedicated professionals and change-makers building stronger
                communities across West Bengal through care, knowledge, and action.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Placeholder notice */}
        {usePlaceholder && (
          <div className="mb-8 px-4 py-2.5 border-l-2 border-[#B9674B] bg-[#B9674B]/5">
            <p className="font-sans text-[10px] text-[#B9674B] uppercase tracking-[0.18em] font-semibold">
              Sample layout — add real members via Sanity Studio
            </p>
          </div>
        )}

        {/* Grid — 4 columns on large, 3 on medium, 2 on small */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
          {display.map((m, i) => (
            <MemberCard
              key={m._id}
              name={m.name}
              position={m.position}
              affiliation={m.affiliation}
              photoSrc={m.photo as string}
              linkedin={m.linkedin}
              email={m.email}
              index={i + 1}
            />
          ))}
        </div>

        {/* Footer */}
        <div className="mt-12 pt-7 border-t border-[#D9D2C5]/60 flex items-center justify-between flex-wrap gap-3">
          <span className="text-[11px] font-sans uppercase tracking-[0.2em] text-[#5C5E57]">
            {display.length} Core Team Member{display.length !== 1 ? "s" : ""}
          </span>
          <span className="text-[11px] font-sans uppercase tracking-[0.2em] text-[#244B3C] font-semibold">
            Kolkata, West Bengal
          </span>
        </div>

      </div>
    </section>
  );
}
