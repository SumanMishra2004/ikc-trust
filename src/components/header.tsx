"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Menu, X, ChevronRight,
  GraduationCap, Leaf, Users, HeartPulse, ShieldAlert, Heart, Mic,
  Building2, Network, HeartHandshake, Trophy,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { navLinks, initiativeNavItems, networkNavItems } from "@/data/homepage";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

// Icon maps
const initiativeIconMap: Record<string, React.ReactNode> = {
  "01": <GraduationCap size={15} className="text-white" />,
  "02": <Leaf size={15} className="text-white" />,
  "03": <Users size={15} className="text-white" />,
  "04": <HeartPulse size={15} className="text-white" />,
  "05": <ShieldAlert size={15} className="text-white" />,
  "06": <Heart size={15} className="text-white" />,
  "07": <Mic size={15} className="text-white" />,
};

// Explicit bg class map — keeps full class strings visible to Tailwind's scanner
const initiativeIconBgMap: Record<string, string> = {
  "01": "bg-sky-500",
  "02": "bg-teal-500",
  "03": "bg-green-500",
  "04": "bg-orange-500",
  "05": "bg-gray-500",
  "06": "bg-pink-500",
  "07": "bg-purple-500",
};

const networkIconMap: Record<string, React.ReactNode> = {
  "/partnerships":        <Building2 size={15} className="text-white" />,
  "/collaborators":       <Network size={15} className="text-white" />,
  "/contributors":        <HeartHandshake size={15} className="text-white" />,
  "/awards-recognition":  <Trophy size={15} className="text-white" />,
};

const networkIconBgMap: Record<string, string> = {
  "/partnerships":        "bg-blue-600",
  "/collaborators":       "bg-indigo-500",
  "/contributors":        "bg-rose-500",
  "/awards-recognition":  "bg-amber-500",
};

// Shared dropdown item
function DropdownItem({
  href,
  iconBg,
  icon,
  label,
  description,
  onClick,
}: {
  href: string;
  iconBg: string;
  icon: React.ReactNode;
  label: string;
  description: string;
  onClick?: () => void;
}) {
  return (
    <NavigationMenuLink asChild>
      <Link
        href={href}
        onClick={onClick}
        className="group flex items-start gap-3 px-3 py-3 hover:bg-[#1B3A2D]/5 transition-colors"
      >
        <div className={cn("w-7 h-7 rounded-lg flex-shrink-0 flex items-center justify-center mt-0.5", iconBg)}>
          {icon}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[12px] font-semibold text-[#292B27] group-hover:text-[#244B3C] transition-colors font-sans leading-tight">
            {label}
          </p>
          <p className="text-[11px] text-[#5C5E57] mt-0.5 leading-snug font-sans line-clamp-1">
            {description}
          </p>
        </div>
        <ChevronRight size={12} className="flex-shrink-0 text-[#5C5E57] opacity-0 group-hover:opacity-100 transition-opacity mt-1" />
      </Link>
    </NavigationMenuLink>
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileInitOpen, setMobileInitOpen] = useState(false);
  const [mobileNetOpen, setMobileNetOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => { if (window.innerWidth >= 1280) setMenuOpen(false); };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const closeAll = () => { setMenuOpen(false); setMobileInitOpen(false); setMobileNetOpen(false); };

  return (
    <div className="fixed top-0 left-0 w-full z-50 flex flex-col items-center pt-4 px-4 pointer-events-none">
      <header className="pointer-events-auto w-full max-w-6xl">

        {/* ── Nav bar ── */}
        <div className={cn(
          "floating-dock transition-all duration-300",
          scrolled
            ? "bg-[#F2EFE6]/90 backdrop-blur-xl shadow-[0_8px_32px_rgba(27,58,45,0.18)] border border-[#1B3A2D]/15"
            : "bg-[#F2EFE6]/75 backdrop-blur-lg shadow-[0_4px_24px_rgba(27,58,45,0.12)] border border-[#1B3A2D]/10"
        )}>
          <div className="px-4 md:px-6 h-14 flex items-center justify-between gap-4">

            {/* Brand */}
            <Link href="/" className="flex items-center gap-2.5 group flex-shrink-0">
              <div className="relative w-8 h-8 flex-shrink-0 bg-white/90 rounded-full p-1 transition-transform group-hover:scale-105">
                <Image
                  src="/logo.png"
                  alt="IKC Trust"
                  fill
                  sizes="32px"
                  className="object-contain p-0.5"
                  priority
                />
              </div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden xl:flex items-center">
              <NavigationMenu>
                <NavigationMenuList className="gap-0">

                  {/* About Us */}
                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <Link href={navLinks[0].href}
                        className="text-[11px] uppercase tracking-[0.18em] font-medium text-[#1B3A2D]/75 hover:text-[#1B3A2D] transition-colors px-3 py-2 inline-flex">
                        {navLinks[0].label}
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>

                  {/* ── Initiatives dropdown ── */}
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className={cn(
                      "text-[11px] uppercase tracking-[0.18em] font-medium",
                      "text-[#1B3A2D]/75 hover:text-[#1B3A2D]",
                      "bg-transparent hover:bg-[#1B3A2D]/5",
                      "data-[state=open]:bg-[#1B3A2D]/5 data-[state=open]:text-[#1B3A2D]",
                      "h-auto px-3 py-2 rounded-none focus:outline-none"
                    )}>
                      Initiatives
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="w-[500px] bg-[#F8F5ED] border border-[#1B3A2D]/12 shadow-[0_12px_40px_rgba(27,58,45,0.16)]">
                      <div className="px-4 pt-3 pb-2 border-b border-[#1B3A2D]/10">
                        <p className="text-[10px] uppercase tracking-[0.22em] font-semibold text-[#B9674B]">Our Areas of Commitment</p>
                      </div>
                      <ul className="grid grid-cols-2 gap-px p-2 bg-[#1B3A2D]/5">
                        {initiativeNavItems.map((item) => (
                          <li key={item.href} className="bg-[#F8F5ED]">
                            <DropdownItem
                              href={item.href}
                              iconBg={initiativeIconBgMap[item.number]}
                              icon={initiativeIconMap[item.number]}
                              label={item.label}
                              description={item.description}
                            />
                          </li>
                        ))}
                      </ul>
                      <div className="px-4 py-2.5 border-t border-[#1B3A2D]/10">
                        <Link href="#areas-of-work" className="text-[10px] uppercase tracking-[0.18em] font-semibold text-[#244B3C] hover:text-[#B9674B] transition-colors">
                          View all areas of work →
                        </Link>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  {/* ── Our Network dropdown ── */}
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className={cn(
                      "text-[11px] uppercase tracking-[0.18em] font-medium",
                      "text-[#1B3A2D]/75 hover:text-[#1B3A2D]",
                      "bg-transparent hover:bg-[#1B3A2D]/5",
                      "data-[state=open]:bg-[#1B3A2D]/5 data-[state=open]:text-[#1B3A2D]",
                      "h-auto px-3 py-2 rounded-none focus:outline-none"
                    )}>
                      Our Network
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="w-[420px] bg-[#F8F5ED] border border-[#1B3A2D]/12 shadow-[0_12px_40px_rgba(27,58,45,0.16)]">
                      <div className="px-4 pt-3 pb-2 border-b border-[#1B3A2D]/10">
                        <p className="text-[10px] uppercase tracking-[0.22em] font-semibold text-[#B9674B]">Partners, Donors & Recognition</p>
                      </div>
                      <ul className="p-2 flex flex-col gap-px bg-[#1B3A2D]/5">
                        {networkNavItems.map((item) => (
                          <li key={item.href} className="bg-[#F8F5ED]">
                            <DropdownItem
                              href={item.href}
                              iconBg={networkIconBgMap[item.href]}
                              icon={networkIconMap[item.href]}
                              label={item.label}
                              description={item.description}
                            />
                          </li>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  {/* Remaining plain links */}
                  {navLinks.slice(1).map((link) => (
                    <NavigationMenuItem key={link.href}>
                      <NavigationMenuLink asChild>
                        <Link href={link.href}
                          className="text-[11px] uppercase tracking-[0.18em] font-medium text-[#1B3A2D]/75 hover:text-[#1B3A2D] transition-colors px-3 py-2 inline-flex">
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
              <Link href="/contact"
                className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 bg-[#1B3A2D] text-white font-sans text-[11px] uppercase tracking-[0.18em] font-semibold transition-all duration-300 hover:bg-[#244B3C] hover:shadow-md">
                Get Involved <span>→</span>
              </Link>
              <button aria-label="Toggle menu"
                className="xl:hidden text-[#1B3A2D] hover:text-[#244B3C] transition-colors p-1"
                onClick={() => setMenuOpen((v) => !v)}>
                {menuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>

          </div>
        </div>

        {/* ── Mobile menu ── */}
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

                {/* Plain links */}
                {navLinks.map((link) => (
                  <Link key={link.href} href={link.href} onClick={closeAll}
                    className="text-xs uppercase tracking-[0.18em] font-medium text-[#1B3A2D]/75 hover:text-[#1B3A2D] py-2.5 border-b border-[#1B3A2D]/10 transition-colors">
                    {link.label}
                  </Link>
                ))}

                {/* Initiatives accordion */}
                <div className="border-b border-[#1B3A2D]/10">
                  <button onClick={() => setMobileInitOpen((v) => !v)}
                    className="w-full flex items-center justify-between text-xs uppercase tracking-[0.18em] font-medium text-[#1B3A2D]/75 hover:text-[#1B3A2D] py-2.5 transition-colors">
                    Initiatives
                    <ChevronRight size={14} className={cn("transition-transform duration-200", mobileInitOpen ? "rotate-90" : "")} />
                  </button>
                  <AnimatePresence>
                    {mobileInitOpen && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.18 }} className="overflow-hidden pb-2">
                        {initiativeNavItems.map((item) => (
                          <Link key={item.href} href={item.href} onClick={closeAll}
                            className="flex items-center gap-3 px-2 py-2 hover:bg-[#1B3A2D]/5 transition-colors">
                            <div className={cn("w-6 h-6 rounded-md flex-shrink-0 flex items-center justify-center", initiativeIconBgMap[item.number])}>
                              {initiativeIconMap[item.number]}
                            </div>
                            <span className="text-[11px] font-medium text-[#292B27] font-sans">{item.label}</span>
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Our Network accordion */}
                <div className="border-b border-[#1B3A2D]/10">
                  <button onClick={() => setMobileNetOpen((v) => !v)}
                    className="w-full flex items-center justify-between text-xs uppercase tracking-[0.18em] font-medium text-[#1B3A2D]/75 hover:text-[#1B3A2D] py-2.5 transition-colors">
                    Our Network
                    <ChevronRight size={14} className={cn("transition-transform duration-200", mobileNetOpen ? "rotate-90" : "")} />
                  </button>
                  <AnimatePresence>
                    {mobileNetOpen && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.18 }} className="overflow-hidden pb-2">
                        {networkNavItems.map((item) => (
                          <Link key={item.href} href={item.href} onClick={closeAll}
                            className="flex items-center gap-3 px-2 py-2 hover:bg-[#1B3A2D]/5 transition-colors">
                            <div className={cn("w-6 h-6 rounded-md flex-shrink-0 flex items-center justify-center", networkIconBgMap[item.href])}>
                              {networkIconMap[item.href]}
                            </div>
                            <span className="text-[11px] font-medium text-[#292B27] font-sans">{item.label}</span>
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <Link href="/contact" onClick={closeAll}
                  className="mt-3 px-5 py-2.5 bg-[#1B3A2D] text-white font-sans text-xs uppercase tracking-[0.18em] font-semibold text-center hover:bg-[#244B3C] transition-colors">
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
