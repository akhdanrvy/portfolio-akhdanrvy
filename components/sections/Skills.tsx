"use client";

import { motion } from "framer-motion";
import { skills } from "@/data/skills";
import GlowCard from "@/components/ui/GlowCard";
import NeonBadge from "@/components/ui/NeonBadge";
import SectionTitle from "@/components/ui/SectionTitle";

const accentColors = ["#00f5ff", "#ff0090", "#ffb700", "#00f5ff", "#ff0090"];
const badgeColors: Array<"cyan" | "magenta" | "amber"> = [
  "cyan", "magenta", "amber", "cyan", "magenta",
];

export default function Skills() {
  return (
    <section
      id="skills"
      className="relative overflow-hidden py-24 md:py-32"
      style={{ backgroundColor: "#050508" }}
    >
      {/* Subtle grid */}
      <div className="absolute inset-0 bg-grid opacity-40" />

      <div className="section-container relative z-10">
        <SectionTitle
          prefix="// "
          title="SKILLS"
          kanji="技術"
          subtitle="Technologies I use to build across mobile, web, and AI platforms."
        />

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((skillCat, i) => (
            <motion.div
              key={skillCat.category}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <GlowCard accentColor={accentColors[i]} hoverable className="h-full">
                {/* Header */}
                <div className="mb-5 flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-2xl" role="img" aria-label={skillCat.category}>
                        {skillCat.icon}
                      </span>
                      <h3 className="font-body text-sm font-semibold text-text-primary">
                        {skillCat.category}
                      </h3>
                    </div>
                  </div>

                  {/* Kanji background decoration */}
                  <span
                    className="font-display text-4xl font-light text-neon-cyan/[0.07] select-none"
                    aria-hidden="true"
                  >
                    {skillCat.kanji}
                  </span>
                </div>

                {/* Tech badges */}
                <div className="flex flex-wrap gap-2">
                  {skillCat.techs.map((tech) => (
                    <NeonBadge
                      key={tech}
                      label={tech}
                      color={badgeColors[i]}
                      size="sm"
                    />
                  ))}
                </div>
              </GlowCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
