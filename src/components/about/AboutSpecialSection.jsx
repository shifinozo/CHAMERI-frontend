// 'use client';

// import React, { useRef, useState, useEffect } from 'react';
// import Image from 'next/image';

// const features = [
//   {
//     title: "Design-Driven, Modern Approach",
//     description: "With a portfolio of completed projects and collaborations with experienced architects, we bring proven expertise to every build. Our work speaks through real results, client satisfaction, and trust",
//     image: "/dummyimages/7bceb1a3a08e49797c18d0a236cd66cd0abf999b.png",
//   },
//   {
//     title: "Craftsmanship & Quality",
//     description: "With a portfolio of completed projects and collaborations with experienced architects, we bring proven expertise to every build. Our work speaks through real results, client satisfaction, and trust",
//     image: "/dummyimages/bd11f21b02ae4f903b7210b76ea2206cc20c36c4.png",
//   },
//   {
//     title: "Transparent Process",
//     description: "With a portfolio of completed projects and collaborations with experienced architects, we bring proven expertise to every build. Our work speaks through real results, client satisfaction, and trust",
//     image: "/dummyimages/bf12bde766c854698d73b4bc7a70a9d11df0362d.png",
//   },
//   {
//     title: "Collaborative Partnerships",
//     description: "With a portfolio of completed projects and collaborations with experienced architects, we bring proven expertise to every build. Our work speaks through real results, client satisfaction, and trust",
//     image: "/dummyimages/c3f97090bd5902d9623f1a815064ef2bf18aaa74.png",
//   },
//   {
//     title: "Timeless Architecture",
//     description: "With a portfolio of completed projects and collaborations with experienced architects, we bring proven expertise to every build. Our work speaks through real results, client satisfaction, and trust",
//     image: "/dummyimages/bf12bde766c854698d73b4bc7a70a9d11df0362d.png",
//   },
// ];

// /**
//  * AboutSpecialSection
//  * Fluid sticky scroll component.
//  * Design baseline : 1440px Figma canvas
//  * Fluid range     : 375px → 1920px
//  * Formula         : fluid_vw  = (value_at_1440 / 1440) * 100
//  *                   clamp_min = value_at_1440 * (375  / 1440)
//  *                   clamp_max = value_at_1440 * (1920 / 1440)
//  */
// export default function AboutSpecialSection() {
//   const containerRef = useRef(null);
//   const [activeIndex, setActiveIndex] = useState(0);

//   useEffect(() => {
//     const handleScroll = () => {
//       if (!containerRef.current) return;
//       const { top, height } = containerRef.current.getBoundingClientRect();
//       const windowHeight = window.innerHeight;

//       // The section height is 400vh. Scrollable distance is height - windowHeight.
//       const scrollableDistance = height - windowHeight;
//       if (scrollableDistance <= 0) return;

//       const scrolled = -top;

//       if (scrolled < 0) {
//         setActiveIndex(0);
//         return;
//       }
//       if (scrolled >= scrollableDistance) {
//         setActiveIndex(features.length - 1);
//         return;
//       }

//       const progress = scrolled / scrollableDistance;
//       const index = Math.min(
//         features.length - 1,
//         Math.floor(progress * features.length)
//       );
//       setActiveIndex(index);
//     };

//     window.addEventListener('scroll', handleScroll, { passive: true });
//     // Trigger once on mount to set initial state
//     handleScroll();

//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   return (
//     // Wrapper height creates the scrollable track for the sticky layout
//     <section ref={containerRef} style={{ height: '400vh', position: 'relative' }}>

//       {/* ── Sticky Viewport ────────────────────────────────────────────── */}
//       <div 
//         style={{
//           position: 'sticky',
//           top: 0,
//           height: '100vh',
//           width: '100%',
//           backgroundColor: '#EDE7DE',
//           overflow: 'hidden',
//           display: 'flex',
//           justifyContent: 'center',
//           alignItems: 'center',
//         }}
//       >
//         {/* ── Main Layout Container (1440x945 map) ────────────────────── */}
//         <div
//           style={{
//             width: '100%',
//             maxWidth: '1920px',
//             /* 945px @ 1440 → 65.625vw */
//             height: 'clamp(245px, 65.625vw, 1260px)',
//             /* paddingTop: 27px @ 1440 → 1.875vw */
//             paddingTop: 'clamp(7px, 1.875vw, 36px)',
//             /* paddingRight: 86px @ 1440 → 5.97vw */
//             paddingRight: 'clamp(22px, 5.97vw, 114px)',
//             /* paddingLeft: 85px @ 1440 → 5.90vw */
//             paddingLeft: 'clamp(22px, 5.90vw, 113px)',
//             boxSizing: 'border-box',
//             display: 'flex',
//             flexDirection: 'column',
//           }}
//         >
//           {/* Inner Content Wrapper (1269x603) */}
//           <div
//             style={{
//               width: '100%',
//               /* 603.45px @ 1440 → 41.9vw */
//               height: 'clamp(157px, 41.9vw, 804px)',
//               borderTop: '1px solid rgba(33, 35, 37, 0.2)',
//               position: 'relative',
//             }}
//           >
//             {/* ── Text Div ────────────────────────────────────────── */}
//             <div
//               style={{
//                 position: 'absolute',
//                 top: 'clamp(9px, 2.43vw, 46px)', // 35px
//                 left: 0,
//                 width: 'clamp(135px, 35.98vw, 691px)', // 518.25px
//                 height: 'clamp(4px, 1.13vw, 21px)', // 16.36px
//                 display: 'inline-flex',
//                 alignItems: 'center',
//                 gap: 'clamp(2px, 0.58vw, 11px)', // 8.41px
//               }}
//             >
//               <div
//                 style={{
//                   width: 'clamp(8px, 0.97vw, 18px)',
//                   height: 'clamp(8px, 0.97vw, 18px)',
//                   backgroundColor: '#334454',
//                   borderRadius: '3px',
//                 }}
//               />
//               <span
//                 style={{
//                   fontFamily: "var(--font-geist, 'Geist'), system-ui, sans-serif",
//                   fontWeight: 400,
//                   fontSize: 'clamp(11px, 1.125vw, 21px)',
//                   lineHeight: 1.2,
//                   letterSpacing: '-0.32px',
//                   textTransform: 'uppercase',
//                   color: '#1A1A1A',
//                 }}
//               >
//                 What makes us Special
//               </span>
//             </div>

//             {/* ── Title Div ────────────────────────────────────────── */}
//             <div
//               style={{
//                 position: 'absolute',
//                 top: 'clamp(9px, 2.43vw, 46px)', // 35px
//                 left: 'clamp(140px, 37.24vw, 715px)', // 536.25px
//                 width: 'clamp(190px, 50.88vw, 977px)', // 732.75px
//                 height: 'clamp(39px, 10.48vw, 201px)', // 151px
//                 display: 'flex',
//                 flexDirection: 'column',
//                 gap: 'clamp(4px, 1.25vw, 24px)', // 18px
//               }}
//             >
//               <h2
//                 style={{
//                   fontFamily: "var(--font-roundo, 'Roundo'), system-ui, sans-serif",
//                   fontWeight: 500,
//                   fontSize: 'clamp(32px, 4.16vw, 80px)',
//                   lineHeight: 1.1,
//                   letterSpacing: 'clamp(-3.05px, -0.21vw, -1px)',
//                   color: '#1A1A1A',
//                   margin: 0,
//                 }}
//               >
//                 Each project tells its own story of precision.
//               </h2>
//             </div>

//             {/* ── Third Div ───────────────────────────────────────────── */}
//             <div
//               style={{
//                 position: 'absolute',
//                 top: 'clamp(55px, 14.86vw, 285px)', // 214.08px
//                 left: 0,
//                 width: '100%',
//                 height: 'clamp(165px, 44.09vw, 846px)', // 634.95px
//                 paddingTop: 'clamp(8px, 2.15vw, 41px)', // 31px
//                 display: 'flex',
//                 flexDirection: 'column',
//               }}
//             >
//               {features.map((feature, index) => {
//                 const isActive = index === activeIndex;

//                 return (
//                   <div
//                     key={index}
//                     style={{
//                       width: '100%',
//                       /* 120.59px @ 1440 → 8.37vw */
//                       height: 'clamp(80px, 8.37vw, 160px)',
//                       display: 'flex',
//                       justifyContent: 'space-between',
//                       alignItems: 'center',
//                       /* 21.6px @ 1440 → 1.5vw */
//                       paddingTop: 'clamp(10px, 1.5vw, 28px)',
//                       paddingBottom: 'clamp(10px, 1.5vw, 28px)',
//                       borderBottom: '1px solid rgba(33, 35, 37, 0.1)',
//                       boxSizing: 'border-box',
//                       transition: 'opacity 0.4s ease',
//                       opacity: isActive ? 1 : 0.4,
//                     }}
//                   >
//                     {/* Left: Title (630px container width @ 1440) */}
//                     <div
//                       style={{
//                         /* 630px @ 1440 → 43.75vw */
//                         width: 'clamp(180px, 43.75vw, 840px)',
//                         flexShrink: 0,
//                       }}
//                     >
//                       <h3
//                         style={{
//                           fontFamily: "var(--font-roundo, 'Roundo'), system-ui, sans-serif",
//                           fontWeight: 500,
//                           /* 24px @ 1440 → 1.66vw */
//                           fontSize: 'clamp(16px, 1.66vw, 32px)',
//                           lineHeight: 1.08,
//                           color: '#1A1A1A',
//                           margin: 0,
//                         }}
//                       >
//                         {feature.title}
//                       </h3>
//                     </div>

//                     {/* Right: Description (639px container width @ 1440) */}
//                     <div
//                       style={{
//                         /* 639px @ 1440 → 44.37vw */
//                         width: 'clamp(180px, 44.37vw, 852px)',
//                         /* 9px horizontal padding @ 1440 → 0.62vw */
//                         padding: 'clamp(4px, 0.62vw, 12px)',
//                         backgroundColor: isActive ? 'rgba(33, 35, 37, 0.05)' : 'transparent',
//                         borderRadius: 'clamp(8px, 1.25vw, 24px)', // 18px @ 1440
//                         transition: 'background-color 0.4s ease',
//                       }}
//                     >
//                       <p
//                         style={{
//                           fontFamily: "var(--font-geist, 'Geist'), system-ui, sans-serif",
//                           fontWeight: 400,
//                           /* 18px @ 1440 → 1.25vw */
//                           fontSize: 'clamp(12px, 1.25vw, 24px)',
//                           lineHeight: 1.2,
//                           color: '#1A1A1A',
//                           margin: 0,
//                         }}
//                       >
//                         {feature.description}
//                       </p>
//                     </div>

//                     {/* Center Image overlapping between Title and Description */}
//                     <div
//                       style={{
//                         position: 'absolute',
//                         /* Gap between left title (236px) and right desc starts at ~630px */
//                         /* Image at roughly 350px left @ 1440 → 24.3vw */
//                         left: 'clamp(180px, 24.3vw, 466px)',
//                         /* Keep it visually centered in its row */
//                         top: '50%',
//                         transform: isActive ? 'translate(0, -50%)' : 'translate(-20px, -50%)',
//                         /* width 250px @ 1440 → 17.36vw */
//                         width: 'clamp(120px, 17.36vw, 333px)',
//                         /* aspect 250/313.56 */
//                         aspectRatio: '250 / 313.56',
//                         opacity: isActive ? 1 : 0,
//                         visibility: isActive ? 'visible' : 'hidden',
//                         transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
//                         zIndex: isActive ? 20 : 0,
//                         borderRadius: 'clamp(4px, 0.5vw, 10px)',
//                         overflow: 'hidden',
//                         pointerEvents: 'none',
//                         boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
//                       }}
//                     >
//                       <Image
//                         src={feature.image}
//                         alt={feature.title}
//                         fill
//                         className="object-cover"
//                         onError={(e) => {
//                           e.currentTarget.style.display = 'none';
//                         }}
//                       />
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// -----------------------------------

'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';

const features = [
  {
    title: "Design-Driven,\nModern Approach",
    description: "With A Portfolio Of Completed Projects And Collaborations With Experienced Architects, We Bring Proven Expertise To Every Build. Our Work Speaks Through Real Results, Client Satisfaction, And Trust",
    image: "/dummyimages/7bceb1a3a08e49797c18d0a236cd66cd0abf999b.png",
  },
  {
    title: "Design-Driven,\nModern Approach",
    description: "With A Portfolio Of Completed Projects And Collaborations With Experienced Architects, We Bring Proven Expertise To Every Build. Our Work Speaks Through Real Results, Client Satisfaction, And Trusted",
    image: "/dummyimages/bd11f21b02ae4f903b7210b76ea2206cc20c36c4.png",
  },
  {
    title: "Design-Driven,\nModern Approach",
    description: "With A Portfolio Of Completed Projects And Collaborations With Experienced Architects, We Bring Proven Expertise To Every Build. Our Work Speaks Through Real Results,",
    image: "/dummyimages/bf12bde766c854698d73b4bc7a70a9d11df0362d.png",
  },
  {
    title: "Proven Expertise\n& Trusted Network",
    description: "With A Portfolio Of Completed Projects And Collaborations With Experienced Architects, We Bring Proven Expertise To Every Build. Our Work Speaks Through Real Results, Client Satisfaction,",
    image: "/dummyimages/c3f97090bd5902d9623f1a815064ef2bf18aaa74.png",
  },
  {
    title: "Client-Centric, Seamless\nExperience",
    description: "With A Portfolio Of Completed Projects And Collaborations With Experienced Architects, We Bring Proven Expertise To Every Build. Our Work Speaks Through Real Results, Client Satisfaction, And Trusted",
    image: "/dummyimages/bf12bde766c854698d73b4bc7a70a9d11df0362d.png",
  },
];

/**
 * AboutSpecialSection
 * Sticky scroll component matching the Figma design.
 * Design baseline : 1440px
 * Fluid range     : 375px → 1920px
 *
 * Layout:
 *  - Left column   : feature titles (~30% width)
 *  - Center column : fixed image overlapping rows 1-4 (~25% width)
 *  - Right column  : descriptions (~40% width)
 *
 * Active row   → dark #1A1A1A color, full opacity
 * Inactive row → muted blue-grey #8A9BB0 color
 * Image        : stays fixed in place, does NOT move per row
 */
export default function AboutSpecialSection() {
  return (
    <section
      style={{
        width: '100%',
        backgroundColor: '#EDE7DE',
        display: 'flex',
        justifyContent: 'center',
        paddingBottom: 'clamp(50px, 5vw, 100px)',
      }}
    >
      {/* ── Page-width wrapper ──────────────────────────────────────── */}
      <div
        style={{
          width: '100%',
          maxWidth: '1920px',
          /* removed fixed height, let content dictate height */
          /* horizontal gutters: 85px@1440 → 5.9vw */
          paddingLeft: 'clamp(22px, 5.9vw, 113px)',
          paddingRight: 'clamp(22px, 5.9vw, 113px)',
          paddingTop: 'clamp(16px, 1.87vw, 36px)',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* ── Top border line ─────────────────────────────────────── */}
        <div style={{ borderTop: '1px solid rgba(33,35,37,0.2)', width: '100%' }} />

        {/* ── Header row: label (left) + title (right) ──────────────── */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            /* paddingTop 35px@1440 → 2.43vw */
            paddingTop: 'clamp(14px, 2.43vw, 46px)',
            /* paddingBottom 40px@1440 → 2.78vw */
            paddingBottom: 'clamp(16px, 2.78vw, 53px)',
          }}
        >
          {/* Label */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 'clamp(5px, 0.58vw, 11px)',
              /* left col ~30% matches feature title column */
              width: 'clamp(140px, 30vw, 576px)',
              flexShrink: 0,
              paddingTop: 'clamp(4px, 0.4vw, 8px)',
            }}
          >
            <div
              style={{
                width: 'clamp(8px, 0.97vw, 18px)',
                height: 'clamp(8px, 0.97vw, 18px)',
                backgroundColor: '#334454',
                borderRadius: '3px',
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontFamily: "var(--font-geist,'Geist'),system-ui,sans-serif",
                fontWeight: 400,
                fontSize: 'clamp(9px, 0.9vw, 17px)',
                lineHeight: 1.2,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: '#1A1A1A',
                whiteSpace: 'nowrap',
              }}
            >
              What Makes Us Special
            </span>
          </div>

          {/* Heading — right side, roughly 55% of row width */}
          <div style={{ width: 'clamp(300px, 45vw, 1000px)' }}>
            <h2
              style={{
                fontFamily: "var(--font-roundo,'Roundo'),system-ui,sans-serif",
                fontWeight: 500,
                /* 60px@1440 → 4.16vw */
                fontSize: 'clamp(28px, 4.16vw, 80px)',
                lineHeight: 1.08,
                letterSpacing: 'clamp(-2px, -0.18vw, -0.5px)',
                color: '#1A1A1A',
                margin: 0,
              }}
            >
              Each project tells its own story of&nbsp;precision.
            </h2>
          </div>
        </div>

        {/* ── Features area ─────────────────────────────────────────── */}
        {/*
              Three-column grid:
                [left-title] [center-image] [right-description]
              30% | 25% | 40%  (gaps fill the remaining ~5%)
              Image is absolutely positioned so it spans across the rows.
          */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            flex: 1,
          }}
        >


          {/* ── Feature rows ──────────────────────────────────────────── */}
          {features.map((feature, index) => {
            const color = '#1A1A1A';

            return (
              <div
                key={index}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  /* row height 100px@1440 → 6.94vw */
                  minHeight: 'clamp(68px, 7.5vw, 144px)',
                  paddingTop: 'clamp(8px, 1.18vw, 22px)',
                  paddingBottom: 'clamp(8px, 1.18vw, 22px)',
                  borderBottom: '1px solid rgba(33,35,37,0.12)',
                  boxSizing: 'border-box',
                  transition: 'color 0.4s ease',
                  position: 'relative',
                }}
              >
                {/* Left: Title — 30vw column */}
                <div
                  style={{
                    width: 'clamp(130px, 28vw, 537px)',
                    flexShrink: 0,
                  }}
                >
                  <h3
                    style={{
                      fontFamily: "var(--font-roundo,'Roundo'),system-ui,sans-serif",
                      fontWeight: 500,
                      /* 22px@1440 → 1.52vw */
                      fontSize: 'clamp(14px, 1.52vw, 29px)',
                      lineHeight: 1.2,
                      color,
                      margin: 0,
                      whiteSpace: 'pre-line',
                      transition: 'color 0.4s ease',
                    }}
                  >
                    {feature.title}
                  </h3>
                </div>

                {/*
                      Center gap: this spacer pushes description to the right,
                      letting the absolutely-positioned image sit in this space.
                      Width = image column = ~25vw
                  */}
                <div style={{ width: 'clamp(110px, 17vw, 326px)', flexShrink: 0 }} />

                {/* Image for this row */}
                <div
                  style={{
                    position: 'absolute',
                    left: 'clamp(200px, 22vw, 440px)',
                    bottom: '0px',
                    top: '-100px',
                    /* width 250px @ 1440 */
                    width: 'clamp(150px, 18.36vw, 250px)',
                    /* height 313.56px @ 1440 */
                    height: 'clamp(150px, 18.77vw, 313.56px)',
                    borderRadius: 'clamp(4px, 0.55vw, 10px)',
                    overflow: 'hidden',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.10)',
                    pointerEvents: 'none',
                  }}
                >
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    fill
                    style={{ objectFit: 'cover' }}
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  />
                </div>

                {/* Right: Description — remaining ~40vw */}
                <div
                  style={{
                    flex: 1,
                    paddingLeft: 'clamp(8px, 1vw, 19px)',
                  }}
                >
                  <p
                    style={{
                      fontFamily: "var(--font-geist,'Geist'),system-ui,sans-serif",
                      fontWeight: 400,
                      /* 16px@1440 → 1.11vw */
                      fontSize: 'clamp(11px, 1.11vw, 21px)',
                      width: 'clamp(150px, 40vw, 669px)',

                      lineHeight: 1.35,
                      color,
                      margin: 0,
                      transition: 'color 0.4s ease',
                    }}
                  >
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
