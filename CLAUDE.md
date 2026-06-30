# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server (localhost:3000)
npm run build    # Production build
npm run lint     # Run ESLint
```

No test suite is configured.

## Environment Variables

Required for the contact form API to send emails:

```
RESEND_API_KEY=        # Resend API key
CONTACT_EMAIL_FROM=    # Sender address (must be verified in Resend)
CONTACT_EMAIL_TO=      # Recipient address (defaults to akhdanravy@gmail.com)
```

## Architecture

Single-page portfolio built with **Next.js 16 App Router**, **React 19**, **TypeScript**, and **Tailwind CSS v4**.

### Page structure

`app/layout.tsx` wraps everything in `ThemeProvider` → `I18nProvider` and renders `Navbar` globally. `app/page.tsx` is a client component that stacks sections in order:

`LoadingScreen` → `HeroSection` → `AboutSection` → `SkillsSection` → `ExperienceSection` → `ProjectsSection` → `InnovationSection` → `CertificationSection` → `ContactSection` → `Footer`

`LoadingScreen` sets `sessionStorage.setItem('introPlayed', '1')` on completion so that `HeroSection` can skip its own intro animation on repeat visits within the same tab session.

The only API route is `app/api/contact/route.ts`, which sends **two emails** via **Resend**: a notification to the site owner and an auto-reply to the sender. It uses in-memory IP rate limiting (3 requests/hour) and **Zod** input validation.

### Theme system

Theme is `dark` (default) or `light`, stored as `data-theme` on `<html>` and persisted to `localStorage` under the key `'portfolio-theme'`. CSS custom properties in `app/globals.css` provide all design tokens under `:root` (dark) and `[data-theme="light"]`. An anti-FOUC inline script in `app/layout.tsx` reads `localStorage` before React hydrates; it also falls back to `prefers-color-scheme`.

React state is managed by `context/themeContext.tsx`. The canonical consumer hook is `hooks/useTheme.ts` (a thin re-export of the context hook):

```ts
const { theme, toggleTheme } = useTheme(); // from '@/hooks/useTheme'
```

Never use hardcoded colours — always reference CSS variables like `var(--color-accent-gold)` or their Tailwind equivalents (`text-(--color-accent-gold)`).

### i18n system

Two locales: `locales/en.json` (source of truth) and `locales/id.json`. Both files must share the same key shape. `context/i18nContext.tsx` resolves dot-notation keys, applies optional `{placeholder}` replacements, falls back to English when a key is missing, and persists the user's choice to `localStorage`.

```ts
const { t, language, setLanguage } = useTranslation(); // from '@/hooks/useTranslation'
t("hero.title")                        // "Akhdan Ravi Andaman"
t("footer.rights", { year: "2026" })   // "© 2026 Akhdan Ravi Andaman…"
```

When adding new UI text, add keys to **both** locale files simultaneously.

### Styling conventions

- **Tailwind v4** with CSS variable theming — use `var(--token)` syntax inside Tailwind classes: `bg-(--color-glass)`, `border-(--glass-border)`, etc.
- **GlassCard** (`components/ui/GlassCard.tsx`) is the primary card primitive; it bundles glassmorphism styles, a washi-paper texture overlay, and an animated conic-gradient border. Its `as` prop lets you render it as any block element (`section`, `article`, etc.), and `noPadding`/`noAnimatedBorder` props give escape hatches.
- `lib/utils.ts` exports `cn()` (clsx + tailwind-merge) for conditional class merging.
- Fonts: `--font-heading` → Noto Serif JP; `--font-body` → Syne (both loaded via `next/font/google`).
- Path alias `@/` maps to the project root.

### Animation

**Framer Motion** handles page-level and section-level animations. **@react-spring/web** is also available. Effects components live in `components/effects/`: `LoadingScreen`, `ScrollProgress`, `SakuraFall` (falling sakura petals, used in `HeroSection` and `ContactSection`), and `SectionPulse`.
