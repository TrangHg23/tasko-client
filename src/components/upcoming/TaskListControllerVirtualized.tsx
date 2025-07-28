import { useLayoutEffect } from 'react';
import type { ITask, TaskFormValues } from '@app-types/task';
import { useTaskEditor } from '@hooks/useTask';
import TaskListSection from '@components/Task/TaskListSection';

type Props = {
  date: Date;
  tasks?: ITask[];
  title?: string;
  defaultFormValues: TaskFormValues;
  allowAdd?: boolean;
  showDueDate?: boolean;
  onHeightChange?: () => void;
};

export default function TaskListControllerVirtualized({
  tasks,
  title,
  defaultFormValues,
  allowAdd = true,
  showDueDate,
  onHeightChange,
}: Props) {
  const {
    selectedTask,
    open,
    handleAddNew,
    handleEdit,
    handleCloseEditor,
    handleSubmit,
    isPendingAdd,
    isPendingUpdate,
  } = useTaskEditor();

  useLayoutEffect(() => {
    if (open) {
      let raf = requestAnimationFrame(() => onHeightChange?.());
      return () => cancelAnimationFrame(raf);
    }
  }, [open, tasks?.length]);

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
