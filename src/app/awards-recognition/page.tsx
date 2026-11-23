import type { Metadata } from "next";
import Header from "@/components/header";
import Footer from "@/components/footer";
import AwardsPage from "@/components/pages/AwardsPage";

export const metadata: Metadata = {
  title: "Awards & Recognition — IKC Trust",
  description:
    "Honours, certifications, and institutional recognitions received by IKC Trust for its work in healthcare, education, environment, and social welfare across West Bengal.",
};

export default function Page() {
  return (
    <main>
      <Header />
      <AwardsPage />
      <Footer />
    </main>
  );
}
