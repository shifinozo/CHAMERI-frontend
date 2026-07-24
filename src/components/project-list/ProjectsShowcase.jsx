import Section from './Section';

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * ProjectsShowcase — "Our Projects" scroll-reveal case-study sections
 * ─────────────────────────────────────────────────────────────────────────────
 * Each project renders as a full-screen `Section` (see Section.jsx): a
 * clip-path wipe reveal as it scrolls into view, a viewport-fixed
 * background image clipped to the section's own on-screen bounds (so it
 * appears to stay in place while the page scrolls past it), a subtle
 * ±10vh parallax drift on top, and a `Text` overlay (tag, title,
 * description, CTA) that fades/slides in once.
 *
 * Add more projects from the backend by extending the `projects` prop /
 * PROJECTS array below — each one just becomes another stacked Section.
 * ─────────────────────────────────────────────────────────────────────────────
 */

const PROJECTS = [
  {
    id: 'kiwano-villa',
    tag: 'Kiwano Villa',
    title: 'Creating spaces that elevate life',
    description:
      'Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim adipiscing',
    image: '/dummyimages/2702c77b1fc16911ce7e388a66de1e2c5e71c658.png',
    href: '/kiwano',
  },
  {
    id: 'kiwano-villament',
    tag: 'Kiwano Villament',
    title: 'Creating spaces that elevate life',
    description:
      'Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim adipiscing',
    image: '/dummyimages/68de01d498421b4e83d9a6e24ebe57bd5e9ea354.png',
    href: '/kiwano-villament',
  },
];

export default function ProjectsShowcase({ projects }) {
  const DATA = projects?.length ? projects : PROJECTS;

  return (
    <div className="relative w-full">
      {DATA.map((project, i) => (
        <Section key={project.id} project={project} index={i} />
      ))}
    </div>
  );
}
