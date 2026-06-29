"use client";

import { useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";

const AmenityMapLeaflet = dynamic(() => import("./AmenityMapLeaflet"), { ssr: false });

const LEGEND_ITEMS = [
  { color: "#C9A96E", label: "Project Site",       svg: null },
  { color: "#DC2626", label: "Hospital",            svg: `<path d="M3 21h18"/><path d="M5 21V7l8-4v18"/><path d="M19 21V11l-6-2"/><path d="M9 11v4"/><path d="M7 13h4"/>` },
  { color: "#2563EB", label: "School / Education",  svg: `<path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>` },
  { color: "#7C3AED", label: "Airport",             svg: `<path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.2-1.1.6L3 8l5.5 4L5 15.5 3 15l-1 1 3 3 3 3 1-1-.5-2 3.5-3.5 4 5.5c.2.4.7.7 1.2.6l1.2-.7c.4-.2.7-.6.6-1.1z"/>` },
  { color: "#059669", label: "Transport",           svg: `<rect x="4" y="3" width="16" height="16" rx="2"/><path d="M4 11h16"/><path d="M12 3v8"/>` },
  { color: "#D97706", label: "Shopping",            svg: `<circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>` },
  { color: "#6B7280", label: "Highway",             svg: `<path d="M4 22L10 2"/><path d="M20 22L14 2"/><path d="M12 6v2"/><path d="M12 12v2"/>` },
];

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * KiwanoAmenities — Surrounding amenities list and map toggle
 * ─────────────────────────────────────────────────────────────────────────────
 */

const AMENITIES = [
  { id: 1, name: "Kannur international airport", time: "45 Minutes Away", icon: "airport", lat: 11.9161, lng: 75.5616 },
  { id: 2, name: "Aster MIMS Kannur", time: "25 Minutes Away", icon: "hospital", lat: 11.8906, lng: 75.3854 },
  { id: 3, name: "Chinmaya Vidyalaya", time: "25 Minutes Away", icon: "school", lat: 11.8950, lng: 75.3900 },
  { id: 4, name: "Ammayum Kunjum Hospital", time: "18 Minutes Away", icon: "hospital", lat: 11.8500, lng: 75.4000 },
  { id: 5, name: "Railway Station", time: "10 Minutes Away", icon: "train", lat: 11.8745, lng: 75.3704 },
  { id: 6, name: "Indira Gandhi Cooperative Hospital", time: "7 Minutes Away", icon: "hospital", lat: 11.8600, lng: 75.3800 },
  { id: 7, name: "Downtown Mall", time: "12 Minutes Away", icon: "cart", lat: 11.8700, lng: 75.3850 },
  { id: 8, name: "Amrita Vidyalayam", time: "15 Minutes Away", icon: "school", lat: 11.8800, lng: 75.3900 },
  { id: 9, name: "Mahe Dental College", time: "10 Minutes Away", icon: "tooth", lat: 11.7000, lng: 75.5300 },
  { id: 10, name: "Malabar Cancer Centre", time: "5 Minutes Away", icon: "hospital", lat: 11.7500, lng: 75.4900 },
  { id: 11, name: "Genesis International School", time: "4 Minutes Away", icon: "school", lat: 11.7600, lng: 75.5000 },
  { id: 12, name: "NH 66", time: "4 Minutes Away", icon: "road", lat: 11.7700, lng: 75.5100 },
];

/* ── SVG Icons ───────────────────────────────────────────────────────────── */

function IconWrapper({ children }) {
  return (
    <div style={{ width: "24px", height: "24px", display: "flex", alignItems: "center", justifyContent: "center" }}>
      {children}
    </div>
  );
}

function ListIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="8" y1="6" x2="21" y2="6"></line>
      <line x1="8" y1="12" x2="21" y2="12"></line>
      <line x1="8" y1="18" x2="21" y2="18"></line>
      <line x1="3" y1="6" x2="3.01" y2="6"></line>
      <line x1="3" y1="12" x2="3.01" y2="12"></line>
      <line x1="3" y1="18" x2="3.01" y2="18"></line>
    </svg>
  );
}

function MapIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"></polygon>
      <line x1="9" y1="3" x2="9" y2="18"></line>
      <line x1="15" y1="6" x2="15" y2="21"></line>
    </svg>
  );
}

function getAmenityIcon(type) {
  switch (type) {
    case "airport":
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#222F30" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.2-1.1.6L3 8l5.5 4L5 15.5 3 15l-1 1 3 3 3 3 1-1-.5-2 3.5-3.5 4 5.5c.2.4.7.7 1.2.6l1.2-.7c.4-.2.7-.6.6-1.1z"/>
        </svg>
      );
    case "hospital":
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#222F30" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 21h18" />
          <path d="M5 21V7l8-4v18" />
          <path d="M19 21V11l-6-2" />
          <path d="M9 11v4" />
          <path d="M7 13h4" />
        </svg>
      );
    case "school":
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#222F30" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
          <path d="M6 12v5c3 3 9 3 12 0v-5" />
        </svg>
      );
    case "train":
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#222F30" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="4" y="3" width="16" height="16" rx="2" />
          <path d="M4 11h16" />
          <path d="M12 3v8" />
          <path d="M8 19l-2 3" />
          <path d="M18 22l-2-3" />
          <path d="M8 15h0" />
          <path d="M16 15h0" />
        </svg>
      );
    case "cart":
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#222F30" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="9" cy="21" r="1" />
          <circle cx="20" cy="21" r="1" />
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
        </svg>
      );
    case "tooth":
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#222F30" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 20s-3-2-3-6a3 3 0 0 1 6 0c0 4-3 6-3 6Z" />
          <path d="M9 14s-3-2-3-6a3 3 0 0 1 6 0" />
          <path d="M15 14s3-2 3-6a3 3 0 0 0-6 0" />
        </svg>
      );
    case "road":
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#222F30" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 22L10 2" />
          <path d="M20 22L14 2" />
          <path d="M12 6v2" />
          <path d="M12 12v2" />
          <path d="M12 18v2" />
        </svg>
      );
    default:
      return null;
  }
}

export default function KiwanoAmenities({ amenities }) {
  const [viewMode, setViewMode] = useState("list"); // 'list' | 'map'
  const [activeLocation, setActiveLocation] = useState(null);

  const handleItemClick = (amenity) => {
    setActiveLocation(amenity);
    setViewMode("map");
  };

  return (
    <section
      style={{
        width: "100%",
        background: "#EDE7DE",
        paddingTop: "clamp(40px, 4.167vw, 60px)",
        paddingBottom: "clamp(40px, 4.167vw, 60px)",
        boxSizing: "border-box",
        overflowX: "hidden", // We'll handle horizontal scroll in the inner container
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "clamp(375px, 97.222vw, 1920px)",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: "clamp(20px, 2.08vw, 30px)",
          boxSizing: "border-box",
        }}
      >
        {/* ══════════════════════════════════════════════════════════════════
            HEADER
        ═══════════════════════════════════════════════════════════════════ */}
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "clamp(10px, 1.04vw, 15px)",
            paddingLeft: "clamp(20px, 3.96vw, 57px)",
            paddingRight: "clamp(20px, 3.96vw, 57px)",
            boxSizing: "border-box",
          }}
        >
          {/* Tag Pill */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "7.2px",
              padding: "5.4px 7.2px",
              borderRadius: "90px",
              background: "transparent",
              width: "fit-content",
            }}
          >
            <div
              style={{
                width: "clamp(14px, 14px, 14px)",
                height: "clamp(14px, 14px, 14px)",
                borderRadius: "3px",
                background: "#334454",
                padding: "3.6px",
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontFamily: "var(--font-geist-sans), 'Geist', system-ui, sans-serif",
                fontWeight: 400,
                fontSize: "clamp(12px, 1.125vw, 16px)",
                lineHeight: "19.44px",
                letterSpacing: "-0.32px",
                textTransform: "uppercase",
                color: "#222F30",
              }}
            >
              Surrounding Amenities
            </span>
          </div>

          {/* Title Row */}
          <div
            style={{
              width: "100%",
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "20px",
            }}
          >
            {/* Title */}
            <h2
              style={{
                fontFamily: "var(--font-roundo), 'Roundo', system-ui, sans-serif",
                fontWeight: 500,
                fontSize: "clamp(24px, 3.425vw, 60px)",
                lineHeight: "clamp(26px, 3.425vw, 60px)",
                letterSpacing: "-0.9px",
                color: "#222F30",
                maxWidth: "clamp(250px, 32.847vw, 473px)",
                margin: 0,
              }}
            >
              {amenities?.heading || 'Luxury Smart Living Villa Feature Hubs'}
            </h2>

            {/* Subtitle & Toggle */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "clamp(20px, 7.29vw, 105px)",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-geist-sans), 'Geist', system-ui, sans-serif",
                  fontWeight: 400,
                  fontSize: "clamp(14px, 1.389vw, 20px)",
                  lineHeight: "clamp(18px, 1.514vw, 21.8px)",
                  letterSpacing: "-0.44px",
                  color: "#222F30CC",
                  maxWidth: "clamp(300px, 41.667vw, 505px)",
                  margin: 0,
                }}
              >
                {amenities?.subheading || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim.'}
              </p>

              {/* Toggle Buttons */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "25px",
                  padding: "8px 12px",
                  borderRadius: "5px",
                  border: "1px solid #6B859E",
                  background: "transparent",
                }}
              >
                <button
                  onClick={() => setViewMode("list")}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    opacity: viewMode === "list" ? 1 : 0.48,
                    padding: 0,
                    color: "#222F30",
                    transition: "opacity 0.2s ease",
                  }}
                >
                  <IconWrapper><ListIcon /></IconWrapper>
                  <span
                    style={{
                      fontFamily: "var(--font-geist-sans), 'Geist', system-ui, sans-serif",
                      fontWeight: 400,
                      fontSize: "clamp(14px, 1.389vw, 20px)",
                      lineHeight: "21.8px",
                      letterSpacing: "-0.44px",
                    }}
                  >
                    List
                  </span>
                </button>

                <button
                  onClick={() => setViewMode("map")}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    opacity: viewMode === "map" ? 1 : 0.48,
                    padding: 0,
                    color: "#222F30",
                    transition: "opacity 0.2s ease",
                  }}
                >
                  <IconWrapper><MapIcon /></IconWrapper>
                  <span
                    style={{
                      fontFamily: "var(--font-geist-sans), 'Geist', system-ui, sans-serif",
                      fontWeight: 400,
                      fontSize: "clamp(14px, 1.389vw, 20px)",
                      lineHeight: "21.8px",
                      letterSpacing: "-0.44px",
                    }}
                  >
                    Map
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════════
            CONTENT AREA (LIST OR MAP)
        ═══════════════════════════════════════════════════════════════════ */}
        <div
          style={{
            width: "100%",
            position: "relative",
            minHeight: "400px",
            paddingTop: "10px",
            paddingBottom: "10px",
            boxSizing: "border-box",
          }}
        >
          {viewMode === "list" ? (
            /* ── LIST VIEW ─────────────────────────────────────────────────── */
            <div
              style={{
                width: "100%",
                overflowX: "auto",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                WebkitOverflowScrolling: "touch",
                paddingLeft: "clamp(20px, 3.96vw, 57px)",
                paddingRight: "clamp(20px, 3.96vw, 57px)",
                boxSizing: "border-box",
              }}
            >
              <div
                style={{
                  maxWidth: "clamp(100vw, 600px, 1920px)",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {/* We have 12 items. Render them in 3 rows of 4 items each */}
                {[0, 1, 2].map((rowIndex) => (
                  <div
                    key={rowIndex}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      borderBottom: "1px solid rgba(107, 133, 158, 0.2)",
                      paddingTop: "21.6px",
                      paddingBottom: "21.6px",
                    }}
                  >
                    {AMENITIES.slice(rowIndex * 4, rowIndex * 4 + 4).map((amenity) => (
                      <div
                        key={amenity.id}
                        onClick={() => handleItemClick(amenity)}
                        style={{
                          width: "clamp(260px, 36.111vw, 520px)",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "flex-start",
                          gap: "15px",
                          padding: "10px",
                          cursor: "pointer",
                          transition: "transform 0.2s ease",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-2px)")}
                        onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
                      >
                        {/* Icon & Title */}
                        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                          {getAmenityIcon(amenity.icon)}
                          <h3
                            style={{
                              fontFamily: "var(--font-roundo), 'Roundo', system-ui, sans-serif",
                              fontWeight: 500,
                              fontSize: "24px",
                              lineHeight: "25.92px",
                              color: "#222F30",
                              margin: 0,
                            }}
                          >
                            {amenity.name}
                          </h3>
                        </div>

                        {/* Distance & Underline */}
                        <div style={{ marginTop: "auto" }}>
                          <span
                            style={{
                              fontFamily: "var(--font-geist-sans), 'Geist', system-ui, sans-serif",
                              fontWeight: 400,
                              fontSize: "18px",
                              lineHeight: "100%",
                              color: "#222F30",
                              textTransform: "capitalize",
                              display: "block",
                              marginBottom: "8px",
                            }}
                          >
                            {amenity.time}
                          </span>
                          <div style={{ width: "100%", height: "1px", background: "rgba(34, 47, 48, 0.2)" }} />
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* ── MAP VIEW ──────────────────────────────────────────────────── */
            <div
              style={{
                width: "100%",
                height: "clamp(420px, 41.67vw, 600px)",
                borderRadius: "16px",
                position: "relative",
                overflow: "hidden",
                margin: "0 auto",
                maxWidth: "calc(100% - clamp(40px, 7.92vw, 114px))",
                boxShadow: "0 8px 40px rgba(34,47,48,.12)",
              }}
            >
              {/* Real Leaflet map */}
              <AmenityMapLeaflet amenities={AMENITIES} activeLocation={activeLocation} />

              {/* Legend overlay */}
              <div
                style={{
                  position:        "absolute",
                  bottom:          20,
                  left:            20,
                  zIndex:          1000,
                  background:      "rgba(237,231,222,.92)",
                  backdropFilter:  "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  borderRadius:    "12px",
                  padding:         "14px 16px",
                  border:          "1px solid rgba(107,133,158,.15)",
                  boxShadow:       "0 4px 20px rgba(34,47,48,.10)",
                  display:         "flex",
                  flexDirection:   "column",
                  gap:             "7px",
                  pointerEvents:   "none",
                  minWidth:        "160px",
                }}
              >
                <span
                  style={{
                    fontFamily:    "var(--font-geist-sans), system-ui, sans-serif",
                    fontSize:      "10px",
                    fontWeight:    600,
                    color:         "#334454",
                    letterSpacing: ".07em",
                    textTransform: "uppercase",
                    marginBottom:  "3px",
                  }}
                >
                  Legend
                </span>
                {LEGEND_ITEMS.map(({ color, label, svg }) => (
                  <div key={label} style={{ display: "flex", alignItems: "center", gap: "9px" }}>
                    <div
                      style={{
                        width:           "20px",
                        height:          "20px",
                        borderRadius:    "50%",
                        background:      color,
                        border:          "2px solid white",
                        flexShrink:      0,
                        boxShadow:       `0 2px 6px rgba(0,0,0,.18)`,
                        display:         "flex",
                        alignItems:      "center",
                        justifyContent:  "center",
                      }}
                    >
                      {svg ? (
                        <svg
                          width="11" height="11"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          dangerouslySetInnerHTML={{ __html: svg }}
                        />
                      ) : (
                        /* Project site — gold star dot */
                        <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "white" }} />
                      )}
                    </div>
                    <span
                      style={{
                        fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
                        fontSize:   "12px",
                        color:      "#222F30",
                        lineHeight: 1,
                      }}
                    >
                      {label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Active location badge */}
              {activeLocation && (
                <div
                  style={{
                    position:       "absolute",
                    top:            20,
                    left:           "50%",
                    transform:      "translateX(-50%)",
                    zIndex:         1000,
                    background:     "#222F30",
                    color:          "#EDE7DE",
                    padding:        "8px 18px",
                    borderRadius:   "24px",
                    fontSize:       "13px",
                    fontFamily:     "var(--font-geist-sans), system-ui, sans-serif",
                    whiteSpace:     "nowrap",
                    boxShadow:      "0 4px 16px rgba(34,47,48,.25)",
                    display:        "flex",
                    alignItems:     "center",
                    gap:            "7px",
                    pointerEvents:  "none",
                  }}
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                  {activeLocation.name} · {activeLocation.time}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
