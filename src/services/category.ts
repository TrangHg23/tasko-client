import type { CategoryRequest } from '@app-types/auth';
import apiClient from '@lib/axios';

export const categoryAPI = {
  getAllCategories: async () => {
    const res = await apiClient.get('/categories');
    return res.data;
  },

  addCategory: async (data: CategoryRequest) => {
    const res = await apiClient.post('/categories', data);
    return res.data;
  },
};
