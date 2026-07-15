import NewNavbar from "@/components/common/NewNavbar";
import ServicesHero from "@/components/services/ServicesHero";
import ServicesOffered from "@/components/services/ServicesOffered";
import ServicesTestimonials from "@/components/services/ServicesTestimonials";
import Footer from "@/components/common/Footer";
import { getServiceMainData } from "@/lib/api";

export const metadata = {
  title: "Services — Chameri Premium Villa Residences",
  description:
    "Explore the full range of services Chameri offers — from bespoke villa design to turnkey construction and interior finishing.",
};

export default async function ServicesPage() {
  const service = await getServiceMainData();

  return (
    <main className="min-h-screen bg-[#EFEDE7]">
      <NewNavbar />
      <ServicesHero hero={service?.heroSection} />
      <ServicesOffered cardsSection={service?.cardsSection} />
      <ServicesTestimonials testimonial={service?.testimonial} />

      <Footer />
    </main>
  );
}
