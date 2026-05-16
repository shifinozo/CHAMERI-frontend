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

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <AboutSection />
      <LogoMarquee />
      <VillaPlansSection />
      <WhyChooseUs />
      <GallerySection />
      <TeamSection />
      <TestimonialsSection />
      <FAQSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
