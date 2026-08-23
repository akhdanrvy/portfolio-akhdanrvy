import type { Metadata } from "next";
import Link from "next/link";
import { getProjects } from "@/lib/data/projects";
import { getCertifications } from "@/lib/data/certifications";
import { getExperiences } from "@/lib/data/experiences";
import { getInnovations } from "@/lib/data/innovations";
import { GlassCard } from "@/components/ui/GlassCard";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  const [projects, certifications, experiences, innovations] = await Promise.all([
    getProjects(),
    getCertifications(),
    getExperiences(),
    getInnovations(),
  ]);

  return (
    <div className="p-6 md:p-8 space-y-6">
      {/* Header */}
      <div>
        <p className="text-xs font-semibold tracking-[0.25em] uppercase text-accent-gold font-heading mb-1">
          管理者パネル
        </p>
        <h1 className="font-heading text-2xl font-bold text-(--color-text)">
          Dashboard
        </h1>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl">
        <GlassCard noAnimatedBorder className="text-center">
          <p className="font-heading text-4xl font-bold text-accent-gold">
            {projects.length}
          </p>
          <p className="text-sm text-(--color-text-muted) mt-1">Projects</p>
        </GlassCard>
        <GlassCard noAnimatedBorder className="text-center">
          <p className="font-heading text-4xl font-bold text-accent-gold">
            {certifications.length}
          </p>
          <p className="text-sm text-(--color-text-muted) mt-1">Certifications</p>
        </GlassCard>
        <GlassCard noAnimatedBorder className="text-center">
          <p className="font-heading text-4xl font-bold text-accent-gold">
            {experiences.length}
          </p>
          <p className="text-sm text-(--color-text-muted) mt-1">Experiences</p>
        </GlassCard>
        <GlassCard noAnimatedBorder className="text-center">
          <p className="font-heading text-4xl font-bold text-accent-gold">
            {innovations.length}
          </p>
          <p className="text-sm text-(--color-text-muted) mt-1">Innovations</p>
        </GlassCard>
      </div>

      {/* Quick actions */}
      <GlassCard noAnimatedBorder className="max-w-xl">
        <h2 className="font-heading text-sm font-bold text-(--color-text) mb-4 uppercase tracking-widest">
          Aksi Cepat
        </h2>
        <div className="flex flex-col gap-3">
          <Link
            href="/admin/projects/new"
            className="flex items-center gap-3 rounded-lg px-4 py-3 bg-accent-gold text-black text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            + Tambah Project Baru
          </Link>
          <Link
            href="/admin/certifications/new"
            className="flex items-center gap-3 rounded-lg px-4 py-3 border border-(--glass-border) text-(--color-text-muted) text-sm hover:text-(--color-text) hover:border-accent-gold/50 transition-colors duration-150"
          >
            + Tambah Certification Baru
          </Link>
          <Link
            href="/admin/experiences/new"
            className="flex items-center gap-3 rounded-lg px-4 py-3 border border-(--glass-border) text-(--color-text-muted) text-sm hover:text-(--color-text) hover:border-accent-gold/50 transition-colors duration-150"
          >
            + Tambah Experience Baru
          </Link>
          <Link
            href="/admin/innovations/new"
            className="flex items-center gap-3 rounded-lg px-4 py-3 border border-(--glass-border) text-(--color-text-muted) text-sm hover:text-(--color-text) hover:border-accent-gold/50 transition-colors duration-150"
          >
            + Tambah Innovation Baru
          </Link>
        </div>
      </GlassCard>
    </div>
  );
}
