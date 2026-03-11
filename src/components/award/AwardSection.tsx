"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { AwardMeta } from "@/lib/awards";

interface AwardSectionProps {
  awards: AwardMeta[];
}

const itemAnimation = {
  initial: { opacity: 0, y: 32 },
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

function TrophyIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20 17 22" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
  );
}

export default function AwardSection({ awards }: AwardSectionProps) {
  return (
    <section className="container-layout mt-20 mb-20">
      <motion.h2
        className="text-3xl font-bold text-text-primary-light dark:text-text-primary-dark mb-3"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Awards
      </motion.h2>
      <motion.p
        className="text-base text-text-secondary-light dark:text-text-secondary-dark max-w-xl leading-relaxed mb-10"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        수상 및 선정 내역입니다.
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {awards.map((award) => (
          <motion.div
            key={award.slug}
            initial={itemAnimation.initial}
            whileInView={itemAnimation.whileInView}
            viewport={itemAnimation.viewport}
          >
            <Link
              href={`/about/awards/${award.slug}`}
              className="group block rounded-2xl border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark overflow-hidden transition-shadow hover:shadow-lg"
            >
              {/* Thumbnail */}
              {award.thumbnails && award.thumbnails.length > 0 ? (
                <div className="relative w-full h-40 overflow-hidden">
                  <img
                    src={award.thumbnails[0]}
                    alt={award.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {/* Trophy overlay */}
                  <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 dark:bg-black/50 backdrop-blur-sm flex items-center justify-center">
                    <TrophyIcon className="w-4 h-4 text-amber-500" />
                  </div>
                </div>
              ) : (
                <div className="relative w-full h-40 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 flex items-center justify-center">
                  <TrophyIcon className="w-10 h-10 text-amber-400 dark:text-amber-500" />
                </div>
              )}

              {/* Content */}
              <div className="p-5">
                {/* Top row: Logo + Rank */}
                <div className="flex items-center gap-2.5 mb-3">
                  <div
                    className={`shrink-0 w-8 h-8 rounded-lg overflow-hidden ${award.logoBg ?? "bg-surface-light dark:bg-surface-dark"} flex items-center justify-center shadow-sm`}
                  >
                    {award.logo ? (
                      <img
                        src={award.logo}
                        alt={`${award.organization} logo`}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <TrophyIcon className="w-4 h-4 text-amber-500" />
                    )}
                  </div>
                  {award.rank && (
                    <span className="px-2 py-0.5 rounded-md text-xs font-semibold bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
                      {award.rank}
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 className="text-[15px] font-bold text-text-primary-light dark:text-text-primary-dark leading-snug mb-2 group-hover:text-primary transition-colors">
                  {award.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark leading-relaxed mb-4 line-clamp-2">
                  {award.description}
                </p>

                {/* Bottom: Organization + Date */}
                <div className="flex items-center justify-between pt-3 border-t border-border-light dark:border-border-dark">
                  <span className="text-xs font-medium text-text-secondary-light dark:text-text-secondary-dark">
                    {award.organization}
                  </span>
                  <span className="text-xs text-text-secondary-light dark:text-text-secondary-dark tabular-nums">
                    {new Date(award.date).toLocaleDateString("ko-KR", {
                      year: "numeric",
                      month: "2-digit",
                    })}
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
