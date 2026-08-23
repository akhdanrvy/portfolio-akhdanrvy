"use server";

import { revalidatePath } from "next/cache";
import { Prisma } from "@prisma/client";
import type { Experience } from "@prisma/client";
import { getPrisma } from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";
import { experienceSchema } from "@/lib/validations/experience";

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
  const descriptionRaw = formData.get("description");
  let description: string[] = [];
  try {
    const parsed = JSON.parse(typeof descriptionRaw === "string" ? descriptionRaw : "[]");
    description = Array.isArray(parsed) ? parsed : [];
  } catch {
    description = [];
  }

  const tagsRaw = formData.get("tags");
  let tags: string[] = [];
  try {
    const parsed = JSON.parse(typeof tagsRaw === "string" ? tagsRaw : "[]");
    tags = Array.isArray(parsed) ? parsed : [];
  } catch {
    tags = [];
  }

  return {
    role:         String(formData.get("role")         ?? ""),
    company:      String(formData.get("company")      ?? ""),
    companyUrl:   String(formData.get("companyUrl")   ?? ""),
    companyLogo:  String(formData.get("companyLogo")  ?? ""),
    period:       String(formData.get("period")       ?? ""),
    type:         String(formData.get("type")         ?? ""),
    current:
      formData.get("current") === "on" ||
      formData.get("current") === "true",
    description,
    tags,
    displayOrder: Number(formData.get("displayOrder") ?? 1),
  };
}

/* ── CREATE ─────────────────────────────────────────────────────────── */

export async function createExperience(
  formData: FormData
): Promise<ActionResult<Experience>> {
  const authErr = await requireAuth();
  if (authErr) return authErr.error;

  const parsed = experienceSchema.safeParse(extractFormData(formData));
  if (!parsed.success) {
    return {
      success: false,
      error: "Validasi gagal",
      errors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  const db = getPrisma();
  if (!db.experience) {
    return {
      success: false,
      error: "Prisma Client belum dimuat ulang. Silakan jalankan `npx prisma generate` dan restart terminal `npm run dev`.",
    };
  }

  try {
    // 1. Shift all existing items down by +1 so new item is always order #1
    await db.experience.updateMany({
      where: { displayOrder: { gte: 1 } },
      data: { displayOrder: { increment: 1 } },
    });

    // 2. Insert new item with displayOrder: 1
    const experience = await db.experience.create({
      data: {
        ...parsed.data,
        displayOrder: 1,
      },
    });

    revalidatePath("/");
    return { success: true, data: experience };
  } catch (err) {
    console.error("[createExperience] DB error:", err);
    return { success: false, error: "Gagal menyimpan data pengalaman ke database" };
  }
}

/* ── UPDATE ─────────────────────────────────────────────────────────── */

export async function updateExperience(
  id: string,
  formData: FormData
): Promise<ActionResult<Experience>> {
  const authErr = await requireAuth();
  if (authErr) return authErr.error;

  const parsed = experienceSchema.safeParse(extractFormData(formData));
  if (!parsed.success) {
    return {
      success: false,
      error: "Validasi gagal",
      errors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  const db = getPrisma();
  if (!db.experience) {
    return {
      success: false,
      error: "Prisma Client belum dimuat ulang. Silakan jalankan `npx prisma generate` dan restart terminal `npm run dev`.",
    };
  }

  try {
    const existing = await db.experience.findUnique({ where: { id } });
    if (!existing) {
      return { success: false, error: "Pengalaman tidak ditemukan" };
    }

    const oldOrder = existing.displayOrder;
    const newOrder = parsed.data.displayOrder;

    // If order has changed, shift other items so no duplicates exist
    if (oldOrder !== newOrder) {
      if (newOrder < oldOrder) {
        // Moved up (e.g. 4 -> 2): shift items in [newOrder, oldOrder - 1] down (+1)
        await db.experience.updateMany({
          where: {
            id: { not: id },
            displayOrder: { gte: newOrder, lt: oldOrder },
          },
          data: { displayOrder: { increment: 1 } },
        });
      } else {
        // Moved down (e.g. 2 -> 4): shift items in [oldOrder + 1, newOrder] up (-1)
        await db.experience.updateMany({
          where: {
            id: { not: id },
            displayOrder: { gt: oldOrder, lte: newOrder },
          },
          data: { displayOrder: { decrement: 1 } },
        });
      }
    }

    const experience = await db.experience.update({
      where: { id },
      data: parsed.data,
    });

    revalidatePath("/");
    return { success: true, data: experience };
  } catch (err) {
    if (
      err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code === "P2025"
    ) {
      return { success: false, error: "Pengalaman tidak ditemukan" };
    }
    console.error("[updateExperience] DB error:", err);
    return { success: false, error: "Gagal memperbarui data pengalaman" };
  }
}

/* ── DELETE ─────────────────────────────────────────────────────────── */

export async function deleteExperience(
  id: string
): Promise<ActionResult<{ id: string }>> {
  const authErr = await requireAuth();
  if (authErr) return authErr.error;

  const db = getPrisma();
  if (!db.experience) {
    return {
      success: false,
      error: "Prisma Client belum dimuat ulang. Silakan jalankan `npx prisma generate` dan restart terminal `npm run dev`.",
    };
  }

  try {
    const existing = await db.experience.findUnique({ where: { id } });
    if (!existing) {
      return { success: false, error: "Pengalaman tidak ditemukan" };
    }

    await db.experience.delete({ where: { id } });

    // Shift all items after the deleted one up (-1) so no gaps exist
    await db.experience.updateMany({
      where: { displayOrder: { gt: existing.displayOrder } },
      data: { displayOrder: { decrement: 1 } },
    });

    revalidatePath("/");
    return { success: true, data: { id } };
  } catch (err) {
    if (
      err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code === "P2025"
    ) {
      return { success: false, error: "Pengalaman tidak ditemukan" };
    }
    console.error("[deleteExperience] DB error:", err);
    return { success: false, error: "Gagal menghapus data pengalaman" };
  }
}
