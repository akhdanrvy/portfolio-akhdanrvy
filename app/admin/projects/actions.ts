"use server";

import { revalidatePath } from "next/cache";
import { Prisma } from "@prisma/client";
import type { Project } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";
import { projectSchema, generateSlug } from "@/lib/validations/project";

/* ── Types ─────────────────────────────────────────────────────────── */

type ActionSuccess<T> = { success: true; data: T };
type ActionError    = { success: false; error: string; errors?: Record<string, string[]> };
type ActionResult<T> = ActionSuccess<T> | ActionError;

/* ── Auth guard ─────────────────────────────────────────────────────── */

async function requireAuth(): Promise<{ error: ActionError } | null> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: { success: false, error: "Unauthorized" } };
  return null;
}

/* ── FormData extractor ─────────────────────────────────────────────── */

function extractFormData(formData: FormData) {
  const techStackRaw = formData.get("techStack");
  let techStack: string[] = [];
  try {
    const parsed = JSON.parse(typeof techStackRaw === "string" ? techStackRaw : "[]");
    techStack = Array.isArray(parsed) ? parsed : [];
  } catch {
    techStack = [];
  }

  return {
    title:        String(formData.get("title")        ?? ""),
    description:  String(formData.get("description")  ?? ""),
    techStack,
    demoUrl:      String(formData.get("demoUrl")      ?? ""),
    repoUrl:      String(formData.get("repoUrl")      ?? ""),
    imageUrl:     String(formData.get("imageUrl")     ?? ""),
    badgeLabel:   String(formData.get("badgeLabel")   ?? ""),
    isFeatured:
      formData.get("isFeatured") === "on" ||
      formData.get("isFeatured") === "true",
    displayOrder: Number(formData.get("displayOrder") ?? 1),
  };
}

/* ── Slug uniqueness helper ─────────────────────────────────────────── */

async function resolveUniqueSlug(
  title: string,
  excludeId?: string
): Promise<string> {
  const base = generateSlug(title);
  let slug = base;
  let counter = 2;

  while (true) {
    const conflict = await prisma.project.findFirst({
      where: { slug, ...(excludeId ? { NOT: { id: excludeId } } : {}) },
    });
    if (!conflict) break;
    slug = `${base}-${counter++}`;
  }

  return slug;
}

/* ── CREATE ─────────────────────────────────────────────────────────── */

export async function createProject(
  formData: FormData
): Promise<ActionResult<Project>> {
  const authErr = await requireAuth();
  if (authErr) return authErr.error;

  const parsed = projectSchema.safeParse(extractFormData(formData));
  if (!parsed.success) {
    return {
      success: false,
      error: "Validasi gagal",
      errors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  const count = await prisma.project.count();
  if (count >= 4) {
    return {
      success: false,
      error: "Maksimal 4 project tercapai. Hapus atau edit project yang sudah ada.",
    };
  }

  const slug = await resolveUniqueSlug(parsed.data.title);
  const isFeatured = parsed.data.isFeatured;

  try {
    let targetOrder = 1;

    if (isFeatured) {
      // 1. Unset existing featured flags
      await prisma.project.updateMany({
        where: { isFeatured: true },
        data: { isFeatured: false },
      });

      // 2. Shift all projects down (+1) so new featured project takes order #1
      await prisma.project.updateMany({
        where: { displayOrder: { gte: 1 } },
        data: { displayOrder: { increment: 1 } },
      });

      targetOrder = 1;
    } else {
      // Check if projects exist
      const count = await prisma.project.count();
      if (count === 0) {
        targetOrder = 1;
      } else {
        // Non-featured projects are inserted at position #2 (below featured)
        await prisma.project.updateMany({
          where: { displayOrder: { gte: 2 } },
          data: { displayOrder: { increment: 1 } },
        });
        targetOrder = 2;
      }
    }

    const project = await prisma.project.create({
      data: {
        ...parsed.data,
        slug,
        isFeatured,
        displayOrder: targetOrder,
      },
    });

    revalidatePath("/");
    return { success: true, data: project };
  } catch (err) {
    if (
      err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code === "P2002"
    ) {
      return { success: false, error: "Project dengan slug yang sama sudah ada" };
    }
    console.error("[createProject] DB error:", err);
    return { success: false, error: "Gagal menyimpan project ke database" };
  }
}

/* ── UPDATE ─────────────────────────────────────────────────────────── */

export async function updateProject(
  id: string,
  formData: FormData
): Promise<ActionResult<Project>> {
  const authErr = await requireAuth();
  if (authErr) return authErr.error;

  const parsed = projectSchema.safeParse(extractFormData(formData));
  if (!parsed.success) {
    return {
      success: false,
      error: "Validasi gagal",
      errors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  const slug = await resolveUniqueSlug(parsed.data.title, id);

  try {
    const existing = await prisma.project.findUnique({ where: { id } });
    if (!existing) {
      return { success: false, error: "Project tidak ditemukan" };
    }

    const oldOrder = existing.displayOrder;
    let newOrder = parsed.data.displayOrder;
    const isFeatured = parsed.data.isFeatured;

    // If marked as Featured, it must become order #1
    if (isFeatured) {
      await prisma.project.updateMany({
        where: { id: { not: id }, isFeatured: true },
        data: { isFeatured: false },
      });

      if (oldOrder !== 1) {
        // Shift items that were above this down (+1)
        await prisma.project.updateMany({
          where: { id: { not: id }, displayOrder: { lt: oldOrder } },
          data: { displayOrder: { increment: 1 } },
        });
        newOrder = 1;
      }
    } else {
      // Not featured: if order changed, reorder properly
      if (oldOrder !== newOrder) {
        if (newOrder < oldOrder) {
          await prisma.project.updateMany({
            where: { id: { not: id }, displayOrder: { gte: newOrder, lt: oldOrder } },
            data: { displayOrder: { increment: 1 } },
          });
        } else {
          await prisma.project.updateMany({
            where: { id: { not: id }, displayOrder: { gt: oldOrder, lte: newOrder } },
            data: { displayOrder: { decrement: 1 } },
          });
        }
      }
    }

    const project = await prisma.project.update({
      where: { id },
      data: {
        ...parsed.data,
        slug,
        isFeatured,
        displayOrder: newOrder,
      },
    });

    revalidatePath("/");
    return { success: true, data: project };
  } catch (err) {
    if (
      err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code === "P2025"
    ) {
      return { success: false, error: "Project tidak ditemukan" };
    }
    console.error("[updateProject] DB error:", err);
    return { success: false, error: "Gagal memperbarui project" };
  }
}

/* ── DELETE ─────────────────────────────────────────────────────────── */

export async function deleteProject(
  id: string
): Promise<ActionResult<{ id: string }>> {
  const authErr = await requireAuth();
  if (authErr) return authErr.error;

  try {
    const existing = await prisma.project.findUnique({ where: { id } });
    if (!existing) {
      return { success: false, error: "Project tidak ditemukan" };
    }

    await prisma.project.delete({ where: { id } });

    // Shift all subsequent projects up (-1) so no gaps exist (e.g. 1, 3, 4 -> 1, 2, 3)
    await prisma.project.updateMany({
      where: { displayOrder: { gt: existing.displayOrder } },
      data: { displayOrder: { decrement: 1 } },
    });

    // If the deleted project was featured, make the project at #1 featured if one exists
    if (existing.isFeatured) {
      const topProject = await prisma.project.findFirst({
        where: { displayOrder: 1 },
      });
      if (topProject) {
        await prisma.project.update({
          where: { id: topProject.id },
          data: { isFeatured: true },
        });
      }
    }

    revalidatePath("/");
    return { success: true, data: { id } };
  } catch (err) {
    if (
      err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code === "P2025"
    ) {
      return { success: false, error: "Project tidak ditemukan" };
    }
    console.error("[deleteProject] DB error:", err);
    return { success: false, error: "Gagal menghapus project" };
  }
}
