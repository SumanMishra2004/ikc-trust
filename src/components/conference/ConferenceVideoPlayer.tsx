import type { InitiativeVideo } from "@/types/media";

interface Props {
  video: InitiativeVideo;
}

export default function ConferenceVideoPlayer({ video }: Props) {
  return (
    <div className="w-full">
      {video.title && (
        <p className="font-sans text-[11px] uppercase tracking-[0.18em] text-charcoal-muted font-semibold mb-2">
          {video.title}
        </p>
      )}
      <video
        src={video.url}
        poster={video.posterUrl}
        controls
        className="w-full rounded-none bg-charcoal"
        aria-label={video.title ?? "Conference video"}
      />
      {video.caption && (
        <p className="font-sans text-[12px] text-charcoal-muted mt-2 leading-snug">
          {video.caption}
        </p>
      )}
    </div>
  );
}
