import { ExpandMore } from '@mui/icons-material';
import { Button, Popover } from '@mui/material';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { format } from 'date-fns';
import { useRef, useState } from 'react';

type Props = {
  selectedDate: Date;
  onChange: (date: Date) => void;
};

export default function DatePickerButton({ selectedDate, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement | null>(null);

  return (
    <>
      <Button
        ref={anchorRef}
        variant="text"
        onClick={() => setOpen(true)}
        sx={{ textTransform: 'none', fontWeight: 500 }}
      >
        {format(selectedDate, 'MMMM yyyy')}
        <ExpandMore />
      </Button>

      <Popover
        open={open}
        anchorEl={anchorRef.current}
        onClose={() => setOpen(false)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <DateCalendar
          value={selectedDate}
          onChange={(date) => {
            if (!date) return;
            onChange(date);
            setOpen(false);
          }}
          disablePast
          sx={{
            width: { sx: '100%', md: 240 },
            height: { sx: '100%', md: 260 },
            alignItems: 'center',
            '& .MuiPickersCalendarHeader-root': {
              width: '100%',
              mt: { md: 0 },
            },
            '& .MuiPickersCalendarHeader-label': {
              fontSize: '0.8125rem',
              fontWeight: 'bold',
            },
            '& .MuiButtonBase-root, & .MuiTypography-root': {
              width: { md: 24 },
              height: { md: 24 },
              p: { md: 0.5 },
              m: { md: 0.5 },
            },
          }}
        />
      </Popover>
    </>
  );
}
