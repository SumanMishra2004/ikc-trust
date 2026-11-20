import { fetchInitialCultureSportsEvents } from "@/sanity/queries/culture-sports";
import CultureSportsHero from "@/components/culture-sports/CultureSportsHero";
import CultureSportsTimeline from "@/components/culture-sports/CultureSportsTimeline";

export const revalidate = 30;

export const metadata = {
  title: "Culture & Sports | IKC Trust",
  description:
    "Enriching community life through cultural programmes, sports tournaments, arts exhibitions, and festivals that celebrate heritage, nurture talent, and bring people together.",
};

export default async function CultureSportsPage() {
  const { events, hasMore, cursor } = await fetchInitialCultureSportsEvents();

  return (
    <main className="min-h-screen bg-ivory">
      <CultureSportsHero />
      <CultureSportsTimeline
        initialEvents={events}
        initialHasMore={hasMore}
        initialCursor={cursor}
      />
    </main>
  );
}
