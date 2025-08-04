import type { ITask, TaskFormValues } from '@app-types/task';
import { useTaskEditor } from '@hooks/useTask';
import TaskListSection from './TaskListSection';

type Props = {
  tasks?: ITask[];
  title?: string;
  defaultFormValues: TaskFormValues;
  allowAdd?: boolean;
  showDueDate?: boolean;
  showCategory?: boolean;
};

export default function TaskListController({
  tasks,
  title,
  defaultFormValues,
  allowAdd = true,
  showDueDate,
  showCategory = false,
}: Props) {
  const {
    selectedTask,
    open,
    handleEdit,
    handleAddNew,
    handleCloseEditor,
    handleSubmit,
    isPendingAdd,
    isPendingUpdate,
  } = useTaskEditor();

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
      showCategory={showCategory}
    />
  );
}
