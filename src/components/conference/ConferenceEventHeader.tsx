import type { ConferenceEvent, ConferenceMode } from "@/types/conference";

interface Props {
  event: Pick<ConferenceEvent, "title" | "date" | "mode">;
}

const MODE_COLOURS: Record<ConferenceMode, string> = {
  "In-Person": "bg-forest/10 text-forest",
  "Online":    "bg-terracotta/10 text-terracotta",
  "Hybrid":    "bg-sand text-charcoal",
};

function formatConferenceDate(dateStr: string): string {
  const date = new Date(dateStr + "T00:00:00");
  return date.toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" });
}

export default function ConferenceEventHeader({ event }: Props) {
  const modePill = event.mode ? (MODE_COLOURS[event.mode] ?? MODE_COLOURS["Hybrid"]) : null;

  return (
    <div className="mb-5">
      <div className="flex flex-wrap items-center gap-3 mb-3">
        {modePill && event.mode && (
          <span className={`inline-flex items-center px-3 py-1 font-sans text-[10px] uppercase tracking-[0.18em] font-semibold ${modePill}`}>
            {event.mode}
          </span>
        )}
        {event.date && (
          <span className="font-sans text-[11px] text-charcoal-muted tracking-wide">
            {formatConferenceDate(event.date)}
          </span>
        )}
      </div>
      <h2 className="font-serif text-2xl sm:text-3xl text-forest leading-[1.2] font-normal">
        {event.title}
      </h2>
    </div>
  );
}
