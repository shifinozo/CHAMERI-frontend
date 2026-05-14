'use client';

import React, { useState } from 'react';
import Image from 'next/image';

const VillaPlansSection = () => {
  const [activeTab, setActiveTab] = useState('villas');

  return (
    <section className="w-full bg-[#EFEDE7] py-[60px] px-[76px] flex flex-col items-center">
      {/* ── Heading ──────────────────────────────────────────────────────── */}
      <h2 className="font-roundo font-medium text-[60px] leading-[66.14px] tracking-[-3.05px] text-black text-center mb-2">
        Luxury Villa Plans
      </h2>
      <p className="font-sans font-normal text-[20px] leading-[26.4px] tracking-[-0.44px] text-black/60 text-center mb-[37.79px] max-w-[440px]">
        Explore crafted villa spaces with modern comfort built beautifully
      </p>

      {/* ── Image Display with Overlay ────────────────────────────────────── */}
      <div className="relative w-[1284.9px] h-[719.92px] rounded-[16px] overflow-hidden group">
        {/* Main Image */}
        <Image
          src={activeTab === 'villas' ? "/dummyimages/Overlay.png" : "/dummyimages/Frame 2121454280.png"}
          alt="Luxury Villa Plan"
          fill
          className="object-cover transition-all duration-700"
        />

        {/* ── Top Toggle Buttons ── */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 z-10 flex items-center p-1 bg-black/10 backdrop-blur-md border border-white/20 rounded-[8px] gap-[14px] w-[387.74px] h-[48.72px]">
          <button
            onClick={() => setActiveTab('villas')}
            className={`w-[181.9px] h-[48.7px] rounded-[8.35px] text-[19.49px] font-sans flex items-center justify-center gap-[13.92px] transition-all ${
              activeTab === 'villas' ? 'bg-[#2D3E50] text-white shadow-lg' : 'text-white/80 hover:text-white'
            }`}
          >
            <div className={`w-2 h-2 rounded-sm bg-white ${activeTab === 'villas' ? 'opacity-100' : 'opacity-40'}`} />
            <span className="whitespace-nowrap">Kiwano Villas</span>
          </button>
          <button
            onClick={() => setActiveTab('villaments')}
            className={`w-[181.9px] h-[48.7px] rounded-[8.35px] text-[19.49px] font-sans flex items-center justify-center transition-all ${
              activeTab === 'villaments' ? 'bg-[#2D3E50] text-white shadow-lg' : 'text-white/80 hover:text-white'
            }`}
          >
            <span className="whitespace-nowrap">Kiwano Villaments</span>
          </button>
        </div>

        {/* ── Bottom Content Overlay ── */}
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-[60px] bg-gradient-to-t from-black/60 via-transparent to-transparent">
          <p className="w-[575.03px] text-center text-white text-[20px] leading-[19.6px] tracking-[-0.06px] font-sans mb-8">
            Discover crafted living spaces where modern design meets timeless comfort for every family with smart layouts bright views and premium details built to inspire daily today always now us
          </p>

          <div className="relative w-[169px] h-[52px]">
            <button className="w-full h-full flex items-center bg-[#6B859E] border border-white/30 rounded-[12px] text-white hover:bg-white hover:text-[#6B859E] transition-all group/btn pr-[48px] pl-4">
              <span className="text-[16px] font-sans font-medium whitespace-nowrap">Learn More</span>
            </button>
            <div className="absolute top-[8px] right-[8px] w-[36px] h-[36px] bg-[#6B859E] text-black rounded-[8px] flex items-center justify-center pointer-events-none group-hover/btn:bg-[#6B859E] group-hover/btn:text-white transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VillaPlansSection;
