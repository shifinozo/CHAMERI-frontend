import React from 'react';

/**
 * Button — reusable CHAMERI-styled button with optional slide-text hover.
 *
 * Props:
 *   label      {string}    – button text
 *   onClick    {function}  – click handler
 *   variant    {'primary' | 'secondary' | 'outline'}
 *   href       {string}    – if provided, renders as <a>
 *   className  {string}    – additional tailwind classes
 *   arrow      {boolean}   – show arrow icon (default true)
 */
const Button = ({
  label = 'Learn More',
  onClick,
  variant = 'primary',
  href,
  className = '',
  arrow = true,
}) => {
  const base =
    'group relative inline-flex items-center justify-between gap-3 px-6 py-3 rounded-[12px] font-sans text-[15px] font-medium transition-all duration-300 overflow-hidden cursor-pointer';

  const variants = {
    primary:   'bg-[#6B859E] text-white hover:bg-[#334454] border border-transparent',
    secondary: 'bg-[#334454] text-white hover:bg-[#6B859E] border border-transparent',
    outline:   'bg-transparent text-[#334454] border border-[#334454]/30 hover:bg-[#334454] hover:text-white',
  };

  const arrowBox = (
    <div className="w-[30px] h-[30px] rounded-[7px] bg-white/20 group-hover:bg-white/30 flex items-center justify-center flex-shrink-0 transition-all duration-500">
      <svg
        width="14" height="14" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2.5"
        className="group-hover:translate-x-[2px] transition-transform duration-300"
      >
        <path d="M5 12h14M12 5l7 7-7 7" />
      </svg>
    </div>
  );

  const content = (
    <>
      {/* Slide-up text */}
      <div className="overflow-hidden h-[1.2em] flex-1 text-left">
        <div className="flex flex-col transition-transform duration-500 ease-in-out group-hover:-translate-y-full">
          <span className="whitespace-nowrap leading-[1.2em]">{label}</span>
          <span className="whitespace-nowrap leading-[1.2em]">{label}</span>
        </div>
      </div>
      {arrow && arrowBox}
    </>
  );

  if (href) {
    return (
      <a href={href} className={`${base} ${variants[variant]} ${className}`}>
        {content}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={`${base} ${variants[variant]} ${className}`}>
      {content}
    </button>
  );
};

export default Button;
