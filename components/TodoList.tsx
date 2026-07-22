"use client";

import {
  DndContext,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import type { Priority, Todo } from "@/lib/types";
import TodoItem from "@/components/TodoItem";

interface TodoListProps {
  todos: Todo[];
  onEdit: (id: string, task: string, goal: string, priority: Priority) => void;
  onDelete: (id: string) => void;
  onToggleDone: (id: string) => void;
  onReorder: (activeId: string, overId: string) => void;
}

export default function TodoList({
  todos,
  onEdit,
  onDelete,
  onToggleDone,
  onReorder,
}: TodoListProps) {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 4 },
    }),
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over) return;
    onReorder(String(active.id), String(over.id));
  }

  if (todos.length === 0) {
    return <p className="text-gray-500">No todos yet — add one above.</p>;
  }

  const activeTodos = todos.filter((todo) => !todo.done);
  const doneTodos = todos.filter((todo) => todo.done);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={activeTodos.map((todo) => todo.id)}
        strategy={verticalListSortingStrategy}
      >
        <ul className="flex flex-col gap-2">
          {activeTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onEdit={onEdit}
              onDelete={onDelete}
              onToggleDone={onToggleDone}
            />
          ))}
        </ul>
      </SortableContext>

      {doneTodos.length > 0 && (
        <ul className="mt-2 flex flex-col gap-2">
          {doneTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onEdit={onEdit}
              onDelete={onDelete}
              onToggleDone={onToggleDone}
            />
          ))}
        </ul>
      )}
    </DndContext>
  );
}
