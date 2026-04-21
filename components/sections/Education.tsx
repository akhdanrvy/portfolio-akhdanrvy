"use client";

import { motion } from "framer-motion";
import { education } from "@/data/education";
import NeonBadge from "@/components/ui/NeonBadge";
import SectionTitle from "@/components/ui/SectionTitle";

export default function Education() {
  return (
    <section
      id="education"
      className="relative overflow-hidden py-24 md:py-32"
      style={{ backgroundColor: "#0a0a10" }}
    >
      <div className="absolute inset-0 bg-grid opacity-30" />

      <div className="section-container relative z-10">
        <SectionTitle
          prefix="// "
          title="EDUCATION"
          kanji="教育"
          subtitle="Where I built the foundation for everything I do."
        />

        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-1">
          {education.map((edu, i) => (
            <motion.div
              key={edu.institution}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="relative group overflow-hidden rounded-xl border border-white/6 bg-dark-card p-8 md:p-12 transition-all duration-500 hover:border-neon-cyan/20 hover:shadow-[0_8px_48px_rgba(0,245,255,0.06)]"
            >
              {/* Top accent line */}
              <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-neon-cyan/60 via-neon-magenta/40 to-transparent" />

              {/* Background kanji */}
              <div
                className="pointer-events-none absolute right-6 top-1/2 -translate-y-1/2 font-display text-[8rem] font-light text-neon-cyan/4 select-none leading-none"
                aria-hidden="true"
              >
                学
              </div>

              <div className="relative flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                {/* Left: Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <NeonBadge
                      label={edu.status}
                      color={edu.status === "Active" ? "cyan" : "amber"}
                      size="sm"
                    />
                    <span className="font-mono text-xs text-text-muted">{edu.period}</span>
                  </div>

                  <h3 className="font-display text-2xl md:text-3xl font-semibold text-text-primary mb-1">
                    {edu.institution}
                  </h3>
                  <p className="font-body text-base text-text-secondary mb-6">
                    {edu.degree}
                  </p>

                  {/* Highlights */}
                  <div className="flex flex-wrap gap-2">
                    {edu.highlights.map((h) => (
                      <NeonBadge key={h} label={h} color="cyan" size="sm" />
                    ))}
                  </div>
                </div>

                {/* Right: GPA */}
                <div className="shrink-0 flex flex-col items-start md:items-end gap-1">
                  <span className="font-mono text-xs text-text-muted uppercase tracking-widest">
                    GPA
                  </span>
                  <span className="font-display text-4xl font-semibold text-neon-cyan">
                    {edu.gpa.split(" ")[0]}
                  </span>
                  <span className="font-mono text-xs text-text-muted">
                    {edu.gpa.split(" ").slice(1).join(" ")}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
