import Link from "next/link";
import type { ProjectMeta } from "@/lib/projects";

export default function ProjectCard({ project }: { project: ProjectMeta }) {
  return (
    <Link href={`/about/${project.slug}`} className="group block">
      <article className="rounded-2xl border border-border-light dark:border-border-dark overflow-hidden transition-shadow hover:shadow-lg">
        {/* Thumbnail */}
        {project.thumbnail && (
          <div className="w-full h-48 overflow-hidden bg-surface-light dark:bg-surface-dark">
            <img
              src={project.thumbnail}
              alt={project.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}

        {/* Content */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-text-primary-light dark:text-text-primary-dark group-hover:text-primary transition-colors mb-2">
            {project.title}
          </h3>
          <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark line-clamp-2 leading-relaxed mb-4">
            {project.description}
          </p>

          {/* Tech Stack Tags */}
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-0.5 rounded-lg text-xs font-medium bg-surface-light dark:bg-surface-dark text-text-secondary-light dark:text-text-secondary-dark"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </article>
    </Link>
  );
}
