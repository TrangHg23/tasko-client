import { type Category } from '@app-types/auth';
import { queryClient } from '@lib/queryClient';
import { useMutation, useQuery } from '@tanstack/react-query';
import { enqueueSnackbar } from 'notistack';
import { categoryAPI } from 'src/services/category';

export const useCategories = () => {
  return useQuery<Category[]>({
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
