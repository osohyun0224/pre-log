"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import type { ProjectMeta } from "@/lib/projects";

interface ProjectCarouselProps {
  projects: ProjectMeta[];
}

const CARD_WIDTH = 340;
const CARD_GAP = 24;

export default function ProjectCarousel({ projects }: ProjectCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isScrollingRef = useRef(false);

  // Calculate padding so first and last cards can be centered
  const [sidePadding, setSidePadding] = useState(0);

  useEffect(() => {
    const updatePadding = () => {
      if (scrollRef.current) {
        const containerWidth = scrollRef.current.offsetWidth;
        setSidePadding((containerWidth - CARD_WIDTH) / 2);
      }
    };
    updatePadding();
    window.addEventListener("resize", updatePadding);
    return () => window.removeEventListener("resize", updatePadding);
  }, []);

  // Track scroll position to determine active card
  const handleScroll = useCallback(() => {
    if (!scrollRef.current || isScrollingRef.current) return;
    const scrollLeft = scrollRef.current.scrollLeft;
    const index = Math.round(scrollLeft / (CARD_WIDTH + CARD_GAP));
    const clamped = Math.max(0, Math.min(projects.length - 1, index));
    setActiveIndex(clamped);
  }, [projects.length]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const scrollToIndex = useCallback(
    (index: number) => {
      if (!scrollRef.current) return;
      const clamped = Math.max(0, Math.min(projects.length - 1, index));
      isScrollingRef.current = true;
      setActiveIndex(clamped);
      scrollRef.current.scrollTo({
        left: clamped * (CARD_WIDTH + CARD_GAP),
        behavior: "smooth",
      });
      // Reset flag after scroll animation
      setTimeout(() => {
        isScrollingRef.current = false;
      }, 500);
    },
    [projects.length]
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      scrollToIndex(activeIndex - 1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      scrollToIndex(activeIndex + 1);
    }
  };

  return (
    <div
      className="relative w-full"
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-label="프로젝트 캐러셀"
      aria-roledescription="carousel"
    >
      {/* Scrollable Track */}
      <div
        ref={scrollRef}
        className="flex overflow-x-auto py-8 scroll-smooth hide-scrollbar"
        style={{
          scrollSnapType: "x mandatory",
          gap: CARD_GAP,
          paddingLeft: sidePadding,
          paddingRight: sidePadding,
        }}
      >
        {projects.map((project, index) => {
          const isActive = index === activeIndex;
          return (
            <motion.div
              key={project.slug}
              className="shrink-0"
              style={{
                width: CARD_WIDTH,
                scrollSnapAlign: "center",
              }}
              animate={{
                scale: isActive ? 1 : 0.88,
                opacity: isActive ? 1 : 0.5,
              }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 25,
              }}
            >
              <Link
                href={`/about/${project.slug}`}
                className="block group"
                onClick={(e) => {
                  if (!isActive) {
                    e.preventDefault();
                    scrollToIndex(index);
                  }
                }}
              >
                <motion.div
                  className="rounded-2xl overflow-hidden bg-surface-light dark:bg-surface-dark shadow-lg"
                  whileHover={isActive ? { y: -6 } : {}}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <div className="w-full aspect-[4/3] overflow-hidden">
                    <img
                      src={
                        project.thumbnail ||
                        `https://picsum.photos/seed/fallback${index}/800/600`
                      }
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      draggable={false}
                    />
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* Project Info */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeIndex}
          className="text-center mt-2"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ type: "spring", stiffness: 200, damping: 25 }}
        >
          <Link
            href={`/about/${projects[activeIndex].slug}`}
            className="group"
          >
            <h3 className="text-xl md:text-2xl font-bold text-text-primary-light dark:text-text-primary-dark group-hover:text-primary transition-colors">
              {projects[activeIndex].title}
            </h3>
            <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark mt-1">
              {projects[activeIndex].description}
              {projects[activeIndex].company && (
                <>
                  <span className="mx-1.5">·</span>
                  <span>{projects[activeIndex].company}</span>
                </>
              )}
            </p>
          </Link>
          <motion.div
            className="flex flex-wrap justify-center gap-2 mt-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            {projects[activeIndex].techStack.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-0.5 rounded-lg text-xs font-medium bg-surface-light dark:bg-surface-dark text-text-secondary-light dark:text-text-secondary-dark"
              >
                {tech}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Dot Indicators */}
      <div className="flex justify-center gap-2 mt-6">
        {projects.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToIndex(index)}
            className="group p-1"
            aria-label={`프로젝트 ${index + 1}`}
          >
            <motion.div
              className="rounded-full bg-border-light dark:bg-border-dark"
              animate={{
                width: index === activeIndex ? 24 : 8,
                height: 8,
                backgroundColor:
                  index === activeIndex ? "var(--color-primary)" : undefined,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
