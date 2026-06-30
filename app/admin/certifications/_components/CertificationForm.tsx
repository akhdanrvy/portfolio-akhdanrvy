"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { Certification } from "@prisma/client";
import { cn } from "@/lib/utils";
import { createCertification, updateCertification } from "../actions";
import { ImageUpload } from "../../_components/ImageUpload";

interface Props {
  mode: "create" | "edit";
  initialData?: Certification;
}

const INPUT = cn(
  "w-full rounded-lg px-4 py-3 text-sm",
  "bg-(--color-glass) border border-(--glass-border)",
  "text-(--color-text) placeholder:text-(--color-text-muted)",
  "transition-colors duration-200 focus:outline-none focus:border-accent-gold",
  "disabled:opacity-50 disabled:cursor-not-allowed"
);

function FieldError({ errors, name }: { errors: Record<string, string[]>; name: string }) {
  const msgs = errors[name];
  if (!msgs?.length) return null;
  return <p className="text-xs text-accent-pink mt-1">{msgs[0]}</p>;
}

function toDateInputValue(date: Date | null | undefined): string {
  if (!date) return "";
  return date.toISOString().split("T")[0];
}

export function CertificationForm({ mode, initialData }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [name, setName]               = useState(initialData?.name ?? "");
  const [issuer, setIssuer]           = useState(initialData?.issuer ?? "");
  const [issueDate, setIssueDate]     = useState(toDateInputValue(initialData?.issueDate));
  const [expiryDate, setExpiryDate]   = useState(toDateInputValue(initialData?.expiryDate));
  const [credentialUrl, setCredentialUrl] = useState(initialData?.credentialUrl ?? "");
  const [displayOrder, setDisplayOrder]   = useState(initialData?.displayOrder ?? 0);
  const [imageUrl, setImageUrl]       = useState(initialData?.imageUrl ?? "");
  const [uploadError, setUploadError] = useState<string | null>(null);

  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
  const [globalError, setGlobalError] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFieldErrors({});
    setGlobalError(null);
    setUploadError(null);

    startTransition(async () => {
      const fd = new FormData();
      fd.set("name",          name);
      fd.set("issuer",        issuer);
      fd.set("issueDate",     issueDate);
      fd.set("expiryDate",    expiryDate);
      fd.set("credentialUrl", credentialUrl);
      fd.set("imageUrl",      imageUrl);
      fd.set("displayOrder",  String(displayOrder));

      const result =
        mode === "create"
          ? await createCertification(fd)
          : await updateCertification(initialData!.id, fd);

      if (result.success) {
        router.push("/admin/certifications");
      } else {
        setGlobalError(result.error);
        if (result.errors) setFieldErrors(result.errors);
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 max-w-2xl">
      {globalError && (
        <div className="rounded-xl border border-accent-pink/30 bg-accent-pink/10 px-4 py-3 text-sm text-accent-pink">
          {globalError}
        </div>
      )}

      {/* Name */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-widest text-(--color-text-muted) font-heading mb-1.5">
          Nama Sertifikasi <span className="text-accent-pink">*</span>
        </label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={isPending}
          className={INPUT}
          placeholder="Nama sertifikasi"
        />
        <FieldError errors={fieldErrors} name="name" />
      </div>

      {/* Issuer */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-widest text-(--color-text-muted) font-heading mb-1.5">
          Penerbit <span className="text-accent-pink">*</span>
        </label>
        <input
          value={issuer}
          onChange={(e) => setIssuer(e.target.value)}
          disabled={isPending}
          className={INPUT}
          placeholder="mis. Google, AWS, Dicoding"
        />
        <FieldError errors={fieldErrors} name="issuer" />
      </div>

      {/* Dates */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-widest text-(--color-text-muted) font-heading mb-1.5">
            Tanggal Terbit <span className="text-accent-pink">*</span>
          </label>
          <input
            type="date"
            value={issueDate}
            onChange={(e) => setIssueDate(e.target.value)}
            disabled={isPending}
            className={INPUT}
          />
          <FieldError errors={fieldErrors} name="issueDate" />
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase tracking-widest text-(--color-text-muted) font-heading mb-1.5">
            Tanggal Kedaluwarsa
          </label>
          <input
            type="date"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            disabled={isPending}
            className={INPUT}
          />
          <FieldError errors={fieldErrors} name="expiryDate" />
        </div>
      </div>

      {/* Credential URL */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-widest text-(--color-text-muted) font-heading mb-1.5">
          URL Credential
        </label>
        <input
          value={credentialUrl}
          onChange={(e) => setCredentialUrl(e.target.value)}
          disabled={isPending}
          className={INPUT}
          placeholder="https://..."
        />
        <FieldError errors={fieldErrors} name="credentialUrl" />
      </div>

      {/* Display Order */}
      <div className="flex items-center gap-3">
        <label className="text-xs font-semibold uppercase tracking-widest text-(--color-text-muted) font-heading whitespace-nowrap">
          Display Order
        </label>
        <input
          type="number"
          value={displayOrder}
          onChange={(e) => setDisplayOrder(Number(e.target.value))}
          disabled={isPending}
          className={cn(INPUT, "w-24 text-center")}
        />
        <FieldError errors={fieldErrors} name="displayOrder" />
      </div>

      {/* Image Upload */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-widest text-(--color-text-muted) font-heading mb-1.5">
          Gambar Sertifikasi
        </label>
        <ImageUpload
          folder="certifications"
          currentUrl={imageUrl || null}
          onUploadComplete={(url) => { setImageUrl(url); setUploadError(null); }}
          onUploadError={(err) => setUploadError(err)}
        />
        {uploadError && <p className="text-xs text-accent-pink mt-1">{uploadError}</p>}
        <FieldError errors={fieldErrors} name="imageUrl" />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4 pt-2">
        <button
          type="submit"
          disabled={isPending}
          className="rounded-lg px-6 py-2.5 text-sm font-semibold bg-accent-gold text-black hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending
            ? mode === "create" ? "Menyimpan..." : "Memperbarui..."
            : mode === "create" ? "Simpan Sertifikasi" : "Perbarui Sertifikasi"}
        </button>
        <Link
          href="/admin/certifications"
          className="text-sm text-(--color-text-muted) hover:text-(--color-text) transition-colors"
        >
          Batal
        </Link>
      </div>
    </form>
  );
}
