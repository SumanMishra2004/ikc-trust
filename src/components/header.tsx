"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { navLinks, siteConfig } from "@/data/homepage";
import { cn } from "@/lib/utils";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) setMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full z-50 flex flex-col items-center pt-4 px-4 pointer-events-none">
      {/* Floating Dock */}
      <header
        className={cn(
          "floating-dock pointer-events-auto w-full max-w-6xl overflow-hidden transition-all duration-300",
          scrolled
            ? "bg-[#F2EFE6]/90 backdrop-blur-xl shadow-[0_8px_32px_rgba(27,58,45,0.18)] border border-[#1B3A2D]/15"
            : "bg-[#F2EFE6]/75 backdrop-blur-lg shadow-[0_4px_24px_rgba(27,58,45,0.12)] border border-[#1B3A2D]/10"
        )}
      >
        <div className="px-4 md:px-6 h-14 flex items-center justify-between gap-4">
          {/* Brand Lockup */}
          <Link href="#" className="flex items-center gap-3 group flex-shrink-0">
            <div className="w-8 h-8 rounded-full border border-[#1B3A2D]/40 flex items-center justify-center bg-[#1B3A2D]/10 text-[#1B3A2D] transition-transform group-hover:scale-105">
              <span className="font-serif italic font-bold text-base leading-none">I</span>
            </div>
            
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden xl:flex items-center gap-6 2xl:gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[11px] uppercase tracking-[0.18em] font-medium text-[#1B3A2D]/75 hover:text-[#1B3A2D] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA + Mobile Hamburger */}
          <div className="flex items-center gap-3">
            <Link
              href="#contact"
              className="floating-dock-cta hidden sm:inline-flex items-center gap-1.5 px-4 py-2 bg-[#1B3A2D] text-white font-sans text-[11px] uppercase tracking-[0.18em] font-semibold transition-all duration-300 hover:bg-[#244B3C] hover:shadow-md"
            >
              Get Involved
              <span>→</span>
            </Link>
            <button
              aria-label="Toggle menu"
              className="xl:hidden text-[#1B3A2D] hover:text-[#244B3C] transition-colors p-1"
              onClick={() => setMenuOpen((v) => !v)}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.22, ease: "easeInOut" }}
              className="floating-dock-mobile-menu xl:hidden overflow-hidden border-t border-[#1B3A2D]/10"
            >
              <nav className="flex flex-col px-5 py-4 gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="text-xs uppercase tracking-[0.18em] font-medium text-[#1B3A2D]/75 hover:text-[#1B3A2D] py-2.5 border-b border-[#1B3A2D]/10 last:border-0 transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  href="#contact"
                  onClick={() => setMenuOpen(false)}
                  className="floating-dock-cta mt-3 px-5 py-2.5 bg-[#1B3A2D] text-white font-sans text-xs uppercase tracking-[0.18em] font-semibold text-center hover:bg-[#244B3C] transition-colors"
                >
                  Get Involved
                </Link>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </div>
  );
}
