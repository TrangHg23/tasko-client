import type { ITask, SelectedTaskForm, TaskFormValues, TaskRequest } from '@app-types/task';
import { format, parseISO } from 'date-fns';

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

export const mapTaskToForm = (task: ITask): SelectedTaskForm => {
  let dueDate: Date | null = null;
  let dueTime: string | null = null;

  if (task.dueType === 'DATE_TIME' && task.dueDateTime) {
    const dateTime = parseISO(task.dueDateTime);

    dueDate = dateTime;
    dueTime = format(dateTime, 'HH:mm');
  } else if (task.dueDate) {
    dueDate = parseISO(task.dueDate);
    dueTime = null;
  }

  return {
    id: task.id,
    title: task.title,
    description: task.description,
    dueType: task.dueType,
    dueDate,
    dueTime,
    priority: task.priority,
    categoryId: task.category?.id,
  };
};
