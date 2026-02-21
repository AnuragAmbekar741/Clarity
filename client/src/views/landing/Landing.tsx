import { Navbar } from "@/components/landing/Navbar";
import { HeroSection } from "@/components/landing/HeroSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { DemoSection } from "@/components/landing/DemoSection";
import { HowItWorksSection } from "@/components/landing/HowItWorksSection";
import { Footer } from "@/components/landing/Footer";
import { LandingBackground } from "@/components/landing/LandingBackground";

export function Landing() {
  return (
    <div className="relative min-h-screen bg-white dark:bg-[#0a0a0a] transition-colors duration-300">
      <LandingBackground />
      <div className="relative z-10">
        <Navbar />
        <HeroSection />
        <FeaturesSection />
        <DemoSection />
        <HowItWorksSection />
        <Footer />
      </div>
    </div>
  );
}
