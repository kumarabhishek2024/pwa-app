export type TaskStatus = "pending" | "completed";

export type TaskPriority = "low" | "medium" | "high";

export interface Task {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  date: string;
  priority: TaskPriority;
}