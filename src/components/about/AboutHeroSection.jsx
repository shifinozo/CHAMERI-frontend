'use client';

/**
 * AboutHeroSection — Full-width hero for the About Us page.
 *
 * Figma specs (1440 × 1250 canvas):
 *   Section:  1440 × 1250
 *   Image:    1440 × 1250 (full bleed)
 *   Text div: w:667.67  h:266  top:105px  left:386.17px (centered)
 *     • "Crafting Timeless Villas & Landmark Spaces"
 *         font: Roundo 500  60px / 66.14px  ls:-3.05px  center
 *     • "since 1985"
 *         font: Roundo 500  40px / 66.14px  ls:-3.05px  center
 *
 * Responsiveness strategy:
 *   — Section height uses padding-bottom trick to preserve 1440:1250 ratio
 *     at every viewport width, but capped at 1250px to not over-expand.
 *   — Text is positioned using % of section height/width so it scales
 *     proportionally on every device.
 *   — Font sizes use clamp() with vw-based fluid value so they scale from
 *     mobile (320px) to the Figma design width (1440px) and stay capped
 *     at the Figma maximum above 1440px.
 *
 *   KEY: The clamp max is derived from the Figma value, so the design
 *   looks pixel-perfect at 1440px and scales gracefully at any other width
 *   including 1536px (user's screen).
 */
export default function AboutHeroSection() {
  return (
    <section
      style={{
        position: 'relative',
        width: '100%',
        /*
          Maintain the 1440 × 1250 aspect ratio.
          padding-bottom % is relative to width → 1250/1440 = 86.806%
          We cap height at 1250px so on very wide screens it doesn't grow beyond Figma.
        */
        paddingBottom: 'min(86.806%, 1250px)',
        height: 0,
        overflow: 'hidden',
        backgroundColor: '#EDE7DE',
      }}
    >
      {/* ── Full-bleed background image (SVG) ────────────────────────── */}
      {/*
        Using <img> instead of next/image because the SVG is a large base64-
        embedded raster, not a true vector — fill + sizes works identically.
        object-fit: cover centres and fills the padded container.
      */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/image 9.svg"
        alt="Chameri architectural villa sketch"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center top',
        }}
      />

      {/* ── Subtle gradient overlay for text legibility ──────────────── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(to bottom, rgba(237,231,222,0.60) 0%, rgba(237,231,222,0.15) 40%, rgba(237,231,222,0.00) 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* ── Text container ──────────────────────────────────────────── */}
      {/*
        Figma positioning on 1440-wide canvas:
          center-x = 386.17 + 667.67/2 = 720px → exactly 50% of 1440px ✓
          top       = 105px / 1250px = 8.40%

        We position with left:50% + translateX(-50%) to keep it centred
        at any viewport width. The top % is relative to the padded height
        (the padding-bottom trick means the section height == paddingBottom).
      */}
      <div
        style={{
          position: 'absolute',
          /* 105 / 1250 = 8.40% */
          top: '8.40%',
          left: '50%',
          transform: 'translateX(-50%)',
          /*
            Figma text container width: 667.67px on 1440px canvas
            667.67 / 1440 = 46.37vw
            clamp: mobile floor 280px → fluid 46.37vw → desktop cap 667.67px
          */
          width: 'clamp(280px, 46.37vw, 667.67px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 0,
          zIndex: 10,
        }}
      >
        {/* ── Heading ─────────────────────────────────────────────── */}
        <h1
          style={{
            fontFamily:
              "var(--font-roundo), 'Roundo', var(--font-outfit), system-ui, sans-serif",
            fontWeight: 500,
            /*
              Figma: 60px on 1440px canvas → 60/1440 = 4.167vw
              clamp: 22px (≈320px mobile) → 4.167vw → 60px (≥1440px cap)
              At 1536px: 4.167×15.36 = 64px → capped at 60px ✓
            */
            fontSize: 'clamp(22px, 4.167vw, 60px)',
            /*
              line-height: 66.14px → 66.14/1440 = 4.593vw
              clamp: 26px → 4.593vw → 66.14px
            */
            lineHeight: 'clamp(26px, 4.593vw, 66.14px)',
            /*
              letter-spacing: -3.05px on 60px → ratio ≈ -0.0508em
              clamp: -0.6px → -0.212vw → -3.05px
              (negative clamp: smaller (more negative) = larger on wider screens)
            */
            letterSpacing: 'clamp(-3.05px, -0.212vw, -0.6px)',
            textAlign: 'center',
            color: '#1A1A1A',
            margin: 0,
            padding: 0,
          }}
        >
          Crafting Timeless Villas &amp; Landmark Spaces
        </h1>

        {/* ── Sub-heading ─────────────────────────────────────────── */}
        <p
          style={{
            fontFamily:
              "var(--font-roundo), 'Roundo', var(--font-outfit), system-ui, sans-serif",
            fontWeight: 500,
            /*
              Figma: 40px on 1440px → 40/1440 = 2.778vw
              clamp: 15px → 2.778vw → 40px
              At 1536px: 2.778×15.36 = 42.67px → capped at 40px ✓
            */
            fontSize: 'clamp(15px, 2.778vw, 40px)',
            /*
              Figma line-height: 66.14px (same rhythm as heading)
              clamp: 22px → 4.593vw → 66.14px
            */
            lineHeight: 'clamp(22px, 4.593vw, 66.14px)',
            letterSpacing: 'clamp(-3.05px, -0.212vw, -0.6px)',
            textAlign: 'center',
            color: '#1A1A1A',
            margin: 0,
            padding: 0,
          }}
        >
          since 1985
        </p>
      </div>
    </section>
  );
}
