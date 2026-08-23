import type { Metadata } from "next";
import Link from "next/link";
import { getExperiences } from "@/lib/data/experiences";
import { GlassCard } from "@/components/ui/GlassCard";
import { DeleteButton } from "../_components/DeleteButton";
import { deleteExperience } from "./actions";

export const metadata: Metadata = {
  title: "Admin — Experiences",
  robots: { index: false, follow: false },
};

const TYPE_STYLES: Record<string, string> = {
  "Full-time":         "text-(--color-accent-gold) border-(--color-accent-gold)/40 bg-(--color-accent-gold)/10",
  "Independent Study": "text-blue-300 border-blue-400/40 bg-blue-400/10",
  "Internship":        "text-teal-300 border-teal-400/40 bg-teal-400/10",
  "Education":         "text-purple-300 border-purple-400/40 bg-purple-400/10",
};

export default async function AdminExperiencesPage() {
  const experiences = await getExperiences();

  return (
    <div className="p-6 md:p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-2xl font-bold text-(--color-text)">
          Experiences
        </h1>
        <Link
          href="/admin/experiences/new"
          className="rounded-lg px-4 py-2 text-sm font-semibold bg-accent-gold text-black hover:opacity-90 transition-opacity"
        >
          + Tambah Experience
        </Link>
      </div>

      {/* Table */}
      <GlassCard noPadding noAnimatedBorder>
        {experiences.length === 0 ? (
          <div className="p-8 text-center text-(--color-text-muted) text-sm">
            Belum ada data pengalaman. Mulai dengan menambah pengalaman baru.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-(--glass-border)">
                  <th className="text-left px-4 py-3 font-heading text-xs font-bold text-(--color-text-muted) uppercase tracking-widest">
                    Role & Perusahaan
                  </th>
                  <th className="text-left px-4 py-3 font-heading text-xs font-bold text-(--color-text-muted) uppercase tracking-widest">
                    Tipe
                  </th>
                  <th className="text-left px-4 py-3 font-heading text-xs font-bold text-(--color-text-muted) uppercase tracking-widest">
                    Periode
                  </th>
                  <th className="text-center px-4 py-3 font-heading text-xs font-bold text-(--color-text-muted) uppercase tracking-widest">
                    Status
                  </th>
                  <th className="text-center px-4 py-3 font-heading text-xs font-bold text-(--color-text-muted) uppercase tracking-widest">
                    Order
                  </th>
                  <th className="text-right px-4 py-3 font-heading text-xs font-bold text-(--color-text-muted) uppercase tracking-widest">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {experiences.map((exp) => (
                  <tr
                    key={exp.id}
                    className="border-b border-(--glass-border) last:border-0 hover:bg-(--color-glass-hover) transition-colors"
                  >
                    <td className="px-4 py-3">
                      <p className="text-(--color-text) font-medium">{exp.role}</p>
                      <p className="text-xs text-(--color-text-muted)">{exp.company}</p>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex px-2 py-0.5 rounded-full text-xs border font-medium ${
                          TYPE_STYLES[exp.type] ?? "text-(--color-text-muted) border-(--glass-border)"
                        }`}
                      >
                        {exp.type}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-(--color-text-muted) text-xs whitespace-nowrap">
                      {exp.period}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {exp.current ? (
                        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs border border-green-400/50 bg-green-400/10 text-green-400 font-semibold">
                          <span className="relative flex h-1.5 w-1.5">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-60" />
                            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-green-400" />
                          </span>
                          CURRENT
                        </span>
                      ) : (
                        <span className="text-(--color-text-muted)">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-center text-(--color-text-muted)">
                      {exp.displayOrder}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-4">
                        <Link
                          href={`/admin/experiences/${exp.id}/edit`}
                          className="text-sm text-(--color-text-muted) hover:text-accent-gold transition-colors"
                        >
                          Edit
                        </Link>
                        <DeleteButton
                          id={exp.id}
                          label={`${exp.role} at ${exp.company}`}
                          deleteAction={deleteExperience}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </GlassCard>
    </div>
  );
}
