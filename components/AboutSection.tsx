"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { useTranslation } from "@/hooks/useTranslation";
import SectionPulse from "@/components/effects/SectionPulse";

/* ─── Section label ──────────────────────────────────────────────────────── */
function SectionLabel({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-4">
      <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-(--color-accent-pink)">
        {label}
      </span>
      <div className="h-px w-10 bg-linear-to-r from-(--color-accent-pink) to-transparent" />
    </div>
  );
}

/* ─── Stats ──────────────────────────────────────────────────────────────── */
const STATS = [
  { value: "3+", label: "Years\nExperience" },
  { value: "4+", label: "Completed\nProjects" },
  { value: "10+", label: "Technologies\nUsed" },
];

/* ─── Fun items ──────────────────────────────────────────────────────────── */
const FUN_ITEMS = [
  "🎮  Unity Game Dev",
  "📱  AR Enthusiast",
  "🌏  Tour Leader",
];

/* ─── Highlight tags ─────────────────────────────────────────────────────── */
const HIGHLIGHT_TAGS = [
  "IPB University",
  "GPA 3.67",
  "Bogor, Indonesia",
  "Tour Leader 🗺️",
];

/* ─── Animation variants ─────────────────────────────────────────────────── */
const leftVariant = {
  hidden: { opacity: 0, x: -60 },
  show:   { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
};

const cardVariant = (delay: number) => ({
  hidden: { opacity: 0, y: 40 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const, delay } },
});

/* ─── Component ──────────────────────────────────────────────────────────── */
export default function AboutSection() {
  const { t } = useTranslation();

  return (
    <section
      id="about"
      className="relative overflow-hidden py-16 md:py-20 lg:py-24"
    >
      <SectionPulse variant="pink-gold" topLeft="35%" topRight="65%" />

      {/* Decorative vertical kanji */}
      <span
        aria-hidden="true"
        className="pointer-events-none select-none absolute right-0 top-1/2
                   -translate-y-1/2 font-heading font-bold leading-none
                   text-[18vw] text-(--color-accent-gold) opacity-[0.04]
                   [writing-mode:vertical-rl]"
      >
        について
      </span>

      <div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-8">
        {/* Section label + heading */}
        <div className="mb-16">
          <SectionLabel label="01 / ABOUT" />
          <h2 className="mt-4 font-heading text-4xl font-bold tracking-tight text-white/95 sm:text-5xl">
            {t("about.title")}
          </h2>
        </div>

        {/* Two-column grid */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[3fr_2fr] lg:gap-16">

          {/* ── LEFT ─────────────────────────────────────────────────── */}
          <motion.div
            variants={leftVariant}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="flex flex-col gap-8"
          >
            {/* Bio paragraphs */}
            <div className="flex flex-col gap-5 text-base leading-relaxed text-white/55">
              <p>{t("about.paragraph_1")}</p>
              <p>{t("about.paragraph_2")}</p>
              <p>{t("about.paragraph_3")}</p>
            </div>

            {/* Personal quote */}
            <blockquote
              className="relative pl-5 italic text-white/70 text-[15px] leading-relaxed
                         before:absolute before:left-0 before:top-0 before:h-full
                         before:w-0.75 before:rounded-full
                         before:bg-linear-to-b before:from-(--color-accent-gold) before:to-(--color-accent-pink)"
            >
              &ldquo;I build things that feel as good as they look.&rdquo;
            </blockquote>

            {/* Highlight tags */}
            <div className="flex flex-wrap gap-2">
              {HIGHLIGHT_TAGS.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center rounded-full border border-white/10
                             bg-white/5 px-4 py-1.5 text-xs font-medium
                             tracking-wide text-white/65 backdrop-blur-sm
                             transition-colors duration-200 hover:border-white/20
                             hover:text-white/85"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          {/* ── RIGHT ────────────────────────────────────────────────── */}
          <div className="relative flex flex-col gap-4 lg:gap-0">

            {/* Stats card */}
            <motion.div
              variants={cardVariant(0)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              className="lg:relative lg:z-30"
            >
              <GlassCard className="flex justify-around gap-4 py-6">
                {STATS.map(({ value, label }) => (
                  <div key={value} className="flex flex-col items-center gap-1 text-center">
                    <span className="font-heading text-3xl font-bold text-(--color-accent-gold)">
                      {value}
                    </span>
                    <span className="whitespace-pre-line text-[11px] uppercase tracking-widest text-white/40">
                      {label}
                    </span>
                  </div>
                ))}
              </GlassCard>
            </motion.div>

            {/* Status card */}
            <motion.div
              variants={cardVariant(0.15)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              className="lg:relative lg:z-20 lg:-mt-2 lg:ml-4"
            >
              <GlassCard className="flex flex-col gap-3">
                <div className="flex items-start gap-3">
                  {/* Building icon */}
                  <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg
                                  border border-white/10 bg-white/5 text-white/50">
                    <svg viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4">
                      <path d="M2 2h5v5H2V2zm0 7h5v5H2V9zm7-7h5v5H9V2zm0 7h5v5H9V9z"
                            fillOpacity="0.7" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-widest text-white/35">
                      Current Position
                    </p>
                    <p className="mt-0.5 text-sm font-semibold text-white/80">
                      PT. Mitra Graha Integrasi
                    </p>
                    <p className="text-xs text-white/45">App Developer · Full-time</p>
                  </div>
                </div>

                {/* Availability badge */}
                <div className="flex items-center gap-2">
                  {/* Pulsing green dot */}
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full
                                     bg-green-400 opacity-60" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-400" />
                  </span>
                  <span className="text-xs font-medium text-green-400">Open to Freelance</span>
                </div>
              </GlassCard>
            </motion.div>

            {/* Fun card */}
            <motion.div
              variants={cardVariant(0.3)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              className="lg:relative lg:z-10 lg:-mt-2 lg:ml-8"
            >
              <GlassCard className="flex flex-col gap-3">
                <p className="text-[11px] uppercase tracking-widest text-white/35">
                  Beyond the Code
                </p>
                <ul className="flex flex-col gap-2.5">
                  {FUN_ITEMS.map((item) => (
                    <li
                      key={item}
                      className="text-sm font-medium text-white/70 transition-colors
                                 duration-200 hover:text-white/90"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
