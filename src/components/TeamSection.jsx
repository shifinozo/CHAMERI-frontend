'use client';

import React from 'react';
import Image from 'next/image';

/* ─── Team data ──────────────────────────────────────────────────────── */
const TEAM = [
  { id: 1, name: 'John Doe',  designation: 'Designation', img: 'https://i.pravatar.cc/600?img=11' },
  { id: 2, name: 'John Doe',  designation: 'Designation', img: 'https://i.pravatar.cc/600?img=14' },
  { id: 3, name: 'John Doe',  designation: 'Designation', img: 'https://i.pravatar.cc/600?img=15' },
  { id: 4, name: 'John Doe',  designation: 'Designation', img: 'https://i.pravatar.cc/600?img=52' },
  { id: 5, name: 'John Doe',  designation: 'Designation', img: 'https://i.pravatar.cc/600?img=60' },
];

/* ─── Team Card ──────────────────────────────────────────────────────── */
const TeamCard = ({ member }) => (
  <div className="relative w-full overflow-hidden rounded-[8px] group cursor-pointer"
       style={{ aspectRatio: '379.68/498.16' }}>
    {/* Photo */}
    <Image
      src={member.img}
      alt={member.name}
      fill
      className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
    />

    {/* Gradient overlay */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

    {/* Name & Designation */}
    <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center pb-[14px] gap-[4px]">
      <span style={{
        fontFamily: 'Inter, sans-serif',
        fontSize: '20.72px',
        lineHeight: '22.82px',
        letterSpacing: '-0.06px',
        fontWeight: 400,
        color: '#fff',
        textAlign: 'center',
      }}>
        {member.name}
      </span>
      <span style={{
        fontFamily: 'Inter, sans-serif',
        fontSize: '11.98px',
        lineHeight: '13.31px',
        fontWeight: 400,
        color: 'rgba(255,255,255,0.75)',
        textAlign: 'center',
      }}>
        {member.designation}
      </span>
    </div>
  </div>
);

/* ─── Contact CTA Card ───────────────────────────────────────────────── */
const ContactCard = () => (
  <div
    className="relative w-full rounded-[8px] flex flex-col justify-between p-8 overflow-hidden"
    style={{ aspectRatio: '379.68/498.16', backgroundColor: '#334454' }}
  >
    {/* Decorative circles */}
    <div className="absolute -top-10 -right-10 w-[220px] h-[220px] rounded-full bg-[#4a6070]/40" />
    <div className="absolute top-20 -right-16 w-[180px] h-[180px] rounded-full bg-[#6B859E]/30" />
    <div className="absolute -bottom-8 left-1/2 w-[150px] h-[150px] rounded-full bg-[#4a6070]/40" />

    {/* Text */}
    <div className="relative z-10 flex-1 flex items-start pt-6">
      <h3 className="font-roundo font-medium text-[44px] leading-[1.1] tracking-[-0.9px] text-white">
        Wanna<br />Join?<br />Contact<br />Now.
      </h3>
    </div>

    {/* Button */}
    <div className="relative z-10">
      <a
        href="#contact"
        className="group inline-flex items-center gap-3 px-5 py-[10px] bg-white/10 border border-white/30 backdrop-blur-sm rounded-[10px] text-white text-[14px] font-sans hover:bg-white hover:text-[#334454] transition-all duration-300"
      >
        <span>Contact Us</span>
        <div className="w-[26px] h-[26px] bg-white/20 group-hover:bg-[#334454] rounded-[6px] flex items-center justify-center transition-colors duration-300">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </div>
      </a>
    </div>
  </div>
);

/* ─── Main TeamSection ───────────────────────────────────────────────── */
const TeamSection = () => {
  return (
    <section
      className="w-full h-150px] bg-[#EDE7DE] px-[40px] md:px-[82px] py-[47.75px]"
    >
      <div className="flex flex-col lg:flex-row gap-[20px] lg:gap-[44px] items-start">

        {/* ── LEFT: Sticky Sidebar ── */}
        <aside
          className="w-full lg:w-[422px] flex-shrink-0 lg:sticky pt-[48px] flex flex-col gap-[26px]"
          style={{ top: '47.75px' }}
        >
          {/* Badge */}
          <div className="flex items-center gap-[7.2px]">
            <div className="w-[14px] h-[14px] bg-[#334454] rounded-[3px] flex-shrink-0" />
            <span
              className="uppercase text-[#334454]"
              style={{
                fontFamily: 'var(--font-geist-sans), sans-serif',
                fontSize: '16.2px',
                lineHeight: '19.44px',
                letterSpacing: '-0.32px',
                fontWeight: 400,
              }}
            >
              Our Team
            </span>
          </div>

          {/* Heading */}
          <h2
            className="font-roundo font-medium capitalize text-[#1A1A1A]"
            style={{
              fontSize: '60px',
              lineHeight: '60px',
              letterSpacing: '-0.9px',
              maxWidth: '422px',
            }}
          >
            Peoples Builds This Firm
          </h2>

          {/* Description */}
          <p
            className="text-[#334454]/75"
            style={{
              fontFamily: 'var(--font-geist-sans), sans-serif',
              fontSize: '20px',
              lineHeight: '24.7px',
              letterSpacing: '-0.38px',
              fontWeight: 400,
              maxWidth: '387px',
            }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim.
          </p>
        </aside>

        {/* ── RIGHT: Team Grid ── */}
        <aside className="flex-1 w-full">
          <div className="grid grid-cols-2 gap-[20px]">
            {/* 5 Team Cards */}
            {TEAM.map((member) => (
              <TeamCard key={member.id} member={member} />
            ))}

            {/* 6th Card: Contact CTA */}
            <ContactCard />
          </div>
        </aside>

      </div>
    </section>
  );
};

export default TeamSection;
