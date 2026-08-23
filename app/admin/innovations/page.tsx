import type { Metadata } from "next";
import Link from "next/link";
import { getInnovations } from "@/lib/data/innovations";
import { GlassCard } from "@/components/ui/GlassCard";
import { DeleteButton } from "../_components/DeleteButton";
import { deleteInnovation } from "./actions";

export const metadata: Metadata = {
  title: "Admin — Innovations",
  robots: { index: false, follow: false },
};

export default async function AdminInnovationsPage() {
  const innovations = await getInnovations();
  const isMaxReached = innovations.length >= 3;

  return (
    <div className="p-6 md:p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-(--color-text)">
            Innovations
          </h1>
          <p className="text-xs text-(--color-text-muted) mt-0.5">
            {innovations.length} / 3 inovasi terpakai
          </p>
        </div>
        {isMaxReached ? (
          <span
            title="Maksimal 3 inovasi tercapai"
            className="rounded-lg px-4 py-2 text-sm font-semibold bg-(--color-glass) border border-(--glass-border) text-(--color-text-muted) opacity-60 cursor-not-allowed"
          >
            Maksimal 3 Inovasi Tercapai
          </span>
        ) : (
          <Link
            href="/admin/innovations/new"
            className="rounded-lg px-4 py-2 text-sm font-semibold bg-accent-gold text-black hover:opacity-90 transition-opacity"
          >
            + Tambah Inovasi
          </Link>
        )}
      </div>

      {/* Table */}
      <GlassCard noPadding noAnimatedBorder>
        {innovations.length === 0 ? (
          <div className="p-8 text-center text-(--color-text-muted) text-sm">
            Belum ada data inovasi. Mulai dengan menambah inovasi baru.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-(--glass-border)">
                  <th className="text-left px-4 py-3 font-heading text-xs font-bold text-(--color-text-muted) uppercase tracking-widest">
                    Nama & Tahun
                  </th>
                  <th className="text-left px-4 py-3 font-heading text-xs font-bold text-(--color-text-muted) uppercase tracking-widest">
                    Tipe & Award
                  </th>
                  <th className="text-left px-4 py-3 font-heading text-xs font-bold text-(--color-text-muted) uppercase tracking-widest">
                    Links
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
                {innovations.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-(--glass-border) last:border-0 hover:bg-(--color-glass-hover) transition-colors"
                  >
                    <td className="px-4 py-3">
                      <p className="text-(--color-text) font-medium">{item.name}</p>
                      <p className="text-xs text-(--color-text-muted)">{item.year}</p>
                    </td>
                    <td className="px-4 py-3">
                      <div className="space-y-1">
                        <span className="inline-flex px-2 py-0.5 rounded text-xs bg-(--color-glass) border border-(--glass-border) text-(--color-text-muted)">
                          {item.type}
                        </span>
                        {item.award && (
                          <p className="text-xs text-accent-gold font-medium">
                            🏆 {item.award}
                          </p>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {item.liveUrl && (
                          <span className="px-1.5 py-0.5 rounded text-[11px] bg-(--color-glass) text-(--color-text-muted) border border-(--glass-border)">
                            Live
                          </span>
                        )}
                        {item.hkiUrl && (
                          <span className="px-1.5 py-0.5 rounded text-[11px] bg-accent-gold/10 text-accent-gold border border-accent-gold/30">
                            HKI
                          </span>
                        )}
                        {item.journalUrl && (
                          <span className="px-1.5 py-0.5 rounded text-[11px] bg-accent-pink/10 text-accent-pink border border-accent-pink/30">
                            Journal
                          </span>
                        )}
                        {!item.liveUrl && !item.hkiUrl && !item.journalUrl && (
                          <span className="text-(--color-text-muted) text-xs">—</span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center text-(--color-text-muted) font-medium">
                      {item.displayOrder}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-4">
                        <Link
                          href={`/admin/innovations/${item.id}/edit`}
                          className="text-sm text-(--color-text-muted) hover:text-accent-gold transition-colors"
                        >
                          Edit
                        </Link>
                        <DeleteButton
                          id={item.id}
                          label={item.name}
                          deleteAction={deleteInnovation}
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
