import type { SelectedTaskForm, TaskRequest } from '@app-types/task';
import TaskItem from '@components/Task';
import TaskEditor from '@components/Task/TaskEditor';
import { useAddTask, useTaskDefaults, useTasks, useUpdateTask } from '@hooks/useTask';
import { Add } from '@mui/icons-material';
import { Box, Container, IconButton, List, Stack, Typography } from '@mui/material';
import { useState } from 'react';

function InboxPage() {
  const { data: inboxTasks } = useTasks({ inbox: true });
  const defaultInboxValues = useTaskDefaults('inbox');
  const [selectedTask, setSelectedTask] = useState<SelectedTaskForm | undefined>(undefined);
  const [open, setOpen] = useState(false);
  const { mutateAsync: mutateAsyncAdd, isPending: isPendingAdd } = useAddTask();
  const { mutateAsync: mutateAsyncUpdate, isPending: isPendingUpdate } = useUpdateTask();

  const handleSubmit = async (data: TaskRequest) => {
    try {
      if (selectedTask) {
        const updateData = {
          id: selectedTask.id,
          task: data,
        };
        await mutateAsyncUpdate(updateData);
        setOpen(false);
      } else {
        await mutateAsyncAdd(data);
      }
    } catch (e) {
      console.error('Error: ', e);
    }
  };

  const handleAddTask = () => {
    setSelectedTask(undefined);
    setOpen(true);
  };

  const handleCloseEditor = () => setOpen(false);
  const handleEdit = (data: SelectedTaskForm) => {
    setOpen(true);
    setSelectedTask(data);
  };

  return (
    <div>
      <Container
        disableGutters
        maxWidth={false}
        sx={{
          width: '100%',
          mx: 'auto',
          position: 'relative',
        }}
      >
        <Typography variant="h1">Inbox</Typography>
        <div>
          <List component="div">
            {inboxTasks?.map((task) => (
              <TaskItem key={task.id} task={task} onEdit={handleEdit} />
            ))}
          </List>
        </div>
        <Stack direction="row" sx={{ alignItems: 'center' }}>
          <IconButton size="small" sx={{ mb: 0.5 }} onClick={handleAddTask}>
            <Add sx={{ color: 'primary.main', transform: { xs: 'scale(1.3)', md: 'scale(1)' } }} />
          </IconButton>
          <Typography sx={{ color: '#757575' }}>Add task</Typography>
        </Stack>
        <Box sx={{ mt: -4 }}>
          {open && (
            <TaskEditor
              defaultFormValues={defaultInboxValues}
              initialData={selectedTask}
              onClose={() => handleCloseEditor()}
              onSubmit={handleSubmit}
              isPending={isPendingAdd || isPendingUpdate}
            />
          )}
        </Box>
      </Container>
    </div>
  );
}

export default InboxPage;
