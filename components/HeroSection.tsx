"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useTranslation } from "@/hooks/useTranslation";
import SakuraFall from "@/components/effects/SakuraFall";

/* ─── Constants ──────────────────────────────────────────────────────────── */
const TYPEWRITER_WORDS = [
  "Mobile Developer",
  "Web Developer",
  "Flutter Developer",
  "Next.js Developer",
];

const SOCIAL_LINKS = [
  {
    label: "GitHub",
    href: "https://github.com/akhdanrvy",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/akhdan-ravi-andaman/",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "Email",
    href: "mailto:akhdanravy@gmail.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="M2 7l10 7 10-7" />
      </svg>
    ),
  },
];

const FLOAT_BADGES = [
  { label: "React Native", delay: "0s",    top: "8%",  right: "-12%"  },
  { label: "Next.js",      delay: "0.7s",  top: "38%", left: "-16%"   },
  { label: "Flutter",      delay: "1.4s",  bottom: "18%", right: "-14%" },
  { label: "Kotlin",       delay: "2.1s",  bottom: "2%",  left: "-10%" },
];

/* ─── Seigaiha / abstract Japanese wave SVG ─────────────────────────────── */
function SeigaihaBg() {
  const R = 48;
  const cols = 8;
  const rows = 7;
  const arcs: React.ReactNode[] = [];
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const cx = col * R + (row % 2 === 0 ? R / 2 : 0);
      const cy = row * (R * 0.75);
      arcs.push(
        <path
          key={`${row}-${col}`}
          d={`M ${cx - R} ${cy} A ${R} ${R} 0 0 1 ${cx + R} ${cy}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="0.8"
        />,
      );
    }
  }
  return (
    <svg
      viewBox={`0 0 ${cols * R + R} ${rows * R * 0.75 + R}`}
      className="absolute right-0 top-0 h-[85vh] w-auto text-white opacity-[0.045] pointer-events-none select-none"
      aria-hidden="true"
      preserveAspectRatio="xMaxYMin meet"
    >
      {arcs}
    </svg>
  );
}

/* ─── Typewriter hook ────────────────────────────────────────────────────── */
function useTypewriter(words: string[], typingSpeed = 80, deletingSpeed = 40, pauseMs = 2000) {
  const [displayed, setDisplayed] = useState("");
  const [wordIdx, setWordIdx]     = useState(0);
  const [phase, setPhase]         = useState<"typing" | "pausing" | "deleting">("typing");

  useEffect(() => {
    const word = words[wordIdx];
    let timeout: ReturnType<typeof setTimeout>;

    if (phase === "typing") {
      if (displayed.length < word.length) {
        timeout = setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), typingSpeed);
      } else {
        timeout = setTimeout(() => setPhase("pausing"), pauseMs);
      }
    } else if (phase === "pausing") {
      timeout = setTimeout(() => setPhase("deleting"), 0);
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), deletingSpeed);
      } else {
        timeout = setTimeout(() => {
          setWordIdx((prev) => (prev + 1) % words.length);
          setPhase("typing");
        }, 0);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayed, phase, wordIdx, words, typingSpeed, deletingSpeed, pauseMs]);

  return displayed;
}

/* ─── Stagger variants ───────────────────────────────────────────────────── */
const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

/* ─── Main Component ─────────────────────────────────────────────────────── */
export default function HeroSection() {
  const { t }        = useTranslation();
  const typewritten  = useTypewriter(TYPEWRITER_WORDS);

  return (
    <>
      {/* ── Hero section ─────────────────────────────────────────────── */}
      <section
        id="hero"
        className="relative min-h-screen flex items-center overflow-hidden"
      >
        {/* Background SVG */}
        <SeigaihaBg />

        {/* Sakura petals */}
        <SakuraFall />

        {/* Ambient glow blobs */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-32 top-1/4 h-120 w-120
                     rounded-full bg-accent-pink/6 blur-[120px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-1/4 bottom-0 h-95 w-95
                     rounded-full bg-accent-gold/5 blur-[100px]"
        />

        <div className="relative z-10 mx-auto w-full max-w-6xl px-6 py-28 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">

            {/* ── LEFT: Text content ────────────────────────────────── */}
            <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="show"
                  className="flex flex-col gap-6"
                >
                  {/* Role label chip */}
                  <motion.div variants={itemVariants}>
                    <span
                      className="inline-flex items-center gap-2 rounded-full border
                                 border-white/10 bg-white/5 px-4 py-1.5
                                 text-xs font-semibold uppercase tracking-widest
                                 text-(--color-accent-pink) backdrop-blur-sm"
                    >
                      {t("hero.subtitle")}
                      {/* Blinking cursor */}
                      <span
                        className="inline-block h-3 w-0.5 bg-(--color-accent-pink)"
                        style={{ animation: "blink 1.1s step-end infinite" }}
                      />
                    </span>
                  </motion.div>

                  {/* Main heading */}
                  <motion.h1
                    variants={itemVariants}
                    className="font-heading text-5xl font-bold leading-[1.12] tracking-tight
                               text-white/95 sm:text-6xl xl:text-7xl"
                  >
                    <span className="text-(--color-accent-gold)">A</span>
                    khdan{" "}
                    <br className="hidden sm:block" />
                    Ravi{" "}
                    <span className="text-gradient-sakura">Andaman</span>
                  </motion.h1>

                  {/* Typewriter subtitle */}
                  <motion.div
                    variants={itemVariants}
                    className="flex items-center gap-2 text-lg font-medium text-white/70"
                  >
                    <span className="text-(--color-accent-pink) font-heading text-xl">&gt;</span>
                    <span className="font-body">
                      {typewritten}
                      <span
                        className="inline-block w-0.5 h-5 bg-white/60 ml-0.5 align-middle"
                        style={{ animation: "blink 1s step-end infinite" }}
                      />
                    </span>
                  </motion.div>

                  {/* Description */}
                  <motion.p
                    variants={itemVariants}
                    className="max-w-lg text-base leading-relaxed text-white/50"
                  >
                    {t("hero.description")}
                  </motion.p>

                  {/* CTA buttons */}
                  <motion.div variants={itemVariants} className="flex flex-wrap gap-3 pt-1">
                    {/* View Projects */}
                    <a
                      href="#projects"
                      onClick={(e) => {
                        e.preventDefault();
                        document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="group inline-flex items-center gap-2 rounded-full
                                 border border-accent-pink/50
                                 bg-accent-pink/10 px-6 py-3
                                 text-sm font-semibold text-(--color-accent-pink)
                                 backdrop-blur-sm
                                 transition-all duration-300
                                 hover:bg-accent-pink/20
                                 hover:border-accent-pink/80
                                 hover:shadow-[0_0_24px_rgba(244,184,193,0.25)]
                                 focus-visible:outline-none focus-visible:ring-2
                                 focus-visible:ring-accent-pink/60"
                    >
                      {t("hero.cta_primary")}
                      <svg
                        viewBox="0 0 16 16"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                      >
                        <path d="M3 8h10M9 4l4 4-4 4" />
                      </svg>
                    </a>

                    {/* Download CV */}
                    <a
                      href="https://drive.google.com/file/d/1P8so8OLR0XsfbyerpP2mB0ipOzK5yMUp/view?usp=drive_link"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full
                                 bg-(--color-accent-gold) px-6 py-3
                                 text-sm font-semibold text-bg
                                 transition-all duration-300
                                 hover:brightness-110
                                 hover:shadow-[0_0_24px_rgba(201,168,76,0.40)]
                                 focus-visible:outline-none focus-visible:ring-2
                                 focus-visible:ring-accent-gold/60"
                    >
                      <svg
                        viewBox="0 0 16 16"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4"
                      >
                        <path d="M8 2v8M5 7l3 3 3-3M2 12v1a1 1 0 001 1h10a1 1 0 001-1v-1" />
                      </svg>
                      {t("hero.cta_secondary")}
                    </a>
                  </motion.div>

                  {/* Social links */}
                  <motion.div variants={itemVariants} className="flex items-center gap-3 pt-1">
                    {SOCIAL_LINKS.map(({ label, href, icon }) => (
                      <a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={label}
                        className="flex h-9 w-9 items-center justify-center rounded-full
                                   border border-white/10 bg-white/6 text-white/50
                                   backdrop-blur-sm
                                   transition-all duration-200
                                   hover:bg-white/10 hover:text-white hover:border-white/20
                                   hover:shadow-glass
                                   focus-visible:outline-none focus-visible:ring-2
                                   focus-visible:ring-accent-pink/60"
                      >
                        {icon}
                      </a>
                    ))}
                  </motion.div>
                </motion.div>

            {/* ── RIGHT: Photo frame ───────────────────────────────── */}
            <motion.div
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                  className="relative flex items-center justify-center"
                >
                  {/* Ambient glow behind frame */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 m-auto h-72 w-72 rounded-full
                               bg-accent-pink/12 blur-[80px] pointer-events-none"
                  />

                  {/* Outer decorative ring — gold dashed */}
                  <div
                    className="absolute inset-0 m-auto h-85 w-85 rounded-full
                               border-2 border-dashed border-accent-gold/30 pointer-events-none"
                    style={{ animation: "spin 18s linear infinite" }}
                  />
                  <div
                    className="absolute inset-0 m-auto h-95 w-95 rounded-full
                               border border-dashed border-accent-pink/15 pointer-events-none"
                    style={{ animation: "spin 28s linear infinite reverse" }}
                  />

                  {/* Glass + Japanese frame card */}
                  <div
                    className="relative w-72 rounded-[20px] overflow-hidden"
                    style={{
                      background: 'linear-gradient(135deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.03) 100%)',
                      border: '1px solid var(--glass-border)',
                      backdropFilter: 'blur(var(--glass-blur))',
                      WebkitBackdropFilter: 'blur(var(--glass-blur))',
                      boxShadow: 'var(--shadow-glass)',
                    }}
                  >
                    {/* Gold gradient top accent bar */}
                    <div
                      aria-hidden="true"
                      className="absolute top-0 left-0 right-0 h-px"
                      style={{
                        background: 'linear-gradient(90deg, transparent, #c9a84c88, #f4b8c188, transparent)',
                      }}
                    />

                    {/* Japanese corner brackets */}
                    {[
                      'top-3 left-3 border-t-2 border-l-2',
                      'top-3 right-3 border-t-2 border-r-2',
                      'bottom-3 left-3 border-b-2 border-l-2',
                      'bottom-3 right-3 border-b-2 border-r-2',
                    ].map((cls, i) => (
                      <div
                        key={i}
                        aria-hidden="true"
                        className={`absolute h-5 w-5 ${cls} pointer-events-none`}
                        style={{ borderColor: '#c9a84c66' }}
                      />
                    ))}

                    {/* Photo area */}
                    <div className="relative h-80 w-full overflow-hidden">
                      <Image
                        src="/images/portrait/profile-img-akhdan ravi.jpeg"
                        alt="Akhdan Ravi Andaman"
                        fill
                        sizes="288px"
                        className="object-cover object-top"
                        priority
                        onError={(e) => {
                          // Fallback: hide broken image, show monogram
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                      {/* Washi overlay — subtle grain/fade at bottom */}
                      <div
                        aria-hidden="true"
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          background: 'linear-gradient(to bottom, transparent 55%, rgba(10,10,26,0.75) 100%)',
                        }}
                      />
                      {/* Monogram fallback (shown if no photo file) */}
                      <div
                        aria-hidden="true"
                        className="absolute inset-0 flex flex-col items-center justify-center
                                   bg-linear-to-br from-accent-pink/10 to-accent-gold/10 pt-22"
                      >
                        <span
                          className="font-heading text-7xl font-bold text-white/90 select-none"
                          style={{ textShadow: '0 0 40px rgba(201,168,76,0.5)' }}
                        >
                          RVY
                        </span>
                        <span
                          className="font-heading text-2xl mt-1 select-none"
                          style={{ color: '#c9a84c99' }}
                        >
                          匠
                        </span>
                      </div>
                    </div>

                    {/* Caption strip */}
                    <div className="px-5 py-4 flex flex-col gap-1">
                      <p className="font-heading text-sm font-semibold text-white/85 tracking-wide">
                        Akhdan Ravi Andaman
                      </p>
                      <p className="text-[11px] text-white/40 tracking-widest uppercase">
                        Bogor, Indonesia · IPB University
                      </p>
                    </div>

                    {/* Bottom accent bar */}
                    <div
                      aria-hidden="true"
                      className="absolute bottom-0 left-0 right-0 h-px"
                      style={{
                        background: 'linear-gradient(90deg, transparent, #f4b8c166, #c9a84c66, transparent)',
                      }}
                    />
                  </div>

                  {/* Floating skill badges */}
                  <div className="hidden md:contents">
                    {FLOAT_BADGES.map(({ label, delay, ...pos }) => (
                      <div
                        key={label}
                        className="absolute"
                        style={{
                          ...pos,
                          animation: `floatBadge 3.5s ease-in-out ${delay} infinite`,
                        }}
                      >
                        <span
                          className="inline-block whitespace-nowrap rounded-full
                                     border border-white/10 bg-white/8
                                     px-3 py-1 text-[11px] font-semibold
                                     text-white/80 backdrop-blur-sm
                                     shadow-[0_2px_12px_rgba(0,0,0,0.3)]"
                        >
                          {label}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
          </div>
        </div>

        {/* ── Scroll indicator ─────────────────────────────────────────── */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1">
            <span className="text-[10px] uppercase tracking-[0.2em] text-white/25">scroll</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              className="text-white/30"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </motion.div>
          </div>

        {/* ── Global keyframes ──────────────────────────────────────────── */}
        <style>{`
          @keyframes blink {
            0%, 100% { opacity: 1; }
            50%       { opacity: 0; }
          }
          @keyframes spin {
            from { transform: rotate(0deg);   }
            to   { transform: rotate(360deg); }
          }
          @keyframes floatBadge {
            0%, 100% { transform: translateY(0px);   }
            50%      { transform: translateY(-10px);  }
          }
        `}</style>
      </section>
    </>
  );
}
