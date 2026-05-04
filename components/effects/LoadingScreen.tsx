'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

/* ─── Falling sakura petals ──────────────────────────────────────────────── */
const PETALS = [
  { left: '10%', delay: 0,    dur: 3.2 },
  { left: '25%', delay: 0.6,  dur: 2.8 },
  { left: '45%', delay: 0.2,  dur: 3.5 },
  { left: '62%', delay: 0.9,  dur: 2.6 },
  { left: '78%', delay: 0.4,  dur: 3.0 },
  { left: '90%', delay: 1.1,  dur: 2.9 },
];

function SakuraPetal({ left, delay, dur }: { left: string; delay: number; dur: number }) {
  return (
    <motion.div
      aria-hidden="true"
      className="absolute top-0 select-none pointer-events-none"
      style={{ left }}
      initial={{ y: -50, opacity: 0, rotate: -20 }}
      animate={{ y: '105vh', opacity: [0, 0.55, 0.55, 0], rotate: 340 }}
      transition={{ duration: dur, delay, ease: 'linear', repeat: Infinity, repeatDelay: 1 }}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M12 2 C8 2 4 6 4 10 C4 14 8 16 12 22 C16 16 20 14 20 10 C20 6 16 2 12 2Z" fill="#f4b8c1" opacity="0.6"/>
        <path d="M12 4 C10 7 8 9 9 12" stroke="#c9a84c" strokeWidth="0.6" opacity="0.45"/>
      </svg>
    </motion.div>
  );
}

/* ─── Loading Screen ─────────────────────────────────────────────────────── */
export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const DURATION = 2200;
    const start = performance.now();
    let raf: number;
    const tick = (now: number) => {
      const p = Math.min(100, Math.round(((now - start) / DURATION) * 100));
      setProgress(p);
      if (p < 100) {
        raf = requestAnimationFrame(tick);
      } else {
        setTimeout(onComplete, 350);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onComplete]);

  const r = 80;
  const circumference = 2 * Math.PI * r;

  return (
    <motion.div
      className="fixed inset-0 flex flex-col items-center justify-center overflow-hidden"
      style={{
        zIndex: 9999,
        backgroundColor: '#0a0a1a',
        backgroundImage: [
          'radial-gradient(ellipse 70% 50% at 30% 30%, rgba(244,184,193,0.07) 0%, transparent 60%)',
          'radial-gradient(ellipse 60% 40% at 70% 70%, rgba(201,168,76,0.05) 0%, transparent 55%)',
        ].join(', '),
      }}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.55, ease: 'easeInOut' } }}
    >
      {PETALS.map((p, i) => (
        <SakuraPetal key={i} {...p} />
      ))}

      <div className="relative flex flex-col items-center gap-7">

        {/* Ink circle + monogram */}
        <div className="relative flex items-center justify-center" style={{ width: 288, height: 288 }}>
          <svg
            viewBox="0 0 200 200"
            className="absolute inset-0 m-auto pointer-events-none"
            width="288"
            height="288"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="inkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f4b8c1" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#c9a84c" stopOpacity="0.7" />
              </linearGradient>
            </defs>
            <circle cx="100" cy="100" r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
            <circle
              cx="100" cy="100" r={r}
              fill="none"
              stroke="url(#inkGrad)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={circumference * (1 - progress / 100)}
              style={{ transform: 'rotate(-90deg)', transformOrigin: '100px 100px', transition: 'stroke-dashoffset 0.08s linear' }}
            />
          </svg>

          {/* Corner brackets */}
          {([
            { top: 16, left: 16, borderTop: '1px solid', borderLeft: '1px solid' },
            { top: 16, right: 16, borderTop: '1px solid', borderRight: '1px solid' },
            { bottom: 16, left: 16, borderBottom: '1px solid', borderLeft: '1px solid' },
            { bottom: 16, right: 16, borderBottom: '1px solid', borderRight: '1px solid' },
          ] as React.CSSProperties[]).map((s, i) => (
            <motion.div
              key={i}
              aria-hidden="true"
              className="absolute"
              style={{ width: 22, height: 22, borderColor: 'rgba(201,168,76,0.45)', ...s }}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + i * 0.08, duration: 0.35 }}
            />
          ))}

          {/* Monogram */}
          <motion.div
            className="flex flex-col items-center gap-1"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.55, delay: 0.3, ease: 'easeOut' }}
          >
            <span style={{ fontFamily: 'var(--font-noto-serif-jp,"Noto Serif JP",serif)', fontSize: '3rem', lineHeight: 1, color: '#c9a84c', userSelect: 'none' }}>
              匠
            </span>
            <span style={{ fontFamily: 'var(--font-noto-serif-jp,"Noto Serif JP",serif)', fontSize: '1rem', fontWeight: 700, letterSpacing: '0.35em', color: 'rgba(255,255,255,0.88)', userSelect: 'none', textTransform: 'uppercase' }}>
              RVY
            </span>
          </motion.div>
        </div>

        {/* Progress bar */}
        <motion.div
          className="flex flex-col items-center gap-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.45 }}
        >
          <div style={{ width: 192, height: 1, borderRadius: 9999, background: 'rgba(255,255,255,0.10)', overflow: 'hidden', position: 'relative' }}>
            <div style={{ position: 'absolute', inset: 0, borderRadius: 9999, width: `${progress}%`, background: 'linear-gradient(90deg,#f4b8c1,#c9a84c)', transition: 'width 0.08s linear' }} />
          </div>
          <span style={{ fontFamily: 'var(--font-noto-serif-jp,"Noto Serif JP",serif)', fontSize: '11px', letterSpacing: '0.2em', color: '#c9a84c', opacity: 0.75, fontVariantNumeric: 'tabular-nums' }}>
            {String(progress).padStart(3, '0')} %
          </span>
        </motion.div>

        {/* Tagline */}
        <motion.p
          style={{ fontSize: '10px', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.22)', fontWeight: 500 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          Loading Portfolio
        </motion.p>
      </div>

      {/* 波 watermark */}
      <div
        aria-hidden="true"
        style={{ position: 'absolute', bottom: 0, right: 0, fontSize: '160px', lineHeight: 1, paddingRight: '1.5rem', color: 'rgba(255,255,255,0.025)', fontFamily: 'var(--font-noto-serif-jp,"Noto Serif JP",serif)', userSelect: 'none', pointerEvents: 'none' }}
      >
        波
      </div>
    </motion.div>
  );
}