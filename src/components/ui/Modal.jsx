'use client';

import React, { useEffect } from 'react';

/**
 * Modal — accessible dialog overlay.
 *
 * Props:
 *   isOpen    {boolean}   – controls visibility
 *   onClose   {function}  – called when backdrop or × is clicked
 *   title     {string}    – modal heading
 *   children  {ReactNode} – modal body content
 *   maxWidth  {string}    – tailwind max-w class (default 'max-w-lg')
 */
const Modal = ({ isOpen, onClose, title, children, maxWidth = 'max-w-lg' }) => {
  // Prevent body scroll while modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose?.(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        className={`relative w-full ${maxWidth} bg-[#EDE7DE] rounded-[16px] shadow-2xl p-8 flex flex-col gap-6 animate-[fadeInUp_0.25s_ease]`}
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          {title && (
            <h2
              id="modal-title"
              className="font-roundo font-medium text-[28px] leading-[1.2] tracking-[-0.5px] text-[#1A1A1A]"
            >
              {title}
            </h2>
          )}
          <button
            onClick={onClose}
            className="ml-auto w-9 h-9 rounded-full bg-[#334454]/10 hover:bg-[#334454]/20 flex items-center justify-center transition-colors"
            aria-label="Close modal"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#334454" strokeWidth="2.5">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="font-sans text-[16px] leading-[1.6] text-[#334454]/80">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
