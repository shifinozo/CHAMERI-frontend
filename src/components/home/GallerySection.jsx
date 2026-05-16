'use client';

import React, { useState } from 'react';
import Image from 'next/image';

/* ─── Gallery data ───────────────────────────────────────────────────── */
const VILLAS = [
  { id: 1, name: 'VILLA 01', location: 'Calicut , Kerala', year: '2024', img: '/dummyimages/Frame 2121454280.png', alt: '/dummyimages/Container.png', side: 'left' },
  { id: 2, name: 'Villa 1', location: 'Calicut, Kerala', year: '2025', img: '/dummyimages/Container.png', alt: '/dummyimages/Overlay.png', side: 'right' },
  { id: 3, name: 'Villa No3', location: 'Calicut, Kerala', year: '2025', img: '/dummyimages/Overlay.png', alt: '/dummyimages/Frame 2121454280.png', side: 'left' },
  { id: 4, name: 'Villa No4', location: 'Calicut, Kerala', year: '2024', img: '/dummyimages/Container.png', alt: '/dummyimages/Overlay.png', side: 'right' },
  { id: 5, name: 'Villa No5', location: 'Lorum Ipsum sit', year: '2025', img: '/dummyimages/Overlay.png', alt: '/dummyimages/Container.png', side: 'right' },
  { id: 6, name: 'Villa No6', location: 'Lorum Ipsum sit consit', year: '2024', img: '/dummyimages/Frame 2121454280.png', alt: '/dummyimages/Overlay.png', side: 'left' },
  { id: 7, name: 'Villa No7', location: 'Lorum Ipsum consit', year: '2023', img: '/dummyimages/Container.png', alt: '/dummyimages/Frame 2121454280.png', side: 'right' },
];

/* ─── Single Gallery Card ────────────────────────────────────────────── */
const GalleryCard = ({ villa }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative group cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image container */}
      <div className="relative w-full overflow-hidden rounded-[4px]"
        style={{ aspectRatio: '375/300' }}>
        <Image
          src={hovered ? villa.alt : villa.img}
          alt={villa.name}
          fill
          className="object-cover transition-all duration-700 ease-in-out"
        />

        {/* "View Project" overlay on hover */}
        <div className={`absolute inset-0 bg-black/20 flex items-center justify-center transition-opacity duration-500 ${hovered ? 'opacity-100' : 'opacity-0'}`}>
          <div className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-md border border-white/40 rounded-[8px] text-white text-[14px] font-sans">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect width="18" height="18" x="3" y="3" rx="2" />
              <path d="M3 9h18M9 21V9" />
            </svg>
            View Project
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Caption */}
      <div className="flex items-center justify-between mt-3 px-1">
        <p className="font-sans text-[13px] text-[#334454]/80">
          <span className="font-medium text-[#334454]">{villa.name}</span>
          <span className="mx-1">—</span>
          <span className="italic">{villa.location}</span>
        </p>
        <span className="font-sans text-[13px] text-[#334454]/60">{villa.year}</span>
      </div>
    </div>
  );
};

/* ─── Slide-text "Learn More" Button ────────────────────────────────── */
const LearnMoreButton = () => (
  <button className="group relative w-[167px] h-[52px] flex items-center justify-between px-5 bg-transparent border border-[#334454]/30 rounded-[12px] overflow-hidden hover:bg-[#334454] transition-colors duration-500">
    {/* Sliding text */}
    <div className="overflow-hidden h-[1.2em] flex-1 text-left">
      <div className="flex flex-col transition-transform duration-500 ease-in-out group-hover:-translate-y-full">
        <span className="font-sans text-[15px] font-medium text-[#334454] group-hover:text-white whitespace-nowrap leading-[1.2em]">
          Learn More
        </span>
        <span className="font-sans text-[15px] font-medium text-white whitespace-nowrap leading-[1.2em]">
          Learn More
        </span>
      </div>
    </div>

    {/* Arrow icon box */}
    <div className="w-[30px] h-[30px] rounded-[7px] bg-[#334454] group-hover:bg-white flex items-center justify-center flex-shrink-0 transition-all duration-500">
      <svg
        width="14" height="14" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2.5"
        className="text-white group-hover:text-[#334454] transition-colors duration-500 group-hover:translate-x-[2px] transition-transform"
      >
        <path d="M5 12h14M12 5l7 7-7 7" />
      </svg>
    </div>
  </button>
);

/* ─── Main GallerySection ────────────────────────────────────────────── */
const GallerySection = () => {
  return (
    <section className="w-full bg-[#EDE7DE] pt-[80px] pb-[100px]">
      <div className="w-full max-w-[1555px]  h-[2850px] mx-auto px-[40px] md:px-[80px]">

        {/* ── Header Row ── */}
        <div className="w-full max-w-[1555px] flex flex-col lg:flex-row lg:items-start gap-8 mb-[70px]">
          <div className="flex-shrink-0 flex items-center gap-[7.2px] mt-2">
            <div className="w-[14px] h-[14px] bg-[#334454] rounded-[3px] flex-shrink-0" />
            <span className="font-sans font-normal text-[14px] uppercase tracking-wider text-[#334454]">Gallery</span>
          </div>
          <h2 className="font-roundo font-medium text-[48px] md:text-[60px] leading-[66.14px] tracking-[-3.05px] text-[#1A1A1A] max-w-[668px]">
            Elegant Spaces For Built Views Photo Frame
          </h2>
          <p className="font-sans font-normal text-[20px] leading-[21.8px] tracking-[-0.44px] text-[#334454]/70 max-w-[264px] lg:ml-auto lg:mt-2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          </p>
        </div>

        {/* ── Staggered Gallery Grid ── */}
        <div className="w-full flex flex-col gap-[50px]">
          <div className="grid grid-cols-2 gap-x-[72px]">
            <div><GalleryCard villa={VILLAS[0]} /></div>
            <div className="pt-[160px]"><GalleryCard villa={VILLAS[1]} /></div>
          </div>
          <div className="grid grid-cols-2 gap-x-[72px]">
            <div><GalleryCard villa={VILLAS[2]} /></div>
            <div className="pt-[160px]"><GalleryCard villa={VILLAS[3]} /></div>
          </div>
          <div className="grid grid-cols-2 gap-x-[72px]">
            <div />
            <div><GalleryCard villa={VILLAS[4]} /></div>
          </div>
          <div className="grid grid-cols-2 gap-x-[72px]">
            <div><GalleryCard villa={VILLAS[5]} /></div>
            <div className="pt-[80px]"><GalleryCard villa={VILLAS[6]} /></div>
          </div>
        </div>

        {/* ── Learn More Button ── */}
        <div className="flex justify-center mt-[80px]">
          <LearnMoreButton />
        </div>

      </div>
    </section>
  );
};

export default GallerySection;
