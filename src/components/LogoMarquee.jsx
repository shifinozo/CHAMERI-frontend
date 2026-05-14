import React from 'react';
import Image from 'next/image';

const LogoMarquee = () => {
  const logos = [
    '/dummyimages/Logo.png',
    '/dummyimages/Logo (1).png',
    '/dummyimages/Logo (2).png',
    '/dummyimages/Logo (3).png',
    '/dummyimages/Logo (4).png',
    '/dummyimages/Logo (5).png',
    '/dummyimages/Logo (6).png',
  ];

  // Multiple sets for seamless scroll
  const scrollLogos = [...logos, ...logos, ...logos, ...logos];

  return (
    <section className="w-full bg-[#EFEDE7] py-[60px] flex flex-col items-center justify-center overflow-hidden border-t border-black/5">
      <div className="w-full h-[111px] flex items-center overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap gap-[100px]">
          {scrollLogos.map((logo, index) => (
            <div key={index} className="flex-shrink-0 w-[172px] h-[40px] relative">
              <Image
                src={logo}
                alt={`Client Logo ${index}`}
                fill
                className="object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LogoMarquee;
