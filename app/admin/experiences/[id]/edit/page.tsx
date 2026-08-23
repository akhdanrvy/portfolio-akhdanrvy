import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getExperienceById, getExperiences } from "@/lib/data/experiences";
import { ExperienceForm } from "../../_components/ExperienceForm";

export const metadata: Metadata = {
  title: "Admin — Edit Experience",
  robots: { index: false, follow: false },
};

export default async function EditExperiencePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [experience, allExperiences] = await Promise.all([
    getExperienceById(id),
    getExperiences(),
  ]);

  if (!experience) notFound();

  return (
    <div className="p-6 md:p-8">
      <h1 className="font-heading text-2xl font-bold text-(--color-text) mb-1">
        Edit Experience
      </h1>
      <p className="text-sm text-(--color-text-muted) mb-6">
        {experience.role} at {experience.company}
      </p>
      <ExperienceForm
        mode="edit"
        initialData={experience}
        totalCount={allExperiences.length}
      />
    </div>
  );
}
