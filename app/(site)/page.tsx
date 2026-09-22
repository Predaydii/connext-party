import CountdownSection from "@/components/CountdownSection";
import FeatureCards from "@/components/FeatureCards";
import HeroSection from "@/components/HeroSection";
import MemberMarquee from "@/components/MemberMarquee";
import NewsHighlights from "@/components/NewsHighlights";
import VisionSection from "@/components/VisionSection";
import WelcomeModal from "@/components/WelcomeModal";
import { getContent } from "@/lib/content/store";
import { sortNewsByDate } from "@/lib/format";

export default async function HomePage() {
  const content = await getContent();
  const latestNews = sortNewsByDate(content.news).slice(0, 3);

  return (
    <>
      <WelcomeModal images={content.welcomeImages} />
      <HeroSection />
      <div id="about-connext">
        <VisionSection policyStatuses={content.policyStatuses} />
      </div>
      <FeatureCards />
      {latestNews.length > 0 && <NewsHighlights news={latestNews} />}
      <MemberMarquee />
      <CountdownSection />
    </>
  );
}
