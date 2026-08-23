import type { Metadata } from "next";
import Link from "next/link";
import { getInnovations } from "@/lib/data/innovations";
import { InnovationForm } from "../_components/InnovationForm";
import { GlassCard } from "@/components/ui/GlassCard";

export const metadata: Metadata = {
  title: "Admin — Tambah Inovasi",
  robots: { index: false, follow: false },
};

export default async function NewInnovationPage() {
  const innovations = await getInnovations();

  if (innovations.length >= 3) {
    return (
      <div className="p-6 md:p-8 max-w-xl">
        <GlassCard noAnimatedBorder className="space-y-4">
          <h1 className="font-heading text-xl font-bold text-accent-pink">
            Batas Maksimal Tercapai
          </h1>
          <p className="text-sm text-(--color-text-muted) leading-relaxed">
            Anda sudah memiliki 3 inovasi (1 baris x 3 kartu di landing page). Untuk menambahkan inovasi baru, silakan hapus atau edit inovasi yang sudah ada.
          </p>
          <Link
            href="/admin/innovations"
            className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold bg-accent-gold text-black hover:opacity-90 transition-opacity"
          >
            ← Kembali ke Daftar Inovasi
          </Link>
        </GlassCard>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8">
      <h1 className="font-heading text-2xl font-bold text-(--color-text) mb-1">
        Tambah Inovasi Baru
      </h1>
      <p className="text-sm text-(--color-text-muted) mb-6">
        Tambahkan karya riset, HKI, publikasi jurnal, atau produk inovasi (Maksimal 3 inovasi).
      </p>
      <InnovationForm mode="create" totalCount={innovations.length} />
    </div>
  );
}
