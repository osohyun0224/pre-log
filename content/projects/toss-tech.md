---
title: "토스테크"
description: "토스 기술 블로그"
date: "2025-08-01"
thumbnail: "/images/projects/toss-tech/toss-tech.png"
techStack: ["Next.js", "TypeScript", "React Server Components"]
demo: "https://toss.tech"
company: "Toss"
featured: false
---

## 개요

토스테크는 토스의 공식 기술 블로그 서비스입니다. Next.js 12(Page Router)에서 Next.js 15(App Router)로의 대규모 마이그레이션을 수행하여 RSC(React Server Components) 기반 아키텍처로 전환하고, SSR 데이터 페칭 전략 일원화, 캐싱 정책 수립, RSS 피드 재구축 등을 진행했습니다.

## 담당 업무

- Next.js 12 → 15 마이그레이션 전체 프론트엔드 개발
- Page Router(getServerSideProps) 기반 SSR 구조를 App Router(RSC) 중심으로 재설계
- 데이터 유형별 캐싱 전략 설계 및 팀 내 캐싱 정책 수립
- RSS(2.0)/Atom/JSON Feed 생성 로직 Route Handler 기반으로 재구축
- 서버 개발자와 협업하여 서버/클라이언트 경계 재정의

## 주요 기능

- React Server Components 기반 서버/클라이언트 렌더링 분리
- 서버 렌더링 시점 병렬 데이터 프리패치로 waterfall 제거
- 데이터 성격별 캐시 전략 분리 (실시간: no-store, 주기적 갱신: revalidate)
- Route Handler 기반 RSS(2.0)/Atom/JSON Feed 동적 생성
- 클라이언트 번들 최적화를 통한 성능 개선

## 기술적 도전과 해결

### App Router & RSC 기반 아키텍처 재설계

**문제:** 페이지별 `getServerSideProps` 구현이 상이해 서버/클라이언트 책임이 혼재되어 있었습니다. RSC 도입 과정에서 boundary 충돌과 구조적 제약이 발생했습니다.

**해결:** App Router 전환 후 Server Component 중심으로 렌더링 책임을 재정의하고, 인터랙션 영역만 Client Component로 분리하여 명확한 서버/클라이언트 경계를 수립했습니다. 서버 개발자와 협업해 클라이언트 의존 비즈니스 로직을 서버로 이관하여 안정성을 높였습니다.

### SSR 데이터 프리패치 & Hydration 구조 개선

**문제:** 페이지 단위 개별 fetch로 인해 데이터 waterfall이 발생하고, 초기 렌더링 단계에서 불필요한 네트워크 요청이 반복되는 현상이 지속되었습니다.

**해결:** 서버 렌더링 시점에 주요 데이터를 병렬 프리패치하도록 데이터 구조를 설계하고 추가 API 호출을 제거했습니다. 이를 통해 waterfall을 제거하고 초기 렌더링을 안정화하며 hydration 범위를 축소했습니다.

### 캐싱 전략 설계 및 정책 정립

**문제:** App Router 환경에서 fetch의 기본 캐시 동작으로 일부 데이터가 stale 상태로 유지되는 문제가 발생했습니다. 최신 댓글, 인기 아티클 등 실시간성이 요구되는 데이터와 주기적 갱신이 가능한 데이터가 혼재되어 있었고, 팀 내 데이터별 캐시 타임 기준이 부재했습니다.

**해결:** 데이터 성격에 따라 캐시 전략을 분리하여 실시간성 데이터에는 `no-store`를, 주기적 갱신 데이터에는 `revalidate`를 적용했습니다. 프론트엔드 개발 리드와 논의를 통해 데이터 유형별 캐시 타임 기준을 수립하고, 페이지 단위가 아닌 데이터 단위 캐시 정책으로 일관성을 확보했습니다.

### RSS 피드 생성 로직 재구축

**문제:** 기존 `public/rss.xml` 정적 파일 기반 피드 제공 방식이 App Router 전환 이후 최신 콘텐츠 반영이 불가능해졌습니다. 세부 아티클 내용이 비어 외부 RSS 구독 및 크롤링 서비스가 중단될 가능성이 발생했습니다.

**해결:** `app/rss.xml/route.ts` Route Handler 기반으로 RSS(2.0), Atom, JSON Feed 생성 로직을 재구현했습니다. 서버에서 최신 데이터를 직접 조회해 XML을 동적으로 생성·응답하도록 구조를 전환하고, 정적 파일 의존 방식을 제거하여 서버 응답 기반 피드 생성 구조로 일원화했습니다.

## 성과

- LCP 3.1s → 1.9s로 단축, 클라이언트 번들 크기 410KB → 245KB로 약 40% 감소
- 데이터 waterfall 제거 및 초기 렌더링 안정화
- 팀 내 부재하던 데이터 유형별 캐싱 전략 수립으로 stale 데이터 노출 방지
- 마이그레이션 이후에도 외부 RSS 구독 및 크롤링 연속성 유지

## 스크린샷

![토스테크](/images/projects/toss-tech/toss-tech.png)
