# 🗾 Portfolio Blueprint — App & Fullstack Developer

> Dokumen ini adalah patokan utama AI Agent dalam membangun portfolio website.
> Semua keputusan teknis, desain, struktur folder, dan konten mengacu pada dokumen ini.

---

## 🎯 Identitas & Positioning

| Field              | Value                                                                  |
| ------------------ | ---------------------------------------------------------------------- |
| **Nama**           | [NAMA_KAMU]                                                            |
| **Primary Role**   | App Developer (React Native · Kotlin · Flutter)                        |
| **Secondary Role** | Fullstack Web Developer (Next.js · Vue.js)                             |
| **Tagline**        | _"Building experiences across every screen — from pocket to browser."_ |
| **Fokus Utama**    | Mobile Development, AI Integration, Real-World Projects                |

---

## 🧱 Struktur Folder

```
portfolio/
├── app/
│   ├── layout.tsx              # Root layout (font, metadata, dark theme)
│   ├── page.tsx                # Halaman utama (assembly semua section)
│   └── globals.css             # CSS global + Tailwind base + custom variables
│
├── components/
│   ├── ui/
│   │   ├── NeonBadge.tsx       # Badge neon reusable (untuk skill tags)
│   │   ├── SectionTitle.tsx    # Judul section dengan garis dekoratif
│   │   ├── GlowCard.tsx        # Card dengan efek glow border
│   │   └── JapaneseDecor.tsx   # Dekorasi karakter Kanji/garis vertikal
│   │
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Skills.tsx
│   │   ├── Projects.tsx
│   │   ├── Experience.tsx
│   │   ├── Education.tsx
│   │   └── Contact.tsx
│   │
│   └── layout/
│       ├── Navbar.tsx
│       └── Footer.tsx
│
├── data/
│   ├── projects.ts             # Data statis project
│   ├── skills.ts               # Data skills per kategori
│   ├── experience.ts           # Data pengalaman
│   └── education.ts            # Data pendidikan
│
├── lib/
│   └── utils.ts                # Helper functions (cn, dll)
│
├── public/
│   ├── images/
│   │   └── projects/           # Screenshot project
│   └── icons/                  # Custom SVG icons
│
├── types/
│   └── index.ts                # TypeScript interfaces global
│
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## 🎨 Design System

### Filosofi: **Ultra-Dark Japanese Cyber**

- Latar belakang sangat gelap (`#050508`) dengan noise texture subtle
- Aksen neon tipis: **cyan** (`#00f5ff`), **magenta** (`#ff0090`), **amber** (`#ffb700`)
- Tipografi: `Noto Serif JP` untuk heading display + `JetBrains Mono` untuk elemen teknis + `Inter` untuk body
- Dekorasi: karakter kanji vertikal, garis halus, scanline overlay
- Efek: glow border, glassmorphism tipis, grain overlay

### CSS Variables (globals.css)

```css
:root {
  --bg-primary: #050508;
  --bg-secondary: #0a0a10;
  --bg-card: #0f0f18;
  --border-subtle: rgba(255, 255, 255, 0.06);
  --border-glow: rgba(0, 245, 255, 0.3);
  --neon-cyan: #00f5ff;
  --neon-magenta: #ff0090;
  --neon-amber: #ffb700;
  --text-primary: #e8e8f0;
  --text-secondary: #7a7a8c;
  --text-muted: #3a3a50;
  --font-display: "Noto Serif JP", serif;
  --font-mono: "JetBrains Mono", monospace;
}
```

### Tailwind Custom Config

```ts
// tailwind.config.ts
extend: {
  colors: {
    neon: {
      cyan:    '#00f5ff',
      magenta: '#ff0090',
      amber:   '#ffb700',
    },
    dark: {
      primary:   '#050508',
      secondary: '#0a0a10',
      card:      '#0f0f18',
    }
  },
  fontFamily: {
    display: ['Noto Serif JP', 'serif'],
    mono:    ['JetBrains Mono', 'monospace'],
    body:    ['Plus Jakarta Sans', 'sans-serif'],
  },
  animation: {
    'glow-pulse':   'glowPulse 3s ease-in-out infinite',
    'scan-line':    'scanLine 8s linear infinite',
    'float':        'float 6s ease-in-out infinite',
  }
}
```

---

## 📄 Spesifikasi Per Section

### 1. `Hero.tsx`

**Layout:** Full viewport height, centered, asymmetric
**Elemen:**

- Background: grid noise + scanline overlay
- Kanji vertikal di sisi kanan: `開発者` (developer)
- Badge: `[ APP DEVELOPER ]` dengan border neon cyan
- Nama besar dengan font display (Noto Serif JP)
- Tagline dalam bahasa Inggris
- Role list animasi typing: `React Native` → `Flutter` → `Kotlin` → `Next.js`
- Dua CTA button: **"See My Work"** (filled neon) + **"Contact Me"** (ghost)
- Scroll indicator di bawah

**Animasi:** stagger fade-in dari bawah, glow pulse pada border badge

---

### 2. `About.tsx`

**Layout:** Split — teks kiri, visual kanan (abstract grid/photo placeholder)
**Elemen:**

- Section title: `// ABOUT`
- Paragraf singkat (2–3 paragraf) tentang latar belakang, passion, dan approach
- Highlight stats (kartu kecil):
  - `3+` Years Experience
  - `15+` Projects Built
  - `3` Platforms (Mobile, Web, AI)
- Dekorasi garis vertikal + kanji: `経歴` (background/history)

---

### 3. `Skills.tsx`

**Layout:** Grid kategori
**Kategori & Teknologi:**

```ts
// data/skills.ts
export const skills = [
  {
    category: "Mobile Development",
    icon: "📱",
    kanji: "移動",
    techs: [
      "React Native",
      "Flutter",
      "Kotlin",
      "Expo",
      "Android SDK",
      "Firebase",
    ],
  },
  {
    category: "Frontend Web",
    icon: "🌐",
    kanji: "前端",
    techs: ["Next.js", "Vue.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
  },
  {
    category: "Backend & API",
    icon: "⚙️",
    kanji: "後端",
    techs: ["Node.js", "Express", "REST API", "GraphQL", "Prisma"],
  },
  {
    category: "AI Integration",
    icon: "🤖",
    kanji: "知能",
    techs: ["OpenAI API", "LangChain", "Claude API", "Vercel AI SDK", "RAG"],
  },
  {
    category: "Tools & DevOps",
    icon: "🛠",
    kanji: "道具",
    techs: ["Git", "Docker", "Vercel", "Supabase", "Figma", "Postman"],
  },
];
```

**Visual:** Setiap kategori dalam GlowCard. Tech stack sebagai NeonBadge. Hover → card terang neon.

---

### 4. `Projects.tsx`

**Layout:** 3 featured project besar + grid kecil project lainnya

#### Featured Projects (3 Besar)

```ts
// data/projects.ts — Featured
export const featuredProjects = [
  {
    id: 1,
    title: "AI Task Manager",
    subtitle: "Mobile App + AI Integration",
    description:
      "Aplikasi mobile manajemen tugas dengan AI assistant terintegrasi. User dapat mendeskripsikan task secara natural language, lalu AI otomatis mengkategorikan, memprioritaskan, dan menjadwalkan.",
    tech: ["React Native", "Expo", "OpenAI API", "Supabase", "TypeScript"],
    platform: "Mobile",
    status: "Live",
    accentColor: "#00f5ff",
    kanji: "知能",
    highlights: [
      "Natural Language Input",
      "Smart Scheduling",
      "Offline Support",
    ],
    github: "#",
    demo: "#",
  },
  {
    id: 2,
    title: "E-Commerce Platform",
    subtitle: "Fullstack Web App",
    description:
      "Platform e-commerce fullstack dengan fitur real-time inventory, payment gateway integration, dan dashboard analytics. Dibangun dengan Next.js App Router dan optimasi performa tinggi.",
    tech: [
      "Next.js",
      "TypeScript",
      "Prisma",
      "PostgreSQL",
      "Stripe",
      "Tailwind",
    ],
    platform: "Web",
    status: "Live",
    accentColor: "#ff0090",
    kanji: "商業",
    highlights: ["Real-time Inventory", "Stripe Payment", "Admin Dashboard"],
    github: "#",
    demo: "#",
  },
  {
    id: 3,
    title: "Flutter Fitness Tracker",
    subtitle: "Cross-Platform Mobile App",
    description:
      "Aplikasi fitness tracker cross-platform dengan tracking workout, kalori, dan progress foto. Integrasi dengan sensor device dan health API native Android & iOS.",
    tech: ["Flutter", "Dart", "Firebase", "Health API", "Riverpod"],
    platform: "Mobile",
    status: "Completed",
    accentColor: "#ffb700",
    kanji: "健康",
    highlights: [
      "Health API Integration",
      "Progress Analytics",
      "Offline Mode",
    ],
    github: "#",
    demo: "#",
  },
];
```

#### Other Projects (List Grid)

```ts
export const otherProjects = [
  {
    title: "Vue.js Dashboard",
    tech: ["Vue.js", "Chart.js", "REST API"],
    link: "#",
  },
  { title: "Kotlin News App", tech: ["Kotlin", "MVVM", "Retrofit"], link: "#" },
  {
    title: "AI Chatbot Widget",
    tech: ["Next.js", "Claude API", "Vercel"],
    link: "#",
  },
  {
    title: "React Native Auth Starter",
    tech: ["React Native", "Expo Router", "Supabase"],
    link: "#",
  },
  {
    title: "Portfolio CMS",
    tech: ["Next.js", "Sanity", "TypeScript"],
    link: "#",
  },
  { title: "Expense Tracker", tech: ["Flutter", "SQLite", "Bloc"], link: "#" },
];
```

---

### 5. `Experience.tsx`

**Layout:** Vertikal timeline dengan garis neon kiri

```ts
// data/experience.ts
export const experiences = [
  {
    company: "PT. [Nama Perusahaan]",
    role: "Mobile Developer Intern",
    period: "2024 — Present",
    type: "Internship",
    description:
      "Pengembangan aplikasi mobile menggunakan React Native dan integrasi REST API. Berkolaborasi dengan tim backend dalam implementasi fitur real-time dan optimasi performa aplikasi.",
    tech: ["React Native", "TypeScript", "REST API", "Git"],
    accentColor: "#00f5ff",
  },
  {
    company: "Organisasi [Nama Organisasi]",
    role: "Tech Division Lead",
    period: "2023 — 2024",
    type: "Organization",
    description:
      "Memimpin divisi teknologi dalam pengembangan website dan tools internal organisasi. Membimbing anggota dalam pembelajaran web development dan mobile development.",
    tech: ["Vue.js", "Next.js", "Firebase"],
    accentColor: "#ff0090",
  },
];
```

---

### 6. `Education.tsx`

**Layout:** Card sederhana dengan decorative element

```ts
// data/education.ts
export const education = [
  {
    institution: "[Nama Universitas]",
    degree: "S1 Teknik Informatika / Ilmu Komputer",
    period: "2022 — 2026",
    gpa: "3.xx / 4.00",
    highlights: [
      "Mobile Development",
      "Software Engineering",
      "AI & Machine Learning",
    ],
    status: "Active",
  },
];
```

---

### 7. `Contact.tsx`

**Layout:** Centered, minimal, impactful
**Elemen:**

- Tagline besar: _"Let's build something great."_
- Email link (mailto)
- Social links: GitHub, LinkedIn, Instagram (opsional)
- Form kontak simple (Name, Email, Message) — bisa dihubungkan ke Resend/Formspree
- Dekorasi: kanji `連絡` (contact/communication)

---

## 🧩 Komponen Reusable

### `NeonBadge.tsx`

```tsx
interface NeonBadgeProps {
  label: string;
  color?: "cyan" | "magenta" | "amber";
  size?: "sm" | "md";
}
```

### `GlowCard.tsx`

```tsx
interface GlowCardProps {
  children: React.ReactNode;
  accentColor?: string; // hex color untuk glow
  className?: string;
  hoverable?: boolean;
}
```

### `SectionTitle.tsx`

```tsx
interface SectionTitleProps {
  prefix?: string; // "// " untuk gaya kode
  title: string;
  kanji?: string; // karakter dekoratif
  subtitle?: string;
}
```

### `JapaneseDecor.tsx`

```tsx
interface JapaneseDecorProps {
  text: string; // karakter kanji
  position?: "left" | "right";
  opacity?: number;
}
```

---

## 📐 TypeScript Interfaces

```ts
// types/index.ts

export interface Project {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  tech: string[];
  platform: "Mobile" | "Web" | "AI" | "Cross-Platform";
  status: "Live" | "Completed" | "In Progress";
  accentColor: string;
  kanji: string;
  highlights: string[];
  github: string;
  demo: string;
}

export interface OtherProject {
  title: string;
  tech: string[];
  link: string;
}

export interface SkillCategory {
  category: string;
  icon: string;
  kanji: string;
  techs: string[];
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  type: "Internship" | "Organization" | "Freelance" | "Full-time";
  description: string;
  tech: string[];
  accentColor: string;
}

export interface Education {
  institution: string;
  degree: string;
  period: string;
  gpa: string;
  highlights: string[];
  status: "Active" | "Graduated";
}
```

---

## ⚙️ Technical Setup

### Dependencies

```json
{
  "dependencies": {
    "next": "^14.x",
    "react": "^18.x",
    "react-dom": "^18.x",
    "clsx": "^2.x",
    "tailwind-merge": "^2.x",
    "framer-motion": "^11.x"
  },
  "devDependencies": {
    "typescript": "^5.x",
    "tailwindcss": "^3.x",
    "@types/react": "^18.x",
    "@types/node": "^20.x"
  }
}
```

### Font Setup (layout.tsx)

```tsx
import { Noto_Serif_JP } from "next/font/google";
import { JetBrains_Mono } from "next/font/google";
import { Plus_Jakarta_Sans } from "next/font/google";
```

### Metadata (layout.tsx)

```tsx
export const metadata: Metadata = {
  title: "[Nama] — App & Fullstack Developer",
  description:
    "Portfolio of [Nama], App Developer specializing in React Native, Flutter, Kotlin, and Fullstack Web Development with Next.js and Vue.js",
  keywords: [
    "React Native",
    "Flutter",
    "Next.js",
    "Mobile Developer",
    "App Developer",
  ],
};
```

---

## 🤖 Prompt untuk AI Agent

Gunakan prompt berikut saat memberikan task ke AI Agent (Cursor, Windsurf, Claude Code, atau Copilot):

---

### SYSTEM PROMPT (Paste di System/Context AI Agent)

```
You are an expert Next.js and TypeScript developer building a professional portfolio website.
You must strictly follow the PORTFOLIO_BLUEPRINT.md file as the source of truth for ALL decisions.

Rules:
1. Use Next.js 14 App Router with TypeScript — no Pages Router
2. Use Tailwind CSS for ALL styling — no inline styles, no CSS Modules
3. Every section is a separate component in /components/sections/
4. All data is static and lives in /data/ as TypeScript files with proper interfaces from /types/index.ts
5. Use 'clsx' + 'tailwind-merge' via lib/utils.ts for className merging
6. Use Framer Motion for entrance animations (viewport-triggered)
7. Design must match the Ultra-Dark Japanese Cyber aesthetic defined in the blueprint
8. ALL components must be functional React components with TypeScript props interface
9. Mobile-first responsive design — always start with mobile breakpoint
10. Keep code clean: no commented-out code, consistent naming, proper exports
```

---

### TASK PROMPTS (Gunakan satu per satu, berurutan)

**Task 1 — Project Setup**

```
Initialize the Next.js 14 portfolio project following PORTFOLIO_BLUEPRINT.md.
- Create folder structure as defined
- Setup tailwind.config.ts with all custom colors, fonts, and animations
- Setup globals.css with CSS variables and base styles
- Setup lib/utils.ts with cn() helper
- Setup types/index.ts with all interfaces
- Import fonts in layout.tsx (Noto Serif JP, JetBrains Mono, Plus Jakarta Sans)
- Add basic metadata to layout.tsx
```

**Task 2 — Static Data Layer**

```
Create all static data files in /data/ following PORTFOLIO_BLUEPRINT.md exactly.
Files to create: projects.ts, skills.ts, experience.ts, education.ts
Use the TypeScript interfaces from types/index.ts.
Data should match what's defined in the blueprint (use placeholder company names where needed).
```

**Task 3 — UI Components**

```
Create all reusable UI components in /components/ui/ following PORTFOLIO_BLUEPRINT.md.
Components: NeonBadge.tsx, GlowCard.tsx, SectionTitle.tsx, JapaneseDecor.tsx
Each must have proper TypeScript interface for props.
Style using Tailwind CSS matching the Ultra-Dark Japanese Cyber design system.
```

**Task 4 — Navbar & Footer**

```
Create Navbar.tsx and Footer.tsx in /components/layout/.
Navbar: sticky, blur backdrop, logo left + nav links right, mobile hamburger menu.
Footer: minimal dark, social links, copyright.
Style must match the dark aesthetic. Nav links should smooth-scroll to section IDs.
```

**Task 5 — Hero Section**

```
Create /components/sections/Hero.tsx following PORTFOLIO_BLUEPRINT.md.
Include: scanline background, vertical kanji decoration, animated role badge,
large display name, typing animation for roles, two CTA buttons, scroll indicator.
Use Framer Motion for stagger entrance animation.
```

**Task 6 — About Section**

```
Create /components/sections/About.tsx.
Split layout: text content left, stats cards right.
3 stat highlight cards with neon accent numbers.
Use SectionTitle and JapaneseDecor components.
Animate on scroll viewport entry with Framer Motion.
```

**Task 7 — Skills Section**

```
Create /components/sections/Skills.tsx.
Import skills data from /data/skills.ts.
Render each category as a GlowCard with NeonBadge for each tech.
Hover state: card border glows with neon cyan.
Show category kanji as subtle background decoration.
```

**Task 8 — Projects Section**

```
Create /components/sections/Projects.tsx.
Top: 3 featured GlowCards with accentColor glow, platform badge, tech stack, highlights list, and action buttons.
Bottom: grid of OtherProject items as compact cards.
Each featured card should use its unique accentColor for glow and accent.
```

**Task 9 — Experience & Education**

```
Create /components/sections/Experience.tsx and Education.tsx.
Experience: vertical timeline with neon left-border line and dot markers.
Education: single prominent card with status badge.
Import data from respective data files.
```

**Task 10 — Contact Section**

```
Create /components/sections/Contact.tsx.
Large impactful tagline, email CTA, social icon links.
Simple contact form (Name, Email, Message) with neon-styled inputs.
Inputs: dark background, neon cyan focus border with glow.
Submit button: full neon cyan with hover state.
```

**Task 11 — Assembly & Final**

```
Assemble all sections in app/page.tsx in correct order:
Navbar → Hero → About → Skills → Projects → Experience → Education → Contact → Footer
Add section IDs for smooth scrolling.
Test that all imports are correct and no TypeScript errors exist.
Add loading performance optimizations (lazy loading images if any).
```

---

## ✅ Checklist QA

Sebelum dianggap selesai, pastikan:

- [ ] Semua section ter-render tanpa error
- [ ] TypeScript: 0 errors (`tsc --noEmit`)
- [ ] Responsive di mobile (375px), tablet (768px), desktop (1280px+)
- [ ] Smooth scroll navigation berfungsi
- [ ] Framer Motion animations tidak lag di mobile
- [ ] Semua data placeholder sudah diisi dengan data asli
- [ ] Warna neon dan dark background konsisten di semua section
- [ ] Kanji decoration tampil di setiap section yang sesuai
- [ ] Contact form memiliki feedback state (loading / success / error)
- [ ] Tidak ada console errors / warnings
- [ ] Metadata (title, description) sudah benar
- [ ] Fonts ter-load dengan benar (Noto Serif JP, JetBrains Mono)

---

## 🔧 Kustomisasi Wajib (Isi Sendiri)

Sebelum deploy, ganti semua placeholder berikut:

| Placeholder                                        | Ganti Dengan                |
| -------------------------------------------------- | --------------------------- |
| `AKHDAN RAVI ANDAMAN`                              | Nama lengkap kamu           |
| `Mitra Graha Integrasi (MIGRASI)`                  | Nama perusahaan internship  |
| `HIMAVO Micro IT`                                  | Nama organisasi kampus      |
| `Institut Pertanian Bogor`                         | Nama universitas kamu       |
| `3.67`                                             | IPK aktual                  |
| `2021 — 2025`                                      | Tahun masuk — rencana lulus |
| `https://github.com/akhdanrvy`                     | URL profil GitHub           |
| `https://www.linkedin.com/in/akhdan-ravi-andaman/` | URL profil LinkedIn         |
| Project descriptions                               | Deskripsi project nyata     |
| `https://migrasi.id/`                              | URL GitHub / demo asli      |

---

_Blueprint Version: 1.0 — Generated for App & Fullstack Developer Portfolio_
