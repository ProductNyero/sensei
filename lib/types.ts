export type Priority = "low" | "medium" | "high";

export interface Todo {
  id: string;
  task: string;
  goal: string;
  priority: Priority;
  done: boolean;
  order: number;
}
