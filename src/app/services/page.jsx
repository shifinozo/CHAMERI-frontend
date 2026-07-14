import NewNavbar from "@/components/common/NewNavbar";
import ServicesHero from "@/components/services/ServicesHero";
import ServicesOffered from "@/components/services/ServicesOffered";
import ServicesTestimonials from "@/components/services/ServicesTestimonials";
import Footer from "@/components/common/Footer";

export const metadata = {
  title: "Services — Chameri Premium Villa Residences",
  description:
    "Explore the full range of services Chameri offers — from bespoke villa design to turnkey construction and interior finishing.",
};

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-[#EFEDE7]">
      <NewNavbar />
      <ServicesHero />
      <ServicesOffered />
      <ServicesTestimonials />

      <Footer />
    </main>
  );
}
