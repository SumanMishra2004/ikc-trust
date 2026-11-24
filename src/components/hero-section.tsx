"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { hero } from "@/data/homepage";

// ─── Stat icons as inline SVGs to avoid extra dependencies ───────────────────

function CommunityIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="10" cy="9" r="3" stroke="#244B3C" strokeWidth="1.5" fill="none" />
      <circle cx="18" cy="9" r="3" stroke="#244B3C" strokeWidth="1.5" fill="none" />
      <path d="M4 22c0-3.314 2.686-6 6-6s6 2.686 6 6" stroke="#244B3C" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <path d="M18 16c2.209 0 4 1.791 4 4v2" stroke="#244B3C" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    </svg>
  );
}

function LegalIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 4L6 8v5c0 4.418 3.134 8.548 8 9.9C19.866 21.548 22 17.418 22 13V8L14 4z" stroke="#244B3C" strokeWidth="1.5" strokeLinejoin="round" fill="none" />
      <path d="M10 14l2.5 2.5L18 11" stroke="#244B3C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function GrassrootsIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 18c0-5 3-9 5-12 2 3 5 7 5 12" stroke="#244B3C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M14 6v16" stroke="#244B3C" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M6 22h16" stroke="#244B3C" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M9 14c-2-1-4-1-5 1" stroke="#244B3C" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <path d="M19 14c2-1 4-1 5 1" stroke="#244B3C" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    </svg>
  );
}

const iconMap: Record<string, React.ReactNode> = {
  community: <CommunityIcon />,
  legal: <LegalIcon />,
  grassroots: <GrassrootsIcon />,
};

// ─── Animation variants ───────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay },
  }),
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-screen flex flex-col overflow-hidden bg-[#F2EFE6]">

      {/* ── Background images ─────────────────────────────────────────────── */}
      <div className="absolute inset-0 z-0">
        {/* Desktop */}
        <Image
          src="/homebg.png"
          alt={hero.imageAlt}
          fill
          priority
          sizes="100vw"
          className="hidden md:block object-cover object-center"
          quality={95}
        />
        {/* Mobile */}
        <Image
          src="/mobilebg.png"
          alt={hero.imageAlt}
          fill
          priority
          sizes="100vw"
          className="block md:hidden object-cover object-center"
          quality={95}
        />
        {/* Left-to-right subtle overlay */}
        
      </div>

      {/* ── Content area — left column ───────────────────────────────────── */}
      {/*
        On desktop the illustrated scene fills the right half naturally from
        the background image, so we only need to lay out the left content.
        The left column stops at ~55% width on large screens.
      */}
      <div className="relative z-10 flex flex-col justify-center min-h-screen pt-24 pb-10">
        <div className="w-full px-6 md:px-12 lg:px-20">
          <div className="max-w-[600px] lg:max-w-[52%] xl:max-w-[48%]">

            {/* Eyebrow */}
            <motion.div
              custom={0.05}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="flex items-center gap-3 mb-5 md:mb-6"
            >
              <span className="w-8 h-px bg-[#244B3C] flex-shrink-0" />
              <span className="font-sans text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-[#244B3C] font-medium">
                {hero.eyebrow}
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              custom={0.18}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="font-serif font-normal leading-[1.1] tracking-tight text-balance mb-5 md:mb-6"
            >
              {/* "Building a better tomorrow through" — dark forest green */}
              <span className="block text-[#1B3A2D] text-4xl sm:text-5xl md:text-[52px] lg:text-[58px] xl:text-[64px]">
                {hero.headlineLine1}
              </span>
              <span className="block text-[#1B3A2D] text-4xl sm:text-5xl md:text-[52px] lg:text-[58px] xl:text-[64px]">
                {hero.headlineLine2}
              </span>
              {/* Italic terracotta/golden-green line */}
              <span className="block italic text-[#B8860B] text-4xl sm:text-5xl md:text-[52px] lg:text-[58px] xl:text-[64px]">
                {hero.headlineItalic}
              </span>
            </motion.h1>

            {/* Body */}
            <motion.p
              custom={0.32}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="font-sans text-sm sm:text-base md:text-[15px] text-[#3A3A3A] leading-relaxed max-w-[460px] mb-7 md:mb-8"
            >
              {hero.body}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              custom={0.44}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="flex flex-wrap items-center gap-3 sm:gap-4 mb-10 md:mb-12"
            >
              {/* Primary — dark filled pill/rect */}
              <Link
                href={hero.ctaPrimary.href}
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#1B3A2D] text-white font-sans text-[13px] font-medium tracking-wide hover:bg-[#244B3C] transition-colors duration-200 group"
              >
                {hero.ctaPrimary.label}
                <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5">→</span>
              </Link>

              {/* Secondary — outline */}
              <Link
                href={hero.ctaSecondary.href}
                className="inline-flex items-center gap-2 px-6 py-3 border border-[#1B3A2D]/60 text-[#1B3A2D] font-sans text-[13px] font-medium tracking-wide hover:border-[#1B3A2D] hover:bg-[#1B3A2D]/5 transition-colors duration-200"
              >
                {hero.ctaSecondary.label}
                <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5">→</span>
              </Link>
            </motion.div>

            {/* ── Stat chips ──────────────────────────────────────────────── */}
            <motion.div
              custom={0.56}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="flex flex-wrap items-start gap-4 sm:gap-6 md:gap-8"
            >
              {hero.stats.map((stat) => (
                <div key={stat.label} className="flex items-start gap-2.5 min-w-0">
                  {/* Icon */}
                  <div className="flex-shrink-0 mt-0.5 opacity-80">
                    {iconMap[stat.icon]}
                  </div>
                  {/* Text */}
                  <div className="flex flex-col min-w-0">
                    <span className="font-sans text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-[#244B3C]/70 font-medium leading-none mb-1">
                      {stat.label}
                    </span>
                    <span className="font-sans text-[12px] sm:text-[13px] font-semibold text-[#1B3A2D] leading-tight">
                      {stat.value}
                    </span>
                  </div>
                </div>
              ))}
            </motion.div>

          </div>
        </div>
      </div>

    </section>
  );
}
