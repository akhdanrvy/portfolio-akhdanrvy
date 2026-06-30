import type { Metadata } from "next";
import Link from "next/link";
import { getProjects } from "@/lib/data/projects";
import { GlassCard } from "@/components/ui/GlassCard";
import { DeleteButton } from "../_components/DeleteButton";
import { deleteProject } from "./actions";

export const metadata: Metadata = {
  title: "Admin — Projects",
  robots: { index: false, follow: false },
};

export default async function AdminProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="p-6 md:p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-2xl font-bold text-(--color-text)">
          Projects
        </h1>
        <Link
          href="/admin/projects/new"
          className="rounded-lg px-4 py-2 text-sm font-semibold bg-accent-gold text-black hover:opacity-90 transition-opacity"
        >
          + Tambah Project
        </Link>
      </div>

      {/* Table */}
      <GlassCard noPadding noAnimatedBorder>
        {projects.length === 0 ? (
          <div className="p-8 text-center text-(--color-text-muted) text-sm">
            Belum ada project. Mulai dengan menambah project baru.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-(--glass-border)">
                  <th className="text-left px-4 py-3 font-heading text-xs font-bold text-(--color-text-muted) uppercase tracking-widest">
                    Title
                  </th>
                  <th className="text-left px-4 py-3 font-heading text-xs font-bold text-(--color-text-muted) uppercase tracking-widest">
                    Badge
                  </th>
                  <th className="text-center px-4 py-3 font-heading text-xs font-bold text-(--color-text-muted) uppercase tracking-widest">
                    Featured
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
                {projects.map((project) => (
                  <tr
                    key={project.id}
                    className="border-b border-(--glass-border) last:border-0 hover:bg-(--color-glass-hover) transition-colors"
                  >
                    <td className="px-4 py-3 text-(--color-text) font-medium">
                      {project.title}
                    </td>
                    <td className="px-4 py-3 text-(--color-text-muted)">
                      {project.badgeLabel ? (
                        <span className="inline-flex px-2 py-0.5 rounded text-xs bg-accent-gold/10 text-accent-gold border border-accent-gold/30">
                          {project.badgeLabel}
                        </span>
                      ) : (
                        <span className="text-(--color-text-muted)">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {project.isFeatured ? (
                        <span className="text-accent-gold">★</span>
                      ) : (
                        <span className="text-(--color-text-muted)">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-center text-(--color-text-muted)">
                      {project.displayOrder}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-4">
                        <Link
                          href={`/admin/projects/${project.id}/edit`}
                          className="text-sm text-(--color-text-muted) hover:text-accent-gold transition-colors"
                        >
                          Edit
                        </Link>
                        <DeleteButton
                          id={project.id}
                          label={project.title}
                          deleteAction={deleteProject}
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
