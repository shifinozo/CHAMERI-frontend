'use client';

import React, { useRef, useState, useEffect } from 'react';

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
  const headingRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const el = headingRef.current;
      if (!el) return;
      const rect   = el.getBoundingClientRect();
      const windowH = window.innerHeight || document.documentElement.clientHeight;
      const start  = windowH * 0.55;
      const end    = windowH * 0.05;
      const raw    = (start - rect.top) / (start - end);
      setProgress(Math.min(1, Math.max(0, raw)));
    };
    window.addEventListener('scroll', handleScroll, { passive: true, capture: true });
    window.addEventListener('resize', handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll, { capture: true });
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const darkCount = Math.round(progress * HEADING_WORDS.length);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#EDE7DE] flex flex-col items-center overflow-hidden"
      style={{
        paddingTop: 'clamp(28px, 5.556vw, 80px)', // 80px @ 1440px
      }}
    >
      <div className="
        w-full mx-auto flex flex-col items-center
        px-[20px] lg:px-0 3xl:px-[20px]
        sm:max-w-[60%] md:max-w-[70%] lg:max-w-[80%] xl:max-w-[82%] 2xl:max-w-[84%] 3xl:max-w-[1480px] 3xl:w-[1330px] 4xl:max-w-[84%]
      ">

        {/* ══════════════════════════════════════════════════════════════════
            ABOUT US HEADER (Top Row)
        ══════════════════════════════════════════════════════════════════ */}
        <div
          className="w-full flex flex-col md:flex-row items-start justify-between gap-6 md:gap-0"
          style={{
            maxWidth:      '1330px',
            minHeight:     'clamp(160px, 22.847vw, 329px)', // 329px @ 1440px
            paddingLeft:   'clamp(10px, 1.389vw, 20px)',    // 20px  @ 1440px
            paddingRight:  'clamp(10px, 1.389vw, 20px)',    // 20px  @ 1440px
          }}
        >

          {/* ── About Us Badge ───────────────────────────────────────────── */}
          <div
            className="flex items-center flex-shrink-0 rounded-[90px]"
            style={{
              width:         'clamp(80px, 7.819vw, 112.6px)', // 112.6px @ 1440px
              height:        'clamp(14px, 1.389vw, 20px)',    // 20px    @ 1440px
              gap:           'clamp(4px, 0.5vw, 7.2px)',      // 7.2px   @ 1440px
              paddingLeft:   'clamp(4px, 0.5vw, 7.2px)',
              paddingRight:  'clamp(4px, 0.5vw, 7.2px)',
            }}
          >
            {/* Dot */}
            <div
              className="bg-[#1A1A1A] rounded-[3px] flex-shrink-0"
              style={{
                width:   'clamp(10px, 0.972vw, 14px)', // 14px @ 1440px
                height:  'clamp(10px, 0.972vw, 14px)',
                padding: 'clamp(2px, 0.25vw, 3.6px)',  // 3.6px @ 1440px
              }}
            />
            {/* Label */}
            <span
              className="font-sans font-normal uppercase text-[#1A1A1A] tracking-[-0.32px] flex items-center justify-center"
              style={{
                fontSize:   'clamp(11px, 1.125vw, 16.2px)', // 16.2px @ 1440px
                lineHeight: '1.2',
              }}
            >
              About Us
            </span>
          </div>

          {/* ── Heading Text Box ─────────────────────────────────────────── */}
          <div
            className="w-full flex flex-col justify-start"
            style={{
              maxWidth:  'clamp(250px, 77.424vw, 970.91px)', // 970.91px @ 1440px
              minHeight: 'clamp(80px, 20.833vw, 300px)',     // 300px    @ 1440px
            }}
          >
            <h2
              ref={headingRef}
              className="font-roundo font-medium"
              style={{
                fontSize:      'clamp(28px, 3.333vw, 48px)',   // 48px    @ 1440px
                lineHeight:    'clamp(34px, 4vw, 57.6px)',     // 57.6px  @ 1440px
                letterSpacing: 'clamp(-2px, -0.167vw, -4px)',
                textIndent:    'clamp(40px, 8.333vw, 120px)',  // 120px   @ 1440px
              }}
            >
              {HEADING_WORDS.map((word, i) => (
                <span
                  key={i}
                  className={`transition-colors duration-300 inline ${i < darkCount ? 'text-[#334454]' : 'text-[#6B7E8F]'}`}
                >
                  {word}
                  {i < HEADING_WORDS.length - 1 ? ' ' : ''}
                </span>
              ))}
            </h2>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════════
            STATS ROW
        ══════════════════════════════════════════════════════════════════ */}
        <div
          className="w-full flex flex-wrap md:flex-nowrap items-center justify-between rounded-[14.4px] gap-8 md:gap-0"
          style={{
            paddingTop:    'clamp(14px, 1.875vw, 27px)', // 27px @ 1440px
            paddingBottom: 'clamp(14px, 1.875vw, 27px)',
            minHeight:     'clamp(100px, 7.361vw, 106px)', // 106px @ 1440px
          }}
        >
          {STATS.map((stat, i) => (
            <div key={i} className="flex flex-col items-start w-[45%] md:w-auto">
              {/* Stat value */}
              <span
                className="font-roundo font-medium text-[#1A1A1A]"
                style={{
                  fontSize:      'clamp(28px, 3.125vw, 45px)', // 45px @ 1440px
                  lineHeight:    '1',
                  letterSpacing: 'clamp(-0.5px, -0.063vw, -0.9px)',
                }}
              >
                {stat.val}
              </span>
              {/* Stat label */}
              <span
                className="font-sans font-normal text-black/60 tracking-[-0.32px]"
                style={{
                  fontSize:   'clamp(12px, 1.111vw, 16px)', // 16px @ 1440px
                  lineHeight: 'clamp(16px, 1.35vw, 19.44px)',
                  marginTop:  'clamp(4px, 0.556vw, 8px)',   // 8px  @ 1440px
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
