import type { Metadata } from "next";
import Link from "next/link";
import { getCertifications } from "@/lib/data/certifications";
import { GlassCard } from "@/components/ui/GlassCard";
import { DeleteButton } from "../_components/DeleteButton";
import { deleteCertification } from "./actions";

export const metadata: Metadata = {
  title: "Admin — Certifications",
  robots: { index: false, follow: false },
};

export default async function AdminCertificationsPage() {
  const certifications = await getCertifications();

  return (
    <div className="p-6 md:p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-2xl font-bold text-(--color-text)">
          Certifications
        </h1>
        <Link
          href="/admin/certifications/new"
          className="rounded-lg px-4 py-2 text-sm font-semibold bg-accent-gold text-black hover:opacity-90 transition-opacity"
        >
          + Tambah Certification
        </Link>
      </div>

      {/* Table */}
      <GlassCard noPadding noAnimatedBorder>
        {certifications.length === 0 ? (
          <div className="p-8 text-center text-(--color-text-muted) text-sm">
            Belum ada sertifikasi. Mulai dengan menambah sertifikasi baru.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-(--glass-border)">
                  <th className="text-left px-4 py-3 font-heading text-xs font-bold text-(--color-text-muted) uppercase tracking-widest">
                    Nama
                  </th>
                  <th className="text-left px-4 py-3 font-heading text-xs font-bold text-(--color-text-muted) uppercase tracking-widest">
                    Penerbit
                  </th>
                  <th className="text-left px-4 py-3 font-heading text-xs font-bold text-(--color-text-muted) uppercase tracking-widest">
                    Tanggal Terbit
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
                {certifications.map((cert) => (
                  <tr
                    key={cert.id}
                    className="border-b border-(--glass-border) last:border-0 hover:bg-(--color-glass-hover) transition-colors"
                  >
                    <td className="px-4 py-3 text-(--color-text) font-medium">
                      {cert.name}
                    </td>
                    <td className="px-4 py-3 text-(--color-text-muted)">
                      {cert.issuer}
                    </td>
                    <td className="px-4 py-3 text-(--color-text-muted)">
                      {cert.issueDate.toLocaleDateString("id-ID", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </td>
                    <td className="px-4 py-3 text-center text-(--color-text-muted)">
                      {cert.displayOrder}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-4">
                        <Link
                          href={`/admin/certifications/${cert.id}/edit`}
                          className="text-sm text-(--color-text-muted) hover:text-accent-gold transition-colors"
                        >
                          Edit
                        </Link>
                        <DeleteButton
                          id={cert.id}
                          label={cert.name}
                          deleteAction={deleteCertification}
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
