import type { Metadata } from "next";
import Header from "@/components/header";
import Footer from "@/components/footer";

import { fetchContributors } from "@/sanity/queries/contributors";
import ContributorsPage from "@/components/pages/ContributorsPage";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Contributors — IKC Trust",
  description:
    "Acknowledging the generous individuals whose support powers IKC Trust's work in healthcare, education, environment, and social welfare across West Bengal.",
};

export default async function Page() {
  const contributors = await fetchContributors();

  return (
    <main className="min-h-screen bg-[#FFFDF8]">
      <Header />
      <ContributorsPage contributors={contributors} />
      <Footer />
    </main>
  );
}
