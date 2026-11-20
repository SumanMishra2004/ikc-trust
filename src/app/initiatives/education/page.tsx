import { fetchInitialEducationEvents } from "@/sanity/queries/education";
import EducationHero from "@/components/education/EducationHero";
import EducationTimeline from "@/components/education/EducationTimeline";

/**
 * ISR — rebuild this page in the background at most every 60 seconds.
 * Published events appear on the live site within ~1 minute of publishing.
 * Set to a lower value (e.g. 30) if you need faster reflection.
 */
export const revalidate = 30;

export const metadata = {
  title: "Education & Knowledge | IKC Trust",
  description:
    "Empowering individuals through education, research, skill development, and knowledge-sharing opportunities that create meaningful and sustainable impact.",
};

/**
 * Server component — fetches the initial batch of events at request time.
 * Progressive pagination is handled client-side by EducationTimeline.
 *
 * NOTE: This page will throw at build time if NEXT_PUBLIC_SANITY_PROJECT_ID
 * is not set. Fill in .env.local before running `npm run build`.
 */
export default async function EducationPage() {
  const { events, hasMore, cursor } = await fetchInitialEducationEvents();

  return (
    <main className="min-h-screen bg-ivory">
      <EducationHero />
      <EducationTimeline
        initialEvents={events}
        initialHasMore={hasMore}
        initialCursor={cursor}
      />
    </main>
  );
}
