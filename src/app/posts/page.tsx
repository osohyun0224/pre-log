import { getAllPosts, getCategories } from "@/lib/posts";
import PostsClient from "./PostsClient";

export const metadata = {
  title: "Posts",
  description: "모든 글 목록을 확인하세요.",
};

export default function PostsPage() {
  const posts = getAllPosts();
  const categories = getCategories();

  return <PostsClient posts={posts} categories={categories} />;
}
