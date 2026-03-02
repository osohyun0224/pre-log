"use client";

import TableOfContents from "@/components/post/TableOfContents";
import Giscus from "@/components/comment/Giscus";

export default function PostDetailClient({ content }: { content: string }) {
  return (
    <>
      <div
        className="prose dark:prose-invert"
        dangerouslySetInnerHTML={{ __html: content }}
      />
      <Giscus />
    </>
  );
}

export function PostTOC({ content }: { content: string }) {
  return <TableOfContents content={content} />;
}
