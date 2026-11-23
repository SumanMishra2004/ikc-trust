import { fetchAllConferenceEvents } from "@/sanity/queries/conference";
import ConferenceHero from "@/components/conference/ConferenceHero";
import ConferenceTimeline from "@/components/conference/ConferenceTimeline";

export const revalidate = 30;

export const metadata = {
  title: "Conference | IKC Trust",
  description:
    "Academic and community conferences organised by IKC Trust — bringing together researchers, practitioners, and community leaders.",
};

export default async function ConferencePage() {
  const { events } = await fetchAllConferenceEvents();
  return (
    <main className="min-h-screen bg-ivory">
      <ConferenceHero />
      <ConferenceTimeline events={events} />
    </main>
  );
}
