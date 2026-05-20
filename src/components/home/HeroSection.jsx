"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import Navbar from "../common/Navbar";

// ─── Easing helpers ────────────────────────────────────────────────────────────
const clamp = (v, min, max) => Math.min(Math.max(v, min), max);

const mapRange = (value, inMin, inMax, outMin, outMax) => {
  const t = clamp((value - inMin) / (inMax - inMin), 0, 1);
  return outMin + t * (outMax - outMin);
};

const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
const easeInOutCubic = (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);

export default function HeroSection() {
  const sectionRef = useRef(null);
  
  const [progress, setProgress] = useState(0);
  const [animState, setAnimState] = useState("intro"); // "intro", "waiting", "outro", "done"

  // 1. Intro Animation Effect (0 to 60% automatically on mount)
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    document.body.style.overflow = "hidden";

    let start;
    const duration = 2500; 

    const step = (timestamp) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const t = clamp(elapsed / duration, 0, 1);
      
      const easedT = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      setProgress(easedT * 0.6); 

      if (t < 1.0) {
        requestAnimationFrame(step);
      } else {
        setAnimState("waiting");
      }
    };

    requestAnimationFrame(step);

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // 2. Outro Animation (60 to 100% on click)
  const handleClick = () => {
    if (animState !== "waiting") return;
    setAnimState("outro");

    let start;
    const duration = 2800; // 2.8 seconds for super smooth, majestic zoom

    const step = (timestamp) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const t = clamp(elapsed / duration, 0, 1);
      
      const easedT = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      setProgress(0.6 + easedT * 0.4); 

      if (t < 1.0) {
        requestAnimationFrame(step);
      } else {
        setAnimState("done");
        document.body.style.overflow = ""; // Unlock scroll!
      }
    };

    requestAnimationFrame(step);
  };

  // ── Derived values ────────────────────────────────────────────────────────────
  const pct = Math.round(progress * 100);

  // Animation phases
  // Phase 1 (0.00 - 0.40): Logo scales UP. (Solid blue screen)
  const phase1T = easeOutCubic(mapRange(progress, 0.0, 0.4, 0, 1));
  // Phase 2 (0.40 - 0.60): Beige screen slides up from bottom to 140px. Logo moves up and scales down.
  const phase2T = easeInOutCubic(mapRange(progress, 0.4, 0.6, 0, 1));
  // Phase 3 (0.60 - 1.00): House scales smoothly across the entire outro duration.
  const phase3T = mapRange(progress, 0.6, 1.0, 0, 1); // Linear interpolation, inherits the smooth easedT from handleClick!
  // Phase 4 (0.80 - 1.00): Text fades in.
  const phase4T = easeOutCubic(mapRange(progress, 0.80, 1.0, 0, 1));

  // 1. Logo Morph
  const vw = typeof window !== "undefined" ? window.innerWidth : 1440;
  const vh = typeof window !== "undefined" ? window.innerHeight : 1110;
  const effectiveVw = clamp(vw, 320, 1440);
  
  const scaleCenter = effectiveVw / 1440; 
  const scaleNavbar = 117.08 / 600;

  // Instead of scaling the group up from 0 to 40%, we hold it at scaleCenter,
  // and animate the intrinsic widths and heights below to handle the different aspect ratio changes.
  const groupScale = progress <= 0.4 
    ? scaleCenter
    : scaleCenter - phase2T * (scaleCenter - scaleNavbar);

  // Interpolate intrinsic sizes from State 0 (140px width) to State 1 (Max zoom)
  const markWidth = 140 + phase1T * (201.61 - 140);
  const markHeight = 156.95 + phase1T * (226.03 - 156.95);
  
  const textWidth = 140 + phase1T * (600 - 140);
  const textHeight = 17.82 + phase1T * (76.39 - 17.82);
  
  const logoGap = 11.31 + phase1T * (31.09 - 11.31);

  const figmaCenterY = vh * 0.4056;
  const navbarCenterY = 48.19; 
  const driftToNavbar = navbarCenterY - figmaCenterY;
  const driftStart = vh * 0.05;

  const groupY = progress <= 0.4
    ? driftStart * (1 - phase1T)
    : phase2T * driftToNavbar;

  // 2. The Beige Curtain & House Scale
  // The dark blue background is static. The beige background slides UP to cover it.
  let beigeClipTopPx = vh; 
  if (progress > 0.4 && progress <= 0.6) {
    beigeClipTopPx = vh - phase2T * (vh - 140);
  } else if (progress > 0.6) {
    beigeClipTopPx = 140 - phase3T * 140;
  }
  const beigeClipPath = `inset(${beigeClipTopPx}px 0 0 0)`;

  // House image scales UP from 0.5 to 1.0 during Phase 3
  const bgScale = 0.5 + phase3T * 0.5;

  // Waves gently drift
  const waveDrift = mapRange(progress, 0.0, 0.6, 20, -20);

  // 3. Staggered Content Reveal
  const head1T = easeOutQuart(mapRange(progress, 0.78, 0.90, 0, 1));
  const head2T = easeOutQuart(mapRange(progress, 0.81, 0.92, 0, 1));
  const lineT = easeOutQuart(mapRange(progress, 0.84, 0.94, 0, 1));
  const sub1T = easeOutQuart(mapRange(progress, 0.87, 0.96, 0, 1));
  const sub2T = easeOutQuart(mapRange(progress, 0.90, 0.98, 0, 1));
  
  // Navbar elements fade in while the beige curtain covers the blue bar (Phase 3)
  const navOpacity = phase3T;

  // Percentage Counter fades out at the very end
  const counterOpacity = progress < 0.95 ? 1 : mapRange(progress, 0.95, 1.0, 1, 0);

  return (
    <>
      {/* ── Sticky Background (House Image) ───────────────────────────────────── */}
      <div 
        className="sticky top-0 left-0 w-full h-screen overflow-hidden pointer-events-none -z-10" 
      >
        
        {/* Layer 0: Static Dark Blue Background & Waves */}
        <div className="absolute inset-0 w-full h-full -z-30 overflow-hidden pointer-events-none bg-[#2A3A4A]">
          <svg
            viewBox="0 0 1440 1110"
            preserveAspectRatio="xMidYMid slice"
            className="absolute inset-0 w-full h-full opacity-50"
            style={{ transform: `translateY(${waveDrift}px)` }}
          >
            <image href="/icons/Vector (1).svg" x="-15.98" y="-110" width="1453.91" height="313.69" />
            <image href="/icons/Vector (2).svg" x="-16" y="53.02" width="1455.59" height="482.03" />
            <image href="/icons/Vector (3).svg" x="-16" y="382.24" width="1456" height="482.43" />
            <image href="/icons/Vector (4).svg" x="658.34" y="711.44" width="781.16" height="298.4" />
          </svg>
        </div>

        {/* Layer 1: Sliding Beige Curtain & House Image */}
        <div 
          className="absolute inset-0 w-full h-full -z-20 bg-[#EDE7DE]"
          style={{ clipPath: beigeClipPath, WebkitClipPath: beigeClipPath }}
        >
          {/* House Image Container scales from center bottom */}
          <div 
            className="absolute inset-0 w-full h-full origin-bottom"
            style={{ transform: `scale3d(${bgScale}, ${bgScale}, 1)`, transformOrigin: "center bottom" }}
          >
            <Image
              src="/dummyimages/Frame 2121454280.png"
              alt="Chameri villa exterior"
              fill
              sizes="100vw"
              className="object-cover object-[center_top]"
              priority
            />
          </div>
        </div>
      </div>

      {/* ── Sticky Header (Logo & Navbar) ─────────────────────────────────────── */}
      <div 
        className="sticky top-0 left-0 w-full h-screen pointer-events-none z-50 overflow-visible"
        style={{ marginTop: "-100vh" }}
      >
        <div className="absolute top-0 left-0 w-full h-screen pointer-events-none">
        {/* Layer 2: The Animated Logo Group */}
        <div
          className="absolute z-30 flex flex-col items-center"
          style={{
            left: "50%",
            top: "40.56vh",
            gap: `${logoGap}px`,
            transform: `translate(-50%, -50%) translateY(${groupY}px) scale(${groupScale})`,
            transformOrigin: "center center",
          }}
        >
          <div style={{ position: "relative", width: `${markWidth}px`, height: `${markHeight}px` }}>
            <Image src="/icons/logo (6).svg" alt="Chameri mark" fill sizes="400px" style={{ objectFit: "contain" }} priority />
          </div>
          <div style={{ position: "relative", width: `${textWidth}px`, height: `${textHeight}px` }}>
            <Image src="/icons/logo (7).svg" alt="CHAMERI" fill sizes="800px" style={{ objectFit: "contain" }} priority />
          </div>
        </div>

        </div>

        {/* Layer 3: Navbar Header Layer (Menu, Contact) */}
        <Navbar opacity={navOpacity} />
      </div>

      {/* ── Scrolling Content (Text) ────────────────────────────────────────── */}
      <section 
        id="hero"
        ref={sectionRef}
        className={`relative w-full h-screen z-20 pointer-events-auto ${animState === 'waiting' ? 'cursor-pointer' : ''}`}
        style={{ marginTop: "-100vh" }}
        onClick={handleClick}
      >
        {/* Layer 4: Staggered Hero Content */}
          {/* Heading Line 1 */}
          <p 
            className="absolute font-roundo font-medium text-white text-center whitespace-nowrap top-[54.27%] left-[22.88%] w-[54.16%] text-[clamp(28px,4.2vw,90px)] leading-[clamp(32px,4.45vw,100px)] tracking-[-0.13vw]"
            style={{ 
              opacity: head1T, 
              transform: `translateY(${40 * (1 - head1T)}px)`
            }}
          >
            Premium residence for those
          </p>
          
          {/* Heading Line 2 */}
          <p 
            className="absolute font-roundo font-medium text-white text-center whitespace-nowrap top-[60.09%] left-[28.76%] w-[42.43%] text-[clamp(28px,4.16vw,90px)] leading-[clamp(32px,4.45vw,100px)] tracking-[-0.13vw]"
            style={{ 
              opacity: head2T, 
              transform: `translateY(${40 * (1 - head2T)}px)`
            }}
          >
            who seek refined living.
          </p>

          {/* Horizontal Line Divider */}
          <div 
            className="absolute h-[1px] bg-white/45 top-[78.01%] left-[46.66%] w-[48.68%] origin-left"
            style={{ 
              transform: `scaleX(${lineT})`,
              opacity: lineT > 0 ? 1 : 0
            }}
          />

          {/* Subheading: Your Villa Partner */}
          <p 
            className="absolute font-sans font-semibold text-white text-center uppercase whitespace-nowrap top-[79.67%] left-[46.86%] w-[11.80%] text-[clamp(10px,0.97vw,24px)] leading-[clamp(12px,1.13vw,30px)] tracking-[0.08vw]"
            style={{ 
              opacity: sub1T, 
              transform: `translateY(${20 * (1 - sub1T)}px)`
            }}
          >
            Your Villa Partner
          </p>

          {/* Description Paragraph */}
          <p 
            className="absolute font-sans font-normal text-white/85 top-[78.01%] left-[76.38%] w-[17.77%] text-[clamp(11px,1.07vw,26px)] leading-[clamp(14px,1.45vw,36px)] tracking-normal"
            style={{ 
              opacity: sub2T, 
              transform: `translateY(${20 * (1 - sub2T)}px)`
            }}
          >
            We design and install bespoke glass systems for ambitious architectural
            projects. Every pane reflects our commitment to clarity, quality, and
            collaboration.
          </p>

        {/* Layer 5: Percentage Counter */}
        <div
          className="absolute z-15 flex items-center justify-end pointer-events-none"
          style={{
            top: "85vh",
            right: "6vw",
            opacity: counterOpacity,
          }}
        >
          <span className="font-outfit font-light text-[clamp(34px,3.61vw,80px)] text-white/90 tracking-[-0.06vw] leading-none tabular-nums text-[#2A3A4A]">
            {pct}%
          </span>
        </div>

      </section>
    </>
  );
}
