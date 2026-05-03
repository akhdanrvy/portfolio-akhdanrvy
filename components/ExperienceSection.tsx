'use client';

import { useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
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
  period: string;
  type: 'Full-time' | 'Independent Study' | 'Internship' | 'Education';
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

/* ------------------------------------------------------------------ */
/* Timeline Card                                                        */
/* ------------------------------------------------------------------ */
function TimelineCard({
  item,
  side,
  index,
}: {
  item: ExperienceItem;
  side: 'left' | 'right';
  index: number;
}) {
  const isLeft = side === 'left';
  const isEducation = item.type === 'Education';

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

      <GlassCard className="relative overflow-visible">
        {/* type badge */}
        <span
          className={`absolute top-4 right-4 text-xs px-2 py-0.5 rounded-full border font-medium tracking-wide ${
            TYPE_STYLES[item.type] ?? TYPE_STYLES['Full-time']
          }`}
        >
          {item.type}
        </span>

        {/* role */}
        <h3 className="font-heading text-lg font-bold text-white pr-28 leading-snug mb-1">
          {isEducation && (
            <TbSchool
              size={16}
              className="inline-block mr-2 text-purple-300 -mt-0.5"
            />
          )}
          {item.role}
        </h3>

        {/* company */}
        <p className="flex items-center gap-1 text-sm text-white/50 mb-1">
          {item.company}
          <TbExternalLink size={12} className="shrink-0" />
        </p>

        {/* period */}
        <p className="text-xs text-white/35 mb-3 tracking-wide">{item.period}</p>

        {/* description */}
        <ul className="space-y-1.5 mb-4">
          {item.description.map((line, i) => (
            <li key={i} className="flex gap-2 text-sm text-white/70 leading-relaxed">
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
              className="text-xs px-2 py-0.5 rounded-full border border-(--glass-border) bg-white/5 text-white/60"
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
        className="pointer-events-none select-none absolute right-4 top-24 font-heading text-[10rem] leading-none font-bold text-(--color-accent-gold) opacity-[0.04] writing-mode-vertical-rl"
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
          className="font-heading text-4xl md:text-5xl font-bold text-white mb-16"
        >
          {t('experience.title') as string}
        </motion.h2>

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
                    <TimelineCard item={item} side={side} index={index} />
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
