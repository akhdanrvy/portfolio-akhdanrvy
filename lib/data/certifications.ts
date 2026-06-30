import { prisma } from "@/lib/prisma";
import type { Certification } from "@prisma/client";

export async function getCertifications(): Promise<Certification[]> {
  return prisma.certification.findMany({
    orderBy: { displayOrder: "asc" },
  });
}

export async function getCertificationById(id: string): Promise<Certification | null> {
  return prisma.certification.findUnique({ where: { id } });
}
