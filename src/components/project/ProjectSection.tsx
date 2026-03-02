"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { ProjectMeta } from "@/lib/projects";
import ProjectCarousel from "./ProjectCarousel";
import ProjectListView from "./ProjectListView";

interface ProjectSectionProps {
  projects: ProjectMeta[];
}

export default function ProjectSection({ projects }: ProjectSectionProps) {
  const [viewMode, setViewMode] = useState<"carousel" | "list">("carousel");

  return (
    <div>
      {/* Header with View Toggle */}
      <div className="container-layout mb-10 flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-bold text-text-primary-light dark:text-text-primary-dark mb-3">
            Projects
          </h1>
          <p className="text-base text-text-secondary-light dark:text-text-secondary-dark max-w-xl leading-relaxed">
            제가 진행한 프로젝트들입니다. 카드를 클릭하면 상세 내용을 볼 수 있습니다.
          </p>
        </div>

        {/* View Toggle */}
        <div className="flex items-center gap-1 p-1 rounded-xl bg-surface-light dark:bg-surface-dark">
          <button
            onClick={() => setViewMode("carousel")}
            className={`p-2 rounded-lg transition-colors ${
              viewMode === "carousel"
                ? "bg-bg-light dark:bg-bg-dark text-text-primary-light dark:text-text-primary-dark shadow-sm"
                : "text-text-secondary-light dark:text-text-secondary-dark hover:text-text-primary-light dark:hover:text-text-primary-dark"
            }`}
            aria-label="캐러셀 보기"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="6" width="6" height="12" rx="1" />
              <rect x="9" y="4" width="6" height="16" rx="1" />
              <rect x="16" y="6" width="6" height="12" rx="1" />
            </svg>
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`p-2 rounded-lg transition-colors ${
              viewMode === "list"
                ? "bg-bg-light dark:bg-bg-dark text-text-primary-light dark:text-text-primary-dark shadow-sm"
                : "text-text-secondary-light dark:text-text-secondary-dark hover:text-text-primary-light dark:hover:text-text-primary-dark"
            }`}
            aria-label="목록 보기"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="7" height="7" rx="1" />
              <rect x="14" y="3" width="7" height="7" rx="1" />
              <rect x="3" y="14" width="7" height="7" rx="1" />
              <rect x="14" y="14" width="7" height="7" rx="1" />
            </svg>
          </button>
        </div>
      </div>

      {/* Content */}
      <motion.div
        key={viewMode}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 25 }}
      >
        {viewMode === "carousel" ? (
          <ProjectCarousel projects={projects} />
        ) : (
          <ProjectListView projects={projects} />
        )}
      </motion.div>
    </div>
  );
}
