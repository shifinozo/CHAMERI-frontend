import AboutNavbar from '@/components/about/AboutNavbar';
import AboutHeroSection from '@/components/about/AboutHeroSection';
import Footer from '@/components/common/Footer';

export const metadata = {
  title: 'About Us — Chameri Premium Villa Residences',
  description:
    'Learn about Chameri — our story, our values, and the people behind every premium villa we build. Crafting timeless villas and landmark spaces since 1985.',
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#EFEDE7]">
      {/* ── Sticky Navbar ─────────────────────────────────────────────── */}
      <AboutNavbar />

      {/* ── Hero: Full-width image + headline ─────────────────────────── */}
      <AboutHeroSection />

      {/* ── Footer ────────────────────────────────────────────────────── */}
      <Footer />
    </main>
  );
}
