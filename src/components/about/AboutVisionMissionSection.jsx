// 'use client';

// import React, { useRef, useEffect, useState } from 'react';
// import Image from 'next/image';

// // ─── Card data ─────────────────────────────────────────────────────────────
// const cards = [
//   {
//     label: 'Vision',
//     image: '/dummyimages/7bceb1a3a08e49797c18d0a236cd66cd0abf999b.png',
//     heading: 'Each project tells its own story of\u00a0precision.',
//     body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim.it, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim.',
//   },
//   {
//     label: 'Mission',
//     image: '/dummyimages/8276099377b328194b10337a1dc6e4999a4103d5.png',
//     heading: 'Each project tells its own story of\u00a0precision.',
//     body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim.it, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim.',
//   },
// ];

// /**
//  * AboutVisionMissionSection
//  *
//  * Two-card sticky scroll experience matching the Figma design.
//  * Design baseline: 1440 × 610 px
//  *
//  * Mechanism:
//  *  – Wrapper = 200vh tall (creates scroll track)
//  *  – Sticky div = 100vh (stays pinned while user scrolls)
//  *  – Card 1: auto-expands to full-bleed after 2s on screen entry
//  *  – Card 2: directly manipulates transform/top via scroll listener (no React state)
//  *            to guarantee smooth, lag-free animation
//  */
// export default function AboutVisionMissionSection() {
//   const wrapperRef   = useRef(null);
//   const card1Ref     = useRef(null);
//   const card2Ref     = useRef(null);
//   const [card1Phase, setCard1Phase] = useState('initial'); // 'initial' | 'expanded'
//   const hasAutoExpanded = useRef(false);
//   const timerRef = useRef(null);

//   // ── Card 1: auto-expand after 2 s ──────────────────────────────────────
//   useEffect(() => {
//     const el = wrapperRef.current;
//     if (!el) return;

//     const obs = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting && !hasAutoExpanded.current) {
//           hasAutoExpanded.current = true;
//           timerRef.current = setTimeout(() => setCard1Phase('expanded'), 2000);
//         }
//       },
//       { threshold: 0.15 }
//     );
//     obs.observe(el);

//     return () => {
//       obs.disconnect();
//       if (timerRef.current) clearTimeout(timerRef.current);
//     };
//   }, []);

//   // ── Card 2: directly drive top position from scroll ─────────────────────
//   // This bypasses React state batching entirely to ensure the animation fires.
//   useEffect(() => {
//     const onScroll = () => {
//       const wrapper = wrapperRef.current;
//       const card2   = card2Ref.current;
//       if (!wrapper || !card2) return;

//       const rect    = wrapper.getBoundingClientRect();
//       const vh      = window.innerHeight;

//       // How many px the user has scrolled into the wrapper's scroll track.
//       // rect.top starts at 0 (section just entered viewport top),
//       // goes negative as user scrolls.
//       const scrolledIn = Math.max(0, -rect.top);
//       const trackLen   = wrapper.offsetHeight - vh; // 200vh - 100vh = 100vh

//       if (trackLen <= 0) return;

//       // progress: 0 (start) → 1 (end of track)
//       const progress = Math.min(1, scrolledIn / trackLen);

//       // Card 2 slides from +100vh to 0 as progress goes 0 → 1
//       // We start the slide at progress = 0.25 and complete at 0.75
//       const slideProgress = Math.max(0, Math.min(1, (progress - 0.25) / 0.5));

//       // translateY: from 100vh (off-screen below) to 0 (fully visible)
//       const translateY = (1 - slideProgress) * 100; // percent of its own height
//       card2.style.transform = `translateY(${translateY}%)`;
//     };

//     window.addEventListener('scroll', onScroll, { passive: true });
//     // Run on mount in case the page is already mid-scroll
//     onScroll();
//     return () => window.removeEventListener('scroll', onScroll);
//   }, []);

//   const card1Expanded = card1Phase === 'expanded';

//   return (
//     /*
//      * Outer wrapper: 200vh scroll track.
//      * Uses 100vw + negative margin to break out of any parent padding
//      * so the sticky div can render true edge-to-edge.
//      */
//     <div
//       ref={wrapperRef}
//       style={{
//         position: 'relative',
//         height: '200vh',
//         width: '100vw',
//         marginLeft: 'calc(-1 * ((100vw - 100%) / 2))',
//         backgroundColor: '#EDE7DE',
//       }}
//     >
//       {/* ── Sticky viewport ─────────────────────────────────────────────── */}
//       <div
//         style={{
//           position: 'sticky',
//           top: 0,
//           width: '100%',
//           height: '100vh',
//           backgroundColor: '#EDE7DE',
//           overflow: 'hidden',
//         }}
//       >

//         {/* ── Header: ■ VISION & MISSION ───────────────────────────────── */}
//         {/*
//          * Design at 1440px:
//          *   top: 20px → 1.39vw
//          *   left: 51px → 3.54vw
//          *   Pill: gap:7.2px, px:7.2px, br:90px, h:20px
//          *   Icon: 14×14, bg:#334454, br:3px
//          *   Text: Geist 400, 16.2px, ls:-0.32px, uppercase
//          */}
//         <div
//           style={{
//             position: 'absolute',
//             top: 'clamp(14px, 1.39vw, 24px)',
//             left: 'clamp(28px, 3.54vw, 64px)',
//             zIndex: 30,
//             display: 'inline-flex',
//             alignItems: 'center',
//             gap: 'clamp(4px, 0.5vw, 7.2px)',
//             height: 'clamp(16px, 1.39vw, 20px)',
//           }}
//         >
//           <div
//             style={{
//               width: 'clamp(10px, 0.97vw, 14px)',
//               height: 'clamp(10px, 0.97vw, 14px)',
//               backgroundColor: '#334454',
//               borderRadius: '3px',
//               flexShrink: 0,
//             }}
//           />
//           <span
//             style={{
//               fontFamily: "var(--font-geist,'Geist'),system-ui,sans-serif",
//               fontWeight: 400,
//               fontSize: 'clamp(11px, 1.125vw, 16.2px)',
//               lineHeight: '19.44px',
//               letterSpacing: '-0.32px',
//               textTransform: 'uppercase',
//               color: '#1A1A1A',
//               whiteSpace: 'nowrap',
//             }}
//           >
//             Vision &amp; Mission
//           </span>
//         </div>

//         {/* ── Card 1 — Vision ─────────────────────────────────────────────
//          * Initial  : inset from all four edges (matches Figma "before expand")
//          *   top ~44px, left ~52px, width & height reduced
//          * Expanded : full-bleed (top:0, left:0, w:100%, h:100%)
//          * Uses CSS transition on all positional properties.
//          */}
//         <div
//           ref={card1Ref}
//           style={{
//             position: 'absolute',
//             top:    card1Expanded ? '0' : 'clamp(40px, 3.06vw, 44px)',
//             left:   card1Expanded ? '0' : 'clamp(20px, 3.61vw, 52px)',
//             width:  card1Expanded ? '100%' : 'calc(100% - clamp(40px, 7.22vw, 104px))',
//             height: card1Expanded ? '100%' : 'calc(100% - clamp(50px, 4.17vw, 60px))',
//             zIndex: 10,
//             overflow: 'hidden',
//             borderRadius: card1Expanded ? '0px' : '8px',
//             transition: [
//               'top    0.9s cubic-bezier(0.22,1,0.36,1)',
//               'left   0.9s cubic-bezier(0.22,1,0.36,1)',
//               'width  0.9s cubic-bezier(0.22,1,0.36,1)',
//               'height 0.9s cubic-bezier(0.22,1,0.36,1)',
//               'border-radius 0.9s ease',
//             ].join(', '),
//           }}
//         >
//           <Image
//             src={cards[0].image}
//             alt={cards[0].label}
//             fill
//             style={{ objectFit: 'cover', objectPosition: 'center' }}
//             priority
//           />
//           <Overlay />
//           <CardTexts card={cards[0]} />
//         </div>

//         {/* ── Card 2 — Mission ────────────────────────────────────────────
//          * Starts off-screen at translateY(100%) (below the sticky div).
//          * The scroll handler moves it up by directly setting transform.
//          * Using transform: translateY instead of top/bottom for GPU acceleration.
//          */}
//         <div
//           ref={card2Ref}
//           style={{
//             position: 'absolute',
//             top: '0',
//             left: '0',
//             width: '100%',
//             height: '100%',
//             zIndex: 15,
//             overflow: 'hidden',
//             borderRadius: '0px',
//             transform: 'translateY(100%)', // initial: hidden below
//             /* No CSS transition — scroll handler drives this via direct style */
//             willChange: 'transform',
//           }}
//         >
//           <Image
//             src={cards[1].image}
//             alt={cards[1].label}
//             fill
//             style={{ objectFit: 'cover', objectPosition: 'center' }}
//             priority
//           />
//           <Overlay />
//           <CardTexts card={cards[1]} />
//         </div>

//       </div>
//     </div>
//   );
// }

// // ─── Gradient overlay ────────────────────────────────────────────────────────
// function Overlay() {
//   return (
//     <div
//       style={{
//         position: 'absolute',
//         inset: 0,
//         background: 'linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.15) 55%, transparent 100%)',
//         zIndex: 1,
//         pointerEvents: 'none',
//       }}
//     />
//   );
// }

// // ─── CardTexts ───────────────────────────────────────────────────────────────
// /**
//  * Overlay texts using %-based positions relative to the expanded card.
//  *
//  * Baseline (1440 × 581.95 card):
//  *   Heading : top 313.1 / 581.95 = 53.80%, left  35.1 / 1440 = 2.44%
//  *   Body    : top 328.92 / 581.95 = 56.52%, left 912.78 / 1440 = 63.34%
//  *   Divider : top 451.69 / 581.95 = 77.61%, left  29.5 / 1440 = 2.05%
//  *   Label   : top 467.54 / 581.95 = 80.34%, left  39.88 / 1440 = 2.77%
//  *
//  * Card fills 100% of its container, so % positions scale automatically.
//  */
// function CardTexts({ card }) {
//   return (
//     <>
//       {/* Heading */}
//       <div
//         style={{
//           position: 'absolute',
//           top: '53.80%',
//           left: '2.44%',
//           width: 'clamp(200px, 40.94vw, 590px)',
//           zIndex: 2,
//         }}
//       >
//         <h2
//           style={{
//             fontFamily: "var(--font-roundo,'Roundo'),system-ui,sans-serif",
//             fontWeight: 500,
//             fontSize: 'clamp(22px, 3.845vw, 55.38px)',
//             lineHeight: 1.1,
//             letterSpacing: 'clamp(-1.5px, -0.196vw, -2.82px)',
//             color: '#FFFFFF',
//             margin: 0,
//           }}
//         >
//           {card.heading}
//         </h2>
//       </div>

//       {/* Body text */}
//       <div
//         style={{
//           position: 'absolute',
//           top: '56.52%',
//           left: '63.34%',
//           width: 'clamp(160px, 26.62vw, 384px)',
//           zIndex: 2,
//         }}
//       >
//         <p
//           style={{
//             fontFamily: "var(--font-geist,'Geist'),system-ui,sans-serif",
//             fontWeight: 400,
//             fontSize: 'clamp(11px, 1.281vw, 18.46px)',
//             lineHeight: 1.09,
//             letterSpacing: '-0.4px',
//             color: '#FFFFFF',
//             margin: 0,
//           }}
//         >
//           {card.body}
//         </p>
//       </div>

//       {/* Horizontal divider */}
//       <div
//         style={{
//           position: 'absolute',
//           top: '77.61%',
//           left: '2.05%',
//           width: '95.9%',
//           height: 0,
//           borderTop: '0.92px solid rgba(255,255,255,0.8)',
//           zIndex: 2,
//         }}
//       />

//       {/* Card label ("VISION" / "MISSION") */}
//       <div style={{ position: 'absolute', top: '80.34%', left: '2.77%', zIndex: 2 }}>
//         <span
//           style={{
//             fontFamily: "var(--font-geist,'Geist'),system-ui,sans-serif",
//             fontWeight: 400,
//             fontSize: 'clamp(10px, 1.038vw, 14.95px)',
//             lineHeight: 1.2,
//             letterSpacing: '-0.3px',
//             color: '#FFFFFF',
//             textTransform: 'uppercase',
//           }}
//         >
//           {card.label}
//         </span>
//       </div>
//     </>
//   );
// }


// ----------------------------------------

'use client';

import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';

// ─── Card data ─────────────────────────────────────────────────────────────
const cards = [
  {
    label: 'Vision',
    image: '/dummyimages/d18115bcf5e039e1b2d60bfa8c4e93e2c4b1ea1f.png',
    heading: 'Each project tells its own story of\u00a0precision.',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim.it, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim.',
  },
  {
    label: 'Mission',
    image: '/dummyimages\d18115bcf5e039e1b2d60bfa8c4e93e2c4b1ea1f.png',
    heading: 'Each project tells its own story of\u00a0precision.',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim.it, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim.',
  },
];

/**
 * AboutVisionMissionSection
 *
 * Breakpoint scale (from CSS vars):
 *   sm  : 640px
 *   md  : 768px
 *   lg  : 1024px
 *   xl  : 1280px
 *   2xl : 1536px
 *   3xl : 1440px  ← design baseline
 *   4xl : 1920px
 *
 * All clamp() values follow: clamp(mobile-min, fluid-vw, desktop-max)
 * Fluid midpoint is derived from (design-value / 1440) * 100vw.
 */
export default function AboutVisionMissionSection() {
  const wrapperRef = useRef(null);
  const card1Ref = useRef(null);
  const card2Ref = useRef(null);
  const [card1Phase, setCard1Phase] = useState('initial'); // 'initial' | 'expanded'
  const hasAutoExpanded = useRef(false);
  const timerRef = useRef(null);

  // ── Card 1: auto-expand after 2 s ──────────────────────────────────────
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAutoExpanded.current) {
          hasAutoExpanded.current = true;
          timerRef.current = setTimeout(() => setCard1Phase('expanded'), 2000);
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);

    return () => {
      obs.disconnect();
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  // ── Card 2: directly drive translateY from scroll ────────────────────────
  useEffect(() => {
    const onScroll = () => {
      const wrapper = wrapperRef.current;
      const card2 = card2Ref.current;
      if (!wrapper || !card2) return;

      const rect = wrapper.getBoundingClientRect();
      const vh = window.innerHeight;
      const scrolledIn = Math.max(0, -rect.top);
      const trackLen = wrapper.offsetHeight - vh; // 200vh - 100vh = 100vh

      if (trackLen <= 0) return;

      const progress = Math.min(1, scrolledIn / trackLen);
      // Slide starts at progress=0.25, completes at progress=0.75
      const slideProgress = Math.max(0, Math.min(1, (progress - 0.25) / 0.5));
      const translateY = (1 - slideProgress) * 100;
      card2.style.transform = `translateY(${translateY}%)`;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const card1Expanded = card1Phase === 'expanded';

  return (
    /**
     * Outer wrapper: 200vh scroll track, full-bleed breakout.
     * negative margin trick keeps it edge-to-edge inside any padded parent.
     */
    <div
      ref={wrapperRef}
      style={{
        position: 'relative',
        height: '200vh',
        width: '100vw',
        marginLeft: 'calc(-1 * ((100vw - 100%) / 2))',
        backgroundColor: '#EDE7DE',
      }}
    >
      {/* ── Sticky viewport ─────────────────────────────────────────────── */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          width: '100%',
          height: '100vh',
          backgroundColor: '#EDE7DE',
          overflow: 'hidden',
        }}
      >

        {/* ── Header pill: ■ VISION & MISSION ─────────────────────────────
         *
         * Design baseline (1440px):
         *   top  : 20px  → 20/1440 = 1.389vw  → clamp(12px, 1.39vw, 24px)
         *   left : 51px  → 51/1440 = 3.542vw  → clamp(16px, 3.54vw, 56px)
         *   icon : 14px  → 14/1440 = 0.972vw  → clamp(10px, 0.97vw, 14px)
         *   gap  : 7.2px → 7.2/1440 = 0.5vw   → clamp(4px, 0.5vw, 8px)
         *   font : 16.2px → 16.2/1440 = 1.125vw→ clamp(11px, 1.125vw, 16.2px)
         *
         * Mobile (≤640px): tighter top/left so it doesn't crowd the card edge.
         */}
        <div
          style={{
            position: 'absolute',
            top: 'clamp(12px, 1.39vw, 24px)',
            left: 'clamp(16px, 3.54vw, 56px)',
            zIndex: 30,
            display: 'inline-flex',
            alignItems: 'center',
            gap: 'clamp(4px, 0.5vw, 8px)',
            height: 'clamp(16px, 1.39vw, 20px)',
          }}
        >
          {/* Square icon */}
          <div
            style={{
              width: 'clamp(10px, 0.97vw, 14px)',
              height: 'clamp(10px, 0.97vw, 14px)',
              backgroundColor: '#334454',
              borderRadius: '3px',
              flexShrink: 0,
            }}
          />
          {/* Label */}
          <span
            style={{
              fontFamily: "var(--font-geist,'Geist'),system-ui,sans-serif",
              fontWeight: 400,
              /*
               * 16.2px at 1440px → 1.125vw
               * Floor 11px (mobile), ceiling 16.2px (1440+)
               */
              fontSize: 'clamp(11px, 1.125vw, 16.2px)',
              lineHeight: 1.2,
              letterSpacing: '-0.32px',
              textTransform: 'uppercase',
              color: '#1A1A1A',
              whiteSpace: 'nowrap',
            }}
          >
            Vision &amp; Mission
          </span>
        </div>

        {/* ── Card 1 — Vision ─────────────────────────────────────────────
         *
         * All values converted from Figma 1440px baseline → vw units.
         *
         * INITIAL (inset / before expand):
         *   top  : -42.96px → -(42.96/1440)*100 = -2.983vw
         *   left : -52.04px → -(52.04/1440)*100 = -3.614vw
         *   w    : 1339.08px → (1339.08/1440)*100 = 92.99vw
         *   h    : 540.79px  → (540.79/1440)*100  = 37.55vw
         *
         * EXPANDED (full-bleed, matches Figma expanded spec):
         *   top  : -46.23px → -(46.23/1440)*100 = -3.21vw
         *   left : -56px    → -(56/1440)*100    = -3.889vw
         *   w    : 1441px   → (1441/1440)*100   = 100.069vw
         *   h    : 581.95px → (581.95/1440)*100 = 40.41vw
         */}
        <div
          ref={card1Ref}
          style={{
            position: 'absolute',
            top: card1Expanded ? '4vw' : '8.983vw',
            left: card1Expanded ? '0vw' : '5vw',
            width: card1Expanded ? '100.069vw' : '90vw',
            height: card1Expanded ? '43.41vw' : '40.55vw',
            zIndex: 10,
            overflow: 'hidden',
            borderRadius: card1Expanded ? '0px' : 'clamp(4px, 0.56vw, 8px)',
            transition: [
              'top           1.5s cubic-bezier(0.22,1,0.36,1)',
              'left          1.5s cubic-bezier(0.22,1,0.36,1)',
              'width         1.5s cubic-bezier(0.22,1,0.36,1)',
              'height        1.5s cubic-bezier(0.22,1,0.36,1)',
              'border-radius 1.5s ease',
            ].join(', ')
          }}
        >
          <Image
            src={cards[0].image}
            alt={cards[0].label}
            fill
            style={{ objectFit: 'cover', objectPosition: 'center' }}
            priority
          />
          <Overlay />
          <CardTexts card={cards[0]} showTexts={card1Expanded} />
        </div>

        {/* ── Card 2 — Mission ────────────────────────────────────────────
         * Full-bleed; translateY driven by scroll handler (no React state).
         * willChange: 'transform' → GPU-composited layer for smooth animation.
         */}
        <div
          ref={card2Ref}
          style={{
            position: 'absolute',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            zIndex: 15,
            overflow: 'hidden',
            borderRadius: '0px',
            transform: 'translateY(100%)',
            willChange: 'transform',
          }}
        >
          <Image
            src={cards[1].image}
            alt={cards[1].label}
            fill
            style={{ objectFit: 'cover', objectPosition: 'center' }}
            priority
          />
          <Overlay />
          <CardTexts card={cards[1]} showTexts={true} />
        </div>

      </div>
    </div>
  );
}

// ─── Gradient overlay ────────────────────────────────────────────────────────
function Overlay() {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background:
          'linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.15) 55%, transparent 100%)',
        zIndex: 1,
        pointerEvents: 'none',
      }}
    />
  );
}

// ─── CardTexts ───────────────────────────────────────────────────────────────
/**
 * Text overlays for each card.
 *
 * Props:
 *   card       – { label, heading, body }
 *   showTexts  – boolean; when false the texts are opacity:0 and slightly
 *                translated down. Set to true to fade them in.
 *                Card 1 drives this from card1Expanded state.
 *                Card 2 always passes true.
 *
 * All positions are % of the card container (intrinsically fluid).
 * Baseline: 1440 × 581.95 px
 *
 *   Heading : top 53.80%, left 2.44%
 *   Body    : top 56.52%, left 63.34%
 *   Divider : top 77.61%, left 2.05%
 *   Label   : top 80.34%, left 2.77%
 */
function CardTexts({ card, showTexts }) {
  return (
    <>
      {/* Responsive body-column styles */}
      <style>{`
        .vm-body-text {
          position: absolute;
          top: 56.52%;
          left: 63.34%;
          width: clamp(140px, 26.67vw, 384px);
          z-index: 2;
        }
        @media (max-width: 640px) {
          .vm-body-text {
            top: 67%;
            left: 2.44%;
            width: 88%;
          }
        }
        @media (min-width: 641px) and (max-width: 1024px) {
          .vm-body-text {
            left: 55%;
            width: clamp(140px, 38vw, 320px);
          }
        }
      `}</style>

      {/*
       * Single wrapper drives ALL text visibility.
       * When showTexts = false  → opacity:0, translateY(12px)  (hidden below)
       * When showTexts = true   → opacity:1, translateY(0)     (fully visible)
       *
       * transitionDelay:0.6s lets the card expansion animation start first,
       * then the text fades in over 0.5s.
       */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 2,
          opacity: showTexts ? 1 : 0,
          transform: showTexts ? 'translateY(0)' : 'translateY(12px)',
          transition: [
            'opacity   0.5s ease',
            'transform 0.5s cubic-bezier(0.22,1,0.36,1)',
          ].join(', '),
          transitionDelay: showTexts ? '0.6s' : '0s',
          pointerEvents: 'none',
        }}
      >
        {/* Heading */}
        <div
          style={{
            position: 'absolute',
            top: '53.80%',
            left: '2.44%',
            width: 'clamp(180px, 40.97vw, 590px)',
            zIndex: 2,
          }}
        >
          <h2
            style={{
              fontFamily: "var(--font-roundo,'Roundo'),system-ui,sans-serif",
              fontWeight: 500,
              fontSize: 'clamp(20px, 3.845vw, 56px)',
              lineHeight: 1.1,
              letterSpacing: 'clamp(-2.82px, -0.196vw, -1px)',
              color: '#FFFFFF',
              margin: 0,
            }}
          >
            {card.heading}
          </h2>
        </div>

        {/* Body text */}
        <div className="vm-body-text">
          <p
            style={{
              fontFamily: "var(--font-geist,'Geist'),system-ui,sans-serif",
              fontWeight: 400,
              fontSize: 'clamp(12px, 1.281vw, 18.46px)',
              lineHeight: 1.35,
              letterSpacing: '-0.4px',
              color: '#FFFFFF',
              margin: 0,
            }}
          >
            {card.body}
          </p>
        </div>

        {/* Horizontal divider */}
        <div
          style={{
            position: 'absolute',
            top: '77.61%',
            left: '2.05%',
            width: '95.9%',
            height: 0,
            borderTop: '0.92px solid rgba(255,255,255,0.8)',
            zIndex: 2,
          }}
        />

        {/* Card label ("VISION" / "MISSION") */}
        <div
          style={{
            position: 'absolute',
            top: '80.34%',
            left: '2.77%',
            zIndex: 2,
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-geist,'Geist'),system-ui,sans-serif",
              fontWeight: 400,
              fontSize: 'clamp(10px, 1.038vw, 15px)',
              lineHeight: 1.2,
              letterSpacing: '-0.3px',
              color: '#FFFFFF',
              textTransform: 'uppercase',
            }}
          >
            {card.label}
          </span>
        </div>
      </div>
    </>
  );
}
