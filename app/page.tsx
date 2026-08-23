import { getProjects } from "@/lib/data/projects";
import { getCertifications } from "@/lib/data/certifications";
import { getExperiences } from "@/lib/data/experiences";
import { getInnovations } from "@/lib/data/innovations";
import HomeClient from "./_components/HomeClient";
import type { ProjectView } from "@/components/ProjectsSection";
import type { CertificationView } from "@/components/CertificationSection";
import type { ExperienceView } from "@/components/ExperienceSection";
import type { InnovationView } from "@/components/InnovationSection";

export const revalidate = 60;

export default async function Home() {
  const [rawProjects, rawCerts, rawExperiences, rawInnovations] = await Promise.all([
    getProjects(),
    getCertifications(),
    getExperiences(),
    getInnovations(),
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

  const experiences: ExperienceView[] = rawExperiences.map(
    ({ createdAt: _c, updatedAt: _u, ...rest }) => rest
  );

  const innovations: InnovationView[] = rawInnovations.map(
    ({ createdAt: _c, updatedAt: _u, ...rest }) => rest
  );

  return (
    <HomeClient
      projects={projects}
      certifications={certifications}
      experiences={experiences}
      innovations={innovations}
    />
  );
}
