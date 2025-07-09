import type { TaskRequest } from '@app-types/task';
import TaskItem from '@components/Task';
import TaskEditor from '@components/Task/TaskEditor';
import { addTask, useTasks } from '@hooks/useTask';
import { Add } from '@mui/icons-material';
import { Box, Container, IconButton, List, Stack, Typography } from '@mui/material';
import { useState } from 'react';

function InboxPage() {
  const { data: todayTasks } = useTasks({ inbox: true });
  const [open, setOpen] = useState(false);
  const { mutateAsync: mutateAsyncAdd, isPending: isPendingAdd } = addTask();
  const handleSubmit = async (data: TaskRequest) => {
    try {
      await mutateAsyncAdd(data);
    } catch (e) {
      console.error('Error: ', e);
    }
  };

  const handleAddTask = () => {
    setOpen(true);
  };

  const handleCloseEditor = () => setOpen(false);

  return (
    <div>
      <Container
        disableGutters
        maxWidth={false}
        sx={{
          mt: 6,
          maxWidth: '800px',
          width: '100%',
          mx: 'auto',
          position: 'relative',
          mb: '300px',
        }}
      >
        <Typography variant="h1">Inbox</Typography>
        <div>
          <List component="div">
            {todayTasks?.map((task) => (
              <TaskItem key={task.id} {...task} />
            ))}
          </List>
        </div>
        <Stack direction="row" sx={{ alignItems: 'center' }}>
          <IconButton size="small" sx={{ mb: 0.5 }} onClick={handleAddTask}>
            <Add sx={{ color: 'primary.main' }} />
          </IconButton>
          <Typography sx={{ color: '#757575' }}>Add task</Typography>
        </Stack>
        <Box sx={{ mt: -4 }}>
          {open && (
            <TaskEditor
              onClose={() => handleCloseEditor()}
              onSubmit={handleSubmit}
              isPending={isPendingAdd}
            />
          )}
        </Box>
      </Container>
    </div>
  );
}

export default InboxPage;
