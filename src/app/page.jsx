import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import LogoMarquee from "@/components/LogoMarquee";
import VillaPlansSection from "@/components/VillaPlansSection";
import WhyChooseUs from "@/components/WhyChooseUs";

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <AboutSection />
      <LogoMarquee />
      <VillaPlansSection />
      <WhyChooseUs />
    </main>
  );
}
