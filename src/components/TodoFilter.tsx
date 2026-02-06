'use client';

import { FilterType } from '@/types/todo';

interface TodoFilterProps {
  filter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

const FILTERS: { value: FilterType; label: string }[] = [
  { value: 'all', label: '전체' },
  { value: 'active', label: '진행중' },
  { value: 'completed', label: '완료' },
];

export default function TodoFilter({ filter, onFilterChange }: TodoFilterProps) {
  return (
    <div role="tablist" aria-label="할 일 필터" className="flex gap-1 p-1 bg-gray-100 rounded-xl">
      {FILTERS.map((f) => (
        <button
          key={f.value}
          role="tab"
          aria-selected={filter === f.value}
          onClick={() => onFilterChange(f.value)}
          className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            filter === f.value
              ? 'bg-white text-blue-500 shadow-sm'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}
