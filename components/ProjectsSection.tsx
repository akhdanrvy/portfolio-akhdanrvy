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

/* ------------------------------------------------------------------ */
/* Types                                                                */
/* ------------------------------------------------------------------ */
export interface ProjectView {
  id: string;
  title: string;
  slug: string;
  description: string;
  techStack: string[];
  demoUrl: string | null;
  repoUrl: string | null;
  imageUrl: string | null;
  badgeLabel: string | null;
  isFeatured: boolean;
  displayOrder: number;
  year: string;
}

/* ------------------------------------------------------------------ */
/* Helpers                                                              */
/* ------------------------------------------------------------------ */
function pad(n: number) {
  return String(n).padStart(2, '0');
}

const FALLBACK_GRADIENTS = [
  'linear-gradient(135deg, rgba(201,168,76,0.18) 0%, rgba(244,184,193,0.10) 100%)',
  'linear-gradient(135deg, rgba(99,179,237,0.18) 0%, rgba(201,168,76,0.10) 100%)',
  'linear-gradient(135deg, rgba(154,230,180,0.18) 0%, rgba(244,184,193,0.10) 100%)',
  'linear-gradient(135deg, rgba(244,184,193,0.18) 0%, rgba(201,168,76,0.10) 100%)',
];

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
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top)  / rect.height;
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
  project: ProjectView;
  onClose: () => void;
}) {
  const { t } = useTranslation();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

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
      style={{ backdropFilter: 'blur(12px)', backgroundColor: 'var(--color-bg)' }}
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
            className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full flex items-center justify-center bg-(--color-glass) hover:bg-(--color-glass-hover) text-(--color-text-muted) hover:text-(--color-text) transition-colors"
          >
            <TbX size={16} />
          </button>

          {/* project image */}
          {project.imageUrl && (
            <div className="relative w-full h-48 overflow-hidden mb-5 rounded-t-2xl">
              <Image
                src={project.imageUrl}
                alt={project.title}
                fill
                sizes="512px"
                className="object-cover object-top"
              />
              <div
                className="absolute inset-x-0 bottom-0 h-16 pointer-events-none"
                style={{ background: 'linear-gradient(to bottom, transparent, var(--color-bg))' }}
              />
              <div
                className="absolute inset-x-0 top-0 h-0.5"
                style={{ background: 'linear-gradient(to right, #f4b8c1, #c9a84c)' }}
              />
            </div>
          )}

          {!project.imageUrl && (
            <div
              className="absolute inset-x-0 top-0 h-0.5"
              style={{ background: 'linear-gradient(to right, #f4b8c1, #c9a84c)' }}
            />
          )}

          <div className="pt-2">
            <div className="flex items-start gap-3 mb-4 pr-8">
              <div>
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <h3 className="font-heading text-xl font-bold text-(--color-text) leading-snug">
                    {project.title}
                  </h3>
                  {project.isFeatured && (
                    <span className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full border border-accent-gold/40 bg-accent-gold/10 text-accent-gold">
                      <TbStar size={10} /> FEATURED
                    </span>
                  )}
                  {project.badgeLabel && (
                    <span className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full border border-accent-gold/40 bg-accent-gold/10 text-accent-gold">
                      <TbCertificate size={10} /> {project.badgeLabel}
                    </span>
                  )}
                </div>
                <span className="text-xs text-(--color-text-muted) tracking-wide">{project.year}</span>
              </div>
            </div>

            <p className="text-sm text-(--color-text-muted) leading-relaxed mb-5">{project.description}</p>

            {/* tech tags */}
            <div className="flex flex-wrap gap-1.5 mb-6">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="text-xs px-2.5 py-1 rounded-full border border-accent-pink/30 bg-accent-pink/5 text-accent-pink"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* links */}
            {(project.repoUrl || project.demoUrl) && (
              <div className="flex gap-3">
                {project.repoUrl && (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-lg border border-(--glass-border) bg-(--color-glass) text-(--color-text-muted) hover:text-(--color-text) hover:bg-(--color-glass-hover) transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <TbBrandGithub size={15} /> {t('projects.btn_github') as string}
                  </a>
                )}
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-lg border border-(--glass-border) bg-(--color-glass) text-(--color-text-muted) hover:text-(--color-text) hover:bg-(--color-glass-hover) transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <TbExternalLink size={15} /> {t('projects.btn_live') as string}
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
  project: ProjectView;
  featured?: boolean;
}) {
  const { t } = useTranslation();
  const [imgError, setImgError] = useState(false);

  const fallbackGradient = FALLBACK_GRADIENTS[project.displayOrder % FALLBACK_GRADIENTS.length];

  return (
    <GlassCard noPadding className="relative overflow-hidden h-full flex flex-col" noAnimatedBorder>
      {/* ── Project image ─────────────────────────────────────── */}
      <div
        className={`relative w-full overflow-hidden shrink-0 ${
          featured ? 'h-56 md:h-64' : 'h-44'
        }`}
      >
        {project.imageUrl && !imgError ? (
          <Image
            src={project.imageUrl}
            alt={project.title}
            fill
            sizes={featured ? '(max-width:768px) 100vw, 896px' : '(max-width:640px) 100vw, 400px'}
            className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
            onError={() => setImgError(true)}
          />
        ) : (
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ background: fallbackGradient }}
          >
            <span
              className="font-heading font-bold text-(--color-text) opacity-[0.10] leading-none select-none"
              style={{ fontSize: featured ? '9rem' : '5rem' }}
            >
              {pad(project.displayOrder)}
            </span>
          </div>
        )}
        <div
          className="absolute inset-x-0 bottom-0 h-16 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, transparent, var(--color-bg))' }}
        />
        <div
          className="absolute inset-x-0 top-0 h-0.5 pointer-events-none"
          style={{ background: 'linear-gradient(to right, #f4b8c1, #c9a84c)', opacity: 0.6 }}
        />
      </div>

      {/* ── Card text content ─────────────────────────────────── */}
      <div className={`relative flex flex-col flex-1 ${featured ? 'p-8' : 'p-6'}`}>
        {/* faint project number watermark */}
        <span
          aria-hidden
          className={`absolute select-none pointer-events-none font-heading font-bold text-(--color-text) opacity-[0.04] leading-none ${
            featured ? 'text-[10rem] -bottom-6 -right-4' : 'text-[6rem] -bottom-4 -right-2'
          }`}
        >
          {pad(project.displayOrder)}
        </span>

        {/* badges row */}
        <div className="flex items-center gap-2 flex-wrap mb-3">
          {project.isFeatured && (
            <span className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full border border-accent-gold/40 bg-accent-gold/10 text-accent-gold font-medium">
              <TbStar size={11} /> FEATURED
            </span>
          )}
          {project.badgeLabel && (
            <span className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full border border-accent-gold/40 bg-accent-gold/10 text-accent-gold font-medium">
              <TbCertificate size={11} /> {project.badgeLabel}
            </span>
          )}
          {!featured && (
            <span className="ml-auto text-xs px-2 py-0.5 rounded-full border border-(--glass-border) bg-(--color-glass) text-(--color-text-muted)">
              {project.year}
            </span>
          )}
        </div>

        {featured && (
          <span className="block text-xs text-(--color-text-muted) tracking-wide mb-2">{project.year}</span>
        )}

        <h3
          className={`font-heading font-bold text-(--color-text) leading-snug mb-3 ${
            featured ? 'text-2xl md:text-3xl' : 'text-lg'
          }`}
        >
          {project.title}
        </h3>

        <p className={`text-(--color-text-muted) leading-relaxed mb-5 ${featured ? 'text-base' : 'text-sm'}`}>
          {project.description}
        </p>

        {/* tech tags */}
        <div className="flex flex-wrap gap-1.5 mb-5 mt-auto">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="text-xs px-2.5 py-0.5 rounded-full border border-accent-pink/30 bg-accent-pink/5 text-accent-pink"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* links row */}
        {(project.repoUrl || project.demoUrl) && (
          <div className="flex items-center gap-2 mt-auto">
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                aria-label="GitHub"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-lg border border-(--glass-border) bg-(--color-glass) text-(--color-text-muted) hover:text-(--color-text) hover:bg-(--color-glass-hover) transition-colors"
              >
                <TbBrandGithub size={14} /> {t('projects.btn_github') as string}
              </a>
            )}
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                aria-label="Live"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-lg border border-(--glass-border) bg-(--color-glass) text-(--color-text-muted) hover:text-(--color-text) hover:bg-(--color-glass-hover) transition-colors"
              >
                <TbExternalLink size={14} /> {t('projects.btn_live') as string}
              </a>
            )}
          </div>
        )}
      </div>
    </GlassCard>
  );
}

/* ------------------------------------------------------------------ */
/* Main Section                                                         */
/* ------------------------------------------------------------------ */
export default function ProjectsSection({ projects }: { projects: ProjectView[] }) {
  const { t } = useTranslation();
  const [activeProject, setActiveProject] = useState<ProjectView | null>(null);

  const featured = projects.find((p) => p.isFeatured) ?? projects[0];
  const rest      = projects.filter((p) => !p.isFeatured);

  return (
    <section id="projects" className="relative py-16 md:py-20 lg:py-24 px-4 overflow-hidden">
      <SectionPulse variant="gold-pink" topLeft="55%" topRight="25%" />

      <span
        aria-hidden
        className="pointer-events-none select-none absolute left-4 top-24 font-heading text-[10rem] leading-none font-bold text-(--color-text) opacity-[0.04]"
        style={{ writingMode: 'vertical-rl' }}
      >
        作品
      </span>

      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* section label */}
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

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-heading text-4xl md:text-5xl font-bold text-(--color-text) mb-4"
        >
          {t('projects.title') as string}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-base text-(--color-text-muted) max-w-2xl mb-12"
        >
          {t('projects.subtitle') as string}
        </motion.p>

        {/* empty state */}
        {projects.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="py-16 text-center text-(--color-text-muted) text-sm"
          >
            Belum ada project.
          </motion.div>
        ) : (
          <>
            {/* featured card */}
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

            {/* grid: remaining */}
            {rest.length > 0 && (
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
            )}
          </>
        )}
      </div>

      {/* modal */}
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
