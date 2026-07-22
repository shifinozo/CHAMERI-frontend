import TestimonialHero from "@/components/testimonial/TestimonialHero";
import TestimonialCarousel from "@/components/testimonial/TestimonialCarousel";
import Footer from "@/components/common/Footer";

export const metadata = {
  title: "Chameri — Premium Villa Residences",
  description:
    "Let's create something exceptional — explore Chameri's premium villa residences.",
};

export default function TestimonialPage() {
  return (
    <main className="min-h-screen bg-[#EFEDE7]">
      <TestimonialHero />
      <TestimonialCarousel />
      <Footer />
    </main>
  );
}
