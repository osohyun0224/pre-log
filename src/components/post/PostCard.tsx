import Link from "next/link";
import type { PostMeta } from "@/lib/posts";

export default function PostCard({ post }: { post: PostMeta }) {
  return (
    <Link href={`/posts/${post.slug}`} className="group block">
      <article className="flex items-start gap-8 py-10">
        {/* Text Content */}
        <div className="flex-1 min-w-0">
          <span className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-lg text-[13px] font-semibold leading-[160%] border-none cursor-default pointer-events-none mb-4 bg-[#e8f3ff] text-[#3182f6] dark:bg-[#1a2744] dark:text-[#4a9eff]">
            {post.category}
          </span>
          <h3 className="text-xl md:text-2xl font-bold text-text-primary-light dark:text-text-primary-dark group-hover:text-primary transition-colors line-clamp-2 mb-3">
            {post.title}
          </h3>
          <p className="text-base text-text-secondary-light dark:text-text-secondary-dark line-clamp-2 leading-relaxed">
            {post.summary}
          </p>
        </div>

        {/* Thumbnail */}
        {post.thumbnail && (
          <div className="shrink-0 w-40 h-28 md:w-52 md:h-36 rounded-2xl overflow-hidden bg-surface-light dark:bg-surface-dark">
            <img
              src={post.thumbnail}
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}
      </article>
    </Link>
  );
}
