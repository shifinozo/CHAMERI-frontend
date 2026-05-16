import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";

export const metadata = {
  title: "About Us — Chameri Premium Villa Residences",
  description:
    "Learn about Chameri — our story, our values, and the people behind every premium villa we build.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#EFEDE7]">
      <Navbar />

      {/* Hero */}
      <section className="w-full pt-[140px] pb-[100px] px-[40px] md:px-[80px] lg:px-[120px] flex flex-col items-center text-center gap-6">
        <div className="flex items-center gap-[7.2px]">
          <div className="w-[14px] h-[14px] bg-[#334454] rounded-[3px]" />
          <span className="font-sans font-normal text-[14px] uppercase tracking-wider text-[#334454]">
            About Us
          </span>
        </div>
        <h1 className="font-roundo font-medium text-[56px] md:text-[72px] leading-[1.1] tracking-[-2px] text-[#1A1A1A] max-w-[800px]">
          We build homes that stand the test of time
        </h1>
        <p className="font-sans font-normal text-[20px] leading-[1.6] text-[#334454]/70 max-w-[600px]">
          Chameri was founded on the belief that every family deserves a home
          designed with intention — where craft meets comfort and quality is
          never compromised.
        </p>
      </section>

      {/* Values grid */}
      <section className="w-full px-[40px] md:px-[80px] lg:px-[120px] pb-[120px]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-[1200px] mx-auto">
          {[
            {
              icon: "🏛",
              title: "Legacy of Excellence",
              body: "Over a decade of delivering premium residences across Kerala, each project a benchmark of quality and design.",
            },
            {
              icon: "🤝",
              title: "Client-First Philosophy",
              body: "We listen before we build. Every plan is shaped around the life you envision, not the other way around.",
            },
            {
              icon: "🌿",
              title: "Sustainable Building",
              body: "From material sourcing to energy-efficient systems, sustainability is woven into every decision we make.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white/60 rounded-[16px] p-8 flex flex-col gap-4 border border-[#334454]/10 hover:shadow-lg transition-shadow duration-300"
            >
              <span className="text-4xl">{item.icon}</span>
              <h2 className="font-roundo font-medium text-[24px] leading-[1.2] text-[#1A1A1A]">
                {item.title}
              </h2>
              <p className="font-sans text-[16px] leading-[1.7] text-[#334454]/70">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
