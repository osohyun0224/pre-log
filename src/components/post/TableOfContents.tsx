"use client";

import { useEffect, useState } from "react";

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

export default function TableOfContents({ content }: { content: string }) {
  const [headings, setHeadings] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const regex = /<h([2-3])\s+id="([^"]+)"[^>]*>(?:<a[^>]*>)?(.*?)(?:<\/a>)?<\/h\1>/g;
    const items: TOCItem[] = [];
    let match;

    while ((match = regex.exec(content)) !== null) {
      const text = match[3].replace(/<[^>]*>/g, "");
      items.push({
        id: match[2],
        text,
        level: parseInt(match[1]),
      });
    }

    setHeadings(items);
  }, [content]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-80px 0px -80% 0px" }
    );

    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav className="hidden xl:block sticky top-24 w-60 shrink-0 self-start">
      <h4 className="text-sm font-semibold text-text-primary-light dark:text-text-primary-dark mb-4">
        목차
      </h4>
      <ul className="space-y-2">
        {headings.map((heading) => (
          <li
            key={heading.id}
            style={{ paddingLeft: `${(heading.level - 2) * 16}px` }}
          >
            <a
              href={`#${heading.id}`}
              className={`block text-sm leading-relaxed transition-colors ${
                activeId === heading.id
                  ? "text-primary font-medium"
                  : "text-text-secondary-light dark:text-text-secondary-dark hover:text-text-primary-light dark:hover:text-text-primary-dark"
              }`}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
