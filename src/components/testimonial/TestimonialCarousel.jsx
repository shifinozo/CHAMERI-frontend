'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';
import { TESTIMONIALS as DEFAULT_TESTIMONIALS } from '@/data/testimonials';

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * TestimonialCarousel
 * ─────────────────────────────────────────────────────────────────────────────
 * Baseline viewport : 1440px  (design canvas: 1440 × 528)
 * Fluid range       : 375px → 1920px
 *
 * clamp() formula
 *   vw_value = (DESIGN_PX / 1440) × 100
 *   result   = clamp(MOBILE_FLOOR, vw_value vw, DESKTOP_CEIL)
 *
 * Figma specs (1440px design):
 *   Section        : w:1440 h:528  bg:#EDE7DE  border-top:1px solid #21232533
 *   Photo thumb    : w:163.21 h:214.49  top:131.64 left:77.2  radius:4.91
 *   Quote glyph    : w:24.3  h:18      top:127.8  left:318
 *   Top meta row   : w:1280 h:16.36   top:53  left:80
 *     "01 / 05"    : left:608 (centered in the 1280-wide row)
 *     Badge pill   : w:151.6 h:20     radius:90
 *   Arrow buttons  : w:81   h:34.12   top:55  left:1279 (i.e. right:80)
 *   Footer row     : top:409 left:80  w:1280 h:49.89
 *     Name/desig.  : w:181.42
 *     Google score : w:247.98  top:423.42 left:1062.52
 *   Quote text     : w:832 h:47(auto) top:128 left:364  color:#212325
 * ─────────────────────────────────────────────────────────────────────────────
 */

const GoogleIcon = ({ size }) => (
  <svg viewBox="0 0 48 48" style={{ width: size, height: size, flexShrink: 0 }}>
    <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.9 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.1 8 3l5.7-5.7C34.6 6.1 29.6 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.7-.4-3.5z" />
    <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.6 15.9 18.9 13 24 13c3.1 0 5.8 1.1 8 3l5.7-5.7C34.6 6.1 29.6 4 24 4c-7.5 0-14 4.2-17.7 10.7z" />
    <path fill="#4CAF50" d="M24 44c5.2 0 10-2 13.6-5.2l-6.3-5.3c-2.1 1.4-4.7 2.3-7.3 2.3-5.2 0-9.6-3.5-11.2-8.3l-6.5 5C9.9 39.6 16.4 44 24 44z" />
    <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.2-4.2 5.5l6.3 5.3C39.6 37 44 31.2 44 24c0-1.3-.1-2.7-.4-3.5z" />
  </svg>
);

const ArrowIcon = ({ size }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#EDE7DE" strokeWidth="2.5" style={{ width: size, height: size }}>
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

export default function TestimonialCarousel({ testimonials }) {
  const DATA = testimonials?.length ? testimonials : DEFAULT_TESTIMONIALS;
  const total = DATA.length;
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => setCurrent((c) => (c + 1) % total), [total]);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + total) % total), [total]);

  const item = DATA[current];
  const counter = `${String(current + 1).padStart(2, '0')} / ${String(total).padStart(2, '0')}`;
  const googleScore = item.googleScore || '5.0';

  return (
    <section
      className="relative w-full"
      style={{ background: '#EDE7DE', borderTop: '1px solid #21232533' }}
    >
      {/* ══════════════════════════════ DESKTOP (md+) ══════════════════════════ */}
      <div
        className="hidden md:block relative w-full mx-auto"
        style={{ height: 'clamp(400px, 36.667vw, 728px)' }}
      >
        {/* ── Photo thumbnail ─────────────────────────────────────────────── */}
        <div
          className="absolute overflow-hidden"
          style={{
            top:          '24.932%',
            left:         '5.361%',
            width:        'clamp(120px, 11.334vw, 163.21px)',
            height:       'clamp(140px, 14.895vw, 214.49px)',
            borderRadius: 'clamp(3px, 0.341vw, 4.91px)',
          }}
        >
          <Image src={item.avatar} alt={item.name} fill className="object-cover" />
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(0deg, #000000 0%, rgba(0,0,0,0) 39%)' }}
          />
        </div>

        {/* ── Quote glyph ─────────────────────────────────────────────────── */}
        <div
          className="absolute"
          style={{
            top:    '24.20%',
            left:   '22.083%',
            width:  'clamp(18px, 1.688vw, 24.3px)',
            height: 'clamp(13px, 1.25vw, 18px)',
          }}
        >
          <Image src="/icons/Vector (16).svg" alt="" fill />
        </div>

        {/* ── Quote text ──────────────────────────────────────────────────── */}
        <p
          className="absolute font-sans m-0"
          style={{
            top:           '24.242%',
            left:          '25.278%',
            width:         'clamp(280px, 57.778vw, 992px)',
            color:         '#212325',
            fontWeight:    500,
            fontSize:      'clamp(22px, 4.222vw, 52px)',
            lineHeight:    'clamp(26px, 3.586vw, 73px)',
          }}
        >
          {item.quote}
        </p>

        {/* ── Top meta row: badge + counter ──────────────────────────────── */}
        <div
          className="absolute"
          style={{
            top:    '10.038%',
            left:   '5.556%',
            right:  '5.556%',
            height: 'clamp(12px, 1.136vw, 16.36px)',
          }}
        >
          {/* Badge pill — CLIENTS NOTES */}
          <div
            className="absolute flex items-center rounded-[90px]"
            style={{
              left:         0,
              top:          '-1px',
              width:        'clamp(110px, 10.528vw, 151.6px)',
              height:       'clamp(14px, 1.389vw, 20px)',
              gap:          'clamp(5px, 0.5vw, 7.2px)',
              paddingLeft:  'clamp(5px, 0.5vw, 7.2px)',
              paddingRight: 'clamp(5px, 0.5vw, 7.2px)',
            }}
          >
            <div
              className="flex-shrink-0"
              style={{ width: 'clamp(10px, 0.972vw, 14px)', height: 'clamp(10px, 0.972vw, 14px)', background: '#334454' }}
            />
            <span
              className="font-sans uppercase text-[#334454]"
              style={{
                fontWeight:    400,
                fontSize:      'clamp(9px, 1.125vw, 16.2px)',
                letterSpacing: 'clamp(-0.24px, -0.0222vw, -0.32px)',
                lineHeight:    1.2,
                whiteSpace:    'nowrap',
              }}
            >
              Clients Notes
            </span>
          </div>

          {/* Counter — 01 / 05 */}
          <span
            className="absolute font-sans uppercase"
            style={{
              left:          '50%',
              top:           '0.36px',
              transform:     'translateX(-50%)',
              color:         '#21232599',
              fontWeight:    600,
              fontSize:      'clamp(9px, 0.833vw, 12px)',
              lineHeight:    'clamp(12px, 1.1375vw, 16.38px)',
              letterSpacing: 'clamp(0.9px, 0.0875vw, 1.26px)',
              whiteSpace:    'nowrap',
            }}
          >
            {counter}
          </span>
        </div>

        {/* ── Arrow buttons ───────────────────────────────────────────────── */}
        <div
          className="absolute flex items-center justify-between"
          style={{
            top:    '10.417%',
            right:  '5.556%',
            width:  'clamp(60px, 5.625vw, 81px)',
            height: 'clamp(24px, 2.369vw, 34.12px)',
          }}
        >
          <button
            onClick={prev}
            aria-label="Previous"
            className="flex items-center justify-center border-none cursor-pointer bg-[#334454] hover:bg-[#4a6074] transition-colors duration-300"
            style={{
              width:        'clamp(24px, 2.369vw, 34.12px)',
              height:       'clamp(24px, 2.369vw, 34.12px)',
              borderRadius: 'clamp(4px, 0.422vw, 6.07px)',
            }}
          >
            <div style={{ transform: 'rotate(180deg)' }}>
              <ArrowIcon size="clamp(12px, 1.319vw, 19px)" />
            </div>
          </button>
          <button
            onClick={next}
            aria-label="Next"
            className="flex items-center justify-center border-none cursor-pointer bg-[#334454] hover:bg-[#4a6074] transition-colors duration-300"
            style={{
              width:        'clamp(24px, 2.369vw, 34.12px)',
              height:       'clamp(24px, 2.369vw, 34.12px)',
              borderRadius: 'clamp(4px, 0.422vw, 6.07px)',
            }}
          >
            <ArrowIcon size="clamp(12px, 1.319vw, 19px)" />
          </button>
        </div>

        {/* ── Footer row: name/designation + google score ────────────────── */}
        {/* Name / designation — aligned with the quote text's left edge */}
        <div
          className="absolute flex flex-col"
          style={{
            top:    '77.462%',
            left:   '25.278%',
            width:  'clamp(140px, 12.599vw, 181.42px)',
            gap:    'clamp(4px, 0.374vw, 5.39px)',
          }}
        >
          <p
            className="font-sans m-0"
            style={{
              color:      '#1A1A1A',
              fontWeight: 400,
              fontSize:   'clamp(15px, 1.382vw, 19.9px)',
              lineHeight: 'clamp(20px, 1.8vw, 25.92px)',
            }}
          >
            {item.name}
          </p>
          <p
            className="font-sans uppercase m-0"
            style={{
              color:         '#21232599',
              fontWeight:    500,
              fontSize:      'clamp(9px, 0.75vw, 10.8px)',
              lineHeight:    '14px',
              letterSpacing: 'clamp(0.6px, 0.0597vw, 0.86px)',
            }}
          >
            {item.role}
          </p>
        </div>

        {/* Google review score — icon first, then text */}
        <div
          className="absolute flex items-center"
          style={{
            top:   '80.19%',
            left:  '73.79%',
            gap:   'clamp(7px, 0.749vw, 10.79px)',
          }}
        >
          <GoogleIcon size="clamp(14px, 1.25vw, 18px)" />
          <span
            className="font-sans uppercase underline"
            style={{
              color:         '#21232599',
              fontWeight:    500,
              fontSize:      'clamp(9px, 0.75vw, 10.8px)',
              lineHeight:    '14px',
              letterSpacing: 'clamp(0.6px, 0.0597vw, 0.86px)',
              whiteSpace:    'nowrap',
            }}
          >
            Google Review Score: {googleScore} of 5
          </span>
        </div>
      </div>

      {/* ══════════════════════════════ MOBILE (< md) ═══════════════════════════ */}
      <div className="flex md:hidden flex-col" style={{ padding: '24px 20px', gap: '16px' }}>
        {/* Meta row */}
        <div className="flex items-center justify-between">
          <div
            className="flex items-center rounded-[90px]"
            style={{ gap: '5px', padding: '0 7px', height: '20px' }}
          >
            <div className="flex-shrink-0" style={{ width: '10px', height: '10px', background: '#334454' }} />
            <span className="font-sans uppercase text-[#334454]" style={{ fontSize: '11px' }}>
              Clients Notes
            </span>
          </div>
          <span
            className="font-sans uppercase"
            style={{ color: '#21232599', fontWeight: 600, fontSize: '11px', letterSpacing: '1px' }}
          >
            {counter}
          </span>
        </div>

        {/* Photo + quote glyph */}
        <div className="flex items-start" style={{ gap: '16px' }}>
          <div className="relative overflow-hidden flex-shrink-0" style={{ width: '100px', height: '132px', borderRadius: '4px' }}>
            <Image src={item.avatar} alt={item.name} fill className="object-cover" />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(0deg, #000000 0%, rgba(0,0,0,0) 39%)' }} />
          </div>
          <div className="relative flex-shrink-0" style={{ width: '20px', height: '15px' }}>
            <Image src="/icons/Vector (16).svg" alt="" fill />
          </div>
        </div>

        {/* Quote text */}
        <p className="font-sans m-0" style={{ color: '#212325', fontWeight: 500, fontSize: '18px', lineHeight: '26px' }}>
          {item.quote}
        </p>

        {/* Name / designation */}
        <div className="flex flex-col" style={{ gap: '4px' }}>
          <p className="font-sans m-0" style={{ color: '#1A1A1A', fontSize: '16px', lineHeight: '20px' }}>
            {item.name}
          </p>
          <p
            className="font-sans uppercase m-0"
            style={{ color: '#21232599', fontWeight: 500, fontSize: '10px', letterSpacing: '0.6px' }}
          >
            {item.role}
          </p>
        </div>

        {/* Google score + arrows */}
        <div className="flex items-center justify-between">
          <div className="flex items-center" style={{ gap: '8px' }}>
            <GoogleIcon size="14px" />
            <span
              className="font-sans uppercase underline"
              style={{ color: '#21232599', fontWeight: 500, fontSize: '10px', letterSpacing: '0.6px' }}
            >
              Google Review: {googleScore} of 5
            </span>
          </div>
          <div className="flex items-center" style={{ gap: '10px' }}>
            <button
              onClick={prev}
              aria-label="Previous"
              className="flex items-center justify-center border-none cursor-pointer bg-[#334454]"
              style={{ width: '30px', height: '30px', borderRadius: '5px' }}
            >
              <div style={{ transform: 'rotate(180deg)' }}>
                <ArrowIcon size="16px" />
              </div>
            </button>
            <button
              onClick={next}
              aria-label="Next"
              className="flex items-center justify-center border-none cursor-pointer bg-[#334454]"
              style={{ width: '30px', height: '30px', borderRadius: '5px' }}
            >
              <ArrowIcon size="16px" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
