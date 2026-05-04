'use client';

import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TbChevronLeft, TbChevronRight, TbCertificate, TbExternalLink } from 'react-icons/tb';
import SectionPulse from '@/components/effects/SectionPulse';
import { useTranslation } from '@/hooks/useTranslation';
import enLocale from '@/locales/en.json';
import idLocale from '@/locales/id.json';

/* ------------------------------------------------------------------ */
/* Types                                                                */
/* ------------------------------------------------------------------ */
interface Cert {
  id: number;
  title: string;
  issuer: string;
  year: string;
  category: string;
  src: string | null;
  link?: string;
}

/* ------------------------------------------------------------------ */
/* Placeholder card face (shown when src is null)                      */
/* ------------------------------------------------------------------ */
function CertPlaceholder({ cert }: { cert: Cert }) {
  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center gap-3 p-6 text-center select-none"
      style={{
        background:
          'linear-gradient(135deg, rgba(244,184,193,0.08) 0%, rgba(201,168,76,0.06) 100%)',
      }}
    >
      {/* Faint number watermark */}
      <span
        className="absolute font-heading font-bold text-white/4 leading-none text-[8rem]"
        aria-hidden
      >
        {String(cert.id).padStart(2, '0')}
      </span>
      {/* Icon */}
      <div
        className="relative w-14 h-14 rounded-2xl flex items-center justify-center border border-accent-gold/25"
        style={{ background: 'rgba(201,168,76,0.10)' }}
      >
        <TbCertificate size={28} className="text-accent-gold" />
      </div>
      <p className="relative text-sm font-semibold text-white/80 leading-snug">{cert.title}</p>
      <p className="relative text-xs text-white/40 uppercase tracking-widest">{cert.issuer}</p>
      <span
        className="relative text-xs px-2.5 py-0.5 rounded-full border border-accent-pink/30 bg-accent-pink/8 text-accent-pink/80"
      >
        {cert.year}
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Carousel                                                             */
/* ------------------------------------------------------------------ */
const VISIBLE = 5; /* odd number — center is active */
const SIDE    = Math.floor(VISIBLE / 2); /* 2 */

function getSlots(active: number, total: number) {
  return Array.from({ length: VISIBLE }, (_, i) => {
    const offset = i - SIDE; /* -2 … +2 */
    return (active + offset + total) % total;
  });
}

export default function CertificationSection() {
  const { language } = useTranslation();
  const locale = language === 'id' ? idLocale : enLocale;
  const CERTS = locale.certifications.items as unknown as Cert[];

  const [active, setActive] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const listener = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    // set initial value after mount (client-only)
    listener({ matches: mq.matches } as MediaQueryListEvent);
    mq.addEventListener('change', listener);
    return () => mq.removeEventListener('change', listener);
  }, []);

  const total = CERTS.length;

  const prev = useCallback(() => {
    setActive((a) => (a - 1 + total) % total);
  }, [total]);

  const next = useCallback(() => {
    setActive((a) => (a + 1) % total);
  }, [total]);

  /* Keyboard navigation */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft')  prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [prev, next]);

  const slots = getSlots(active, CERTS.length);

  return (
    <section
      id="certifications"
      className="relative py-14 md:py-18 lg:py-24 overflow-hidden"
    >
      <SectionPulse variant="pink-gold" topLeft="50%" topRight="50%" scale={1.1} />

      {/* ── kanji watermark ─────────────────────────────────── */}
      <span
        aria-hidden
        className="pointer-events-none select-none absolute right-0 top-1/2 -translate-y-1/2
                   font-heading font-bold leading-none text-[18vw] text-accent-pink opacity-[0.04]"
        style={{ writingMode: 'vertical-rl' }}
      >
        資格
      </span>

      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8">
        {/* ── header ────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-4"
        >
          <span className="text-xs tracking-[0.2em] uppercase text-accent-pink font-medium">
            06 / CERTIFICATIONS
          </span>
          <span className="h-px w-10 bg-accent-pink/40" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-heading text-4xl md:text-5xl font-bold text-white mb-3"
        >
          {locale.certifications.title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-white/45 text-sm mb-14 max-w-xl"
        >
          {locale.certifications.subtitle}
        </motion.p>

        {/* ── carousel ──────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, delay: 0.2 }}
        >
          {/* Track — flex row dengan layout animation */}
          <div className="flex items-center justify-center gap-3 md:gap-4">
            {slots.map((certIdx, slotI) => {
              const offset   = slotI - SIDE; /* -2 … +2 */
              const cert     = CERTS[certIdx];
              const isActive = offset === 0;
              const absOff   = Math.abs(offset);

              /* Size: center is biggest, shrinks by distance */
              const heightPx  = isActive ? 280 : absOff === 1 ? 240 : 200;
              const opacity   = isActive ? 1 : absOff === 1 ? 0.65 : 0.38;
              const flexBasis = isActive ? '26%' : absOff === 1 ? '20%' : '14%';

              return (
                <motion.div
                  key={certIdx}              /* key = certIdx so Framer tracks each cert */
                  layoutId={`cert-${certIdx}`}
                  layout
                  onClick={() => !isActive && (offset < 0 ? prev() : next())}
                  animate={{
                    opacity,
                    height:  heightPx,
                    scale:   isActive ? 1 : absOff === 1 ? 0.96 : 0.92,
                  }}
                  transition={{
                    layout:    { type: 'spring', stiffness: 340, damping: 30 },
                    opacity:   { duration: 0.35 },
                    scale:     { type: 'spring', stiffness: 340, damping: 30 },
                    height:    { type: 'spring', stiffness: 340, damping: 30 },
                  }}
                  style={{
                    flexShrink: 0,
                    flexBasis:  isMobile ? (isActive ? '100%' : '0%') : flexBasis,
                    cursor:     isActive ? 'default' : 'pointer',
                    originY:    '50%',
                    overflow:   isMobile && !isActive ? 'hidden' : 'visible',
                    pointerEvents: isMobile && !isActive ? 'none' : 'auto',
                  }}
                >
                  {/* Card face */}
                  <div
                    className="relative w-full h-full rounded-2xl overflow-hidden border"
                    style={{
                      background:     'rgba(255,255,255,0.05)',
                      backdropFilter: 'blur(12px)',
                      borderColor:    isActive
                        ? 'rgba(244,184,193,0.35)'
                        : 'rgba(255,255,255,0.08)',
                      boxShadow:      isActive
                        ? '0 0 40px rgba(244,184,193,0.18), 0 8px 32px rgba(0,0,0,0.35)'
                        : '0 4px 16px rgba(0,0,0,0.25)',
                      transition:     'box-shadow 0.4s ease, border-color 0.4s ease',
                    }}
                  >
                    {/* Top gradient accent on active */}
                    <motion.div
                      className="absolute inset-x-0 top-0 h-0.5 z-10"
                      animate={{ opacity: isActive ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                      style={{ background: 'linear-gradient(to right, #f4b8c1, #c9a84c)' }}
                    />

                    {cert.src ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        src={cert.src}
                        alt={cert.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <CertPlaceholder cert={cert} />
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* ── controls ─────────────────────────────────── */}
          <div className="flex items-center justify-center gap-6 mt-10">
            {/* Prev */}
            <button
              onClick={prev}
              aria-label="Previous certificate"
              className="w-10 h-10 rounded-full flex items-center justify-center border border-white/12 bg-white/6 text-white/60 hover:text-white hover:border-accent-pink/50 hover:bg-white/12 transition-colors backdrop-blur-sm"
            >
              <TbChevronLeft size={20} />
            </button>

            {/* Dot indicators */}
            <div className="flex gap-2">
              {CERTS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setActive(i); }}
                  aria-label={`Go to certificate ${i + 1}`}
                  className="transition-all duration-300"
                  style={{
                    width:         i === active ? '20px' : '6px',
                    height:        '6px',
                    borderRadius:  '9999px',
                    background:    i === active
                      ? 'linear-gradient(to right, #f4b8c1, #c9a84c)'
                      : 'rgba(255,255,255,0.20)',
                  }}
                />
              ))}
            </div>

            {/* Next */}
            <button
              onClick={next}
              aria-label="Next certificate"
              className="w-10 h-10 rounded-full flex items-center justify-center border border-white/12 bg-white/6 text-white/60 hover:text-white hover:border-accent-pink/50 hover:bg-white/12 transition-colors backdrop-blur-sm"
            >
              <TbChevronRight size={20} />
            </button>
          </div>

          {/* ── active cert info ──────────────────────────── */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="mt-8 text-center"
            >
              <p className="text-base font-semibold text-white/90 font-heading leading-snug">
                {CERTS[active].title}
              </p>
              <p className="text-sm text-white/45 mt-1 uppercase tracking-widest">
                {CERTS[active].issuer} · {CERTS[active].year}
              </p>
              {CERTS[active].link && (
                <a
                  href={CERTS[active].link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 mt-3 text-xs px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 text-white/55 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <TbExternalLink size={13} /> {locale.certifications.view_certificate}
                </a>
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
