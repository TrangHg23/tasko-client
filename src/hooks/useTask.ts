import { taskAPI } from './../services/task';
import type { GetTasksParams, ITask } from '@app-types/task';
import { useQuery } from '@tanstack/react-query';

export const useTasks = (params: GetTasksParams) => {
  return useQuery<ITask[]>({
    queryKey: ['tasks', params],
    queryFn: () => taskAPI.getTasks(params),
  });
};
