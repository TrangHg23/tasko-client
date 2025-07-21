import { Box } from '@mui/material';
import { useEffect, useRef } from 'react';
import { addDays, differenceInCalendarDays, isSameDay, startOfToday } from 'date-fns';
import { useVirtualizer } from '@tanstack/react-virtual';
import { DateDisplay } from './DateDisplay';

const ITEM_HEIGHT = 60;
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
    estimateSize: () => ITEM_HEIGHT,
    overscan: 5,
  });

  const virtualItems = virtualizer.getVirtualItems();

  // when clicking on horizontal
  useEffect(() => {
    const index = differenceInCalendarDays(selectedDate, today);
    const currentTopIndex = Math.floor((parentRef.current?.scrollTop ?? 0) / ITEM_HEIGHT);
    const currentTopDate = addDays(today, currentTopIndex);

    if (isSameDay(currentTopDate, selectedDate)) return;

    isScrollingRef.current = true;
    virtualizer.scrollToIndex(index, { align: 'start' });

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      isScrollingRef.current = false;
    }, 300);
  }, [selectedDate]);

  // When scrolling
  useEffect(() => {
    const el = parentRef.current;
    if (!el) return;

    let ticking = false;

    const handleScroll = () => {
      if (isScrollingRef.current || ticking) return;

      ticking = true;
      requestAnimationFrame(() => {
        const topOffset = el.scrollTop;
        const indexAtTop = Math.floor(topOffset / ITEM_HEIGHT);
        const dateAtTop = addDays(today, indexAtTop);
        const newDate = addDays(dateAtTop, 1);

        if (!isSameDay(newDate, selectedDate)) {
          onSelectDate(newDate);
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
        msOverflowStyle: 'none',
        '&::-webkit-scrollbar': { display: 'none' },
      }}
    >
      <div
        style={{
          height: virtualizer.getTotalSize(),
          position: 'relative',
        }}
      >
        {virtualItems.map((virtualRow) => {
          const date = addDays(today, virtualRow.index);

          return (
            <div
              key={virtualRow.key}
              ref={virtualizer.measureElement}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                paddingTop: 10,
                width: '100%',
                height: ITEM_HEIGHT,
                transform: `translateY(${virtualRow.start}px)`,
                borderBottom: '1px solid #eee',
              }}
            >
              <DateDisplay date={date} />
            </div>
          );
        })}
      </div>
    </Box>
  );
}
