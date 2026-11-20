import { fetchInitialEnvironmentEvents } from "@/sanity/queries/environment";
import EnvironmentHero from "@/components/environment/EnvironmentHero";
import EnvironmentTimeline from "@/components/environment/EnvironmentTimeline";

export const revalidate = 30;

export const metadata = {
  title: "Environment & Sustainability | IKC Trust",
  description:
    "Nurturing our planet through tree plantation drives, clean-up campaigns, conservation projects, and environmental awareness programmes that inspire communities to act for a greener future.",
};

export default async function EnvironmentPage() {
  const { events, hasMore, cursor } = await fetchInitialEnvironmentEvents();

  return (
    <main className="min-h-screen bg-ivory">
      <EnvironmentHero />
      <EnvironmentTimeline
        initialEvents={events}
        initialHasMore={hasMore}
        initialCursor={cursor}
      />
    </main>
  );
}
