'use client';

import { useState, useEffect } from 'react';

/**
 * useScroll — tracks scroll position and direction.
 *
 * Returns:
 *   scrollY      {number}   – current vertical scroll offset in px
 *   scrolledPast {function} – returns true if scrollY > threshold
 *   direction    {'up'|'down'|null}
 */
export function useScroll() {
  const [scrollY, setScrollY] = useState(0);
  const [direction, setDirection] = useState(null);
  const [lastY, setLastY] = useState(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const currentY = window.scrollY;
          setDirection(currentY > lastY ? 'down' : 'up');
          setScrollY(currentY);
          setLastY(currentY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastY]);

  const scrolledPast = (threshold) => scrollY > threshold;

  return { scrollY, direction, scrolledPast };
}
