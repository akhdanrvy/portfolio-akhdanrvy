import type { Metadata } from "next";
import { ProjectForm } from "../_components/ProjectForm";

export const metadata: Metadata = {
  title: "Admin — Tambah Project",
  robots: { index: false, follow: false },
};

export default function NewProjectPage() {
  return (
    <div className="p-6 md:p-8">
      <h1 className="font-heading text-2xl font-bold text-(--color-text) mb-6">
        Tambah Project
      </h1>
      <ProjectForm mode="create" />
    </div>
  );
}
