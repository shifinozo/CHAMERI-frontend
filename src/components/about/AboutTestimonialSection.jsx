   'use client';

import React, { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';

const TESTIMONIALS = [
  {
    id: 1,
    quote: '"Lorem amet dolo elit nisi urna erat odio enim duis cras nunc orci ante quis arcu vero pede just urna."',
    name: 'Richard',
    role: 'Entrepreneur',
    img: '/dummyimages/d18115bcf5e039e1b2d60bfa8c4e93e2c4b1ea1f.png',
    avatar: 'https://i.pravatar.cc/80?img=11',
  },
  {
    id: 2,
    quote: '"Lorem amet dolo elit nisi urna erat odio enim duis cras nunc orci ante quis arcu vero pede just urna."',
    name: 'Haruto & Aiko',
    role: 'Tech Startup Founders',
    img: '/dummyimages/7bceb1a3a08e49797c18d0a236cd66cd0abf999b.png',
    avatar: 'https://i.pravatar.cc/80?img=14',
  },
  {
    id: 3,
    quote: '"Lorem amet dolo elit nisi urna erat odio enim duis cras nunc orci ante quis arcu vero pede just urna."',
    name: 'Priya Menon',
    role: 'Interior Designer',
    img: '/dummyimages/d18115bcf5e039e1b2d60bfa8c4e93e2c4b1ea1f.png',
    avatar: 'https://i.pravatar.cc/80?img=47',
  },
  {
    id: 4,
    quote: '"Lorem amet dolo elit nisi urna erat odio enim duis cras nunc orci ante quis arcu vero pede just urna."',
    name: 'James Keller',
    role: 'Real Estate Investor',
    img: '/dummyimages/7bceb1a3a08e49797c18d0a236cd66cd0abf999b.png',
    avatar: 'https://i.pravatar.cc/80?img=52',
  },
];

export default function AboutTestimonialSection() {
  const total = TESTIMONIALS.length;
  // Start at the second set of testimonials so we can go left or right infinitely
  const [current, setCurrent] = useState(total);
  const [transitionEnabled, setTransitionEnabled] = useState(true);

  const extendedTestimonials = [...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS];

  const next = useCallback(() => setCurrent((c) => c + 1), []);
  const prev = useCallback(() => setCurrent((c) => c - 1), []);

  const handleTransitionEnd = useCallback(() => {
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
      const rafId = requestAnimationFrame(() => {
        requestAnimationFrame(() => setTransitionEnabled(true));
      });
      return () => cancelAnimationFrame(rafId);
    }
  }, [transitionEnabled]);

  return (
    <section
      className="w-full flex flex-col overflow-hidden relative"
      style={{
        backgroundColor: '#EDE7DE',
        paddingTop: 'clamp(40px, 5.28vw, 76px)',
        paddingBottom: 'clamp(40px, 5.28vw, 76px)',
        gap: 'clamp(30px, 3.47vw, 50px)',
      }}
    >
      {/* ── 1st — Header ──────────────────────────────────────────────────────── */}
      <div
        className="w-full mx-auto flex flex-col items-center text-center"
        style={{
          paddingLeft: 'clamp(20px, 5.56vw, 80px)',
          paddingRight: 'clamp(20px, 5.56vw, 80px)',
          gap: 'clamp(8px, 0.69vw, 10px)',
        }}
      >
        {/* Badge */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 'clamp(4px, 0.5vw, 7.2px)',
          }}
        >
          <div
            style={{
              width: 'clamp(10px, 0.97vw, 14px)',
              height: 'clamp(10px, 0.97vw, 14px)',
              backgroundColor: '#334454',
              borderRadius: 'clamp(2px, 0.21vw, 3px)',
              flexShrink: 0,
            }}
          />
          <span
            style={{
              fontFamily: "var(--font-geist, 'Geist'), system-ui, sans-serif",
              fontWeight: 400,
              fontSize: 'clamp(11px, 1.13vw, 16.2px)',
              lineHeight: 1.2,
              letterSpacing: '-0.32px',
              textTransform: 'uppercase',
              color: '#334454',
            }}
          >
            Testimonials
          </span>
        </div>

        {/* Main heading */}
        <h2
          style={{
            fontFamily: "var(--font-roundo, 'Roundo'), system-ui, sans-serif",
            fontWeight: 500,
            fontSize: 'clamp(32px, 4.17vw, 60px)',
            lineHeight: 1.1,
            letterSpacing: 'clamp(-3.05px, -0.21vw, -1.2px)',
            color: '#1A1A1A',
            maxWidth: 'clamp(340px, 42.22vw, 608px)',
            margin: 0,
          }}
        >
          What Our Clients Says
        </h2>

        {/* Sub-heading */}
        <p
          style={{
            fontFamily: "var(--font-geist, 'Geist'), system-ui, sans-serif",
            fontWeight: 400,
            fontSize: 'clamp(14px, 1.39vw, 20px)',
            lineHeight: 1.35,
            letterSpacing: '-0.3px',
            color: 'rgba(51, 68, 84, 0.7)',
            maxWidth: 'clamp(320px, 42.22vw, 608px)',
            margin: 0,
          }}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
        </p>
      </div>

      {/* ── 2nd — Carousel ────────────────────────────────────────────────────── */}
      <div
        className="relative w-full"
        style={{
          '--cardW': 'clamp(280px, 55.55vw, 800px)',
          '--cardH': 'clamp(380px, 38.19vw, 550px)',
          '--sideH': 'clamp(323px, 32.46vw, 467.5px)',
          '--gap': 'clamp(12px, 1.39vw, 20px)',
          height: 'var(--cardH)',
        }}
      >
        <div
          className="flex items-center"
          style={{
            gap: 'var(--gap)',
            width: 'max-content',
            /* 
             * Center offset = 50vw - (cardW / 2)
             * Shift by = current * (cardW + gap)
             */
            transform: `translateX(calc(50vw - (var(--cardW) / 2) - ${current} * (var(--cardW) + var(--gap))))`,
            transition: transitionEnabled ? 'transform 500ms cubic-bezier(0.4, 0, 0.2, 1)' : 'none',
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {extendedTestimonials.map((item, i) => {
            const dist = Math.abs(i - current);
            const isCenter = dist === 0;
            const opacity = isCenter ? 1 : dist === 1 ? 0.6 : 0.3;

            return (
              <div
                key={i}
                className="relative flex-shrink-0 overflow-hidden"
                style={{
                  width: 'var(--cardW)',
                  height: isCenter ? 'var(--cardH)' : 'var(--sideH)',
                  borderRadius: 'clamp(8px, 0.83vw, 12px)',
                  opacity,
                  transition: 'height 500ms cubic-bezier(0.4,0,0.2,1), opacity 500ms ease',
                }}
              >
                <Image src={item.img} alt={item.name} fill style={{ objectFit: 'cover' }} />

                {/* Bottom gradient */}
                <div
                  style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    bottom: 0,
                    height: '50%',
                    background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.6) 60%, transparent 100%)',
                    zIndex: 1,
                    pointerEvents: 'none',
                  }}
                />

                {/* Content Overlay */}
                <div
                  style={{
                    position: 'absolute',
                    left: 0,
                    bottom: 0,
                    width: '100%',
                    padding: 'clamp(16px, 1.67vw, 24px)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 'clamp(16px, 1.67vw, 24px)',
                    zIndex: 2,
                  }}
                >
                  {/* Quote */}
                  <p
                    style={{
                      fontFamily: "var(--font-geist, 'Geist'), system-ui, sans-serif",
                      fontWeight: 500,
                      fontSize: 'clamp(16px, 1.81vw, 26px)',
                      lineHeight: 1.4,
                      color: '#FFFFFF',
                      margin: 0,
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {item.quote}
                  </p>

                  {/* Profile */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'clamp(8px, 0.83vw, 12px)',
                    }}
                  >
                    <div
                      style={{
                        position: 'relative',
                        width: 'clamp(32px, 3.12vw, 45px)',
                        height: 'clamp(32px, 3.12vw, 45px)',
                        borderRadius: 'clamp(4px, 0.35vw, 5px)',
                        overflow: 'hidden',
                        flexShrink: 0,
                      }}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={item.avatar} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <p
                        style={{
                          fontFamily: "var(--font-geist, 'Geist'), system-ui, sans-serif",
                          fontWeight: 600,
                          fontSize: 'clamp(14px, 1.11vw, 16px)',
                          lineHeight: 1.3,
                          color: '#FFFFFF',
                          margin: 0,
                        }}
                      >
                        {item.name}
                      </p>
                      <p
                        style={{
                          fontFamily: "var(--font-geist, 'Geist'), system-ui, sans-serif",
                          fontWeight: 400,
                          fontSize: 'clamp(11px, 0.9vw, 13px)',
                          color: 'rgba(255, 255, 255, 0.7)',
                          margin: 0,
                        }}
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

        {/* Navigation Arrows on edges of center card */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 'var(--cardW)',
            height: '0',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            pointerEvents: 'none',
            zIndex: 10,
          }}
        >
          <button
            onClick={prev}
            aria-label="Previous"
            style={{
              pointerEvents: 'auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 'clamp(28px, 2.78vw, 40px)',
              height: 'clamp(28px, 2.78vw, 40px)',
              backgroundColor: '#334454',
              borderRadius: 'clamp(4px, 0.35vw, 5px)',
              border: 'none',
              cursor: 'pointer',
              transform: 'translateX(-50%)',
              transition: 'background-color 0.3s ease',
            }}
          >
            <svg width="clamp(12px, 1.2vw, 16px)" height="clamp(12px, 1.2vw, 16px)" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={next}
            aria-label="Next"
            style={{
              pointerEvents: 'auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 'clamp(28px, 2.78vw, 40px)',
              height: 'clamp(28px, 2.78vw, 40px)',
              backgroundColor: '#334454',
              borderRadius: 'clamp(4px, 0.35vw, 5px)',
              border: 'none',
              cursor: 'pointer',
              transform: 'translateX(50%)',
              transition: 'background-color 0.3s ease',
            }}
          >
            <svg width="clamp(12px, 1.2vw, 16px)" height="clamp(12px, 1.2vw, 16px)" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* ── 3rd — Learn More Button ────────────────────────────────────────── */}
      <div
        className="w-full flex justify-center"
        style={{
          marginTop: 'clamp(10px, 1.39vw, 20px)',
        }}
      >
        <button
          className="group relative flex items-center border-none cursor-pointer overflow-hidden transition-colors duration-500 bg-[#6B859E] hover:bg-[#4a6074]"
          style={{
            width: 'clamp(118.6px, 11.6vw, 222.6px)',
            height: 'clamp(36.9px, 3.61vw, 69.3px)',
            borderRadius: 'clamp(8.5px, 0.83vw, 16px)',
          }}
        >
          {/* Sliding text */}
          <div
            style={{
              position: 'absolute',
              left: 'clamp(8.5px, 0.83vw, 16px)',
              top: '50%',
              transform: 'translateY(-50%)',
              height: 'clamp(16.3px, 1.6vw, 30.6px)',
              overflow: 'hidden',
            }}
          >
            <div className="flex flex-col transition-transform duration-500 ease-in-out group-hover:-translate-y-1/2">
              <span
                style={{
                  fontFamily: "var(--font-geist, 'Geist'), system-ui, sans-serif",
                  fontWeight: 500,
                  fontSize: 'clamp(10.6px, 1.04vw, 20px)',
                  color: '#FFFFFF',
                  height: 'clamp(16.3px, 1.6vw, 30.6px)',
                  display: 'flex',
                  alignItems: 'center',
                  whiteSpace: 'nowrap',
                }}
              >
                Learn More
              </span>
              <span
                style={{
                  fontFamily: "var(--font-geist, 'Geist'), system-ui, sans-serif",
                  fontWeight: 500,
                  fontSize: 'clamp(10.6px, 1.04vw, 20px)',
                  color: '#FFFFFF',
                  height: 'clamp(16.3px, 1.6vw, 30.6px)',
                  display: 'flex',
                  alignItems: 'center',
                  whiteSpace: 'nowrap',
                }}
              >
                Learn More
              </span>
            </div>
          </div>

          {/* Arrow box */}
          <div
            className="absolute transition-colors duration-500 overflow-hidden bg-white group-hover:bg-[#EDE7DE]"
            style={{
              right: 'clamp(8.5px, 0.83vw, 16px)',
              width: 'clamp(21.3px, 2.08vw, 40px)',
              height: 'clamp(21.3px, 2.08vw, 40px)',
              borderRadius: 'clamp(5px, 0.49vw, 9.3px)',
              top: '50%',
              transform: 'translateY(-50%)',
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center transition-transform duration-500 ease-in-out group-hover:translate-x-full">
              <svg width="clamp(10px, 0.97vw, 18.6px)" height="clamp(10px, 0.97vw, 18.6px)" viewBox="0 0 24 24" fill="none" stroke="#6B859E" strokeWidth="2.5" className="transition-colors duration-500">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>
            <div className="absolute inset-0 flex items-center justify-center transition-transform duration-500 ease-in-out -translate-x-full group-hover:translate-x-0">
              <svg width="clamp(10px, 0.97vw, 18.6px)" height="clamp(10px, 0.97vw, 18.6px)" viewBox="0 0 24 24" fill="none" stroke="#6B859E" strokeWidth="2.5" className="transition-colors duration-500">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </button>
      </div>
    </section>
  );
}
