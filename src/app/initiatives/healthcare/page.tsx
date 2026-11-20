import { fetchInitialHealthcareEvents } from "@/sanity/queries/healthcare";
import HealthcareHero from "@/components/healthcare/HealthcareHero";
import HealthcareTimeline from "@/components/healthcare/HealthcareTimeline";

export const revalidate = 30;

export const metadata = {
  title: "Healthcare & Wellbeing | IKC Trust",
  description:
    "Bringing quality healthcare to underserved communities through medical camps, health screenings, vaccination drives, and awareness programmes that promote lasting wellbeing.",
};

export default async function HealthcarePage() {
  const { events, hasMore, cursor } = await fetchInitialHealthcareEvents();

  return (
    <main className="min-h-screen bg-ivory">
      <HealthcareHero />
      <HealthcareTimeline
        initialEvents={events}
        initialHasMore={hasMore}
        initialCursor={cursor}
      />
    </main>
  );
}
