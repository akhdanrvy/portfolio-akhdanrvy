"use client";

import { motion } from "framer-motion";
import { experiences } from "@/data/experience";
import NeonBadge from "@/components/ui/NeonBadge";
import SectionTitle from "@/components/ui/SectionTitle";
import JapaneseDecor from "@/components/ui/JapaneseDecor";

const typeBadgeColors: Record<string, "cyan" | "magenta" | "amber"> = {
  Internship:   "cyan",
  Organization: "magenta",
  Freelance:    "amber",
  "Full-time":  "cyan",
};

export default function Experience() {
  return (
    <section
      id="experience"
      className="relative overflow-hidden py-24 md:py-32"
      style={{ backgroundColor: "#050508" }}
    >
      <div className="absolute inset-0 bg-grid opacity-30" />
      <JapaneseDecor text="経験" position="left" opacity={0.05} />

      <div className="section-container relative z-10">
        <SectionTitle
          prefix="// "
          title="EXPERIENCE"
          kanji="経験"
          subtitle="Professional experience and organizational leadership roles."
        />

        {/* Timeline */}
        <div className="relative pl-8 md:pl-12">
          {/* Neon vertical timeline line */}
          <div className="absolute left-0 top-2 bottom-2 md:left-4 w-px bg-linear-to-b from-neon-cyan/60 via-neon-magenta/40 to-transparent" />

          <div className="space-y-12 md:space-y-16">
            {experiences.map((exp, i) => (
              <motion.div
                key={`${exp.company}-${i}`}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="relative"
              >
                {/* Timeline dot */}
                <div
                  className="absolute -left-8 md:-left-12 top-6 flex h-3 w-3 -translate-x-1/2 items-center justify-center"
                >
                  <span
                    className="h-3 w-3 rounded-full shadow-[0_0_8px_currentColor]"
                    style={{ backgroundColor: exp.accentColor, color: exp.accentColor }}
                  />
                </div>

                {/* Card */}
                <div className="group rounded-xl border border-white/6 bg-dark-card p-6 md:p-8 transition-all duration-500 hover:border-white/10 hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
                  {/* Top row */}
                  <div className="mb-3 flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <NeonBadge label={exp.type} color={typeBadgeColors[exp.type]} size="sm" />
                      </div>
                      <h3 className="font-display text-lg font-semibold text-text-primary">
                        {exp.role}
                      </h3>
                      <p className="font-body text-sm font-medium" style={{ color: exp.accentColor }}>
                        {exp.company}
                      </p>
                    </div>
                    <span className="font-mono text-xs text-text-muted shrink-0 mt-1">
                      {exp.period}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="font-body text-sm leading-7 text-text-secondary mb-4">
                    {exp.description}
                  </p>

                  {/* Tech */}
                  <div className="flex flex-wrap gap-2">
                    {exp.tech.map((t) => (
                      <NeonBadge key={t} label={t} color={typeBadgeColors[exp.type]} size="sm" />
                    ))}
                  </div>

                  {/* Accent left line on hover */}
                  <div
                    className="absolute left-0 top-0 bottom-0 w-0.5 rounded-l-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: exp.accentColor }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
