import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllAwardSlugs, getAwardBySlug } from "@/lib/awards";
import { formatDate } from "@/lib/utils";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllAwardSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const award = await getAwardBySlug(slug);
  if (!award) return { title: "Not Found" };

  return {
    title: award.title,
    description: award.description,
    openGraph: {
      title: award.title,
      description: award.description,
      type: "article",
    },
  };
}

export default async function AwardPage({ params }: Props) {
  const { slug } = await params;
  const award = await getAwardBySlug(slug);

  if (!award) {
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

        {/* Award Header */}
        <header className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            {award.rank && (
              <span className="px-2.5 py-0.5 rounded-lg text-[13px] font-semibold leading-[160%] bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
                {award.rank}
              </span>
            )}
            <span className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
              {award.organization}
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-text-primary-light dark:text-text-primary-dark leading-tight mb-4">
            {award.title}
          </h1>
          <p className="text-lg text-text-secondary-light dark:text-text-secondary-dark mb-6">
            {award.description}
          </p>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <time className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
              {formatDate(award.date)}
            </time>
            {award.link && (
              <a
                href={award.link}
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
          {award.thumbnails && award.thumbnails.length > 0 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {award.thumbnails.map((src, i) => (
                <div
                  key={i}
                  className="shrink-0 rounded-xl overflow-hidden border border-border-light dark:border-border-dark"
                >
                  <img
                    src={src}
                    alt={`${award.title} ${i + 1}`}
                    className="h-48 w-auto object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </header>

        {/* Content */}
        <div
          className="prose dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: award.content }}
        />
    </article>
  );
}
