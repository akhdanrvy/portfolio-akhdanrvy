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
    displayOrder: Number(formData.get("displayOrder") ?? 0),
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

  const slug = await resolveUniqueSlug(parsed.data.title);

  try {
    const project = await prisma.project.create({
      data: { ...parsed.data, slug },
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
    const project = await prisma.project.update({
      where: { id },
      data: { ...parsed.data, slug },
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
    await prisma.project.delete({ where: { id } });
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
