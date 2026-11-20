export default function SocialWelfareEndMessage() {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-4">
      <div className="flex items-center gap-4 w-full max-w-xs">
        <span className="flex-1 h-px bg-sand-dark/60" />
        <span className="w-1.5 h-1.5 rounded-full bg-terracotta/50" />
        <span className="flex-1 h-px bg-sand-dark/60" />
      </div>
      <p className="font-sans text-[11px] uppercase tracking-[0.22em] text-charcoal-muted text-center">
        All events have been loaded
      </p>
      <p className="font-serif text-sm italic text-charcoal-muted/70 text-center max-w-xs">
        New events are added as IKC Trust conducts social welfare programmes throughout the year.
      </p>
    </div>
  );
}
