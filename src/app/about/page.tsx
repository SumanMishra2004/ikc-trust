import type { Metadata } from "next";
import Header from "@/components/header";
import Footer from "@/components/footer";
import WhoWeAreSection from "@/components/about/who-we-are-section";
import VisionMissionSection from "@/components/about/vision-mission-section";
import JourneySection from "@/components/about/journey-section";

export const metadata: Metadata = {
  title: "About Us — IKC Trust | Integrated Knowledge & Care",
  description:
    "Learn about Integrated Knowledge and Care (IKC) Trust — our mission, vision, values, and journey towards building a healthier, more educated, and inclusive society across West Bengal.",
};

export default function AboutPage() {
  return (
    <main>
      <Header />
      {/* Top spacing to clear the fixed floating-dock header */}
      <div className="pt-20" />
      <WhoWeAreSection />
      <VisionMissionSection />
      <JourneySection />
      <Footer />
    </main>
  );
}
