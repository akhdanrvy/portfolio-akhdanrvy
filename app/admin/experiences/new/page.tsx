import type { Metadata } from "next";
import { getExperiences } from "@/lib/data/experiences";
import { ExperienceForm } from "../_components/ExperienceForm";

export const metadata: Metadata = {
  title: "Admin — Tambah Experience",
  robots: { index: false, follow: false },
};

export default async function NewExperiencePage() {
  const experiences = await getExperiences();

  return (
    <div className="p-6 md:p-8">
      <h1 className="font-heading text-2xl font-bold text-(--color-text) mb-1">
        Tambah Experience Baru
      </h1>
      <p className="text-sm text-(--color-text-muted) mb-6">
        Tambahkan riwayat karir, magang, studi independen, atau pendidikan baru.
      </p>
      <ExperienceForm mode="create" totalCount={experiences.length} />
    </div>
  );
}
