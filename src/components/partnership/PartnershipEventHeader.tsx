import type { PartnershipEvent } from "@/types/partnership";

interface Props {
  event: Pick<PartnershipEvent, "title" | "partnershipType" | "date" | "partnerName">;
}

const TYPE_COLOURS: Record<string, string> = {
  MoU:        "bg-forest/10 text-forest",
  Academic:   "bg-forest/10 text-forest",
  CSR:        "bg-terracotta/10 text-terracotta",
  Government: "bg-sand text-charcoal",
  NGO:        "bg-sand text-charcoal",
  Medical:    "bg-terracotta/10 text-terracotta",
  Other:      "bg-sand text-charcoal",
};

function formatDate(raw: string) {
  return new Date(raw + "T00:00:00").toLocaleDateString("en-IN", {
    year: "numeric", month: "long", day: "numeric",
  });
}

export default function PartnershipEventHeader({ event }: Props) {
  const pill = TYPE_COLOURS[event.partnershipType] ?? TYPE_COLOURS["Other"];
  return (
    <div className="mb-5">
      <div className="flex flex-wrap items-center gap-3 mb-3">
        <span className={`inline-flex items-center px-3 py-1 font-sans text-[10px] uppercase tracking-[0.18em] font-semibold ${pill}`}>
          {event.partnershipType}
        </span>
        <span className="font-sans text-[11px] text-charcoal-muted tracking-wide">
          {formatDate(event.date)}
        </span>
      </div>
      <h2 className="font-serif text-2xl sm:text-3xl md:text-[28px] text-forest leading-[1.2] font-normal">
        {event.title}
      </h2>
    </div>
  );
}
