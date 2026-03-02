import Link from "next/link";
import type { PostMeta } from "@/lib/posts";
import { formatDate } from "@/lib/utils";

export default function PostCard({ post }: { post: PostMeta }) {
  return (
    <Link href={`/posts/${post.slug}`} className="group block">
      <article className="h-full rounded-2xl border border-border-light dark:border-border-dark overflow-hidden bg-bg-light dark:bg-bg-dark hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
        {post.thumbnail && (
          <div className="aspect-[16/9] overflow-hidden bg-surface-light dark:bg-surface-dark">
            <img
              src={post.thumbnail}
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}
        <div className="p-6">
          <span className="inline-block text-xs font-medium text-primary bg-primary/5 px-2.5 py-1 rounded-full mb-3">
            {post.category}
          </span>
          <h3 className="text-lg font-bold text-text-primary-light dark:text-text-primary-dark group-hover:text-primary transition-colors line-clamp-2 mb-2">
            {post.title}
          </h3>
          <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark line-clamp-2 mb-4">
            {post.summary}
          </p>
          <div className="flex items-center gap-2 text-xs text-text-secondary-light dark:text-text-secondary-dark">
            <time>{formatDate(post.date)}</time>
            <span>·</span>
            <span>{post.readingTime}</span>
          </div>
        </div>
      </article>
    </Link>
  );
}
