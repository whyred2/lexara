import { HeroSection } from "@/components/home/hero-section";
import { FeaturesSection } from "@/components/home/features-section";
import { PricingSection } from "@/components/home/pricing-section";

import { pricingConfig } from "@/config/pricing";
import { PricingTable } from "@/components/home/pricing-table";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <HeroSection />
      <FeaturesSection />
      <PricingSection items={pricingConfig.plans} />
    </main>
  );
}
