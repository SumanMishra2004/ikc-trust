import type { SocialWelfareEvent } from "@/types/social-welfare";

interface Props {
  event: Pick<SocialWelfareEvent, "title" | "eventType" | "date">;
}

const EVENT_TYPE_COLOURS: Record<string, string> = {
  "Community Outreach": "bg-forest/10 text-forest",
  "Relief Distribution": "bg-terracotta/10 text-terracotta",
  "Skill Development": "bg-forest/10 text-forest",
  "Workshop": "bg-terracotta/10 text-terracotta",
  "Awareness Campaign": "bg-sand text-charcoal",
  "Women Empowerment": "bg-forest/10 text-forest",
  "Other": "bg-sand text-charcoal",
};

function formatEventDate(dateStr: string): string {
  const date = new Date(dateStr + "T00:00:00");
  return date.toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" });
}

export default function SocialWelfareEventHeader({ event }: Props) {
  const typePill = EVENT_TYPE_COLOURS[event.eventType] ?? EVENT_TYPE_COLOURS["Other"];
  return (
    <div className="mb-5">
      <div className="flex flex-wrap items-center gap-3 mb-3">
        <span className={`inline-flex items-center px-3 py-1 font-sans text-[10px] uppercase tracking-[0.18em] font-semibold ${typePill}`}>
          {event.eventType}
        </span>
        <span className="font-sans text-[11px] text-charcoal-muted tracking-wide">{formatEventDate(event.date)}</span>
      </div>
      <h2 className="font-serif text-2xl sm:text-3xl md:text-[28px] text-forest leading-[1.2] font-normal">{event.title}</h2>
    </div>
  );
}
