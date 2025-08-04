import { Add } from '@mui/icons-material';
import { Box, List, Stack, Typography, IconButton } from '@mui/material';
import TaskEditor from './TaskEditor';
import type { ITask, SelectedTaskForm, TaskFormValues, TaskRequest } from '@app-types/task';
import TaskItem from '.';

type TaskListSectionProps = {
  tasks?: ITask[];
  title?: string;
  defaultFormValues: TaskFormValues;
  selectedTask?: SelectedTaskForm;
  open: boolean;
  onSubmit: (data: TaskRequest) => Promise<void>;
  isPendingAdd: boolean;
  isPendingUpdate: boolean;
  onEdit: (task: SelectedTaskForm) => void;
  onAddNew: () => void;
  onCloseEditor: () => void;
  allowAdd?: boolean;
  showDueDate?: boolean;
  showCategory?: boolean;
};

export default function TaskListSection({
  tasks,
  title,
  defaultFormValues,
  selectedTask,
  open,
  onSubmit,
  isPendingAdd,
  isPendingUpdate,
  onEdit,
  onAddNew,
  onCloseEditor,
  allowAdd,
  showDueDate,
  showCategory,
}: TaskListSectionProps) {
  return (
    <Box>
      {title && (
        <Typography variant="subtitle2" fontWeight="bold" color="primary" mt={2}>
          {title}
        </Typography>
      )}

      <List disablePadding>
        {tasks?.map((task) => (
          <Box key={task.id}>
            <TaskItem
              task={task}
              onEdit={onEdit}
              showDueDate={showDueDate}
              showCategory={showCategory}
            />
            {selectedTask?.id === task.id && (
              <Box my={1} width="100%" zIndex={1} position="relative" border="1px solid #fff">
                <TaskEditor
                  defaultFormValues={defaultFormValues}
                  initialData={selectedTask}
                  onClose={onCloseEditor}
                  onSubmit={onSubmit}
                  isPending={isPendingUpdate}
                />
              </Box>
            )}
          </Box>
        ))}
      </List>

      {allowAdd && (
        <>
          <Stack direction="row" alignItems="center" mt={2}>
            <IconButton size="small" onClick={onAddNew}>
              <Add
                sx={{
                  color: 'primary.main',
                  transform: { xs: 'scale(1.3)', md: 'scale(1)' },
                }}
              />
            </IconButton>
            <Typography sx={{ color: '#757575' }}>Add task</Typography>
          </Stack>
          {open && !selectedTask && (
            <Box mt={-4} width="100%" zIndex={1} position="relative" border="1px solid #fff">
              <TaskEditor
                defaultFormValues={defaultFormValues}
                initialData={undefined}
                onClose={onCloseEditor}
                onSubmit={onSubmit}
                isPending={isPendingAdd}
              />
            </Box>
          )}
        </>
      )}
    </Box>
  );
}
