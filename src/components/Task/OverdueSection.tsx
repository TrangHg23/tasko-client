import type { ITask, TaskFormValues } from '@app-types/task';
import { Box, IconButton, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import TaskListController from './TaskListController';

type Props = {
  overdueTasks: ITask[] | undefined;
  defaultFormValues: TaskFormValues;
};

export default function OverdueSection({ overdueTasks, defaultFormValues }: Props) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Box sx={{ mt: 2 }}>
      <Stack direction="row" alignItems={'center'} sx={{ borderBottom: '1px solid #eee' }}>
        <Typography variant="subtitle2" fontWeight="bold" color="primary">
          Overdue ({overdueTasks?.length})
        </Typography>
        <IconButton
          onClick={() => setExpanded((prev) => !prev)}
          sx={{ color: 'primary.main', fontWeight: 'bold' }}
        >
          {expanded ? <ExpandLess /> : <ExpandMore />}
        </IconButton>
      </Stack>

      {expanded && (
        <TaskListController
          tasks={overdueTasks}
          defaultFormValues={defaultFormValues}
          allowAdd={false}
          showDueDate={true}
        />
      )}
    </Box>
  );
}
