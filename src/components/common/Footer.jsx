'use client';

import React from 'react';
import Image from 'next/image';

const QUICK_LINKS = ['Home', 'About Us', 'Project', 'Service', 'Gallery', 'Contact Us'];

const Footer = () => {
  return (
    <footer className="w-full bg-[#334454] flex justify-center">
      {/* Main Container: w 1440, h 433.89 */}
      <div
        style={{
          width: '1440px',
          height: '433.89px',
          position: 'relative',
          // Optional padding top to match the design's vertical centering if needed,
          // but the spec dictates exact heights for the top divs, so we'll just position them at top: 0
        }}
      >
        {/* 2 Main Divs Row */}
        <div style={{ display: 'flex', width: '1440px', height: '377.48px' }}>
          
          {/* ══ FIRST MAIN DIV ══ */}
          {/* w 432, h 377.48, borders T/B/L */}
          <div
            style={{
              width: '432px',
              height: '377.48px',
              position: 'relative',
              borderTop: '0.75px solid rgba(255,255,255,0.1)',
              borderBottom: '0.75px solid rgba(255,255,255,0.1)',
              // borderLeft: '0.75px solid rgba(255,255,255,0.1)',
            }}
          >
            {/* Logo: w 138, h 183, top 96.49, left 143.63 */}
            <div
              style={{
                position: 'absolute',
                top: '96.49px',
                left: '143.63px',
                width: '138px',
                height: '183px',
              }}
            >
              <Image
                src="/dummyimages/logo (2).svg"
                alt="Chameri Logo"
                fill
                className="object-contain"
              />
            </div>
          </div>

          {/* ══ SECOND MAIN DIV ══ */}
          {/* w 1008, h 377.48, borders all around */}
          <div
            style={{
              width: '1008px',
              height: '377.48px',
              position: 'relative',
              border: '0.75px solid rgba(255,255,255,0.1)',
            }}
          >
            {/* Links Content Box: w 755.59, h 204.5, gap 89, top 46.25, left 73 */}
            <div
              style={{
                position: 'absolute',
                top: '46.25px',
                left: '73px',
                width: '755.59px',
                height: '204.5px',
                display: 'flex',
                gap: '89px',
              }}
            >
              {/* 1) Quick Links section: w 179, gap 25 */}
              <div style={{ width: '179px', height: '204.5px', display: 'flex', flexDirection: 'col', gap: '25px', flexWrap: 'wrap', alignContent: 'flex-start' }}>
                <h3 className="w-full text-white font-roundo font-medium text-[20px]">
                  Quick Links
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', width: '100%' }}>
                  {QUICK_LINKS.map((link) => (
                    <a
                      key={link}
                      href="#"
                      className="hover:text-white transition-colors"
                      style={{
                        fontFamily: 'var(--font-geist-sans), sans-serif',
                        fontWeight: 400,
                        fontSize: '16px',
                        lineHeight: '12px',
                        letterSpacing: '-1%',
                        color: 'rgba(237, 231, 222, 0.8)',
                        width: '179px',
                        height: '14.25px',
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      {link}
                    </a>
                  ))}
                </div>
              </div>

              {/* 2) Address section: w 199.29, h 113, gap 20 */}
              <div style={{ width: '199.29px', height: '113px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <h3 className="w-full text-white font-roundo font-medium text-[20px]">
                  Address
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--font-geist-sans), sans-serif',
                    fontWeight: 400,
                    fontSize: '15px',
                    lineHeight: '1.6',
                    color: 'rgba(237, 231, 222, 0.8)',
                  }}
                >
                  #27/205, Madapeedika, Paral (PO), Thalasserry, Kannur, Kerala, 670601
                </p>
              </div>

              {/* 3) Contact Us section: w 199.29, h 97, gap 20 */}
              <div style={{ width: '199.29px', height: '97px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <h3 className="w-full text-white font-roundo font-medium text-[20px]">
                  Contact Us
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <a
                    href="tel:+919188913114"
                    className="hover:text-white transition-colors"
                    style={{
                      fontFamily: 'var(--font-geist-sans), sans-serif',
                      fontWeight: 400,
                      fontSize: '15px',
                      color: 'rgba(237, 231, 222, 0.8)',
                    }}
                  >
                    +91 91889 13114
                  </a>
                  <a
                    href="tel:+919188913114"
                    className="hover:text-white transition-colors"
                    style={{
                      fontFamily: 'var(--font-geist-sans), sans-serif',
                      fontWeight: 400,
                      fontSize: '15px',
                      color: 'rgba(237, 231, 222, 0.8)',
                    }}
                  >
                    +91 91889 13114
                  </a>
                </div>
              </div>
            </div>

            {/* Social Icons Box: w 146, h 30, gap 14, top 315, left 795.82 */}
            <div
              style={{
                position: 'absolute',
                top: '315px',
                left: '795.82px',
                width: '146px',
                height: '30px',
                display: 'flex',
                gap: '14px',
                alignItems: 'center',
              }}
            >
              {[
                // Instagram
                <svg key="1" width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path fillRule="evenodd" clipRule="evenodd" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm3.98-10.181a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z" /></svg>,
                // Facebook
                <svg key="2" width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>,
                // YouTube
                <svg key="3" width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>,
                // Pinterest
                <svg key="4" width="26" height="26" viewBox="0 0 24 24" fill="currentColor"><path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.951-7.252 4.168 0 7.41 2.967 7.41 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.367 18.624 0 12.017 0z" /></svg>
              ].map((icon, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="hover:text-white hover:scale-110 transition-all flex items-center justify-center"
                  style={{
                    width: '23px',
                    height: '22px',
                    color: '#EDE7DE'
                  }}
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ── Bottom Section (Copyright) ── */}
        {/*
         * "© Chameri Builders pvt limited"
         * width: 171, height: 9
         * font: Geist 12px, lh 8.4px
         * Right aligned inside the main 1440 box (offset from the bottom)
         */}
        <div
          style={{
            position: 'absolute',
            bottom: '24px', // Approx positioning for the 56.41px remaining space
            right: '0px',
            width: '171px',
            height: '9px',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-geist-sans), sans-serif',
              fontWeight: 400,
              fontSize: '12px',
              lineHeight: '8.4px',
              color: 'rgba(237, 231, 222, 0.8)', // Matching the other text color for consistency
            }}
          >
            © Chameri Builders pvt limited
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;