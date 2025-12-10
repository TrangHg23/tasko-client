import type {
  GetTasksParams,
  ITask,
  PatchTaskRequest,
  TaskRequest,
  UpdateTaskRequest,
} from '@app-types/task';
import apiClient from '@lib/axios';
import qs from 'qs';

export const taskAPI = {
  getTasks: (params: GetTasksParams) => apiClient.get('/tasks', { params }),

  getTasksByDateList: (params: { dueDates: string[] }) =>
    apiClient.get('/tasks/due-date-groups', {
      params,
      paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'repeat' }),
    }) as Promise<Record<string, ITask[]>>,

  createTask: (data: TaskRequest) => apiClient.post('/tasks', data),

  updatePartialTask: (data: PatchTaskRequest) => apiClient.patch(`/tasks/${data.id}`, data.task),

  updateTask: (data: UpdateTaskRequest) => apiClient.put(`/tasks/${data.id}`, data.task),

  deleteTask: (id: string) => apiClient.delete(`/tasks/${id}`),

  countTask: () => apiClient.get('/tasks/count'),
};
