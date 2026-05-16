'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

/**
 * ThemeContext — provides light/dark theme preference across the app.
 *
 * Usage:
 *   const { theme, toggleTheme } = useTheme();
 */
const ThemeContext = createContext({
  theme: 'light',
  toggleTheme: () => {},
});

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');

  // Sync with localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('chameri-theme');
    if (stored === 'dark' || stored === 'light') {
      setTheme(stored);
    }
  }, []);

  // Apply theme class to <html>
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('chameri-theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === 'light' ? 'dark' : 'light'));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}

export default ThemeContext;
