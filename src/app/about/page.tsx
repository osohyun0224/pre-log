import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "블로그 소개",
};

export default function AboutPage() {
  return (
    <div className="container-layout py-16">
      <div className="max-w-content mx-auto">
        <h1 className="text-3xl font-bold text-text-primary-light dark:text-text-primary-dark mb-8">
          About
        </h1>

        <div className="prose dark:prose-invert">
          <p>
            안녕하세요! <strong>secret.blog</strong>에 오신 것을 환영합니다.
          </p>
          <p>
            이 블로그는 개발하며 배운 것들을 기록하고 공유하기 위해 만들었습니다.
            주로 웹 개발, 소프트웨어 엔지니어링에 관한 글을 작성합니다.
          </p>

          <h2>Tech Stack</h2>
          <ul>
            <li>Next.js (App Router)</li>
            <li>TypeScript</li>
            <li>Tailwind CSS</li>
            <li>Markdown</li>
            <li>Vercel</li>
          </ul>

          <h2>Contact</h2>
          <p>
            궁금한 점이 있으시면 GitHub를 통해 연락해주세요.
          </p>
        </div>
      </div>
    </div>
  );
}
