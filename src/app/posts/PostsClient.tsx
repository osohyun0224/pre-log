"use client";

import { useState, useMemo } from "react";
import PostList from "@/components/post/PostList";
import CategoryTabs from "@/components/common/CategoryTabs";
import type { PostMeta } from "@/lib/posts";

interface PostsClientProps {
  posts: PostMeta[];
  categories: string[];
}

export default function PostsClient({ posts, categories }: PostsClientProps) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = useMemo(() => {
    let result = posts;
    if (activeCategory !== "All") {
      result = result.filter((post) => post.category === activeCategory);
    }
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (post) =>
          post.title.toLowerCase().includes(query) ||
          post.summary.toLowerCase().includes(query)
      );
    }
    return result;
  }, [posts, activeCategory, searchQuery]);

  return (
    <div className="container-layout py-16">
      <h1 className="text-3xl font-bold text-text-primary-light dark:text-text-primary-dark mb-8">
        Posts
      </h1>

      <div className="mb-6">
        <CategoryTabs
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />
      </div>

      <div className="mb-8">
        <input
          type="text"
          placeholder="검색어를 입력하세요..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full max-w-md px-4 py-3 rounded-xl border border-border-light dark:border-border-dark bg-bg-light dark:bg-bg-dark text-text-primary-light dark:text-text-primary-dark placeholder:text-text-secondary-light dark:placeholder:text-text-secondary-dark focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
        />
      </div>

      <PostList posts={filteredPosts} />
    </div>
  );
}
