'use client';

import React from 'react';
import Image from 'next/image';

const WhyChooseUs = () => {
  const cards = [
    {
      img: '/dummyimages/Frame 2121454280.png',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      ),
      title: "Design-Driven, Modern Approach",
      desc: "With a portfolio of completed projects and collaborations with experienced architects, we bring proven expertise to every build. Our work speaks through real results, client satisfaction, and trusted industry partnerships."
    },
    {
      img: '/dummyimages/Container.png',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      ),
      title: "Proven Expertise & Trusted Network",
      desc: "With a portfolio of completed projects and collaborations with experienced architects, we bring proven expertise to every build. Our work speaks through real results, client satisfaction, and trusted industry partnerships."
    },
    {
      img: '/dummyimages/Overlay.png',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
      title: "Client-Centric, Seamless Experience",
      desc: "With a portfolio of completed projects and collaborations with experienced architects, we bring proven expertise to every build. Our work speaks through real results, client satisfaction, and trusted industry partnerships."
    }
  ];

  return (
    <section className="w-full bg-[#EFEDE7] py-[60px] px-[80px] flex flex-col items-center gap-[60px] overflow-hidden">
      {/* ── Top Header Section ── */}
      <div className="w-full flex flex-col gap-6">
        {/* Badge */}
        <div className="flex items-center gap-[7.2px] px-[7.2px] py-[5.4px] border border-black/10 rounded-[90px] self-start bg-white/20">
          <div className="w-[14px] h-[14px] bg-[#334454] rounded-[3px]" />
          <span className="text-[16.2px] font-sans font-normal uppercase tracking-[-0.32px] text-black">
            WHY CHOOSE US
          </span>
        </div>

        {/* Main Heading Row */}
        <div className="flex justify-between items-end w-full gap-[50px]">
          <h2 className="font-roundo font-medium text-[45px] leading-[45px] tracking-[-0.9px] text-[#1A1A1A] max-w-[512px] capitalize">
            Proven Trust Value Modern Homes Leader
          </h2>
          <p className="font-sans font-normal text-[20px] leading-[21.8px] tracking-[-0.44px] text-black/60 max-w-[558px]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim.
          </p>
        </div>
      </div>

      {/* ── Feature Cards (Accordion Effect) ── */}
      <div className="w-full h-[352.5px] flex gap-[13px]">
        {cards.map((card, i) => (
          <div
            key={i}
            className="group relative flex-1 h-full rounded-[8px] overflow-hidden transition-all duration-700 ease-in-out hover:flex-[2] cursor-pointer"
          >
            {/* Background Image */}
            <Image
              src={card.img}
              alt={card.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />

            {/* Content Container */}
            <div className="absolute inset-0 p-[37.5px] flex flex-col ml-[10px]">
              {/* White Icon Box */}
              <div className="w-[46px] h-[46px] bg-white rounded-[5px] flex items-center justify-center mb-6 shadow-lg">
                <div className="text-[#334454] w-[20px] h-[34px] flex items-center justify-center">
                  {card.icon}
                </div>
              </div>

              {/* Text Content */}
              <div className="mt-auto">
                <h3 className="font-roundo font-medium text-[33px] leading-[37.95px] tracking-[-0.66px] text-white mb-4 max-w-[342px]">
                  {card.title}
                </h3>
                <p className="font-sans font-normal text-[15px] leading-[22.5px] text-white/80 max-w-[342px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 pointer-events-none">
                  {card.desc}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUs;