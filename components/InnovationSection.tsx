"use client";

import {
  useRef,
  useState,
  useCallback,
  MouseEvent as ReactMouseEvent,
} from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  TbExternalLink,
  TbFileCheck,
  TbBook,
  TbTrophy,
} from "react-icons/tb";
import { GlassCard } from "@/components/ui/GlassCard";
import SectionPulse from "@/components/effects/SectionPulse";
import { useTranslation } from "@/hooks/useTranslation";
import enLocale from "@/locales/en.json";
import idLocale from "@/locales/id.json";

/* ------------------------------------------------------------------ */
/* Types                                                                */
/* ------------------------------------------------------------------ */
interface InnovationItem {
  id: number;
  name: string;
  year: string;
  type: string;
  award?: string;
  image?: string;
  description: string;
  tech: string[];
  links?: {
    live?: string;
    hki?: string;
    journal?: string;
  };
}

/* ------------------------------------------------------------------ */
/* Tilt Card Wrapper                                                    */
/* ------------------------------------------------------------------ */
function TiltCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = useCallback((e: ReactMouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    setTilt({ x: (py - 0.5) * 10, y: (px - 0.5) * -10 });
  }, []);

  const resetTilt = useCallback(() => {
    setTilt({ x: 0, y: 0 });
    setHovered(false);
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={resetTilt}
      className={`group relative ${className}`}
      style={{
        perspective: "800px",
        transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: hovered ? "transform 0.08s linear" : "transform 0.4s ease",
        willChange: "transform",
      }}
    >
      <div
        className="absolute inset-x-0 top-0 h-0.5 rounded-t-2xl pointer-events-none z-10"
        style={{
          background: "linear-gradient(to right, #f4b8c1, #c9a84c)",
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
      />
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Card Component                                                       */
/* ------------------------------------------------------------------ */
function InnovationCard({ item, index }: { item: InnovationItem; index: number }) {
  const [imgError, setImgError] = useState(false);

  /* gradient colours per project id for fallback */
  const FALLBACK_GRADIENTS: Record<number, string> = {
    1: 'linear-gradient(135deg, rgba(201,168,76,0.18) 0%, rgba(244,184,193,0.10) 100%)',
    2: 'linear-gradient(135deg, rgba(99,179,237,0.18) 0%, rgba(201,168,76,0.10) 100%)',
    3: 'linear-gradient(135deg, rgba(154,230,180,0.18) 0%, rgba(244,184,193,0.10) 100%)',
    4: 'linear-gradient(135deg, rgba(244,184,193,0.18) 0%, rgba(201,168,76,0.10) 100%)',
  };
  const fallbackGradient = FALLBACK_GRADIENTS[item.id] ?? FALLBACK_GRADIENTS[1];

  const hasHKI = item.links?.hki;
  const hasJournal = item.links?.journal;
  const hasLive = item.links?.live;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.1 + index * 0.12, ease: "easeOut" }}
      className="flex flex-col h-full"
    >
      <TiltCard className="flex-1 flex flex-col">
        <GlassCard
          noPadding
          className="relative overflow-hidden h-full flex flex-col"
          noAnimatedBorder
        >
          {/* Award chip — positioned at top */}
          {item.award && (
            <div className="absolute top-42 left-6 z-20 flex items-center gap-0.5 rounded-full px-1 py-0.5 border border-accent-gold/40 bg-accent-gold/15 text-accent-gold text-xs font-xs tracking-widest backdrop-blur-sm">
              <TbTrophy size={8} /> {item.award}
            </div>
          )}

          {/* ── Image / gradient area ─────────────────────────── */}
          <div className="relative w-full h-44 overflow-hidden shrink-0">
            {item.image && !imgError ? (
              <Image
                src={item.image}
                alt={item.name}
                fill
                sizes="(max-width:640px) 100vw, 400px"
                className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                onError={() => setImgError(true)}
              />
            ) : (
              /* Fallback: coloured gradient + project number */
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{ background: fallbackGradient }}
              >
                <span
                  className="font-heading font-bold text-(--color-text) opacity-[0.10] leading-none select-none"
                  style={{ fontSize: "5rem" }}
                >
                  {String(item.id).padStart(2, "0")}
                </span>
              </div>
            )}

            <div
              className="absolute inset-x-0 bottom-0 h-16 pointer-events-none"
              style={{
                background:
                  "linear-gradient(to bottom, transparent, var(--color-bg))",
              }}
            />

            <div
              className="absolute inset-x-0 top-0 h-0.5 pointer-events-none"
              style={{
                background:
                  "linear-gradient(to right, #f4b8c1, #c9a84c)",
                opacity: 0.6,
              }}
            />
          </div>

          {/* ── Content strip ─────────────────────────────────── */}
          <div className="relative flex flex-col flex-1 p-6">
            {/* faint number watermark */}
            <span
              aria-hidden
              className="absolute select-none pointer-events-none font-heading font-bold text-(--color-text) opacity-[0.04] leading-none text-[6rem] -bottom-4 -right-2"
            >
              {String(item.id).padStart(2, "0")}
            </span>

            {/* title */}
            <h3 className="font-heading text-lg font-bold text-(--color-text) leading-snug mb-2">
              {item.name}
            </h3>

            {/* year + type */}
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs text-(--color-text-muted)">{item.year}</span>
              <span className="text-xs px-2 py-0.5 rounded-full border border-(--glass-border) bg-(--color-glass) text-(--color-text-muted)">
                {item.type}
              </span>
            </div>

            {/* description */}
            <p className="text-sm text-(--color-text-muted) leading-relaxed mb-5">
              {item.description}
            </p>

            {/* tech tags */}
            <div className="flex flex-wrap gap-1.5 mb-5 mt-auto">
              {item.tech.map((tech) => (
                <span
                  key={tech}
                  className="text-xs px-2.5 py-0.5 rounded-full border border-accent-pink/30 bg-accent-pink/5 text-accent-pink"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* links — badges row */}
            {(hasLive || hasHKI || hasJournal) && (
              <div className="flex items-center gap-2 mt-auto flex-wrap">
                {hasLive && (
                  <a
                    href={item.links!.live!}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="View Live Demo"
                    className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-lg border border-(--glass-border) bg-(--color-glass) text-(--color-text-muted) hover:text-(--color-text) hover:bg-(--color-glass-hover) transition-colors"
                  >
                    <TbExternalLink size={14} /> Live
                  </a>
                )}
                {hasHKI && (
                  <a
                    href={item.links!.hki!}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="View HKI Certificate"
                    className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-lg border border-accent-gold/30 bg-accent-gold/10 text-accent-gold hover:bg-accent-gold/20 transition-colors"
                  >
                    <TbFileCheck size={14} /> HKI
                  </a>
                )}
                {hasJournal && (
                  <a
                    href={item.links!.journal!}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Read Journal"
                    className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-lg border border-accent-pink/30 bg-accent-pink/10 text-accent-pink hover:bg-accent-pink/20 transition-colors"
                  >
                    <TbBook size={14} /> Journal
                  </a>
                )}
              </div>
            )}
          </div>
        </GlassCard>
      </TiltCard>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Main Section                                                         */
/* ------------------------------------------------------------------ */
export default function InnovationSection() {
  const { language } = useTranslation();
  const locale = language === "id" ? idLocale : enLocale;
  const innovations = locale.innovations.items as unknown as InnovationItem[];

  return (
    <section
      id="innovations"
      className="relative py-16 md:py-20 lg:py-24 px-4 overflow-hidden"
    >
      <SectionPulse variant="pink-gold" topLeft="30%" topRight="70%" />

      <span
        aria-hidden
        className="pointer-events-none select-none absolute right-4 top-24 font-heading text-[10rem] leading-none font-bold text-(--color-text) opacity-[0.04]"
        style={{ writingMode: "vertical-rl" }}
      >
        革新
      </span>

      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-4"
        >
          <span className="text-xs tracking-[0.2em] uppercase text-accent-gold font-medium">
            05 / INNOVATIONS
          </span>
          <span className="h-px w-10 bg-accent-gold/40" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-heading text-4xl md:text-5xl font-bold text-(--color-text) mb-4"
        >
          {locale.innovations.title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-base text-(--color-text-muted) max-w-2xl mb-12"
        >
          {locale.innovations.subtitle}
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {innovations.map((item, index) => (
            <InnovationCard key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
