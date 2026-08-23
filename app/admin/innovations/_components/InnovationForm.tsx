"use client";

import { useState, useTransition, KeyboardEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { Innovation } from "@prisma/client";
import { cn } from "@/lib/utils";
import { createInnovation, updateInnovation } from "../actions";
import { ImageUpload } from "../../_components/ImageUpload";

/* ── TechStack tag input ─────────────────────────────────────────── */
function TechStackInput({
  tags,
  onChange,
  error,
}: {
  tags: string[];
  onChange: (tags: string[]) => void;
  error?: string;
}) {
  const [input, setInput] = useState("");

  function addTag() {
    const val = input.trim();
    if (!val || tags.includes(val)) return;
    onChange([...tags, val]);
    setInput("");
  }

  function removeTag(idx: number) {
    onChange(tags.filter((_, i) => i !== idx));
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
  }

  return (
    <div className="space-y-2">
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs bg-accent-gold/10 text-accent-gold border border-accent-gold/30"
            >
              {tag}
              <button
                type="button"
                onClick={() => removeTag(i)}
                className="hover:opacity-70 transition-opacity leading-none cursor-pointer"
                aria-label={`Hapus ${tag}`}
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}
      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ketik teknologi, tekan Enter atau Tambah"
          className={cn(
            "flex-1 rounded-lg px-4 py-2.5 text-sm",
            "bg-(--color-glass) border border-(--glass-border)",
            "text-(--color-text) placeholder:text-(--color-text-muted)",
            "focus:outline-none focus:border-accent-gold transition-colors"
          )}
        />
        <button
          type="button"
          onClick={addTag}
          className="rounded-lg px-3 py-2.5 text-sm border border-(--glass-border) text-(--color-text-muted) hover:border-accent-gold/50 hover:text-(--color-text) transition-colors cursor-pointer"
        >
          Tambah
        </button>
      </div>
      {error && <p className="text-xs text-accent-pink">{error}</p>}
    </div>
  );
}

/* ── Main form ───────────────────────────────────────────────────── */
interface Props {
  mode: "create" | "edit";
  initialData?: Innovation;
  totalCount?: number;
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

export function InnovationForm({ mode, initialData, totalCount }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [name, setName]                 = useState(initialData?.name ?? "");
  const [year, setYear]                 = useState(initialData?.year ?? new Date().getFullYear().toString());
  const [type, setType]                 = useState(initialData?.type ?? "Web Dev");
  const [award, setAward]               = useState(initialData?.award ?? "");
  const [description, setDescription]   = useState(initialData?.description ?? "");
  const [tech, setTech]                 = useState<string[]>(initialData?.tech ?? []);
  const [liveUrl, setLiveUrl]           = useState(initialData?.liveUrl ?? "");
  const [hkiUrl, setHkiUrl]             = useState(initialData?.hkiUrl ?? "");
  const [journalUrl, setJournalUrl]     = useState(initialData?.journalUrl ?? "");
  const [displayOrder, setDisplayOrder] = useState(initialData?.displayOrder ?? 1);
  const [image, setImage]               = useState(initialData?.image ?? "");
  const [uploadError, setUploadError]   = useState<string | null>(null);

  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
  const [globalError, setGlobalError] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFieldErrors({});
    setGlobalError(null);
    setUploadError(null);

    startTransition(async () => {
      const fd = new FormData();
      fd.set("name",         name);
      fd.set("year",         year);
      fd.set("type",         type);
      fd.set("award",        award);
      fd.set("description",  description);
      fd.set("tech",         JSON.stringify(tech));
      fd.set("liveUrl",      liveUrl);
      fd.set("hkiUrl",       hkiUrl);
      fd.set("journalUrl",   journalUrl);
      fd.set("image",        image);
      fd.set("displayOrder", String(displayOrder));

      const result =
        mode === "create"
          ? await createInnovation(fd)
          : await updateInnovation(initialData!.id, fd);

      if (result.success) {
        router.push("/admin/innovations");
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
          Nama Inovasi / Riset <span className="text-accent-pink">*</span>
        </label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={isPending}
          className={INPUT}
          placeholder="mis. Village Waste Bank Calculation Website"
        />
        <FieldError errors={fieldErrors} name="name" />
      </div>

      {/* Year, Type & Award */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-widest text-(--color-text-muted) font-heading mb-1.5">
            Tahun <span className="text-accent-pink">*</span>
          </label>
          <input
            value={year}
            onChange={(e) => setYear(e.target.value)}
            disabled={isPending}
            className={INPUT}
            placeholder="2025"
          />
          <FieldError errors={fieldErrors} name="year" />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-widest text-(--color-text-muted) font-heading mb-1.5">
            Tipe <span className="text-accent-pink">*</span>
          </label>
          <input
            value={type}
            onChange={(e) => setType(e.target.value)}
            disabled={isPending}
            className={INPUT}
            placeholder="mis. Web Dev, Mobile Dev"
          />
          <FieldError errors={fieldErrors} name="type" />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-widest text-(--color-text-muted) font-heading mb-1.5">
            Award / Penghargaan
          </label>
          <input
            value={award}
            onChange={(e) => setAward(e.target.value)}
            disabled={isPending}
            className={INPUT}
            placeholder="mis. © Copyrighted / HKI"
          />
          <FieldError errors={fieldErrors} name="award" />
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-widest text-(--color-text-muted) font-heading mb-1.5">
          Deskripsi Inovasi <span className="text-accent-pink">*</span>
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={isPending}
          rows={4}
          className={cn(INPUT, "resize-y")}
          placeholder="Jelaskan latar belakang, dampak, dan inovasi yang dibangun..."
        />
        <FieldError errors={fieldErrors} name="description" />
      </div>

      {/* Tech Stack */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-widest text-(--color-text-muted) font-heading mb-1.5">
          Teknologi / Tools <span className="text-accent-pink">*</span>
        </label>
        <TechStackInput
          tags={tech}
          onChange={setTech}
          error={fieldErrors["tech"]?.[0]}
        />
      </div>

      {/* Links */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-widest text-(--color-text-muted) font-heading mb-1.5">
            Live URL
          </label>
          <input
            value={liveUrl}
            onChange={(e) => setLiveUrl(e.target.value)}
            disabled={isPending}
            className={INPUT}
            placeholder="https://..."
          />
          <FieldError errors={fieldErrors} name="liveUrl" />
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase tracking-widest text-(--color-text-muted) font-heading mb-1.5">
            HKI Certificate URL
          </label>
          <input
            value={hkiUrl}
            onChange={(e) => setHkiUrl(e.target.value)}
            disabled={isPending}
            className={INPUT}
            placeholder="https://pdki-indonesia..."
          />
          <FieldError errors={fieldErrors} name="hkiUrl" />
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase tracking-widest text-(--color-text-muted) font-heading mb-1.5">
            Journal URL
          </label>
          <input
            value={journalUrl}
            onChange={(e) => setJournalUrl(e.target.value)}
            disabled={isPending}
            className={INPUT}
            placeholder="https://journal..."
          />
          <FieldError errors={fieldErrors} name="journalUrl" />
        </div>
      </div>

      {/* Display Order */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-widest text-(--color-text-muted) font-heading mb-1.5 whitespace-nowrap">
          Display Order (Maksimal 3 Inovasi)
        </label>
        {mode === "create" ? (
          <div>
            <div className={cn(INPUT, "flex items-center text-accent-gold font-bold bg-accent-gold/10 border-accent-gold/40 cursor-default")}>
              #1 (Otomatis Teratas)
            </div>
            <p className="text-[11px] text-(--color-text-muted) mt-1">
              Inovasi baru otomatis menempati posisi #1, data lainnya bergeser turun.
            </p>
          </div>
        ) : (
          <div>
            <select
              value={displayOrder}
              onChange={(e) => setDisplayOrder(Number(e.target.value))}
              disabled={isPending}
              className={cn(INPUT, "cursor-pointer font-bold text-accent-gold")}
            >
              {Array.from(
                { length: Math.min(Math.max(totalCount ?? 1, displayOrder, 1), 3) },
                (_, i) => i + 1
              ).map((num) => (
                <option key={num} value={num} className="bg-(--color-bg) text-(--color-text)">
                  Urutan #{num} {num === initialData?.displayOrder ? "(Saat Ini)" : ""}
                </option>
              ))}
            </select>
            <p className="text-[11px] text-(--color-text-muted) mt-1">
              Urutan lain otomatis menyesuaikan (tidak akan ada nomor kembar).
            </p>
          </div>
        )}
        <FieldError errors={fieldErrors} name="displayOrder" />
      </div>

      {/* Image Upload */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-widest text-(--color-text-muted) font-heading mb-1.5">
          Gambar Inovasi
        </label>
        <ImageUpload
          folder="innovations"
          currentUrl={image || null}
          onUploadComplete={(url) => { setImage(url); setUploadError(null); }}
          onUploadError={(err) => setUploadError(err)}
        />
        {uploadError && <p className="text-xs text-accent-pink mt-1">{uploadError}</p>}
        <FieldError errors={fieldErrors} name="image" />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4 pt-2">
        <button
          type="submit"
          disabled={isPending}
          className="rounded-lg px-6 py-2.5 text-sm font-semibold bg-accent-gold text-black hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          {isPending
            ? mode === "create" ? "Menyimpan..." : "Memperbarui..."
            : mode === "create" ? "Simpan Inovasi" : "Perbarui Inovasi"}
        </button>
        <Link
          href="/admin/innovations"
          className="text-sm text-(--color-text-muted) hover:text-(--color-text) transition-colors"
        >
          Batal
        </Link>
      </div>
    </form>
  );
}
