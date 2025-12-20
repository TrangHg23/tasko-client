import { AccessAlarm, CalendarMonth, Clear, ExpandMore } from '@mui/icons-material';
import {
  Box,
  Button,
  ClickAwayListener,
  Dialog,
  DialogContent,
  Divider,
  IconButton,
  InputAdornment,
  Paper,
  Popper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { format, startOfToday } from 'date-fns';
import { useEffect, useRef, useState } from 'react';
import TimePicker from './TimePicker';

type DateTimePickerButtonProps = {
  date: Date | null;
  time: string | null;
  onChange: (date: Date | null, time: string | null) => void;
};

function DateTimePickerButton({ date, time, onChange }: DateTimePickerButtonProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [tempDate, setTempDate] = useState<Date | null>(null);
  const [tempTime, setTempTime] = useState<string | null>(null);
  const [timePickerOpen, setTimePickerOpen] = useState(false);
  const timeFieldRef = useRef<HTMLInputElement | null>(null);

  // Reset temp values when dialog opens
  useEffect(() => {
    if (dialogOpen) {
      setTempDate(date);
      setTempTime(time);
    }
  }, [dialogOpen, date, time]);

  const handleDialogClose = () => {
    setDialogOpen(false);
    setTimePickerOpen(false);
    // Reset temp values on close
    setTempDate(null);
    setTempTime(null);
  };

  const handleSave = () => {
    if (!tempDate) return;
    onChange(tempDate, tempTime);
    handleDialogClose();
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(null, null);
  };

  return (
    <>
      {/* Trigger Button  */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          border: '1px solid',
          borderColor: date ? 'primary.main' : '#c4c4c4',
          borderRadius: 1,
          bgcolor: date ? '#d1eaff' : 'transparent',
          padding: '1px 6px',
          fontSize: '0.75rem',
          color: date ? 'primary.main' : '#6c757d',
          cursor: 'pointer',
          gap: 0.5,
          minWidth: 'fit-content',
        }}
        onClick={() => setDialogOpen(true)}
      >
        <CalendarMonth sx={{ fontSize: 16 }} />
        <Box sx={{ flex: 1, whiteSpace: 'nowrap' }}>
          {date && time
            ? `${format(date, 'd MMM')} ${time}`
            : date
              ? format(date, 'd MMM')
              : 'Date'}
        </Box>
        {date && (
          <IconButton size="small" onClick={handleClear} sx={{ padding: '2px' }}>
            <Clear sx={{ fontSize: 16 }} />
          </IconButton>
        )}
      </Box>

      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogContent sx={{ p: 0 }}>
          <Paper sx={{ borderRadius: 1, border: '1px solid divider' }}>
            <Box sx={{ p: 2 }}>
              <Stack spacing={1}>
                <DateCalendar
                  value={tempDate}
                  minDate={startOfToday()}
                  onChange={(newDate) => {
                    if (newDate) {
                      setTempDate(newDate);
                    }
                  }}
                  views={['day']}
                  showDaysOutsideCurrentMonth
                  sx={{
                    '& .MuiPickersDay-today:not(.Mui-selected)': {
                      border: tempDate ? '1px solid' : '1px dashed rgba(0, 0, 0, 0.2)',
                      backgroundColor: 'transparent',
                    },
                  }}
                />

                <Divider />

                <Stack direction="row" alignItems="center" spacing={1}>
                  <AccessAlarm fontSize="small" />
                  <Typography fontSize={14}>Time:</Typography>

                  <TextField
                    size="small"
                    placeholder="--:--"
                    value={tempTime ?? ''}
                    inputRef={timeFieldRef}
                    disabled={!tempDate}
                    onClick={() => tempDate && setTimePickerOpen(true)}
                    sx={{ flex: 1 }}
                    slotProps={{
                      input: {
                        readOnly: true,
                        endAdornment: (
                          <InputAdornment position="end">
                            <ExpandMore fontSize="small" />
                          </InputAdornment>
                        ),
                      },
                    }}
                  />
                </Stack>

                {/* Time Picker Popper  */}
                <Popper
                  open={timePickerOpen}
                  anchorEl={timeFieldRef.current}
                  placement="bottom-start"
                  style={{ zIndex: 1300 }}
                >
                  <ClickAwayListener onClickAway={() => setTimePickerOpen(false)}>
                    <Paper sx={{ maxHeight: 180, overflowY: 'auto', mt: 0.5 }}>
                      <TimePicker
                        value={tempTime}
                        selectedDate={tempDate}
                        onChange={(time) => {
                          setTempTime(time);
                          setTimePickerOpen(false);
                        }}
                      />
                    </Paper>
                  </ClickAwayListener>
                </Popper>

                <Stack direction="row" spacing={1.5} pt={1}>
                  <Button fullWidth variant="outlined" onClick={handleDialogClose}>
                    Cancel
                  </Button>
                  <Button fullWidth variant="contained" disabled={!tempDate} onClick={handleSave}>
                    Save
                  </Button>
                </Stack>
              </Stack>
            </Box>
          </Paper>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default DateTimePickerButton;
