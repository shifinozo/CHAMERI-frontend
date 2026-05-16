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
    <section className="w-full bg-[#EFEDE7] py-[60px] flex flex-col items-center justify-center overflow-hidden">
      <div className="w-[1200px] h-[111px] flex items-center overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap gap-[100px]">
          {scrollLogos.map((logo, index) => (
            <div key={index} className="flex-shrink-0 w-[169px] h-[30px] relative">
              <Image
                src={logo}
                alt={`Client Logo ${index}`}
                fill
                className="object-contain grayscale opacity-100"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LogoMarquee;
