"use client";

import { useTodos } from "@/hooks/useTodos";
import TodoForm from "@/components/TodoForm";
import TodoList from "@/components/TodoList";

export default function TodoApp() {
  const { todos, addTodo, editTodo, deleteTodo, toggleDone, reorderTodos } =
    useTodos();

  return (
    <div>
      <TodoForm onAdd={addTodo} />
      <TodoList
        todos={todos}
        onEdit={editTodo}
        onDelete={deleteTodo}
        onToggleDone={toggleDone}
        onReorder={reorderTodos}
      />
    </div>
  );
}
