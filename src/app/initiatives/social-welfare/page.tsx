import { fetchInitialSocialWelfareEvents } from "@/sanity/queries/social-welfare";
import SocialWelfareHero from "@/components/social-welfare/SocialWelfareHero";
import SocialWelfareTimeline from "@/components/social-welfare/SocialWelfareTimeline";

export const revalidate = 30;

export const metadata = {
  title: "Social Welfare | IKC Trust",
  description:
    "Uplifting marginalised communities through outreach programmes, skill development, women empowerment initiatives, and relief distribution that creates dignity and sustainable livelihoods.",
};

export default async function SocialWelfarePage() {
  const { events, hasMore, cursor } = await fetchInitialSocialWelfareEvents();

  return (
    <main className="min-h-screen bg-ivory">
      <SocialWelfareHero />
      <SocialWelfareTimeline
        initialEvents={events}
        initialHasMore={hasMore}
        initialCursor={cursor}
      />
    </main>
  );
}
