import Navbar from "@/components/common/Navbar";
import ContactSection from "@/components/home/ContactSection";
import Footer from "@/components/common/Footer";

export const metadata = {
  title: "Contact Us — Chameri Premium Villa Residences",
  description:
    "Get in touch with the Chameri team. We'd love to hear about your dream home and how we can help bring it to life.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#EDE7DE]">
      <Navbar />

      {/* Page heading */}
      <section className="w-full pt-[140px] pb-[60px] px-[40px] md:px-[80px] lg:px-[120px] flex flex-col items-center text-center gap-5">
        <div className="flex items-center gap-[7.2px]">
          <div className="w-[14px] h-[14px] bg-[#334454] rounded-[3px]" />
          <span className="font-sans font-normal text-[14px] uppercase tracking-wider text-[#334454]">
            Contact
          </span>
        </div>
        <h1 className="font-roundo font-medium text-[56px] md:text-[72px] leading-[1.1] tracking-[-2px] text-[#1A1A1A] max-w-[700px]">
          Let&apos;s talk about your home
        </h1>
        <p className="font-sans font-normal text-[20px] leading-[1.6] text-[#334454]/70 max-w-[520px]">
          Fill in the form below or reach us directly — we typically respond
          within one business day.
        </p>
      </section>

      {/* Reuse the existing ContactSection component */}
      <ContactSection />

      <Footer />
    </main>
  );
}
