import type { GetTasksParams, TaskRequest } from '@app-types/task';
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
};
