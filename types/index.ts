// ─── Project ─────────────────────────────────────────────────────────────────

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

// ─── Skills ──────────────────────────────────────────────────────────────────

export interface SkillCategory {
  category: string;
  icon: string;
  kanji: string;
  techs: string[];
}

// ─── Experience ───────────────────────────────────────────────────────────────

export interface Experience {
  company: string;
  role: string;
  period: string;
  type: "Internship" | "Organization" | "Freelance" | "Full-time";
  description: string;
  tech: string[];
  accentColor: string;
}

// ─── Education ────────────────────────────────────────────────────────────────

export interface Education {
  institution: string;
  degree: string;
  period: string;
  gpa: string;
  highlights: string[];
  status: "Active" | "Graduated";
}

// ─── Navigation ───────────────────────────────────────────────────────────────

export interface NavLink {
  label: string;
  href: string;
}

// ─── Social ───────────────────────────────────────────────────────────────────

export interface SocialLink {
  label: string;
  href: string;
  icon: string;
}
