'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { Todo, FilterType } from '@/types/todo';
import TodoInput from '@/components/TodoInput';
import TodoFilter from '@/components/TodoFilter';
import TodoList from '@/components/TodoList';

const STORAGE_KEY = 'todos';

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<FilterType>('all');
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          const valid = parsed.filter(
            (item: unknown): item is Todo =>
              typeof item === 'object' &&
              item !== null &&
              typeof (item as Todo).id === 'string' &&
              typeof (item as Todo).text === 'string' &&
              typeof (item as Todo).completed === 'boolean' &&
              typeof (item as Todo).createdAt === 'number'
          );
          setTodos(valid);
        }
      }
    } catch {
      // ignore parse errors
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage when todos change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    }
  }, [todos, isLoaded]);

  const addTodo = useCallback((text: string) => {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text,
      completed: false,
      createdAt: Date.now(),
    };
    setTodos((prev) => [newTodo, ...prev]);
  }, []);

  const toggleTodo = useCallback((id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }, []);

  const deleteTodo = useCallback((id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  }, []);

  const updateTodo = useCallback((id: string, text: string) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, text } : todo))
    );
  }, []);

  const filteredTodos = useMemo(() => {
    switch (filter) {
      case 'active':
        return todos.filter((t) => !t.completed);
      case 'completed':
        return todos.filter((t) => t.completed);
      default:
        return todos;
    }
  }, [todos, filter]);

  const remainingCount = useMemo(
    () => todos.filter((t) => !t.completed).length,
    [todos]
  );

  // Prevent SSR hydration mismatch
  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-lg mx-auto space-y-6">
        <header className="text-center">
          <h1 className="text-3xl font-bold text-gray-800">Todo App</h1>
          <p className="text-gray-500 mt-1">오늘 할 일을 관리하세요</p>
        </header>

        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5 space-y-4">
          <TodoInput onAdd={addTodo} />
          <TodoFilter filter={filter} onFilterChange={setFilter} />
          <TodoList
            todos={filteredTodos}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
            onUpdate={updateTodo}
          />
        </div>

        <footer className="text-center text-sm text-gray-400">
          남은 할 일: {remainingCount}개
        </footer>
      </div>
    </div>
  );
}
