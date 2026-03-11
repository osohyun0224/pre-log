import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllActivitySlugs, getActivityBySlug } from "@/lib/activities";
import { formatDate } from "@/lib/utils";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllActivitySlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const activity = await getActivityBySlug(slug);
  if (!activity) return { title: "Not Found" };

  return {
    title: activity.title,
    description: activity.description,
    openGraph: {
      title: activity.title,
      description: activity.description,
      type: "article",
    },
  };
}

export default async function ActivityPage({ params }: Props) {
  const { slug } = await params;
  const activity = await getActivityBySlug(slug);

  if (!activity) {
    notFound();
  }

  return (
    <article className="container-layout py-16">
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
          About
        </Link>

        {/* Activity Header */}
        <header className="mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-text-primary-light dark:text-text-primary-dark leading-tight mb-4">
            {activity.title}
          </h1>
          <p className="text-lg text-text-secondary-light dark:text-text-secondary-dark mb-6">
            {activity.description}
          </p>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <time className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
              {formatDate(activity.date)}
            </time>
            {activity.category && (
              <span className="px-2.5 py-0.5 rounded-lg text-[13px] font-semibold leading-[160%] bg-[#e8f3ff] text-[#3182f6] dark:bg-[#1a2744] dark:text-[#4a9eff]">
                {activity.category}
              </span>
            )}
            {activity.link && (
              <a
                href={activity.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm text-primary hover:underline"
              >
                관련 링크
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

          {/* Thumbnails Gallery */}
          {activity.thumbnails && activity.thumbnails.length > 0 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {activity.thumbnails.map((src, i) => (
                <div
                  key={i}
                  className="shrink-0 rounded-xl overflow-hidden border border-border-light dark:border-border-dark"
                >
                  <img
                    src={src}
                    alt={`${activity.title} ${i + 1}`}
                    className="h-48 w-auto object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </header>

        {/* Content */}
        {/* Content */}
        <div
          className="prose dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: activity.content }}
        />
    </article>
  );
}
