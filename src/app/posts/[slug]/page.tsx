import { notFound } from "next/navigation";
import { getAllPostSlugs, getPostBySlug } from "@/lib/posts";
import { formatDate } from "@/lib/utils";
import PostDetailClient, { PostTOC } from "./PostDetailClient";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Not Found" };

  return {
    title: post.title,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      type: "article",
      publishedTime: post.date,
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="container-layout py-16">
      <div className="flex gap-12 justify-center">
        <div className="max-w-content w-full">
          {/* Post Header */}
          <header className="mb-12">
            <span className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-lg text-[13px] font-semibold leading-[160%] border-none cursor-default pointer-events-none mb-4 bg-[#e8f3ff] text-[#3182f6] dark:bg-[#1a2744] dark:text-[#4a9eff]">
              {post.category}
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-text-primary-light dark:text-text-primary-dark leading-tight mb-4">
              {post.title}
            </h1>
            <div className="flex items-center gap-3 text-sm text-text-secondary-light dark:text-text-secondary-dark">
              <time>{formatDate(post.date)}</time>
              <span>·</span>
              <span>{post.readingTime}</span>
            </div>
          </header>

          {/* Content + Comments */}
          <PostDetailClient content={post.content} />
        </div>

        {/* Table of Contents */}
        <PostTOC content={post.content} />
      </div>
    </article>
  );
}
