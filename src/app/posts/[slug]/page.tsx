import { notFound } from "next/navigation";
import { getAllPostSlugs, getPostBySlug } from "@/lib/posts";
import { formatDate } from "@/lib/utils";
import PostDetailClient from "./PostDetailClient";
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
      {/* Post Header */}
      <header className="max-w-content mx-auto mb-12">
        <span className="inline-block text-sm font-medium text-primary bg-primary/5 px-3 py-1 rounded-full mb-4">
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

      {/* Content + TOC */}
      <PostDetailClient content={post.content} />
    </article>
  );
}
