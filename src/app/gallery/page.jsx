import NewNavbar from "@/components/common/NewNavbar";
import Footer from "@/components/common/Footer";
import GalleryHero from "@/components/gallery/GalleryHero";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import GalleryContactUs from "@/components/gallery/GalleryContactUs";
import { getGalleryData } from "@/lib/api";

export const metadata = {
  title: "Gallery — Chameri Premium Villa Residences",
  description: "Explore our collection of timeless villas and landmark spaces.",
};

export default async function GalleryPage() {
  const gallery = await getGalleryData();

  return (
    <main className="min-h-screen relative bg-[#EDE7DE]">
      <NewNavbar />
      <GalleryHero heroSection={gallery?.heroSection} />
      <GalleryGrid galleryImages={gallery?.galleryImages} />
      <GalleryContactUs />
      <Footer />
    </main>
  );
}
