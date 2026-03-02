---
title: "Next.js App Router 시작하기"
date: "2026-03-01"
category: "Engineering"
summary: "Next.js App Router의 기본 개념과 사용법을 알아봅니다. 파일 기반 라우팅, 서버 컴포넌트, 레이아웃 시스템을 소개합니다."
thumbnail: ""
---

## App Router란?

Next.js 13부터 도입된 App Router는 React Server Components를 기반으로 한 새로운 라우팅 시스템입니다.

### 주요 특징

- **파일 기반 라우팅**: `app/` 디렉토리 구조가 URL 경로가 됩니다
- **서버 컴포넌트**: 기본적으로 모든 컴포넌트가 서버 컴포넌트입니다
- **레이아웃 시스템**: 중첩 레이아웃을 쉽게 구현할 수 있습니다

## 프로젝트 구조

```
app/
├── layout.tsx    # 루트 레이아웃
├── page.tsx      # 메인 페이지 (/)
├── posts/
│   ├── page.tsx  # /posts
│   └── [slug]/
│       └── page.tsx  # /posts/hello-world
└── about/
    └── page.tsx  # /about
```

## 서버 컴포넌트 vs 클라이언트 컴포넌트

```tsx
// 서버 컴포넌트 (기본값)
export default function ServerComponent() {
  // DB 접근, 파일 시스템 접근 가능
  return <div>Server Component</div>;
}
```

```tsx
// 클라이언트 컴포넌트
"use client";

import { useState } from "react";

export default function ClientComponent() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

## 정리

App Router는 서버 컴포넌트를 활용해 더 나은 성능과 개발 경험을 제공합니다. 특히 정적 사이트 생성(SSG)과 결합하면 블로그 같은 콘텐츠 중심 사이트에 매우 적합합니다.
