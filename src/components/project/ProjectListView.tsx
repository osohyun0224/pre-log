"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { ProjectMeta } from "@/lib/projects";

interface ProjectListViewProps {
  projects: ProjectMeta[];
}

export default function ProjectListView({ projects }: ProjectListViewProps) {
  return (
    <div className="container-layout grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project, index) => (
        <motion.div
          key={project.slug}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 25,
            delay: index * 0.05,
          }}
        >
          <Link href={`/about/${project.slug}`} className="group block">
            <article className="rounded-2xl border border-border-light dark:border-border-dark overflow-hidden transition-shadow hover:shadow-lg">
              {project.thumbnail && (
                <div className="w-full h-44 overflow-hidden bg-surface-light dark:bg-surface-dark">
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              <div className="p-5">
                <h3 className="text-lg font-bold text-text-primary-light dark:text-text-primary-dark group-hover:text-primary transition-colors mb-1.5">
                  {project.title}
                </h3>
                <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark line-clamp-2 leading-relaxed mb-3">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded-md text-xs font-medium bg-surface-light dark:bg-surface-dark text-text-secondary-light dark:text-text-secondary-dark"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
