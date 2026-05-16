/**
 * utils.js — shared utility helpers for CHAMERI.
 */

/**
 * Combine class names (like clsx but tiny).
 * Usage: cn('base', condition && 'extra', 'always')
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

/**
 * Clamp a number between min and max.
 */
export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

/**
 * Format a number with a leading zero (e.g. 3 → "03").
 */
export function pad(n) {
  return String(n).padStart(2, '0');
}

/**
 * Truncate a string to `maxLength` chars with an ellipsis.
 */
export function truncate(str, maxLength = 100) {
  if (!str) return '';
  return str.length > maxLength ? str.slice(0, maxLength).trimEnd() + '…' : str;
}

/**
 * Debounce a function.
 */
export function debounce(fn, delay = 200) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}
