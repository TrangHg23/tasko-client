import TaskListController from '@components/Task/TaskListController';
import { useTaskDefaults, useTasks } from '@hooks/useTask';
import { Container, Typography } from '@mui/material';

function InboxPage() {
  const { data: inboxTasks } = useTasks({ inbox: true });
  const defaultInboxValues = useTaskDefaults('inbox');

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
        <TaskListController
          tasks={inboxTasks}
          defaultFormValues={defaultInboxValues}
          showDueDate={true}
        />
      </Container>
    </div>
  );
}

export default InboxPage;
