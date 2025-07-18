import { Button, Box, Typography } from '@mui/material';
import { addDays, format, isBefore, isSameDay, startOfWeek, startOfToday } from 'date-fns';

type Props = {
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
};

export default function HorizontalDateList({ selectedDate, onSelectDate }: Props) {
  const today = startOfToday();
  const startOfWeekDate = startOfWeek(selectedDate, { weekStartsOn: 1 });
  const days = Array.from({ length: 7 }, (_, i) => addDays(startOfWeekDate, i));

  return (
    <Box display="flex" gap={1}>
      {days.map((date) => {
        const isToday = isSameDay(date, today);
        const isSelected = isSameDay(date, selectedDate);
        const isPast = isBefore(date, today);

        return (
          <Button
            key={date.toISOString()}
            onClick={() => !isPast && onSelectDate(date)}
            disabled={isPast}
            sx={{
              minWidth: 80,
              padding: 0.5,
              mr: 2,
              borderRadius: 2,
              color: '#424242',
              opacity: isPast ? 0.5 : 1,
            }}
          >
            <Typography variant="caption" fontWeight={isToday || isSelected ? 600 : 400}>
              {format(date, 'EEE')}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: isSelected ? '#fff' : isToday ? 'primary.main' : 'inherit',
                bgcolor: isSelected ? 'primary.main' : 'transparent',
                fontWeight: isToday || isSelected ? 600 : 400,
                ml: 0.2,
                p: '0.1rem 0.3rem',
                borderRadius: '5px',
              }}
            >
              {format(date, 'd')}
            </Typography>
          </Button>
        );
      })}
    </Box>
  );
}
