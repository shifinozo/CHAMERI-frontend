import React from 'react';

const AboutSection = () => {
  return (
    <section className="w-full bg-[#EFEDE7] flex flex-col items-center overflow-hidden gap-[190px]">
      {/* ── Top Section (About Us + Headlines) ───────────────────────────── */}
      <div className="w-full max-w-[1440px] px-[50px] pt-[150px] flex justify-between items-start relative gap-[50px]">
        {/* About Us Badge (Far Left) */}
        <div className="flex items-center gap-[7.2px] px-[7.2px] py-[2px] border border-black/20 rounded-[90px] flex-shrink-0">
          <div className="w-2 h-2 bg-black rounded-sm" />
          <span className="text-[12px] font-sans font-medium uppercase tracking-wider text-black/60">About Us</span>
        </div>

        {/* Headlines (Aligned to Right) */}
        <div className="flex flex-col gap-0 max-w-[1000px] text-right">
          <h2 className="font-roundo font-medium text-[48px] leading-[57.6px] tracking-[-2.4px] text-[#6B7E8F] capitalize">
            We’re create luxury trusted modern builders
          </h2>
          <p className="font-roundo font-medium text-[48px] leading-[57.6px] tracking-[-2.4px] text-[#6B7E8F] lowercase">
            creating timeless spaces for future through smart we build modern luxury homes with trusted the design craft every detail matters day MOVE choice.
          </p>
        </div>
      </div>

      {/* ── Stats Section (Spaced Out) ────────────────────────────────────── */}
      <div className="w-full max-w-[1440px] px-[66px] py-[80px] flex justify-between items-center gap-[20px]">
        {[
          { val: "30%", label: "Lorem ipsum dolor" },
          { val: "20%", label: "Lorem ipsum" },
          { val: "25%", label: "Lorem ipsum dolor" },
          { val: "96%", label: "Lorem ipsum dolor sit" },
        ].map((stat, i) => (
          <div key={i} className="flex flex-col items-start min-w-[200px]">
            <span className="font-roundo font-medium text-[45px] leading-[45px] tracking-[-0.9px] text-[#1A1A1A]">
              {stat.val}
            </span>
            <span className="font-sans font-normal text-[16px] leading-[19.44px] tracking-[-0.32px] text-black/60 mt-2">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AboutSection;
