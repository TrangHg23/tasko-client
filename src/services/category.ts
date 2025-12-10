import type { CategoryRequest, ICategory, UpdateCategoryRequest } from '@app-types/category';
import apiClient from '@lib/axios';

export const categoryAPI = {
  getAllCategories: () => apiClient.get<ICategory[]>('/categories'),

  addCategory: (data: CategoryRequest) => apiClient.post('/categories', data),

  updateCategory: (data: UpdateCategoryRequest) =>
    apiClient.put(`/categories/${data.id}`, data.category),

  deleteCategory: (id: string) => apiClient.delete(`/categories/${id}`),
};
