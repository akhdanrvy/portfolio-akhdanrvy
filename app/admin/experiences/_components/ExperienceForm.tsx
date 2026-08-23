"use client";

import { useState, useTransition, KeyboardEvent, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { Experience } from "@prisma/client";
import { cn } from "@/lib/utils";
import { createExperience, updateExperience } from "../actions";
import { ImageUpload } from "../../_components/ImageUpload";

/* ── Month Format Helpers ────────────────────────────────────────── */
const MONTH_NAMES = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

function formatYearMonth(val: string): string {
  if (!val) return "";
  const [year, month] = val.split("-");
  const mIndex = parseInt(month, 10) - 1;
  const mName = MONTH_NAMES[mIndex] || month;
  return `${mName} ${year}`;
}

function parsePeriodToYearMonth(periodStr?: string): { start: string; end: string } {
  if (!periodStr) return { start: "", end: "" };
  const parts = periodStr.split(/[–—-]/).map((s) => s.trim());

  const parsePart = (p: string): string => {
    if (!p || p.toLowerCase() === "present" || p.toLowerCase() === "sekarang") return "";
    const tokens = p.split(/\s+/);
    if (tokens.length === 2) {
      const mIdx = MONTH_NAMES.findIndex((m) => m.toLowerCase() === tokens[0].toLowerCase().slice(0, 3));
      const year = tokens[1];
      if (mIdx !== -1 && year) {
        const mm = String(mIdx + 1).padStart(2, "0");
        return `${year}-${mm}`;
      }
    } else if (tokens.length === 1 && /^\d{4}$/.test(tokens[0])) {
      return `${tokens[0]}-01`;
    }
    return "";
  };

  return {
    start: parsePart(parts[0] || ""),
    end: parts[1] ? parsePart(parts[1]) : "",
  };
}

/* ── Tag / Skill Input ───────────────────────────────────────────── */
function TagInput({
  tags,
  onChange,
  placeholder = "Ketik tag lalu tekan Enter",
  error,
}: {
  tags: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
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
          placeholder={placeholder}
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

/* ── Bullet Points Input ─────────────────────────────────────────── */
function BulletPointsInput({
  points,
  onChange,
  error,
}: {
  points: string[];
  onChange: (points: string[]) => void;
  error?: string;
}) {
  function updatePoint(idx: number, val: string) {
    const next = [...points];
    next[idx] = val;
    onChange(next);
  }

  function addPoint() {
    onChange([...points, ""]);
  }

  function removePoint(idx: number) {
    if (points.length <= 1) {
      onChange([""]);
      return;
    }
    onChange(points.filter((_, i) => i !== idx));
  }

  return (
    <div className="space-y-3">
      {points.map((pt, i) => (
        <div key={i} className="flex items-start gap-2">
          <span className="mt-3 text-xs text-(--color-accent-pink)">•</span>
          <textarea
            rows={2}
            value={pt}
            onChange={(e) => updatePoint(i, e.target.value)}
            placeholder={`Poin deskripsi #${i + 1}`}
            className={cn(
              "flex-1 rounded-lg px-4 py-2 text-sm",
              "bg-(--color-glass) border border-(--glass-border)",
              "text-(--color-text) placeholder:text-(--color-text-muted)",
              "focus:outline-none focus:border-accent-gold transition-colors resize-y"
            )}
          />
          <button
            type="button"
            onClick={() => removePoint(i)}
            className="mt-2 text-sm text-(--color-text-muted) hover:text-accent-pink transition-colors px-2 py-1 cursor-pointer"
            title="Hapus poin ini"
          >
            ✕
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={addPoint}
        className="rounded-lg px-3 py-1.5 text-xs border border-dashed border-(--glass-border) text-(--color-text-muted) hover:border-accent-gold/50 hover:text-accent-gold transition-colors cursor-pointer"
      >
        + Tambah Poin Deskripsi
      </button>

      {error && <p className="text-xs text-accent-pink">{error}</p>}
    </div>
  );
}

/* ── Main Form ───────────────────────────────────────────────────── */
interface Props {
  mode: "create" | "edit";
  initialData?: Experience;
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

const TYPE_OPTIONS = ["Full-time", "Internship", "Independent Study", "Education"] as const;

export function ExperienceForm({ mode, initialData, totalCount }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const initialDates = useMemo(() => parsePeriodToYearMonth(initialData?.period), [initialData?.period]);

  const [role, setRole]                 = useState(initialData?.role ?? "");
  const [company, setCompany]           = useState(initialData?.company ?? "");
  const [companyUrl, setCompanyUrl]     = useState(initialData?.companyUrl ?? "");
  const [companyLogo, setCompanyLogo]   = useState(initialData?.companyLogo ?? "");
  
  /* Month & Year pickers */
  const [startMonth, setStartMonth]     = useState(initialDates.start);
  const [endMonth, setEndMonth]         = useState(initialDates.end);
  const [current, setCurrent]           = useState(initialData?.current ?? false);

  const [type, setType]                 = useState<string>(initialData?.type ?? "Full-time");
  const [description, setDescription]   = useState<string[]>(
    initialData?.description && initialData.description.length > 0
      ? initialData.description
      : [""]
  );
  const [tags, setTags]                 = useState<string[]>(initialData?.tags ?? []);
  const [displayOrder, setDisplayOrder] = useState(initialData?.displayOrder ?? 0);
  const [uploadError, setUploadError]   = useState<string | null>(null);

  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
  const [globalError, setGlobalError] = useState<string | null>(null);

  /* Computed formatted period preview */
  const computedPeriod = useMemo(() => {
    if (!startMonth) return "";
    const formattedStart = formatYearMonth(startMonth);
    if (current) {
      return `${formattedStart} – Present`;
    }
    if (endMonth) {
      return `${formattedStart} – ${formatYearMonth(endMonth)}`;
    }
    return formattedStart;
  }, [startMonth, endMonth, current]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFieldErrors({});
    setGlobalError(null);
    setUploadError(null);

    if (!startMonth) {
      setFieldErrors((prev) => ({ ...prev, period: ["Pilih bulan & tahun mulai"] }));
      return;
    }

    if (!current && !endMonth) {
      setFieldErrors((prev) => ({ ...prev, period: ["Pilih bulan selesai atau centang 'Posisi Saat Ini'"] }));
      return;
    }

    const cleanDescriptions = description.map((d) => d.trim()).filter(Boolean);

    startTransition(async () => {
      const fd = new FormData();
      fd.set("role",         role);
      fd.set("company",      company);
      fd.set("companyUrl",   companyUrl);
      fd.set("companyLogo",  companyLogo);
      fd.set("period",       computedPeriod);
      fd.set("type",         type);
      fd.set("current",      current ? "true" : "false");
      fd.set("description",  JSON.stringify(cleanDescriptions));
      fd.set("tags",         JSON.stringify(tags));
      fd.set("displayOrder", String(displayOrder));

      const result =
        mode === "create"
          ? await createExperience(fd)
          : await updateExperience(initialData!.id, fd);

      if (result.success) {
        router.push("/admin/experiences");
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

      {/* Role & Company */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-widest text-(--color-text-muted) font-heading mb-1.5">
            Role / Posisi <span className="text-accent-pink">*</span>
          </label>
          <input
            value={role}
            onChange={(e) => setRole(e.target.value)}
            disabled={isPending}
            className={INPUT}
            placeholder="mis. App Developer, Frontend Engineer"
          />
          <FieldError errors={fieldErrors} name="role" />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-widest text-(--color-text-muted) font-heading mb-1.5">
            Perusahaan / Institusi <span className="text-accent-pink">*</span>
          </label>
          <input
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            disabled={isPending}
            className={INPUT}
            placeholder="mis. PT. Mitra Graha Integrasi, IPB University"
          />
          <FieldError errors={fieldErrors} name="company" />
        </div>
      </div>

      {/* Calendar Month Pickers for Period */}
      <div className="space-y-2">
        <label className="block text-xs font-semibold uppercase tracking-widest text-(--color-text-muted) font-heading mb-1.5">
          Periode Pengalaman <span className="text-accent-pink">*</span>
        </label>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-(--color-text-muted) mb-1">
              Bulan & Tahun Mulai <span className="text-accent-pink">*</span>
            </label>
            <input
              type="month"
              value={startMonth}
              onChange={(e) => setStartMonth(e.target.value)}
              disabled={isPending}
              className={INPUT}
            />
          </div>

          <div>
            <label className="block text-xs text-(--color-text-muted) mb-1">
              Bulan & Tahun Selesai
            </label>
            {current ? (
              <div className={cn(INPUT, "flex items-center text-accent-gold font-medium bg-accent-gold/5 border-accent-gold/30")}>
                Present (Masih Berlangsung)
              </div>
            ) : (
              <input
                type="month"
                value={endMonth}
                min={startMonth || undefined}
                onChange={(e) => setEndMonth(e.target.value)}
                disabled={isPending || current}
                className={INPUT}
              />
            )}
          </div>
        </div>

        {/* Live Period Preview */}
        {computedPeriod && (
          <div className="flex items-center gap-2 pt-1 text-xs text-(--color-text-muted)">
            <span>Tampilan di Web:</span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs bg-accent-gold/10 text-accent-gold border border-accent-gold/30 font-medium">
              {computedPeriod}
            </span>
          </div>
        )}

        <FieldError errors={fieldErrors} name="period" />
      </div>

      {/* Current Position & Type */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-widest text-(--color-text-muted) font-heading mb-1.5">
            Tipe Pengalaman <span className="text-accent-pink">*</span>
          </label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            disabled={isPending}
            className={cn(INPUT, "cursor-pointer")}
          >
            {TYPE_OPTIONS.map((opt) => (
              <option key={opt} value={opt} className="bg-(--color-bg) text-(--color-text)">
                {opt}
              </option>
            ))}
          </select>
          <FieldError errors={fieldErrors} name="type" />
        </div>

        <div className="pt-5">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={current}
              onChange={(e) => {
                const checked = e.target.checked;
                setCurrent(checked);
                if (checked) setEndMonth("");
              }}
              disabled={isPending}
              className="w-4 h-4 rounded accent-[var(--color-accent-gold)]"
            />
            <span className="text-sm text-(--color-text)">Posisi Saat Ini (Current)</span>
          </label>
        </div>
      </div>

      {/* Company URL & Display Order */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="sm:col-span-2">
          <label className="block text-xs font-semibold uppercase tracking-widest text-(--color-text-muted) font-heading mb-1.5">
            Company Website URL
          </label>
          <input
            value={companyUrl}
            onChange={(e) => setCompanyUrl(e.target.value)}
            disabled={isPending}
            className={INPUT}
            placeholder="https://company.com"
          />
          <FieldError errors={fieldErrors} name="companyUrl" />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-widest text-(--color-text-muted) font-heading mb-1.5 whitespace-nowrap">
            Display Order
          </label>
          {mode === "create" ? (
            <div>
              <div className={cn(INPUT, "flex items-center justify-center font-bold text-accent-gold bg-accent-gold/10 border-accent-gold/40 cursor-default")}>
                #1 (Otomatis Teratas)
              </div>
              <p className="text-[11px] text-(--color-text-muted) mt-1">
                Data baru otomatis jadi #1, data lainnya bergeser turun.
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
                  { length: Math.max(totalCount ?? 1, displayOrder, 1) },
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
      </div>

      {/* Description Bullets */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-widest text-(--color-text-muted) font-heading mb-1.5">
          Poin-poin Deskripsi <span className="text-accent-pink">*</span>
        </label>
        <BulletPointsInput
          points={description}
          onChange={setDescription}
          error={fieldErrors["description"]?.[0]}
        />
      </div>

      {/* Tags / Skills */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-widest text-(--color-text-muted) font-heading mb-1.5">
          Tags / Skills
        </label>
        <TagInput
          tags={tags}
          onChange={setTags}
          placeholder="Ketik tag lalu tekan Enter (mis. iOS, Swift, IT Consulting)"
          error={fieldErrors["tags"]?.[0]}
        />
      </div>

      {/* Company Logo */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-widest text-(--color-text-muted) font-heading mb-1.5">
          Logo Perusahaan
        </label>
        <ImageUpload
          folder="experiences"
          currentUrl={companyLogo || null}
          onUploadComplete={(url) => { setCompanyLogo(url); setUploadError(null); }}
          onUploadError={(err) => setUploadError(err)}
        />
        {uploadError && <p className="text-xs text-accent-pink mt-1">{uploadError}</p>}
        <FieldError errors={fieldErrors} name="companyLogo" />
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
            : mode === "create" ? "Simpan Experience" : "Perbarui Experience"}
        </button>
        <Link
          href="/admin/experiences"
          className="text-sm text-(--color-text-muted) hover:text-(--color-text) transition-colors"
        >
          Batal
        </Link>
      </div>
    </form>
  );
}
