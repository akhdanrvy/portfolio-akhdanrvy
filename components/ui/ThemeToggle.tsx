'use client';

import { motion } from 'framer-motion';
import { PiMoonFill, PiSunFill } from 'react-icons/pi';
import { useTheme } from '@/hooks/useTheme';

/* ─── Constants ──────────────────────────────────────────────────────────── */
const TRACK_STYLES = {
  dark: {
    background: 'rgba(255, 255, 255, 0.10)',
    border: '1px solid rgba(255, 255, 255, 0.15)',
  },
  light: {
    background: 'rgba(10, 10, 26, 0.08)',
    border: '1px solid rgba(10, 10, 26, 0.12)',
  },
} as const;

const INDICATOR_STYLES = {
  dark: { background: '#c9a84c' },   // gold — moon side
  light: { background: '#d4919e' },  // pink — sun side
} as const;

/* ─── Component ──────────────────────────────────────────────────────────── */
export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  const isDark = theme === 'dark';

  return (
    <button
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      onClick={toggleTheme}
      className="relative flex items-center rounded-full backdrop-blur-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1"
      style={{
        width: 56,
        height: 28,
        padding: 3,
        ...TRACK_STYLES[theme],
        transition: 'background 0.3s ease, border-color 0.3s ease',
      }}
    >
      {/* ── Sliding indicator ─────────────────────────────────────── */}
      <motion.span
        layoutId="theme-toggle-indicator"
        className="absolute top-0.75 flex items-center justify-center rounded-full"
        animate={{ x: isDark ? 28 : 0 }}
        transition={{ type: 'spring', stiffness: 400, damping: 32 }}
        style={{
          width: 22,
          height: 22,
          ...INDICATOR_STYLES[theme],
          transition: 'background 0.3s ease',
        }}
      >
        {/* ── Sun icon (light mode) ────────────────────────── */}
        <motion.span
          aria-hidden="true"
          className="absolute"
          animate={{ opacity: isDark ? 0 : 1, scale: isDark ? 0.5 : 1 }}
          transition={{ duration: 0.2 }}
        >
          <PiSunFill size={12} color="#0a0a1a" />
        </motion.span>

        {/* ── Moon icon (dark mode) ─────────────────────────── */}
        <motion.span
          aria-hidden="true"
          className="absolute"
          animate={{ opacity: isDark ? 1 : 0, scale: isDark ? 1 : 0.5 }}
          transition={{ duration: 0.2 }}
        >
          <PiMoonFill size={11} color="#0a0a1a" />
        </motion.span>
      </motion.span>

      {/* ── Track icons (decorative, behind the indicator) ────────── */}
      <span className="relative flex w-full items-center justify-between px-1.25">
        <motion.span
          aria-hidden="true"
          animate={{ opacity: isDark ? 0.35 : 0 }}
          transition={{ duration: 0.25 }}
        >
          <PiSunFill
            size={10}
            color={isDark ? 'rgba(255,255,255,0.8)' : 'rgba(10,10,26,0.5)'}
          />
        </motion.span>
        <motion.span
          aria-hidden="true"
          animate={{ opacity: isDark ? 0 : 0.35 }}
          transition={{ duration: 0.25 }}
        >
          <PiMoonFill
            size={10}
            color={isDark ? 'rgba(255,255,255,0.8)' : 'rgba(10,10,26,0.5)'}
          />
        </motion.span>
      </span>
    </button>
  );
}
