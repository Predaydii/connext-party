import CountdownSection from "@/components/CountdownSection";
import FeatureCards from "@/components/FeatureCards";
import HeroSection from "@/components/HeroSection";
import MemberMarquee from "@/components/MemberMarquee";
import VisionSection from "@/components/VisionSection";
import WelcomeModal from "@/components/WelcomeModal";

export default function HomePage() {
  return (
    <>
      <WelcomeModal />
      <HeroSection />
      <div id="about-connext">
        <VisionSection />
      </div>
      <FeatureCards />
      <MemberMarquee />
      <CountdownSection />
    </>
  );
}
