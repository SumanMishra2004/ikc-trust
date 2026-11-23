import type { PartnershipEvent } from "@/types/partnership";
import { MapPin, Building2, Target } from "lucide-react";

interface Props {
  event: Pick<PartnershipEvent, "objective" | "venue" | "partnerName">;
}

export default function PartnershipEventMetadata({ event }: Props) {
  return (
    <div className="mb-5 space-y-4">
      {/* Objective */}
      <div className="bg-sand/50 border-l-2 border-forest px-4 py-3">
        <span className="font-sans text-[9px] uppercase tracking-[0.2em] text-terracotta font-semibold block mb-1">
          Objective
        </span>
        <p className="font-serif text-[15px] italic text-charcoal leading-snug">
          {event.objective}
        </p>
      </div>

      {/* Venue + Partner */}
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
        {event.partnerName && (
          <span className="inline-flex items-center gap-1.5 font-sans text-[11px] text-charcoal-muted">
            <Building2 size={12} className="flex-shrink-0 text-forest/60" />
            {event.partnerName}
          </span>
        )}
        {event.venue && (
          <span className="inline-flex items-center gap-1.5 font-sans text-[11px] text-charcoal-muted">
            <MapPin size={12} className="flex-shrink-0 text-forest/60" />
            {event.venue}
          </span>
        )}
      </div>
    </div>
  );
}
