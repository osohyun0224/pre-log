"use client";

import GiscusComponent from "@giscus/react";
import { useTheme } from "@/components/common/ThemeProvider";

export default function Giscus() {
  const { theme } = useTheme();

  return (
    <div className="mt-16 pt-8 border-t border-border-light dark:border-border-dark">
      <GiscusComponent
        repo="sohyunoh/secret-blog"
        repoId=""
        category="General"
        categoryId=""
        mapping="pathname"
        strict="0"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme={theme === "dark" ? "dark" : "light"}
        lang="ko"
        loading="lazy"
      />
    </div>
  );
}
