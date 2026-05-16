import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";

export const metadata = {
  title: "Services — Chameri Premium Villa Residences",
  description:
    "Explore the full range of services Chameri offers — from bespoke villa design to turnkey construction and interior finishing.",
};

const SERVICES = [
  {
    number: "01",
    title: "Custom Villa Design",
    body: "Work directly with our architects to create a floor plan tailored to your lifestyle, land, and budget.",
  },
  {
    number: "02",
    title: "Turnkey Construction",
    body: "We manage every phase — from foundation to finishing — so you can move in without any stress.",
  },
  {
    number: "03",
    title: "Interior Design",
    body: "Our in-house design team curates material palettes, furniture, and lighting to bring your vision to life.",
  },
  {
    number: "04",
    title: "Landscape & Exterior",
    body: "From driveways to garden landscaping, we design outdoor spaces that complement your villa perfectly.",
  },
  {
    number: "05",
    title: "Smart Home Integration",
    body: "We integrate modern smart-home systems — lighting, climate, security — seamlessly into your build.",
  },
  {
    number: "06",
    title: "Post-Handover Support",
    body: "Our relationship doesn't end at handover. We provide 24-month support for any structural or finish issues.",
  },
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-[#EFEDE7]">
      <Navbar />

      {/* Hero */}
      <section className="w-full pt-[140px] pb-[80px] px-[40px] md:px-[80px] lg:px-[120px] flex flex-col items-center text-center gap-6">
        <div className="flex items-center gap-[7.2px]">
          <div className="w-[14px] h-[14px] bg-[#334454] rounded-[3px]" />
          <span className="font-sans font-normal text-[14px] uppercase tracking-wider text-[#334454]">
            Services
          </span>
        </div>
        <h1 className="font-roundo font-medium text-[56px] md:text-[72px] leading-[1.1] tracking-[-2px] text-[#1A1A1A] max-w-[700px]">
          Everything your dream home needs
        </h1>
        <p className="font-sans font-normal text-[20px] leading-[1.6] text-[#334454]/70 max-w-[560px]">
          From concept to completion, Chameri offers a comprehensive suite of
          services designed around your vision.
        </p>
      </section>

      {/* Services Grid */}
      <section className="w-full px-[40px] md:px-[80px] lg:px-[120px] pb-[120px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[1200px] mx-auto">
          {SERVICES.map((svc) => (
            <div
              key={svc.number}
              className="group bg-white/60 rounded-[16px] p-8 flex flex-col gap-5 border border-[#334454]/10 hover:bg-[#334454] hover:text-white transition-all duration-500 cursor-pointer"
            >
              <span className="font-roundo text-[40px] font-medium text-[#334454]/20 group-hover:text-white/20 transition-colors">
                {svc.number}
              </span>
              <h2 className="font-roundo font-medium text-[24px] leading-[1.2] text-[#1A1A1A] group-hover:text-white transition-colors">
                {svc.title}
              </h2>
              <p className="font-sans text-[16px] leading-[1.7] text-[#334454]/70 group-hover:text-white/80 transition-colors">
                {svc.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
