"use client";

import { useState, type FormEvent } from "react";
import type { Priority } from "@/lib/types";

interface TodoFormProps {
  onAdd: (task: string, goal: string, priority: Priority) => void;
}

export default function TodoForm({ onAdd }: TodoFormProps) {
  const [task, setTask] = useState("");
  const [goal, setGoal] = useState("");
  const [priority, setPriority] = useState<Priority>("medium");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmedTask = task.trim();
    const trimmedGoal = goal.trim();
    if (!trimmedTask || !trimmedGoal) return;
    onAdd(trimmedTask, trimmedGoal, priority);
    setTask("");
    setGoal("");
    setPriority("medium");
  }

  return (
    <form onSubmit={handleSubmit} className="mb-6 flex flex-col gap-2">
      <div className="flex gap-2">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="What's the task?"
          required
          className="flex-1 rounded border border-gray-300 bg-white px-3 py-2"
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value as Priority)}
          className="rounded border border-gray-300 bg-white px-2 py-2"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          placeholder="What goal is this a step toward?"
          required
          className="flex-1 rounded border border-gray-300 bg-white px-3 py-2"
        />
        <button
          type="submit"
          className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Add
        </button>
      </div>
    </form>
  );
}
