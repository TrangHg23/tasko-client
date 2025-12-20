import type { SelectedTaskForm, TaskFormValues, TaskRequest } from '@app-types/task';
import { AccessAlarm, Flag } from '@mui/icons-material';
import { Box, Button, Divider, Menu, MenuItem, Paper, Stack, TextField } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { PRIORITY_META, PriorityLevel } from '@app-types/enum';
import { useReminder } from '@hooks/notifications/useReminder';
import DateTimePickerButton from './DateTimePickerButton';

type TaskEditorProps = {
  defaultFormValues: TaskFormValues;
  initialData?: SelectedTaskForm;
  onClose: () => void;
  onSubmit: (data: TaskRequest) => void;
  isPending?: boolean;
};

function TaskEditor({
  defaultFormValues,
  initialData,
  onClose,
  onSubmit,
  isPending,
}: TaskEditorProps) {
  const { control, handleSubmit, watch, reset } = useForm<TaskFormValues>({
    defaultValues: defaultFormValues,
  });

  const { handleReminderClick } = useReminder();

  useEffect(() => {
    if (initialData) {
      reset({ ...initialData });
    }
  }, [initialData]);

  const isValid = !!watch('title')?.trim();
  const isDisabled = !isValid || isPending;

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  const handleSubmitTaskData = (data: TaskFormValues) => {
    console.log('Submitting task data:', data);

    let dueAt: string | null = null;

    if (data.dueDate) {
      if (data.dueTime) {
        const [hours, minutes] = data.dueTime.split(':').map(Number);
        const combined = new Date(data.dueDate);
        combined.setHours(hours, minutes, 0, 0);

        dueAt = combined.toISOString();
      } else {
        dueAt = format(data.dueDate, 'yyyy-MM-dd');
      }
    }

    onSubmit({
      ...data,
      dueAt,
    });

    reset(defaultFormValues);
  };

  return (
    <Paper
      elevation={3}
      sx={{
        width: '100%',
        maxWidth: '800px',
        bgcolor: 'background.default',
        mx: 'auto',
      }}
    >
      <Box component="form" sx={{ p: 1.5 }} onSubmit={handleSubmit(handleSubmitTaskData)}>
        <Stack spacing={0.2}>
          <Controller
            name="title"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                sx={{
                  '& input': {
                    fontWeight: 600,
                    fontSize: '0.875rem',
                  },
                }}
                variant="standard"
                size="small"
                fullWidth
                slotProps={{ input: { disableUnderline: true } }}
                placeholder="Task name"
                {...field}
              />
            )}
          />

          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <TextField
                variant="standard"
                size="small"
                sx={{ '& input': { fontSize: '0.8125rem' } }}
                slotProps={{ input: { disableUnderline: true } }}
                fullWidth
                placeholder="Description"
                {...field}
              />
            )}
          />

          <Stack direction="row" spacing={1} sx={{ pb: 1.2 }}>
            <Controller
              control={control}
              name="dueDate"
              render={({ field }) => (
                <Controller
                  control={control}
                  name="dueTime"
                  render={({ field: timeField }) => (
                    <DateTimePickerButton
                      date={field.value ?? null}
                      time={timeField.value ?? null}
                      onChange={(date, time) => {
                        field.onChange(date);
                        timeField.onChange(time);
                      }}
                    />
                  )}
                />
              )}
            />

            <Controller
              name="priority"
              control={control}
              render={({ field }) => (
                <>
                  <Button
                    size="small"
                    variant="outlined"
                    startIcon={<Flag sx={{ color: PRIORITY_META[field.value].color }} />}
                    sx={{
                      fontWeight: 'normal',
                      padding: '1px 3px',
                      color: '#6c757d',
                      fontSize: '0.75rem',
                      borderColor: '#c4c4c4',
                    }}
                    onClick={handleOpen}
                  >
                    {field.value === PriorityLevel.LOW
                      ? 'Priority'
                      : PRIORITY_META[field.value].display}
                  </Button>
                  <Menu
                    id="priority-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    slotProps={{ list: { sx: { paddingTop: 0, paddingBottom: 0 } } }}
                  >
                    {(Object.keys(PriorityLevel) as PriorityLevel[]).map((option) => (
                      <MenuItem
                        key={option}
                        selected={option === field.value}
                        onClick={() => {
                          field.onChange(option);
                          handleClose();
                        }}
                        sx={{
                          fontSize: '0.75rem',
                          '&.Mui-selected': { backgroundColor: '#d1eaff', color: 'primary.main' },
                        }}
                      >
                        <Flag fontSize="small" sx={{ mr: 1, color: PRIORITY_META[option].color }} />
                        {PRIORITY_META[option].display}
                      </MenuItem>
                    ))}
                  </Menu>
                </>
              )}
            />
            <Button
              size="small"
              variant="outlined"
              startIcon={<AccessAlarm />}
              sx={{
                fontWeight: 'normal',
                padding: '1px 3px',
                color: '#6c757d',
                fontSize: '0.75rem',
                borderColor: '#c4c4c4',
              }}
              onClick={handleReminderClick}
            >
              Reminders
            </Button>
          </Stack>

          <Divider />
          <Stack direction="row" spacing={2} sx={{ justifyContent: 'flex-end', pt: 1.2 }}>
            <Button
              variant="text"
              size="small"
              sx={{ bgcolor: '#eee', color: '#444' }}
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              type="submit"
              size="small"
              disabled={isDisabled}
              sx={{
                bgcolor: isDisabled ? '#bbdefb' : 'primary.main',
                color: '#fff',
                '&.Mui-disabled': { bgcolor: '#64b5f6', color: '#fff' },
              }}
            >
              Save
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Paper>
  );
}

export default TaskEditor;
