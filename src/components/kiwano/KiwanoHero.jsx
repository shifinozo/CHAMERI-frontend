"use client";

import { useRef, useEffect } from "react";
import { useScroll } from "framer-motion";
import NewNavbar from "../common/NewNavbar";

/**
 * KiwanoHero — smooth scroll-driven video
 *
 * Why lerp-in-rAF beats useSpring for video scrubbing
 * ──────────────────────────────────────────────────────
 * useSpring fires only when its value changes — if the user scrolls slowly
 * the spring settles and stops firing, leaving gaps between seeks.
 * A continuous requestAnimationFrame loop fires on *every* paint frame
 * (60 / 120 Hz) so video.currentTime is always moving toward the target
 * with no gaps. This is identical to what GSAP ScrollTrigger `scrub` does
 * internally.
 *
 * Lerp formula (runs every frame):
 *   smooth += (target - smooth) × FACTOR
 *
 * FACTOR = 0.06 → ~300 ms catch-up (cinematic, floaty)
 * FACTOR = 0.10 → ~180 ms catch-up (balanced)
 * FACTOR = 0.14 → ~120 ms catch-up (snappy)
 */

const LERP_FACTOR = 0.08;

const clamp     = (v, lo, hi) => Math.min(Math.max(v, lo), hi);
const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

export default function KiwanoHero({ hero }) {
  const wrapperRef = useRef(null);
  const videoRef   = useRef(null);
  const textRef    = useRef(null);

  // useScroll only to get the MotionValue — we read it imperatively inside rAF
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });

  // ── Continuous lerp loop ──────────────────────────────────────────────────
  useEffect(() => {
    const video  = videoRef.current;
    const textEl = textRef.current;
    if (!video) return;

    let smooth = 0; // lerped progress, starts at 0
    let rafId;

    function loop() {
      // 1. Read the instant scroll progress (no React, no state — just a number)
      const raw = scrollYProgress.get();

      // 2. Lerp smoothed value toward raw — this is the easing
      smooth += (raw - smooth) * LERP_FACTOR;

      // 3. Scrub video — skip if delta is sub-millisecond (avoids decoder thrash)
      if (video.duration && !isNaN(video.duration)) {
        const t = clamp(smooth * video.duration, 0, video.duration);
        if (Math.abs(video.currentTime - t) > 0.0008) {
          video.currentTime = t;
        }
      }

      // 4. Drive text overlay imperatively (no React re-render)
      if (textEl) {
        const tp      = clamp((smooth - 0.8) / 0.15, 0, 1);
        const opacity = easeOutCubic(tp);
        const ty      = (1 - opacity) * 28;
        textEl.style.opacity   = opacity;
        textEl.style.transform = `translateY(${ty}px)`;
      }

      rafId = requestAnimationFrame(loop);
    }

    rafId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafId);
  }, [scrollYProgress]);

  // Keep video paused — currentTime scrubbing is our only playback control
  const handleReady = (e) => {
    e.currentTarget.pause();
    e.currentTarget.currentTime = 0;
  };

  return (
    <>
      {/* ── Navbar ──────────────────────────────────────────────────────── */}
      <NewNavbar />

      {/*
       * SCROLL WRAPPER — 300vh gives scroll travel while sticky child stays
       * pinned. Scroll 0 → 100% maps the video from first → last frame.
       */}
      <div
        ref={wrapperRef}
        style={{ position: "relative", width: "100%", height: "300vh" }}
      >
        {/* ── STICKY VISUAL ───────────────────────────────────────────── */}
        <div
          style={{
            position: "sticky",
            top:      0,
            width:    "100%",
            height:   "100vh",
            overflow: "hidden",
          }}
        >
          {/* Dark tint overlay */}
          <div
            style={{
              position:      "absolute",
              inset:         0,
              background:    "rgba(0,0,0,0.2)",
              zIndex:        1,
              pointerEvents: "none",
            }}
          />

          {/* ── VIDEO ─────────────────────────────────────────────────── */}
          <video
            ref={videoRef}
            src={hero?.video || "/videos/kiwano-hero.mp4"}
            muted
            playsInline
            preload="auto"
            loop={false}
            onLoadedMetadata={handleReady}
            onCanPlay={(e) => e.currentTarget.pause()}
            style={{
              position:  "absolute",
              inset:     0,
              width:     "100%",
              height:    "100%",
              objectFit: "cover",
              zIndex:    0,
            }}
          />

          {/*
           * ── TEXT OVERLAY ──────────────────────────────────────────
           * Starts invisible (opacity 0, shifted down 28 px).
           * The rAF loop writes opacity + transform directly to the
           * element's style — zero React re-renders, zero layout cost.
           * will-change promotes this div to its own GPU layer so
           * opacity / translateY are purely compositor operations.
           */}
          <div
            ref={textRef}
            style={{
              position:       "absolute",
              top:            "42.70%",
              left:           "26.78%",
              width:          "clamp(280px, 50.37vw, 697.67px)",
              height:         "133px",
              display:        "flex",
              alignItems:     "center",
              justifyContent: "center",
              zIndex:         2,
              opacity:        0,
              transform:      "translateY(28px)",
              willChange:     "opacity, transform",
              pointerEvents:  "none",
            }}
          >
            <h1
              style={{
                fontFamily:    "var(--font-roundo), 'Roundo', system-ui, sans-serif",
                fontWeight:    500,
                fontSize:      "clamp(28px, 4.167vw, 60px)",
                lineHeight:    "66.14px",
                letterSpacing: "-3.05px",
                textAlign:     "center",
                color:         "#ffffff",
                margin:        0,
                textShadow:    "0 4px 24px rgba(0,0,0,0.45)",
                marginLeft:"clamp(40px, 8.58vw, 100px)"
              }}
            >
              {hero?.heading || 'Elegant Spaces For Built Views Photo Frame'}
            </h1>
          </div>
        </div>
      </div>
    </>
  );
}
