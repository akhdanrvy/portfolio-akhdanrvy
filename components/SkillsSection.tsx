"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  SiReact, SiKotlin, SiFlutter, SiDart, SiUnity, SiSwift,
  SiNextdotjs, SiVuedotjs, SiTypescript, SiHtml5, SiCss,
  SiTailwindcss, SiBootstrap, SiFigma,
  SiLaravel, SiPhp, SiMysql, SiPrisma, SiGooglecloud, SiNodedotjs,
  SiGit, SiGithub, SiGitlab, SiWordpress,
} from "react-icons/si";
import { TbApi, TbScript } from "react-icons/tb";
import { useSpring, animated, to } from "@react-spring/web";
import { useTranslation } from "@/hooks/useTranslation";
import SectionPulse from "@/components/effects/SectionPulse";

/* ─── Types ──────────────────────────────────────────────────────────────── */
type TabKey = "All" | "Mobile" | "Frontend" | "Backend & DB" | "Tools";

interface Skill {
  name: string;
  icon: React.ReactNode;
  category: Exclude<TabKey, "All">;
}

/* ─── Skill data ─────────────────────────────────────────────────────────── */
const SKILLS: Skill[] = [
  // Mobile
  { name: "React Native", icon: <SiReact />,   category: "Mobile" },
  { name: "Kotlin",       icon: <SiKotlin />,  category: "Mobile" },
  { name: "Flutter",      icon: <SiFlutter />, category: "Mobile" },
  { name: "Dart",         icon: <SiDart />,    category: "Mobile" },
  { name: "Unity",        icon: <SiUnity />,   category: "Mobile" },
  { name: "Swift",        icon: <SiSwift />,   category: "Mobile" },
  // Frontend
  { name: "Next.js",      icon: <SiNextdotjs />,    category: "Frontend" },
  { name: "Vue.js",       icon: <SiVuedotjs />,     category: "Frontend" },
  { name: "React",        icon: <SiReact />,         category: "Frontend" },
  { name: "TypeScript",   icon: <SiTypescript />,    category: "Frontend" },
  { name: "HTML",         icon: <SiHtml5 />,         category: "Frontend" },
  { name: "CSS",          icon: <SiCss />,           category: "Frontend" },
  { name: "Tailwind CSS", icon: <SiTailwindcss />,   category: "Frontend" },
  { name: "Bootstrap",    icon: <SiBootstrap />,     category: "Frontend" },
  { name: "Figma",        icon: <SiFigma />,         category: "Frontend" },
  // Backend & DB
  { name: "Laravel",      icon: <SiLaravel />,       category: "Backend & DB" },
  { name: "PHP",          icon: <SiPhp />,           category: "Backend & DB" },
  { name: "MySQL",        icon: <SiMysql />,         category: "Backend & DB" },
  { name: "Prisma",       icon: <SiPrisma />,        category: "Backend & DB" },
  { name: "Apps Script",  icon: <TbScript />,        category: "Backend & DB" },
  { name: "REST API",     icon: <TbApi />,           category: "Backend & DB" },
  { name: "Node.js",      icon: <SiNodedotjs />,     category: "Backend & DB" },
  // Tools
  { name: "Git",              icon: <SiGit />,              category: "Tools" },
  { name: "GitHub",           icon: <SiGithub />,           category: "Tools" },
  { name: "GitLab",           icon: <SiGitlab />,           category: "Tools" },
  { name: "Google Workspace", icon: <SiGooglecloud />,      category: "Tools" },
  { name: "WordPress",        icon: <SiWordpress />,        category: "Tools" },
  { name: "MS Office",        icon: <span className="text-sm font-bold">MS</span>, category: "Tools" },
  { name: "Vibe Coding",      icon: <span className="text-base">✦</span>, category: "Tools" },
];

const TABS: TabKey[] = ["All", "Mobile", "Frontend", "Backend & DB", "Tools"];

const LEARNING_BADGES = ["Go/Golang", "Automation Testing", "DevOps", "Vibe Coding 0-5"];

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

/* ─── Radar chart ────────────────────────────────────────────────────────── */
function SkillRadar() {
  const cx = 145, cy = 145, maxR = 88;
  const toRad = (d: number) => (d * Math.PI) / 180;

  const stats = [
    { label: "Mobile",   score: 5, angle: -90  },
    { label: "Frontend", score: 5, angle: -30  },
    { label: "Backend",  score: 4, angle: 30   },
    { label: "QA",       score: 4, angle: 90   },
    { label: "Teamwork", score: 5, angle: 150  },
    { label: "Security", score: 3, angle: 210  },
  ];

  const pt = (angle: number, r: number): [number, number] => [
    cx + r * Math.cos(toRad(angle)),
    cy + r * Math.sin(toRad(angle)),
  ];

  const polygonPts = (r: number) =>
    stats.map(s => pt(s.angle, r).join(",")).join(" ");

  const textAnchors = ["middle", "start", "start", "middle", "end", "end"] as const;

  /* ── original vertex positions (score-based) ── */
  const origins: [number, number][] = stats.map(s =>
    pt(s.angle, (s.score / 5) * maxR)
  );

  /* ── per-vertex drag state ── */
  const [positions, setPositions] = useState<{ x: number; y: number }[]>(
    () => origins.map(([x, y]) => ({ x, y }))
  );
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  /* ── per-vertex springs ── */
  const springs = stats.map((_, i) =>
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useSpring({
      x: positions[i].x,
      y: positions[i].y,
      config: { tension: 180, friction: 12, mass: 1 },
    })
  );

  /* interpolate the "points" string from all springs */
  const animatedPoints = to(
    springs.flatMap(s => [s.x, s.y]),
    (...coords) => {
      const pts: string[] = [];
      for (let i = 0; i < coords.length; i += 2)
        pts.push(`${coords[i]},${coords[i + 1]}`);
      return pts.join(" ");
    }
  );

  /* ── pointer helpers ── */
  const getSVGPoint = (e: React.PointerEvent<SVGSVGElement>) => {
    const svg = svgRef.current;
    if (!svg) return { x: e.clientX, y: e.clientY };
    const pt = svg.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;
    const { x, y } = pt.matrixTransform(svg.getScreenCTM()!.inverse());
    return {
      x: Math.max(0, Math.min(290, x)),
      y: Math.max(0, Math.min(280, y)),
    };
  };

  const onDotPointerDown = (e: React.PointerEvent<SVGCircleElement>, i: number) => {
    e.stopPropagation();
    setActiveIdx(i);
    svgRef.current?.setPointerCapture(e.pointerId);
  };

  const onSVGPointerMove = (e: React.PointerEvent<SVGSVGElement>) => {
    if (activeIdx === null) return;
    const { x, y } = getSVGPoint(e);
    setPositions(prev => prev.map((p, i) => (i === activeIdx ? { x, y } : p)));
    springs[activeIdx].x.set(x);
    springs[activeIdx].y.set(y);
  };

  const onSVGPointerUp = (e: React.PointerEvent<SVGSVGElement>) => {
    if (activeIdx === null) return;
    svgRef.current?.releasePointerCapture(e.pointerId);
    const [ox, oy] = origins[activeIdx];
    setPositions(prev => prev.map((p, i) => (i === activeIdx ? { x: ox, y: oy } : p)));
    springs[activeIdx].x.start(ox);
    springs[activeIdx].y.start(oy);
    setActiveIdx(null);
  };

  return (
    <>
      <style>{`
        @keyframes radarPulse {
          0%   { opacity: 0.15; }
          50%  { opacity: 0.40; }
          100% { opacity: 0.15; }
        }
      `}</style>

      <svg
        ref={svgRef}
        viewBox="0 0 290 280"
        className="w-full h-full"
        style={{
          filter: "drop-shadow(0 0 16px rgba(244,184,193,0.10))",
          cursor: activeIdx !== null ? "grabbing" : "default",
          touchAction: "none",
        }}
        onPointerMove={onSVGPointerMove}
        onPointerUp={onSVGPointerUp}
        onPointerCancel={onSVGPointerUp}
      >
        <defs>
          <linearGradient id="radarFill" x1="0.5" y1="0" x2="0.5" y2="1">
            <stop offset="0%"   stopColor="#f4b8c1" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#c9a84c" stopOpacity="0.10" />
          </linearGradient>
          <linearGradient id="radarStroke" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%"   stopColor="#f4b8c1" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#c9a84c" stopOpacity="0.65" />
          </linearGradient>
          <linearGradient id="radarGlow" x1="0.5" y1="0" x2="0.5" y2="1">
            <stop offset="0%"   stopColor="#f4b8c1" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#c9a84c" stopOpacity="0.7" />
          </linearGradient>
          <filter id="glowBlur" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="10" result="blur" />
          </filter>
        </defs>

        {/* Pulse glow polygon — behind everything */}
        <animated.polygon
          points={animatedPoints}
          fill="url(#radarGlow)"
          filter="url(#glowBlur)"
          style={{
            animation: "radarPulse 2.8s ease-in-out infinite",
          }}
        />

        {/* Grid hexagons */}
        {[1, 2, 3, 4, 5].map(l => (
          <polygon
            key={l}
            points={polygonPts((l / 5) * maxR)}
            fill="none"
            stroke={l === 5 ? "rgba(255,255,255,0.13)" : "rgba(255,255,255,0.055)"}
            strokeWidth="1"
          />
        ))}

        {/* Axis lines */}
        {stats.map(s => {
          const [x2, y2] = pt(s.angle, maxR);
          return (
            <line key={s.label}
              x1={cx} y1={cy} x2={x2} y2={y2}
              stroke="rgba(255,255,255,0.07)" strokeWidth="1"
            />
          );
        })}

        {/* Spring-animated data polygon */}
        <animated.polygon
          points={animatedPoints}
          fill="url(#radarFill)"
          stroke="url(#radarStroke)"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />

        {/* Vertex glow + draggable dots */}
        {stats.map((s, i) => {
          const spring = springs[i];
          const isDragging = activeIdx === i;
          return (
            <animated.g key={`dot-${s.label}`} transform={to([spring.x, spring.y], (x, y) => `translate(${x},${y})`)}>
              {/* outer glow circle */}
              <circle
                cx={0} cy={0}
                r={isDragging ? 11 : 7}
                fill={isDragging ? "rgba(201,168,76,0.18)" : "rgba(244,184,193,0.10)"}
                style={{ transition: "r 150ms ease, fill 150ms ease" }}
              />
              {/* main dot — drag handle */}
              <circle
                cx={0} cy={0}
                r={isDragging ? 5 : 3}
                fill={isDragging ? "#c9a84c" : "#f4b8c1"}
                opacity="0.9"
                style={{
                  cursor: isDragging ? "grabbing" : "grab",
                  transition: "r 150ms ease, fill 150ms ease",
                  filter: isDragging
                    ? "drop-shadow(0 0 6px rgba(201,168,76,0.8))"
                    : "none",
                }}
                onPointerDown={(e) => onDotPointerDown(e as unknown as React.PointerEvent<SVGCircleElement>, i)}
              />
            </animated.g>
          );
        })}

        {/* Axis labels */}
        {stats.map((s, i) => {
          const [lx, ly] = pt(s.angle, maxR + 26);
          return (
            <text key={`lbl-${s.label}`}
              x={lx} y={ly}
              textAnchor={textAnchors[i]}
              dominantBaseline="middle"
              fill="rgba(255,255,255,0.42)"
              fontSize="7"
              fontFamily="var(--font-syne, sans-serif)"
              style={{ letterSpacing: "0.09em", textTransform: "uppercase", userSelect: "none" }}
            >
              {s.label}
            </text>
          );
        })}
      </svg>
    </>
  );
}

/* ─── Skill badge ────────────────────────────────────────────────────────── */
function SkillBadge({ skill, index }: { skill: Skill; index: number }) {
  return (
    <motion.div
      key={skill.name}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.28, delay: index * 0.04, ease: "easeOut" }}
      whileHover={{ scale: 1.08 }}
      className="group flex cursor-default items-center gap-2.5 rounded-full
                 border border-white/10 bg-white/5 px-4 py-2
                 backdrop-blur-sm
                 transition-shadow duration-300
                 hover:border-white/20
                 hover:[box-shadow:0_0_18px_rgba(244,184,193,0.22)]"
    >
      <span className="text-base text-white/50 transition-colors duration-200 group-hover:text-white/80">
        {skill.icon}
      </span>
      <span className="text-sm font-medium text-white/65 transition-colors duration-200 group-hover:text-white/90">
        {skill.name}
      </span>
    </motion.div>
  );
}

/* ─── Main component ─────────────────────────────────────────────────────── */
export default function SkillsSection() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<TabKey>("All");

  const filtered =
    activeTab === "All"
      ? SKILLS
      : SKILLS.filter((s) => s.category === activeTab);

  return (
    <section id="skills" className="relative overflow-hidden py-16 md:py-20 lg:py-24">
      <SectionPulse variant="gold-pink" topLeft="60%" topRight="30%" />

      {/* Decorative vertical kanji */}
      <span
        aria-hidden="true"
        className="pointer-events-none select-none absolute left-0 top-1/2
                   -translate-y-1/2 font-heading font-bold leading-none
                   text-[18vw] text-(--color-accent-gold) opacity-[0.08]
                   [writing-mode:vertical-rl]"
      >
        技術
      </span>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative z-10 mx-auto max-w-6xl px-6 lg:px-8"
      >
        {/* Label + heading — radar chart on the right */}
        <div className="mb-12 flex flex-col gap-8 md:flex-row md:items-center md:gap-10">
          {/* Text */}
          <div className="flex-1">
            <SectionLabel label="02 / SKILLS" />
            <h2 className="mt-4 font-heading text-4xl font-bold tracking-tight text-white/95 sm:text-5xl">
              {t("skills.title")}
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/45">
              {t("skills.subtitle")}
            </p>
          </div>

          {/* Radar chart */}
          <div className="mx-auto w-56 shrink-0 md:mx-0 md:w-60 lg:w-64">
            <SkillRadar />
          </div>
        </div>

        {/* Tab filter */}
        <div className="mb-10 flex flex-wrap gap-2" role="tablist" aria-label="Skill categories">
          {TABS.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveTab(tab)}
                className={`relative px-5 py-2 text-sm font-medium tracking-wide
                            rounded-full transition-colors duration-200
                            focus-visible:outline-none focus-visible:ring-2
                            focus-visible:ring-accent-pink/50
                            ${isActive
                              ? "text-(--color-accent-pink)"
                              : "text-white/40 hover:text-white/70"
                            }`}
              >
                {/* Framer Motion sliding background pill */}
                {isActive && (
                  <motion.span
                    layoutId="skills-tab-indicator"
                    className="absolute inset-0 rounded-full border border-white/10
                               bg-white/6"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                {/* Gold underline bar */}
                {isActive && (
                  <motion.span
                    layoutId="skills-tab-underline"
                    className="absolute bottom-0 left-1/2 h-0.5 w-6 -translate-x-1/2
                               rounded-full bg-(--color-accent-gold)"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative">{tab}</span>
              </button>
            );
          })}
        </div>

        {/* Skills grid */}
        <div
          role="tabpanel"
          aria-label={`${activeTab} skills`}
          className="min-h-30"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="flex flex-wrap gap-3"
            >
              {filtered.map((skill, i) => (
                <SkillBadge key={`${activeTab}-${skill.name}`} skill={skill} index={i} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Currently Learning */}
        <div className="mt-16">
          <div className="mb-5 flex items-center gap-4">
            <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-white/35">
              Currently Learning
            </span>
            <div className="h-px flex-1 bg-linear-to-r from-white/10 to-transparent" />
          </div>

          <div className="flex flex-wrap gap-3">
            {LEARNING_BADGES.map((badge, i) => (
              <div
                key={badge}
                className="relative overflow-hidden inline-flex items-center gap-2
                           rounded-full border border-accent-gold/25
                           bg-accent-gold/5 px-5 py-2
                           text-sm font-medium text-(--color-accent-gold)"
                style={{ animationDelay: `${i * 0.3}s` }}
              >
                {/* Shimmer sweep */}
                <span
                  className="absolute inset-0 -translate-x-full"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent 0%, rgba(201,168,76,0.18) 50%, transparent 100%)",
                    animation: `shimmerSweep 2.8s ease-in-out ${i * 0.5}s infinite`,
                  }}
                />
                <span className="relative">{badge}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Keyframe for shimmer */}
      <style>{`
        @keyframes shimmerSweep {
          0%   { transform: translateX(-100%); }
          60%  { transform: translateX(200%);  }
          100% { transform: translateX(200%);  }
        }
      `}</style>
    </section>
  );
}
