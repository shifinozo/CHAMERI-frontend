'use client';

import React from 'react';

/**
 * ContactLocations component
 * Baseline viewport: 1440px
 */
export default function ContactLocations() {
  return (
    <section className="w-full flex justify-center bg-[#EDE7DE]">
      {/* Main Section Layout */}
      <div
        className="w-full flex flex-col"
        style={{
          maxWidth: 'clamp(680px, 110.167vw, 1920px)',
          paddingTop: 'clamp(32px, 4.167vw, 60px)',
          paddingBottom: 'clamp(40px, 5.556vw, 80px)',
          paddingLeft: 'clamp(20px, 5.278vw, 76px)',
          paddingRight: 'clamp(20px, 5.278vw, 76px)',
          gap: 'clamp(16px, 1.944vw, 28px)', // Outer gap

        }}
      >
        {/* Inner Content Layout */}
        <div
          className="w-full flex flex-col"
          style={{
            maxWidth: 'clamp(680px, 110.167vw, 1920px)',
            margin: '0 auto',
            gap: 'clamp(20px, 2.361vw, 34px)', // Inner gap
          }}
        >
          {/* Header Layout */}
          <div
            className="w-full flex flex-col md:flex-row md:items-center justify-between"
            style={{
              gap: '20px', // Fallback gap for mobile wrapping
            }}
          >
            {/* LOCATIONS label */}
            <div
              className="flex items-center"
              style={{
                gap: 'clamp(4px, 0.5vw, 7.2px)',
                paddingTop: '5.4px',
                paddingBottom: '5.4px',
                borderRadius: '90px',
                marginBottom: 'clamp(10px, 5.389vw, 50px)',
              }}
            >
              {/* Square icon */}
              <div
                style={{
                  width: 'clamp(10px, 0.972vw, 16px)',
                  height: 'clamp(10px, 0.972vw, 16px)',
                  borderRadius: '3px',
                  backgroundColor: '#334454',
                }}
              />
              <span
                className="uppercase"
                style={{
                  fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
                  fontWeight: 400,
                  fontSize: 'clamp(12px, 1.125vw, 20px)',
                  lineHeight: 'clamp(14px, 1.35vw, 22.44px)',
                  letterSpacing: 'clamp(-0.32px, -0.022vw, 0px)',
                  color: '#334454',
                }}
              >
                locations
              </span>
            </div>

            {/* Heading Text */}
            <h2
              style={{
                fontFamily: "var(--font-roundo), 'Roundo', system-ui, sans-serif",
                fontWeight: 500,
                fontSize: 'clamp(32px, 4.167vw, 64px)',
                lineHeight: 'clamp(38px, 4.593vw, 66.14px)',
                letterSpacing: 'clamp(-3.05px, -0.212vw, -1px)',
                color: '#171717',
                maxWidth: 'clamp(344.76px, 40.986vw, 700px)',
                margin: 0,
              }}
            >
              Elegant Spaces For Built Views Photo Frame
            </h2>
          </div>

          {/* Map Layout */}
          <div
            className="w-full relative overflow-hidden"
            style={{
              height: 'clamp(300px, 33.472vw, 650px)',
              borderRadius: '8px',
              backgroundColor: '#e5e7eb', // fallback skeleton color
            }}
          >
            <iframe
              title="Chameri Builders & Developers"
              src="https://www.google.com/maps?q=Chameri+Builders+%26+Developers,+27%2F205+Madapeedika,+Paral+(PO),+Thalassery,+Kannur,+Kerala+670601&ll=11.7485921,75.5322851&z=17&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0, display: 'block' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
