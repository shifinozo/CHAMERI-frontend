'use client';

import React, { useState } from 'react';
import Image from 'next/image';

const VillaPlansSection = () => {
  const [activeTab, setActiveTab] = useState('villas');

  return (
    <section className="w-full h-[925px] bg-[#EFEDE7] py-[60px] px-[76px] flex flex-col items-center">
      {/* ── Heading ──────────────────────────────────────────────────────── */}
      <h2 className="font-roundo font-medium text-[60px] leading-[66.14px] tracking-[-3.05px] text-black text-center mb-2">
        Luxury Villa Plans
      </h2>
      <p className="font-sans font-normal text-[20px] leading-[26.4px] tracking-[-0.44px] text-black/60 text-center mb-[60px] max-w-[440px]">
        Explore crafted villa spaces with modern comfort built beautifully
      </p>

      {/* ── Image Display with Overlay ────────────────────────────────────── */}
      <div className="relative w-full max-w-[1284.9px] aspect-[1284.9/719.92] rounded-[16px] overflow-hidden group">
        {/* Main Image */}
        <Image
          src={activeTab === 'villas' ? "/dummyimages/Overlay.png" : "/dummyimages/Frame 2121454280.png"}
          alt="Luxury Villa Plan"
          fill
          className="object-cover transition-all duration-700"
        />

        {/* ── Top Toggle Buttons ── */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 z-10 flex items-center gap-[14px]"
             style={{ height: '48.72px' }}>
          {/* Button 1: w-181.9, px-19.49, gap-13.92 */}
          <button
            onClick={() => setActiveTab('villas')}
            style={{ height: '48.72px', paddingTop: '12.53px', paddingBottom: '12.53px', paddingLeft: '19.49px', paddingRight: '19.49px', gap: '13.92px', borderRadius: '8.35px' }}
            className={`flex items-center justify-center transition-all shrink-0 backdrop-blur-md ${
              activeTab === 'villas' ? 'bg-[#2D3E50] text-white shadow-lg' : 'bg-white/10 text-white/80 hover:bg-white/20 hover:text-white'
            }`}
          >
            {/* White square: 14.4×14.4px, collapses to w-0 when inactive so text never touches border */}
            <div style={{ height: '14.4px', borderRadius: '2px', flexShrink: 0 }}
                 className={`bg-white transition-all duration-300 overflow-hidden ${activeTab === 'villas' ? 'w-[14.4px] opacity-100' : 'w-0 opacity-0'}`} />
            <span className="font-sans font-normal whitespace-nowrap" style={{ fontSize: '19.49px', lineHeight: '19.49px' }}>Kiwano Villas</span>
          </button>

          {/* Button 2: w-191.84, px-13.92 */}
          <button
            onClick={() => setActiveTab('villaments')}
            style={{ height: '48.72px', paddingTop: '12.53px', paddingBottom: '12.53px', paddingLeft: '19.49px', paddingRight: '19.49px', gap: '13.92px', borderRadius: '8.35px' }}
            className={`flex items-center justify-center transition-all shrink-0 backdrop-blur-md ${
              activeTab === 'villaments' ? 'bg-[#2D3E50] text-white shadow-lg' : 'bg-white/10 text-white/80 hover:bg-white/20 hover:text-white'
            }`}
          >
            {/* White square: 14.4×14.4px, collapses to w-0 when inactive so text never touches border */}
            <div style={{ height: '14.4px', borderRadius: '2px', flexShrink: 0 }}
                 className={`bg-white transition-all duration-300 overflow-hidden ${activeTab === 'villaments' ? 'w-[14.4px] opacity-100' : 'w-0 opacity-0'}`} />
            <span className="font-sans font-normal whitespace-nowrap" style={{ fontSize: '19.49px', lineHeight: '19.49px' }}>Kiwano Villaments</span>
          </button>
        </div>

        {/* ── Bottom Content Overlay ── */}
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-[80px] bg-gradient-to-t from-black/60 via-transparent to-transparent">
          <div className="flex flex-col items-center gap-[18.97px]">
            {/* Text: Geist 400, 20px, lh 19.6, ls -0.06, centered */}
            <p className="text-center text-white font-sans font-normal text-[20px] leading-[19.6px] tracking-[-0.06px] w-[575px]">
              Discover crafted living spaces where modern design meets timeless comfort for every family with smart layouts bright views and premium details built to inspire daily today always now us
            </p>

            {/* Button: w-167 h-52, #6B859E */}
            <div className="relative group/btn cursor-pointer" style={{ width: '167px', height: '52px' }}>
              <button className="w-full h-full flex items-center bg-[#6B859E] border border-white/30 rounded-[12px] text-white hover:bg-[#5a7187] transition-all duration-300 pl-[24px] pr-[52px]">
                <span className="font-outfit font-medium text-[16px] leading-[100%] whitespace-nowrap">Learn More</span>
              </button>
              <div className="absolute top-[8px] right-[8px] w-[36px] h-[36px] bg-[#EFEDE7] rounded-[8px] flex items-center justify-center pointer-events-none transition-colors duration-300 text-black">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VillaPlansSection;
