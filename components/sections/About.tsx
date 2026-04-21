"use client";

import { motion, Variants } from "framer-motion";
import SectionTitle from "@/components/ui/SectionTitle";
import JapaneseDecor from "@/components/ui/JapaneseDecor";

const stats = [
  { value: "3+",  label: "Years Experience", color: "text-neon-cyan" },
  { value: "15+", label: "Projects Built",   color: "text-neon-magenta" },
  { value: "3",   label: "Platforms",        color: "text-neon-amber" },
];

const fadeInUp: Variants = {
  hidden:  { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function About() {
  return (
    <section
      id="about"
      className="relative overflow-hidden py-24 md:py-32"
      style={{ backgroundColor: "#0a0a10" }}
    >
      {/* Subtle grid */}
      <div className="absolute inset-0 bg-grid opacity-30" />

      {/* Kanji decoration */}
      <JapaneseDecor text="経歴" position="right" opacity={0.05} />

      <div className="section-container relative z-10">
        <SectionTitle
          prefix="// "
          title="ABOUT"
          kanji="私について"
          subtitle="A passionate developer building real-world solutions across mobile and web platforms."
        />

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20 lg:items-center">
          {/* Left: Text */}
          <div className="space-y-6">
            {[
              `I'm Akhdan Ravi Andaman, an App & Fullstack Developer based in Bogor, Indonesia. My journey started with a curiosity for how mobile applications work, which led me deep into React Native, Flutter, and Kotlin — building real apps that people actually use.`,
              `Beyond mobile, I love building end-to-end products. From designing APIs with Node.js and Prisma to assembling polished frontends with Next.js and Vue.js, I'm drawn to the entire product lifecycle. Lately, I've been integrating large language models into practical tools that solve genuine problems.`,
              `I believe great software is not just functional — it's intentional. Every detail matters: performance, UX, maintainability. I approach every project like a craftsman: patient, precise, and always learning.`,
            ].map((paragraph, i) => (
              <motion.p
                key={i}
                custom={i}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                className="font-body text-base leading-8 text-text-secondary"
              >
                {paragraph}
              </motion.p>
            ))}

            {/* Tech indicator */}
            <motion.div
              variants={fadeInUp}
              custom={3}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex items-center gap-3 pt-2"
            >
              <div className="h-px w-8 bg-neon-cyan/60" />
              <span className="font-mono text-xs text-text-muted tracking-widest uppercase">
                Mobile · Web · AI
              </span>
            </motion.div>
          </div>

          {/* Right: Stats grid */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-1 lg:gap-6">
            {stats.map(({ value, label, color }, i) => (
              <motion.div
                key={label}
                custom={i}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                className="group relative overflow-hidden rounded-lg border border-white/6 bg-dark-card p-6 transition-all duration-500 hover:border-white/10 hover:-translate-y-1"
              >
                {/* Left accent line */}
                <div
                  className={`absolute left-0 top-0 h-full w-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                    color === "text-neon-cyan"
                      ? "bg-neon-cyan"
                      : color === "text-neon-magenta"
                      ? "bg-neon-magenta"
                      : "bg-neon-amber"
                  }`}
                />

                <div className={`font-display text-5xl font-semibold ${color}`}>
                  {value}
                </div>
                <div className="mt-1 font-body text-sm text-text-secondary">
                  {label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
