import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCertificationById } from "@/lib/data/certifications";
import { CertificationForm } from "../../_components/CertificationForm";

export const metadata: Metadata = {
  title: "Admin — Edit Certification",
  robots: { index: false, follow: false },
};

export default async function EditCertificationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const certification = await getCertificationById(id);

  if (!certification) notFound();

  return (
    <div className="p-6 md:p-8">
      <h1 className="font-heading text-2xl font-bold text-(--color-text) mb-1">
        Edit Certification
      </h1>
      <p className="text-sm text-(--color-text-muted) mb-6">{certification.name}</p>
      <CertificationForm mode="edit" initialData={certification} />
    </div>
  );
}
