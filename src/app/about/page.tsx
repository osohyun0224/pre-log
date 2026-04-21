import type { Metadata } from "next";
import { getAllProjects } from "@/lib/projects";
import { getAllActivities } from "@/lib/activities";
import { getAllAwards } from "@/lib/awards";
import ProjectSection from "@/components/project/ProjectSection";
import ActivitySection from "@/components/activity/ActivitySection";
import AwardSection from "@/components/award/AwardSection";
import WorkExperience from "@/components/about/WorkExperience";

export const metadata: Metadata = {
  title: "About",
  description: "포트폴리오 및 프로젝트 소개",
};

export default function AboutPage() {
  const projects = getAllProjects();
  const activities = getAllActivities();
  const awards = getAllAwards();

  return (
    <div className="py-16">
      {/* Work Experience */}
      <WorkExperience />

      {/* Projects */}
      {projects.length > 0 ? (
        <ProjectSection projects={projects} />
      ) : (
        <section className="container-layout">
          <h1 className="text-3xl font-bold text-text-primary-light dark:text-text-primary-dark mb-4">
            Projects
          </h1>
          <p className="text-text-secondary-light dark:text-text-secondary-dark">
            아직 등록된 프로젝트가 없습니다.
          </p>
        </section>
      )}

      /* {/* Activities */}
      {activities.length > 0 && <ActivitySection activities={activities} />}

      {/* Awards */}
      {awards.length > 0 && <AwardSection awards={awards} />} */
    </div>
  );
}
