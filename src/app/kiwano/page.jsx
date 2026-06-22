import KiwanoHero from '@/components/kiwano/KiwanoHero';
import Kiwano360Tour from '@/components/kiwano/Kiwano360Tour';
import KiwanoFeatures from '@/components/kiwano/KiwanoFeatures';
import KiwanoGallery from '@/components/kiwano/KiwanoGallery';
import KiwanoAmenities from '@/components/kiwano/KiwanoAmenities';
import KiwanoOtherProjects from '@/components/kiwano/KiwanoOtherProjects';
import Footer from '@/components/common/Footer';

export const metadata = {
  title: 'Kiwano — Chameri Premium Villa Residences',
  description:
    'Elegant spaces built for refined views. Experience Chameri Kiwano — a scroll-driven visual journey into premium living.',
};

export default function KiwanoPage() {
  return (
    <main style={{ background: '#EDE7DE', minHeight: '100vh' }}>
      {/* ── Hero: Scroll-driven video + text reveal ───────────────── */}
      <KiwanoHero />

      {/* ── Features: Horizontal swipable cards ───────────────────── */}
      <KiwanoFeatures />

      {/* ── 360° Tour: Full-width video player with drag badge ─────── */}
      <Kiwano360Tour />

      {/* ── Gallery: Tabbed masonry photo grid ────────────────────── */}
      <KiwanoGallery />

      {/* ── Amenities: Surrounding places with List/Map toggle ──────── */}
      <KiwanoAmenities />

      {/* ── Other Projects: Explore other projects card ────────────── */}
      <KiwanoOtherProjects />

      {/* ── Footer ─────────────────────────────────────────────────── */}
      <Footer />
    </main>
  );
}
