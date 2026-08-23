import { z } from "zod";

const optionalUrl = z.preprocess(
  (v) => (typeof v === "string" && !v.trim() ? undefined : v),
  z.string().url("URL tidak valid").optional()
);

const optionalString = z.preprocess(
  (v) => (typeof v === "string" && !v.trim() ? undefined : v),
  z.string().optional()
);

export const experienceSchema = z.object({
  role:         z.string().min(1, "Posisi / Role wajib diisi").max(100, "Role terlalu panjang"),
  company:      z.string().min(1, "Perusahaan / Institusi wajib diisi").max(150, "Nama perusahaan terlalu panjang"),
  companyUrl:   optionalUrl,
  companyLogo:  optionalString,
  period:       z.string().min(1, "Periode wajib diisi (contoh: Nov 2025 – Present)"),
  type:         z.enum(["Full-time", "Independent Study", "Internship", "Education"], {
    message: "Tipe pengalaman tidak valid",
  }),
  current:      z.boolean().default(false),
  description:  z.array(z.string().min(1)).min(1, "Minimal satu poin deskripsi pekerjaan"),
  tags:         z.array(z.string().min(1)).default([]),
  displayOrder: z.number().int("Urutan harus bilangan bulat").default(0),
});

export type ExperienceInput = z.infer<typeof experienceSchema>;
