'use client';

import React, { useState } from 'react';

const FAQS = [
  {
    q: 'Lorem ipsum dolor sit amet, consect ?',
    a: 'Lorem ipsum dolor sit amet. Rem adipisci voluptatem vel dolorem velit est distinctio nulla ut natus quod. Est quia nulla est delenitiRem adipisci voluptatem',
  },
  { q: 'Lorem ipsum dolor sit amet, consect ?', a: 'Lorem ipsum dolor sit amet. Rem adipisci voluptatem vel dolorem velit est distinctio nulla ut natus quod. Est quia nulla est delenitiRem adipisci voluptatem' },
  { q: 'Lorem ipsum dolor sit amet, consect ?', a: 'Lorem ipsum dolor sit amet. Rem adipisci voluptatem vel dolorem velit est distinctio nulla ut natus quod. Est quia nulla est delenitiRem adipisci voluptatem' },
  { q: 'Lorem ipsum dolor sit amet, consect ?', a: 'Lorem ipsum dolor sit amet. Rem adipisci voluptatem vel dolorem velit est distinctio nulla ut natus quod. Est quia nulla est delenitiRem adipisci voluptatem' },
  { q: 'Lorem ipsum dolor sit amet, consect?',  a: 'Lorem ipsum dolor sit amet. Rem adipisci voluptatem vel dolorem velit est distinctio nulla ut natus quod. Est quia nulla est delenitiRem adipisci voluptatem' },
  { q: 'Lorem ipsum dolor sit amet, consect ?', a: 'Lorem ipsum dolor sit amet. Rem adipisci voluptatem vel dolorem velit est distinctio nulla ut natus quod. Est quia nulla est delenitiRem adipisci voluptatem' },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(0);
  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    /*
     * Main layout: max-w 1600, px 70, py 60, gap 24
     */
    <section
      className="w-full bg-[#EDE7DE]"
      style={{ maxWidth: '1600px', margin: '0 auto' }}
    >
      <div
        className="w-full flex flex-col items-center"
        style={{ padding: '60px 70px', gap: '24px' }}
      >

        {/* ══ 1st div — Header (w 1300, h 171.8, gap 16) ══════════════ */}
        <div
          className="flex flex-col items-center text-center"
          style={{ width: '100%', maxWidth: '1300px', gap: '16px' }}
        >
          {/* FAQ Badge */}
          <div className="flex items-center gap-[7.2px]">
            <div className="w-[14px] h-[14px] bg-[#334454] rounded-[3px] flex-shrink-0" />
            <span
              className="font-sans font-normal uppercase text-[#334454]"
              style={{ fontSize: '14px', letterSpacing: '1px' }}
            >
              FAQ
            </span>
          </div>

          {/* Heading */}
          <h2
            className="font-roundo font-medium text-[#1A1A1A]"
            style={{ fontSize: '60px', lineHeight: '60px', letterSpacing: '-0.9px' }}
          >
            Frequent Asked Questions
          </h2>

          {/* Sub-heading */}
          <p
            className="font-sans font-normal text-[#334454]/70"
            style={{ fontSize: '20px', lineHeight: '26.4px', letterSpacing: '-0.44px', maxWidth: '608px' }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          </p>
        </div>

        {/* ══ 2nd div — FAQ accordion (w 1200, h 511) ═════════════════ */}
        <div
          className="flex items-center justify-center"
          style={{ width: '100%', maxWidth: '1200px' }}
        >
          {/* Inner: w 1126, gap 8 */}
          <div
            className="flex flex-col"
            style={{ width: '100%', maxWidth: '1126px', gap: '8px' }}
          >
            {FAQS.map((faq, i) => {
              const isOpen = openIndex === i;
              return (
                <div key={i}>
                  {/*
                   * Question row: w 1126, h 58, border-radius 4px
                   * bg: #6B859E
                   */}
                  <button
                    onClick={() => toggle(i)}
                    className="w-full flex items-center justify-between text-left"
                    style={{
                      height: '58px',
                      borderRadius: isOpen ? '4px 4px 0 0' : '4px',
                      backgroundColor: '#6B859E',
                      paddingLeft: '16px',
                      paddingRight: '16px',
                    }}
                  >
                    {/*
                     * Question text: w 400, Geist 400 22px, lh 26.4, ls -0.44
                     */}
                    <span
                      style={{
                        fontFamily: 'var(--font-geist-sans), sans-serif',
                        fontWeight: 400,
                        fontSize: '22px',
                        lineHeight: '26.4px',
                        letterSpacing: '-0.44px',
                        color: '#fff',
                      }}
                    >
                      {faq.q}
                    </span>

                    {/* Toggle button: w 32, h 32, r 8, p 8 */}
                    <div
                      className="flex-shrink-0 flex items-center justify-center bg-white"
                      style={{ width: '32px', height: '32px', borderRadius: '8px', padding: '8px' }}
                    >
                      <svg
                        width="16" height="16" viewBox="0 0 24 24" fill="none"
                        stroke="#334454" strokeWidth="2.5"
                        strokeLinecap="round" strokeLinejoin="round"
                        className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
                      >
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    </div>
                  </button>

                  {/*
                   * Answer panel: w 1110, pt 23.3, pr 16, pb 24, pl 16, r 4
                   * bg: #334454 (darker shade when expanded)
                   * Answer text: Geist 400 18px, lh 21.6, ls -0.36
                   */}
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[200px] opacity-100' : 'max-h-0 opacity-0'}`}
                  >
                    <div
                      style={{
                        backgroundColor: '#334454',
                        borderRadius: '0 0 4px 4px',
                        paddingTop: '23.3px',
                        paddingRight: '16px',
                        paddingBottom: '24px',
                        paddingLeft: '16px',
                      }}
                    >
                      <p
                        style={{
                          fontFamily: 'var(--font-geist-sans), sans-serif',
                          fontWeight: 400,
                          fontSize: '18px',
                          lineHeight: '21.6px',
                          letterSpacing: '-0.36px',
                          color: 'rgba(255,255,255,0.85)',
                          maxWidth: '825.3px',
                        }}
                      >
                        {faq.a}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};

export default FAQSection;
