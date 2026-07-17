import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { FinalCta } from "@/components/marketing/final-cta";
import { GrowthStats } from "@/components/marketing/growth-stats";
import { Hero } from "@/components/marketing/hero";
import { OrderingSection } from "@/components/marketing/ordering-section";
import { PlatformPillars } from "@/components/marketing/platform-pillars";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <PlatformPillars />
        <OrderingSection />
        <GrowthStats />
        <FinalCta />
      </main>
      <SiteFooter />
    </>
  );
}
