import type { ITask, SelectedTaskForm } from '@app-types/task';
import { parseISO } from 'date-fns';

export function mapTaskToForm(task: ITask): SelectedTaskForm {
  return {
    id: task.id,
    title: task.title,
    description: task.description,
    dueDate: task.dueDate ? parseISO(task.dueDate) : null,
    priority: task.priority,
    categoryId: task.category?.id,
  };
}
