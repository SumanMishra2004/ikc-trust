import Header from "@/components/header";
import HeroSection from "@/components/hero-section";
import AboutSection from "@/components/about-section";
import AreasOfWork from "@/components/areas-of-work";
import ApproachSection from "@/components/approach-section";
import ImpactCounters from "@/components/impact-counters";

import PartnershipsSection from "@/components/partnerships-section";
import GetInvolved from "@/components/get-involved";
import Footer from "@/components/footer";

export default function HomePage() {
  return (
    <main>
      <Header />
      <HeroSection />
      <AboutSection />
      <AreasOfWork />
      <ApproachSection />
      <ImpactCounters />
      
      
      <PartnershipsSection />
      <GetInvolved />
      <Footer />
    </main>
  );
}
