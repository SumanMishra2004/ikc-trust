import type { ConferenceEvent } from "@/types/conference";
import { MapPin, Clock, ExternalLink, Download } from "lucide-react";

interface Props {
  event: Pick<ConferenceEvent, "summary" | "venue" | "timing" | "link" | "abstractBookUrl">;
}

export default function ConferenceEventMetadata({ event }: Props) {
  const hasSummary = Boolean(event.summary);
  const hasVenue = Boolean(event.venue);
  const hasTiming = Boolean(event.timing);
  const hasLink = Boolean(event.link);
  const hasAbstractBook = Boolean(event.abstractBookUrl);

  return (
    <div className="mb-5 space-y-4">
      {hasSummary && (
        <div className="bg-sand/50 border-l-2 border-forest px-4 py-3">
          <span className="font-sans text-[9px] uppercase tracking-[0.2em] text-terracotta font-semibold block mb-1">Summary</span>
          <p className="font-serif text-[15px] italic text-charcoal leading-snug">{event.summary}</p>
        </div>
      )}

      {(hasVenue || hasTiming) && (
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          {hasVenue && (
            <span className="inline-flex items-center gap-1.5 font-sans text-[11px] text-charcoal-muted">
              <MapPin size={12} className="flex-shrink-0 text-forest/60" />
              {event.venue}
            </span>
          )}
          {hasTiming && (
            <span className="inline-flex items-center gap-1.5 font-sans text-[11px] text-charcoal-muted">
              <Clock size={12} className="flex-shrink-0 text-forest/60" />
              {event.timing}
            </span>
          )}
        </div>
      )}

      {(hasLink || hasAbstractBook) && (
        <div className="flex flex-wrap items-center gap-3">
          {hasLink && (
            <a
              href={event.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-sans text-[11px] uppercase tracking-[0.18em] text-forest font-semibold hover:text-terracotta transition-colors"
            >
              Visit Website
              <ExternalLink size={11} className="flex-shrink-0" />
            </a>
          )}
          {hasAbstractBook && (
            <a
              href={event.abstractBookUrl}
              target="_blank"
              rel="noopener noreferrer"
              download
              className="inline-flex items-center gap-1.5 font-sans text-[11px] uppercase tracking-[0.18em] text-forest font-semibold hover:text-terracotta transition-colors"
            >
              <Download size={11} className="flex-shrink-0" />
              Download Abstract Book (PDF)
            </a>
          )}
        </div>
      )}
    </div>
  );
}
