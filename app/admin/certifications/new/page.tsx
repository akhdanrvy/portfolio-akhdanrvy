import type { Metadata } from "next";
import { CertificationForm } from "../_components/CertificationForm";

export const metadata: Metadata = {
  title: "Admin — Tambah Certification",
  robots: { index: false, follow: false },
};

export default function NewCertificationPage() {
  return (
    <div className="p-6 md:p-8">
      <h1 className="font-heading text-2xl font-bold text-(--color-text) mb-6">
        Tambah Certification
      </h1>
      <CertificationForm mode="create" />
    </div>
  );
}
