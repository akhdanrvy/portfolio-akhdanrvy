import { getPrisma } from "@/lib/prisma";
import type { Experience } from "@prisma/client";

const INITIAL_EXPERIENCES = [
  {
    role: "App Developer",
    company: "PT. Mitra Graha Integrasi",
    companyUrl: "https://migrasi.id",
    companyLogo: "/assets/logos/migrasi.png",
    period: "Nov 2025 – Present",
    type: "Internship",
    current: true,
    description: [
      "Developing and maintaining iOS applications using React Native for enterprise IT consulting clients.",
      "Collaborating with cross-functional teams to translate business requirements into polished mobile features.",
      "Participating in the full software development lifecycle, from planning and design to deployment and support.",
    ],
    tags: ["iOS", "Mobile Dev", "IT Consulting", "Github", "Teamwork"],
    displayOrder: 1,
  },
  {
    role: "Mobile Developer",
    company: "PT. Godongijo Asri – The Waterfall Resto & Monster Fishing Lake",
    companyUrl: "https://godongijo.com",
    companyLogo: "/assets/logos/godongijo.png",
    period: "Jul 2024 – Dec 2024",
    type: "Internship",
    current: false,
    description: [
      "Led the development of an Augmented Reality mobile experience for a nature-based hospitality business.",
      "Designed and built interactive 3D assets integrated into an Android application using Unity.",
      "Delivered an AR feature that enhanced the visitor experience and was presented to company stakeholders.",
      "Gained hands-on experience bridging creative design and mobile engineering in a real business context.",
    ],
    tags: ["Augmented Reality", "Unity", "3D Assets", "Android"],
    displayOrder: 2,
  },
  {
    role: "Mobile Developer",
    company: "Bangkit Academy by Google, Tokopedia, Gojek & Traveloka",
    companyUrl: "https://www.dicoding.com/programs/bangkit",
    companyLogo: "/assets/logos/bangkit.png",
    period: "Feb 2024 – Jun 2024",
    type: "Independent Study",
    current: false,
    description: [
      "Selected for the prestigious Bangkit Academy cohort — a Google-led program in partnership with Tokopedia, Gojek, and Traveloka.",
      "Specialized in the Android path with a focus on Kotlin and Machine Learning integration in mobile apps.",
      "Collaborated on a capstone project, applying ML models to an Android application with a team of six.",
      "Strengthened version control and collaborative development practices through intensive GitHub workflows.",
    ],
    tags: ["Kotlin", "Android", "Machine Learning", "GitHub"],
    displayOrder: 3,
  },
  {
    role: "Bachelor of Applied Science – Software Engineering",
    company: "IPB University, Bogor",
    companyUrl: "https://ipb.ac.id",
    companyLogo: "/assets/logos/ipb.png",
    period: "Aug 2021 – Aug 2025",
    type: "Education",
    current: false,
    description: [
      "Graduated with a GPA of 3.67 / 4.00 in Applied Software Engineering.",
      "Coursework covered mobile development, web engineering, software architecture, databases, and UI/UX design.",
      "Actively involved in campus organizations. Served as vice chairman of the IT organization on campus.",
      "Active contributor to campus tech communities and software project teams throughout the program.",
    ],
    tags: ["Software Engineering", "Mobile Dev", "Web Dev"],
    displayOrder: 4,
  },
];

export async function getExperiences(): Promise<Experience[]> {
  try {
    const db = getPrisma();
    if (!db.experience) {
      console.warn("[getExperiences] prisma.experience is not defined yet. Please restart dev server.");
      return [];
    }

    let experiences = await db.experience.findMany({
      orderBy: { displayOrder: "asc" },
    });

    // Auto-seed initial experiences if table in database is empty
    if (experiences.length === 0) {
      for (const exp of INITIAL_EXPERIENCES) {
        await db.experience.create({ data: exp });
      }
      experiences = await db.experience.findMany({
        orderBy: { displayOrder: "asc" },
      });
    }

    return experiences;
  } catch (err) {
    console.error("[getExperiences] DB error:", err);
    return [];
  }
}

export async function getExperienceById(id: string): Promise<Experience | null> {
  try {
    const db = getPrisma();
    if (!db.experience) return null;
    return await db.experience.findUnique({ where: { id } });
  } catch (err) {
    console.error("[getExperienceById] DB error:", err);
    return null;
  }
}
