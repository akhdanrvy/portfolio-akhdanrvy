"use client";

import { motion } from "framer-motion";
import { featuredProjects, otherProjects } from "@/data/projects";
import GlowCard from "@/components/ui/GlowCard";
import NeonBadge from "@/components/ui/NeonBadge";
import SectionTitle from "@/components/ui/SectionTitle";

const statusColors: Record<string, string> = {
  Live:        "text-neon-cyan border-neon-cyan/40 bg-neon-cyan/5",
  Completed:   "text-neon-amber border-neon-amber/40 bg-neon-amber/5",
  "In Progress": "text-neon-magenta border-neon-magenta/40 bg-neon-magenta/5",
};

const badgeColor = (accent: string): "cyan" | "magenta" | "amber" =>
  accent === "#00f5ff" ? "cyan" : accent === "#ff0090" ? "magenta" : "amber";

export default function Projects() {
  return (
    <section
      id="projects"
      className="relative overflow-hidden py-24 md:py-32"
      style={{ backgroundColor: "#0a0a10" }}
    >
      <div className="absolute inset-0 bg-grid opacity-30" />

      <div className="section-container relative z-10">
        <SectionTitle
          prefix="// "
          title="PROJECTS"
          kanji="作品"
          subtitle="A selection of things I've built — spanning mobile, web, and AI."
        />

        {/* ── Featured Projects ── */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-20">
          {featuredProjects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="h-full"
            >
              <GlowCard accentColor={project.accentColor} hoverable className="h-full flex flex-col">
                {/* Top row */}
                <div className="mb-4 flex items-start justify-between gap-2">
                  <div className="flex flex-col gap-1.5">
                    {/* Platform badge */}
                    <span
                      className="font-mono text-[10px] tracking-widest uppercase"
                      style={{ color: project.accentColor }}
                    >
                      {project.platform}
                    </span>
                    <h3 className="font-display text-lg font-semibold text-text-primary leading-snug">
                      {project.title}
                    </h3>
                    <p className="font-body text-xs text-text-secondary">
                      {project.subtitle}
                    </p>
                  </div>

                  {/* Kanji + status */}
                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <span
                      className="font-display text-3xl font-light select-none"
                      style={{ color: project.accentColor, opacity: 0.2 }}
                      aria-hidden="true"
                    >
                      {project.kanji}
                    </span>
                    <span
                      className={`font-mono text-[9px] tracking-widest uppercase border rounded-sm px-2 py-0.5 ${statusColors[project.status]}`}
                    >
                      {project.status}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="font-body text-sm leading-7 text-text-secondary mb-5 flex-1">
                  {project.description}
                </p>

                {/* Highlights */}
                <ul className="mb-5 space-y-1.5">
                  {project.highlights.map((h) => (
                    <li key={h} className="flex items-center gap-2 font-body text-xs text-text-secondary">
                      <span className="h-px w-3 shrink-0" style={{ background: project.accentColor }} />
                      {h}
                    </li>
                  ))}
                </ul>

                {/* Tech stack */}
                <div className="mb-5 flex flex-wrap gap-1.5">
                  {project.tech.map((t) => (
                    <NeonBadge key={t} label={t} color={badgeColor(project.accentColor)} size="sm" />
                  ))}
                </div>

                {/* Action links */}
                <div className="flex gap-3 mt-auto pt-2 border-t border-white/5">
                  <a
                    href={project.github}
                    className="flex-1 text-center font-mono text-xs text-text-secondary border border-white/8 rounded-sm py-2 hover:text-text-primary hover:border-white/20 transition-colors duration-200"
                  >
                    GitHub
                  </a>
                  <a
                    href={project.demo}
                    className="flex-1 text-center font-mono text-xs rounded-sm py-2 border transition-all duration-200"
                    style={{
                      color: project.accentColor,
                      borderColor: `${project.accentColor}40`,
                      backgroundColor: `${project.accentColor}08`,
                    }}
                  >
                    Live Demo
                  </a>
                </div>
              </GlowCard>
            </motion.div>
          ))}
        </div>

        {/* ── Other Projects ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="font-mono text-xs tracking-widest text-text-muted uppercase mb-6">
            — Other Projects
          </h3>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {otherProjects.map((project, i) => (
              <motion.a
                key={project.title}
                href={project.link}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="group flex flex-col gap-4 rounded-xl border border-white/6 bg-dark-card p-6 transition-all duration-300 hover:border-neon-cyan/20 hover:-translate-y-1 hover:shadow-[0_4px_24px_rgba(0,245,255,0.08)]"
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-body text-sm font-medium text-text-primary group-hover:text-neon-cyan transition-colors duration-200">
                    {project.title}
                  </h4>
                  <svg className="w-4 h-4 text-text-muted group-hover:text-neon-cyan transition-colors duration-200 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {project.tech.map((t) => (
                    <NeonBadge key={t} label={t} color="cyan" size="sm" />
                  ))}
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
