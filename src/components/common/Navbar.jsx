'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

/**
 * Navbar — shared top navigation bar.
 * Designed to complement the CHAMERI brand palette (#334454 / #EDE7DE).
 */
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { label: 'Home',     href: '/' },
    { label: 'About',    href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Contact',  href: '/contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#334454]/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="w-full max-w-[1440px] mx-auto px-8 md:px-12 py-5 flex items-center justify-between">

        {/* Hamburger (mobile) */}
        <button
          className="flex items-center gap-2 px-4 py-2 bg-black/20 backdrop-blur-md border border-white/10 rounded-lg text-white cursor-pointer hover:bg-black/30 transition-all"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <span className="text-sm font-medium">Menu</span>
        </button>

        {/* Logo */}
        <Link href="/" className="flex flex-col items-center">
          <Image src="/dummyimages/logo.svg" alt="CHAMERI" width={120} height={40} className="brightness-0 invert" />
        </Link>

        {/* Desktop nav links */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-white/80 text-sm font-medium hover:text-white transition-colors tracking-wide uppercase"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Contact CTA */}
        <Link
          href="/contact"
          className="flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full font-medium hover:bg-zinc-100 transition-all text-sm"
        >
          Contact Us
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-[#334454]/95 backdrop-blur-md border-t border-white/10 px-8 py-6 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-white/80 text-base font-medium hover:text-white transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
