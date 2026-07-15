"use client";

import { useRef, useCallback } from "react";
import Image from "next/image";

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * ServicesOffered — "Our Services" header + horizontal-scroll service cards
 * ─────────────────────────────────────────────────────────────────────────────
 * Baseline viewport : 1440px  (design canvas: header 1440×247, cards 1440×494)
 * Fluid range       : 375px → 1920px
 *
 * clamp() formula
 *   vw_value = (DESIGN_PX / 1440) × 100
 *   result   = clamp(MOBILE_FLOOR, vw_value vw, DESKTOP_CEIL)
 * ─────────────────────────────────────────────────────────────────────────────
 */

const STATIC_SERVICES = [
  {
    number: "01.",
    title: "AC replacement and servicing",
    description:
      "Every Tropica home begins with thoughtful architecture. Spaces are designed to breathe with the tropics — open layouts, seamless indoor-outdoor flow, and timeless modern lines that frame the natural environment.",
    image: "/dummyimages/e9922a6e4df1537989a5aa9537cc175d7d5b4493.png",
  },
  {
    number: "02.",
    title: "MEP repair and maintenance",
    description:
      "Every Tropica home begins with thoughtful architecture. Spaces are designed to breathe with the tropics — open layouts, seamless indoor-outdoor flow, and timeless modern lines that frame the natural environment.",
    image: "/dummyimages/e9922a6e4df1537989a5aa9537cc175d7d5b4493.png",
  },
  {
    number: "03.",
    title: "General handyman solutions",
    description:
      "Every Tropica home begins with thoughtful architecture. Spaces are designed to breathe with the tropics — open layouts, seamless indoor-outdoor flow, and timeless modern lines that frame the natural environment.",
    image: "/dummyimages/68de01d498421b4e83d9a6e24ebe57bd5e9ea354.png",
  },
  {
    number: "04.",
    title: "Drywall and painting works",
    description:
      "Every Tropica home begins with thoughtful architecture. Spaces are designed to breathe with the tropics — open layouts, seamless indoor-outdoor flow, and timeless modern lines that frame the natural environment.",
    image: "/dummyimages/9cc8f812ff9a30e2649494975a6aa4e15be80110.png",
  },
  {
    number: "05.",
    title: "Plumbing and drainage solutions",
    description:
      "Every Tropica home begins with thoughtful architecture. Spaces are designed to breathe with the tropics — open layouts, seamless indoor-outdoor flow, and timeless modern lines that frame the natural environment.",
    image: "/dummyimages/8a51027ffc750b020c8330c0712fcccc89239b6a.jpg",
  },
  {
    number: "06.",
    title: "Landscaping and exterior finishing",
    description:
      "Every Tropica home begins with thoughtful architecture. Spaces are designed to breathe with the tropics — open layouts, seamless indoor-outdoor flow, and timeless modern lines that frame the natural environment.",
    image: "/dummyimages/3eafafff123ffeea63c4f0c4b3f28a865852219c.jpg",
  },
  {
    number: "07.",
    title: "Post-handover maintenance support",
    description:
      "Every Tropica home begins with thoughtful architecture. Spaces are designed to breathe with the tropics — open layouts, seamless indoor-outdoor flow, and timeless modern lines that frame the natural environment.",
    image: "/dummyimages/e9922a6e4df1537989a5aa9537cc175d7d5b4493.png",
  },
];

export default function ServicesOffered({ cardsSection }) {
  const heading = cardsSection?.heading || "Exceptional glazing for who build with vision.";
  const subheading =
    cardsSection?.subheading ||
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim.";

  const filledCards = cardsSection?.cards?.filter((c) => c.heading || c.subheading) || [];
  const services = filledCards.length
    ? filledCards.map((c, i) => ({
        number: String(i + 1).padStart(2, "0") + ".",
        title: c.heading,
        description: c.subheading,
        image: c.image || STATIC_SERVICES[i % STATIC_SERVICES.length]?.image,
      }))
    : STATIC_SERVICES;

  const trackRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const onMouseDown = useCallback((e) => {
    isDragging.current = true;
    startX.current = e.pageX - trackRef.current.offsetLeft;
    scrollLeft.current = trackRef.current.scrollLeft;
    trackRef.current.style.cursor = "grabbing";
  }, []);

  const onMouseLeave = useCallback(() => {
    isDragging.current = false;
    if (trackRef.current) trackRef.current.style.cursor = "grab";
  }, []);

  const onMouseUp = useCallback(() => {
    isDragging.current = false;
    if (trackRef.current) trackRef.current.style.cursor = "grab";
  }, []);

  const onMouseMove = useCallback((e) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const x = e.pageX - trackRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.2;
    trackRef.current.scrollLeft = scrollLeft.current - walk;
  }, []);

  const touchStartX = useRef(0);
  const touchScrollLeft = useRef(0);

  const onTouchStart = useCallback((e) => {
    touchStartX.current = e.touches[0].pageX;
    touchScrollLeft.current = trackRef.current.scrollLeft;
  }, []);

  const onTouchMove = useCallback((e) => {
    const diff = touchStartX.current - e.touches[0].pageX;
    trackRef.current.scrollLeft = touchScrollLeft.current + diff;
  }, []);

  return (
    <section style={{ width: "100%", background: "#EDE7DE" }}>
      {/* ══════════════════════════════════════════════════════════════════════
          HEADER ROW
          Figma: w:1440  h:247  pt:18 pr:40 pb:20 pl:47  border-top:1px
      ═══════════════════════════════════════════════════════════════════════ */}
      <div
        style={{
          width: "100%",
          paddingTop: "clamp(12px, 1.25vw, 18px)",
          paddingRight: "clamp(24px, 2.778vw, 40px)",
          paddingBottom: "clamp(14px, 1.389vw, 20px)",
          paddingLeft: "clamp(28px, 3.264vw, 47px)",
          borderTop: "1px solid rgba(0,0,0,0.08)",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "clamp(16px, 2.222vw, 32px)",
          }}
        >
          {/* ── LEFT: tag pill + heading ─────────────────────────────────── */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "clamp(6px, 0.694vw, 10px)",
              maxWidth: "clamp(280px, 55.66vw, 801.56px)",
            }}
          >
            {/* Tag pill: square + "OUR SERVICES" */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "clamp(4px, 1.5vw, 10.6px)",
                width: "fit-content",
              }}
            >
              <div
                style={{
                  width: "clamp(10px, 0.972vw, 14px)",
                  height: "clamp(10px, 0.972vw, 14px)",
                  background: "#334454",
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontFamily: "var(--font-geist-sans), 'Geist'",
                  fontWeight: 400,
                  fontSize: "clamp(11px, 1.125vw, 16.2px)",
                  lineHeight: "100%",
                  letterSpacing: "clamp(-0.32px, -0.0222vw, -0.15px)",
                  textTransform: "uppercase",
                  color: "#334454",
                  whiteSpace: "nowrap",
                }}
              >
                Our Services
              </span>
            </div>

            {/* Heading */}
            <h2
              style={{
                fontFamily: "var(--font-roundo), 'Roundo'",
                fontWeight: 450,
                fontSize: "clamp(30px, 4.167vw, 60px)",
                lineHeight: "clamp(36px, 4.593vw, 66.14px)",
                letterSpacing: "clamp(-3.05px, -0.212vw, -1.2px)",
                color: "#1A1A1A",
                margin: 0,
              }}
            >
              {heading}
            </h2>
          </div>

          {/* ── RIGHT: lorem paragraph ───────────────────────────────────── */}
          <p
            style={{
              fontFamily: "var(--font-geist-sans), 'Geist'",
              fontWeight: 400,
              fontSize: "clamp(13px, 1.389vw, 20px)",
              lineHeight: "clamp(15px, 1.514vw, 21.8px)",
              letterSpacing: "-0.44px",
              color: "#222F30CC",
              margin: 0,
              maxWidth: "clamp(240px, 32.056vw, 461.61px)",
            }}
          >
            {subheading}
          </p>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          HORIZONTAL SCROLL CARDS STRIP
          Figma: w:1440  h:494  |  track: w:3010 h:545  left:61
      ═══════════════════════════════════════════════════════════════════════ */}
      <div
        style={{
          width: "100%",
          height: "clamp(380px, 40.569vw, 601px)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          ref={trackRef}
          onMouseDown={onMouseDown}
          onMouseLeave={onMouseLeave}
          onMouseUp={onMouseUp}
          onMouseMove={onMouseMove}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            alignItems: "center",
            paddingLeft: "clamp(30px, 4.236vw, 61px)",
            paddingRight: "clamp(30px, 4.236vw, 61px)",
            overflowX: "auto",
            overflowY: "hidden",
            cursor: "grab",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch",
            boxSizing: "border-box",
            userSelect: "none",
          }}
        >
          {services.map((service, i) => (
            <ServiceCard key={service.number} service={service} isFirst={i === 0} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ service, isFirst }) {
  return (
    <div
      style={{
        width: "clamp(260px, 29.861vw, 430px)",
        height: "clamp(360px, 37.569vw, 521px)",
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        gap: "clamp(14px, 1.528vw, 22px)",
        paddingTop: "clamp(8px, 3.016vw, 20px)",
        paddingRight: "clamp(8px, 0.903vw, 13px)",
        paddingBottom: "clamp(24px, 3.056vw, 44px)",
        paddingLeft: "clamp(16px, 1.667vw, 24px)",
        borderLeft: "1px solid #00000047",
        background: "#EDE7DE",
        boxSizing: "border-box",
      }}
    >
      {/* Number + Title — fixed height (number line + 2-line title) so short
         headings never let the card content below shift upward */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "clamp(8px, 0.972vw, 14px)",
          paddingLeft: "clamp(6px, 0.694vw, 10px)",
          paddingRight: "clamp(6px, 0.694vw, 10px)",
          height: "clamp(72px, 7.806vw, 112.4px)",
          flexShrink: 0,
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-geist-sans), 'Geist'",
            fontWeight: 400,
            fontSize: "clamp(11px, 1.042vw, 15px)",
            lineHeight: "clamp(16px, 1.5625vw, 22.5px)",
            color: "#6B859E",
          }}
        >
          {service.number}
        </span>
        <h3
          style={{
            fontFamily: "var(--font-roundo), 'Roundo'",
            fontWeight: 500,
            fontSize: "clamp(20px, 2.292vw, 33px)",
            lineHeight: "clamp(24px, 2.635vw, 37.95px)",
            letterSpacing: "clamp(-0.66px, -0.0458vw, -0.3px)",
            color: "#1A1A1A",
            margin: 0,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {service.title}
        </h3>
      </div>

      {/* Description + Learn More — fixed height (4-line description) so
         short or long descriptions never move the image below */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1px",
          paddingLeft: "clamp(6px, 0.694vw, 10px)",
          paddingRight: "clamp(6px, 0.694vw, 10px)",
          height: "clamp(89px, 8.438vw, 121.5px)",
          flexShrink: 0,
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-geist-sans), 'Geist'",
            fontWeight: 400,
            fontSize: "clamp(11px, 1.042vw, 15px)",
            lineHeight: "clamp(16px, 1.5625vw, 22.5px)",
            color: "#000000CC",
            margin: 0,
            display: "-webkit-box",
            WebkitLineClamp: 4,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {service.description}
        </p>

        <button
          type="button"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "clamp(4px, 0.347vw, 5px)",
            paddingTop: "clamp(4px, 0.417vw, 6px)",
            paddingBottom: "clamp(4px, 0.417vw, 6px)",
            background: "none",
            border: "none",
            cursor: "pointer",
            width: "fit-content",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-geist-sans), 'Geist'",
              fontWeight: 400,
              fontSize: "clamp(11px, 1.042vw, 15px)",
              lineHeight: "clamp(16px, 1.5625vw, 22.5px)",
              color: "#1A1A1A",
              textDecoration: "underline",
            }}
          >
            Learn More
          </span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Image */}
      <div
        style={{
          position: "relative",
          width: "clamp(200px, 22.639vw, 326px)",
          height: "clamp(120px, 14.097vw, 203px)",
          borderRadius: "clamp(6px, 0.556vw, 8px)",
          overflow: "hidden",
          flexShrink: 0,
        }}
      >
        <Image
          src={service.image}
          alt={service.title}
          fill
          sizes="(max-width: 768px) 240px, 326px"
          style={{ objectFit: "cover" }}
        />
      </div>
    </div>
  );
}
