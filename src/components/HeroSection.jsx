import Image from "next/image";

/**
 * HeroSection — sticky full-viewport hero for the CHAMERI home page.
 *
 * Design canvas: 1440 × 1110 px
 * All absolute positions are expressed as percentages of that canvas so the
 * section scales proportionally on different viewport widths.
 */
export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative w-full overflow-hidden sticky top-0 aspect-[1440/1110]"
    >
      {/* ── Background image ───────────────────────────────────────────────── */}
      <Image
        src="/dummyimages/Frame 2121454280.png"
        alt="Chameri villa exterior"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[center_top]"
      />

      {/* ── Header Layer ───────────────────────────────────────────────────── */}
      <div className="absolute top-0 left-0 w-full px-12 py-8 flex items-center justify-between z-10">
        {/* Menu Button */}
        <div className="flex items-center gap-2 px-4 py-2 bg-black/20 backdrop-blur-md border border-white/10 rounded-lg text-white cursor-pointer hover:bg-black/30 transition-all">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <span className="text-sm font-medium">Menu</span>
        </div>

        {/* Logo */}
        <div className="flex flex-col items-center">
          <Image src="/dummyimages/logo.svg" alt="CHAMERI" width={120} height={40} className="brightness-0 invert" />
        </div>

        {/* Contact Button */}
        <div className="flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full font-medium hover:bg-zinc-100 transition-all cursor-pointer">
          <span>Contact Us</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </div>
      </div>

      {/* ── Headline: "Premium residence for those" ────────────────────────── */}
      {/* top: 602.47/1110 = 54.2766%, left: 329.5/1440 = 22.8819%, width: 780/1440 = 54.1667% */}
      <p className="absolute font-roundo font-medium text-white text-center whitespace-nowrap top-[54.2766%] left-[22.8819%] w-[54.1667%] text-[clamp(28px,4.2vw,60.41px)] leading-[64.08px] tracking-[-1.92px]">
        Premium residence for those
      </p>

      {/* ── Headline: "who seek refined living." ───────────────────────────── */}
      {/* top: 667.01/1110 = 60.0910%, left: 414.19/1440 = 28.7632%, width: 611/1440 = 42.4306% */}
      <p className="absolute font-roundo font-medium text-white text-center whitespace-nowrap top-[60.0910%] left-[28.7632%] w-[42.4306%] text-[clamp(28px,4.16vw,59.86px)] leading-[64.08px] tracking-[-1.92px]">
        who seek refined living.
      </p>

      {/* ── Horizontal divider ─────────────────────────────────────────────── */}
      {/* top: 866/1110 = 78.0180%, left: 672/1440 = 46.6667%, width: 701/1440 = 48.6806% */}
      <div className="absolute h-[1px] bg-white/45 top-[78.0180%] left-[46.6667%] w-[48.6806%]" />

      {/* ── "YOUR VILLA PARTNER" label ─────────────────────────────────────── */}
      {/* top: 884.38/1110 = 79.6739%, left: 674.79/1440 = 46.8604%, width: 170/1440 = 11.8056% */}
      <p className="absolute font-sans font-semibold text-white text-center uppercase whitespace-nowrap top-[79.6739%] left-[46.8604%] w-[11.8056%] text-[clamp(10px,0.97vw,14px)] leading-[16.38px] tracking-[1.26px]">
        Your Villa Partner
      </p>

      {/* ── Description text (bottom-right) ────────────────────────────────── */}
      {/* top: 866/1110 = 78.0180%, left: 1100/1440 = 76.3889%, width: 256/1440 = 17.7778% */}
      <p className="absolute font-sans font-normal text-white/85 top-[78.0180%] left-[76.3889%] w-[17.7778%] text-[clamp(11px,1.07vw,15.4px)] leading-[21px] tracking-normal">
        We design and install bespoke glass systems for ambitious architectural
        projects. Every pane reflects our commitment to clarity, quality, and
        collaboration.
      </p>
    </section>
  );
}
