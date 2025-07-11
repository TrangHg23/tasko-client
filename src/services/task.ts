import type { GetTasksParams, PatchTaskRequest, TaskRequest } from '@app-types/task';
import apiClient from '@lib/axios';

export const taskAPI = {
  getTasks: async (params: GetTasksParams) => {
    const res = await apiClient.get('/tasks', { params });
    return res.data;
  },

  createTask: async (data: TaskRequest) => {
    const res = await apiClient.post('/tasks', data);
    return res.data;
  },

  updatePartialTask: async (data: PatchTaskRequest) => {
    const res = await apiClient.patch(`/tasks/${data.id}`, data.task);
    return res.data;
  },
};
