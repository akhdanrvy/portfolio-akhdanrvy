import { prisma } from "@/lib/prisma";
import type { Project } from "@prisma/client";

export async function getProjects(): Promise<Project[]> {
  try {
    let projects = await prisma.project.findMany({
      orderBy: { displayOrder: "asc" },
    });

    // Auto-normalize if there are gaps (e.g. 1, 3, 4)
    let hasGap = false;
    for (let i = 0; i < projects.length; i++) {
      if (projects[i].displayOrder !== i + 1) {
        hasGap = true;
        break;
      }
    }

    if (hasGap && projects.length > 0) {
      // Put featured item first if any
      const featIdx = projects.findIndex((p) => p.isFeatured);
      if (featIdx > 0) {
        const [feat] = projects.splice(featIdx, 1);
        projects.unshift(feat);
      }

      for (let i = 0; i < projects.length; i++) {
        const correctOrder = i + 1;
        const isFeat = i === 0 && projects.some((p) => p.isFeatured);
        await prisma.project.update({
          where: { id: projects[i].id },
          data: {
            displayOrder: correctOrder,
            isFeatured: isFeat ? true : (i === 0 ? projects[i].isFeatured : false),
          },
        });
      }

      projects = await prisma.project.findMany({
        orderBy: { displayOrder: "asc" },
      });
    }

    return projects;
  } catch (err) {
    console.error("[getProjects] DB error:", err);
    return [];
  }
}

export async function getProjectById(id: string): Promise<Project | null> {
  try {
    return await prisma.project.findUnique({ where: { id } });
  } catch (err) {
    console.error("[getProjectById] DB error:", err);
    return null;
  }
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    return await prisma.project.findUnique({ where: { slug } });
  } catch (err) {
    console.error("[getProjectBySlug] DB error:", err);
    return null;
  }
}

export async function getFeaturedProjects(): Promise<Project[]> {
  try {
    return await prisma.project.findMany({
      where: { isFeatured: true },
      orderBy: { displayOrder: "asc" },
    });
  } catch (err) {
    console.error("[getFeaturedProjects] DB error:", err);
    return [];
  }
}
