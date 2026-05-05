"use client";

import { motion } from "framer-motion";
import Image from "next/image";
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
  "🌏 Tour Leader",
  "🎮 Video Gamer",
  "🎌 Japanese Culture"
];

/* ─── Highlight tags ─────────────────────────────────────────────────────── */
const HIGHLIGHT_TAGS = [
  "IPB University",
  "GPA 3.67",
  "Bogor, Indonesia",
  "Mobile & Web Dev",
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
                   text-[18vw] text-(--color-accent-gold) opacity-[0.08]
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
              &ldquo;I navigate codebases the same way I navigate new cities — with curiosity, adaptability, and the will to explore the unknown. - Akhdan&rdquo;
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
                                  border border-white/10 bg-white/5">
                  <Image
                    src="/icons/logo_migrasi-new-rect.png"
                    alt="Building icon"
                    width={16}
                    height={16}
                    className="h-6 w-6 object-contain"
                  />
                </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-widest text-white/35">
                      Current Position
                    </p>
                    <p className="mt-0.5 text-sm font-semibold text-white/80">
                      PT. Mitra Graha Integrasi
                    </p>
                    <p className="text-xs text-white/45">App Developer</p>
                  </div>
                </div>

                {/* Availability badge */}
                <div className="flex items-center gap-2 mt-2">
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
                <ul className="flex flex-col gap-2.5 mt-2">
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
