"use server";

import { revalidatePath } from "next/cache";
import { Prisma } from "@prisma/client";
import type { Innovation } from "@prisma/client";
import { getPrisma } from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";
import { innovationSchema } from "@/lib/validations/innovation";

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
  const techRaw = formData.get("tech");
  let tech: string[] = [];
  try {
    const parsed = JSON.parse(typeof techRaw === "string" ? techRaw : "[]");
    tech = Array.isArray(parsed) ? parsed : [];
  } catch {
    tech = [];
  }

  return {
    name:         String(formData.get("name")         ?? ""),
    year:         String(formData.get("year")         ?? ""),
    type:         String(formData.get("type")         ?? ""),
    award:        String(formData.get("award")        ?? ""),
    image:        String(formData.get("image")        ?? ""),
    description:  String(formData.get("description")  ?? ""),
    tech,
    liveUrl:      String(formData.get("liveUrl")      ?? ""),
    hkiUrl:       String(formData.get("hkiUrl")       ?? ""),
    journalUrl:   String(formData.get("journalUrl")   ?? ""),
    displayOrder: Number(formData.get("displayOrder") ?? 1),
  };
}

/* ── CREATE ─────────────────────────────────────────────────────────── */

export async function createInnovation(
  formData: FormData
): Promise<ActionResult<Innovation>> {
  const authErr = await requireAuth();
  if (authErr) return authErr.error;

  const parsed = innovationSchema.safeParse(extractFormData(formData));
  if (!parsed.success) {
    return {
      success: false,
      error: "Validasi gagal",
      errors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  const db = getPrisma();
  if (!db.innovation) {
    return {
      success: false,
      error: "Prisma Client belum dimuat ulang. Silakan jalankan `npx prisma generate` dan restart terminal `npm run dev`.",
    };
  }

  const count = await db.innovation.count();
  if (count >= 3) {
    return {
      success: false,
      error: "Maksimal 3 inovasi tercapai. Hapus atau edit inovasi yang sudah ada.",
    };
  }

  try {
    // Shift all existing items down (+1) so new innovation is order #1
    await db.innovation.updateMany({
      where: { displayOrder: { gte: 1 } },
      data: { displayOrder: { increment: 1 } },
    });

    const innovation = await db.innovation.create({
      data: {
        ...parsed.data,
        displayOrder: 1,
      },
    });

    revalidatePath("/");
    return { success: true, data: innovation };
  } catch (err) {
    console.error("[createInnovation] DB error:", err);
    return { success: false, error: "Gagal menyimpan inovasi ke database" };
  }
}

/* ── UPDATE ─────────────────────────────────────────────────────────── */

export async function updateInnovation(
  id: string,
  formData: FormData
): Promise<ActionResult<Innovation>> {
  const authErr = await requireAuth();
  if (authErr) return authErr.error;

  const parsed = innovationSchema.safeParse(extractFormData(formData));
  if (!parsed.success) {
    return {
      success: false,
      error: "Validasi gagal",
      errors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  const db = getPrisma();
  if (!db.innovation) {
    return {
      success: false,
      error: "Prisma Client belum dimuat ulang. Silakan jalankan `npx prisma generate` dan restart terminal `npm run dev`.",
    };
  }

  try {
    const existing = await db.innovation.findUnique({ where: { id } });
    if (!existing) {
      return { success: false, error: "Inovasi tidak ditemukan" };
    }

    const oldOrder = existing.displayOrder;
    const newOrder = parsed.data.displayOrder;

    if (oldOrder !== newOrder) {
      if (newOrder < oldOrder) {
        await db.innovation.updateMany({
          where: { id: { not: id }, displayOrder: { gte: newOrder, lt: oldOrder } },
          data: { displayOrder: { increment: 1 } },
        });
      } else {
        await db.innovation.updateMany({
          where: { id: { not: id }, displayOrder: { gt: oldOrder, lte: newOrder } },
          data: { displayOrder: { decrement: 1 } },
        });
      }
    }

    const innovation = await db.innovation.update({
      where: { id },
      data: parsed.data,
    });

    revalidatePath("/");
    return { success: true, data: innovation };
  } catch (err) {
    if (
      err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code === "P2025"
    ) {
      return { success: false, error: "Inovasi tidak ditemukan" };
    }
    console.error("[updateInnovation] DB error:", err);
    return { success: false, error: "Gagal memperbarui data inovasi" };
  }
}

/* ── DELETE ─────────────────────────────────────────────────────────── */

export async function deleteInnovation(
  id: string
): Promise<ActionResult<{ id: string }>> {
  const authErr = await requireAuth();
  if (authErr) return authErr.error;

  const db = getPrisma();
  if (!db.innovation) {
    return {
      success: false,
      error: "Prisma Client belum dimuat ulang. Silakan jalankan `npx prisma generate` dan restart terminal `npm run dev`.",
    };
  }

  try {
    const existing = await db.innovation.findUnique({ where: { id } });
    if (!existing) {
      return { success: false, error: "Inovasi tidak ditemukan" };
    }

    await db.innovation.delete({ where: { id } });

    // Shift all subsequent items down (-1) so no gaps exist
    await db.innovation.updateMany({
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
      return { success: false, error: "Inovasi tidak ditemukan" };
    }
    console.error("[deleteInnovation] DB error:", err);
    return { success: false, error: "Gagal menghapus data inovasi" };
  }
}
