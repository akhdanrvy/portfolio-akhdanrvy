"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "@/hooks/useTranslation";
import type { Language } from "@/context/i18nContext";
import ThemeToggle from "@/components/ui/ThemeToggle";

/* ─── Constants ──────────────────────────────────────────────────────────── */
const NAV_ITEMS = [
  { key: "home",       href: "#hero"       },
  { key: "about",      href: "#about"      },
  { key: "skills",     href: "#skills"     },
  { key: "experience", href: "#experience" },
  { key: "projects",   href: "#projects"   },
  { key: "contact",    href: "#contact"    },
] as const;

const SECTION_IDS = NAV_ITEMS.map((item) => item.href.replace("#", ""));

/* ─── Sub-components ─────────────────────────────────────────────────────── */

/** Animated "RVY" logo with a gold dot accent */
function Logo() {
  return (
    <a
      href="#hero"
      onClick={(e) => smoothScroll(e, "hero")}
      className="group flex items-end gap-0.75 select-none"
      aria-label="Akhdan Ravi Andaman — home"
    >
      <span
        className="font-heading text-xl font-bold tracking-widest text-(--color-text)
                   transition-colors duration-300 group-hover:text-(--color-text)"
      >
        RVY
      </span>
      {/* Gold dot accent */}
      <span
        className="mb-1.25 h-1.25 w-1.25 rounded-full bg-(--color-accent-gold)
                   transition-transform duration-300 group-hover:scale-125"
      />
    </a>
  );
}

/** EN | ID language toggle pill */
function LanguagePill({
  language,
  setLanguage,
}: {
  language: Language;
  setLanguage: (l: Language) => void;
}) {
  const langs: Language[] = ["en", "id"];

  return (
    <div
      role="group"
      aria-label="Language selector"
      className="relative flex items-center rounded-full border border-(--glass-border)
                 bg-(--color-glass) p-0.75 text-xs font-semibold tracking-widest uppercase"
    >
      {langs.map((lang) => {
        const isActive = language === lang;
        return (
          <button
            key={lang}
            onClick={() => setLanguage(lang)}
            className="relative z-10 cursor-pointer rounded-full px-3 py-1.25
                       transition-colors duration-200
                       focus-visible:outline-none focus-visible:ring-2
                       focus-visible:ring-(--color-accent-gold)"
            aria-pressed={isActive}
          >
            {/* Framer Motion sliding indicator */}
            {isActive && (
              <motion.span
                layoutId="lang-pill"
                className="absolute inset-0 rounded-full border
                           border-accent-gold/60
                           bg-(--color-glass-hover)"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            <span
              className={`relative transition-colors duration-200 ${
                isActive
                  ? "text-(--color-accent-gold)"
                  : "text-(--color-text-muted) hover:text-(--color-text)"
              }`}
            >
              {lang.toUpperCase()}
            </span>
          </button>
        );
      })}
    </div>
  );
}

/* ─── Utility ────────────────────────────────────────────────────────────── */
function smoothScroll(
  e: React.MouseEvent<HTMLAnchorElement>,
  id: string,
) {
  e.preventDefault();
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

/* ─── Main Component ─────────────────────────────────────────────────────── */
export default function Navbar() {
  const { t, language, setLanguage } = useTranslation();

  const [scrolled, setScrolled]       = useState(false);
  const [activeId, setActiveId]       = useState<string>("hero");
  const [menuOpen, setMenuOpen]       = useState(false);
  const observerRef                   = useRef<IntersectionObserver | null>(null);

  /* ── Scroll listener: glass + padding transition ──────────────────────── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── IntersectionObserver: active section detection ──────────────────── */
  useEffect(() => {
    observerRef.current?.disconnect();

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
    );

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observerRef.current!.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  /* ── Lock body scroll while mobile menu is open ───────────────────────── */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  /* ── Close menu on resize to desktop ─────────────────────────────────── */
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <>
      {/* ═══ Navbar bar ══════════════════════════════════════════════════ */}
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.5 }}
        className={`
          fixed inset-x-0 top-0 z-50 w-full
          transition-all duration-500 ease-out
          ${scrolled
            ? "border-b border-(--glass-border) bg-(--color-glass) shadow-glass backdrop-blur-lg py-3"
            : "border-b border-transparent bg-transparent py-6"
          }
        `}
      >
        <nav
          className="mx-auto flex max-w-6xl items-center justify-between px-6 lg:px-8"
          aria-label="Primary navigation"
        >
          {/* Logo */}
          <Logo />

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-1" role="list">
            {NAV_ITEMS.map(({ key, href }) => {
              const id       = href.replace("#", "");
              const isActive = activeId === id;
              return (
                <li key={key}>
                  <a
                    href={href}
                    onClick={(e) => smoothScroll(e, id)}
                    className={`
                      relative px-3 py-1.5 text-sm font-medium tracking-wide
                      transition-colors duration-200 rounded-md
                      focus-visible:outline-none focus-visible:ring-2
                      focus-visible:ring-accent-pink/60
                      ${isActive
                        ? "text-(--color-text)"
                        : "text-(--color-text-muted) hover:text-(--color-text)"
                      }
                    `}
                    aria-current={isActive ? "location" : undefined}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-indicator"
                        className="absolute inset-0 rounded-md bg-(--color-glass-hover)
                                   border border-(--glass-border)"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                    <span className="relative">{t(`nav.${key}`)}</span>
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Right controls */}
          <div className="flex items-center gap-3">
            {/* Theme toggle */}
            <ThemeToggle />

            {/* Language toggle — always visible */}
            <LanguagePill language={language} setLanguage={setLanguage} />

            {/* Hamburger — mobile only */}
            <button
              onClick={() => setMenuOpen(true)}
              className="md:hidden flex flex-col justify-center items-center
                         h-9 w-9 rounded-lg border border-(--glass-border) bg-(--color-glass)
                         gap-1.25 transition-colors hover:bg-(--color-glass-hover)
                         focus-visible:outline-none focus-visible:ring-2
                         focus-visible:ring-accent-pink/60"
              aria-label="Open navigation menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              <span className="h-px w-5 bg-(--color-text) rounded-full" />
              <span className="h-px w-5 bg-(--color-text) rounded-full" />
              <span className="h-px w-3.5 bg-(--color-text) rounded-full self-start ml-1.25" />
            </button>
          </div>
        </nav>
      </motion.header>

      {/* ═══ Mobile full-screen overlay ══════════════════════════════════ */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-60 bg-black/60 backdrop-blur-sm md:hidden"
              onClick={() => setMenuOpen(false)}
              aria-hidden="true"
            />

            {/* Slide-in panel */}
            <motion.div
              id="mobile-menu"
              key="mobile-menu"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 38 }}
              className="
                fixed inset-y-0 right-0 z-70
                w-[min(340px,100vw)]
                flex flex-col
                overflow-hidden
                bg-(--color-bg)
                border-l border-(--glass-border)
                backdrop-blur-2xl
                md:hidden
              "
              aria-modal="true"
              role="dialog"
              aria-label="Navigation menu"
            >
              {/* Decorative Japanese watermark */}
              <span
                aria-hidden="true"
                className="
                  pointer-events-none select-none
                  absolute -right-6 bottom-12
                  font-heading text-[11rem] font-bold leading-none
                  text-(--color-text) opacity-[0.035] rotate-0
                ">
                メニュー
              </span>

              {/* Close button */}
              <div className="flex items-center justify-between px-8 pt-7 pb-4">
                <Logo />
                <button
                  onClick={() => setMenuOpen(false)}
                  className="flex h-9 w-9 items-center justify-center rounded-lg
                             border border-(--glass-border) bg-(--color-glass) text-(--color-text-muted)
                             transition-colors hover:bg-(--color-glass-hover) hover:text-(--color-text)
                             focus-visible:outline-none focus-visible:ring-2
                             focus-visible:ring-accent-pink/60"
                  aria-label="Close navigation menu"
                >
                  {/* × icon */}
                  <svg
                    viewBox="0 0 14 14"
                    className="h-3.5 w-3.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  >
                    <path d="M1 1l12 12M13 1L1 13" />
                  </svg>
                </button>
              </div>

              {/* Divider */}
              <div className="mx-8 h-px bg-linear-to-r from-transparent via-(--glass-border) to-transparent" />

              {/* Nav links */}
              <nav className="flex flex-1 flex-col justify-center px-8 gap-1">
                {NAV_ITEMS.map(({ key, href }, i) => {
                  const id       = href.replace("#", "");
                  const isActive = activeId === id;
                  return (
                    <motion.a
                      key={key}
                      href={href}
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.06 * i, duration: 0.35, ease: "easeOut" }}
                      onClick={(e) => {
                        smoothScroll(e, id);
                        setMenuOpen(false);
                      }}
                      className={`
                        group relative flex items-center gap-3
                        rounded-xl px-4 py-3.5
                        font-heading text-2xl font-semibold tracking-wide
                        transition-colors duration-200
                        focus-visible:outline-none focus-visible:ring-2
                        focus-visible:ring-accent-pink/60
                        ${isActive
                          ? "text-(--color-text) bg-(--color-glass) border border-(--glass-border)"
                          : "text-(--color-text-muted) hover:text-(--color-text) hover:bg-(--color-glass)"
                        }
                      `}
                      aria-current={isActive ? "location" : undefined}
                    >
                      {/* Gold accent bar */}
                      <span
                        className={`
                          h-5 w-0.75 rounded-full transition-all duration-200
                          ${isActive
                            ? "bg-(--color-accent-gold)"
                            : "bg-(--glass-border) group-hover:bg-(--glass-border)"
                          }
                        `}
                      />
                      {t(`nav.${key}`)}
                    </motion.a>
                  );
                })}
              </nav>

              {/* Bottom controls: theme + language toggles */}
              <div className="px-8 pb-10 pt-4">
                <div className="mx-8 mb-6 h-px bg-linear-to-r from-transparent via-(--glass-border) to-transparent" />
                <div className="flex items-center gap-3">
                  <ThemeToggle />
                  <div className="h-5 w-px bg-(--glass-border)" aria-hidden="true" />
                  <span className="text-xs text-(--color-text-muted) uppercase tracking-widest">
                    Language
                  </span>
                  <LanguagePill language={language} setLanguage={setLanguage} />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
