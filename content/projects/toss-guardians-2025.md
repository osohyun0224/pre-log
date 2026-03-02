---
title: "토스 가디언즈 2025"
description: "가디언즈 25 참가 신청 폼"
date: "2025-05-15"
thumbnail: "/images/projects/toss-guardians-2025/toss-guardians-2025.gif"
techStack: ["React", "TypeScript", "Framer", "react-hook-form"]
company: "Toss"
featured: false
---

## 개요

가디언즈 25는 토스의 채용 이벤트 참가 신청 폼 프로젝트입니다. Framer의 코드 오버라이드 기능을 활용하여 react-hook-form 기반의 참가 신청 폼을 구현하고, REST API와 연동하여 안정적인 데이터 수집 시스템을 구축했습니다.

## 담당 업무

- Framer 코드 오버라이드 기반 참가 신청 폼 전체 개발
- react-hook-form을 활용한 폼 상태 관리 및 실시간 유효성 검사 구현
- 환경별(live/alpha) API 엔드포인트 분기 및 FormData 기반 API 통신 구현
- 커스텀 드롭다운, 이메일 분리 입력 등 UI 컴포넌트 개발

## 주요 기능

- 참가 신청 폼 (이름, 휴대폰 번호, 이메일, 회사명, 직무, 경력 기간)
- 실시간 유효성 검사 (이메일 로컬/도메인 검증, 휴대폰 번호 형식 검증)
- 이메일 로컬 파트와 도메인 분리 입력, 커스텀 도메인 직접 입력 지원
- 환경별 API 엔드포인트 자동 선택 및 Bearer 토큰 인증
- 성공/중복 신청/에러 상황별 모달 분리 처리
- 모바일 환경 스크롤 자동 조정 및 제출 중 로딩 상태 관리

## 기술적 도전과 해결

### Framer 코드 오버라이드 내 react-hook-form 통합

**문제:** Framer 환경에서 코드 오버라이드 방식으로 폼을 구현해야 했습니다. Framer의 컴포넌트 구조 내에서 react-hook-form의 FormProvider 컨텍스트를 공유하고, 각 필드 컴포넌트에서 useFormContext로 접근하는 구조를 설계해야 했습니다.

**해결:** FormProvider로 전체 폼을 감싸고 `useFormContext()` 훅을 활용하여 Props drilling 없이 하위 컴포넌트에서 폼 메서드에 접근할 수 있도록 구현했습니다. `mode: "all"` 설정으로 모든 시점(onChange, onBlur, onSubmit)에서 검증이 수행되어 실시간 피드백을 제공하고, `watch()` API로 전체 폼 값을 감시하여 제출 버튼의 활성화 상태를 실시간으로 제어했습니다.

### 이메일 분리 입력과 상태 동기화

**문제:** 이메일 입력을 로컬 파트와 도메인으로 분리하되, 미리 정의된 도메인(gmail.com 등) 선택과 커스텀 도메인 직접 입력을 모두 지원해야 했습니다. react-hook-form의 폼 상태와 로컬 상태를 동기화하는 것이 복잡했습니다.

**해결:** 이메일 로컬 파트와 도메인 선택을 별도의 로컬 상태로 관리하고, 두 값을 조합하여 최종 이메일 값을 `setValue()`로 react-hook-form에 동기화하는 방식으로 구현했습니다. 이메일 로컬 파트에는 문자/숫자/특수문자 규칙 기반의 실시간 검증을, 도메인에는 유효한 형식 검증을 각각 적용했습니다.

### 환경별 API 분기 및 에러 처리

**문제:** live와 alpha 환경에서 서로 다른 API 엔드포인트를 사용해야 했고, 성공/중복 신청/일반 에러 등 다양한 응답 상태에 대해 각각 다른 피드백을 제공해야 했습니다.

**해결:** `getOperationalEnvironment()` 함수로 현재 환경을 감지하여 API 베이스 URL을 자동으로 선택하도록 구현했습니다. FormData로 변환 시 프론트엔드의 camelCase 필드명을 백엔드의 snake_case로 매핑하고, 응답 에러 메시지에서 `ALREADY_APPLIED` 키워드를 감지하여 중복 신청 모달을 표시하는 등 에러 타입별 분기 처리를 구현했습니다. 또한 Mock 모드를 지원하여 개발 환경에서 실제 API 호출 없이 테스트할 수 있도록 했습니다.

## 성과

- Framer 코드 오버라이드 환경에서 react-hook-form 기반의 완전한 폼 시스템 구현
- 실시간 유효성 검사로 잘못된 데이터 제출 사전 방지
- 환경별 API 엔드포인트 자동 선택으로 배포 프로세스 간소화
- 성공/중복/에러 상황별 명확한 사용자 피드백 제공

## 스크린샷

![토스 가디언즈 2025](/images/projects/toss-guardians-2025/toss-guardians-2025.gif)
