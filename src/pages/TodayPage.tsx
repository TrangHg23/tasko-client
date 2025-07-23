import type { SelectedTaskForm, TaskRequest } from '@app-types/task';
import TaskItem from '@components/Task';
import OverdueTask from '@components/Task/OverdueTask';
import TaskEditor from '@components/Task/TaskEditor';
import { useAddTask, useTaskDefaults, useTasks, useUpdateTask } from '@hooks/useTask';
import { Add } from '@mui/icons-material';
import { Box, Container, IconButton, List, Stack, Typography } from '@mui/material';
import { format } from 'date-fns';
import { useState } from 'react';

function TodayPage() {
  const todayStr = format(new Date(), 'yyyy-MM-dd');
  const { data: todayTasks } = useTasks({ dueDate: todayStr });
  const { data: overdueTasks } = useTasks({ status: 'overdue' });
  const defaultTodayValues = useTaskDefaults('today');
  const [open, setOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<SelectedTaskForm | undefined>(undefined);

  const { mutateAsync: mutateAsyncAdd, isPending: isPendingAdd } = useAddTask();
  const { mutateAsync: mutateAsyncUpdate, isPending: isPendingUpdate } = useUpdateTask();

  const handleSubmit = async (data: TaskRequest) => {
    try {
      if (selectedTask) {
        await mutateAsyncUpdate({ id: selectedTask.id, task: data });
        setSelectedTask(undefined);
      } else {
        await mutateAsyncAdd(data);
      }
    } catch (e) {
      console.error('Error: ', e);
    }
  };

  const handleAddTask = () => {
    setOpen(true);
    setSelectedTask(undefined);
  };

  const handleCloseEditor = () => {
    setOpen(false);
    setSelectedTask(undefined);
  };

  const handleEdit = (task: SelectedTaskForm) => {
    setOpen(true);
    setSelectedTask(task);
  };

  return (
    <Container
      disableGutters
      maxWidth={false}
      sx={{
        width: '100%',
        mx: 'auto',
        overflow: 'visible',
        position: 'relative',
      }}
    >
      <Typography variant="h1">Today</Typography>

      <OverdueTask tasks={overdueTasks} handleEdit={handleEdit} />

      <Box sx={{ mt: 4 }}>
        <Typography variant="subtitle2" fontWeight="bold" color="primary">
          Tasks for Today
        </Typography>

        <List component="div" disablePadding>
          {todayTasks?.map((task) => (
            <Box key={task.id}>
              <TaskItem task={task} onEdit={handleEdit} />
              {selectedTask?.id === task.id && (
                <Box mt={1} mb={2}>
                  <TaskEditor
                    defaultFormValues={defaultTodayValues}
                    initialData={selectedTask}
                    onClose={handleCloseEditor}
                    onSubmit={handleSubmit}
                    isPending={isPendingUpdate}
                  />
                </Box>
              )}
            </Box>
          ))}
        </List>
      </Box>

      <Stack direction="row" alignItems="center" mt={2}>
        <IconButton size="small" onClick={handleAddTask}>
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
        <Box mt={2} mb={4}>
          <TaskEditor
            defaultFormValues={defaultTodayValues}
            initialData={undefined}
            onClose={handleCloseEditor}
            onSubmit={handleSubmit}
            isPending={isPendingAdd}
          />
        </Box>
      )}
    </Container>
  );
}

export default TodayPage;
