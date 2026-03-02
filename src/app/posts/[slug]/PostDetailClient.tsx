"use client";

import TableOfContents from "@/components/post/TableOfContents";
import Giscus from "@/components/comment/Giscus";

export default function PostDetailClient({ content }: { content: string }) {
  return (
    <div className="flex gap-12 justify-center">
      <div className="max-w-content w-full">
        <div
          className="prose dark:prose-dark"
          dangerouslySetInnerHTML={{ __html: content }}
        />
        <Giscus />
      </div>
      <TableOfContents content={content} />
    </div>
  );
}
