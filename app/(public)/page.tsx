import { HeroSection } from "@/components/home/hero-section";
import { FeaturesSection } from "@/components/home/features-section";
import { PricingSection } from "@/components/home/pricing-section";
import { FAQSection } from "@/components/home/faq-section";

import { contentConfig } from "@/config/content";
import { pricingConfig } from "@/config/pricing";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <HeroSection />
      <FeaturesSection items={contentConfig.features} />
      <PricingSection items={pricingConfig.plans} />
      <FAQSection items={contentConfig.faq} />
    </main>
  );
}
