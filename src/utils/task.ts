import type { ITask, SelectedTaskForm, TaskFormValues, TaskRequest } from '@app-types/task';
import { parseISO } from 'date-fns';

export function convertFormToTaskRequest(form: TaskFormValues): TaskRequest {
  const taskRequest: TaskRequest = {
    ...form,

    dueDate: form.dueType === 'DATE' && form.dueDate ? formatLocalDate(form.dueDate) : undefined,

    dueDateTime:
      form.dueType === 'DATE_TIME' && form.dueDate && form.dueTime
        ? new Date(`${formatLocalDate(form.dueDate)}T${form.dueTime}:00`).toISOString()
        : undefined,
  };

  return taskRequest;
}

const formatLocalDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

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
