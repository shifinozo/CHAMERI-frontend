'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';

const STATIC_FEATURES = [
  {
    title: "Design-Driven,\nModern Approach",
    description: "With A Portfolio Of Completed Projects And Collaborations With Experienced Architects, We Bring Proven Expertise To Every Build. Our Work Speaks Through Real Results, Client Satisfaction, And Trust",
    image: "/dummyimages/7bceb1a3a08e49797c18d0a236cd66cd0abf999b.png",
  },
  {
    title: "Design-Driven,\nModern Approach",
    description: "With A Portfolio Of Completed Projects And Collaborations With Experienced Architects, We Bring Proven Expertise To Every Build. Our Work Speaks Through Real Results, Client Satisfaction, And Trusted",
    image: "/dummyimages/bd11f21b02ae4f903b7210b76ea2206cc20c36c4.png",
  },
  {
    title: "Design-Driven,\nModern Approach",
    description: "With A Portfolio Of Completed Projects And Collaborations With Experienced Architects, We Bring Proven Expertise To Every Build. Our Work Speaks Through Real Results,",
    image: "/dummyimages/bf12bde766c854698d73b4bc7a70a9d11df0362d.png",
  },
  {
    title: "Proven Expertise\n& Trusted Network",
    description: "With A Portfolio Of Completed Projects And Collaborations With Experienced Architects, We Bring Proven Expertise To Every Build. Our Work Speaks Through Real Results, Client Satisfaction,",
    image: "/dummyimages/c3f97090bd5902d9623f1a815064ef2bf18aaa74.png",
  },
  {
    title: "Client-Centric, Seamless\nExperience",
    description: "With A Portfolio Of Completed Projects And Collaborations With Experienced Architects, We Bring Proven Expertise To Every Build. Our Work Speaks Through Real Results, Client Satisfaction, And Trusted",
    image: "/dummyimages/bf12bde766c854698d73b4bc7a70a9d11df0362d.png",
  },
];

// Design spec: 281.95 × 353.64 px at 1440px canvas
const IMG_W = 281.95;
const IMG_H = 353.64;

export default function AboutSpecialSection({ specialSection }) {
  const apiItems = [
    specialSection?.first,
    specialSection?.second,
    specialSection?.third,
    specialSection?.fourth,
    specialSection?.fifth,
  ];
  const hasData = apiItems.some(item => item?.heading);
  const features = hasData
    ? apiItems.map((item, i) => ({
        title:       item?.heading     || STATIC_FEATURES[i].title,
        description: item?.subheading  || STATIC_FEATURES[i].description,
        image:       item?.image       || STATIC_FEATURES[i].image,
      }))
    : STATIC_FEATURES;
  const N = features.length;

  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const clamped = Math.max(0, Math.min(0.9999, latest));
    setActiveIndex(Math.floor(clamped * N));
  });

  // Set correct index if page loads already scrolled into section
  useEffect(() => {
    const clamped = Math.max(0, Math.min(0.9999, scrollYProgress.get()));
    setActiveIndex(Math.floor(clamped * N));
  }, [scrollYProgress]);

  return (
    // Tall outer section creates the scroll track.
    // (N + 1) × 100vh gives each item roughly 1 viewport of scroll travel.
    <section
      ref={containerRef}
      style={{ height: `${(N + 1) * 100}vh`, position: 'relative' }}
    >
      {/* ── Sticky panel: pins while the outer section scrolls ──────── */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          width: '100%',
          backgroundColor: '#EDE7DE',
          overflow: 'hidden',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        {/* ── Max-width content wrapper ────────────────────────────── */}
        <div
          style={{
            width: '100%',
            maxWidth: 'clamp(25rem, 100%, 1920px)',
            height: 'clamp(50vh, 100%, 1920px)',
            paddingLeft: 'clamp(22px, 5.9vw, 113px)',
            paddingRight: 'clamp(22px, 5.9vw, 113px)',
            paddingTop: 'clamp(16px, 1.87vw, 36px)',
            paddingBottom: 'clamp(16px, 1.87vw, 36px)',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* ── Top border ──────────────────────────────────────────── */}
          <div style={{ borderTop: '1px solid rgba(33,35,37,0.2)', flexShrink: 0 }} />

          {/* ── Header: label left, heading right ───────────────────── */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              paddingTop: 'clamp(14px, 2.43vw, 46px)',
              paddingBottom: 'clamp(14px, 2.43vw, 46px)',
              flexShrink: 0,
            }}
          >
            {/* Label */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 'clamp(5px, 0.58vw, 11px)',
                width: 'clamp(140px, 30vw, 576px)',
                flexShrink: 0,
                paddingTop: 'clamp(4px, 0.4vw, 8px)',
              }}
            >
              <div
                style={{
                  width: 'clamp(8px, 0.97vw, 18px)',
                  height: 'clamp(8px, 0.97vw, 18px)',
                  backgroundColor: '#334454',
                  borderRadius: '3px',
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontFamily: "var(--font-geist,'Geist'),system-ui,sans-serif",
                  fontWeight: 400,
                  fontSize: 'clamp(9px, 0.9vw, 17px)',
                  lineHeight: 1.2,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: '#1A1A1A',
                  whiteSpace: 'nowrap',
                }}
              >
                What Makes Us Special
              </span>
            </div>

            {/* Heading */}
            <div style={{ width: 'clamp(300px, 45vw, 1000px)' }}>
              <h2
                style={{
                  fontFamily: "var(--font-roundo,'Roundo'),system-ui,sans-serif",
                  fontWeight: 500,
                  fontSize: 'clamp(28px, 4.16vw, 80px)',
                  lineHeight: 1.08,
                  letterSpacing: 'clamp(-2px, -0.18vw, -0.5px)',
                  color: '#1A1A1A',
                  margin: 0,
                }}
              >
                {specialSection?.title || 'Each project tells its own story of precision.'}
              </h2>
            </div>
          </div>

          {/* ── Rows area: fills the remaining viewport height ────────── */}
          <div
            style={{
              position: 'relative',
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              minHeight: 0,
            }}
          >
            {/*
              ── Per-row image panels ───────────────────────────────────
              Each image container is absolutely positioned so its top edge
              aligns with the start of its corresponding row
              (row i starts at i/N × 100% of the rows area).

              Fixed dimensions from design spec: 281.95 × 353.64 px.
              Only the active image is mounted; AnimatePresence drives the
              slide-up reveal on enter and upward-fade on exit.
            */}
            {features.map((feature, index) => {
              // Distribute images with equal spacing across the full usable range:
              //   start  = -offset  (image 0 sits in the header area)
              //   end    = 100% - IMG_H  (image N-1 bottom touches rows area bottom)
              // fraction = index / (N - 1)  →  linear interpolation across range
              const fraction = N > 1 ? index / (N - 1) : 0;
              const imgTop = `calc(${fraction} * (100% - ${IMG_H}px + clamp(100px, 17vh, 200px)) - clamp(100px, 17vh, 200px))`;

              return (
              <div
                key={`img-${index}`}
                style={{
                  position: 'absolute',
                  top: imgTop,
                  left: 'clamp(200px, 22vw, 337px)',
                  width: `clamp(60px, 100%, 267px)`,
                  height: `clamp(120px, 100%, 354px)`,
                  overflow: 'hidden',
                  borderRadius: 'clamp(4px, 0.55vw, 10px)',
                  zIndex: index === activeIndex ? 10 : 0,
                  pointerEvents: 'none',
                  // boxShadow: '0 8px 40px rgba(0,0,0,0.12)',
                }}
              >
                <AnimatePresence>
                  {index === activeIndex && (
                    <motion.div
                      key={`content-${index}`}
                      initial={{ y: '100%', opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: '-20%', opacity: 0 }}
                      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                      style={{ position: 'absolute', inset: 0 }}
                    >
                      <Image
                        src={feature.image}
                        alt={feature.title}
                        fill
                        style={{ objectFit: 'cover' }}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
            })}

            {/* ── Feature rows (title + spacer + description) ─────────── */}
            {features.map((feature, index) => {
              const isActive = index === activeIndex;

              return (
                <div
                  key={index}
                  style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderBottom: '1px solid rgba(33,35,37,0.12)',
                    paddingTop: 'clamp(6px, 0.8vw, 15px)',
                    paddingBottom: 'clamp(6px, 0.8vw, 15px)',
                    boxSizing: 'border-box',
                  }}
                >
                  {/* Left: Title */}
                  <div
                    style={{
                      width: 'clamp(130px, 28vw, 537px)',
                      flexShrink: 0,
                    }}
                  >
                    <motion.h3
                      animate={{ color: isActive ? '#1A1A1A' : '#8A9BB0' }}
                      transition={{ duration: 0.4, ease: 'easeInOut' }}
                      style={{
                        fontFamily: "var(--font-roundo,'Roundo'),system-ui,sans-serif",
                        fontWeight: 500,
                        fontSize: 'clamp(14px, 1.52vw, 29px)',
                        lineHeight: 1.2,
                        margin: 0,
                        whiteSpace: 'pre-line',
                      }}
                    >
                      {feature.title}
                    </motion.h3>
                  </div>

                  {/* Center spacer: same width as the image panel above */}
                  <div style={{ width: `${IMG_W}px`, flexShrink: 0 }} />

                  {/* Right: Description */}
                  <div style={{ flex: 1, paddingLeft: 'clamp(8px, 1vw, 19px)' }}>
                    <motion.p
                      animate={{ color: isActive ? '#1A1A1A' : '#8A9BB0' }}
                      transition={{ duration: 0.4, ease: 'easeInOut' }}
                      style={{
                        fontFamily: "var(--font-geist,'Geist'),system-ui,sans-serif",
                        fontWeight: 400,
                        fontSize: 'clamp(11px, 1.11vw, 21px)',
                        lineHeight: 1.35,
                        margin: 0,
                        maxWidth: 'clamp(150px, 40vw, 669px)',
                      }}
                    >
                      {feature.description}
                    </motion.p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
