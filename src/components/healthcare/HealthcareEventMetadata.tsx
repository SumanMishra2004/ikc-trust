import type { HealthcareEvent } from "@/types/healthcare";
import { MapPin, Monitor, Users } from "lucide-react";

interface Props {
  event: Pick<HealthcareEvent, "objective" | "venue" | "mode">;
}

const MODE_ICON: Record<string, React.ReactNode> = {
  Offline: <MapPin size={12} className="flex-shrink-0 mt-[1px]" />,
  Online: <Monitor size={12} className="flex-shrink-0 mt-[1px]" />,
  Hybrid: <Users size={12} className="flex-shrink-0 mt-[1px]" />,
};

export default function HealthcareEventMetadata({ event }: Props) {
  const hasVenue = Boolean(event.venue);
  const hasMode = Boolean(event.mode);

  return (
    <div className="mb-5 space-y-4">
      <div className="bg-sand/50 border-l-2 border-forest px-4 py-3">
        <span className="font-sans text-[9px] uppercase tracking-[0.2em] text-terracotta font-semibold block mb-1">
          Objective
        </span>
        <p className="font-serif text-[15px] italic text-charcoal leading-snug">
          {event.objective}
        </p>
      </div>
      {(hasVenue || hasMode) && (
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          {hasVenue && (
            <span className="inline-flex items-center gap-1.5 font-sans text-[11px] text-charcoal-muted">
              <MapPin size={12} className="flex-shrink-0 text-forest/60" />
              {event.venue}
            </span>
          )}
          {hasMode && (
            <span className="inline-flex items-center gap-1.5 font-sans text-[11px] text-charcoal-muted">
              <span className="text-forest/60">
                {MODE_ICON[event.mode!] ?? <Monitor size={12} />}
              </span>
              {event.mode}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
