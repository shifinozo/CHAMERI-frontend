import HeroSection from "@/components/home/HeroSection";
import AboutSection from "@/components/home/AboutSection";
import LogoMarquee from "@/components/home/LogoMarquee";
import VillaPlansSection from "@/components/home/VillaPlansSection";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import GallerySection from "@/components/home/GallerySection";
import TeamSection from "@/components/home/TeamSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import FAQSection from "@/components/home/FAQSection";
import ContactSection from "@/components/home/ContactSection";
import Footer from "@/components/common/Footer";
import GalleryNew from "@/components/home/GalleryNew";

export default function Home() {
  return (
    <main>
      {/* HeroSection owns its own sticky + fixed layers (200svh scroll space) */}
      <HeroSection />

      {/* All subsequent sections stack naturally below */}
      <div className="relative z-10 bg-[#EDE7DE]">
        <AboutSection />
        <LogoMarquee />
        <VillaPlansSection />
        <WhyChooseUs />
        {/* <GallerySection /> */}
        <GalleryNew />
        <TeamSection />
        <TestimonialsSection />
        <FAQSection />
        <ContactSection />
        <Footer />
      </div>
    </main>
  );
}
