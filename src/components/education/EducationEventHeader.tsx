import type { EducationEvent } from "@/types/education";

interface Props {
  event: Pick<EducationEvent, "title" | "eventType" | "date">;
}

const EVENT_TYPE_COLOURS: Record<string, string> = {
  Internship: "bg-forest/10 text-forest",
  Examination: "bg-terracotta/10 text-terracotta",
  Seminar: "bg-sand text-charcoal",
  Workshop: "bg-forest/10 text-forest",
  Symposium: "bg-terracotta/10 text-terracotta",
  Conference: "bg-sand text-charcoal",
  Other: "bg-sand text-charcoal",
};

function formatEventDate(dateStr: string): string {
  // dateStr is "YYYY-MM-DD" — append time to avoid UTC offset shifting the day
  const date = new Date(dateStr + "T00:00:00");
  return date.toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function EducationEventHeader({ event }: Props) {
  const typePill =
    EVENT_TYPE_COLOURS[event.eventType] ?? EVENT_TYPE_COLOURS["Other"];

  return (
    <div className="mb-5">
      {/* Event type badge + date row */}
      <div className="flex flex-wrap items-center gap-3 mb-3">
        <span
          className={`inline-flex items-center px-3 py-1 font-sans text-[10px] uppercase tracking-[0.18em] font-semibold ${typePill}`}
        >
          {event.eventType}
        </span>
        <span className="font-sans text-[11px] text-charcoal-muted tracking-wide">
          {formatEventDate(event.date)}
        </span>
      </div>

      {/* Title */}
      <h2 className="font-serif text-2xl sm:text-3xl md:text-[28px] text-forest leading-[1.2] font-normal">
        {event.title}
      </h2>
    </div>
  );
}
