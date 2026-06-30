"use client";

import { useState, useTransition, KeyboardEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { Project } from "@prisma/client";
import { cn } from "@/lib/utils";
import { createProject, updateProject } from "../actions";
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
      {/* Tags */}
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
                className="hover:opacity-70 transition-opacity leading-none"
                aria-label={`Hapus ${tag}`}
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}
      {/* Input */}
      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ketik tech, tekan Enter atau Tambah"
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
          className="rounded-lg px-3 py-2.5 text-sm border border-(--glass-border) text-(--color-text-muted) hover:border-accent-gold/50 hover:text-(--color-text) transition-colors"
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
  initialData?: Project;
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

export function ProjectForm({ mode, initialData }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [title, setTitle]             = useState(initialData?.title ?? "");
  const [description, setDescription] = useState(initialData?.description ?? "");
  const [techStack, setTechStack]     = useState<string[]>(initialData?.techStack ?? []);
  const [demoUrl, setDemoUrl]         = useState(initialData?.demoUrl ?? "");
  const [repoUrl, setRepoUrl]         = useState(initialData?.repoUrl ?? "");
  const [badgeLabel, setBadgeLabel]   = useState(initialData?.badgeLabel ?? "");
  const [isFeatured, setIsFeatured]   = useState(initialData?.isFeatured ?? false);
  const [displayOrder, setDisplayOrder] = useState(initialData?.displayOrder ?? 0);
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
      fd.set("title",        title);
      fd.set("description",  description);
      fd.set("techStack",    JSON.stringify(techStack));
      fd.set("demoUrl",      demoUrl);
      fd.set("repoUrl",      repoUrl);
      fd.set("imageUrl",     imageUrl);
      fd.set("badgeLabel",   badgeLabel);
      fd.set("isFeatured",   isFeatured ? "true" : "false");
      fd.set("displayOrder", String(displayOrder));

      const result =
        mode === "create"
          ? await createProject(fd)
          : await updateProject(initialData!.id, fd);

      if (result.success) {
        router.push("/admin/projects");
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

      {/* Title */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-widest text-(--color-text-muted) font-heading mb-1.5">
          Judul <span className="text-accent-pink">*</span>
        </label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} disabled={isPending} className={INPUT} placeholder="Nama project" />
        <FieldError errors={fieldErrors} name="title" />
      </div>

      {/* Description */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-widest text-(--color-text-muted) font-heading mb-1.5">
          Deskripsi <span className="text-accent-pink">*</span>
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={isPending}
          rows={4}
          className={cn(INPUT, "resize-y")}
          placeholder="Deskripsi singkat project"
        />
        <FieldError errors={fieldErrors} name="description" />
      </div>

      {/* Tech Stack */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-widest text-(--color-text-muted) font-heading mb-1.5">
          Tech Stack <span className="text-accent-pink">*</span>
        </label>
        <TechStackInput
          tags={techStack}
          onChange={setTechStack}
          error={fieldErrors["techStack"]?.[0]}
        />
      </div>

      {/* Demo & Repo URLs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-widest text-(--color-text-muted) font-heading mb-1.5">
            Demo URL
          </label>
          <input value={demoUrl} onChange={(e) => setDemoUrl(e.target.value)} disabled={isPending} className={INPUT} placeholder="https://..." />
          <FieldError errors={fieldErrors} name="demoUrl" />
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase tracking-widest text-(--color-text-muted) font-heading mb-1.5">
            Repo URL
          </label>
          <input value={repoUrl} onChange={(e) => setRepoUrl(e.target.value)} disabled={isPending} className={INPUT} placeholder="https://github.com/..." />
          <FieldError errors={fieldErrors} name="repoUrl" />
        </div>
      </div>

      {/* Badge Label */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-widest text-(--color-text-muted) font-heading mb-1.5">
          Badge Label
        </label>
        <input value={badgeLabel} onChange={(e) => setBadgeLabel(e.target.value)} disabled={isPending} className={INPUT} placeholder="mis. HKI, Open Source" />
        <FieldError errors={fieldErrors} name="badgeLabel" />
      </div>

      {/* Featured & Order */}
      <div className="flex items-center gap-6">
        <label className="flex items-center gap-2 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={isFeatured}
            onChange={(e) => setIsFeatured(e.target.checked)}
            disabled={isPending}
            className="w-4 h-4 rounded accent-[var(--color-accent-gold)]"
          />
          <span className="text-sm text-(--color-text)">Featured</span>
        </label>

        <div className="flex items-center gap-2">
          <label className="text-xs font-semibold uppercase tracking-widest text-(--color-text-muted) font-heading whitespace-nowrap">
            Display Order
          </label>
          <input
            type="number"
            value={displayOrder}
            onChange={(e) => setDisplayOrder(Number(e.target.value))}
            disabled={isPending}
            className={cn(INPUT, "w-20 text-center")}
          />
          <FieldError errors={fieldErrors} name="displayOrder" />
        </div>
      </div>

      {/* Image Upload */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-widest text-(--color-text-muted) font-heading mb-1.5">
          Gambar
        </label>
        <ImageUpload
          folder="projects"
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
            : mode === "create" ? "Simpan Project" : "Perbarui Project"}
        </button>
        <Link
          href="/admin/projects"
          className="text-sm text-(--color-text-muted) hover:text-(--color-text) transition-colors"
        >
          Batal
        </Link>
      </div>
    </form>
  );
}
