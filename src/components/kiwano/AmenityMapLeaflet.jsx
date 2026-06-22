"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export const TYPE_COLORS = {
  airport:  "#7C3AED",
  hospital: "#DC2626",
  school:   "#2563EB",
  train:    "#059669",
  cart:     "#D97706",
  tooth:    "#0891B2",
  road:     "#6B7280",
};

const ICON_SVG = {
  airport: `<path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.2-1.1.6L3 8l5.5 4L5 15.5 3 15l-1 1 3 3 3 3 1-1-.5-2 3.5-3.5 4 5.5c.2.4.7.7 1.2.6l1.2-.7c.4-.2.7-.6.6-1.1z"/>`,
  hospital:`<path d="M3 21h18"/><path d="M5 21V7l8-4v18"/><path d="M19 21V11l-6-2"/><path d="M9 11v4"/><path d="M7 13h4"/>`,
  school:  `<path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>`,
  train:   `<rect x="4" y="3" width="16" height="16" rx="2"/><path d="M4 11h16"/><path d="M12 3v8"/><path d="M8 19l-2 3"/><path d="M18 22l-2-3"/>`,
  cart:    `<circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>`,
  tooth:   `<path d="M12 20s-3-2-3-6a3 3 0 0 1 6 0c0 4-3 6-3 6Z"/><path d="M9 14s-3-2-3-6a3 3 0 0 1 6 0"/><path d="M15 14s3-2 3-6a3 3 0 0 0-6 0"/>`,
  road:    `<path d="M4 22L10 2"/><path d="M20 22L14 2"/><path d="M12 6v2"/><path d="M12 12v2"/><path d="M12 18v2"/>`,
};

const PROJECT_CENTER = [11.755, 75.498];

function createMarkerIcon(type, isActive) {
  const color   = TYPE_COLORS[type] || "#334454";
  const sz      = isActive ? 48 : 38;
  const iconSz  = isActive ? 20 : 16;
  const paths   = ICON_SVG[type] || "";

  return L.divIcon({
    html: `
      <div style="
        width:${sz}px;height:${sz}px;
        background:${color};
        border-radius:50%;
        border:3px solid white;
        display:flex;align-items:center;justify-content:center;
        box-shadow:0 4px 14px rgba(0,0,0,.22)${isActive ? `,0 0 0 7px ${color}30` : ""};
      ">
        <svg
          width="${iconSz}" height="${iconSz}"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          stroke-width="1.8"
          stroke-linecap="round"
          stroke-linejoin="round"
        >${paths}</svg>
      </div>`,
    className: "",
    iconSize:    [sz, sz],
    iconAnchor:  [sz / 2, sz / 2],
    popupAnchor: [0, -(sz / 2 + 10)],
  });
}

function getProjectIcon() {
  return L.divIcon({
    html: `
      <div style="position:relative;width:44px;height:44px;display:flex;align-items:center;justify-content:center;">
        <div class="kiwano-map-pulse" style="position:absolute;inset:0;border-radius:50%;background:rgba(201,169,110,.25);"></div>
        <div style="width:22px;height:22px;background:#C9A96E;border-radius:50%;border:3px solid white;
          box-shadow:0 3px 14px rgba(201,169,110,.55);position:relative;z-index:1;"></div>
      </div>`,
    className: "",
    iconSize:    [44, 44],
    iconAnchor:  [22, 22],
    popupAnchor: [0, -28],
  });
}

function MapController({ activeLocation }) {
  const map = useMap();
  useEffect(() => {
    if (activeLocation) {
      map.flyTo([activeLocation.lat, activeLocation.lng], 14, { duration: 1.5, easeLinearity: 0.25 });
    } else {
      map.flyTo(PROJECT_CENTER, 11, { duration: 1 });
    }
  }, [activeLocation, map]);
  return null;
}

function InjectStyles() {
  useEffect(() => {
    if (document.getElementById("kiwano-map-css")) return;
    const el = document.createElement("style");
    el.id = "kiwano-map-css";
    el.textContent = `
      @keyframes kiwanoPulse {
        0%   { transform:scale(1); opacity:.65; }
        70%  { transform:scale(2.4); opacity:0; }
        100% { transform:scale(1); opacity:0; }
      }
      .kiwano-map-pulse { animation: kiwanoPulse 2.4s ease-out infinite; }

      .am-popup .leaflet-popup-content-wrapper {
        background:#FAFAF8;border-radius:14px;padding:0;
        box-shadow:0 8px 32px rgba(34,47,48,.12);
        border:1px solid rgba(107,133,158,.12);min-width:190px;
      }
      .am-popup .leaflet-popup-content { margin:0; }
      .am-popup .leaflet-popup-tip-container { margin-top:-1px; }
      .am-popup .leaflet-popup-tip { background:#FAFAF8; }
      .am-popup .leaflet-popup-close-button {
        color:#334454;font-size:18px;top:10px;right:12px;line-height:1;
      }
      .am-popup .leaflet-popup-close-button:hover { color:#222F30; }

      .leaflet-control-zoom {
        border:none!important;
        box-shadow:0 2px 14px rgba(34,47,48,.10)!important;
        border-radius:10px!important;overflow:hidden!important;
        margin-right:20px!important;margin-bottom:20px!important;
      }
      .leaflet-control-zoom a {
        background:white!important;color:#222F30!important;
        border:none!important;
        border-bottom:1px solid rgba(107,133,158,.12)!important;
        width:36px!important;height:36px!important;line-height:36px!important;
        font-size:20px!important;font-weight:300!important;
      }
      .leaflet-control-zoom a:last-child { border-bottom:none!important; }
      .leaflet-control-zoom a:hover { background:#EDE7DE!important; }
      .leaflet-control-attribution {
        background:rgba(237,231,222,.88)!important;
        backdrop-filter:blur(6px)!important;
        font-size:9px!important;color:#6B859E!important;
        border-radius:8px 0 0 0!important;padding:3px 8px!important;
      }
      .leaflet-control-attribution a { color:#6B859E!important; }
    `;
    document.head.appendChild(el);
    return () => document.getElementById("kiwano-map-css")?.remove();
  }, []);
  return null;
}

export default function AmenityMapLeaflet({ amenities, activeLocation }) {
  const projectIcon = getProjectIcon();

  return (
    <MapContainer
      center={PROJECT_CENTER}
      zoom={11}
      scrollWheelZoom={false}
      zoomControl={true}
      style={{ width: "100%", height: "100%" }}
    >
      <InjectStyles />
      <MapController activeLocation={activeLocation} />

      {/* CartoDB Positron — clean, minimal, premium */}
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions" target="_blank">CARTO</a>'
        subdomains="abcd"
        maxZoom={20}
      />

      {/* Project site pin */}
      <Marker position={PROJECT_CENTER} icon={projectIcon}>
        <Popup className="am-popup">
          <div style={{ padding: "16px 20px", fontFamily: "system-ui, sans-serif" }}>
            <div style={{ fontSize: "10px", fontWeight: 600, color: "#C9A96E", letterSpacing: ".07em", textTransform: "uppercase", marginBottom: "5px" }}>
              Project Site
            </div>
            <div style={{ fontSize: "16px", fontWeight: 700, color: "#222F30", marginBottom: "4px" }}>
              Kiwano Villas
            </div>
            <div style={{ fontSize: "12px", color: "#6B859E", marginBottom: "12px" }}>
              Mahe, Kerala
            </div>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${PROJECT_CENTER[0]},${PROJECT_CENTER[1]}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display:        "flex",
                alignItems:     "center",
                gap:            "6px",
                fontSize:       "12px",
                fontWeight:     600,
                color:          "white",
                background:     "#C9A96E",
                padding:        "7px 12px",
                borderRadius:   "8px",
                textDecoration: "none",
                width:          "fit-content",
              }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
              Open in Google Maps
            </a>
          </div>
        </Popup>
      </Marker>

      {/* Amenity markers */}
      {amenities.map((a) => {
        const isActive   = activeLocation?.id === a.id;
        const accentColor = TYPE_COLORS[a.icon] || "#334454";
        const mapsUrl    = `https://www.google.com/maps/search/?api=1&query=${a.lat},${a.lng}&query_place_id=${encodeURIComponent(a.name)}`;
        return (
          <Marker
            key={a.id}
            position={[a.lat, a.lng]}
            icon={createMarkerIcon(a.icon, isActive)}
          >
            <Popup className="am-popup">
              <div style={{ padding: "16px 20px", fontFamily: "system-ui, sans-serif" }}>
                {/* Type badge */}
                <div style={{
                  display:       "inline-block",
                  fontSize:      "10px",
                  fontWeight:    600,
                  color:         accentColor,
                  background:    accentColor + "18",
                  padding:       "2px 10px",
                  borderRadius:  "20px",
                  letterSpacing: ".04em",
                  textTransform: "capitalize",
                  marginBottom:  "9px",
                }}>
                  {a.icon}
                </div>

                {/* Name */}
                <div style={{ fontSize: "15px", fontWeight: 600, color: "#222F30", lineHeight: 1.3, marginBottom: "7px" }}>
                  {a.name}
                </div>

                {/* Travel time */}
                <div style={{ fontSize: "12px", color: "#6B859E", display: "flex", alignItems: "center", gap: "5px", marginBottom: "13px" }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                  </svg>
                  {a.time}
                </div>

                {/* Google Maps CTA */}
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display:        "flex",
                    alignItems:     "center",
                    gap:            "6px",
                    fontSize:       "12px",
                    fontWeight:     600,
                    color:          "white",
                    background:     accentColor,
                    padding:        "7px 12px",
                    borderRadius:   "8px",
                    textDecoration: "none",
                    width:          "fit-content",
                  }}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                  Open in Google Maps
                </a>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}
