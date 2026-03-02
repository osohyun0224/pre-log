"use client";

import { useState, useMemo } from "react";
import PostList from "@/components/post/PostList";
import CategoryTabs from "@/components/common/CategoryTabs";
import type { PostMeta } from "@/lib/posts";

const categoryDescriptions: Record<string, string> = {
  All: "개발하며 배운 것들을 기록하고 공유합니다",
  Engineering: "개발하며 배운 기술과 문제 해결 과정을 기록합니다",
  Design: "디자인 시스템과 UI/UX에 대한 이야기를 나눕니다",
  Career: "개발자로서의 성장과 커리어에 대해 이야기합니다",
  Life: "일상 속 생각과 경험을 공유합니다",
};

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
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-text-primary-light dark:text-text-primary-dark mb-4">
          {activeCategory === "All" ? "Posts" : activeCategory}
        </h1>
        <p className="text-lg text-text-secondary-light dark:text-text-secondary-dark">
          {categoryDescriptions[activeCategory] ?? ""}
        </p>
      </div>

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
