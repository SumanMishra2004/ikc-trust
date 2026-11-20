"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Menu, X, ChevronRight,
  GraduationCap, Leaf, Users, HeartPulse, ShieldAlert, Heart,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { navLinks, initiativeNavItems } from "@/data/homepage";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const iconMap: Record<string, React.ReactNode> = {
  "01": <GraduationCap size={16} className="text-white" />,
  "02": <Leaf size={16} className="text-white" />,
  "03": <Users size={16} className="text-white" />,
  "04": <HeartPulse size={16} className="text-white" />,
  "05": <ShieldAlert size={16} className="text-white" />,
  "06": <Heart size={16} className="text-white" />,
};

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileInitiativesOpen, setMobileInitiativesOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth >= 1280) {
      const handleResize = () => { if (window.innerWidth >= 1280) setMenuOpen(false); };
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full z-50 flex flex-col items-center pt-4 px-4 pointer-events-none">
      <header className="pointer-events-auto w-full max-w-6xl">

        {/* ── Nav bar ─────────────────────────────────────────────────────── */}
        <div
          className={cn(
            "floating-dock transition-all duration-300",
            scrolled
              ? "bg-[#F2EFE6]/90 backdrop-blur-xl shadow-[0_8px_32px_rgba(27,58,45,0.18)] border border-[#1B3A2D]/15"
              : "bg-[#F2EFE6]/75 backdrop-blur-lg shadow-[0_4px_24px_rgba(27,58,45,0.12)] border border-[#1B3A2D]/10"
          )}
        >
          <div className="px-4 md:px-6 h-14 flex items-center justify-between gap-4">

            {/* Brand */}
            <Link href="/" className="flex items-center gap-3 group flex-shrink-0">
              <div className="w-8 h-8 rounded-full border border-[#1B3A2D]/40 flex items-center justify-center bg-[#1B3A2D]/10 text-[#1B3A2D] transition-transform group-hover:scale-105">
                <span className="font-serif italic font-bold text-base leading-none">I</span>
              </div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden xl:flex items-center">
              <NavigationMenu>
                <NavigationMenuList className="gap-0">

                  {/* Plain links — first item (About Us) */}
                  <NavigationMenuItem key={navLinks[0].href}>
                    <NavigationMenuLink asChild>
                      <Link
                        href={navLinks[0].href}
                        className="text-[11px] uppercase tracking-[0.18em] font-medium text-[#1B3A2D]/75 hover:text-[#1B3A2D] transition-colors px-3 py-2 inline-flex"
                      >
                        {navLinks[0].label}
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>

                  {/* Initiatives dropdown — second position */}
                  <NavigationMenuItem>
                    <NavigationMenuTrigger
                      className={cn(
                        "text-[11px] uppercase tracking-[0.18em] font-medium",
                        "text-[#1B3A2D]/75 hover:text-[#1B3A2D]",
                        "bg-transparent hover:bg-[#1B3A2D]/5",
                        "data-[state=open]:bg-[#1B3A2D]/5 data-[state=open]:text-[#1B3A2D]",
                        "h-auto px-3 py-2 rounded-none focus:outline-none"
                      )}
                    >
                      Initiatives
                    </NavigationMenuTrigger>

                    {/* Dropdown panel — anchored left-0 top-full of the MenuItem */}
                    <NavigationMenuContent className="w-[500px] bg-[#F8F5ED] border border-[#1B3A2D]/12 shadow-[0_12px_40px_rgba(27,58,45,0.16)]">
                      {/* Label */}
                      <div className="px-4 pt-3 pb-2 border-b border-[#1B3A2D]/10">
                        <p className="text-[10px] uppercase tracking-[0.22em] font-semibold text-[#B9674B]">
                          Our Areas of Commitment
                        </p>
                      </div>

                      {/* 2-column grid of 6 items */}
                      <ul className="grid grid-cols-2 gap-px p-2 bg-[#1B3A2D]/5">
                        {initiativeNavItems.map((item) => (
                          <li key={item.href} className="bg-[#F8F5ED]">
                            <NavigationMenuLink asChild>
                              <Link
                                href={item.href}
                                className="group flex items-start gap-3 px-3 py-3 hover:bg-[#1B3A2D]/5 transition-colors"
                              >
                                <div className={cn(
                                  "w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center mt-0.5",
                                  item.iconBg
                                )}>
                                  {iconMap[item.number]}
                                </div>
                                <div className="min-w-0 flex-1">
                                  <p className="text-[12px] font-semibold text-[#292B27] group-hover:text-[#244B3C] transition-colors font-sans leading-tight">
                                    {item.label}
                                  </p>
                                  <p className="text-[11px] text-[#5C5E57] mt-0.5 leading-snug font-sans line-clamp-1">
                                    {item.description}
                                  </p>
                                </div>
                                <ChevronRight
                                  size={13}
                                  className="flex-shrink-0 text-[#5C5E57] opacity-0 group-hover:opacity-100 transition-opacity mt-1"
                                />
                              </Link>
                            </NavigationMenuLink>
                          </li>
                        ))}
                      </ul>

                      {/* Footer */}
                      <div className="px-4 py-2.5 border-t border-[#1B3A2D]/10">
                        <Link
                          href="#areas-of-work"
                          className="text-[10px] uppercase tracking-[0.18em] font-semibold text-[#244B3C] hover:text-[#B9674B] transition-colors"
                        >
                          View all areas of work →
                        </Link>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  {/* Remaining plain links (Our Work, Our Impact, Partnerships, Contact) */}
                  {navLinks.slice(1).map((link) => (
                    <NavigationMenuItem key={link.href}>
                      <NavigationMenuLink asChild>
                        <Link
                          href={link.href}
                          className="text-[11px] uppercase tracking-[0.18em] font-medium text-[#1B3A2D]/75 hover:text-[#1B3A2D] transition-colors px-3 py-2 inline-flex"
                        >
                          {link.label}
                        </Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  ))}

                </NavigationMenuList>
              </NavigationMenu>
            </nav>

            {/* CTA + hamburger */}
            <div className="flex items-center gap-3">
              <Link
                href="#contact"
                className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 bg-[#1B3A2D] text-white font-sans text-[11px] uppercase tracking-[0.18em] font-semibold transition-all duration-300 hover:bg-[#244B3C] hover:shadow-md"
              >
                Get Involved <span>→</span>
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
        </div>

        {/* ── Mobile menu ──────────────────────────────────────────────────── */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.22, ease: "easeInOut" }}
              className="floating-dock-mobile-menu xl:hidden overflow-hidden border border-t-0 border-[#1B3A2D]/10 bg-[#F2EFE6]/95 backdrop-blur-xl"
            >
              <nav className="flex flex-col px-5 py-4 gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="text-xs uppercase tracking-[0.18em] font-medium text-[#1B3A2D]/75 hover:text-[#1B3A2D] py-2.5 border-b border-[#1B3A2D]/10 transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}

                {/* Initiatives accordion */}
                <div className="border-b border-[#1B3A2D]/10">
                  <button
                    onClick={() => setMobileInitiativesOpen((v) => !v)}
                    className="w-full flex items-center justify-between text-xs uppercase tracking-[0.18em] font-medium text-[#1B3A2D]/75 hover:text-[#1B3A2D] py-2.5 transition-colors"
                  >
                    Initiatives
                    <ChevronRight
                      size={14}
                      className={cn("transition-transform duration-200", mobileInitiativesOpen ? "rotate-90" : "")}
                    />
                  </button>
                  <AnimatePresence>
                    {mobileInitiativesOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.18 }}
                        className="overflow-hidden pb-2"
                      >
                        {initiativeNavItems.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => { setMenuOpen(false); setMobileInitiativesOpen(false); }}
                            className="flex items-center gap-3 px-2 py-2 hover:bg-[#1B3A2D]/5 transition-colors"
                          >
                            <div className={cn("w-6 h-6 rounded-md flex-shrink-0 flex items-center justify-center", item.iconBg)}>
                              {iconMap[item.number]}
                            </div>
                            <span className="text-[11px] font-medium text-[#292B27] font-sans">
                              {item.label}
                            </span>
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <Link
                  href="#contact"
                  onClick={() => setMenuOpen(false)}
                  className="mt-3 px-5 py-2.5 bg-[#1B3A2D] text-white font-sans text-xs uppercase tracking-[0.18em] font-semibold text-center hover:bg-[#244B3C] transition-colors"
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
