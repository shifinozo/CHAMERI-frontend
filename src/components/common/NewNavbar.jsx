'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * NewNavbar — Shared navigation bar for About, Contact, and Gallery pages.
 * ─────────────────────────────────────────────────────────────────────────────
 * Baseline viewport : 1440px
 * Fluid range       : 375px → 1920px
 *
 * Scroll behaviour:
 *   - Hidden (translated up) when the user scrolls DOWN
 *   - Visible (translated to 0) when the user scrolls UP
 *   - Always visible at the very top of the page (scrollY < threshold)
 *
 * clamp() formula:
 *   vw_value = (DESIGN_PX / 1440) × 100
 *   result   = clamp(MOBILE_FLOOR, vw_value vw, DESKTOP_CEIL)
 *
 * Figma specs (1280px design):
 * ─────────────────────────────────────────────────────────────────────────────
 *  OUTER NAV PILL
 *    background   : #FFFFFF1A  (10.2% white)
 *    border-radius: 15px → clamp(8px, 1.042vw, 15px)
 *    max-width    : 1280px
 *    height       : 90px → clamp(56px, 6.25vw, 90px)
 *    outer paddingH: 80px (centering wrapper provides this)
 *
 *  INNER WRAPPER (inside pill)
 *    padding-top/bottom: 11px → clamp(6px, 0.764vw, 11px)
 *    padding-left/right: 29px → clamp(14px, 2.014vw, 29px)
 *    (resulting inner width ≈ 1222px at 1280px viewport)
 *
 *  ROW 1 — height: 46px → clamp(30px, 3.194vw, 46px)
 *    justify-content: space-between
 *
 *  MENU ICON BOX — left div
 *    width : 30px → clamp(22px, 2.083vw, 30px)
 *    height: 30px → clamp(22px, 2.083vw, 30px)
 *    SVG burger: 25×17.5px, color #FFFFFF
 *    top offset: 6.25px, left offset: 2.5px (centred via flex)
 *
 *  CONTACT US BUTTON — right div
 *    button width : 147px → clamp(100px, 10.208vw, 147px)
 *    button height:  46px → clamp(30px,  3.194vw,  46px)
 *    border-radius: 12px → clamp(7px, 0.833vw, 12px)
 *    background: #FFFFFF
 *
 *  ROW 2 — logo (second main div, centred absolutely)
 *    img width : 118px → clamp(72px, 8.194vw, 118px)
 *    img height:  66px → clamp(40px, 4.583vw,  66px)
 *    positioned at left: 553px from inner edge → absolute center
 * ─────────────────────────────────────────────────────────────────────────────
 */
export default function NewNavbar({ opacity = 1, showLogo = true }) {
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const SCROLL_THRESHOLD = 8; // px — ignore tiny jitter

    const handleScroll = () => {
      const currentY = window.scrollY;
      const diff = currentY - lastScrollY.current;

      if (Math.abs(diff) < SCROLL_THRESHOLD) return; // ignore tiny movements

      if (diff > 0) {
        // Scrolling DOWN → hide navbar
        setVisible(false);
      } else {
        // Scrolling UP → show navbar
        setVisible(true);
      }

      lastScrollY.current = currentY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    /*
     * ── OUTER POSITIONING WRAPPER ──────────────────────────────────────────
     * Fixed so the navbar stays at the top during scroll.
     * Transform + transition drives the hide/show animation.
     */
    <div
      style={{
        position:      'fixed',
        top:           0,
        left:          0,
        width:         '100%',
        zIndex:        50,
        display:       'flex',
        justifyContent:'center',
        paddingTop:    'clamp(8px, 0.764vw, 11px)',
        paddingLeft:   'clamp(16px, 5.556vw, 80px)',
        paddingRight:  'clamp(16px, 5.556vw, 80px)',
        pointerEvents: 'none',
        opacity,
        transform:     visible ? 'translateY(0)' : 'translateY(-120%)',
        transition:    'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s ease',
        willChange:    'transform, opacity',
      }}
    >
      {/*
       * ── PILL CONTAINER ─────────────────────────────────────────────────
       * background : #FFFFFF1A
       * border-radius: 15px → clamp(8px, 1.042vw, 15px)
       * height: 90px → clamp(56px, 6.25vw, 90px)
       * width: 100% capped at 1280px
       */}
      <div
        style={{
          background:    '#FFFFFF1A',
          backdropFilter:'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          borderRadius:  'clamp(8px, 1.042vw, 15px)',
          width:         '100%',
          maxWidth:      '1920px',
          height:        'clamp(56px, 6.25vw, 90px)',
          pointerEvents: opacity > 0.05 ? 'auto' : 'none',
          position:      'relative',
        }}
      >
        {/*
         * ── INNER WRAPPER ────────────────────────────────────────────────
         * padding-top   : 11px → clamp(6px, 0.764vw, 11px)
         * padding-left/R: 29px → clamp(14px, 2.014vw, 29px)
         * This is the 1223px-wide content area.
         */}
        <div
          style={{
            paddingTop:   'clamp(6px, 0.764vw, 11px)',
            paddingBottom:'clamp(6px, 0.764vw, 11px)',
            paddingLeft:  'clamp(14px, 2.014vw, 29px)',
            paddingRight: 'clamp(14px, 2.014vw, 29px)',
            height:       '100%',
            position:     'relative',
            display:      'flex',
            flexDirection:'column',
            justifyContent:'center',
          }}
        >
          {/*
           * ── ROW 1: Menu (left) + Contact Us (right) ──────────────────
           * height: 46px → clamp(30px, 3.194vw, 46px)
           * justify-content: space-between
           */}
          <div
            style={{
              display:        'flex',
              alignItems:     'center',
              justifyContent: 'space-between',
              height:         'clamp(30px, 3.194vw, 46px)',
              position:       'relative',
              zIndex:         2,
            }}
          >
            {/*
             * ── LEFT: MENU ICON ──────────────────────────────────────
             * Container: 30×30px → clamp(22px, 2.083vw, 30px)
             * SVG burger: 25×17.5px, colour #FFFFFF
             * Top/left offsets handled by flex centering
             */}
            <div
              style={{
                width:          'clamp(22px, 2.083vw, 30px)',
                height:         'clamp(22px, 2.083vw, 30px)',
                display:        'flex',
                alignItems:     'center',
                justifyContent: 'center',
                cursor:         'pointer',
                flexShrink:     0,
              }}
            >
              <svg
                width="clamp(16px, 1.736vw, 25px)"
                height="clamp(11px, 1.215vw, 17.5px)"
                viewBox="0 0 25 17.5"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Top line */}
                <line x1="0" y1="1.25"  x2="25" y2="1.25"  stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round"/>
                {/* Middle line */}
                <line x1="0" y1="8.75"  x2="25" y2="8.75"  stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round"/>
                {/* Bottom line */}
                <line x1="0" y1="16.25" x2="25" y2="16.25" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round"/>
              </svg>
            </div>

            {/*
             * ── RIGHT: CONTACT US BUTTON ─────────────────────────────
             * Outer wrapper: width 150px, height 46px, gap 10px
             * Button: bg #FFFFFF, w 147px, h 46px, border-radius 12px
             *
             * Animation (same as home page ContactSection):
             *   - bg: #FFFFFF → #334454 on hover
             *   - Sliding text: two stacked spans shift -50% on hover
             *   - Arrow box (dark, right side): arrow out-right / in-left
             */}
            <div
              style={{
                width:  'clamp(100px, 10.417vw, 150px)',
                height: 'clamp(30px, 3.194vw, 46px)',
                display:'flex',
                gap:    'clamp(6px, 0.694vw, 10px)',
              }}
            >
              <button 
          className="group flex items-center justify-between bg-white hover:bg-[#334454] transition-colors duration-300 overflow-hidden cursor-pointer border-none z-50"
          style={{ width: "150px", height: "52px", paddingLeft: "16px", paddingRight: "16px", borderRadius: "12px" }}
        >
          {/* Sliding text container */}
          <div 
            className="relative overflow-hidden"
            style={{ height: "23px", flex: 1 }}
          >
            <div className="flex flex-col transition-transform duration-[600ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:-translate-y-1/2">
              <span className="font-Geist text-[16px] font-medium text-black whitespace-nowrap flex items-center" style={{ height: "23px" }}>
                Contact Us
              </span>
              <span className="font-Geist text-[16px] font-medium text-white whitespace-nowrap flex items-center" style={{ height: "23px" }}>
                Contact Us
              </span>
            </div>
          </div>

          {/* Arrow icon box */}
          <div 
            className="relative overflow-hidden flex items-center justify-center shrink-0"
            style={{ width: "21px", height: "20px", marginLeft: "8px" }}
          >
            {/* Original Arrow - Flies out to the right */}
            <div className="absolute inset-0 flex items-center justify-center transition-transform duration-[600ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:translate-x-full">
              <svg width="21" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-black">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>

            {/* New Arrow - Comes in from the left */}
            <div className="absolute inset-0 flex items-center justify-center transition-transform duration-[600ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] -translate-x-full group-hover:translate-x-0">
              <svg width="21" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </button>
            </div>
          </div>

          {/*
           * ── ROW 2: LOGO (absolutely centred over Row 1) ──────────
           * The logo is centred absolutely within the inner wrapper,
           * using absolute positioning so it sits behind the buttons
           * in z-order but visually centred.
           * img: 117.99×65.91px → clamp fluid values
           */}
          {showLogo && (
            <div
              style={{
                position:       'absolute',
                top:            0,
                left:           0,
                right:          0,
                bottom:         0,
                display:        'flex',
                alignItems:     'center',
                justifyContent: 'center',
                pointerEvents:  'none',
                zIndex:         1,
              }}
            >
              <Link
                href="/"
                style={{
                  display:       'flex',
                  flexDirection: 'column',
                  alignItems:    'center',
                  gap:           'clamp(3px, 0.278vw, 4px)',
                  textDecoration:'none',
                  pointerEvents: 'auto',
                }}
              >
                {/* Logo mark (top icon) */}
                <div
                  style={{
                    position: 'relative',
                    width:    'clamp(24px, 2.361vw, 34px)',
                    height:   'clamp(26px, 2.639vw, 38px)',
                  }}
                >
                  <Image
                    src="/icons/logo (6).svg"
                    alt="Chameri mark"
                    fill
                    sizes="40px"
                    style={{ objectFit: 'contain' }}
                    priority
                  />
                </div>
                {/* Wordmark (CHAMERI text) */}
                <div
                  style={{
                    position: 'relative',
                    width:    'clamp(70px, 6.944vw, 100px)',
                    height:   'clamp(9px,  0.903vw,  13px)',
                  }}
                >
                  <Image
                    src="/icons/logo (7).svg"
                    alt="CHAMERI"
                    fill
                    sizes="120px"
                    style={{ objectFit: 'contain' }}
                    priority
                  />
                </div>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

