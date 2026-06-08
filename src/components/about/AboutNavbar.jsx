'use client';

import Image from 'next/image';
import Link from 'next/link';

/**
 * AboutNavbar — Sticky navigation bar for the About Us page.
 *
 * Figma specs:
 *   width: 1440   height: 84
 *   padding: 14px 80px
 *   background: #D8D8D8
 *   position: sticky  top: 0
 *
 * Layout: Menu (left) | Logo (center) | Contact Us (right)
 */
export default function AboutNavbar() {
  return (
    <nav
      style={{
        position: 'sticky',
        top: 0,
        left: 0,
        width: '100%',
        height: '84px',
        background: '#D8D8D8',
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: '14px',
        paddingBottom: '14px',
        paddingLeft: 'clamp(16px, 5.56vw, 80px)',
        paddingRight: 'clamp(16px, 5.56vw, 80px)',
        gap: '10px',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          maxWidth: '1280px',
          height: '56px',
        }}
      >
        {/* ── Left: Menu Button ────────────────────────────────────────────── */}
        <div className="relative z-50 group" style={{ width: '125px', height: '56px' }}>
          {/* Expanding Morphing Container */}
          <div
            className="absolute top-0 left-0 bg-[#1e293b]/40 backdrop-blur-md border border-white/10 text-white transition-all duration-[400ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] overflow-hidden w-[125px] h-[56px] group-hover:w-[260px] group-hover:h-[298px]"
            style={{ borderRadius: '10px', padding: '9px 10px' }}
          >
            {/* Inner Content Box */}
            <div
              className="relative bg-[#334454] transition-all duration-[400ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] overflow-hidden w-[105px] h-[38px] group-hover:w-[240px] group-hover:h-[280px]"
              style={{ borderRadius: '6px' }}
            >
              {/* Default State: Menu icon + text */}
              <div className="absolute inset-0 flex items-center justify-center gap-[10px] transition-opacity duration-300 opacity-100 group-hover:opacity-0 group-hover:pointer-events-none">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#6B859E"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ borderRadius: '10px' }}
                >
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
                <span
                  style={{
                    fontFamily: 'Geist, sans-serif',
                    fontSize: '16px',
                    fontWeight: 400,
                    color: 'white',
                    textTransform: 'capitalize',
                    letterSpacing: '0%',
                    lineHeight: '100%',
                  }}
                >
                  Menu
                </span>
              </div>

              {/* Expanded State: Nav links */}
              <div className="absolute inset-0 flex flex-col transition-opacity duration-300 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto">
                {[
                  { label: 'Home', href: '/' },
                  { label: 'About', href: '/about' },
                  { label: 'Project', href: '/#gallery' },
                  { label: 'Service', href: '/#services' },
                  { label: 'Gallery', href: '/#gallery' },
                ].map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="group/item flex items-center justify-between px-6 flex-1 text-[#6B859E] hover:text-white transition-colors"
                  >
                    <span
                      style={{
                        fontFamily: 'Geist, sans-serif',
                        fontSize: '20px',
                        fontWeight: 400,
                        letterSpacing: '0.5px',
                      }}
                    >
                      {item.label}
                    </span>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="opacity-70 group-hover/item:opacity-100 transition-all group-hover/item:translate-x-1 duration-300"
                    >
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Center: Logo ─────────────────────────────────────────────────── */}
        <Link
          href="/"
          style={{
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '6px',
            textDecoration: 'none',
            pointerEvents: 'auto',
          }}
        >
          {/* Logo mark */}
          <div style={{ position: 'relative', width: '34px', height: '38px' }}>
            <Image
              src="/icons/logo (6).svg"
              alt="Chameri mark"
              fill
              sizes="40px"
              style={{ objectFit: 'contain' }}
              priority
            />
          </div>
          {/* Wordmark */}
          <div style={{ position: 'relative', width: '100px', height: '13px' }}>
            <Image
              src="/icons/logo (7).svg"
              alt="CHAMERI"
              fill
              sizes="120px"
              style={{ objectFit: 'contain' }}
              priority
            />
          </div>
        </Link>

        {/* ── Right: Contact Us Button ─────────────────────────────────────── */}
        <button
          className="group flex items-center justify-between bg-white hover:bg-[#334454] transition-colors duration-300 overflow-hidden cursor-pointer border-none z-50"
          style={{
            width: '150px',
            height: '52px',
            paddingLeft: '16px',
            paddingRight: '16px',
            borderRadius: '12px',
          }}
          onClick={() => {
            // Navigate to contact section on homepage or open contact modal
            window.location.href = '/#contact';
          }}
        >
          {/* Sliding text */}
          <div className="relative overflow-hidden" style={{ height: '23px', flex: 1 }}>
            <div className="flex flex-col transition-transform duration-[600ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:-translate-y-1/2">
              <span
                className="font-sans text-[16px] font-medium text-black whitespace-nowrap flex items-center"
                style={{ height: '23px' }}
              >
                Contact Us
              </span>
              <span
                className="font-sans text-[16px] font-medium text-white whitespace-nowrap flex items-center"
                style={{ height: '23px' }}
              >
                Contact Us
              </span>
            </div>
          </div>

          {/* Arrow icon */}
          <div
            className="relative overflow-hidden flex items-center justify-center shrink-0"
            style={{ width: '21px', height: '20px', marginLeft: '8px' }}
          >
            {/* Original arrow — flies out right on hover */}
            <div className="absolute inset-0 flex items-center justify-center transition-transform duration-[600ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:translate-x-full">
              <svg
                width="21"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-black"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>
            {/* New arrow — comes in from left on hover */}
            <div className="absolute inset-0 flex items-center justify-center transition-transform duration-[600ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] -translate-x-full group-hover:translate-x-0">
              <svg
                width="21"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-white"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </button>
      </div>
    </nav>
  );
}
