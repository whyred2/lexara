import { HeroSection } from "@/components/home/hero-section";
import { FeaturesSection } from "@/components/home/features";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <HeroSection />
      <FeaturesSection />
    </main>
  );
}
