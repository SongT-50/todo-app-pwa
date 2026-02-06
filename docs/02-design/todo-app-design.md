# Todo App - Design Document

## 1. Data Model

### Todo Interface
```typescript
interface Todo {
  id: string;          // crypto.randomUUID()
  text: string;        // 할 일 텍스트
  completed: boolean;  // 완료 여부
  createdAt: number;   // Date.now() timestamp
}

type FilterType = 'all' | 'active' | 'completed';
```

### localStorage Schema
- Key: `todos`
- Value: `JSON.stringify(Todo[])`

## 2. Component Architecture

```
layout.tsx (PWA meta, SW registration)
└── page.tsx ("use client", state management)
    ├── TodoInput (text input + voice input)
    ├── TodoFilter (all / active / completed tabs)
    ├── TodoList (filtered list rendering)
    │   └── TodoItem[] (checkbox, text, edit, delete)
    └── Footer (remaining count)
```

## 3. Component Specifications

### 3.1 page.tsx (Main State Manager)
- **State**: `todos: Todo[]`, `filter: FilterType`, `isLoaded: boolean`
- **Effects**: localStorage load on mount → set isLoaded true
- **Effects**: todos 변경 시 localStorage 저장
- **Handlers**: addTodo, toggleTodo, deleteTodo, updateTodo
- **Computed**: filteredTodos, remainingCount

### 3.2 TodoInput
- **Props**: `onAdd: (text: string) => void`
- **State**: `inputText: string`, `isListening: boolean`, `isSupported: boolean`
- **Behavior**:
  - Enter key / 추가 버튼 → onAdd 호출
  - 마이크 버튼 → SpeechRecognition 시작/중지
  - getUserMedia로 권한 사전 확보
  - 녹음 중 빨간 pulse 애니메이션
  - 미지원 브라우저: 마이크 버튼 숨김

### 3.3 TodoItem
- **Props**: `todo: Todo`, `onToggle`, `onDelete`, `onUpdate`
- **State**: `isEditing: boolean`, `editText: string`
- **Behavior**:
  - 체크박스 클릭 → onToggle
  - 더블클릭 / 편집 버튼 → 편집 모드
  - Enter → onUpdate, Escape → 취소
  - x 버튼 → onDelete
  - 완료 시 취소선 + 회색 텍스트

### 3.4 TodoList
- **Props**: `todos: Todo[]`, `onToggle`, `onDelete`, `onUpdate`
- **Rendering**: todos.map → TodoItem
- **Empty state**: 빈 목록 메시지

### 3.5 TodoFilter
- **Props**: `filter: FilterType`, `onFilterChange`
- **Tabs**: 전체 | 진행중 | 완료
- **Active tab**: blue-500 배경/텍스트

## 4. PWA Design

### manifest.json
```json
{
  "name": "Todo App",
  "short_name": "Todo",
  "display": "standalone",
  "start_url": "/",
  "theme_color": "#3b82f6",
  "background_color": "#f9fafb",
  "icons": [
    { "src": "/icons/icon-192.svg", "sizes": "192x192", "type": "image/svg+xml" },
    { "src": "/icons/icon-512.svg", "sizes": "512x512", "type": "image/svg+xml" }
  ]
}
```

### Service Worker Strategy
- Network First → Cache Fallback
- Cache name: `todo-app-v1`
- Install: precache app shell
- Fetch: try network, fallback to cache

## 5. UI Design Specification
- **Background**: bg-gray-50
- **Card**: bg-white, border border-gray-200, rounded-2xl, shadow-sm
- **Accent**: blue-500
- **Max width**: max-w-lg (32rem), mx-auto
- **Typography**: Geist Sans, 한국어 UI
- **Responsive**: mobile-first, p-4

## 6. State Flow Diagram
```
[Mount] → localStorage.getItem('todos') → setTodos → setIsLoaded(true)
[Add]   → setTodos([...todos, newTodo]) → useEffect → localStorage.setItem
[Toggle] → setTodos(map) → useEffect → localStorage.setItem
[Delete] → setTodos(filter) → useEffect → localStorage.setItem
[Update] → setTodos(map) → useEffect → localStorage.setItem
```
