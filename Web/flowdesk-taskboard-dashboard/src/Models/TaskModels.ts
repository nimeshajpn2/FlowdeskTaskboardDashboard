// src/models/TaskModels.ts

export type TaskStatus = "ToDo" | "InProgress" | "Done";

export interface Task {
  id: number;
  title: string;
  description?: string;
  assignedToUserId?: number;
  priority?: string;
  dueDate: string;
  status: TaskStatus;
  isArchived: boolean;
  createdAt: string;
  projectId: number;
}

export interface CreateTaskViewModel {
  title: string;
  description?: string;
  assignedToUserId?: number;
  priority?: string;
  dueDate: string; // ISO string
  projectId: number;
}

export interface UpdateTaskViewModel {
  title?: string;
  description?: string;
  assignedToUserId?: number;
  priority?: string;
  dueDate?: string; // ISO string
  projectId?: number;
}

export interface UpdateStatusViewModel {
  status: TaskStatus;
}

export interface TaskResponse<T = Task | Task[]> {
  message: string;
  data?: T;
}