import Image from "next/image";
import type { InitiativeEventImage } from "@/types/culture-sports";
import { urlFor } from "@/sanity/image";

interface Props {
  images: InitiativeEventImage[];
}

export default function ConferenceImageGallery({ images }: Props) {
  if (!images || images.length === 0) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {images.map((image) => {
        const src = urlFor(image.asset).width(800).auto("format").quality(85).url();
        return (
          <div key={image._key} className="border border-sand-dark overflow-hidden">
            <div className="relative w-full" style={{ aspectRatio: "4/3" }}>
              <Image
                src={src}
                alt={image.alt || "Conference photograph"}
                fill
                sizes="(max-width: 768px) 100vw, 400px"
                className="object-cover"
                placeholder={image.lqip ? "blur" : "empty"}
                blurDataURL={image.lqip}
              />
            </div>
            {image.caption && (
              <p className="font-sans text-[11px] text-charcoal-muted px-3 py-2 bg-sand/40 leading-snug">
                {image.caption}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
