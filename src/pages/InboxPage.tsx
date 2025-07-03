import TaskItem from '@components/Task';
import { useTasks } from '@hooks/useTask';
import { Add } from '@mui/icons-material';
import { Container, IconButton, List, Stack, Typography } from '@mui/material';

function InboxPage() {
  const { data: todayTasks } = useTasks({ inbox: true });

  return (
    <Container maxWidth={false} sx={{ mt: 6, maxWidth: '948px', width: '100%', mx: 'auto', px: 2 }}>
      <Typography variant="h1">Inbox</Typography>
      <div>
        <List component="div">
          {todayTasks?.map((task) => (
            <TaskItem key={task.id} {...task} />
          ))}
        </List>
      </div>
      <Stack direction="row" sx={{ alignItems: 'center' }}>
        <IconButton size="small" sx={{ mb: 0.5 }}>
          <Add sx={{ color: 'primary.main' }} />
        </IconButton>
        <Typography sx={{ color: '#757575' }}>Add task</Typography>
      </Stack>
    </Container>
  );
}

export default InboxPage;
