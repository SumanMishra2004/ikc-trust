export default function ConferenceLoader() {
  return (
    <div className="w-full py-12 space-y-8" role="status" aria-label="Loading conferences">
      {[0, 1].map((i) => (
        <div key={i} className="flex flex-col gap-4 animate-pulse">
          <div className="h-6 w-32 bg-sand rounded" />
          <div className="h-8 w-3/4 bg-sand rounded" />
          <div className="h-4 w-full bg-sand rounded" />
          <div className="h-4 w-5/6 bg-sand rounded" />
          <div className="h-48 w-full bg-sand rounded" />
        </div>
      ))}
    </div>
  );
}
