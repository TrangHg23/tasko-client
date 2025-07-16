import type { ITask, PatchTaskRequest, SelectedTaskForm } from '@app-types/task';
import {
  Check,
  CheckCircle,
  DeleteOutline,
  EditOutlined,
  RadioButtonUnchecked,
} from '@mui/icons-material';
import { Box, Checkbox, Divider, IconButton, ListItem, Stack, Typography } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { PRIORITY_META } from '@app-types/enum';
import { useDeleteTask, usePatchTask } from '@hooks/useTask';
import { enqueueSnackbar } from 'notistack';
import { mapTaskToForm } from 'src/utils/task';
import ConfirmDeleteDialog from './ConfirmDeleteDialog';

type TaskItemProps = {
  task: ITask;
  onEdit: (task: SelectedTaskForm) => void;
};

function TaskItem({ task, onEdit }: TaskItemProps) {
  const [checked, setChecked] = useState(false);
  const [visible, setVisible] = useState(true);
  const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);
  const { mutateAsync } = usePatchTask();
  const { mutateAsync: mutateAsyncDelete } = useDeleteTask();

  const handleChange = async () => {
    const completeRequest: PatchTaskRequest = {
      id: task.id,
      task: { isCompleted: true },
    };
    try {
      await mutateAsync(completeRequest);
      setChecked(true);
      setTimeout(() => setVisible(false), 300);
      enqueueSnackbar('Task completed', { variant: 'success' });
    } catch (e) {
      console.error('Error: ', e);
    }
  };

  const handleDeleteTask = async (id: string) => {
    try {
      await mutateAsyncDelete(id);
    } catch (e) {
      console.error('Error: ', e);
    }
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1, height: 'auto' }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, height: 0, margin: 0, padding: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Box
            sx={{
              '&:hover': {
                backgroundColor: 'rgba(178, 226, 255, 0.18)',
              },
            }}
          >
            <ListItem sx={{ py: 0.5, pl: 0 }}>
              <Checkbox
                checked={checked}
                onChange={handleChange}
                sx={{
                  transform: { xs: 'scale(1.3)', md: 'scale(1)' },
                  padding: 0.5,
                  position: 'relative',
                  '&:hover .check-icon': {
                    opacity: 1,
                  },
                }}
                icon={
                  <Box component="span" sx={{ display: 'inline-flex' }}>
                    <RadioButtonUnchecked
                      className="circle-icon"
                      sx={{ color: PRIORITY_META[task.priority].color }}
                    />
                    <Check
                      className="check-icon"
                      sx={{
                        color: PRIORITY_META[task.priority].color,
                        transform: 'scale(0.7)',
                        position: 'absolute',
                        opacity: 0,
                        transition: 'opacity 0.2s',
                      }}
                    />
                  </Box>
                }
                checkedIcon={<CheckCircle sx={{ color: PRIORITY_META[task.priority].color }} />}
                disableRipple
                slotProps={{
                  input: {
                    'aria-label': 'controlled',
                  },
                }}
              />

              <Stack
                direction="row"
                sx={{
                  justifyContent: 'space-between',
                  width: '100%',
                  py: 1,
                  px: 1,
                  '&:hover .hover-buttons': {
                    opacity: 1,
                    visibility: 'visible',
                  },
                }}
              >
                <Stack spacing={0.2} justifyContent={'center'}>
                  <Typography>{task.title}</Typography>
                  <Typography variant="body2">{task.description}</Typography>
                </Stack>
                <Stack
                  direction="row"
                  className="hover-buttons"
                  sx={{
                    opacity: { xs: 1, md: 0 },
                    visibility: { xs: 'visible', md: 'hidden' },
                    transition: 'opacity 0.2s ease',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <IconButton
                    sx={{ padding: '0.25rem', p: { xs: 1, md: 0.5 } }}
                    onClick={() => onEdit(mapTaskToForm(task))}
                  >
                    <EditOutlined />
                  </IconButton>
                  <IconButton
                    sx={{ padding: '0.25rem', p: { xs: 1, md: 0.5 } }}
                    onClick={() => setOpenDeleteConfirm(true)}
                  >
                    <DeleteOutline />
                  </IconButton>
                  <ConfirmDeleteDialog
                    open={openDeleteConfirm}
                    handleClose={() => setOpenDeleteConfirm(false)}
                    onConfirm={() => handleDeleteTask(task.id)}
                    taskTitle={task.title}
                  />
                </Stack>
              </Stack>
            </ListItem>
            <Divider />
          </Box>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default TaskItem;
