# Todo App - Plan Document

## 1. Project Overview
- **Project Name**: Todo App
- **Type**: Next.js Progressive Web App (PWA)
- **Level**: Dynamic (Starter+)
- **Goal**: 한국어 UI, 음성 입력, PWA 지원을 포함한 완전한 Todo 관리 앱

## 2. Requirements Summary

### 2.1 Core Features
| ID | Feature | Priority | Description |
|----|---------|----------|-------------|
| F1 | Todo 추가 | Must | 텍스트 입력 + Enter/버튼으로 추가 |
| F2 | Todo 완료 토글 | Must | 체크박스로 완료/미완료 전환 |
| F3 | Todo 삭제 | Must | x 버튼으로 삭제 |
| F4 | Todo 인라인 수정 | Must | 더블클릭/편집 버튼으로 수정, Enter 저장, Escape 취소 |
| F5 | 필터링 | Must | 전체/진행중/완료 탭 UI |
| F6 | 남은 할 일 개수 | Must | 미완료 항목 수 표시 |
| F7 | 음성 입력 | Must | Web Speech API 한국어 음성 인식 |
| F8 | 데이터 저장 | Must | localStorage 자동 저장/로드 |
| F9 | PWA | Must | manifest.json, Service Worker, 아이콘 |

### 2.2 Non-Functional Requirements
| ID | Requirement | Description |
|----|-------------|-------------|
| NF1 | 반응형 | 모바일 우선, 최대 너비 32rem |
| NF2 | SSR 안전 | 하이드레이션 불일치 방지 |
| NF3 | 한국어 UI | 모든 텍스트 한국어 |
| NF4 | 브라우저 호환 | 음성 미지원 시 graceful degradation |

## 3. Tech Stack
- **Framework**: Next.js (App Router, TypeScript)
- **Styling**: Tailwind CSS
- **Font**: Geist Sans
- **Storage**: localStorage
- **Speech**: Web Speech API (SpeechRecognition)
- **PWA**: manifest.json + Service Worker

## 4. Project Structure
```
todo-app/
├── public/
│   ├── manifest.json
│   ├── sw.js
│   └── icons/
│       ├── icon-192.svg
│       └── icon-512.svg
├── src/
│   ├── types/
│   │   └── todo.ts
│   ├── components/
│   │   ├── TodoInput.tsx
│   │   ├── TodoItem.tsx
│   │   ├── TodoList.tsx
│   │   └── TodoFilter.tsx
│   └── app/
│       ├── layout.tsx
│       └── page.tsx
├── next.config.ts
├── package.json
└── tailwind.config.ts
```

## 5. Risk & Mitigation
| Risk | Mitigation |
|------|------------|
| SSR/CSR 불일치 | isLoaded 상태로 클라이언트 전용 렌더링 |
| 음성 API 미지원 | 브라우저 체크 후 버튼 숨김 |
| SW 캐시 문제 | no-cache 헤더 설정 |

## 6. Success Criteria
- [ ] npm run build 성공
- [ ] 모든 9가지 기능 요구사항 구현
- [ ] PWA 설치 가능
- [ ] 음성 입력 동작
- [ ] localStorage 데이터 유지
