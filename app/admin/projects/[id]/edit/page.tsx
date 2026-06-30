import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProjectById } from "@/lib/data/projects";
import { ProjectForm } from "../../_components/ProjectForm";

export const metadata: Metadata = {
  title: "Admin — Edit Project",
  robots: { index: false, follow: false },
};

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = await getProjectById(id);

  if (!project) notFound();

  return (
    <div className="p-6 md:p-8">
      <h1 className="font-heading text-2xl font-bold text-(--color-text) mb-1">
        Edit Project
      </h1>
      <p className="text-sm text-(--color-text-muted) mb-6">{project.title}</p>
      <ProjectForm mode="edit" initialData={project} />
    </div>
  );
}
