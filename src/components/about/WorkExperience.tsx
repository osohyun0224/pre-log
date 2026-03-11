"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";

interface Experience {
  company: string;
  role: string;
  period: string;
  logo: string;
  logoBg: string;
  url?: string;
  tasks: ReactNode[];
}

function ServiceLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-primary hover:underline"
    >
      {children}
    </a>
  );
}

const experiences: Experience[] = [
  {
    company: "Viva Republica (Toss)",
    role: "Frontend Developer Assistant",
    period: "2025.06 - 2025.12",
    logo: "/images/logos/toss.png",
    logoBg: "bg-[#0064FF]",
    url: "https://toss.im",
    tasks: [
      "토스의 Brand Web Product Team에서 토스의 브랜드를 알리는 웹서비스들을 개발했습니다.",
      <>
        <ServiceLink href="https://toss.tech">토스테크</ServiceLink>,{" "}
        <ServiceLink href="https://toss.im/tossfeed">토스피드</ServiceLink>,{" "}
        <ServiceLink href="https://toss.im/impact">토스임팩트</ServiceLink>,{" "}
        <ServiceLink href="https://toss.im/impact/event">토스임팩트-이벤트</ServiceLink>,{" "}
        <ServiceLink href="https://toss.im/impact/bittersweetmarket">토스임팩트-비터스윗샵</ServiceLink>,{" "}
        <ServiceLink href="https://tossinsight.im">토스인사이트</ServiceLink>,{" "}
        <ServiceLink href="https://toss.im/facepass">페이스패스</ServiceLink>,{" "}
        <ServiceLink href="https://toss.im/apps-in-toss">앱인토스</ServiceLink>,{" "}
        <ServiceLink href="https://toss.im/guardians-25">토스 보안컨퍼런스 2025</ServiceLink>{" "}
        <ServiceLink href="https://toss.im/career/event/next-developer-2025">이벤트 채용(25 NEXT)</ServiceLink>{" "}
        등 다양한 웹서비스를 개발했습니다.
      </>,
    ],
  },
  {
    company: "Buzz&Beyond",
    role: "Software Engineer",
    period: "2024.01 - 2025.06",
    logo: "/images/logos/buzzbeyond.png",
    logoBg: "bg-white dark:bg-white",
    url: "https://vling.net/",
    tasks: [
      "사내 서비스 유튜브 마케팅 플랫폼 Vling의 풀 스택 개발을 담당했습니다.",
      "특히 사내에 디자인 시스템을 도입 및 운영하여 생산성을 향상시켰습니다.",
    ],
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 150,
      damping: 22,
    },
  },
};

export default function WorkExperience() {
  return (
    <section className="container-layout mb-20">
      <motion.h2
        className="text-3xl font-bold text-text-primary-light dark:text-text-primary-dark mb-3"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Work
      </motion.h2>
      <motion.p
        className="text-base text-text-secondary-light dark:text-text-secondary-dark max-w-xl leading-relaxed mb-10"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        저의 업무 경력입니다.
      </motion.p>

      <motion.div
        className="relative"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Timeline Line */}
        <div className="absolute left-[19px] top-2 bottom-2 w-px bg-border-light dark:bg-border-dark" />

        {/* Experience Items */}
        <div className="space-y-14">
          {experiences.map((exp) => (
            <motion.div
              key={exp.company}
              className="relative flex gap-5"
              variants={itemVariants}
            >
              {/* Logo */}
              <div
                className={`relative z-10 shrink-0 w-10 h-10 rounded-full overflow-hidden ${exp.logoBg} flex items-center justify-center shadow-sm ring-4 ring-bg-light dark:ring-bg-dark`}
              >
                <img
                  src={exp.logo}
                  alt={`${exp.company} logo`}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="flex-1">
                {/* Company Name + Link */}
                <div className="flex items-center gap-2">
                  {exp.url ? (
                    <a
                      href={exp.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base font-bold text-text-primary-light dark:text-text-primary-dark hover:text-primary transition-colors"
                    >
                      {exp.company}
                    </a>
                  ) : (
                    <h3 className="text-base font-bold text-text-primary-light dark:text-text-primary-dark">
                      {exp.company}
                    </h3>
                  )}
                  {exp.url && (
                    <a
                      href={exp.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-text-secondary-light dark:text-text-secondary-dark hover:text-primary transition-colors"
                    >
                      <svg
                        className="w-3.5 h-3.5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                        <polyline points="15 3 21 3 21 9" />
                        <line x1="10" y1="14" x2="21" y2="3" />
                      </svg>
                    </a>
                  )}
                </div>

                {/* Role */}
                <p className="text-sm font-medium text-text-primary-light dark:text-text-primary-dark mt-1">
                  {exp.role}
                </p>

                {/* Period */}
                <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark mt-0.5 tabular-nums">
                  {exp.period}
                </p>

                {/* Tasks */}
                {exp.tasks.length > 0 && (
                  <ul className="mt-4 space-y-2.5">
                    {exp.tasks.map((task, i) => (
                      <li
                        key={i}
                        className="flex gap-2.5 text-sm text-text-secondary-light dark:text-text-secondary-dark leading-relaxed"
                      >
                        <span className="shrink-0 mt-2 w-1 h-1 rounded-full bg-text-secondary-light dark:bg-text-secondary-dark" />
                        <span>{task}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
