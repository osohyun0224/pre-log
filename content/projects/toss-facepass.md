---
title: "페이스패스"
description: "얼굴 인식 기반 출입 관리 서비스"
date: "2025-06-15"
thumbnail: "/images/projects/toss-facepass/toss-facepass.gif"
techStack: ["Next.js", "TypeScript", "Motion", "Vanilla Extract"]
demo: "https://toss.im/facepass"
company: "Toss"
featured: false
---

## 개요

페이스패스는 얼굴 인식 기술을 활용한 출입 관리 서비스의 랜딩 페이지입니다. Next.js 15 App Router 기반으로 구축되었으며, 다양한 인터랙티브 애니메이션과 도입 문의 폼, 실시간 가격 계산기 등을 포함한 서비스 소개 웹사이트입니다.

## 담당 업무

- 페이스패스 랜딩 페이지 전체 프론트엔드 개발
- Motion, Rally, AnimateText, Lottie 등 다양한 애니메이션 라이브러리를 활용한 인터랙티브 UI 구현
- 도입 문의 폼 및 Slack 알림 연동 개발
- 실시간 가격 계산기(슬라이더) 구현
- 스크롤 기반 인터랙션 및 Google Analytics 이벤트 추적 구현
- 데스크톱/모바일 완전 반응형 대응

## 주요 기능

- AnimateText 기반 히어로 섹션 텍스트 슬라이드 애니메이션
- Rally를 활용한 3D 퍼스펙티브 기기 섹션 애니메이션
- 용도별(피트니스, 무인매장, 학원, 행사, 사무실) 카테고리 선택 및 미디어 전환
- 사용 인원/기간 슬라이더 기반 실시간 가격 계산기
- 도입 문의 폼 제출 및 Slack 알림 연동
- Motion(Framer Motion) 기반 FAQ 아코디언 애니메이션
- AnimateLoop 기반 파트너 로고 무한 스크롤
- QR 코드 모달을 통한 토스 앱 딥링크 등록
- 스크롤 깊이 추적(25%/50%/75%/100%) Google Analytics 이벤트

## 기술적 도전과 해결

### CTA 버튼 마운트/언마운트 애니메이션

**문제:** 모바일 환경에서 스크롤 위치에 따라 하단 CTA 버튼이 나타나고 사라져야 했습니다. 단순히 display를 토글하면 애니메이션 없이 즉시 사라지고, DOM에서 제거하기 전에 페이드아웃 애니메이션을 완료해야 하는 타이밍 제어가 필요했습니다.

**해결:** `isMounted`와 `isVisible` 두 가지 상태를 분리하는 커스텀 훅(`useCtaAnimation`)을 구현했습니다. 나타날 때는 먼저 DOM에 마운트한 후 visible 상태를 적용하고, 사라질 때는 먼저 invisible로 전환한 뒤 애니메이션 duration만큼 지연 후 DOM에서 언마운트하는 방식으로 부드러운 페이드 인/아웃을 구현했습니다. CSS에는 `translate3d`와 `willChange` 속성을 적용하여 GPU 가속을 활용했습니다.

### Rally 3D 퍼스펙티브 애니메이션과 스크롤 트리거

**문제:** 기기 소개 섹션에서 키오스크 이미지가 3D 퍼스펙티브와 함께 확대되는 애니메이션을 구현해야 했습니다. 사용자가 해당 섹션에 도달했을 때 자동으로 재생되어야 하고, 호버/터치 시에도 수동으로 재생할 수 있어야 했습니다.

**해결:** Rally 라이브러리의 `useRally` 훅으로 스프링 이징 기반 3D 모션을 정의하고, Intersection Observer로 섹션이 30% 이상 보일 때 애니메이션을 트리거하도록 구현했습니다. `hasPlayedOnce` 상태로 최초 1회만 자동 재생하되, 호버/터치 인터랙션으로는 반복 재생이 가능하도록 설계했습니다. 데스크톱과 모바일에 각각 별도의 Rally 인스턴스를 생성하여 독립적으로 동작하도록 했습니다.

### Slack 알림 연동 시 CORS 이슈

**문제:** 도입 문의 폼 제출 후 Slack Webhook으로 알림을 전송해야 했는데, 브라우저에서 직접 Slack API를 호출하면 CORS 에러가 발생했습니다.

**해결:** 로컬 환경에서는 Next.js Route Handler(`/api/send-slack`)를 통해 서버 사이드에서 Slack Webhook을 호출하고, 프로덕션 환경에서는 `http-proxy-middleware`를 활용하여 Slack Webhook URL로 프록시하는 방식으로 CORS 이슈를 해결했습니다. Slack 전송이 실패하더라도 사용자에게는 성공으로 표시하여 사용자 경험을 유지했습니다.

### 스크롤 기반 인터랙션 성능 최적화

**문제:** 스크롤 깊이 추적, CTA 버튼 표시/숨김, 네비게이션 스타일 변경 등 다수의 스크롤 이벤트를 처리해야 하면서 성능을 유지해야 했습니다.

**해결:** Intersection Observer를 활용하여 Industry 섹션과 Footer의 가시성을 감지하고, 스크롤 이벤트 리스너에는 `passive: true` 옵션을 적용하여 메인 스레드 블로킹을 방지했습니다. 스크롤 깊이 추적에는 `useRef`로 Set을 관리하여 동일 임계값에 대한 중복 GA 이벤트 전송을 방지했습니다.

## 성과

- 10개 이상의 인터랙티브 섹션을 포함한 서비스 랜딩 페이지 단독 개발
- GPU 가속 및 Intersection Observer 활용으로 다수의 애니메이션이 동시에 동작하는 환경에서 부드러운 60fps 유지
- 도입 문의 폼 → API 제출 → Slack 알림 파이프라인 구축으로 영업팀 실시간 알림 제공
- 데스크톱/모바일 완전 반응형 대응

## 스크린샷

![페이스패스](/images/projects/toss-facepass/toss-facepass.gif)
