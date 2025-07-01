import type { ICategory } from '@app-types/category';
import { queryClient } from '@lib/queryClient';
import { useMutation, useQuery } from '@tanstack/react-query';
import { enqueueSnackbar } from 'notistack';
import { categoryAPI } from 'src/services/category';

export const useCategories = () => {
  return useQuery<ICategory[]>({
    queryKey: ['categories'],
    queryFn: categoryAPI.getAllCategories,
  });
};

export const useAddCategory = () => {
  return useMutation({
    mutationKey: ['add-category'],
    mutationFn: categoryAPI.addCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      enqueueSnackbar('Category created!', { variant: 'success' });
    },
    onError: () => {
      enqueueSnackbar('Failed to create category');
    },
  });
};

export const useUpdateCategory = () => {
  return useMutation({
    mutationKey: ['update-category'],
    mutationFn: categoryAPI.updateCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      enqueueSnackbar('Category updated!', { variant: 'success' });
    },
    onError: () => {
      enqueueSnackbar('Failed to update category');
    },
  });
};
