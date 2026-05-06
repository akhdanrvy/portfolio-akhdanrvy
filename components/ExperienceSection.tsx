'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from 'framer-motion';
import { TbExternalLink, TbSchool } from 'react-icons/tb';
import { GlassCard } from '@/components/ui/GlassCard';
import { useTranslation } from '@/hooks/useTranslation';
import SectionPulse from '@/components/effects/SectionPulse';
import enLocale from '@/locales/en.json';
import idLocale from '@/locales/id.json';

/* ------------------------------------------------------------------ */
/* Types                                                                */
/* ------------------------------------------------------------------ */
interface ExperienceItem {
  id: number;
  role: string;
  company: string;
  companyUrl?: string;
  companyLogo?: string;
  period: string;
  type: 'Full-time' | 'Independent Study' | 'Internship' | 'Education';
  current?: boolean;
  description: string[];
  tags: string[];
}

/* ------------------------------------------------------------------ */
/* Helpers                                                              */
/* ------------------------------------------------------------------ */
const TYPE_STYLES: Record<string, string> = {
  'Full-time':         'text-(--color-accent-gold)   border-(--color-accent-gold)/40   bg-(--color-accent-gold)/10',
  'Independent Study': 'text-blue-300                border-blue-400/40                bg-blue-400/10',
  'Internship':        'text-teal-300                border-teal-400/40                bg-teal-400/10',
  'Education':         'text-purple-300              border-purple-400/40              bg-purple-400/10',
};

/** Returns 2-letter abbreviation from a company name */
function getInitials(name: string): string {
  const words = name.trim().split(/\s+/);
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
}

/* ------------------------------------------------------------------ */
/* Company Logo w/ fallback                                             */
/* ------------------------------------------------------------------ */
function CompanyLogo({ src, name }: { src?: string; name: string }) {
  const [errored, setErrored] = useState(false);

  if (!src || errored) {
    return (
      <div className="w-12 h-12 rounded-full bg-accent-gold/20 border border-accent-gold/40 flex items-center justify-center shrink-0">
        <span className="font-heading text-sm font-bold text-(--color-accent-gold)">
          {getInitials(name)}
        </span>
      </div>
    );
  }

  return (
    <div className="w-12 h-12 rounded-full overflow-hidden border border-(--glass-border) bg-white/10 shrink-0 flex items-center justify-center">
      <Image
        src={src}
        alt={name}
        width={48}
        height={48}
        className="object-contain w-full h-full"
        onError={() => setErrored(true)}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Company Popover                                                      */
/* ------------------------------------------------------------------ */
function CompanyPopover({
  item,
  onClose,
}: {
  item: ExperienceItem;
  onClose: () => void;
}) {
  return (
    <>
      {/* scoped blur overlay — fills the card's stacking context */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="absolute inset-0 rounded-xl backdrop-blur-[2px] bg-bg/40 z-10"
        onClick={onClose}
      />

      {/* popover bubble */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: 10 }}
        transition={{ duration: 0.22, ease: 'easeOut' }}
        /* position above the company text row; centered horizontally */
        className={[
          'absolute z-20 bottom-[calc(100%+0.5rem)]',
          /* center on the anchor; clamp so it never overflows viewport */
          'left-1/2 -translate-x-1/2',
          'w-56 max-w-[calc(100vw-2rem)]',
          /* glass style */
          'rounded-xl border border-(--color-accent-gold)/40',
          'bg-(--color-glass) backdrop-blur-xl shadow-xl',
          'p-4 flex flex-col items-center gap-3',
        ].join(' ')}
        /* stop clicks inside from bubbling to the overlay */
        onClick={(e) => e.stopPropagation()}
      >
        {/* caret */}
        <span
          className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 bg-(--color-glass) border-r border-b border-accent-gold/40"
          aria-hidden
        />

        <CompanyLogo src={item.companyLogo} name={item.company} />

        <p className="font-heading font-bold text-(--color-text) text-sm text-center leading-snug">
          {item.company}
        </p>

        {item.companyUrl && (
          <a
            href={item.companyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={[
              'flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full',
              'border border-accent-gold/50 text-(--color-accent-gold)',
              'hover:bg-(--color-accent-gold)/10 transition-colors duration-150',
            ].join(' ')}
          >
            Visit Website
            <TbExternalLink size={12} />
          </a>
        )}
      </motion.div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Timeline Card                                                        */
/* ------------------------------------------------------------------ */
function TimelineCard({
  item,
  side,
  index,
  openId,
  setOpenId,
}: {
  item: ExperienceItem;
  side: 'left' | 'right';
  index: number;
  openId: number | null;
  setOpenId: (id: number | null) => void;
}) {
  const isLeft = side === 'left';
  const isEducation = item.type === 'Education';
  const isOpen = openId === item.id;

  function handleCompanyClick(e: React.MouseEvent) {
    e.stopPropagation();
    setOpenId(isOpen ? null : item.id);
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -60 : 60 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' as const }}
      className={`relative w-full md:w-[calc(50%-2rem)] ${
        isLeft ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'
      }`}
    >
      {/* connector line — desktop only */}
      <span
        className={`hidden md:block absolute top-6 w-8 h-px bg-(--glass-border) ${
          isLeft ? 'right-0' : 'left-0'
        }`}
      />

      {/* clicking the card background closes popover */}
      <GlassCard
        className="relative overflow-visible"
        onClick={() => isOpen && setOpenId(null)}
      >
        {/* type badge */}
        <span
          className={`absolute top-4 right-4 text-xs px-2 py-0.5 -mt-2 lg:-mt-2 -mr-4 lg:-mr-2 rounded-full border font-medium tracking-wide ${
            TYPE_STYLES[item.type] ?? TYPE_STYLES['Full-time']
          }`}
        >
          {item.type}
        </span>

        {/* current position badge */}
        {item.current && (
          <span className="absolute top-4 text-xs px-2.5 py-0.5 rounded-full border border-green-400/50 bg-green-400/10 text-green-400 font-semibold tracking-wide flex items-center gap-1.5 mt-10 lg:mt-4">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-green-400" />
            </span>
            CURRENT
          </span>
        )}

        {/* role */}
        <h3 className="font-heading text-lg font-bold text-(--color-text) pr-28 leading-snug mb-1">
          {isEducation && (
            <TbSchool
              size={16}
              className="inline-block mr-2 text-purple-300 -mt-0.5"
            />
          )}
          {item.role}
        </h3>

        {/* company — clickable anchor for the popover */}
        <div className="relative mt-8 mb-1 w-full">
          <button
            type="button"
            onClick={handleCompanyClick}
            className="flex items-center gap-1 text-sm text-left text-(--color-text-muted) hover:text-(--color-text) transition-colors duration-150 cursor-pointer justify-start"
          >
            {item.company}
            <TbExternalLink size={12} className="shrink-0" />
          </button>

          {/* popover portal — rendered relative to this anchor */}
          <AnimatePresence>
            {isOpen && (
              <CompanyPopover item={item} onClose={() => setOpenId(null)} />
            )}
          </AnimatePresence>
        </div>

        {/* period */}
        <p className="text-xs text-(--color-text-muted) mb-3 tracking-wide">{item.period}</p>

        {/* description */}
        <ul className="space-y-1.5 mb-4">
          {item.description.map((line, i) => (
            <li key={i} className="flex gap-2 text-sm text-(--color-text-muted) leading-relaxed">
              <span className="mt-1.5 w-1 h-1 rounded-full bg-(--color-accent-pink) shrink-0" />
              {line}
            </li>
          ))}
        </ul>

        {/* tags */}
        <div className="flex flex-wrap gap-1.5">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-0.5 rounded-full border border-(--glass-border) bg-(--color-glass) text-(--color-text-muted)"
            >
              {tag}
            </span>
          ))}
        </div>
      </GlassCard>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Main Section                                                         */
/* ------------------------------------------------------------------ */
export default function ExperienceSection() {
  const { t, language } = useTranslation();

  const sectionRef = useRef<HTMLDivElement>(null);
  const lineRef    = useRef<HTMLDivElement>(null);

  /* which card's company popover is open (by item.id, or null) */
  const [openId, setOpenId] = useState<number | null>(null);

  /* close on Escape or scroll */
  const closePopover = useCallback(() => setOpenId(null), []);

  useEffect(() => {
    if (openId === null) return;

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') closePopover();
    }
    function onScroll() {
      closePopover();
    }

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('scroll', onScroll);
    };
  }, [openId, closePopover]);

  /* Animate the vertical timeline line as the section scrolls in */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 0.85', 'end 0.4'],
  });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const locale = language === 'id' ? idLocale : enLocale;
  const items = locale.experience.items as ExperienceItem[];

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative py-16 md:py-20 lg:py-24 px-4 overflow-hidden"
    >
      <SectionPulse variant="pink-gold" topLeft="40%" topRight="70%" />

      {/* ── decorative kanji ──────────────────────────────────── */}
      <span
        aria-hidden
        className="pointer-events-none select-none absolute right-4 top-24 font-heading text-[10rem] leading-none font-bold text-(--color-text) opacity-[0.04] writing-mode-vertical-rl"
        style={{ writingMode: 'vertical-rl' }}
      >
        経験
      </span>

      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* ── section label ─────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-4"
        >
          <span className="text-xs tracking-[0.2em] uppercase text-(--color-accent-pink) font-medium">
            03 / EXPERIENCE
          </span>
          <span className="h-px w-10 bg-accent-pink/40" />
        </motion.div>

        {/* ── heading ───────────────────────────────────────── */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-heading text-4xl md:text-5xl font-bold text-(--color-text) mb-4"
        >
          {t('experience.title') as string}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-base text-(--color-text-muted) max-w-2xl mb-12"
        >
          {locale.experience.subtitle}
        </motion.p>

        {/* ── timeline wrapper ──────────────────────────────── */}
        <div className="relative">
          {/* animated vertical line */}
          <motion.div
            ref={lineRef}
            style={{ scaleY, originY: 0 }}
            className={[
              'absolute top-0 bottom-0 w-px',
              'bg-linear-to-b from-accent-pink/60 via-accent-gold/50 to-accent-pink/20',
              /* desktop: center  |  mobile: 8px from left */
              'left-2 md:left-1/2 md:-translate-x-px',
            ].join(' ')}
          />

          {/* ── items ─────────────────────────────────────── */}
          <div className="flex flex-col gap-12">
            {items.map((item, index) => {
              /* desktop alternates; mobile always right */
              const side: 'left' | 'right' = index % 2 === 0 ? 'left' : 'right';

              return (
                <div key={item.id} className="relative flex items-start">
                  {/* dot on the timeline */}
                  <div
                    className={[
                      'absolute z-10 w-3 h-3 rounded-full border-2 border-(--color-accent-gold) bg-(--color-bg)',
                      'left-2 -translate-x-1/2 mt-5',
                      'md:left-1/2 md:-translate-x-1/2',
                    ].join(' ')}
                  />

                  {/* card — on mobile always pushed right; on desktop alternate */}
                  <div className="w-full pl-8 md:pl-0">
                    <TimelineCard
                      item={item}
                      side={side}
                      index={index}
                      openId={openId}
                      setOpenId={setOpenId}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
