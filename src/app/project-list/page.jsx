import ProjectListHero from "@/components/project-list/ProjectListHero";
import ProjectsShowcase from "@/components/project-list/ProjectsShowcase";
import ProjectContactUs from "@/components/project-list/ProjectContactUs";
import SmoothScroll from "@/components/project-list/SmoothScroll";
import Footer from "@/components/common/Footer";

export const metadata = {
  title: "Projects — Chameri Premium Villa Residences",
  description:
    "Explore Chameri's premium villa residence projects.",
};

export default function ProjectListPage() {
  return (
    <main className="min-h-screen bg-[#EFEDE7]">
      <SmoothScroll />
      <ProjectListHero />
      <ProjectsShowcase />
      <ProjectContactUs />
      <Footer />
    </main>
  );
}
