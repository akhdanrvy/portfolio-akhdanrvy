import type { SkillCategory } from "@/types";

export const skills: SkillCategory[] = [
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
    icon: "🛠️",
    kanji: "道具",
    techs: ["Git", "Docker", "Vercel", "Supabase", "Figma", "Postman"],
  },
];
