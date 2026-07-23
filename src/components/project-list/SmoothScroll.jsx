'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';

/**
 * Mounts Lenis smooth-scroll for as long as this page is mounted. Renders
 * nothing — it only drives the scroll behavior the Section/Text components'
 * scroll-linked animations run against.
 */
export default function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis();

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return null;
}
