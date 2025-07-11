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

export const addTask = () => {
  return useMutation({
    mutationKey: ['add-task'],
    mutationFn: taskAPI.createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      enqueueSnackbar('Task added!', { variant: 'success' });
    },
    onError: () => {
      enqueueSnackbar('Failed to create new task', { variant: 'error' });
    },
  });
};

export const usePatchTask = () => {
  return useMutation({
    mutationKey: ['patch-task'],
    mutationFn: taskAPI.updatePartialTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
    onError: () => {
      enqueueSnackbar('Faild to update task', { variant: 'error' });
    },
  });
};
