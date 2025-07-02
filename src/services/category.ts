import type { CategoryRequest, UpdateCategoryRequest } from '@app-types/category';
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

  updateCategory: async (data: UpdateCategoryRequest) => {
    const res = await apiClient.put(`/categories/${data.id}`, data.category);
    return res.data;
  },

  deleteCategory: async (id: string) => {
    await apiClient.delete(`/categories/${id}`);
  },
};
