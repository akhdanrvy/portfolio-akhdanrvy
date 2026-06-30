import { getProjects } from "@/lib/data/projects";
import { getCertifications } from "@/lib/data/certifications";
import HomeClient from "./_components/HomeClient";
import type { ProjectView } from "@/components/ProjectsSection";
import type { CertificationView } from "@/components/CertificationSection";

export const revalidate = 60;

export default async function Home() {
  const [rawProjects, rawCerts] = await Promise.all([
    getProjects(),
    getCertifications(),
  ]);

  const projects: ProjectView[] = rawProjects.map(
    ({ createdAt, updatedAt: _u, ...rest }) => ({
      ...rest,
      year: createdAt.getFullYear().toString(),
    })
  );

  const certifications: CertificationView[] = rawCerts.map(
    ({ createdAt: _c, updatedAt: _u, issueDate, expiryDate, ...rest }) => ({
      ...rest,
      issueDate: issueDate.toISOString(),
      expiryDate: expiryDate?.toISOString() ?? null,
    })
  );

  return <HomeClient projects={projects} certifications={certifications} />;
}
