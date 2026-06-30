"use server";

import { revalidatePath } from "next/cache";
import { Prisma } from "@prisma/client";
import type { Certification } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";
import { certificationSchema } from "@/lib/validations/certification";

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
  return {
    name:          String(formData.get("name")          ?? ""),
    issuer:        String(formData.get("issuer")        ?? ""),
    issueDate:     String(formData.get("issueDate")     ?? ""),
    expiryDate:    String(formData.get("expiryDate")    ?? ""),
    credentialUrl: String(formData.get("credentialUrl") ?? ""),
    imageUrl:      String(formData.get("imageUrl")      ?? ""),
    displayOrder:  Number(formData.get("displayOrder")  ?? 0),
  };
}

/* ── CREATE ─────────────────────────────────────────────────────────── */

export async function createCertification(
  formData: FormData
): Promise<ActionResult<Certification>> {
  const authErr = await requireAuth();
  if (authErr) return authErr.error;

  const parsed = certificationSchema.safeParse(extractFormData(formData));
  if (!parsed.success) {
    return {
      success: false,
      error: "Validasi gagal",
      errors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  try {
    const certification = await prisma.certification.create({
      data: parsed.data,
    });
    revalidatePath("/");
    return { success: true, data: certification };
  } catch (err) {
    console.error("[createCertification] DB error:", err);
    return { success: false, error: "Gagal menyimpan sertifikasi ke database" };
  }
}

/* ── UPDATE ─────────────────────────────────────────────────────────── */

export async function updateCertification(
  id: string,
  formData: FormData
): Promise<ActionResult<Certification>> {
  const authErr = await requireAuth();
  if (authErr) return authErr.error;

  const parsed = certificationSchema.safeParse(extractFormData(formData));
  if (!parsed.success) {
    return {
      success: false,
      error: "Validasi gagal",
      errors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  try {
    const certification = await prisma.certification.update({
      where: { id },
      data: parsed.data,
    });
    revalidatePath("/");
    return { success: true, data: certification };
  } catch (err) {
    if (
      err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code === "P2025"
    ) {
      return { success: false, error: "Sertifikasi tidak ditemukan" };
    }
    console.error("[updateCertification] DB error:", err);
    return { success: false, error: "Gagal memperbarui sertifikasi" };
  }
}

/* ── DELETE ─────────────────────────────────────────────────────────── */

export async function deleteCertification(
  id: string
): Promise<ActionResult<{ id: string }>> {
  const authErr = await requireAuth();
  if (authErr) return authErr.error;

  try {
    await prisma.certification.delete({ where: { id } });
    revalidatePath("/");
    return { success: true, data: { id } };
  } catch (err) {
    if (
      err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code === "P2025"
    ) {
      return { success: false, error: "Sertifikasi tidak ditemukan" };
    }
    console.error("[deleteCertification] DB error:", err);
    return { success: false, error: "Gagal menghapus sertifikasi" };
  }
}
