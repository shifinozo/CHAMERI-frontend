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
  const rafRef = useRef(null);
  const lastTop = useRef(-1);
  const [progress, setProgress] = useState(0);

  const calcProgress = useCallback(() => {
    const el = sectionRef.current;
    if (!el) return;
    const { top } = el.getBoundingClientRect();
    const scrolled = -top;
    
    // The scrollable track is 400vh long. 
    // We want progress to go from 0 to 1 over the 400vh.
    const trackLength = window.innerHeight * 4;
    setProgress(clamp(trackLength > 0 ? scrolled / trackLength : 0, 0, 1));
  }, []);

  const rafLoop = useCallback(() => {
    const el = sectionRef.current;
    if (el) {
      const { top } = el.getBoundingClientRect();
      if (top !== lastTop.current) { lastTop.current = top; calcProgress(); }
    }
    rafRef.current = requestAnimationFrame(rafLoop);
  }, [calcProgress]);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(rafLoop);
    const opts = { passive: true };
    window.addEventListener("scroll", calcProgress, opts);
    document.addEventListener("scroll", calcProgress, opts);
    calcProgress();
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("scroll", calcProgress);
      document.removeEventListener("scroll", calcProgress);
    };
  }, [calcProgress, rafLoop]);

  // ── Derived values ────────────────────────────────────────────────────────────
  const pct = Math.round(progress * 100);

  // Animation phases
  const phase1T = easeOutCubic(mapRange(progress, 0, 0.5, 0, 1));
  const phase2T = easeInOutCubic(mapRange(progress, 0.5, 0.85, 0, 1));

  // 1. Logo Scale & Position
  const vw = typeof window !== "undefined" ? window.innerWidth : 1440;
  const scaleStart = 0.5;
  const scaleMax = 1.0; 
  // Calculate exact scale to fit the 117.08px logo slot dynamically based on screen width
  const calculatedNavbarScale = 117.08 / ((600 / 1440) * vw);
  const scaleNavbar = Math.min(calculatedNavbarScale, 1.0);

  const groupScale = progress <= 0.5 
    ? scaleStart + phase1T * (scaleMax - scaleStart)
    : scaleMax - phase2T * (scaleMax - scaleNavbar);

  // Figma precise native center
  const figmaCenterY = (450.26 / 1440) * vw;
  const navbarCenterY = 48.19; // padding-top 14px + inner h-[68.38px]/2 = 48.19px
  const driftToNavbar = navbarCenterY - figmaCenterY;
  const driftStart = 50; // starts 50px lower

  const groupY = progress <= 0.5
    ? driftStart * (1 - phase1T) // goes from 50 to 0 at 50%
    : phase2T * driftToNavbar;   // goes from 0 to navbar at 85%

  // 2. Waves
  const waveOpacity = easeInOutCubic(mapRange(progress, 0.1, 0.6, 0, 1));
  const waveDrift = mapRange(progress, 0.1, 0.85, 20, -20);

  // 3. Heading text ("Premium residence...") fades in
  // Start fading in as the logo moves up to navbar (progress 0.5 to 0.75)
  const textOpacity = easeOutQuart(mapRange(progress, 0.5, 0.75, 0, 1));
  const textTranslateY = mapRange(progress, 0.5, 0.75, 40, 0);

  // 4. Background overlay fades out at the very end
  const overlayOpacity = easeInOutCubic(mapRange(progress, 0.75, 1.0, 1, 0));

  // 5. Navbar and other elements
  const navOpacity = easeOutCubic(mapRange(progress, 0.8, 1.0, 0, 1));
  const otherElementsOpacity = easeOutCubic(mapRange(progress, 0.85, 1.0, 0, 1));

  // 6. Percentage Counter
  const counterOpacity = progress < 0.95 ? 1 : mapRange(progress, 0.95, 1.0, 1, 0);

  return (
    <section
      id="hero"
      ref={sectionRef}
      // Height is 400vh (the scroll track) + the space needed for the original aspect ratio to unstick correctly.
      // 1110/1440 * 100vw is the natural height of the original hero section.
      className="relative w-full z-0 overflow-visible"
      style={{ height: "calc(400vh + 100vw * 1110 / 1440)" }}
    >
      {/* ── Sticky container ───────────────────────────────────────────────────── */}
      {/* It holds the animated content and sticks to the top while scrolling down */}
      <div className="sticky top-0 left-0 w-full aspect-[1440/1110] overflow-hidden pointer-events-none">
        
        {/* Layer 1: dark intro overlay (fades out at end) */}
        <div
          className="absolute inset-0 z-1"
          style={{
            opacity: overlayOpacity,
            background: "#2A3A4A",
          }}
        />

        {/* Layer 2: Vector Image Background */}
        <svg
          viewBox="0 0 1440 1110"
          preserveAspectRatio="xMidYMid slice"
          className="absolute inset-0 w-full h-full z-2"
          style={{
            opacity: overlayOpacity, // Fades out with the background overlay
            transform: `translateY(${waveDrift}px)`,
          }}
        >
          <image href="/icons/Vector (1).svg" x="-15.98" y="-110" width="1453.91" height="313.69" />
          <image href="/icons/Vector (2).svg" x="-16" y="53.02" width="1455.59" height="482.03" />
          <image href="/icons/Vector (3).svg" x="-16" y="382.24" width="1456" height="482.43" />
          <image href="/icons/Vector (4).svg" x="658.34" y="711.44" width="781.16" height="298.4" />
        </svg>

        {/* Layer 3: The Animated Logo Group */}
        <div
          className="absolute z-30 flex flex-col items-center"
          style={{
            left: "50%",
            top: `${(450.26 / 1440) * 100}vw`,
            gap: `${(31.09 / 1440) * 100}vw`,
            transform: `translate(-50%, -50%) translateY(${groupY}px) scale(${groupScale})`,
            transformOrigin: "center center",
          }}
        >
          <div style={{ position: "relative", width: `${(201.61 / 1440) * 100}vw`, height: `${(226.03 / 1440) * 100}vw` }}>
            <Image src="/icons/logo (3).svg" alt="Chameri mark" fill sizes="400px" style={{ objectFit: "contain" }} priority />
          </div>
          <div style={{ position: "relative", width: `${(600 / 1440) * 100}vw`, height: `${(76.4 / 1440) * 100}vw` }}>
            <Image src="/icons/logo (5).svg" alt="CHAMERI" fill sizes="800px" style={{ objectFit: "contain" }} priority />
          </div>
        </div>

        {/* Layer 4: Navbar Header Layer (Menu, Contact) */}
        <Navbar opacity={navOpacity} />

        {/* Layer 5: Hero Headline */}
        <div 
          className="absolute inset-0 z-20 pointer-events-none"
          style={{ 
            opacity: textOpacity, 
            transform: `translateY(${textTranslateY}px)`,
          }}
        >
          <p className="absolute font-roundo font-medium text-white text-center whitespace-nowrap top-[54.2766%] left-[22.8819%] w-[54.1667%] text-[clamp(28px,4.2vw,60.41px)] leading-[64.08px] tracking-[-1.92px]">
            Premium residence for those
          </p>
          <p className="absolute font-roundo font-medium text-white text-center whitespace-nowrap top-[60.0910%] left-[28.7632%] w-[42.4306%] text-[clamp(28px,4.16vw,59.86px)] leading-[64.08px] tracking-[-1.92px]">
            who seek refined living.
          </p>
        </div>

        {/* Layer 6: Other Hero Elements */}
        <div 
          className="absolute inset-0 z-20 pointer-events-auto"
          style={{ opacity: otherElementsOpacity }}
        >
          <div className="absolute h-[1px] bg-white/45 top-[78.0180%] left-[46.6667%] w-[48.6806%]" />
          <p className="absolute font-sans font-semibold text-white text-center uppercase whitespace-nowrap top-[79.6739%] left-[46.8604%] w-[11.8056%] text-[clamp(10px,0.97vw,14px)] leading-[16.38px] tracking-[1.26px]">
            Your Villa Partner
          </p>
          <p className="absolute font-sans font-normal text-white/85 top-[78.0180%] left-[76.3889%] w-[17.7778%] text-[clamp(11px,1.07vw,15.4px)] leading-[21px] tracking-normal">
            We design and install bespoke glass systems for ambitious architectural
            projects. Every pane reflects our commitment to clarity, quality, and
            collaboration.
          </p>
        </div>

        {/* Layer 7: Percentage Counter */}
        <div
          className="absolute z-15 flex items-center justify-end"
          style={{
            top: "85vh",
            right: "6vw",
            opacity: counterOpacity,
          }}
        >
          <span className="font-outfit font-light text-[clamp(34px,3.8vw,52px)] text-white/90 tracking-[-1px] leading-none tabular-nums">
            {pct}%
          </span>
        </div>

      </div>
    </section>
  );
}
