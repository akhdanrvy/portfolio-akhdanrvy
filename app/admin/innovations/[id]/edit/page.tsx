import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getInnovationById, getInnovations } from "@/lib/data/innovations";
import { InnovationForm } from "../../_components/InnovationForm";

export const metadata: Metadata = {
  title: "Admin — Edit Inovasi",
  robots: { index: false, follow: false },
};

export default async function EditInnovationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [innovation, allInnovations] = await Promise.all([
    getInnovationById(id),
    getInnovations(),
  ]);

  if (!innovation) notFound();

  return (
    <div className="p-6 md:p-8">
      <h1 className="font-heading text-2xl font-bold text-(--color-text) mb-1">
        Edit Inovasi
      </h1>
      <p className="text-sm text-(--color-text-muted) mb-6">
        {innovation.name} ({innovation.year})
      </p>
      <InnovationForm
        mode="edit"
        initialData={innovation}
        totalCount={allInnovations.length}
      />
    </div>
  );
}
