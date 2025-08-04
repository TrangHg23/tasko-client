import { Container, Typography } from '@mui/material';
import { format } from 'date-fns';
import TaskListController from '@components/Task/TaskListController';
import { useTaskDefaults, useTasks } from '@hooks/useTask';
import OverdueSection from '@components/Task/OverdueSection';

function TodayPage() {
  const today = new Date();
  const todayStr = format(today, 'yyyy-MM-dd');
  const { data: todayTasks } = useTasks({ dueDate: todayStr });
  const { data: overdueTasks } = useTasks({ status: 'overdue' });
  const defaultTodayValues = useTaskDefaults({ context: 'dueDate', dueDate: today });
  const defaultValues = useTaskDefaults();

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
      {overdueTasks?.length && (
        <OverdueSection overdueTasks={overdueTasks} defaultFormValues={defaultValues} />
      )}

      <TaskListController
        tasks={todayTasks}
        title="Tasks for Today"
        defaultFormValues={defaultTodayValues}
        showCategory={true}
      />
    </Container>
  );
}

export default TodayPage;
