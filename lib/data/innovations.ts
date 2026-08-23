import { getPrisma } from "@/lib/prisma";
import type { Innovation } from "@prisma/client";

const INITIAL_INNOVATIONS = [
  {
    name: "Village Waste Bank Calculation Website",
    year: "2023",
    type: "Web Dev",
    award: "2nd Place — National Competition",
    image: "/assets/innovations/banksampah_web.png",
    description:
      "Design and development of a waste bank recording website themed 'Empowerment of Sukajaya Village Youth Using Digital Based Waste Bank through Program Clean Up the Village'. This project was awarded 2nd place at a national level competition (P2MD) held by the Ministry of Education and Culture.",
    tech: ["Laravel", "PHP", "MySQL", "HTML", "CSS", "Bootstrap"],
    liveUrl: "https://micro-p2md.vercel.app",
    hkiUrl: null,
    journalUrl: null,
    displayOrder: 1,
  },
  {
    name: "Android-based Trash Sorting Game",
    year: "2024",
    type: "Mobile Dev",
    award: "© Copyrighted / HKI",
    image: "/assets/innovations/erush_mobile.png",
    description:
      "A Unity-based Android mobile game designed to educate players on how to sort different types of trash through engaging gameplay with multiple difficulty levels. This research has been officially registered and copyrighted under Indonesian Intellectual Property (HKI).",
    tech: ["Unity", "Android", "C#", "Game Development", "OOP"],
    liveUrl: null,
    hkiUrl: "https://pdki-indonesia.dgip.go.id:/link/45433030323032343230393139387c636f70797269676874",
    journalUrl: null,
    displayOrder: 2,
  },
  {
    name: "Serverless Information Monitoring System (MONIKA)",
    year: "2025",
    type: "Web Dev",
    award: "Published — Journal",
    image: "/assets/innovations/monika_web.png",
    description:
      "Developed a serverless monitoring system utilizing Google Workspace tools, with Google Cloud for storage, Google Apps Script for backend scripting, and Google Sites for the web interface. This research was presented at Seminar Nasional Karsa Nusantara and published in the Melekit journal.",
    tech: ["Google Workspace", "Google Cloud", "Google Apps Script", "Google Sites", "Google Sheets"],
    liveUrl: "https://sites.google.com/view/monikasvipb/beranda",
    hkiUrl: null,
    journalUrl: "https://melekit-if.uwks.ac.id/melekit/article/view/411",
    displayOrder: 3,
  },
];

export async function getInnovations(): Promise<Innovation[]> {
  try {
    const db = getPrisma();
    if (!db.innovation) {
      console.warn("[getInnovations] prisma.innovation is not defined yet.");
      return [];
    }

    let innovations = await db.innovation.findMany({
      orderBy: { displayOrder: "asc" },
    });

    // Auto-seed initial 3 innovations if table is empty
    if (innovations.length === 0) {
      for (const item of INITIAL_INNOVATIONS) {
        await db.innovation.create({ data: item });
      }
      innovations = await db.innovation.findMany({
        orderBy: { displayOrder: "asc" },
      });
    } else {
      // Auto-normalize if there are gaps (e.g., 1, 3)
      let hasGap = false;
      for (let i = 0; i < innovations.length; i++) {
        if (innovations[i].displayOrder !== i + 1) {
          hasGap = true;
          break;
        }
      }

      if (hasGap) {
        for (let i = 0; i < innovations.length; i++) {
          await db.innovation.update({
            where: { id: innovations[i].id },
            data: { displayOrder: i + 1 },
          });
        }
        innovations = await db.innovation.findMany({
          orderBy: { displayOrder: "asc" },
        });
      }
    }

    return innovations;
  } catch (err) {
    console.error("[getInnovations] DB error:", err);
    return [];
  }
}

export async function getInnovationById(id: string): Promise<Innovation | null> {
  try {
    const db = getPrisma();
    if (!db.innovation) return null;
    return await db.innovation.findUnique({ where: { id } });
  } catch (err) {
    console.error("[getInnovationById] DB error:", err);
    return null;
  }
}
