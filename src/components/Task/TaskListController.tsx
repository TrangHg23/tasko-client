import { useState } from 'react';
import type { TaskRequest, SelectedTaskForm, ITask, TaskFormValues } from '@app-types/task';
import { useAddTask, useUpdateTask } from '@hooks/useTask';
import TaskListSection from './TaskListSection';

type Props = {
  tasks?: ITask[];
  title?: string;
  defaultFormValues: TaskFormValues;
  allowAdd?: boolean;
  showDueDate?: boolean;
};

export default function TaskListController({
  tasks,
  title,
  defaultFormValues,
  allowAdd = true,
  showDueDate,
}: Props) {
  const [open, setOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<SelectedTaskForm | undefined>();

  const { mutateAsync: addTask, isPending: isPendingAdd } = useAddTask();
  const { mutateAsync: updateTask, isPending: isPendingUpdate } = useUpdateTask();

  const handleSubmit = async (data: TaskRequest) => {
    try {
      if (selectedTask) {
        await updateTask({ id: selectedTask.id, task: data });
        setSelectedTask(undefined);
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

  return (
    <TaskListSection
      tasks={tasks}
      title={title}
      defaultFormValues={defaultFormValues}
      selectedTask={selectedTask}
      open={open}
      onEdit={handleEdit}
      onAddNew={handleAddNew}
      onCloseEditor={handleCloseEditor}
      onSubmit={handleSubmit}
      isPendingAdd={isPendingAdd}
      isPendingUpdate={isPendingUpdate}
      allowAdd={allowAdd}
      showDueDate={showDueDate}
    />
  );
}
