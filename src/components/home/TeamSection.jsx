'use client';

import React from 'react';
import Image from 'next/image';

/* ─── Team data ──────────────────────────────────────────────────────── */
const TEAM = [
  { id: 1, name: 'John Doe', designation: 'Designation', img: 'https://i.pravatar.cc/600?img=11' },
  { id: 2, name: 'John Doe', designation: 'Designation', img: 'https://i.pravatar.cc/600?img=14' },
  { id: 3, name: 'John Doe', designation: 'Designation', img: 'https://i.pravatar.cc/600?img=15' },
  { id: 4, name: 'John Doe', designation: 'Designation', img: 'https://i.pravatar.cc/600?img=52' },
  { id: 5, name: 'John Doe', designation: 'Designation', img: 'https://i.pravatar.cc/600?img=60' },
];

/* ─── CARD_W / CARD_H — from spec ───────────────────────────────────── */
// width: 379.32  height: 498.48  border-radius: 11.41px
const CARD_W = 379.32;
const CARD_H = 498.48;
const CARD_R = 11.41;

/* ─── Team Card ──────────────────────────────────────────────────────── */
const TeamCard = ({ member }) => (
  <div
    className="relative overflow-hidden group cursor-pointer flex-shrink-0"
    style={{ width: `${CARD_W}px`, height: `${CARD_H}px`, borderRadius: `${CARD_R}px` }}
  >
    {/* Photo */}
    <Image
      src={member.img}
      alt={member.name}
      fill
      className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
    />

    {/* Gradient */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

    {/* Name & Designation — spec: pb 19.01px, inner max-w 274.75, py 9.51, gap 9.51 */}
    <div
      className="absolute bottom-0 left-0 right-0 flex items-end justify-center"
      style={{ paddingBottom: '19.01px' }}
    >
      <div
        className="flex flex-col items-center"
        style={{ maxWidth: '274.75px', paddingTop: '9.51px', paddingBottom: '9.51px', gap: '9.51px' }}
      >
        <span style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '20.72px', lineHeight: '22.82px', letterSpacing: '-0.06px',
          fontWeight: 400, color: '#fff', textAlign: 'center',
        }}>
          {member.name}
        </span>
        <span style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '11.98px', lineHeight: '13.31px',
          fontWeight: 400, color: 'rgba(255,255,255,0.75)', textAlign: 'center',
        }}>
          {member.designation}
        </span>
      </div>
    </div>
  </div>
);

/* ─── Contact CTA Card ───────────────────────────────────────────────── */
const ContactCard = () => (
  <div
    className="relative overflow-hidden flex-shrink-0"
    style={{
      width: `${CARD_W}px`, height: `${CARD_H}px`,
      borderRadius: `${CARD_R}px`, backgroundColor: '#334454',
    }}
  >
    {/* Decorative blobs */}
    <div className="absolute -top-12 -right-12 w-[240px] h-[240px] rounded-full bg-[#4a6070]/40" />
    <div className="absolute top-24 -right-20 w-[200px] h-[200px] rounded-full bg-[#6B859E]/30" />
    <div className="absolute -bottom-10 left-[30%] w-[160px] h-[160px] rounded-full bg-[#4a6070]/35" />

    {/* Heading — spec: top:158.49, left:32.25, w:251.92, Roundo 500 50px lh:60 ls:-0.9 capitalize #EDE7DE */}
    <div className="absolute" style={{ top: '158.49px', left: '32.25px', width: '251.92px' }}>
      <h3
        className="font-roundo font-medium capitalize"
        style={{ fontSize: '50px', lineHeight: '60px', letterSpacing: '-0.9px', color: '#EDE7DE' }}
      >
        Wanna<br />Join?<br />Contact<br />Now.
      </h3>
    </div>

    {/* Button — spec: top:413.82, left:32.25, w:167, h:52, r:12, bg:#6B859E */}
    {/* Hover animation: arrow box slides right + scales up, bg darkens */}
    <div className="absolute group" style={{ top: '413.82px', left: '32.25px' }}>
      <button
        className="
          relative flex items-center justify-between overflow-hidden
          transition-all duration-300 ease-in-out
          bg-[#6B859E] hover:bg-[#5a7187]
          border border-white/20
        "
        style={{ width: '167px', height: '52px', borderRadius: '12px', paddingLeft: '20px', paddingRight: '8px' }}
      >
        {/* Text */}
        <span
          className="font-sans text-white font-medium text-[14px] transition-transform duration-300 group-hover:translate-x-[3px]"
        >
          Learn More
        </span>

        {/* Arrow box — slides right + scales on hover */}
        <div
          className="
            flex items-center justify-center flex-shrink-0
            bg-white/20 rounded-[8px]
            transition-all duration-300 ease-in-out
            group-hover:bg-white group-hover:scale-110 group-hover:translate-x-[4px]
          "
          style={{ width: '36px', height: '36px' }}
        >
          <svg
            width="14" height="14" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.5"
            className="text-white group-hover:text-[#334454] transition-colors duration-300 group-hover:translate-x-[2px] transition-transform"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </div>
      </button>
    </div>
  </div>
);

/* ─── Main TeamSection ───────────────────────────────────────────────── */
const TeamSection = () => {
  /*
   * Outer container: 1440 × 1750, 2 columns, row-gap 44, col-gap 20
   * Left aside:  w:422, starts at left:82
   * Right aside: w:822, starts at left:546
   * Gap between asides: 546 - (82 + 422) = 42px
   * Right padding: 1440 - (546 + 822) = 72px
   */
  return (
    <section
      className="w-full bg-[#EDE7DE]"
      style={{
        minHeight: '1750px',
        paddingTop: '47.75px',
        paddingBottom: '47.75px',
        paddingLeft: '82px',
        paddingRight: '72px',
      }}
    >
      <div className="flex items-start" style={{ gap: '42px' }}>

        {/* ══ LEFT: Sticky Sidebar ══════════════════════════════════════ */}
        {/* w:422, pt:48, gap:26, sticky top:47.75 */}
        <aside
          className="flex-shrink-0 flex flex-col sticky"
          style={{ width: '422px', paddingTop: '48px', gap: '26px', top: '47.75px' }}
        >
          {/* Badge — w:100.2, h:30.8 */}
          <div className="flex items-center gap-[7.2px]">
            <div className="w-[14px] h-[14px] bg-[#334454] rounded-[3px] flex-shrink-0" />
            <span
              className="uppercase text-[#334454]"
              style={{
                fontFamily: 'var(--font-geist-sans), sans-serif',
                fontSize: '16.2px', lineHeight: '19.44px',
                letterSpacing: '-0.32px', fontWeight: 400,
              }}
            >
              Our Team
            </span>
          </div>

          {/* Heading — w:422, h:120 */}
          <h2
            className="font-roundo font-medium capitalize text-[#1A1A1A]"
            style={{ fontSize: '60px', lineHeight: '60px', letterSpacing: '-0.9px', width: '422px' }}
          >
            Peoples Builds This Firm
          </h2>

          {/* Sub-heading — w:370, h:99.75, pb:0.75 */}
          <p
            className="text-[#334454]/75"
            style={{
              fontFamily: 'var(--font-geist-sans), sans-serif',
              fontSize: '20px', lineHeight: '24.7px',
              letterSpacing: '-0.38px', fontWeight: 400,
              width: '370px', paddingBottom: '0.75px',
            }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim.
          </p>
        </aside>

        {/* ══ RIGHT: 2-col photo grid ═══════════════════════════════════ */}
        {/*
         * Right aside: w:822, h:1467
         * 2 columns of CARD_W (379.32), col-gap = 822 - 2×379.32 = 63.36px
         * row-gap: 44px (from outer spec)
         */}
        <aside className="flex-shrink-0" style={{ width: '822px' }}>
          <div
            className="grid grid-cols-2"
            style={{ columnGap: '63.36px', rowGap: '44px' }}
          >
            {TEAM.map((member) => (
              <TeamCard key={member.id} member={member} />
            ))}

            {/* 6th slot: Contact CTA */}
            <ContactCard />
          </div>
        </aside>

      </div>
    </section>
  );
};

export default TeamSection;
