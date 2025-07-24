import { PriorityLevel } from '@app-types/enum';
import { taskAPI } from './../services/task';
import type { GetTasksParams, ITask } from '@app-types/task';
import { queryClient } from '@lib/queryClient';
import { useMutation, useQuery } from '@tanstack/react-query';
import { enqueueSnackbar } from 'notistack';

export const useTasks = (params: GetTasksParams) => {
  return useQuery<ITask[]>({
    queryKey: ['tasks', params],
    queryFn: () => taskAPI.getTasks(params),
  });
};

export const useCountTask = () => {
  return useQuery({
    queryKey: ['taskCount'],
    queryFn: taskAPI.countTask,
  });
};

export const useAddTask = () => {
  return useMutation({
    mutationKey: ['addTask'],
    mutationFn: taskAPI.createTask,
    onSuccess: () => {
      ['tasks', 'taskCount'].forEach((key) => queryClient.invalidateQueries({ queryKey: [key] }));
      enqueueSnackbar('Task added!', { variant: 'success' });
    },
    onError: () => {
      enqueueSnackbar('Failed to create new task', { variant: 'error' });
    },
  });
};

export const usePatchTask = () => {
  return useMutation({
    mutationKey: ['patchTask'],
    mutationFn: taskAPI.updatePartialTask,
    onSuccess: () => {
      ['tasks', 'taskCount'].forEach((key) => queryClient.invalidateQueries({ queryKey: [key] }));
    },
    onError: () => {
      enqueueSnackbar('Faild to update task', { variant: 'error' });
    },
  });
};

export const useUpdateTask = () => {
  return useMutation({
    mutationKey: ['updateTask'],
    mutationFn: taskAPI.updateTask,
    onSuccess: () => {
      ['tasks', 'taskCount'].forEach((key) => queryClient.invalidateQueries({ queryKey: [key] }));
    },
    onError: () => {
      enqueueSnackbar('Faild to update task', { variant: 'error' });
    },
  });
};

export const useDeleteTask = () => {
  return useMutation({
    mutationKey: ['deleteTask'],
    mutationFn: taskAPI.deleteTask,
    onSuccess: () => {
      ['tasks', 'taskCount'].forEach((key) => queryClient.invalidateQueries({ queryKey: [key] }));
    },
    onError: () => {
      enqueueSnackbar('Faild to delete task', { variant: 'error' });
    },
  });
};

export const useTaskDefaults = (context?: 'today' | 'inbox' | 'category', categoryId?: string) => {
  const today = new Date();

  switch (context) {
    case 'inbox':
      return { title: '', description: '', dueDate: null, priority: PriorityLevel.LOW };
    case 'today':
      return { title: '', description: '', dueDate: today, priority: PriorityLevel.LOW };
    case 'category':
      return { title: '', description: '', dueDate: null, priority: PriorityLevel.LOW, categoryId };
    default:
      return { title: '', description: '', dueDate: null, priority: PriorityLevel.LOW };
  }
};
