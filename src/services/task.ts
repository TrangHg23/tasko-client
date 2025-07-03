import type { GetTasksParams } from '@app-types/task';
import apiClient from '@lib/axios';

export const taskAPI = {
  getTasks: async (params: GetTasksParams) => {
    const res = await apiClient.get('/tasks', { params });
    return res.data;
  },
};
