import { Box, List, ListItemButton } from '@mui/material';
import {
  format,
  getHours,
  getMinutes,
  isSameDay,
  roundToNearestMinutes,
  setHours,
  setMinutes,
  startOfToday,
} from 'date-fns';
import { useEffect, useMemo, useRef } from 'react';

const generateTimes = () => {
  const times: Date[] = [];
  const base = new Date();

  for (let h = 0; h < 24; h++) {
    for (let m = 0; m < 60; m += 15) {
      times.push(setMinutes(setHours(base, h), m));
    }
  }

  return times;
};

const ALL_TIMES = generateTimes();

const timeStringToDate = (time: string): Date => {
  const [h, m] = time.split(':').map(Number);
  return setMinutes(setHours(new Date(), h), m);
};

const getNearestFutureTime = (): Date => {
  const now = new Date();
  const rounded = roundToNearestMinutes(now, { nearestTo: 15 });

  if (rounded < now) {
    rounded.setMinutes(rounded.getMinutes() + 15);
  }

  return rounded;
};

type TimePickerProps = {
  value: string | null; // "HH:mm"
  onChange: (time: string | null) => void;
  selectedDate?: Date | null;
};

function TimePicker({ value, onChange, selectedDate }: TimePickerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLElement | null)[]>([]);

  // Filter available times
  const availableTimes = useMemo(() => {
    if (!selectedDate) return ALL_TIMES;

    if (isSameDay(selectedDate, startOfToday())) {
      const minTime = getNearestFutureTime();
      const minH = getHours(minTime);
      const minM = getMinutes(minTime);

      return ALL_TIMES.filter((time) => {
        const h = getHours(time);
        const m = getMinutes(time);
        return h > minH || (h === minH && m >= minM);
      });
    }

    return ALL_TIMES;
  }, [selectedDate]);

  // Auto scroll
  useEffect(() => {
    let targetTime: Date;

    if (value) {
      targetTime = roundToNearestMinutes(timeStringToDate(value), {
        nearestTo: 15,
      });
    } else if (selectedDate && isSameDay(selectedDate, startOfToday())) {
      targetTime = getNearestFutureTime();
    } else {
      targetTime = setMinutes(setHours(new Date(), 0), 0);
    }

    const targetStr = format(targetTime, 'HH:mm');

    const index = availableTimes.findIndex((time) => format(time, 'HH:mm') === targetStr);

    if (index >= 0 && itemRefs.current[index]) {
      itemRefs.current[index]!.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [value, selectedDate, availableTimes]);

  return (
    <Box
      ref={containerRef}
      sx={{
        maxHeight: 180,
        overflowY: 'auto',
        borderTop: '1px solid #eee',
      }}
    >
      <List dense>
        {availableTimes.map((time, index) => {
          const timeStr = format(time, 'HH:mm');
          const selected = value === timeStr;

          return (
            <ListItemButton
              key={timeStr}
              selected={selected}
              ref={(el) => {
                itemRefs.current[index] = el;
              }}
              onClick={() => onChange(timeStr)}
            >
              {timeStr}
            </ListItemButton>
          );
        })}
      </List>
    </Box>
  );
}

export default TimePicker;
