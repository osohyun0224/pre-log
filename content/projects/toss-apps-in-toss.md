---
title: "앱인토스"
description: "토스 앱 내 서비스 플랫폼"
date: "2025-11-01"
thumbnail: "/images/projects/toss-apps-in-toss/toss-apps-in-toss.gif"
techStack: ["Next.js", "TypeScript", "Canvas API", "Framer"]
demo: "https://toss.im/apps-in-toss"
company: "Toss"
featured: true
---

## 개요

토스 앱 내 서비스 소개 페이지와 게임 공모전 페이지를 개발했습니다. 히어로 섹션에 SVG 기반 파티클 애니메이션을 구현하고, Framer로 제작된 게임 공모전 페이지를 iframe으로 임베딩하여 인터랙티브한 사용자 경험을 제공했습니다.

## 담당 업무

- SVG 파티클 애니메이션 히어로 섹션 개발
- Framer 임베딩 시스템 및 게임 공모전 페이지 통합
- Canvas API 기반 물리 시뮬레이션 엔진 구현
- 미디어별 반응형 성능 최적화

## 주요 기능

- SVG 문자열을 Canvas 파티클로 변환하는 인터랙티브 히어로 섹션
- 마우스/터치 상호작용에 반응하는 물리 기반 파티클 시스템
- Framer 페이지를 iframe으로 임베딩하고 postMessage로 양방향 통신
- 미디어 타입별(desktop/tablet/mobile) 최적화된 파티클 렌더링

## 기술적 도전과 해결

### SVG 파티클 애니메이션

**문제:** SVG 문자열을 수천 개의 파티클로 변환하여 60fps로 렌더링해야 했습니다. 각 파티클은 물리 속성(속도, 마찰, 이징)을 가지며, 마우스 상호작용에 실시간으로 반응해야 했습니다.

**해결:**
- SVG를 Blob URL → Image → Canvas → ImageData 순서로 변환하여 픽셀 데이터를 추출했습니다.
- alpha > 128인 불투명 픽셀만 `samplingStep` 간격으로 샘플링하여 파티클 수를 최적화했습니다.
- 거리 계산에 제곱값(`dx² + dy²`)을 사용하여 `sqrt` 연산을 회피하고, 마우스 반경 내 파티클만 힘 계산을 수행했습니다.
- `requestAnimationFrame`으로 브라우저 리프레시 주기에 맞춰 60fps를 유지했습니다.
- `Blob URL`은 사용 후 즉시 `revokeObjectURL`로 해제하여 메모리 누수를 방지했습니다.

### 반응형 및 인앱 브라우저 대응

**문제:** 인앱 브라우저에서 헤더/푸터 토글로 인한 불필요한 리사이즈 이벤트가 파티클을 재초기화시켜 성능이 저하되었습니다.

**해결:**
- `lodash/debounce`로 리사이즈 이벤트를 800ms 지연 처리했습니다.
- 이전 높이와 현재 높이의 차이가 100px 이상일 때만 파티클을 재초기화하도록 제한했습니다.
- `PointerEvent API`로 터치와 마우스를 통합 처리하되, `pointerType === 'mouse'`일 때만 이동을 추적하여 모바일 성능을 개선했습니다.
- 미디어 타입별로 `samplingStep`과 `radius`를 다르게 설정하고, `key={media}`로 미디어 변경 시 컴포넌트를 재마운트하여 최적 설정을 유지했습니다.

### Framer 임베딩 및 동적 높이 조정

**문제:** Framer로 제작된 게임 공모전 페이지를 iframe으로 임베딩할 때, 동적 콘텐츠에 따른 높이 조정과 부모-iframe 간 통신이 필요했습니다.

**해결:**
- TypeScript로 메시지 타입(`ReceivedMessage`, `PostMessage`)을 정의하여 타입 안전한 `postMessage` 통신 프로토콜을 구축했습니다.
- `useId`로 고유 `frameId`를 생성하여 여러 iframe 간 메시지를 구분했습니다.
- 100ms 간격의 ping/pong 방식으로 iframe 높이를 실시간 동기화하고, 초기 높이(7000px)를 설정하여 레이아웃 시프트를 최소화했습니다.
- 부모 창의 `innerHeight` 기반 vh 단위를 iframe에 전달하여 반응형을 지원했습니다.
- `dynamic import`와 `ssr: false`로 iframe을 클라이언트에서만 렌더링하여 초기 로드 시간을 단축했습니다.

## 성과

- 수천 개 파티클을 60fps로 안정적으로 렌더링
- 인앱 브라우저 환경에서의 불필요한 리사이즈 재초기화 제거
- Framer 페이지와의 실시간 양방향 통신 구현
- 모바일/태블릿/데스크톱 환경별 최적화된 파티클 렌더링

## 스크린샷

![앱인토스](/images/projects/toss-apps-in-toss/toss-apps-in-toss.gif)
