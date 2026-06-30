# 🎴 Akhdan Ravi Andaman — Personal Portfolio

> App Developer & Fullstack Web Developer · Glassmorphism × Japanese Aesthetic · Bilingual (EN/ID)

**🌐 Live:** [portfolio-akhdanrvy.vercel.app](https://portfolio-akhdanrvy.vercel.app)

---

## 👨‍💻 About This Project

This is my personal portfolio website, built to showcase my work, experience, and skills as an App Developer and Fullstack Web Developer. The site is designed with a **Glassmorphism × Japanese minimalist aesthetic**, featuring smooth animations, interactive components, and full bilingual support (English & Bahasa Indonesia).

---

## ✨ Features

- 🎌 **Glassmorphism × Japanese Theme** — deep navy base, sakura pink & gold accents, decorative kanji elements
- 🌗 **Light / Dark Theme** — system-preference aware, persisted to `localStorage`, zero flash on load
- 🌐 **Bilingual (EN/ID)** — language switcher powered by React Context i18n (no external library)
- 🎬 **Rich Animations** — kanji rain intro, animate on scroll, hover interactions, spring physics
- 📱 **Fully Responsive** — optimized for mobile, tablet, and desktop
- 📧 **Contact Form** — integrated with Resend for real email delivery (notification + auto-reply)
- 🗂️ **Sections** — Hero, About, Skills, Experience, Projects, Innovations, Certifications, Contact

---

## 🧱 Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 + CSS Custom Properties |
| Animation | Framer Motion + @react-spring/web |
| i18n | React Context (JSON locale files) |
| Email | Resend API (Route Handler) |
| Icons | React Icons |
| Fonts | Noto Serif JP + Syne (via next/font) |
| Deployment | Vercel |

---

## 🗂️ Project Structure

```
/
├── app/
│   ├── api/contact/        # Email route handler (Resend)
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
│   ├── InnovationSection.tsx
│   ├── CertificationSection.tsx
│   ├── ContactSection.tsx
│   ├── Footer.tsx
│   ├── ui/                 # GlassCard, ThemeToggle, LanguageToggle
│   └── effects/            # LoadingScreen, SakuraFall, ScrollProgress, SectionPulse
├── context/
│   ├── i18nContext.tsx
│   └── themeContext.tsx
├── locales/
│   ├── en.json
│   └── id.json
├── hooks/
│   ├── useTranslation.ts
│   └── useTheme.ts
├── lib/
│   └── utils.ts
├── types/
└── public/
    └── assets/
        ├── projects/
        ├── innovations/
        ├── certificates/
        ├── logos/
        └── images/
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm / yarn / pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/akhdanravy/portfolio-akhdan.git
cd portfolio-akhdan

# Install dependencies
npm install
```

### Environment Variables

Create a `.env.local` file in the root directory:

```env
RESEND_API_KEY=re_xxxxxxxxxx
CONTACT_EMAIL_TO=akhdanravy@gmail.com
CONTACT_EMAIL_FROM=onboarding@resend.dev
```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📦 Deploy

This project is deployed on **Vercel**. Every push to the current branch triggers an automatic redeployment.

**Live URL:** [https://portfolio-akhdanrvy.vercel.app](https://portfolio-akhdanrvy.vercel.app)

To deploy your own instance:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/akhdanravy/portfolio-akhdan)

---

## 📬 Contact

**Akhdan Ravi Andaman**

- 📧 Email: [akhdanravy@gmail.com](mailto:akhdanravy@gmail.com)
- 💼 LinkedIn: [linkedin.com/in/akhdan-ravi-andaman](https://www.linkedin.com/in/akhdan-ravi-andaman/)
- 🌐 Portfolio: [portfolio-akhdanrvy.vercel.app](https://portfolio-akhdanrvy.vercel.app)

---

<p align="center">Crafted with Next.js & ☕ by Akhdan Ravi Andaman · 2026</p>