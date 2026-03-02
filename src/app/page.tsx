import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import PostList from "@/components/post/PostList";

export default function HomePage() {
  const posts = getAllPosts();
  const latestPosts = posts.slice(0, 6);
  const featuredPost = posts[0];

  return (
    <div>
      {/* Hero Section */}
      <section className="border-b border-border-light dark:border-border-dark">
        <div className="container-layout py-20">
          {featuredPost ? (
            <Link href={`/posts/${featuredPost.slug}`} className="group block">
              <span className="inline-block text-sm font-medium text-primary mb-4">
                Latest Post
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-text-primary-light dark:text-text-primary-dark group-hover:text-primary transition-colors mb-4 leading-tight">
                {featuredPost.title}
              </h1>
              <p className="text-lg text-text-secondary-light dark:text-text-secondary-dark max-w-2xl mb-6">
                {featuredPost.summary}
              </p>
              <span className="inline-flex items-center text-sm text-primary font-medium group-hover:underline">
                읽어보기
                <svg
                  className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </span>
            </Link>
          ) : (
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-text-primary-light dark:text-text-primary-dark mb-4 leading-tight">
                garden
              </h1>
              <p className="text-lg text-text-secondary-light dark:text-text-secondary-dark max-w-2xl">
                개발하며 배운 것들을 기록합니다.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Recent Posts */}
      <section className="container-layout py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-text-primary-light dark:text-text-primary-dark">
            최근 글
          </h2>
          {posts.length > 6 && (
            <Link
              href="/posts"
              className="text-sm text-primary font-medium hover:underline"
            >
              전체보기
            </Link>
          )}
        </div>
        <PostList posts={latestPosts} />
      </section>
    </div>
  );
}
