import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllProjectSlugs, getProjectBySlug } from "@/lib/projects";
import { formatDate } from "@/lib/utils";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return { title: "Not Found" };

  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      type: "article",
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <article className="container-layout py-16">
      <div className="max-w-content mx-auto">
        {/* Back Link */}
        <Link
          href="/about"
          className="inline-flex items-center text-sm text-text-secondary-light dark:text-text-secondary-dark hover:text-primary transition-colors mb-8"
        >
          <svg
            className="mr-1 w-4 h-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          모든 프로젝트
        </Link>

        {/* Project Header */}
        <header className="mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-text-primary-light dark:text-text-primary-dark leading-tight mb-4">
            {project.title}
          </h1>
          <p className="text-lg text-text-secondary-light dark:text-text-secondary-dark mb-6">
            {project.description}
          </p>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <time className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
              {formatDate(project.date)}
            </time>
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm text-primary hover:underline"
              >
                GitHub
                <svg
                  className="ml-1 w-3.5 h-3.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm text-primary hover:underline"
              >
                Live Demo
                <svg
                  className="ml-1 w-3.5 h-3.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </a>
            )}
          </div>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-lg text-[13px] font-semibold leading-[160%] border-none cursor-default pointer-events-none bg-[#e8f3ff] text-[#3182f6] dark:bg-[#1a2744] dark:text-[#4a9eff]"
              >
                {tech}
              </span>
            ))}
          </div>
        </header>

        {/* Content - sanitized through rehype pipeline */}
        <div
          className="prose dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: project.content }}
        />
      </div>
    </article>
  );
}
