import type { ITask, SelectedTaskForm } from '@app-types/task';
import { Box, IconButton, List, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import TaskItem from '.';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

type Props = {
  tasks: ITask[] | undefined;
  handleEdit: (data: SelectedTaskForm) => void;
};

export default function OverdueTask({ tasks, handleEdit }: Props) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Box sx={{ mt: 2 }}>
      <Stack direction="row" alignItems={'center'} sx={{ borderBottom: '1px solid #eee' }}>
        <Typography variant="subtitle2" fontWeight="bold" color="primary">
          Overdue ({tasks?.length})
        </Typography>
        <IconButton
          onClick={() => setExpanded((prev) => !prev)}
          sx={{ color: 'primary.main', fontWeight: 'bold' }}
        >
          {expanded ? <ExpandLess /> : <ExpandMore />}
        </IconButton>
      </Stack>

      {expanded && (
        <List component="div" sx={{ p: 0 }}>
          {tasks?.map((task) => (
            <TaskItem key={task.id} task={task} onEdit={handleEdit} />
          ))}
        </List>
      )}
    </Box>
  );
}
