import { z } from "zod";

const optionalUrl = z.preprocess(
  (v) => (typeof v === "string" && !v.trim() ? undefined : v),
  z.string().url("URL tidak valid").optional()
);

export const projectSchema = z.object({
  title:        z.string().min(1, "Judul wajib diisi").max(200, "Judul terlalu panjang"),
  description:  z.string().min(1, "Deskripsi wajib diisi"),
  techStack:    z.array(z.string().min(1)).min(1, "Minimal satu tech stack"),
  demoUrl:      optionalUrl,
  repoUrl:      optionalUrl,
  imageUrl:     optionalUrl,
  badgeLabel:   z
    .string()
    .max(30, "Badge label maksimal 30 karakter")
    .optional()
    .transform((v) => v?.trim() || undefined),
  isFeatured:   z.boolean().default(false),
  displayOrder: z.number().int("Urutan harus bilangan bulat").default(0),
});

export type ProjectInput = z.infer<typeof projectSchema>;

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}
