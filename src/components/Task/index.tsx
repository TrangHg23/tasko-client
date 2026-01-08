import type { ITask, PatchTaskRequest, SelectedTaskForm } from '@app-types/task';
import {
  Check,
  CheckCircle,
  DeleteOutline,
  DriveFileMoveOutlined,
  EditOutlined,
  Event,
  MoreHorizOutlined,
  RadioButtonUnchecked,
} from '@mui/icons-material';
import {
  Box,
  Checkbox,
  Chip,
  IconButton,
  ListItem,
  Menu,
  MenuItem,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { PRIORITY_META } from '@app-types/enum';
import { useDeleteTask, usePatchTask } from '@hooks/useTask';
import { enqueueSnackbar } from 'notistack';
import { mapTaskToForm } from 'src/utils/task';
import ConfirmDeleteDialog from './ConfirmDeleteDialog';
import { format } from 'date-fns';
import CategorySubMenu from './CategorySubMenu';
import { formatVnTime } from 'src/utils/times';

type TaskItemProps = {
  task: ITask;
  onEdit: (task: SelectedTaskForm) => void;
  showDueDate?: boolean;
  showCategory?: boolean;
};

function TaskItem({ task, onEdit, showDueDate, showCategory }: TaskItemProps) {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('md'));
  const [checked, setChecked] = useState(false);
  const [visible, setVisible] = useState(true);
  const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);
  const { mutateAsync } = usePatchTask();
  const { mutateAsync: mutateAsyncDelete } = useDeleteTask();

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [subAnchorEl, setSubAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);

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

  const handleCloseCategorySub = async (categoryId?: string | null, categoryName?: string) => {
    setSubAnchorEl(null);
    const moveTaskRequest: PatchTaskRequest = {
      id: task.id,
      task: { categoryId: categoryId },
    };
    try {
      await mutateAsync(moveTaskRequest);
      enqueueSnackbar(`Task is moved to ${categoryName ?? 'Inbox'}`, { variant: 'success' });
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
            <ListItem sx={{ py: 0.5, pl: 0, borderBottom: '1px solid #eee' }}>
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
                  p: 1,
                  '&:hover .hover-buttons': {
                    opacity: 1,
                    pointerEvents: 'auto',
                  },
                  '&:hover .more-btn': {
                    opacity: 1,
                    pointerEvents: 'auto',
                  },
                  '&:hover .edit-delete': {
                    opacity: 1,
                    pointerEvents: 'auto',
                  },
                }}
              >
                <Stack direction={'row'} spacing={2} alignItems={'center'}>
                  <Stack spacing={0.2}>
                    <Typography>{task.title}</Typography>
                    <Typography variant="body2">{task.description}</Typography>
                    <Stack
                      direction="row"
                      spacing={0.5}
                      sx={{ color: task.overdue ? 'error.main' : '#9C27B0' }}
                    >
                      {showDueDate && task.dueDate && (
                        <Stack direction="row" spacing={0.5} alignItems="center">
                          <Event sx={{ fontSize: '13px' }} />
                          <Typography variant="caption">
                            {format(new Date(task.dueDate), 'MMM dd')}
                          </Typography>
                        </Stack>
                      )}
                      <Typography variant="caption">
                        {task.dueType == 'DATE_TIME' && formatVnTime(task.dueDateTime)}
                      </Typography>
                    </Stack>
                  </Stack>
                  {showCategory && (
                    <Chip
                      label={task?.category?.name ?? 'Inbox'}
                      variant="outlined"
                      color="primary"
                      size="small"
                      sx={{ ml: 1, fontSize: '10px' }}
                    />
                  )}
                </Stack>

                {/* actions */}
                <Stack
                  direction="row"
                  className="hover-buttons"
                  sx={{
                    opacity: 1,
                    pointerEvents: 'auto',
                    transition: 'opacity 0.2s ease',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'relative',
                    ml: 'auto',
                  }}
                >
                  {!isSmall && (
                    <Box
                      className="edit-delete"
                      sx={{
                        opacity: 0,
                        pointerEvents: 'none',
                        transition: 'opacity 0.2s',
                      }}
                    >
                      <IconButton
                        sx={{ padding: '0.25rem', p: { md: 0.5 } }}
                        onClick={() => onEdit(mapTaskToForm(task))}
                      >
                        <EditOutlined />
                      </IconButton>
                      <IconButton
                        sx={{ padding: '0.25rem', p: { md: 0.5 } }}
                        onClick={() => setOpenDeleteConfirm(true)}
                      >
                        <DeleteOutline />
                      </IconButton>
                    </Box>
                  )}
                  <IconButton
                    className={`more-btn ${open ? 'is-active' : ''}`}
                    onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                      setAnchorEl(event.currentTarget);
                    }}
                    sx={{
                      opacity: { xs: 1, md: 0 },
                      pointerEvents: { xs: 'auto', md: 'none' },
                      transition: 'opacity 0.2s',
                      '&.is-active': {
                        opacity: '1 !important',
                        pointerEvents: 'auto !important',
                      },
                    }}
                  >
                    <MoreHorizOutlined />
                  </IconButton>
                </Stack>
              </Stack>
            </ListItem>

            <Menu
              id="option-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={() => setAnchorEl(null)}
              sx={{ mt: -1 }}
            >
              <MenuItem onClick={() => onEdit(mapTaskToForm(task))}>
                <EditOutlined sx={{ mr: 1 }} />
                Edit
              </MenuItem>

              <MenuItem
                sx={{ '&:hover': { color: 'secondary.main' } }}
                onClick={(e) => {
                  setSubAnchorEl(e.currentTarget as HTMLElement);
                }}
                disableRipple
              >
                <DriveFileMoveOutlined sx={{ mr: 1 }} /> Move task to...
              </MenuItem>

              <MenuItem onClick={() => setOpenDeleteConfirm(true)} sx={{ color: 'error.main' }}>
                <DeleteOutline sx={{ mr: 1 }} />
                Delete
              </MenuItem>
            </Menu>

            <ConfirmDeleteDialog
              open={openDeleteConfirm}
              handleClose={() => setOpenDeleteConfirm(false)}
              onConfirm={() => handleDeleteTask(task.id)}
              taskTitle={task.title}
            />

            <CategorySubMenu
              anchorEl={subAnchorEl}
              onCloseMenu={() => setSubAnchorEl(null)}
              onSelectCategory={(categoryId, categoryName) => {
                handleCloseCategorySub(categoryId, categoryName);
              }}
            />
          </Box>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default TaskItem;
