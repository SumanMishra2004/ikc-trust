export default function EducationLoader() {
  return (
    <div
      className="flex items-center justify-center py-12"
      role="status"
      aria-label="Loading more events"
    >
      <div className="flex items-center gap-3">
        {/* Three dots pulse */}
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="w-2 h-2 rounded-full bg-forest/40 animate-bounce-slow"
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
        <span className="ml-2 font-sans text-[11px] uppercase tracking-[0.18em] text-charcoal-muted">
          Loading
        </span>
      </div>
    </div>
  );
}
