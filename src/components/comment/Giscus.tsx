"use client";

import GiscusComponent from "@giscus/react";
import { useTheme } from "@/components/common/ThemeProvider";

export default function Giscus() {
  const { theme } = useTheme();

  return (
    <div className="mt-16 pt-8 border-t border-border-light dark:border-border-dark">
      <GiscusComponent
        repo="osohyun0224/pre-log"
        repoId="R_kgDORcP5sg"
        category="Comments"
        categoryId="DIC_kwDORcP5ss4C3gxm"
        mapping="pathname"
        strict="0"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="bottom"
        theme={theme === "dark" ? "dark" : "light"}
        lang="ko"
        loading="lazy"
      />
    </div>
  );
}
