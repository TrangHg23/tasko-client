import type { ICategory } from './category';

export interface ITask {
  id: string;
  title: string;
  description?: string;
  dueDate: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
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
  due?: string;
  status?: string;
}
