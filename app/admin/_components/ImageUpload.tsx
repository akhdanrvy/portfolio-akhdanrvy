"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

interface ImageUploadProps {
  folder: "projects" | "certifications";
  currentUrl?: string | null;
  onUploadComplete: (url: string) => void;
  onUploadError: (error: string) => void;
}

export function ImageUpload({
  folder,
  currentUrl,
  onUploadComplete,
  onUploadError,
}: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(currentUrl ?? null);
  const [isUploading, setIsUploading] = useState(false);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    // Local preview immediately
    const localUrl = URL.createObjectURL(file);
    setPreview(localUrl);
    setIsUploading(true);

    const sanitizedName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
    const filePath = `${folder}/${Date.now()}-${sanitizedName}`;

    const supabase = createClient();
    const { error: uploadError } = await supabase.storage
      .from("portfolio-images")
      .upload(filePath, file, { upsert: false });

    setIsUploading(false);

    if (uploadError) {
      setPreview(currentUrl ?? null);
      onUploadError(`Upload gagal: ${uploadError.message}`);
      // Reset input so user can retry same file
      if (inputRef.current) inputRef.current.value = "";
      return;
    }

    const { data: urlData } = supabase.storage
      .from("portfolio-images")
      .getPublicUrl(filePath);

    onUploadComplete(urlData.publicUrl);
  }

  return (
    <div className="space-y-3">
      {/* Preview */}
      {preview && (
        <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-(--glass-border)">
          <Image
            src={preview}
            alt="Preview gambar"
            fill
            className="object-cover"
            unoptimized={preview.startsWith("blob:")}
          />
        </div>
      )}

      {/* Upload button */}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
      <button
        type="button"
        disabled={isUploading}
        onClick={() => inputRef.current?.click()}
        className={cn(
          "rounded-lg px-4 py-2 text-sm border border-(--glass-border)",
          "text-(--color-text-muted) hover:text-(--color-text) hover:border-accent-gold/50",
          "transition-colors duration-150",
          "disabled:opacity-50 disabled:cursor-not-allowed"
        )}
      >
        {isUploading
          ? "Mengupload..."
          : preview
          ? "Ganti Gambar"
          : "Pilih Gambar"}
      </button>
    </div>
  );
}
