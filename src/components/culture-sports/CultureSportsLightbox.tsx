"use client";

import { useEffect, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import type { InitiativeEventImage } from "@/types/culture-sports";
import { urlFor } from "@/sanity/image";

interface Props {
  images: InitiativeEventImage[];
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export default function CultureSportsLightbox({ images, currentIndex, onClose, onPrev, onNext }: Props) {
  const image = images[currentIndex];
  const total = images.length;

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") onClose();
    if (e.key === "ArrowLeft") onPrev();
    if (e.key === "ArrowRight") onNext();
  }, [onClose, onPrev, onNext]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", handleKeyDown); document.body.style.overflow = ""; };
  }, [handleKeyDown]);

  if (!image?.asset?._ref) return null;
  const imageUrl = urlFor(image.asset).width(1600).fit("max").auto("format").quality(90).url();

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-charcoal/92 backdrop-blur-sm" onClick={onClose} role="dialog" aria-modal="true" aria-label={`Image ${currentIndex + 1} of ${total}: ${image.alt}`}>
      <div className="relative w-full h-full flex flex-col items-center justify-center px-4 py-16" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} aria-label="Close lightbox" className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center bg-warm-white/10 hover:bg-warm-white/20 text-warm-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-warm-white/50"><X size={18} /></button>
        <div className="absolute top-4 left-1/2 -translate-x-1/2 font-sans text-[11px] uppercase tracking-[0.18em] text-warm-white/60">{currentIndex + 1} / {total}</div>
        <div className="relative w-full max-w-5xl max-h-[75vh] flex items-center justify-center">
          <Image src={imageUrl} alt={image.alt || "Event photograph"} width={1600} height={900} className="object-contain max-h-[75vh] w-auto" priority unoptimized />
        </div>
        {image.caption && <p className="mt-4 font-sans text-xs text-warm-white/60 text-center max-w-xl">{image.caption}</p>}
        {total > 1 && (
          <>
            <button onClick={onPrev} aria-label="Previous image" className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-warm-white/10 hover:bg-warm-white/20 text-warm-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-warm-white/50"><ChevronLeft size={20} /></button>
            <button onClick={onNext} aria-label="Next image" className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-warm-white/10 hover:bg-warm-white/20 text-warm-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-warm-white/50"><ChevronRight size={20} /></button>
          </>
        )}
        {total > 1 && total <= 10 && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
            {images.map((_, i) => <span key={i} className={`w-1.5 h-1.5 rounded-full transition-all ${i === currentIndex ? "bg-warm-white scale-125" : "bg-warm-white/30"}`} />)}
          </div>
        )}
      </div>
    </div>
  );
}
