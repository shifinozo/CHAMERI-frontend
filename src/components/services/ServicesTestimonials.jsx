'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';

/*
 * ─── CLAMP REFERENCE ────────────────────────────────────────────────────────
 *
 *  Formula : preferred_vw = (MAX_px - MIN_px) / (1920 - 375) * 100
 *  Viewport range: 375px (mobile) → 1920px (4xl)
 *
 *  HEADER
 *  px                  : clamp(20px,   5.59vw, 106px)
 *  pt                  : clamp(40px,   2.59vw,  80px)
 *  pb                  : clamp(16px,   1.04vw,  32px)
 *  gap                 : clamp(7.1px,  0.4vw,  13.3px)
 *
 *  Badge dot size      : clamp(9.9px,  0.56vw, 18.6px)
 *  Badge dot radius    : clamp(2px,    0.13vw,   4px)
 *  Badge gap           : clamp(5.1px,  0.29vw,   9.6px)
 *  Badge font          : clamp(11.5px, 0.46vw,  18.6px)
 *
 *  Heading font        : clamp(32px,   3.1vw,   80px)
 *  Heading lead        : clamp(32px,   3.1vw,   80px)
 *  Heading tracking    : clamp(-0.6px,-0.039vw, -1.2px)
 *  Heading max-w       : clamp(340px, 30.4vw,  810px)
 *
 *  Para font           : clamp(14px,   0.81vw,  26.6px)
 *  Para lead           : clamp(18.5px, 1.08vw,  35.1px)
 *  Para tracking       : clamp(-0.3px,-0.018vw, -0.58px)
 *  Para max-w          : clamp(320px, 31.7vw,  810px)
 *
 *  CAROUSEL — card dims driven by useCardDimensions (JS/vw, not CSS clamp)
 *  because they also control JS layout math (trackX, arrowTop, etc.)
 *
 *  FOOTER BUTTON (Learn More CTA)
 *  pt                  : clamp(16px,   1.04vw,  32px)
 *  pb                  : clamp(40px,   2.59vw,  80px)
 *
 *  Btn width           : clamp(118.6px,6.7vw,  222.6px)
 *  Btn height          : clamp(36.9px, 2.1vw,   69.3px)
 *  Btn radius          : clamp(8.5px,  0.49vw,  16px)
 *
 *  Text top            : clamp(9.9px,  0.57vw,  18.6px)
 *  Text left           : clamp(8.5px,  0.49vw,  16px)
 *  Text width          : clamp(69px,   3.9vw,  129px)
 *  Text height         : clamp(16.3px, 0.92vw,  30.6px)
 *  Text font           : clamp(10.6px, 0.6vw,   20px)
 *
 *  Arrow right         : clamp(8.5px,  0.49vw,  16px)
 *  Arrow box size      : clamp(21.3px, 1.21vw,  40px)
 *  Arrow box radius    : clamp(5px,    0.28vw,   9.3px)
 *  Arrow svg size      : clamp(10px,   0.56vw,  18.6px)
 *
 * ────────────────────────────────────────────────────────────────────────────
 */

const STATIC_TESTIMONIALS = [
  {
    id: 1,
    quote: '"Lorem amet dolo elit nisi urna erat odio enim duis cras nunc orci ante quis arcu vero pede just urna."',
    name: 'Richard',
    role: 'Entrepreneur',
    img: '/dummyimages/Frame 2121454280.png',
    avatar: 'https://i.pravatar.cc/80?img=11',
  },
  {
    id: 2,
    quote: '"Lorem amet dolo elit nisi urna erat odio enim duis cras nunc orci ante quis arcu vero pede just urna."',
    name: 'Haruto & Aiko',
    role: 'Tech Startup Founders',
    img: '/dummyimages/Container.png',
    avatar: 'https://i.pravatar.cc/80?img=14',
  },
  {
    id: 3,
    quote: '"Lorem amet dolo elit nisi urna erat odio enim duis cras nunc orci ante quis arcu vero pede just urna."',
    name: 'Priya Menon',
    role: 'Interior Designer',
    img: '/dummyimages/Overlay.png',
    avatar: 'https://i.pravatar.cc/80?img=47',
  },
  {
    id: 4,
    quote: '"Lorem amet dolo elit nisi urna erat odio enim duis cras nunc orci ante quis arcu vero pede just urna."',
    name: 'James Keller',
    role: 'Real Estate Investor',
    img: '/dummyimages/Frame 2121454280.png',
    avatar: 'https://i.pravatar.cc/80?img=52',
  },
];

/* ─── Shared Arrow SVG ───────────────────────────────────────────────── */
const ArrowRight = ({ size }) => (
  <svg
    viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
    className="text-[#6B859E]"
    style={{ width: size, height: size }}
  >
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

/* ─── Fluid card dimensions via continuous vw formula ───────────────────
 *  Base (1440px / 3xl): cardW=800, cardH=550, sideH=467.5, gap=20
 *  Scaling: linear vw between mobile (375) and 4xl (1920)
 * ────────────────────────────────────────────────────────────────────── */
function useCardDimensions() {
  const [dims, setDims] = useState({ cardW: 800, cardH: 550, sideH: 467.5, gap: 20 });

  useEffect(() => {
    const compute = () => {
      const vw = window.innerWidth;
      const lerp = (min, max) => Math.round(Math.min(max, Math.max(min, min + (max - min) * ((vw - 375) / (1920 - 375)))));
      setDims({
        cardW: lerp(320, 1067),
        cardH: lerp(260, 733),
        sideH: lerp(220, 623),
        gap:   lerp(12,  27),
      });
    };
    compute();
    window.addEventListener('resize', compute);
    return () => window.removeEventListener('resize', compute);
  }, []);

  return dims;
}

const ServicesTestimonials = ({ testimonial }) => {
  const heading = testimonial?.heading || "What Our Clients Says";
  const subheading =
    testimonial?.subheading ||
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor";

  const filledCards = testimonial?.cards?.filter((c) => c.quote || c.name) || [];
  const TESTIMONIALS = filledCards.length
    ? filledCards.map((c, i) => ({
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
    // Only respond to the track's own transform transition, not bubbled clip-path/opacity events from child cards
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
  const arrowTop     = cardH / 2 - 20 * scale;

  return (
    <section
      className="w-full bg-[#EDE7DE] overflow-hidden flex flex-col mx-auto items-center"
      style={{
        paddingTop:    'clamp(40px, 4.17vw, 60px)',
        paddingBottom: 'clamp(40px, 4.17vw, 60px)',
        gap:           'clamp(16px, 1.67vw, 24px)',
      }}
    >
      {/* ══ 1 — Header ════════════════════════════════════════════════════ */}
      <div
        className="w-full mx-auto flex flex-col items-center text-center"
        style={{
          width: 'clamp(600px, 90.28vw, 1300px)',
          gap:   'clamp(10px, 1.11vw, 16px)',
        }}
      >
        <div
          className="flex flex-col items-center justify-center"
          style={{ width: 'clamp(300px, 42.22vw, 608px)', gap: 'clamp(6px, 0.69vw, 10px)' }}
        >
          {/* Badge */}
          <div
            className="flex items-center justify-center rounded-[90px] self-center"
            style={{
              width:         'clamp(90px, 9.04vw, 130.2px)',
              height:        'clamp(22px, 2.14vw, 30.8px)',
              gap:           'clamp(5px, 0.5vw, 7.2px)',
            }}
          >
            <div
              className="bg-[#334454] flex-shrink-0"
              style={{
                width:        'clamp(10px, 0.97vw, 14px)',
                height:       'clamp(10px, 0.97vw, 14px)',
                borderRadius: 'clamp(2px, 0.21vw, 3px)',
              }}
            />
            <span
              className="font-sans font-normal uppercase text-[#334454] tracking-wider flex items-center justify-center"
              style={{
                height:        'clamp(16px, 1.39vw, 20px)',
                fontSize:      'clamp(10px, 0.83vw, 16px)',
                letterSpacing: 'clamp(-0.24px, -0.02vw, -0.32px)',
                lineHeight: 1
              }}
            >
              TESTIMONIALS
            </span>
          </div>

          {/* Heading */}
          <h2
            className="font-roundo font-medium capitalize text-[#1A1A1A] text-center m-0 flex items-center justify-center"
            style={{
              fontSize:      'clamp(36px, 4.17vw, 66px)',
              lineHeight:    'clamp(36px, 4.17vw, 60px)',
              letterSpacing: 'clamp(-0.64px, -0.06vw, -0.9px)',
              width:         'clamp(300px, 42.22vw, 648px)',
              height:        'clamp(40px, 4.17vw, 60px)'
            }}
          >
            {heading}
          </h2>

          {/* Sub-heading */}
          <p
            className="font-sans font-normal text-[#334454]/70 text-center m-0 flex items-center justify-center"
            style={{
              fontSize:      'clamp(14px, 1.39vw, 20px)',
              lineHeight:    'clamp(18px, 1.83vw, 26.4px)',
              letterSpacing: 'clamp(-0.28px, -0.03vw, -0.44px)',
              width:         'clamp(300px, 42.22vw, 608px)',
              height:        'clamp(40px, 3.68vw, 53px)'
            }}
          >
            {subheading}
          </p>
        </div>
      </div>

      {/* ══ 2 — Carousel ══════════════════════════════════════════════════ */}
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
            gap: `${gap}px`,
            transform: `translateX(${trackX}px)`,
            transition: transitionEnabled ? 'transform 900ms cubic-bezier(0.4, 0, 0.2, 1)' : 'none',
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {extendedTestimonials.map((item, i) => {
            const dist     = Math.abs(i - current);
            const isCenter = dist === 0;
            const opacity  = isCenter ? 1 : dist === 1 ? 0.6 : 0;
            // clip top & bottom equally so the card appears shorter without moving in the layout
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
                  transition: transitionEnabled ? 'clip-path 900ms cubic-bezier(0.4,0,0.2,1), opacity 900ms ease' : 'none',
                }}
              >
                <Image
                  src={item.img}
                  alt={item.name}
                  fill
                  className="object-cover"
                  style={{
                    transform:  isCenter ? 'scale(1)' : 'scale(1.1)',
                    transition: transitionEnabled
                      ? 'transform 900ms cubic-bezier(0.4,0,0.2,1)'
                      : 'none',
                  }}
                />

                {/* Bottom gradient */}
                <div
                  className="absolute left-0 right-0 bottom-0"
                  style={{
                    height: `${214.02 * scale}px`,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.6) 60%, transparent 100%)',
                  }}
                />

                {/* Content overlay */}
                <div
                  className="absolute left-0"
                  style={{
                    top:    `${335.99 * scale}px`,
                    height: `${214.02 * scale}px`,
                    width:  `${cardW}px`,
                  }}
                >
                  {/* Quote */}
                  <p
                    className="absolute text-white"
                    style={{
                      top:              `${51 * scale}px`,
                      left:             `${24 * scale}px`,
                      width:            `${725.76 * scale}px`,
                      height:           `${70.4 * scale}px`,
                      fontFamily:       'var(--font-geist-sans), sans-serif',
                      fontWeight:       500,
                      fontSize:         `${26.1 * scale}px`,
                      lineHeight:       `${36.4 * scale}px`,
                      overflow:         'hidden',
                      display:          '-webkit-box',
                      WebkitLineClamp:  2,
                      WebkitBoxOrient:  'vertical',
                    }}
                  >
                    {item.quote}
                  </p>

                  {/* Profile */}
                  <div
                    className="absolute flex items-center"
                    style={{
                      top:    `${142.81 * scale}px`,
                      left:   `${24 * scale}px`,
                      width:  `${752 * scale}px`,
                      height: `${47.2 * scale}px`,
                      gap:    `${12 * scale}px`,
                    }}
                  >
                    <div
                      className="flex-shrink-0 overflow-hidden"
                      style={{
                        width:        `${45 * scale}px`,
                        height:       `${45 * scale}px`,
                        borderRadius: `${5 * scale}px`,
                      }}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.avatar}
                        alt={item.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>
                    <div>
                      <p
                        className="font-sans font-semibold text-white"
                        style={{ fontSize: `${16 * scale}px`, lineHeight: '1.3' }}
                      >
                        {item.name}
                      </p>
                      <p
                        className="font-sans text-white/70"
                        style={{ fontSize: `${13 * scale}px` }}
                      >
                        {item.role}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Left Arrow ─────────────────────────────────────────────────── */}
        <button
          onClick={prev}
          aria-label="Previous"
          className="absolute z-20 flex items-center justify-center bg-[#334454] hover:bg-[#6B859E] transition-colors duration-300 border-none cursor-pointer"
          style={{
            width:        `${40 * scale}px`,
            height:       `${40 * scale}px`,
            borderRadius: `${7.11 * scale}px`,
            top:          `${arrowTop}px`,
            left:         `${centerOffset - 20 * scale}px`,
          }}
        >
          <svg
            viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"
            style={{ width: `${18 * scale}px`, height: `${18 * scale}px` }}
          >
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
        </button>

        {/* ── Right Arrow ────────────────────────────────────────────────── */}
        <button
          onClick={next}
          aria-label="Next"
          className="absolute z-20 flex items-center justify-center bg-[#334454] hover:bg-[#6B859E] transition-colors duration-300 border-none cursor-pointer"
          style={{
            width:        `${40 * scale}px`,
            height:       `${40 * scale}px`,
            borderRadius: `${7.11 * scale}px`,
            top:          `${arrowTop}px`,
            left:         `${centerOffset + cardW - 20 * scale}px`,
          }}
        >
          <svg
            viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"
            style={{ width: `${18 * scale}px`, height: `${18 * scale}px` }}
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* ══ 3 — Learn More CTA ════════════════════════════════════════════ */}
      <div
        className="w-full flex justify-center items-center"
        style={{ width: 'clamp(600px, 90.28vw, 1300px)' }}
      >
        <button
          className="group relative flex items-center justify-center bg-[#6B859E] hover:bg-[#4a6074] transition-colors duration-500 overflow-hidden cursor-pointer border-none"
          style={{
            width:        'clamp(118.6px, 11.6vw, 167px)',
            height:       'clamp(36.9px, 3.61vw, 52px)',
            borderRadius: 'clamp(8.5px, 0.83vw, 12px)',
          }}
        >
          {/* Sliding text */}
          <div
            className="absolute overflow-hidden"
            style={{
              top:    'clamp(10px, 1.01vw, 14.5px)',
              left:   'clamp(10px, 0.83vw, 12px)',
              width:  'clamp(70px, 6.74vw, 97px)',
              height: 'clamp(18px, 1.6vw, 23px)',
            }}
          >
            <div className="flex flex-col transition-transform duration-500 ease-in-out group-hover:-translate-y-1/2">
              {['Learn More', 'Learn More'].map((label, i) => (
                <span
                  key={i}
                  className="font-sans font-medium text-white whitespace-nowrap flex items-center"
                  style={{
                    height:   'clamp(18px, 1.6vw, 23px)',
                    fontSize: 'clamp(13px, 1.04vw, 15px)',
                  }}
                >
                  {label}
                </span>
              ))}
            </div>
          </div>

          {/* Arrow box */}
          <div
            className="absolute bg-white group-hover:bg-[#EDE7DE] transition-colors duration-500 overflow-hidden"
            style={{
              right:        'clamp(8.5px, 0.83vw, 12px)',
              width:        'clamp(21.3px, 2.08vw, 30px)',
              height:       'clamp(21.3px, 2.08vw, 30px)',
              borderRadius: 'clamp(5px, 0.49vw, 7px)',
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center transition-transform duration-500 ease-in-out group-hover:translate-x-full">
              <ArrowRight size="clamp(10px, 0.97vw, 14px)" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center transition-transform duration-500 ease-in-out -translate-x-full group-hover:translate-x-0">
              <ArrowRight size="clamp(10px, 0.97vw, 14px)" />
            </div>
          </div>
        </button>
      </div>

    </section>
  );
};

export default ServicesTestimonials;
