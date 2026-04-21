"use client";

import { useEffect, useState } from "react";
import { motion, Variants } from "framer-motion";
import { cn } from "@/lib/utils";

const roles = ["React Native", "Flutter", "Kotlin", "Next.js"];

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};

const itemVariants: Variants = {
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const current = roles[roleIndex];

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (charIndex < current.length) {
          setDisplayed(current.slice(0, charIndex + 1));
          setCharIndex((c) => c + 1);
        } else {
          setTimeout(() => setIsDeleting(true), 1600);
        }
      } else {
        if (charIndex > 0) {
          setDisplayed(current.slice(0, charIndex - 1));
          setCharIndex((c) => c - 1);
        } else {
          setIsDeleting(false);
          setRoleIndex((r) => (r + 1) % roles.length);
        }
      }
    }, isDeleting ? 50 : 90);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, roleIndex]);

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
      style={{ backgroundColor: "#050508" }}
    >
      {/* Grid background */}
      <div className="absolute inset-0 bg-grid opacity-60" />

      {/* Radial glow behind content */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-[500px] w-[500px] rounded-full bg-neon-cyan/4 blur-[120px]" />
      </div>

      {/* Scanline overlay */}
      <div className="scanline-overlay absolute inset-0 pointer-events-none" />

      {/* Right kanji decoration */}
      <div
        className="pointer-events-none absolute right-8 top-1/2 -translate-y-1/2 select-none hidden lg:flex flex-col items-center gap-3"
        aria-hidden="true"
        style={{ opacity: 0.07 }}
      >
        <div className="h-24 w-px bg-neon-cyan" />
        {"開発者".split("").map((char, i) => (
          <span
            key={i}
            className="font-display text-5xl font-light text-neon-cyan leading-none"
          >
            {char}
          </span>
        ))}
        <div className="h-24 w-px bg-neon-cyan" />
      </div>

      {/* Left subtle kanji */}
      <div
        className="pointer-events-none absolute left-8 top-1/2 -translate-y-1/2 select-none hidden xl:flex flex-col items-center gap-3"
        aria-hidden="true"
        style={{ opacity: 0.04 }}
      >
        <div className="h-16 w-px bg-neon-magenta" />
        {"構築".split("").map((char, i) => (
          <span
            key={i}
            className="font-display text-4xl font-light text-neon-magenta leading-none"
          >
            {char}
          </span>
        ))}
        <div className="h-16 w-px bg-neon-magenta" />
      </div>

      {/* Main content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="section-container relative z-10 text-center"
        style={{ maxWidth: "900px" }}
      >
        {/* Badge */}
        <motion.div variants={itemVariants} className="mb-6 flex justify-center">
          <span
            className={cn(
              "inline-flex items-center gap-2 rounded-sm border border-neon-cyan/40 px-4 py-1.5",
              "font-mono text-xs text-neon-cyan tracking-[0.2em] uppercase",
              "animate-glow-pulse bg-neon-cyan/5"
            )}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-neon-cyan animate-pulse" />
            App Developer
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          variants={itemVariants}
          className="font-display text-4xl font-semibold leading-tight tracking-tight text-text-primary sm:text-5xl md:text-6xl lg:text-7xl"
        >
          Akhdan{" "}
          <span className="text-gradient-cyan">Ravi</span>{" "}
          Andaman
        </motion.h1>

        {/* Tagline */}
        <motion.p
          variants={itemVariants}
          className="mt-4 font-body text-base text-text-secondary md:text-lg"
        >
          Building experiences across every screen — from pocket to browser.
        </motion.p>

        {/* Typing animation */}
        <motion.div
          variants={itemVariants}
          className="mt-6 flex items-center justify-center gap-3"
        >
          <span className="font-mono text-sm text-text-muted">Specializing in</span>
          <span className="font-mono text-base font-medium text-neon-cyan min-w-[140px] text-left">
            {displayed}
            <span className="animate-blink ml-0.5 text-neon-cyan/80">|</span>
          </span>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
        >
          <a
            href="#projects"
            id="hero-see-work-btn"
            className={cn(
              "inline-flex items-center gap-2 rounded-sm px-8 py-3.5",
              "bg-neon-cyan text-dark-primary font-body font-semibold text-sm",
              "transition-all duration-300 hover:shadow-[0_0_24px_rgba(0,245,255,0.4)] hover:scale-105",
              "active:scale-95"
            )}
          >
            See My Work
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
          <a
            href="#contact"
            id="hero-contact-btn"
            className={cn(
              "inline-flex items-center gap-2 rounded-sm border border-neon-cyan/40 px-8 py-3.5",
              "font-body font-medium text-sm text-text-primary",
              "transition-all duration-300 hover:border-neon-cyan/70 hover:bg-neon-cyan/5 hover:text-neon-cyan",
              "hover:shadow-[0_0_16px_rgba(0,245,255,0.1)]"
            )}
          >
            Contact Me
          </a>
        </motion.div>

        {/* Tech stack quick-glance */}
        <motion.div
          variants={itemVariants}
          className="mt-12 flex flex-wrap justify-center gap-x-6 gap-y-2"
        >
          {["React Native", "Flutter", "Kotlin", "Next.js", "TypeScript"].map((tech) => (
            <span key={tech} className="font-mono text-xs text-text-muted">
              {tech}
            </span>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <span className="font-mono text-[10px] tracking-[0.2em] text-text-muted uppercase">
          Scroll
        </span>
        <div className="flex flex-col items-center gap-1">
          <div className="h-6 w-px bg-linear-to-b from-neon-cyan/40 to-transparent animate-float" />
          <div
            className="h-1.5 w-1.5 rounded-full bg-neon-cyan/60 animate-float"
            style={{ animationDelay: "0.3s" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
