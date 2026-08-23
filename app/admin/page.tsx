import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  TbFolderCode,
  TbCertificate,
  TbBriefcase,
  TbBulb,
  TbExternalLink,
  TbPlus,
  TbSparkles,
  TbStar,
  TbTrophy,
  TbArrowRight,
  TbCheck,
  TbDatabase,
  TbShieldCheck,
  TbSchool,
  TbCpu,
} from "react-icons/tb";
import { getProjects } from "@/lib/data/projects";
import { getCertifications } from "@/lib/data/certifications";
import { getExperiences } from "@/lib/data/experiences";
import { getInnovations } from "@/lib/data/innovations";
import { GlassCard } from "@/components/ui/GlassCard";

export const metadata: Metadata = {
  title: "Admin Dashboard — Command Center",
  robots: { index: false, follow: false },
};

export const revalidate = 0; // Always fresh in admin

export default async function AdminPage() {
  const [projects, certifications, experiences, innovations] = await Promise.all([
    getProjects(),
    getCertifications(),
    getExperiences(),
    getInnovations(),
  ]);

  const featuredProjectsCount = projects.filter((p) => p.isFeatured).length;
  const currentExperiencesCount = experiences.filter((e) => e.current).length;
  const awardedInnovationsCount = innovations.filter((i) => i.award || i.hkiUrl || i.journalUrl).length;

  const totalContentCount =
    projects.length + certifications.length + experiences.length + innovations.length;

  return (
    <div className="p-6 md:p-10 space-y-8 max-w-7xl mx-auto">
      {/* ── 1. Top Header Banner ───────────────────────────────────── */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pb-6 border-b border-(--glass-border)">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.25em] uppercase text-accent-gold font-heading px-2.5 py-0.5 rounded-full border border-accent-gold/40 bg-accent-gold/10">
              <TbShieldCheck size={13} /> 管理者ダッシュボード • COMMAND CENTER
            </span>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-green-400 px-2.5 py-0.5 rounded-full border border-green-500/30 bg-green-500/10">
              <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-ping" />
              Database Online
            </span>
          </div>
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-(--color-text) tracking-tight">
            Portfolio Management Hub
          </h1>
          <p className="text-sm text-(--color-text-muted) mt-1.5 max-w-2xl">
            Kelola dan perbarui seluruh konten portofolio, riwayat karier, sertifikasi, riset inovasi, dan status sistem secara real-time.
          </p>
        </div>

        {/* Quick Action Button */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs font-semibold tracking-wide border border-accent-gold/40 bg-accent-gold/10 text-accent-gold hover:bg-accent-gold/20 hover:border-accent-gold/60 transition-all shadow-sm group"
          >
            <span>Lihat Live Portfolio</span>
            <TbExternalLink size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>

      {/* ── 2. Metric Overview Cards ───────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Projects Metric */}
        <Link href="/admin/projects" className="group block focus-visible:outline-none">
          <GlassCard
            noAnimatedBorder
            className="relative overflow-hidden p-5 transition-all duration-300 group-hover:border-accent-gold/60 group-hover:shadow-[0_0_24px_rgba(201,168,76,0.15)] group-hover:-translate-y-1"
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-accent-gold to-accent-pink" />
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-(--color-text-muted)">
                Projects
              </span>
              <div className="h-10 w-10 rounded-xl bg-accent-gold/10 border border-accent-gold/30 flex items-center justify-center text-accent-gold">
                <TbFolderCode size={20} />
              </div>
            </div>
            <p className="font-heading text-4xl font-bold text-(--color-text) mb-1">
              {projects.length}
            </p>
            <div className="flex items-center justify-between text-xs text-(--color-text-muted)">
              <span className="flex items-center gap-1 text-accent-gold font-medium">
                <TbStar size={12} /> {featuredProjectsCount} Featured
              </span>
              <span className="group-hover:translate-x-1 transition-transform text-accent-gold font-semibold flex items-center gap-0.5">
                Kelola <TbArrowRight size={12} />
              </span>
            </div>
          </GlassCard>
        </Link>

        {/* Certifications Metric */}
        <Link href="/admin/certifications" className="group block focus-visible:outline-none">
          <GlassCard
            noAnimatedBorder
            className="relative overflow-hidden p-5 transition-all duration-300 group-hover:border-accent-pink/60 group-hover:shadow-[0_0_24px_rgba(244,184,193,0.15)] group-hover:-translate-y-1"
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-accent-pink to-accent-gold" />
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-(--color-text-muted)">
                Certifications
              </span>
              <div className="h-10 w-10 rounded-xl bg-accent-pink/10 border border-accent-pink/30 flex items-center justify-center text-accent-pink">
                <TbCertificate size={20} />
              </div>
            </div>
            <p className="font-heading text-4xl font-bold text-(--color-text) mb-1">
              {certifications.length}
            </p>
            <div className="flex items-center justify-between text-xs text-(--color-text-muted)">
              <span className="text-(--color-text-muted)">Kredensial Resmi</span>
              <span className="group-hover:translate-x-1 transition-transform text-accent-pink font-semibold flex items-center gap-0.5">
                Kelola <TbArrowRight size={12} />
              </span>
            </div>
          </GlassCard>
        </Link>

        {/* Experiences Metric */}
        <Link href="/admin/experiences" className="group block focus-visible:outline-none">
          <GlassCard
            noAnimatedBorder
            className="relative overflow-hidden p-5 transition-all duration-300 group-hover:border-teal-400/60 group-hover:shadow-[0_0_24px_rgba(45,212,191,0.15)] group-hover:-translate-y-1"
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-teal-400 to-accent-gold" />
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-(--color-text-muted)">
                Experiences
              </span>
              <div className="h-10 w-10 rounded-xl bg-teal-400/10 border border-teal-400/30 flex items-center justify-center text-teal-300">
                <TbBriefcase size={20} />
              </div>
            </div>
            <p className="font-heading text-4xl font-bold text-(--color-text) mb-1">
              {experiences.length}
            </p>
            <div className="flex items-center justify-between text-xs text-(--color-text-muted)">
              <span className="text-teal-300 font-medium">
                🟢 {currentExperiencesCount} Posisi Aktif
              </span>
              <span className="group-hover:translate-x-1 transition-transform text-teal-300 font-semibold flex items-center gap-0.5">
                Kelola <TbArrowRight size={12} />
              </span>
            </div>
          </GlassCard>
        </Link>

        {/* Innovations Metric */}
        <Link href="/admin/innovations" className="group block focus-visible:outline-none">
          <GlassCard
            noAnimatedBorder
            className="relative overflow-hidden p-5 transition-all duration-300 group-hover:border-purple-400/60 group-hover:shadow-[0_0_24px_rgba(192,132,252,0.15)] group-hover:-translate-y-1"
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-purple-400 to-accent-pink" />
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-(--color-text-muted)">
                Innovations
              </span>
              <div className="h-10 w-10 rounded-xl bg-purple-400/10 border border-purple-400/30 flex items-center justify-center text-purple-300">
                <TbBulb size={20} />
              </div>
            </div>
            <p className="font-heading text-4xl font-bold text-(--color-text) mb-1">
              {innovations.length}
            </p>
            <div className="flex items-center justify-between text-xs text-(--color-text-muted)">
              <span className="text-purple-300 font-medium flex items-center gap-1">
                <TbTrophy size={12} /> {awardedInnovationsCount} Award/HKI
              </span>
              <span className="group-hover:translate-x-1 transition-transform text-purple-300 font-semibold flex items-center gap-0.5">
                Kelola <TbArrowRight size={12} />
              </span>
            </div>
          </GlassCard>
        </Link>
      </div>

      {/* ── 3. Main Grid (Two Columns) ────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* ── LEFT COLUMN: Content Previews & Activity (7 cols) ──── */}
        <div className="lg:col-span-7 space-y-6">
          {/* Latest Projects Box */}
          <GlassCard noAnimatedBorder className="p-6">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-(--glass-border)">
              <div className="flex items-center gap-2.5">
                <div className="h-8 w-8 rounded-lg bg-accent-gold/10 border border-accent-gold/30 flex items-center justify-center text-accent-gold">
                  <TbFolderCode size={18} />
                </div>
                <div>
                  <h2 className="font-heading text-base font-bold text-(--color-text)">
                    Daftar Proyek Portofolio
                  </h2>
                  <p className="text-xs text-(--color-text-muted)">
                    Total {projects.length} proyek terdaftar
                  </p>
                </div>
              </div>
              <Link
                href="/admin/projects"
                className="text-xs font-semibold text-accent-gold hover:underline flex items-center gap-1"
              >
                Lihat Semua <TbArrowRight size={12} />
              </Link>
            </div>

            {projects.length === 0 ? (
              <div className="py-8 text-center text-xs text-(--color-text-muted)">
                Belum ada data proyek. Silakan buat proyek baru.
              </div>
            ) : (
              <div className="space-y-3">
                {projects.slice(0, 3).map((p) => (
                  <Link
                    key={p.id}
                    href={`/admin/projects/${p.id}`}
                    className="group flex items-center justify-between p-3 rounded-xl border border-(--glass-border) bg-(--color-glass) hover:bg-(--color-glass-hover) hover:border-accent-gold/40 transition-all"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="relative h-12 w-12 rounded-lg overflow-hidden border border-(--glass-border) bg-black/20 shrink-0 flex items-center justify-center">
                        {p.imageUrl ? (
                          <Image
                            src={p.imageUrl}
                            alt={p.title}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <span className="font-heading text-xs font-bold text-accent-gold">
                            #{p.displayOrder}
                          </span>
                        )}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-heading text-sm font-bold text-(--color-text) truncate group-hover:text-accent-gold transition-colors">
                            {p.title}
                          </p>
                          {p.isFeatured && (
                            <span className="text-[10px] px-1.5 py-0.2 rounded-full border border-accent-gold/40 bg-accent-gold/10 text-accent-gold flex items-center gap-0.5 shrink-0">
                              <TbStar size={10} /> Featured
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                          {p.techStack.slice(0, 3).map((tech) => (
                            <span
                              key={tech}
                              className="text-[10px] px-2 py-0.5 rounded-full border border-accent-pink/30 bg-accent-pink/5 text-accent-pink"
                            >
                              {tech}
                            </span>
                          ))}
                          {p.techStack.length > 3 && (
                            <span className="text-[10px] text-(--color-text-muted)">
                              +{p.techStack.length - 3}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="shrink-0 pl-3 text-right">
                      <span className="text-xs text-accent-gold group-hover:translate-x-0.5 transition-transform inline-block">
                        Edit →
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </GlassCard>

          {/* Latest Experiences & Education Box */}
          <GlassCard noAnimatedBorder className="p-6">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-(--glass-border)">
              <div className="flex items-center gap-2.5">
                <div className="h-8 w-8 rounded-lg bg-teal-400/10 border border-teal-400/30 flex items-center justify-center text-teal-300">
                  <TbBriefcase size={18} />
                </div>
                <div>
                  <h2 className="font-heading text-base font-bold text-(--color-text)">
                    Riwayat Pengalaman & Pendidikan
                  </h2>
                  <p className="text-xs text-(--color-text-muted)">
                    Total {experiences.length} posisi & studi tercatat
                  </p>
                </div>
              </div>
              <Link
                href="/admin/experiences"
                className="text-xs font-semibold text-teal-300 hover:underline flex items-center gap-1"
              >
                Lihat Semua <TbArrowRight size={12} />
              </Link>
            </div>

            {experiences.length === 0 ? (
              <div className="py-8 text-center text-xs text-(--color-text-muted)">
                Belum ada data pengalaman.
              </div>
            ) : (
              <div className="space-y-3">
                {experiences.slice(0, 3).map((exp) => (
                  <Link
                    key={exp.id}
                    href={`/admin/experiences/${exp.id}`}
                    className="group flex items-center justify-between p-3 rounded-xl border border-(--glass-border) bg-(--color-glass) hover:bg-(--color-glass-hover) hover:border-teal-400/40 transition-all"
                  >
                    <div className="min-w-0 pr-3">
                      <div className="flex items-center gap-2">
                        {exp.type === "Education" ? (
                          <TbSchool size={15} className="text-purple-300 shrink-0" />
                        ) : null}
                        <p className="font-heading text-sm font-bold text-(--color-text) truncate group-hover:text-teal-300 transition-colors">
                          {exp.role}
                        </p>
                        {exp.current && (
                          <span className="text-[10px] px-2 py-0.2 rounded-full border border-green-500/40 bg-green-500/10 text-green-400 font-semibold shrink-0">
                            CURRENT
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-(--color-text-muted) truncate mt-0.5">
                        {exp.company} · <span className="opacity-80">{exp.period}</span>
                      </p>
                    </div>
                    <span className="text-xs text-teal-300 shrink-0 group-hover:translate-x-0.5 transition-transform">
                      Edit →
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </GlassCard>

          {/* Innovations & Certifications Preview */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Quick Innovations */}
            <GlassCard noAnimatedBorder className="p-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <TbBulb size={18} className="text-purple-300" />
                    <h3 className="font-heading text-sm font-bold text-(--color-text)">
                      Inovasi & Riset
                    </h3>
                  </div>
                  <span className="text-xs font-bold text-purple-300">
                    {innovations.length}
                  </span>
                </div>
                <p className="text-xs text-(--color-text-muted) line-clamp-2 mb-3">
                  Kelola publikasi jurnal, karya ber-HKI, dan inovasi kompetisi.
                </p>
              </div>
              <Link
                href="/admin/innovations"
                className="text-xs font-semibold text-purple-300 hover:underline flex items-center gap-1"
              >
                Buka Inovasi <TbArrowRight size={12} />
              </Link>
            </GlassCard>

            {/* Quick Certifications */}
            <GlassCard noAnimatedBorder className="p-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <TbCertificate size={18} className="text-accent-pink" />
                    <h3 className="font-heading text-sm font-bold text-(--color-text)">
                      Sertifikasi
                    </h3>
                  </div>
                  <span className="text-xs font-bold text-accent-pink">
                    {certifications.length}
                  </span>
                </div>
                <p className="text-xs text-(--color-text-muted) line-clamp-2 mb-3">
                  Kelola lisensi BNSP, Google, EF SET, dan kredensial profesional.
                </p>
              </div>
              <Link
                href="/admin/certifications"
                className="text-xs font-semibold text-accent-pink hover:underline flex items-center gap-1"
              >
                Buka Sertifikasi <TbArrowRight size={12} />
              </Link>
            </GlassCard>
          </div>
        </div>

        {/* ── RIGHT COLUMN: Quick Actions & System Info (5 cols) ─── */}
        <div className="lg:col-span-5 space-y-6">
          {/* Quick Action Center Card */}
          <GlassCard noAnimatedBorder className="p-6">
            <div className="flex items-center gap-2 pb-4 mb-4 border-b border-(--glass-border)">
              <TbSparkles size={18} className="text-accent-gold" />
              <h2 className="font-heading text-sm font-bold text-(--color-text) uppercase tracking-widest">
                Aksi Cepat (Quick Create)
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Add Project */}
              <Link
                href="/admin/projects/new"
                className="group p-4 rounded-xl border border-accent-gold/40 bg-accent-gold/10 hover:bg-accent-gold/20 hover:border-accent-gold/70 transition-all flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-2">
                  <TbFolderCode size={20} className="text-accent-gold" />
                  <TbPlus size={16} className="text-accent-gold group-hover:scale-125 transition-transform" />
                </div>
                <div>
                  <p className="font-heading text-sm font-bold text-(--color-text) leading-tight">
                    + Project Baru
                  </p>
                  <p className="text-[11px] text-(--color-text-muted) mt-1">
                    Upload portofolio web/mobile
                  </p>
                </div>
              </Link>

              {/* Add Certification */}
              <Link
                href="/admin/certifications/new"
                className="group p-4 rounded-xl border border-accent-pink/40 bg-accent-pink/10 hover:bg-accent-pink/20 hover:border-accent-pink/70 transition-all flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-2">
                  <TbCertificate size={20} className="text-accent-pink" />
                  <TbPlus size={16} className="text-accent-pink group-hover:scale-125 transition-transform" />
                </div>
                <div>
                  <p className="font-heading text-sm font-bold text-(--color-text) leading-tight">
                    + Certification Baru
                  </p>
                  <p className="text-[11px] text-(--color-text-muted) mt-1">
                    Lisensi & kredensial
                  </p>
                </div>
              </Link>

              {/* Add Experience */}
              <Link
                href="/admin/experiences/new"
                className="group p-4 rounded-xl border border-teal-400/40 bg-teal-400/10 hover:bg-teal-400/20 hover:border-teal-400/70 transition-all flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-2">
                  <TbBriefcase size={20} className="text-teal-300" />
                  <TbPlus size={16} className="text-teal-300 group-hover:scale-125 transition-transform" />
                </div>
                <div>
                  <p className="font-heading text-sm font-bold text-(--color-text) leading-tight">
                    + Experience Baru
                  </p>
                  <p className="text-[11px] text-(--color-text-muted) mt-1">
                    Karir & riwayat studi
                  </p>
                </div>
              </Link>

              {/* Add Innovation */}
              <Link
                href="/admin/innovations/new"
                className="group p-4 rounded-xl border border-purple-400/40 bg-purple-400/10 hover:bg-purple-400/20 hover:border-purple-400/70 transition-all flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-2">
                  <TbBulb size={20} className="text-purple-300" />
                  <TbPlus size={16} className="text-purple-300 group-hover:scale-125 transition-transform" />
                </div>
                <div>
                  <p className="font-heading text-sm font-bold text-(--color-text) leading-tight">
                    + Innovation Baru
                  </p>
                  <p className="text-[11px] text-(--color-text-muted) mt-1">
                    Publikasi & karya HKI
                  </p>
                </div>
              </Link>
            </div>
          </GlassCard>

          {/* Section Inspector & Live Jump Links */}
          <GlassCard noAnimatedBorder className="p-6">
            <h2 className="font-heading text-xs font-bold text-(--color-text) uppercase tracking-widest mb-3">
              Live Section Shortcuts
            </h2>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {[
                { name: "Hero Section", href: "/#hero" },
                { name: "About Me", href: "/#about" },
                { name: "Skills & Tech", href: "/#skills" },
                { name: "Experience", href: "/#experience" },
                { name: "Projects", href: "/#projects" },
                { name: "Innovations", href: "/#innovations" },
                { name: "Certificates", href: "/#certifications" },
                { name: "Contact Form", href: "/#contact" },
              ].map((s) => (
                <Link
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between px-3 py-2 rounded-lg border border-(--glass-border) bg-(--color-glass) hover:bg-(--color-glass-hover) hover:text-accent-gold transition-colors"
                >
                  <span className="truncate">{s.name}</span>
                  <TbExternalLink size={12} className="opacity-60 shrink-0" />
                </Link>
              ))}
            </div>
          </GlassCard>

          {/* System & Architecture Info Card */}
          <GlassCard noAnimatedBorder className="p-5">
            <div className="flex items-center gap-2 mb-3">
              <TbCpu size={16} className="text-accent-gold" />
              <h3 className="font-heading text-xs font-bold text-(--color-text) uppercase tracking-widest">
                System & Architecture
              </h3>
            </div>
            <div className="space-y-2 text-xs text-(--color-text-muted)">
              <div className="flex items-center justify-between py-1 border-b border-(--glass-border)">
                <span className="flex items-center gap-1.5">
                  <TbDatabase size={13} className="text-green-400" /> Database Engine
                </span>
                <span className="text-(--color-text) font-semibold">PostgreSQL / Prisma</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-(--glass-border)">
                <span>Framework / Core</span>
                <span className="text-(--color-text) font-semibold">Next.js 16 + React 19</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-(--glass-border)">
                <span>Total Dynamic Items</span>
                <span className="text-accent-gold font-bold">{totalContentCount} Item</span>
              </div>
              <div className="flex items-center justify-between py-1">
                <span>Email Transporter</span>
                <span className="text-green-400 font-semibold flex items-center gap-1">
                  <TbCheck size={12} /> Resend API
                </span>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
