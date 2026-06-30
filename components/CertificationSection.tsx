'use client';

import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TbChevronLeft, TbChevronRight, TbCertificate, TbExternalLink } from 'react-icons/tb';
import SectionPulse from '@/components/effects/SectionPulse';
import { useTranslation } from '@/hooks/useTranslation';

/* ------------------------------------------------------------------ */
/* Types                                                                */
/* ------------------------------------------------------------------ */
export interface CertificationView {
  id: string;
  name: string;
  issuer: string;
  issueDate: string; // ISO string
  expiryDate: string | null;
  credentialUrl: string | null;
  imageUrl: string | null;
  displayOrder: number;
}

/* ------------------------------------------------------------------ */
/* Helpers                                                              */
/* ------------------------------------------------------------------ */
function formatIssueDate(isoString: string, language: string): string {
  return new Date(isoString).toLocaleDateString(
    language === 'id' ? 'id-ID' : 'en-US',
    { month: 'short', year: 'numeric' }
  );
}

/* ------------------------------------------------------------------ */
/* Placeholder card face (shown when imageUrl is null)                 */
/* ------------------------------------------------------------------ */
function CertPlaceholder({ cert }: { cert: CertificationView }) {
  const year = new Date(cert.issueDate).getFullYear().toString();
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
        className="absolute font-heading font-bold text-(--color-text) opacity-[0.04] leading-none text-[8rem]"
        aria-hidden
      >
        {String(cert.displayOrder).padStart(2, '0')}
      </span>
      {/* Icon */}
      <div
        className="relative w-14 h-14 rounded-2xl flex items-center justify-center border border-accent-gold/25"
        style={{ background: 'rgba(201,168,76,0.10)' }}
      >
        <TbCertificate size={28} className="text-accent-gold" />
      </div>
      <p className="relative text-sm font-semibold text-(--color-text) leading-snug">{cert.name}</p>
      <p className="relative text-xs text-(--color-text-muted) uppercase tracking-widest">{cert.issuer}</p>
      <span className="relative text-xs px-2.5 py-0.5 rounded-full border border-accent-pink/30 bg-accent-pink/8 text-accent-pink/80">
        {year}
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Carousel                                                             */
/* ------------------------------------------------------------------ */
const VISIBLE = 5;
const SIDE    = Math.floor(VISIBLE / 2);

function getSlots(active: number, total: number) {
  return Array.from({ length: VISIBLE }, (_, i) => {
    const offset = i - SIDE;
    return (active + offset + total) % total;
  });
}

/* ------------------------------------------------------------------ */
/* Main Section                                                         */
/* ------------------------------------------------------------------ */
export default function CertificationSection({ certifications }: { certifications: CertificationView[] }) {
  const { t, language } = useTranslation();

  const [active, setActive] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const listener = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    listener({ matches: mq.matches } as MediaQueryListEvent);
    mq.addEventListener('change', listener);
    return () => mq.removeEventListener('change', listener);
  }, []);

  const total = certifications.length;

  const prev = useCallback(() => {
    setActive((a) => (a - 1 + total) % total);
  }, [total]);

  const next = useCallback(() => {
    setActive((a) => (a + 1) % total);
  }, [total]);

  useEffect(() => {
    if (total === 0) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft')  prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [prev, next, total]);

  const slots = total > 0 ? getSlots(active, total) : [];

  return (
    <section
      id="certifications"
      className="relative py-14 md:py-18 lg:py-24 overflow-hidden"
    >
      <SectionPulse variant="pink-gold" topLeft="50%" topRight="50%" scale={1.1} />

      <span
        aria-hidden
        className="pointer-events-none select-none absolute right-0 top-1/2 -translate-y-1/2
                   font-heading font-bold leading-none text-[18vw] text-(--color-text) opacity-[0.04]"
        style={{ writingMode: 'vertical-rl' }}
      >
        資格
      </span>

      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8">
        {/* header */}
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
          className="font-heading text-4xl md:text-5xl font-bold text-(--color-text) mb-4"
        >
          {t('certifications.title') as string}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-base text-(--color-text-muted) max-w-2xl mb-12"
        >
          {t('certifications.subtitle') as string}
        </motion.p>

        {/* empty state */}
        {certifications.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="py-16 text-center text-(--color-text-muted) text-sm"
          >
            Belum ada sertifikat.
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.2 }}
          >
            {/* Carousel track */}
            <div className="flex items-center justify-center gap-3 md:gap-4">
              {slots.map((certIdx, slotI) => {
                const offset   = slotI - SIDE;
                const cert     = certifications[certIdx];
                const isActive = offset === 0;
                const absOff   = Math.abs(offset);

                const heightPx  = isActive ? 280 : absOff === 1 ? 240 : 200;
                const opacity   = isActive ? 1 : absOff === 1 ? 0.65 : 0.38;
                const flexBasis = isActive ? '26%' : absOff === 1 ? '20%' : '14%';

                return (
                  <motion.div
                    key={certIdx}
                    layoutId={`cert-${certIdx}`}
                    layout
                    onClick={() => !isActive && (offset < 0 ? prev() : next())}
                    animate={{
                      opacity,
                      height:  heightPx,
                      scale:   isActive ? 1 : absOff === 1 ? 0.96 : 0.92,
                    }}
                    transition={{
                      layout:  { type: 'spring', stiffness: 340, damping: 30 },
                      opacity: { duration: 0.35 },
                      scale:   { type: 'spring', stiffness: 340, damping: 30 },
                      height:  { type: 'spring', stiffness: 340, damping: 30 },
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
                    <div
                      className="relative w-full h-full rounded-2xl overflow-hidden border"
                      style={{
                        background:     'var(--color-glass)',
                        backdropFilter: 'blur(12px)',
                        borderColor:    isActive
                          ? 'rgba(244,184,193,0.35)'
                          : 'var(--glass-border)',
                        boxShadow:      isActive
                          ? '0 0 40px rgba(244,184,193,0.18), 0 8px 32px rgba(0,0,0,0.35)'
                          : '0 4px 16px rgba(0,0,0,0.25)',
                        transition:     'box-shadow 0.4s ease, border-color 0.4s ease',
                      }}
                    >
                      <motion.div
                        className="absolute inset-x-0 top-0 h-0.5 z-10"
                        animate={{ opacity: isActive ? 1 : 0 }}
                        transition={{ duration: 0.3 }}
                        style={{ background: 'linear-gradient(to right, #f4b8c1, #c9a84c)' }}
                      />

                      {cert.imageUrl ? (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img
                          src={cert.imageUrl}
                          alt={cert.name}
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

            {/* controls */}
            <div className="flex items-center justify-center gap-6 mt-10">
              <button
                onClick={prev}
                aria-label="Previous certificate"
                className="w-10 h-10 rounded-full flex items-center justify-center border border-(--glass-border) bg-(--color-glass) text-(--color-text-muted) hover:text-(--color-text) hover:border-accent-pink/50 hover:bg-(--color-glass-hover) transition-colors backdrop-blur-sm"
              >
                <TbChevronLeft size={20} />
              </button>

              <div className="flex gap-2">
                {certifications.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    aria-label={`Go to certificate ${i + 1}`}
                    className="transition-all duration-300"
                    style={{
                      width:        i === active ? '20px' : '6px',
                      height:       '6px',
                      borderRadius: '9999px',
                      background:   i === active
                        ? 'linear-gradient(to right, #f4b8c1, #c9a84c)'
                        : 'var(--glass-border)',
                    }}
                  />
                ))}
              </div>

              <button
                onClick={next}
                aria-label="Next certificate"
                className="w-10 h-10 rounded-full flex items-center justify-center border border-(--glass-border) bg-(--color-glass) text-(--color-text-muted) hover:text-(--color-text) hover:border-accent-pink/50 hover:bg-(--color-glass-hover) transition-colors backdrop-blur-sm"
              >
                <TbChevronRight size={20} />
              </button>
            </div>

            {/* active cert info */}
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="mt-8 text-center"
              >
                <p className="text-base font-semibold text-(--color-text) font-heading leading-snug">
                  {certifications[active].name}
                </p>
                <p className="text-sm text-(--color-text-muted) mt-1 uppercase tracking-widest">
                  {certifications[active].issuer} · {formatIssueDate(certifications[active].issueDate, language)}
                </p>
                {certifications[active].credentialUrl && (
                  <a
                    href={certifications[active].credentialUrl!}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 mt-3 text-xs px-3 py-1.5 rounded-lg border border-(--glass-border) bg-(--color-glass) text-(--color-text-muted) hover:text-(--color-text) hover:bg-(--color-glass-hover) transition-colors"
                  >
                    <TbExternalLink size={13} /> {t('certifications.view_certificate') as string}
                  </a>
                )}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </section>
  );
}
