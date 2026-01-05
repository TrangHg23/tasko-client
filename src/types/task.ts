import type { ICategory } from './category';
import type { PriorityLevel } from './enum';

type DueType = 'NONE' | 'DATE' | 'DATE_TIME';
export interface ITask {
  id: string;
  title: string;
  description?: string;
  dueType: DueType;
  dueDate: string;
  dueDateTime: string;
  priority: PriorityLevel;
  isCompleted: boolean;
  completedAt?: string | null;
  category?: ICategory | null;
  isInboxTask: boolean;
  isTodayTask: boolean;
  isOverdue: boolean;
}

export interface GetTasksParams {
  inbox?: boolean;
  categoryId?: string;
  dueDate?: string;
  status?: string;
}
export interface TaskFormValues {
  title: string;
  description?: string;
  dueType: DueType;
  dueDate?: Date | null;
  dueTime: string | null;
  priority: PriorityLevel;
  categoryId?: string;
}

export interface TaskRequest {
  title: string;
  description?: string;
  dueType: DueType;
  dueDate?: string; // yyyy-MM-dd
  dueDateTime?: string; // ISO
  priority: PriorityLevel;
  categoryId?: string;
}

export type PatchTaskDto = {
  title?: string;
  description?: string;
  dueDate?: string;
  priority?: number;
  isCompleted?: boolean;
  categoryId?: string | null;
};

export interface PatchTaskRequest {
  id: string;
  task: PatchTaskDto;
}

export type SelectedTaskForm = TaskFormValues & { id: string };

export interface UpdateTaskRequest {
  id: string;
  task: TaskRequest;
}
