import { prisma } from "@/lib/prisma";
import type { Project } from "@prisma/client";

export async function getProjects(): Promise<Project[]> {
  return prisma.project.findMany({
    orderBy: { displayOrder: "asc" },
  });
}

export async function getProjectById(id: string): Promise<Project | null> {
  return prisma.project.findUnique({ where: { id } });
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  return prisma.project.findUnique({ where: { slug } });
}

export async function getFeaturedProjects(): Promise<Project[]> {
  return prisma.project.findMany({
    where: { isFeatured: true },
    orderBy: { displayOrder: "asc" },
  });
}
