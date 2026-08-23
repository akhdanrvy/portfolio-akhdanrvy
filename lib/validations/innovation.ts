import { z } from "zod";

export const innovationSchema = z.object({
  name: z
    .string()
    .min(2, "Nama inovasi minimal 2 karakter")
    .max(120, "Nama inovasi maksimal 120 karakter"),
  year: z
    .string()
    .min(4, "Tahun minimal 4 karakter (mis. 2024)")
    .max(10, "Tahun maksimal 10 karakter"),
  type: z
    .string()
    .min(2, "Tipe minimal 2 karakter")
    .max(50, "Tipe maksimal 50 karakter"),
  award: z
    .string()
    .max(100, "Award maksimal 100 karakter")
    .optional()
    .nullable()
    .transform((val) => (val && val.trim() ? val.trim() : null)),
  image: z
    .string()
    .optional()
    .nullable()
    .transform((val) => (val && val.trim() ? val.trim() : null)),
  description: z
    .string()
    .min(10, "Deskripsi minimal 10 karakter")
    .max(1000, "Deskripsi maksimal 1000 karakter"),
  tech: z
    .array(z.string().min(1))
    .min(1, "Minimal sertakan 1 teknologi/skill"),
  liveUrl: z
    .string()
    .url("URL demo tidak valid")
    .optional()
    .or(z.literal(""))
    .nullable()
    .transform((val) => (val && val.trim() ? val.trim() : null)),
  hkiUrl: z
    .string()
    .url("URL HKI tidak valid")
    .optional()
    .or(z.literal(""))
    .nullable()
    .transform((val) => (val && val.trim() ? val.trim() : null)),
  journalUrl: z
    .string()
    .url("URL Jurnal tidak valid")
    .optional()
    .or(z.literal(""))
    .nullable()
    .transform((val) => (val && val.trim() ? val.trim() : null)),
  displayOrder: z
    .number({ invalid_type_error: "Display order harus berupa angka" })
    .int("Display order harus bilangan bulat")
    .min(0, "Display order tidak boleh negatif")
    .default(0),
});

export type InnovationInput = z.infer<typeof innovationSchema>;
