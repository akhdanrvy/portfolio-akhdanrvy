# 🎴 Akhdan Ravi Andaman — Portfolio Website Prompt Guide
> Next.js · Glassmorphism × Japanese Style · i18n · Fully Responsive

---

## 📌 Overview

Panduan ini berisi prompt step-by-step untuk membangun website portfolio profesional menggunakan **Next.js 14+ (App Router)**, dengan tema **Glassmorphism × Japanese Aesthetic**, animasi interaktif, dan dukungan **bilingual (EN/ID)** via i18n context (tanpa backend).

---

## 🧱 Tech Stack

| Layer | Teknologi |
|---|---|
| Framework | Next.js 14+ (App Router) |
| Styling | Tailwind CSS + Custom CSS Variables |
| Animation | Framer Motion |
| i18n | React Context (no backend, JSON locale files) |
| Icons | React Icons |
| Fonts | Google Fonts via next/font (Noto Serif JP + Syne) |
| Deployment | Vercel (rekomendasi) |

---

## 🗂️ Struktur File yang Dihasilkan

```
/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── Navbar.tsx
│   ├── HeroSection.tsx
│   ├── AboutSection.tsx
│   ├── SkillsSection.tsx
│   ├── ExperienceSection.tsx
│   ├── ProjectsSection.tsx
│   ├── ContactSection.tsx
│   ├── Footer.tsx
│   ├── ui/
│   │   ├── GlassCard.tsx
│   │   └── LanguageToggle.tsx
│   └── effects/
│       ├── SakuraParticles.tsx
│       └── ScrollProgress.tsx
├── context/
│   └── i18nContext.tsx
├── locales/
│   ├── en.json
│   └── id.json
├── hooks/
│   └── useTranslation.ts
└── public/
    └── assets/
```

---

## 🪄 STEP-BY-STEP PROMPTS

---

### STEP 1 — Project Setup & Design System

**Tujuan:** Membuat fondasi visual, CSS variables, dan konfigurasi Tailwind.

```
You are a senior frontend developer and UI/UX designer.

I am building a personal portfolio website using Next.js 14+ (App Router) with Tailwind CSS and Framer Motion.

The design theme is: Glassmorphism x Japanese Minimalism.

Design Direction:
- Color palette: Deep navy/indigo (#0a0a1a) as base, soft sakura pink (#f4b8c1) and gold (#c9a84c) as accents, white/translucent glass panels
- Japanese aesthetic: subtle washi paper texture overlays, decorative SVGs inspired by torii gates or cherry blossoms drawn in code (not images), vertical Japanese typography accent elements (purely decorative)
- Glassmorphism: All cards and panels use backdrop-filter blur, semi-transparent backgrounds, subtle white borders
- Typography: "Noto Serif JP" for headings, "Syne" for body text
- Mood: Elegant, international, professional yet artistic

Tasks:
1. Create app/globals.css with all CSS custom properties: --color-bg, --color-glass, --color-accent-pink, --color-accent-gold, --color-text, --glass-border, --glass-blur, --shadow-glass. Also add custom scrollbar styles, text selection color (sakura pink bg + white text), smooth scroll on html, and a subtle CSS grain/noise texture on body.

2. Create tailwind.config.ts that extends the theme with these custom colors and adds font families for "Noto Serif JP" and "Syne".

3. Create app/layout.tsx with:
   - Google Fonts loaded via next/font/google (Noto_Serif_JP weights 300,400,700 and Syne weights 400,600,700)
   - Full SEO metadata (title, description, og tags) for Akhdan Ravi Andaman's portfolio
   - Apply font variables to body

4. Create components/ui/GlassCard.tsx — a reusable React component that applies glassmorphism styling. Accept className and children props.

Output each file separately with full production-ready TypeScript code. No explanations, just clean code.
```

---

### STEP 2 — i18n Context & Locale Files

**Tujuan:** Membuat sistem bilingual (EN/ID) menggunakan React Context.

```
Continue building the Next.js portfolio. Now create the internationalization (i18n) system using React Context only (no external i18n library, no backend).

Owner profile:
- Name: Akhdan Ravi Andaman
- Title: App Developer & Fullstack Web Developer
- Focus: Mobile Development (React Native, Kotlin, Flutter) + Frontend (Next.js, Vue.js)
- Location: Bogor, Indonesia
- Email: akhdanravy@gmail.com
- LinkedIn: https://www.linkedin.com/in/akhdan-ravi-andaman/

Tasks:

1. Create context/i18nContext.tsx:
   - Provides language state (default: 'en')
   - Provides setLanguage function
   - Provides t(key: string) function that resolves dot-notation keys (e.g. t('hero.title'))
   - Persists language choice in localStorage
   - Wraps children and exports I18nProvider and useI18n

2. Create hooks/useTranslation.ts:
   - Custom hook that returns { t, language, setLanguage } from useI18n context

3. Create locales/en.json with ALL text content for the portfolio:
   - nav: { home, about, skills, experience, projects, contact }
   - hero: { greeting, title, subtitle, description, cta_primary, cta_secondary }
   - about: { title, paragraph_1, paragraph_2, paragraph_3 }
   - skills: { title, subtitle, categories: { mobile, frontend, backend, tools } }
   - experience: { title, subtitle, items array }
   - projects: { title, subtitle, items array }
   - contact: { title, subtitle, email_label, linkedin_label, form: { name, email, message, submit }, toast_copied, modal_message }
   - footer: { rights, built_with }

   Experience items:
   - { id: 1, role: "App Developer", company: "PT. Mitra Graha Integrasi", period: "Nov 2025 – Present", type: "Full-time", description: [...], tags: ["iOS", "Swift", "IT Consulting"] }
   - { id: 2, role: "Mobile Developer", company: "Bangkit Academy by Google, Tokopedia, Gojek & Traveloka", period: "Feb 2024 – Jun 2024", type: "Independent Study", description: [...], tags: ["Kotlin", "Android", "Machine Learning", "GitHub"] }
   - { id: 3, role: "Mobile Developer", company: "PT. Godongijo Asri – The Waterfall Resto & Monster Fishing Lake", period: "Jul 2024 – Dec 2024", type: "Internship", description: [...], tags: ["Augmented Reality", "Unity", "3D Assets", "Android"] }
   - { id: 4, role: "Bachelor of Applied Science – Software Engineering", company: "IPB University, Bogor", period: "Aug 2021 – Aug 2025", type: "Education", description: ["GPA 3.67 / 4.00"], tags: ["Software Engineering", "Mobile Dev", "Web Dev"] }

   Projects items:
   - { id: 1, name: "Company Profile – PT Mitra Graha Integrasi", year: "2026", description: "...", tech: ["Next.js", "Prisma", "MySQL"], featured: true }
   - { id: 2, name: "Serverless Monitoring System", year: "2025", description: "...", tech: ["Google Cloud", "Apps Script", "Google Sites"] }
   - { id: 3, name: "Trash Sorting Android Game", year: "2024", description: "...", tech: ["Unity", "Android"], hki: true }
   - { id: 4, name: "Company Profile – Training & Certification", year: "2024", description: "...", tech: ["Laravel", "MySQL"] }

4. Create locales/id.json — same structure, fully translated to natural Bahasa Indonesia.

Write natural, professional English and natural Bahasa Indonesia (not robotic/literal translation). Output all files with complete content.
```

---

### STEP 3 — Navbar Component

**Tujuan:** Navbar dengan language switcher, smooth scroll, dan mobile menu.

```
Create the Navbar component for the Next.js portfolio.

File: components/Navbar.tsx

Requirements:
- Glassmorphism style: starts transparent, becomes glass (backdrop-blur + semi-opaque) after scrolling 50px
- Logo: "ARA" in Noto Serif JP with a small gold dot accent — links to #hero
- Desktop nav links: Home, About, Skills, Experience, Projects, Contact — all smooth scroll to section IDs. Use t('nav.*') for labels.
- Active section detection: highlight the nav link whose section is currently in viewport (use IntersectionObserver)
- Language toggle: pill button showing "EN | ID" — clicking switches language via useTranslation. Active side has a glass background with gold border. Animate the indicator with Framer Motion layout animation.
- Mobile (below 768px): hide nav links, show hamburger icon button. On click: open a full-screen slide-in overlay from the right with all nav links listed vertically in large Noto Serif JP text. Closing animation slides back out. Add a decorative Japanese character "メニュー" (menu) in large faint text in the overlay background.
- On scroll: navbar padding reduces smoothly with CSS transition (py-6 → py-3)

Animations (Framer Motion):
- Navbar fades down from top on initial page load (delay 0.5s after hero loads)
- Mobile menu overlay: x: "100%" → x: 0 entrance, exit reverses

Use useTranslation hook. Use 'use client' directive. Output complete TypeScript + Tailwind code.
```

---

### STEP 4 — Hero Section

**Tujuan:** Hero section yang impactful dengan loading animation dan Japanese aesthetic.

```
Create the HeroSection component.

File: components/HeroSection.tsx

Design:
- Full viewport height (min-h-screen)
- Background: deep navy base. Add a large decorative SVG drawn in code (not imported) — an abstract Japanese wave pattern (seigaiha or abstract torii shape) positioned to the right, faint opacity (0.06), fills roughly half the viewport height
- Layout: split into left (text) and right (decorative visual) columns on desktop, stacked on mobile

Left side content (use useTranslation):
- Small label chip: role title with a blinking cursor | | animation — styled as a glass pill
- Main heading: "Akhdan Ravi Andaman" in Noto Serif JP, very large. First letter "A" in gold accent color.
- Dynamic typewriter subtitle: cycles through ["Mobile Developer", "Web Developer", "Flutter Developer", "Next.js Developer"] with typewriter effect (type in, pause 2s, delete, next). Preceded by a sakura pink ">" character.
- Description paragraph from t('hero.description')
- Two CTA buttons:
  1. "View Projects" — glass button with sakura pink border and arrow icon, smooth scrolls to #projects
  2. "Download CV" — solid gold/amber filled button, links to /assets/cv.pdf or # as placeholder
- Social links row: GitHub icon, LinkedIn icon, Email icon — each a small glass circle button

Right side visual:
- A large GlassCard containing:
  - A circular avatar placeholder: initials "ARA" in Noto Serif JP on a gradient background (pink to gold), with an animated rotating dashed border (CSS animation)
  - 4 small floating skill badges positioned around the circle (absolute positioned): "React Native", "Next.js", "Flutter", "Kotlin" — each is a tiny GlassCard that floats up and down with staggered CSS animation (translateY keyframes)
- Behind the card: a blurred glow blob in sakura pink color

Loading/Intro Animation (runs once per session using sessionStorage):
- Screen starts fully black
- Kanji characters (randomly chosen from: 開発者, 技術, 創造, 革新, 未来) rain from top to bottom in columns — light green/gold color — for 1.5 seconds (CSS animation)
- Then fade to black, then fade in the hero content
- If sessionStorage key 'introPlayed' exists, skip the intro and show hero directly

Scroll indicator: animated bouncing chevron-down at bottom center

Use Framer Motion for content entrance animations (staggered children, initial opacity 0 → 1, y: 30 → 0). Use 'use client'. Output complete TypeScript + Tailwind code.
```

---

### STEP 5 — About Section

**Tujuan:** Section tentang diri dengan layout asimetris dan glassmorphism cards.

```
Create the AboutSection component.

File: components/AboutSection.tsx

Design:
- id="about" on the section element
- Section label: small text "01 / ABOUT" with a line decoration
- Section heading from t('about.title') in Noto Serif JP
- Decorative vertical Japanese text "について" (about) positioned absolutely on the right edge of the section, very large, low opacity (0.04), in gold color
- Two-column layout (desktop: 60% left / 40% right), single column on mobile

Left column:
- 3 paragraphs of bio from t('about.paragraph_1'), t('about.paragraph_2'), t('about.paragraph_3')
- A personal quote block: italic text with a 3px gold left border, slightly indented — e.g., "I build things that feel as good as they look."
- Highlight tags row: glass pills for "IPB University", "GPA 3.67", "Bogor, Indonesia", "Tour Leader 🗺️"

Right column (3 GlassCards, slightly overlapping / offset):
- Stats card: shows three stats horizontally — "3+" Years Experience, "4+" Projects, "10+" Technologies. Each stat: large gold number + small label below.
- Status card: "Currently at PT. Mitra Graha Integrasi" with a pulsing green dot badge "Open to Freelance"
- Fun card: playful card with emoji items — "🎮 Unity Game Dev", "📱 AR Enthusiast", "🌏 Tour Leader"

Animate on scroll (Framer Motion whileInView, once: true):
- Left: x: -60 → 0, opacity 0 → 1
- Right cards: y: 40 → 0, opacity 0 → 1 with staggerDelay 0.15s per card

Output complete TypeScript + Tailwind code.
```

---

### STEP 6 — Skills Section

**Tujuan:** Visualisasi skills dengan tab filter dan hover animations.

```
Create the SkillsSection component.

File: components/SkillsSection.tsx

Design:
- id="skills" on the section element
- Section label: "02 / SKILLS" with line decoration
- Section heading from t('skills.title') in Noto Serif JP
- Decorative vertical kanji "技術" (skills/technology) absolutely positioned

Tab filter buttons: "All", "Mobile", "Frontend", "Backend & DB", "Tools"
- Active tab: gold bottom border + sakura pink text
- Framer Motion layout animation on the active indicator

Skill data:
Mobile: React Native, Kotlin, Flutter, Dart, Unity, Swift (basics)
Frontend: Next.js, Vue.js, React, TypeScript, HTML, CSS, Tailwind, Bootstrap, Figma
Backend & DB: Laravel, PHP, MySQL, Prisma, Google Apps Script, REST API, Node.js
Tools: Git, GitHub, GitLab, Google Workspace, WordPress, MS Office, Vibe Coding

Each skill displayed as a glass badge/pill:
- Icon from react-icons (use appropriate icons for each tech)
- Tech name text
- On hover: scale 1.08 + a soft glow shadow in sakura pink (box-shadow transition)

When tab changes: animate out old skills (opacity 0, y: -10), animate in new skills staggered (opacity 1, y: 0)

Below skills grid: "Currently Learning" subsection with badges ["TypeScript Advanced", "AI Integration", "Docker"] each with a sparkle ✨ prefix and a subtle gold shimmer animation on the badge.

Animate on scroll: section fades in, then grid children stagger in.

Use 'use client', useTranslation, Framer Motion. Output complete TypeScript + Tailwind code.
```

---

### STEP 7 — Experience Section

**Tujuan:** Timeline pengalaman kerja dengan glassmorphism dan scroll animation.

```
Create the ExperienceSection component.

File: components/ExperienceSection.tsx

Design:
- id="experience" on the section element
- Section label: "03 / EXPERIENCE" with line decoration
- Section heading from t('experience.title') in Noto Serif JP
- Decorative vertical kanji "経験" (experience) absolutely positioned

Timeline layout:
- Desktop: vertical center line with cards alternating left and right
- Mobile: left-side vertical line with all cards on the right
- The timeline line itself animates its height (scaleY: 0 → 1) as user scrolls into view, using Framer Motion useScroll + useTransform

Each timeline item:
- A dot on the center/left line (circle, gold border)
- A GlassCard on the appropriate side connected to the dot with a short horizontal line
- Card content:
  - Type badge top-right: "Full-time" (gold), "Independent Study" (blue), "Internship" (teal), "Education" (purple)
  - Role in Noto Serif JP bold
  - Company name in muted color with an ExternalLink icon
  - Period in small muted text
  - Description as bullet points
  - Tech tags as tiny glass pills at the bottom

Experience data comes from t('experience.items') — map over the array.

Each card animates in from its respective side (left cards: x:-60→0, right cards: x:60→0) using whileInView.

Include the Education entry as the last item in the timeline with a graduation cap icon.

Output complete TypeScript + Tailwind + Framer Motion code.
```

---

### STEP 8 — Projects Section

**Tujuan:** Project showcase dengan featured card, hover tilt, dan modal detail.

```
Create the ProjectsSection component.

File: components/ProjectsSection.tsx

Design:
- id="projects" on the section element
- Section label: "04 / PROJECTS" with line decoration
- Section heading from t('projects.title') in Noto Serif JP
- Decorative vertical kanji "作品" (works/projects) absolutely positioned

Layout:
- The first project (featured: true) spans full width — larger card with more padding and a "FEATURED" badge in the top-left corner (glass pill with star icon)
- Remaining 3 projects: 3-column grid (desktop), 2-column (tablet), 1-column (mobile)

Each project card:
- Large faint project number (01, 02, 03, 04) in the card background, low opacity, Noto Serif JP
- Project name as heading
- Year badge (small glass pill top right)
- Short description text
- Tech stack tags (small glass pills with sakura pink text)
- Links row: GitHub icon button (links to # as placeholder) and ExternalLink icon button. If no link available show a muted "—".
- "HKI / Copyrighted" badge (gold) for the Trash Sorting Game project
- Top border gradient (pink → gold, 2px height) that only appears on hover — transition opacity 0 → 1
- Hover: subtle 3D tilt effect using CSS transform perspective + rotateX/rotateY based on mouse position (use onMouseMove handler)

On card click: open a modal (fixed overlay, backdrop blur) showing:
- Full project name and year
- Full description
- All tech tags
- All links

Modal: animate in with scale 0.9 → 1 + opacity. Close on backdrop click or X button. Trap focus in modal.

Animate on scroll: featured card slides up, grid cards stagger in with delay.

Use 'use client', useTranslation, Framer Motion. Output complete TypeScript + Tailwind code.
```

---

### STEP 9 — Contact Section & Footer

**Tujuan:** Section kontak yang elegan dan footer minimalis.

```
Create ContactSection and Footer components.

Files: components/ContactSection.tsx and components/Footer.tsx

ContactSection:
- id="contact" on the section element
- Section label: "05 / CONTACT" with line decoration
- Section heading from t('contact.title') in Noto Serif JP
- Subtext from t('contact.subtitle')
- Large decorative kanji "連絡" (contact) as background watermark — centered behind content, very large, very low opacity (0.04)
- Animated falling sakura petals in this section (CSS keyframe, 8 petals max, SVG petal shapes drawn inline)

Two GlassCards side by side (desktop), stacked on mobile:
1. Email card: envelope icon, "akhdanravy@gmail.com", copy-to-clipboard button. On copy: show a toast notification "Copied! ✓" bottom center, auto-disappears after 2s
2. LinkedIn card: LinkedIn icon, "Akhdan Ravi Andaman", open external link button

Below cards: A contact form (UI only, no submission):
- Fields: Full Name, Email Address, Message (textarea)
- Submit button: "Send Message" with a paper plane icon
- On submit: preventDefault, show a GlassCard modal saying t('contact.modal_message') (something like "Thanks for reaching out! Since this site has no backend, please email me directly at akhdanravy@gmail.com") with a close button
- Form fields: glassmorphism input style — dark transparent background, gold focus border, white text

Footer:
- Minimal glass bar at very bottom
- Left: t('footer.rights') — "© 2026 Akhdan Ravi Andaman"
- Center: "ARA" logo text in small Noto Serif JP
- Right: GitHub, LinkedIn, Email icon links (small, muted, brighten on hover)
- Very bottom thin line: t('footer.built_with') — "Crafted with Next.js & ☕"

All text uses useTranslation. Output complete TypeScript + Tailwind code.
```

---

### STEP 10 — Assembly & Final Polish

**Tujuan:** Merakit semua komponen dan menambahkan efek finishing.

```
Now assemble the entire portfolio and add final polish effects.

Tasks:

1. Create components/effects/ScrollProgress.tsx:
   - A fixed thin bar (3px height) at very top of viewport
   - Tracks window.scrollY / (document.body.scrollHeight - window.innerHeight)
   - Color: linear-gradient left to right from sakura pink (#f4b8c1) to gold (#c9a84c)
   - Width transitions smoothly with the scroll percentage

2. Create components/ui/LanguageToggle.tsx (standalone version for use outside Navbar):
   - Pill with "EN" and "ID" sides
   - Framer Motion layoutId shared indicator slides between sides
   - Uses useTranslation to call setLanguage

3. Update app/page.tsx:
   - Import and render all sections in order: HeroSection, AboutSection, SkillsSection, ExperienceSection, ProjectsSection, ContactSection
   - Wrap the entire app with I18nProvider (from context/i18nContext.tsx)
   - Include Navbar and Footer outside section wrapper
   - Include ScrollProgress fixed at top
   - Add a floating "Back to Top" button (bottom-right, fixed) that appears only after scrolling 500px — smooth scrolls to #hero on click, glass circle button with arrow-up icon, Framer Motion fade in/out

4. Verify app/layout.tsx:
   - Has I18nProvider wrapping children — if not, move it here and remove from page.tsx
   - Has correct next/font setup for Noto Serif JP and Syne
   - Has complete metadata including og:title, og:description, og:image placeholder

5. Final globals.css additions if not already present:
   - section { scroll-margin-top: 80px } for proper scroll offset with fixed navbar
   - ::selection { background: #f4b8c1; color: #0a0a1a; }
   - html { scroll-behavior: smooth; }

Output all files with complete production-ready TypeScript code.
```

---

## 🎨 Design Reference Cheat Sheet

Gunakan referensi ini saat AI bertanya tentang desain:

```
Color Palette:
  Background:    #0a0a1a  (deep navy)
  Glass panels:  rgba(255, 255, 255, 0.05)  backdrop-blur(12px)
  Glass border:  rgba(255, 255, 255, 0.1)
  Accent Pink:   #f4b8c1  (sakura)
  Accent Gold:   #c9a84c
  Text Primary:  #f0f0f5
  Text Muted:    rgba(240, 240, 245, 0.5)
  Success:       #4ade80
  Info:          #60a5fa

Typography:
  Heading: "Noto Serif JP"  (300, 400, 700)
  Body:    "Syne"           (400, 600, 700)

Glassmorphism Formula:
  background:       rgba(255, 255, 255, 0.05)
  backdrop-filter:  blur(12px)
  border:           1px solid rgba(255, 255, 255, 0.1)
  border-radius:    16px
  box-shadow:       0 8px 32px rgba(0, 0, 0, 0.3)

Hover Glow:
  box-shadow: 0 0 20px rgba(244, 184, 193, 0.2)

Japanese Decorative Elements:
  - Vertical kanji text (opacity 0.04–0.08, gold color)
  - SVG wave/torii shapes as background decor
  - SVG cherry blossom petal shapes for animations
  - Seigaiha (overlapping circle) pattern as subtle texture

Section Badge Style:
  font-size: 12px
  letter-spacing: 0.2em
  text-transform: uppercase
  color: accent-pink
  with a 40px horizontal line beside it
```

---

## 💡 Tips Penggunaan Prompt

**Jika AI menghasilkan kode yang tidak sesuai tema:**
```
The code you generated doesn't match the glassmorphism x Japanese theme.
Please revise [ComponentName] to strictly use:
- Dark background (#0a0a1a base)
- Glass panels (rgba(255,255,255,0.05) + backdrop-blur(12px))
- Sakura pink (#f4b8c1) and gold (#c9a84c) accents only
- Noto Serif JP for all headings
- Japanese decorative kanji elements (very low opacity)
```

**Jika ada TypeScript error:**
```
Fix TypeScript errors in [ComponentName]. The project uses:
- Next.js 14+ App Router
- 'use client' directive where needed
- Framer Motion (import from 'framer-motion')
- useTranslation hook from hooks/useTranslation.ts
- GlassCard from components/ui/GlassCard.tsx
```

**Jika animasi tidak smooth:**
```
Improve animation performance in [ComponentName]:
- Use Framer Motion instead of CSS transitions for complex animations
- Add will-change: transform where appropriate
- Ensure all whileInView uses viewport={{ once: true }}
- Use useReducedMotion() to respect accessibility preferences
```

---

## ✅ Checklist Final Sebelum Deploy

- [ ] Semua teks menggunakan `t()` dari i18n context (tidak ada hardcoded text)
- [ ] `en.json` dan `id.json` lengkap — semua key terdefinisi di keduanya
- [ ] Language switch berfungsi tanpa page reload, semua teks berubah
- [ ] Responsif di 375px (mobile), 768px (tablet), 1440px (desktop)
- [ ] Framer Motion: semua `whileInView` menggunakan `viewport={{ once: true }}`
- [ ] Loading/intro animation hanya berjalan sekali per session (sessionStorage)
- [ ] Smooth scroll ke semua section berfungsi via Navbar links
- [ ] Active section detection di Navbar berfungsi saat scroll
- [ ] Copy to clipboard di Contact berfungsi + toast muncul
- [ ] Modal di Projects membuka dan menutup dengan benar
- [ ] Back to Top button muncul setelah scroll 500px
- [ ] Tidak ada console.error atau TypeScript errors
- [ ] `next/font` digunakan (bukan `<link>` tag untuk fonts)
- [ ] SEO metadata lengkap di `layout.tsx`

---

*Generated for Akhdan Ravi Andaman Portfolio Project — 2026*
