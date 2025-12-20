import { PriorityLevel } from '@app-types/enum';
import { taskAPI } from './../services/task';
import type { GetTasksParams, ITask, SelectedTaskForm, TaskRequest } from '@app-types/task';
import { queryClient } from '@lib/queryClient';
import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { enqueueSnackbar } from 'notistack';
import { useState } from 'react';

export const useTasks = (params: GetTasksParams) => {
  return useQuery<ITask[]>({
    queryKey: ['tasks', params],
    queryFn: () => taskAPI.getTasks(params),
  });
};

export const useUpcomingTasks = (dueDates: string[]) => {
  return useQuery({
    queryKey: ['tasks', dueDates],
    queryFn: () => taskAPI.getTasksByDateList({ dueDates }),
    placeholderData: keepPreviousData,
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
      ['tasks', 'taskCount', 'categories'].forEach((key) =>
        queryClient.invalidateQueries({ queryKey: [key] })
      );
      enqueueSnackbar('Task added!', { variant: 'success' });
    },
    onError: () => {
      enqueueSnackbar('Failed to create new task', { variant: 'error' });
    },
  });
};

export const usePatchTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['patchTask'],
    mutationFn: taskAPI.updatePartialTask,
    onSuccess: () => {
      ['tasks', 'taskCount', 'categories'].forEach((key) =>
        queryClient.invalidateQueries({ queryKey: [key] })
      );
    },
    onError: () => {
      enqueueSnackbar('Failed to update task', { variant: 'error' });
    },
  });
};

export const useUpdateTask = () => {
  return useMutation({
    mutationKey: ['updateTask'],
    mutationFn: taskAPI.updateTask,
    onSuccess: () => {
      ['tasks', 'taskCount', 'categories'].forEach((key) =>
        queryClient.invalidateQueries({ queryKey: [key] })
      );
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
      ['tasks', 'taskCount', 'categories'].forEach((key) =>
        queryClient.invalidateQueries({ queryKey: [key] })
      );
    },
    onError: () => {
      enqueueSnackbar('Faild to delete task', { variant: 'error' });
    },
  });
};

type TaskDefaultsContext =
  | { context: 'inbox' }
  | { context: 'dueDate'; dueDate: Date }
  | { context: 'category'; categoryId: string };

export const useTaskDefaults = (ctx?: TaskDefaultsContext) => {
  const baseDefaults = {
    title: '',
    description: '',
    dueDate: null,
    dueTime: null,
    priority: PriorityLevel.LOW,
  };

  switch (ctx?.context) {
    case 'inbox':
      return baseDefaults;
    case 'dueDate':
      return {
        ...baseDefaults,
        dueDate: ctx.dueDate ?? null,
      };
    case 'category':
      return {
        ...baseDefaults,
        categoryId: ctx.categoryId,
      };
    default:
      return baseDefaults;
  }
};

export const useTaskEditor = () => {
  const [open, setOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<SelectedTaskForm | undefined>();

  const { mutateAsync: addTask, isPending: isPendingAdd } = useAddTask();
  const { mutateAsync: updateTask, isPending: isPendingUpdate } = useUpdateTask();

  const handleSubmit = async (data: TaskRequest) => {
    try {
      if (selectedTask) {
        await updateTask({ id: selectedTask.id, task: data });
        setSelectedTask(undefined);
        setOpen(false);
      } else {
        await addTask(data);
      }
    } catch (e) {
      console.error('Error:', e);
    }
  };

  const handleEdit = (task: SelectedTaskForm) => {
    setSelectedTask(task);
    setOpen(true);
  };

  const handleAddNew = () => {
    setSelectedTask(undefined);
    setOpen(true);
  };

  const handleCloseEditor = () => {
    setSelectedTask(undefined);
    setOpen(false);
  };
  return {
    open,
    selectedTask,
    isPendingAdd,
    isPendingUpdate,
    handleSubmit,
    handleEdit,
    handleAddNew,
    handleCloseEditor,
  };
};
