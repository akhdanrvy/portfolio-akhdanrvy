import { z } from "zod";

const optionalUrl = z.preprocess(
  (v) => (typeof v === "string" && !v.trim() ? undefined : v),
  z.string().url("URL tidak valid").optional()
);

const optionalDate = z.preprocess(
  (v) => (typeof v === "string" && !v.trim() ? undefined : v),
  z.coerce.date().optional()
);

export const certificationSchema = z
  .object({
    name:          z.string().min(1, "Nama sertifikasi wajib diisi"),
    issuer:        z.string().min(1, "Penerbit wajib diisi"),
    issueDate:     z.coerce.date({ required_error: "Tanggal terbit wajib diisi" }),
    expiryDate:    optionalDate,
    credentialUrl: optionalUrl,
    imageUrl:      optionalUrl,
    displayOrder:  z.number().int("Urutan harus bilangan bulat").default(0),
  })
  .refine(
    (data) => !data.expiryDate || data.expiryDate >= data.issueDate,
    {
      message: "Tanggal kedaluwarsa harus pada atau setelah tanggal terbit",
      path: ["expiryDate"],
    }
  );

export type CertificationInput = z.infer<typeof certificationSchema>;
