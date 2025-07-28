import { Box } from '@mui/material';
import { useEffect, useRef } from 'react';
import { addDays, differenceInCalendarDays, format, isSameDay, startOfToday } from 'date-fns';
import { useVirtualizer } from '@tanstack/react-virtual';
import { DateDisplay } from './DateDisplay';
import { useTaskDefaults, useUpcomingTasks } from '@hooks/useTask';
import TaskListControllerVirtualized from './TaskListControllerVirtualized';

const TOTAL_DAYS = 365;
const today = startOfToday();

type Props = {
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
};

export default function VerticalCalendar({ selectedDate, onSelectDate }: Props) {
  const parentRef = useRef<HTMLDivElement>(null);
  const isScrollingRef = useRef(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const virtualizer = useVirtualizer({
    count: TOTAL_DAYS,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 100,
    getItemKey: (index) => index,
    overscan: 5,
  });

  const virtualItems = virtualizer.getVirtualItems();
  const dateList = virtualItems.map((virtualRow) => {
    const date = addDays(today, virtualRow.index);
    const formattedDate = format(date, 'yyyy-MM-dd');
    return { date, formattedDate, virtualRow };
  });

  const visibleDates = dateList.map((d) => d.formattedDate);
  const { data: tasksByDate } = useUpcomingTasks(visibleDates);

  // when clicking on horizontal
  useEffect(() => {
    const index = differenceInCalendarDays(selectedDate, today);
    isScrollingRef.current = true;
    virtualizer.scrollToIndex(index, { align: 'start' });

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      isScrollingRef.current = false;
    }, 300);
  }, [selectedDate]);

  // when scrolling
  useEffect(() => {
    const el = parentRef.current;
    if (!el) return;

    let ticking = false;
    const handleScroll = () => {
      if (isScrollingRef.current || ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const offset = el.scrollTop;
        const indexAtTop = virtualizer
          .getVirtualItems()
          .find((item) => item.start <= offset && offset < item.end)?.index;
        if (indexAtTop !== undefined) {
          const dateAtTop = addDays(today, indexAtTop);
          if (!isSameDay(dateAtTop, selectedDate)) onSelectDate(dateAtTop);
        }
        ticking = false;
      });
    };

    el.addEventListener('scroll', handleScroll);
    return () => el.removeEventListener('scroll', handleScroll);
  }, [selectedDate, onSelectDate]);

  return (
    <Box
      ref={parentRef}
      sx={{
        overflowY: 'auto',
        height: '100vh',
        scrollbarWidth: 'none',
        '&::-webkit-scrollbar': { display: 'none' },
      }}
    >
      <div style={{ height: virtualizer.getTotalSize(), position: 'relative' }}>
        {dateList.map(({ date, formattedDate, virtualRow }) => {
          const dailyTasks = tasksByDate?.[formattedDate];
          const dailyDefaultValues = useTaskDefaults({
            context: 'dueDate',
            dueDate: date,
          });

          return (
            <div
              key={virtualRow.key}
              ref={virtualizer.measureElement}
              data-index={virtualRow.index}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                transform: `translateY(${virtualRow.start}px)`,
                borderBottom: '1px solid #eee',
                padding: '8px 0',
                boxSizing: 'border-box',
                transition: 'height 0.2s ease',
              }}
            >
              <DateDisplay date={date} />
              <TaskListControllerVirtualized
                date={date}
                tasks={dailyTasks}
                defaultFormValues={dailyDefaultValues}
                showDueDate={true}
                onHeightChange={() => {
                  requestAnimationFrame(() => {
                    const el = parentRef.current?.querySelector(
                      `[data-index="${virtualRow.index}"]`
                    );
                    if (el) virtualizer.measureElement(el);
                  });
                }}
              />
            </div>
          );
        })}
      </div>
    </Box>
  );
}
