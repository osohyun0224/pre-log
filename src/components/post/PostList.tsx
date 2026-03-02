import type { PostMeta } from "@/lib/posts";
import PostCard from "./PostCard";

export default function PostList({ posts }: { posts: PostMeta[] }) {
  if (posts.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-text-secondary-light dark:text-text-secondary-dark">
          아직 작성된 글이 없습니다.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post) => (
        <PostCard key={post.slug} post={post} />
      ))}
    </div>
  );
}
