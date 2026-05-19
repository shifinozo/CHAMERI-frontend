'use client';

import React from 'react';

/**
 * Navbar — shared top navigation bar containing the Menu and Contact Us buttons.
 */
const Navbar = ({ opacity = 1 }) => {
  return (
    <div 
      className={`absolute top-0 left-0 w-full z-50 flex justify-center ${opacity > 0.05 ? 'pointer-events-auto' : 'pointer-events-none'}`}
      style={{ opacity, paddingTop: "14px", paddingBottom: "14px", paddingLeft: "80px", paddingRight: "80px" }}
    >
      <div className="flex items-center justify-between w-full max-w-[1280px]" style={{ height: "68.38px" }}>
        
        {/* Menu Button & Dropdown Container */}
        <div className="relative z-50 group" style={{ width: "125px", height: "56px" }}>
          
          {/* Expanding Morphing Container */}
          <div 
            className="absolute top-0 left-0 bg-[#1e293b]/40 backdrop-blur-md border border-white/10 text-white transition-all duration-[400ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] overflow-hidden w-[125px] h-[56px] group-hover:w-[260px] group-hover:h-[298px]"
            style={{ borderRadius: "10px", padding: "9px 10px" }}
          >
            {/* Inner Content Box */}
            <div 
              className="relative bg-[#334454] transition-all duration-[400ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] overflow-hidden w-[105px] h-[38px] group-hover:w-[240px] group-hover:h-[280px]" 
              style={{ borderRadius: "6px" }}
            >
              
              {/* Default State: "Menu" Icon & Text */}
              <div className="absolute inset-0 flex items-center justify-center gap-[10px] transition-opacity duration-300 opacity-100 group-hover:opacity-0 group-hover:pointer-events-none">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6B859E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{borderRadius: "10px"}}>
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
                <span style={{ fontFamily: "Geist, sans-serif", fontSize: "16px", fontWeight: 400, color: "white", textTransform: "capitalize", letterSpacing: "0%", lineHeight: "100%" }}>
                  Menu
                </span>
              </div>

              {/* Expanded State: Navigation Links */}
              <div className="absolute inset-0 flex flex-col transition-opacity duration-300 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto">
                {["Home", "About", "Project", "Service", "Gallery"].map((item) => (
                  <a 
                    key={item} 
                    href={`#${item.toLowerCase()}`} 
                    className="group/item flex items-center justify-between px-6 flex-1 text-[#6B859E] hover:text-white transition-colors"
                  >
                    <span style={{ fontFamily: "Geist, sans-serif", fontSize: "20px", fontWeight: 400, letterSpacing: "0.5px" }}>
                      {item}
                    </span>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-70 group-hover/item:opacity-100 transition-all group-hover/item:translate-x-1 duration-300">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </a>
                ))}
              </div>

            </div>
          </div>
        </div>
        
        {/* Center placeholder for logo to ensure justify-between works */}
        <div style={{ width: "117.08px", height: "68.38px", pointerEvents: "none" }} />

        {/* Contact Button */}
        <button 
          className="group flex items-center justify-between bg-white hover:bg-[#334454] transition-colors duration-300 overflow-hidden cursor-pointer border-none z-50"
          style={{ width: "150px", height: "52px", paddingLeft: "16px", paddingRight: "16px", borderRadius: "12px" }}
        >
          {/* Sliding text container */}
          <div 
            className="relative overflow-hidden"
            style={{ height: "23px", flex: 1 }}
          >
            <div className="flex flex-col transition-transform duration-[600ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:-translate-y-1/2">
              <span className="font-sans text-[16px] font-medium text-black whitespace-nowrap flex items-center" style={{ height: "23px" }}>
                Contact Us
              </span>
              <span className="font-sans text-[16px] font-medium text-white whitespace-nowrap flex items-center" style={{ height: "23px" }}>
                Contact Us
              </span>
            </div>
          </div>

          {/* Arrow icon box */}
          <div 
            className="relative overflow-hidden flex items-center justify-center shrink-0"
            style={{ width: "21px", height: "20px", marginLeft: "8px" }}
          >
            {/* Original Arrow - Flies out to the right */}
            <div className="absolute inset-0 flex items-center justify-center transition-transform duration-[600ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:translate-x-full">
              <svg width="21" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-black">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>

            {/* New Arrow - Comes in from the left */}
            <div className="absolute inset-0 flex items-center justify-center transition-transform duration-[600ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] -translate-x-full group-hover:translate-x-0">
              <svg width="21" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
