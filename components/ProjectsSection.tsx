'use client';

import {
  useRef,
  useState,
  useCallback,
  useEffect,
  MouseEvent as ReactMouseEvent,
} from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { TbStar, TbBrandGithub, TbExternalLink, TbX, TbCertificate } from 'react-icons/tb';
import { GlassCard } from '@/components/ui/GlassCard';
import { useTranslation } from '@/hooks/useTranslation';
import SectionPulse from '@/components/effects/SectionPulse';
import enLocale from '@/locales/en.json';
import idLocale from '@/locales/id.json';

/* ------------------------------------------------------------------ */
/* Types                                                                */
/* ------------------------------------------------------------------ */
interface ProjectItem {
  id: number;
  name: string;
  year: string;
  image?: string;
  description: string;
  tech: string[];
  featured?: boolean;
  hki?: boolean;
  links?: {
    github?: string;
    live?: string;
  };
}

/* ------------------------------------------------------------------ */
/* Helpers                                                              */
/* ------------------------------------------------------------------ */
function pad(n: number) {
  return String(n).padStart(2, '0');
}

/* ------------------------------------------------------------------ */
/* 3-D Tilt card wrapper                                               */
/* ------------------------------------------------------------------ */
function TiltCard({
  children,
  className = '',
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = useCallback((e: ReactMouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;   // 0–1
    const py = (e.clientY - rect.top)  / rect.height;  // 0–1
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
      onClick={onClick}
      className={`cursor-pointer group relative ${className}`}
      style={{
        perspective: '800px',
        transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: hovered ? 'transform 0.08s linear' : 'transform 0.4s ease',
        willChange: 'transform',
      }}
    >
      {/* top gradient border — visible on hover */}
      <div
        className="absolute inset-x-0 top-0 h-0.5 rounded-t-2xl pointer-events-none z-10"
        style={{
          background: 'linear-gradient(to right, #f4b8c1, #c9a84c)',
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.3s ease',
        }}
      />
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Modal                                                               */
/* ------------------------------------------------------------------ */
function ProjectModal({
  project,
  onClose,
}: {
  project: ProjectItem;
  onClose: () => void;
}) {
  /* close on Escape */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  /* lock body scroll */
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backdropFilter: 'blur(12px)', backgroundColor: 'rgba(10,10,26,0.7)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.25, ease: 'easeOut' as const }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg"
      >
        <GlassCard className="relative overflow-hidden" glow noAnimatedBorder>
          {/* close button */}
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-colors"
          >
            <TbX size={16} />
          </button>

          {/* project image */}
          {project.image && (
            <div className="relative w-full h-48 overflow-hidden mb-5 rounded-t-2xl">
              <Image
                src={project.image}
                alt={project.name}
                fill
                sizes="512px"
                className="object-cover object-top"
              />
              <div
                className="absolute inset-x-0 bottom-0 h-16 pointer-events-none"
                style={{ background: 'linear-gradient(to bottom, transparent, rgba(10,10,26,0.9))' }}
              />
              {/* top accent line */}
              <div
                className="absolute inset-x-0 top-0 h-0.5"
                style={{ background: 'linear-gradient(to right, #f4b8c1, #c9a84c)' }}
              />
            </div>
          )}

          {/* top accent line (when no image) */}
          {!project.image && (
            <div
              className="absolute inset-x-0 top-0 h-0.5"
              style={{ background: 'linear-gradient(to right, #f4b8c1, #c9a84c)' }}
            />
          )}

          {/* content */}
          <div className="pt-2">
            <div className="flex items-start gap-3 mb-4 pr-8">
              <div>
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <h3 className="font-heading text-xl font-bold text-white leading-snug">
                    {project.name}
                  </h3>
                  {project.featured && (
                    <span className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full border border-accent-gold/40 bg-accent-gold/10 text-accent-gold">
                      <TbStar size={10} /> FEATURED
                    </span>
                  )}
                  {project.hki && (
                    <span className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full border border-accent-gold/40 bg-accent-gold/10 text-accent-gold">
                      <TbCertificate size={10} /> HKI
                    </span>
                  )}
                </div>
                <span className="text-xs text-white/40 tracking-wide">{project.year}</span>
              </div>
            </div>

            <p className="text-sm text-white/70 leading-relaxed mb-5">{project.description}</p>

            {/* tech tags */}
            <div className="flex flex-wrap gap-1.5 mb-6">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="text-xs px-2.5 py-1 rounded-full border border-accent-pink/30 bg-accent-pink/5 text-accent-pink"
                >
                  {t}
                </span>
              ))}
            </div>

            {/* links */}
            {project.links && (project.links.github || project.links.live) && (
              <div className="flex gap-3">
                {project.links.github && (
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <TbBrandGithub size={15} /> GitHub
                  </a>
                )}
                {project.links.live && (
                  <a
                    href={project.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <TbExternalLink size={15} /> Live
                  </a>
                )}
              </div>
            )}
          </div>
        </GlassCard>
      </motion.div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Card body (shared between featured + grid)                          */
/* ------------------------------------------------------------------ */
function CardBody({
  project,
  featured = false,
}: {
  project: ProjectItem;
  featured?: boolean;
}) {
  const [imgError, setImgError] = useState(false);

  /* gradient colours per project id for fallback */
  const FALLBACK_GRADIENTS: Record<number, string> = {
    1: 'linear-gradient(135deg, rgba(201,168,76,0.18) 0%, rgba(244,184,193,0.10) 100%)',
    2: 'linear-gradient(135deg, rgba(99,179,237,0.18) 0%, rgba(201,168,76,0.10) 100%)',
    3: 'linear-gradient(135deg, rgba(154,230,180,0.18) 0%, rgba(244,184,193,0.10) 100%)',
    4: 'linear-gradient(135deg, rgba(244,184,193,0.18) 0%, rgba(201,168,76,0.10) 100%)',
  };
  const fallbackGradient = FALLBACK_GRADIENTS[project.id] ?? FALLBACK_GRADIENTS[1];

  return (
    <GlassCard noPadding className={`relative overflow-hidden h-full flex flex-col`} noAnimatedBorder>
      {/* ── Project image ─────────────────────────────────────── */}
      <div
        className={`relative w-full overflow-hidden shrink-0 ${
          featured ? 'h-56 md:h-64' : 'h-44'
        }`}
      >
        {project.image && !imgError ? (
          <Image
            src={project.image}
            alt={project.name}
            fill
            sizes={featured ? '(max-width:768px) 100vw, 896px' : '(max-width:640px) 100vw, 400px'}
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
              className="font-heading font-bold text-white/10 leading-none select-none"
              style={{ fontSize: featured ? '9rem' : '5rem' }}
            >
              {pad(project.id)}
            </span>
          </div>
        )}
        {/* bottom fade overlay */}
        <div
          className="absolute inset-x-0 bottom-0 h-16 pointer-events-none"
          style={{
            background:
              'linear-gradient(to bottom, transparent, rgba(10,10,26,0.85))',
          }}
        />
        {/* top accent line */}
        <div
          className="absolute inset-x-0 top-0 h-0.5 pointer-events-none"
          style={{
            background: 'linear-gradient(to right, #f4b8c1, #c9a84c)',
            opacity: 0.6,
          }}
        />
      </div>

      {/* ── Card text content ─────────────────────────────────── */}
      <div className={`relative flex flex-col flex-1 ${featured ? 'p-8' : 'p-6'}`}>
        {/* faint project number */}
        <span
          aria-hidden
          className={`absolute select-none pointer-events-none font-heading font-bold text-white/4 leading-none ${
            featured ? 'text-[10rem] -bottom-6 -right-4' : 'text-[6rem] -bottom-4 -right-2'
          }`}
        >
          {pad(project.id)}
        </span>

        {/* badges row */}
        <div className="flex items-center gap-2 flex-wrap mb-3">
          {project.featured && (
            <span className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full border border-accent-gold/40 bg-accent-gold/10 text-accent-gold font-medium">
              <TbStar size={11} /> FEATURED
            </span>
          )}
          {project.hki && (
            <span className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full border border-accent-gold/40 bg-accent-gold/10 text-accent-gold font-medium">
              <TbCertificate size={11} /> HKI / Copyrighted
            </span>
          )}
          {/* year badge — top-right for non-featured */}
          {!featured && (
            <span className="ml-auto text-xs px-2 py-0.5 rounded-full border border-white/10 bg-white/5 text-white/40">
              {project.year}
            </span>
          )}
        </div>

        {featured && (
          <span className="block text-xs text-white/40 tracking-wide mb-2">{project.year}</span>
        )}

        <h3
          className={`font-heading font-bold text-white leading-snug mb-3 ${
            featured ? 'text-2xl md:text-3xl' : 'text-lg'
          }`}
        >
          {project.name}
        </h3>

        <p className={`text-white/60 leading-relaxed mb-5 ${featured ? 'text-base' : 'text-sm'}`}>
          {project.description}
        </p>

        {/* tech tags */}
        <div className="flex flex-wrap gap-1.5 mb-5 mt-auto">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="text-xs px-2.5 py-0.5 rounded-full border border-accent-pink/30 bg-accent-pink/5 text-accent-pink"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* links row */}
        {project.links && (project.links.github || project.links.live) && (
          <div className="flex items-center gap-2 mt-auto">
            {project.links.github && (
              <a
                href={project.links.github}
                aria-label="GitHub"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-lg border border-white/10 bg-white/5 text-white/50 hover:text-white hover:bg-white/10 transition-colors"
              >
                <TbBrandGithub size={14} /> GitHub
              </a>
            )}
            {project.links.live && (
              <a
                href={project.links.live}
                aria-label="Live"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-lg border border-white/10 bg-white/5 text-white/50 hover:text-white hover:bg-white/10 transition-colors"
              >
                <TbExternalLink size={14} /> Live
              </a>
            )}
          </div>
        )}
      </div>
    </GlassCard>
  );
}/* ------------------------------------------------------------------ */
/* Main Section                                                         */
/* ------------------------------------------------------------------ */
export default function ProjectsSection() {
  const { t, language } = useTranslation();
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);

  const locale = language === 'id' ? idLocale : enLocale;
  const projects = locale.projects.items as unknown as ProjectItem[];
  const featured  = projects.find((p) => p.featured) ?? projects[0];
  const rest       = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="relative py-16 md:py-20 lg:py-24 px-4 overflow-hidden">
      <SectionPulse variant="gold-pink" topLeft="55%" topRight="25%" />

      {/* ── decorative kanji ──────────────────────────────────── */}
      <span
        aria-hidden
        className="pointer-events-none select-none absolute left-4 top-24 font-heading text-[10rem] leading-none font-bold text-accent-gold opacity-[0.08]"
        style={{ writingMode: 'vertical-rl' }}
      >
        作品
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
          <span className="text-xs tracking-[0.2em] uppercase text-accent-pink font-medium">
            04 / PROJECTS
          </span>
          <span className="h-px w-10 bg-accent-pink/40" />
        </motion.div>

        {/* ── heading ───────────────────────────────────────── */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-heading text-4xl md:text-5xl font-bold text-white mb-4"
        >
          {t('projects.title') as string}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-base text-white/45 max-w-2xl mb-12"
        >
          {locale.projects.subtitle}
        </motion.p>

        {/* ── featured card ─────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' as const }}
          className="mb-8"
        >
          <TiltCard onClick={() => setActiveProject(featured)}>
            <CardBody project={featured} featured />
          </TiltCard>
        </motion.div>

        {/* ── grid: remaining 3 ─────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.1, ease: 'easeOut' as const }}
              className="flex flex-col"
            >
              <TiltCard
                className="flex-1 flex flex-col"
                onClick={() => setActiveProject(project)}
              >
                <CardBody project={project} />
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── modal ─────────────────────────────────────────────── */}
      <AnimatePresence>
        {activeProject && (
          <ProjectModal
            project={activeProject}
            onClose={() => setActiveProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
