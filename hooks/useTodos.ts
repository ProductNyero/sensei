"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { arrayMove } from "@dnd-kit/sortable";
import type { Priority, Todo } from "@/lib/types";

const STORAGE_KEY = "sensei:todos";

function loadTodos(): Todo[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Todo[]) : [];
  } catch {
    return [];
  }
}

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const isFirstSave = useRef(true);

  // Todos are read from localStorage after mount (not during the initial
  // render) so the server-rendered and first-client-rendered HTML match —
  // reading synchronously here would cause a hydration mismatch whenever
  // localStorage already has saved todos.
  useEffect(() => {
    setTodos(loadTodos());
  }, []);

  useEffect(() => {
    if (isFirstSave.current) {
      isFirstSave.current = false;
      return;
    }
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  function addTodo(task: string, goal: string, priority: Priority) {
    setTodos((prev) => {
      const nextOrder = prev.length
        ? Math.max(...prev.map((todo) => todo.order)) + 1
        : 0;
      return [
        ...prev,
        { id: crypto.randomUUID(), task, goal, priority, done: false, order: nextOrder },
      ];
    });
  }

  function editTodo(id: string, task: string, goal: string, priority: Priority) {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, task, goal, priority } : todo,
      ),
    );
  }

  function deleteTodo(id: string) {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  }

  function toggleDone(id: string) {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, done: !todo.done } : todo)),
    );
  }

  function reorderTodos(activeId: string, overId: string) {
    if (activeId === overId) return;
    setTodos((prev) => {
      const sorted = [...prev].sort((a, b) => a.order - b.order);
      const oldIndex = sorted.findIndex((todo) => todo.id === activeId);
      const newIndex = sorted.findIndex((todo) => todo.id === overId);
      if (oldIndex === -1 || newIndex === -1) return prev;
      return arrayMove(sorted, oldIndex, newIndex).map((todo, index) => ({
        ...todo,
        order: index,
      }));
    });
  }

  const sortedTodos = useMemo(
    () => [...todos].sort((a, b) => a.order - b.order),
    [todos],
  );

  return {
    todos: sortedTodos,
    addTodo,
    editTodo,
    deleteTodo,
    toggleDone,
    reorderTodos,
  };
}
