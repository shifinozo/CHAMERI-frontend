'use client';

import React, { useRef, useState, useEffect } from 'react';

/* ─── The full heading split into individual words ───────────────────────── */
const HEADING_WORDS = [
  "We're", "create", "luxury", "trusted", "modern", "builders",
  "creating", "timeless", "spaces", "for", "future", "through", "smart",
  "we", "build", "modern", "luxury", "homes", "with", "trusted", "the",
  "design", "craft", "every", "detail", "matters", "day", "move", "choice.",
];

const STATS = [
  { val: '30%', label: 'Lorem ipsum dolor' },
  { val: '20%', label: 'Lorem ipsum' },
  { val: '25%', label: 'Lorem ipsum dolor' },
  { val: '96%', label: 'Lorem ipsum dolor sit' },
];

const AboutSection = () => {
  const sectionRef = useRef(null);
  const [progress, setProgress] = useState(0); // 0 → 1

  useEffect(() => {
    const handleScroll = () => {
      const el = sectionRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const windowH = window.innerHeight;

      /*
       * We want progress = 0 when the section top enters the viewport,
       * and progress = 1 when the section bottom leaves the viewport.
       * Clamped to [0, 1].
       */
      const sectionH = rect.height;
      // How many px of the section have scrolled past the top of the viewport
      const scrolled = -rect.top + windowH * 0.15; // start animating 15% before section top
      const raw = scrolled / (sectionH * 0.9);
      setProgress(Math.min(1, Math.max(0, raw)));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // run on mount in case already scrolled
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /* How many words should be dark given current progress */
  const darkCount = Math.round(progress * HEADING_WORDS.length);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#EFEDE7] flex flex-col items-center overflow-hidden"
    >
      {/* ══════════════════════════════════════════════════════════════════
          TOP ROW  — w:1440, h:378, pt:100px
         ══════════════════════════════════════════════════════════════════ */}
      <div
        className="w-full flex items-start justify-center"
        style={{ minHeight: '378px', paddingTop: '100px' }}
      >
        {/* Inner: 1330px centered — gives ~55px natural inset from screen edges */}
        <div
          className="w-full mx-auto flex justify-between items-start"
          style={{
            maxWidth: '1330px',
            paddingLeft: '20px',
            paddingRight: '20px',
          }}
        >
          {/* ── About Us Badge ─────────────────────────────────────────── */}
          {/* w:112.6, h:20 */}
          <div
            className="flex items-center gap-[7.2px] flex-shrink-0"
            style={{ width: '112.6px', height: '20px' }}
          >
            <div className="w-[10px] h-[10px] bg-[#1A1A1A] rounded-[2px] flex-shrink-0" />
            <span
              className="font-sans font-medium uppercase text-[#1A1A1A]"
              style={{ fontSize: '11px', letterSpacing: '1px', lineHeight: '20px' }}
            >
              About Us
            </span>
          </div>

          {/* ── Heading with scroll-driven word animation ───────────────── */}
          {/* w:1023.73, h:231 */}
          <div
            style={{
              width: '945.73px',
              maxWidth: '100%',
            }}
          >
            <h2
              className="font-roundo font-medium lowercase"
              style={{
                fontSize: '48px',
                lineHeight: '57.6px',
                letterSpacing: '-2.4px',
              }}
            >
              {HEADING_WORDS.map((word, i) => (
                <span
                  key={i}
                  style={{
                    color: i < darkCount ? '#292929' : '#6B7E8F',
                    transition: 'color 0.3s ease',
                    display: 'inline',
                  }}
                >
                  {word}
                  {i < HEADING_WORDS.length - 1 ? ' ' : ''}
                </span>
              ))}
            </h2>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          STATS ROW  — w:1440, h:220, max-w:1440px
          py:27px, px:66px, gap:57px
         ══════════════════════════════════════════════════════════════════ */}
      <div
        className="w-full mx-auto flex items-center justify-center"
        style={{
          maxWidth: '1440px',
          paddingTop: '27px',
          paddingBottom: '27px',
          paddingLeft: '66px',
          paddingRight: '66px',
        }}
      >
        {/* Inner stats card: w:1288, h:166, pt:20px, border-radius:14.4px */}
        <div
          className="w-full flex items-center justify-between"
          style={{
            maxWidth: '1288px',
            minHeight: '166px',
            paddingTop: '20px',
            borderRadius: '14.4px',
          }}
        >
          {STATS.map((stat, i) => (
            <div key={i} className="flex flex-col items-start">
              <span
                className="font-roundo font-medium text-[#1A1A1A]"
                style={{
                  fontSize: '45px',
                  lineHeight: '45px',
                  letterSpacing: '-0.9px',
                }}
              >
                {stat.val}
              </span>
              <span
                className="font-sans font-normal text-black/60 mt-2"
                style={{
                  fontSize: '16px',
                  lineHeight: '19.44px',
                  letterSpacing: '-0.32px',
                }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
