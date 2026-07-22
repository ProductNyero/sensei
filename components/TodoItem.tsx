"use client";

import { useState, type FormEvent } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { Priority, Todo } from "@/lib/types";

interface TodoItemProps {
  todo: Todo;
  onEdit: (id: string, task: string, goal: string, priority: Priority) => void;
  onDelete: (id: string) => void;
  onToggleDone: (id: string) => void;
}

const PRIORITY_STYLES: Record<Priority, string> = {
  low: "bg-gray-100 text-gray-700",
  medium: "bg-yellow-100 text-yellow-800",
  high: "bg-red-100 text-red-700",
};

export default function TodoItem({
  todo,
  onEdit,
  onDelete,
  onToggleDone,
}: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTask, setEditTask] = useState(todo.task);
  const [editGoal, setEditGoal] = useState(todo.goal);
  const [editPriority, setEditPriority] = useState<Priority>(todo.priority);

  const { setNodeRef, attributes, listeners, transform, transition } =
    useSortable({ id: todo.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const dragHandle = (
    <button
      type="button"
      {...attributes}
      {...listeners}
      aria-label="Drag to reorder"
      className="cursor-grab touch-none px-1 text-gray-400 hover:text-gray-600 active:cursor-grabbing"
    >
      ⠿
    </button>
  );

  // Completed tasks keep the handle for visual/layout consistency (and so
  // it's already in place once undone), but aren't part of the sortable
  // group, so the handle is inert here — no drag listeners attached.
  const staticDragHandle = (
    <button
      type="button"
      disabled
      aria-label="Drag to reorder"
      className="cursor-default px-1 text-gray-300"
    >
      ⠿
    </button>
  );

  if (todo.done) {
    return (
      <li
        ref={setNodeRef}
        style={style}
        className="flex items-center justify-between rounded-lg border border-green-300 bg-green-50 px-3 py-2"
      >
        <div className="flex items-center gap-2">
          {staticDragHandle}
          <span className="text-green-800">Goal smashed: {todo.goal}</span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onToggleDone(todo.id)}
            className="text-sm text-gray-500 hover:underline"
          >
            Undo
          </button>
          <button
            onClick={() => onDelete(todo.id)}
            className="text-sm text-red-500 hover:underline"
          >
            Delete
          </button>
        </div>
      </li>
    );
  }

  function handleSave(e: FormEvent) {
    e.preventDefault();
    const trimmedTask = editTask.trim();
    const trimmedGoal = editGoal.trim();
    if (!trimmedTask || !trimmedGoal) return;
    onEdit(todo.id, trimmedTask, trimmedGoal, editPriority);
    setIsEditing(false);
  }

  if (isEditing) {
    return (
      <li
        ref={setNodeRef}
        style={style}
        className="rounded-lg border border-gray-300 bg-white px-3 py-2"
      >
        <form onSubmit={handleSave} className="flex flex-col gap-2">
          <div className="flex gap-2">
            <input
              type="text"
              value={editTask}
              onChange={(e) => setEditTask(e.target.value)}
              className="flex-1 rounded border border-gray-300 px-2 py-1"
              autoFocus
              required
            />
            <select
              value={editPriority}
              onChange={(e) => setEditPriority(e.target.value as Priority)}
              className="rounded border border-gray-300 px-2 py-1"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <input
            type="text"
            value={editGoal}
            onChange={(e) => setEditGoal(e.target.value)}
            className="rounded border border-gray-300 px-2 py-1"
            required
          />
          <div className="flex gap-2">
            <button
              type="submit"
              className="rounded bg-blue-600 px-3 py-1 text-white hover:bg-blue-700"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => {
                setEditTask(todo.task);
                setEditGoal(todo.goal);
                setEditPriority(todo.priority);
                setIsEditing(false);
              }}
              className="rounded border border-gray-300 px-3 py-1 hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        </form>
      </li>
    );
  }

  return (
    <li
      ref={setNodeRef}
      style={style}
      className="flex items-center justify-between rounded-lg border border-gray-300 bg-white px-3 py-2"
    >
      <div className="flex items-center gap-2">
        {dragHandle}
        <input
          type="checkbox"
          checked={todo.done}
          onChange={() => onToggleDone(todo.id)}
          className="h-4 w-4"
        />
        <span
          className={`rounded px-2 py-0.5 text-xs font-medium ${PRIORITY_STYLES[todo.priority]}`}
        >
          {todo.priority}
        </span>
        <div className="flex flex-col">
          <span>{todo.task}</span>
          <span className="text-xs text-gray-500">{todo.goal}</span>
        </div>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => setIsEditing(true)}
          className="text-sm text-blue-600 hover:underline"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(todo.id)}
          className="text-sm text-red-500 hover:underline"
        >
          Delete
        </button>
      </div>
    </li>
  );
}
