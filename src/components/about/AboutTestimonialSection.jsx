'use client';

import React, { useState, useCallback, useEffect, useRef } from 'react';
import Image from 'next/image';

const STATIC_TESTIMONIALS = [
  { id: 1, quote: '"Lorem amet dolo elit nisi urna erat odio enim duis cras nunc orci ante quis arcu vero pede just urna."', name: 'Richard', role: 'Entrepreneur', img: '/dummyimages/d18115bcf5e039e1b2d60bfa8c4e93e2c4b1ea1f.png', avatar: 'https://i.pravatar.cc/80?img=11' },
  { id: 2, quote: '"Lorem amet dolo elit nisi urna erat odio enim duis cras nunc orci ante quis arcu vero pede just urna."', name: 'Haruto & Aiko', role: 'Tech Startup Founders', img: '/dummyimages/7bceb1a3a08e49797c18d0a236cd66cd0abf999b.png', avatar: 'https://i.pravatar.cc/80?img=14' },
  { id: 3, quote: '"Lorem amet dolo elit nisi urna erat odio enim duis cras nunc orci ante quis arcu vero pede just urna."', name: 'Priya Menon', role: 'Interior Designer', img: '/dummyimages/d18115bcf5e039e1b2d60bfa8c4e93e2c4b1ea1f.png', avatar: 'https://i.pravatar.cc/80?img=47' },
  { id: 4, quote: '"Lorem amet dolo elit nisi urna erat odio enim duis cras nunc orci ante quis arcu vero pede just urna."', name: 'James Keller', role: 'Real Estate Investor', img: '/dummyimages/7bceb1a3a08e49797c18d0a236cd66cd0abf999b.png', avatar: 'https://i.pravatar.cc/80?img=52' },
];

function useCardDimensions() {
  const clamp = (min, val, max) => Math.min(Math.max(min, val), max);
  const [dims, setDims] = useState({ cardW: 800, cardH: 550, sideH: 467.5, gap: 20 });

  useEffect(() => {
    const update = () => {
      const vw = window.innerWidth;
      setDims({
        cardW: clamp(280, vw * 0.5555, 800),
        cardH: clamp(380, vw * 0.3819, 550),
        sideH: clamp(323, vw * 0.3246, 467.5),
        gap:   clamp(12,  vw * 0.0139, 20),
      });
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return dims;
}

export default function AboutTestimonialSection({ testimonialSection }) {
  const TESTIMONIALS = testimonialSection?.cards?.length
    ? testimonialSection.cards.map((c, i) => ({
        id: i + 1,
        quote: c.quote,
        name: c.name,
        role: c.designation,
        img: c.cardImage || STATIC_TESTIMONIALS[i % STATIC_TESTIMONIALS.length]?.img,
        avatar: c.image || STATIC_TESTIMONIALS[i % STATIC_TESTIMONIALS.length]?.avatar,
      }))
    : STATIC_TESTIMONIALS;
  const total = TESTIMONIALS.length;
  const [current, setCurrent]                     = useState(total);
  const [containerW, setContainerW]               = useState(1440);
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const wrapperRef = useRef(null);
  const { cardW, cardH, sideH, gap } = useCardDimensions();

  const extendedTestimonials = [...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS];

  useEffect(() => {
    const measure = () => {
      if (wrapperRef.current) setContainerW(wrapperRef.current.offsetWidth);
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  const next = useCallback(() => setCurrent((c) => c + 1), []);
  const prev = useCallback(() => setCurrent((c) => c - 1), []);

  const handleTransitionEnd = useCallback((e) => {
    // Ignore bubbled clip-path/opacity events from child cards
    if (e.target !== e.currentTarget) return;
    if (current >= total * 2) {
      setTransitionEnabled(false);
      setCurrent(current - total);
    } else if (current < total) {
      setTransitionEnabled(false);
      setCurrent(current + total);
    }
  }, [current, total]);

  useEffect(() => {
    if (!transitionEnabled) {
      const id = requestAnimationFrame(() =>
        requestAnimationFrame(() => setTransitionEnabled(true))
      );
      return () => cancelAnimationFrame(id);
    }
  }, [transitionEnabled]);

  const centerOffset = (containerW - cardW) / 2;
  const trackX       = centerOffset - current * (cardW + gap);
  const scale        = cardW / 800;
  const arrowSize    = 40 * scale;
  const arrowTop     = cardH / 2 - arrowSize / 2;

  return (
    <section
      className="w-full flex flex-col overflow-hidden relative"
      style={{
        backgroundColor: '#EDE7DE',
        paddingTop:    'clamp(40px, 5.28vw, 76px)',
        paddingBottom: 'clamp(40px, 5.28vw, 76px)',
        gap:           'clamp(30px, 3.47vw, 50px)',
      }}
    >
      {/* ── 1 — Header ──────────────────────────────────────────────────── */}
      <div
        className="w-full mx-auto flex flex-col items-center text-center"
        style={{
          paddingLeft:  'clamp(20px, 5.56vw, 80px)',
          paddingRight: 'clamp(20px, 5.56vw, 80px)',
          gap:          'clamp(8px, 0.69vw, 10px)',
        }}
      >
        {/* Badge */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 'clamp(4px, 0.5vw, 7.2px)' }}>
          <div
            style={{
              width:           'clamp(10px, 0.97vw, 14px)',
              height:          'clamp(10px, 0.97vw, 14px)',
              backgroundColor: '#334454',
              borderRadius:    'clamp(2px, 0.21vw, 3px)',
              flexShrink:      0,
            }}
          />
          <span
            style={{
              fontFamily:    "var(--font-geist, 'Geist'), system-ui, sans-serif",
              fontWeight:    400,
              fontSize:      'clamp(11px, 1.13vw, 16.2px)',
              lineHeight:    1.2,
              letterSpacing: '-0.32px',
              textTransform: 'uppercase',
              color:         '#334454',
            }}
          >
            Testimonials
          </span>
        </div>

        {/* Heading */}
        <h2
          style={{
            fontFamily:    "var(--font-roundo, 'Roundo'), system-ui, sans-serif",
            fontWeight:    500,
            fontSize:      'clamp(32px, 4.17vw, 60px)',
            lineHeight:    1.1,
            letterSpacing: 'clamp(-3.05px, -0.21vw, -1.2px)',
            color:         '#1A1A1A',
            maxWidth:      'clamp(340px, 42.22vw, 608px)',
            margin:        0,
          }}
        >
          What Our Clients Says
        </h2>

        {/* Sub-heading */}
        <p
          style={{
            fontFamily:    "var(--font-geist, 'Geist'), system-ui, sans-serif",
            fontWeight:    400,
            fontSize:      'clamp(14px, 1.39vw, 20px)',
            lineHeight:    1.35,
            letterSpacing: '-0.3px',
            color:         'rgba(51, 68, 84, 0.7)',
            maxWidth:      'clamp(320px, 42.22vw, 608px)',
            margin:        0,
          }}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
        </p>
      </div>

      {/* ── 2 — Carousel ────────────────────────────────────────────────── */}
      <div
        ref={wrapperRef}
        className="relative overflow-hidden w-full"
        style={{ height: `${cardH}px` }}
      >
        {/* Sliding track */}
        <div
          className="flex"
          style={{
            alignItems: 'center',
            gap:        `${gap}px`,
            transform:  `translateX(${trackX}px)`,
            transition: transitionEnabled ? 'transform 900ms cubic-bezier(0.4, 0, 0.2, 1)' : 'none',
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {extendedTestimonials.map((item, i) => {
            const dist     = Math.abs(i - current);
            const isCenter = dist === 0;
            const opacity  = isCenter ? 1 : dist === 1 ? 0.6 : 0;
            const clipPct  = isCenter ? 0 : ((1 - sideH / cardH) / 2) * 100;
            const r        = (12 * scale).toFixed(1);

            return (
              <div
                key={i}
                className="relative flex-shrink-0 overflow-hidden"
                style={{
                  width:      `${cardW}px`,
                  height:     `${cardH}px`,
                  clipPath:   `inset(${clipPct.toFixed(2)}% 0 ${clipPct.toFixed(2)}% 0 round ${r}px)`,
                  opacity,
                  transition: transitionEnabled
                    ? 'clip-path 900ms cubic-bezier(0.4,0,0.2,1), opacity 900ms ease'
                    : 'none',
                }}
              >
                <Image
                  src={item.img}
                  alt={item.name}
                  fill
                  style={{
                    objectFit: 'cover',
                    transform:  isCenter ? 'scale(1)' : 'scale(1.1)',
                    transition: transitionEnabled
                      ? 'transform 900ms cubic-bezier(0.4,0,0.2,1)'
                      : 'none',
                  }}
                />

                {/* Bottom gradient */}
                <div
                  style={{
                    position:   'absolute',
                    left: 0, right: 0, bottom: 0,
                    height:     '50%',
                    background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.6) 60%, transparent 100%)',
                    zIndex:     1,
                    pointerEvents: 'none',
                  }}
                />

                {/* Content */}
                <div
                  style={{
                    position:      'absolute',
                    left: 0, bottom: 0,
                    width:         '100%',
                    padding:       `clamp(16px, 1.67vw, 24px)`,
                    display:       'flex',
                    flexDirection: 'column',
                    gap:           'clamp(16px, 1.67vw, 24px)',
                    zIndex:        2,
                  }}
                >
                  <p
                    style={{
                      fontFamily:       "var(--font-geist, 'Geist'), system-ui, sans-serif",
                      fontWeight:       500,
                      fontSize:         `${26.1 * scale}px`,
                      lineHeight:       1.4,
                      color:            '#FFFFFF',
                      margin:           0,
                      display:          '-webkit-box',
                      WebkitLineClamp:  2,
                      WebkitBoxOrient:  'vertical',
                      overflow:         'hidden',
                    }}
                  >
                    {item.quote}
                  </p>

                  <div style={{ display: 'flex', alignItems: 'center', gap: `${12 * scale}px` }}>
                    <div
                      style={{
                        position:     'relative',
                        width:        `${45 * scale}px`,
                        height:       `${45 * scale}px`,
                        borderRadius: `${5 * scale}px`,
                        overflow:     'hidden',
                        flexShrink:   0,
                      }}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={item.avatar} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <p style={{ fontFamily: "var(--font-geist,'Geist'),sans-serif", fontWeight: 600, fontSize: `${16 * scale}px`, lineHeight: 1.3, color: '#FFFFFF', margin: 0 }}>
                        {item.name}
                      </p>
                      <p style={{ fontFamily: "var(--font-geist,'Geist'),sans-serif", fontWeight: 400, fontSize: `${13 * scale}px`, color: 'rgba(255,255,255,0.7)', margin: 0 }}>
                        {item.role}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Left Arrow ──────────────────────────────────────────────── */}
        <button
          onClick={prev}
          aria-label="Previous"
          className="absolute z-20 flex items-center justify-center bg-[#334454] hover:bg-[#6B859E] transition-colors duration-300 border-none cursor-pointer"
          style={{
            width:        `${arrowSize}px`,
            height:       `${arrowSize}px`,
            borderRadius: `${7.11 * scale}px`,
            top:          `${arrowTop}px`,
            left:         `${centerOffset - arrowSize / 2}px`,
          }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: `${18 * scale}px`, height: `${18 * scale}px` }}>
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
        </button>

        {/* ── Right Arrow ─────────────────────────────────────────────── */}
        <button
          onClick={next}
          aria-label="Next"
          className="absolute z-20 flex items-center justify-center bg-[#334454] hover:bg-[#6B859E] transition-colors duration-300 border-none cursor-pointer"
          style={{
            width:        `${arrowSize}px`,
            height:       `${arrowSize}px`,
            borderRadius: `${7.11 * scale}px`,
            top:          `${arrowTop}px`,
            left:         `${centerOffset + cardW - arrowSize / 2}px`,
          }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: `${18 * scale}px`, height: `${18 * scale}px` }}>
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* ── 3 — Learn More ──────────────────────────────────────────────── */}
      <div className="w-full flex justify-center" style={{ marginTop: 'clamp(10px, 1.39vw, 20px)' }}>
        <button
          className="group relative flex items-center border-none cursor-pointer overflow-hidden transition-colors duration-500 bg-[#6B859E] hover:bg-[#4a6074]"
          style={{
            width:        'clamp(118.6px, 11.6vw, 222.6px)',
            height:       'clamp(36.9px, 3.61vw, 69.3px)',
            borderRadius: 'clamp(8.5px, 0.83vw, 16px)',
          }}
        >
          {/* Sliding text */}
          <div
            style={{
              position:  'absolute',
              left:      'clamp(8.5px, 0.83vw, 16px)',
              top:       '50%',
              transform: 'translateY(-50%)',
              height:    'clamp(16.3px, 1.6vw, 30.6px)',
              overflow:  'hidden',
            }}
          >
            <div className="flex flex-col transition-transform duration-500 ease-in-out group-hover:-translate-y-1/2">
              {['Learn More', 'Learn More'].map((label, i) => (
                <span
                  key={i}
                  style={{
                    fontFamily:  "var(--font-geist, 'Geist'), system-ui, sans-serif",
                    fontWeight:  500,
                    fontSize:    'clamp(10.6px, 1.04vw, 20px)',
                    color:       '#FFFFFF',
                    height:      'clamp(16.3px, 1.6vw, 30.6px)',
                    display:     'flex',
                    alignItems:  'center',
                    whiteSpace:  'nowrap',
                  }}
                >
                  {label}
                </span>
              ))}
            </div>
          </div>

          {/* Arrow box */}
          <div
            className="absolute transition-colors duration-500 overflow-hidden bg-white group-hover:bg-[#EDE7DE]"
            style={{
              right:        'clamp(8.5px, 0.83vw, 16px)',
              width:        'clamp(21.3px, 2.08vw, 40px)',
              height:       'clamp(21.3px, 2.08vw, 40px)',
              borderRadius: 'clamp(5px, 0.49vw, 9.3px)',
              top:          '50%',
              transform:    'translateY(-50%)',
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center transition-transform duration-500 ease-in-out group-hover:translate-x-full">
              <svg width="clamp(10px, 0.97vw, 18.6px)" height="clamp(10px, 0.97vw, 18.6px)" viewBox="0 0 24 24" fill="none" stroke="#6B859E" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>
            <div className="absolute inset-0 flex items-center justify-center transition-transform duration-500 ease-in-out -translate-x-full group-hover:translate-x-0">
              <svg width="clamp(10px, 0.97vw, 18.6px)" height="clamp(10px, 0.97vw, 18.6px)" viewBox="0 0 24 24" fill="none" stroke="#6B859E" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </button>
      </div>
    </section>
  );
}
