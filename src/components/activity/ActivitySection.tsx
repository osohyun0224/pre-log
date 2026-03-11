"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { ActivityMeta } from "@/lib/activities";

interface ActivitySectionProps {
  activities: ActivityMeta[];
}

const itemAnimation = {
  initial: { opacity: 0, y: 24 },
  whileInView: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 150,
      damping: 22,
    },
  },
  viewport: { once: true, margin: "-50px" },
};

export default function ActivitySection({
  activities,
}: ActivitySectionProps) {
  // Group by year
  const byYear: Record<number, ActivityMeta[]> = {};
  for (const activity of activities) {
    if (!byYear[activity.year]) {
      byYear[activity.year] = [];
    }
    byYear[activity.year].push(activity);
  }

  // Sort years descending (2026 -> 2025 -> 2024, newest first)
  const sortedYears = Object.keys(byYear)
    .map(Number)
    .sort((a, b) => b - a);

  // Sort activities within each year by date descending
  for (const year of sortedYears) {
    byYear[year].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }

  // Flatten into items with year labels for first item of each year
  const timelineItems: {
    activity: ActivityMeta;
    showYear: boolean;
    year: number;
  }[] = [];

  for (const year of sortedYears) {
    byYear[year].forEach((activity, index) => {
      timelineItems.push({
        activity,
        showYear: index === 0,
        year,
      });
    });
  }

  return (
    <section className="container-layout mt-20 mb-20">
      <motion.h2
        className="text-3xl font-bold text-text-primary-light dark:text-text-primary-dark mb-3"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Activities
      </motion.h2>
      <motion.p
        className="text-base text-text-secondary-light dark:text-text-secondary-dark max-w-xl leading-relaxed mb-10"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        외부 활동 내역입니다. 클릭하면 상세 내용을 확인할 수 있습니다.
      </motion.p>

      <div className="relative pl-[72px]">
        {/* Timeline Line */}
        <div className="absolute left-[91px] top-2 bottom-2 w-px bg-border-light dark:bg-border-dark" />

        {/* Activity Items */}
        <div className="space-y-14">
          {timelineItems.map(({ activity, showYear, year }) => (
            <motion.div
              key={activity.slug}
              className="relative flex gap-5"
              initial={itemAnimation.initial}
              whileInView={itemAnimation.whileInView}
              viewport={itemAnimation.viewport}
            >
              {/* Year Label - vertically centered with the 40px circle */}
              <div className="absolute -left-[72px] top-0 h-10 w-[52px] flex items-center justify-end">
                {showYear && (
                  <span className="text-sm font-bold text-text-secondary-light dark:text-text-secondary-dark tabular-nums">
                    {year}
                  </span>
                )}
              </div>

              {/* Logo Circle */}
              <div
                className={`relative z-10 shrink-0 w-10 h-10 rounded-full overflow-hidden ${activity.logoBg ?? "bg-surface-light dark:bg-surface-dark"} flex items-center justify-center shadow-sm ring-4 ring-bg-light dark:ring-bg-dark`}
              >
                {activity.logo ? (
                  <img
                    src={activity.logo}
                    alt={`${activity.title} logo`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-3 h-3 rounded-full bg-primary" />
                )}
              </div>

              {/* Content */}
              <Link
                href={`/about/activities/${activity.slug}`}
                className="group flex-1"
              >
                {/* Title + Category */}
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-text-primary-light dark:text-text-primary-dark group-hover:text-primary transition-colors">
                    {activity.title}
                  </h3>
                  {activity.category && (
                    <span className="shrink-0 px-2 py-0.5 rounded-md text-xs font-medium bg-surface-light dark:bg-surface-dark text-text-secondary-light dark:text-text-secondary-dark">
                      {activity.category}
                    </span>
                  )}
                  <svg
                    className="shrink-0 w-3.5 h-3.5 text-text-secondary-light dark:text-text-secondary-dark opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-label="상세보기"
                  >
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </div>

                {/* Date */}
                <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark mt-0.5 tabular-nums">
                  {new Date(activity.date).toLocaleDateString("ko-KR", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  })}
                </p>

                {/* Description */}
                <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark leading-relaxed mt-3">
                  {activity.description}
                </p>

                {/* Thumbnails - below description, horizontal scroll */}
                {activity.thumbnails && activity.thumbnails.length > 0 && (
                  <div className="flex gap-2 mt-4 overflow-x-auto">
                    {activity.thumbnails.map((src, i) => (
                      <div
                        key={i}
                        className="shrink-0 w-44 h-28 rounded-lg overflow-hidden border border-border-light dark:border-border-dark"
                      >
                        <img
                          src={src}
                          alt={`${activity.title} ${i + 1}`}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
