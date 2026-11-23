import type { Metadata } from "next";
import Header from "@/components/header";
import Footer from "@/components/footer";
import PartnershipHero from "@/components/partnership/PartnershipHero";
import PartnershipTimeline from "@/components/partnership/PartnershipTimeline";
import { fetchInitialPartnershipEvents } from "@/sanity/queries/partnerships";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Partnerships — IKC Trust",
  description:
    "Strategic partnerships of IKC Trust — MoUs, academic collaborations, corporate CSR alliances, and government partnerships across West Bengal.",
};

export default async function Page() {
  const { events, hasMore, cursor } = await fetchInitialPartnershipEvents();

  return (
    <main className="min-h-screen bg-ivory">
      <Header />
      <PartnershipHero />
      <PartnershipTimeline
        initialEvents={events}
        initialHasMore={hasMore}
        initialCursor={cursor}
      />
      <Footer />
    </main>
  );
}
