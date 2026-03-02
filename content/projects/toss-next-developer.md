---
title: "25 NEXT 개발자 챌린지"
description: "토스 개발자 채용 이벤트 페이지"
date: "2025-06-01"
thumbnail: "/images/projects/toss-next-developer/toss-next-developer.gif"
techStack: ["Next.js", "TypeScript", "Framer"]
demo: "https://toss.im/career/event/next-developer-2025"
company: "Toss"
featured: false
---

## 개요

25 NEXT 개발자 챌린지는 토스의 개발자 채용 이벤트 페이지입니다. 프레이머(Framer)로 제작된 이벤트 페이지를 토스 커리어 홈페이지에 iframe으로 삽입하는 방식으로 구성되었으며, 코드 오버라이드를 통해 공유 링크 복사, 토스터 알림, iframe 높이 동기화 등의 기능을 구현했습니다.

## 담당 업무

- 프레이머 코드 오버라이드 기반 공유 기능 및 토스터 알림 구현
- 다양한 브라우저/인앱 환경별 클립보드 복사 폴백 로직 개발
- iframe-부모 간 postMessage 통신 기반 높이 동기화 시스템 구축
- iframe 내 vh 단위 보정을 위한 CSS 변수 기반 뷰포트 처리 구현

## 주요 기능

- 프레이머 사이트를 커리어 홈페이지 iframe으로 삽입하여 하나의 페이지처럼 동작
- 공유 버튼 클릭 시 URL 복사 및 부모 페이지 토스터 알림 표시
- Web Share API / Clipboard API / execCommand 다단계 폴백 클립보드 복사
- postMessage 기반 iframe 높이 실시간 동기화 (load, resize, 주기적 ping)
- CSS 변수(--vh)를 활용한 iframe 내부 뷰포트 높이 보정

## 기술적 도전과 해결

### 프레이머 iframe 임베드와 높이 동기화

**문제:** 프레이머로 제작한 이벤트 페이지를 커리어 홈페이지에 iframe으로 삽입했을 때, iframe 기본 높이(300px)로 인해 내부에 별도의 스크롤이 생기면서 부모 페이지와 분리된 느낌을 주었습니다. 사용자가 하나의 자연스러운 페이지로 경험하려면 iframe 높이를 콘텐츠에 맞게 동적으로 조정해야 했습니다.

**해결:** iframe 자식 페이지에서 `postMessage`를 통해 콘텐츠 높이를 부모에게 전달하고, 부모가 이 값을 iframe의 CSS height로 적용하는 양방향 통신 구조를 구현했습니다. `load`, `resize` 이벤트와 주기적인 `pingHeight` 메시지를 통해 높이를 지속적으로 동기화하고, `allowedOrigins` 화이트리스트로 보안을 유지했습니다. CSS에서는 `overflow: hidden`과 `min-height: unset`으로 iframe 내부 스크롤을 원천 차단하여 부모 페이지 스크롤만 동작하도록 했습니다.

### iframe 내부 vh 단위 보정

**문제:** iframe 내부에서 `100vh`를 사용하면 부모의 뷰포트 높이가 아닌 iframe 자체의 전체 높이를 참조하여, 의도한 풀스크린 레이아웃이 깨지고 스크롤이 무한으로 커지는 이슈가 발생했습니다.

**해결:** 부모 페이지에서 실제 뷰포트 높이를 px 단위로 계산한 뒤 100으로 나누어 1vh 값을 산출하고, `postMessage`의 `init` 이벤트를 통해 iframe에 전달했습니다. iframe 측에서는 이 값을 CSS 변수 `--vh`로 설정하고, 코드 오버라이드(`withFullViewportHeight`)가 해당 요소의 height를 `calc(100 * var(--vh))`로 변경하여 부모의 실제 뷰포트 높이와 일치시켰습니다.

### 다양한 환경별 클립보드 복사 폴백

**문제:** 공유 버튼 클릭 시 URL을 클립보드에 복사해야 했는데, 카카오톡 인앱 브라우저, iOS Safari, Android WebView 등 환경마다 지원하는 클립보드 API가 달랐습니다. 특히 안드로이드 인앱 브라우저에서는 `navigator.clipboard.writeText`가 동작하지 않는 경우가 빈번했습니다.

**해결:** 환경별 다단계 폴백 전략을 구현했습니다. 모바일 웹에서는 Web Share API를 우선 시도하고, 데스크톱이나 카카오톡 인앱 브라우저에서는 바로 복사 로직으로 분기했습니다. 복사 시에는 `navigator.clipboard.writeText`를 우선 시도하되, 안드로이드 환경에서는 이를 건너뛰고 `document.execCommand('copy')`를 사용했습니다. iOS에서는 `createRange`와 `setSelectionRange`를 조합한 선택 방식을 적용하여 전 환경에서 안정적인 복사 기능을 보장했습니다.

## 성과

- 프레이머 기반 이벤트 페이지를 커리어 홈페이지에 자연스럽게 통합하여 디자이너가 직접 배포 가능한 워크플로우 구축
- postMessage 양방향 통신으로 iframe 높이 실시간 동기화 및 부드러운 스크롤 경험 제공
- 다단계 클립보드 복사 폴백으로 카카오톡, iOS, Android 인앱 브라우저 등 전 환경에서 안정적인 공유 기능 동작

## 스크린샷

![25 NEXT 개발자 챌린지](/images/projects/toss-next-developer/toss-next-developer.gif)
