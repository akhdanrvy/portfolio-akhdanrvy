import type { Metadata } from "next";
import Link from "next/link";
import { getProjects } from "@/lib/data/projects";
import { ProjectForm } from "../_components/ProjectForm";
import { GlassCard } from "@/components/ui/GlassCard";

export const metadata: Metadata = {
  title: "Admin — Tambah Project",
  robots: { index: false, follow: false },
};

export default async function NewProjectPage() {
  const projects = await getProjects();

  if (projects.length >= 4) {
    return (
      <div className="p-6 md:p-8 max-w-xl">
        <GlassCard noAnimatedBorder className="space-y-4">
          <h1 className="font-heading text-xl font-bold text-accent-pink">
            Batas Maksimal Tercapai
          </h1>
          <p className="text-sm text-(--color-text-muted) leading-relaxed">
            Anda sudah memiliki 4 project (1 Featured + 3 Grid). Untuk menambahkan project baru, silakan hapus atau edit salah satu project yang sudah ada.
          </p>
          <Link
            href="/admin/projects"
            className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold bg-accent-gold text-black hover:opacity-90 transition-opacity"
          >
            ← Kembali ke Daftar Project
          </Link>
        </GlassCard>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8">
      <h1 className="font-heading text-2xl font-bold text-(--color-text) mb-6">
        Tambah Project
      </h1>
      <ProjectForm mode="create" totalCount={projects.length} />
    </div>
  );
}
