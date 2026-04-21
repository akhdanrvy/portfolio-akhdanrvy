import type { Project, OtherProject } from "@/types";

export const featuredProjects: Project[] = [
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
    tech: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Stripe", "Tailwind"],
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
    platform: "Cross-Platform",
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

export const otherProjects: OtherProject[] = [
  {
    title: "Vue.js Dashboard",
    tech: ["Vue.js", "Chart.js", "REST API"],
    link: "#",
  },
  {
    title: "Kotlin News App",
    tech: ["Kotlin", "MVVM", "Retrofit"],
    link: "#",
  },
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
  {
    title: "Expense Tracker",
    tech: ["Flutter", "SQLite", "Bloc"],
    link: "#",
  },
];
