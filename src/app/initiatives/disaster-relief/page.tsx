import { fetchInitialDisasterReliefEvents } from "@/sanity/queries/disaster-relief";
import DisasterReliefHero from "@/components/disaster-relief/DisasterReliefHero";
import DisasterReliefTimeline from "@/components/disaster-relief/DisasterReliefTimeline";

export const revalidate = 30;

export const metadata = {
  title: "Disaster Relief | IKC Trust",
  description:
    "Responding swiftly to natural and man-made disasters with relief camps, aid distribution, rescue operations, and rehabilitation support that restores dignity and hope to affected communities.",
};

export default async function DisasterReliefPage() {
  const { events, hasMore, cursor } = await fetchInitialDisasterReliefEvents();

  return (
    <main className="min-h-screen bg-ivory">
      <DisasterReliefHero />
      <DisasterReliefTimeline
        initialEvents={events}
        initialHasMore={hasMore}
        initialCursor={cursor}
      />
    </main>
  );
}
